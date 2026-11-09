#!/usr/bin/env python3
# Copyright EximeeBPMS contributors
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
"""Loopback-only REST, remote MCP and deterministic model fixtures; no paid calls."""
import argparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import threading
from urllib.parse import parse_qs, urlparse

ANSWER = "Refund approved for order A-1."
TOOL = {"name": "lookup", "description": "Read returns policy for a topic.",
        "inputSchema": {"type": "object", "properties": {"topic": {"type": "string"}},
                        "required": ["topic"]}}


class FixtureServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address):
        super().__init__(address, Handler)
        self.counts = {"orders": 0, "mcpCalls": 0, "modelCalls": 0}
        self.count_lock = threading.Lock()

    def count(self, name):
        with self.count_lock:
            self.counts[name] += 1


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass  # Do not log request headers, prompts or credentials.

    def reply(self, status, body=None):
        data = b"" if body is None else json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/orders":
            if parse_qs(url.query).get("orderId") != ["A-1"]:
                self.reply(404, {"error": "Unknown example order"})
                return
            self.server.count("orders")
            self.reply(200, {"orderId": "A-1", "status": "delivered", "refundRequiresApproval": True})
        elif url.path == "/stats":
            with self.server.count_lock:
                self.reply(200, dict(self.server.counts))
        else:
            # This streamable-HTTP fixture responds to POST with JSON; no GET SSE stream.
            self.reply(405 if url.path == "/mcp" else 404)

    def do_DELETE(self):
        self.reply(200 if urlparse(self.path).path == "/mcp" else 404)

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 1024 * 1024:
                self.reply(413)
                return
            request = json.loads(self.rfile.read(length))
            if not isinstance(request, dict):
                self.reply(400)
                return
        except (ValueError, UnicodeDecodeError):
            self.reply(400)
            return
        if urlparse(self.path).path == "/mcp":
            self.mcp(request)
        elif urlparse(self.path).path == "/v1/responses":
            self.model(request)
        else:
            self.reply(404)

    def mcp(self, request):
        method = request.get("method")
        if method == "notifications/initialized":
            self.reply(202)
            return
        if method == "initialize":
            result = {"protocolVersion": request.get("params", {}).get("protocolVersion", "2025-03-26"),
                      "capabilities": {"tools": {}},
                      "serverInfo": {"name": "support-example", "version": "1"}}
        elif method == "tools/list":
            result = {"tools": [TOOL]}
        elif method == "tools/call":
            params = request.get("params", {})
            if params.get("name") != "lookup" or params.get("arguments", {}).get("topic") != "returns":
                result = {"isError": True, "content": [{"type": "text", "text": "Unknown example tool/topic"}]}
            else:
                self.server.count("mcpCalls")
                result = {"content": [{"type": "text", "text": "A human support reviewer must approve a refund."}], "isError": False}
        elif method == "ping":
            result = {}
        else:
            self.reply(200, {"jsonrpc": "2.0", "id": request.get("id"),
                             "error": {"code": -32601, "message": "Method not found"}})
            return
        self.reply(200, {"jsonrpc": "2.0", "id": request.get("id"), "result": result})

    def model(self, request):
        self.server.count("modelCalls")
        outputs = {item.get("call_id"): item.get("output", "") for item in request.get("input", [])
                   if isinstance(item, dict) and item.get("type") == "function_call_output"}
        steps = [("call_order", "getOrder", {"orderId": "A-1"}),
                 ("call_policy", "MCP_knowledge___lookup", {"topic": "returns"}),
                 ("call_human", "askHuman", {"question": "Approve a refund for delivered order A-1?"})]
        missing = next((step for step in steps if step[0] not in outputs), None)
        if missing:
            call_id, name, arguments = missing
            output = [{"id": "item_" + call_id, "type": "function_call", "call_id": call_id,
                       "name": name, "arguments": json.dumps(arguments), "status": "completed"}]
        else:
            # The fixture refuses to claim approval unless that actual human result was received.
            approval = outputs["call_human"]
            try:
                approval = json.loads(approval)
            except (ValueError, TypeError):
                pass
            answer = ANSWER if approval == "approved" else "Refund was not approved."
            output = [{"id": "message_final", "type": "message", "role": "assistant", "status": "completed",
                       "content": [{"type": "output_text", "text": answer, "annotations": []}]}]
        self.reply(200, {"id": "response_example", "object": "response", "created_at": 1,
                         "status": "completed", "model": "example-fixture", "output": output,
                         "usage": {"input_tokens": 10, "output_tokens": 5, "total_tokens": 15}})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8095)
    args = parser.parse_args()
    with FixtureServer(("127.0.0.1", args.port)) as server:
        print(f"http://localhost:{server.server_port}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
