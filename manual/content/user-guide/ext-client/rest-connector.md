---

title: 'REST Connector'
weight: 300

menu:
  main:
    name: "REST Connector"
    identifier: "external-task-client-rest-connector"
    parent: "external-task-client"

---

{{< note title="Enterprise Edition only" class="warning" >}}
The REST connector is part of **EximeeBPMS Connectors**, a set of ready-made external task workers for the Enterprise Edition, released separately from the engine.
{{< /note >}}

The REST connector calls an HTTP API from a BPMN service task. It runs as an external task worker next to the engine — in the connectors bundle image or in your own Spring Boot application — so the call happens outside the engine transaction, with the external task's retries, locks and incidents. You configure the request with the element's input parameters; the answer comes back as the local variable `response`.

The same connector serves as a tool of an AI agent: the modeler fixes the URL and the method, and the model fills in selected parts.

# Configure a Task

The element is an external service task with the topic `org.eximeebpms:http-json:1`. The element template **REST Connector** (below) sets this up and offers a form for every input. Without a template:

```xml
<bpmn:serviceTask id="getOrder" name="Get order"
    camunda:type="external" camunda:topic="org.eximeebpms:http-json:1">
  <bpmn:extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="method">GET</camunda:inputParameter>
      <camunda:inputParameter name="url">https://orders.example.com/api/orders/${orderId}</camunda:inputParameter>
      <camunda:inputParameter name="headers">{"Accept": "application/json"}</camunda:inputParameter>
      <camunda:inputParameter name="authentication.type">bearer</camunda:inputParameter>
      <camunda:inputParameter name="authentication.token">{{secrets.ORDERS_TOKEN}}</camunda:inputParameter>
      <camunda:outputParameter name="order">${response.body}</camunda:outputParameter>
    </camunda:inputOutput>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

An input parameter whose name contains dots sets a field of a nested input: `authentication.type` sets `type` inside `authentication`. It can be combined with the parent given as a JSON object, e.g. fixed `queryParameters` plus `queryParameters.orderId`. Under `headers` and `queryParameters` the rest of the name is kept whole: `queryParameters.page.size` sets the parameter `page.size`. A blank input counts as not set, so an empty template field keeps the default.

## Inputs

<table class="table table-striped">
  <tr><th>Input</th><th>Description</th><th>Default</th></tr>
  <tr><td><code>method</code></td><td><code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>, <code>HEAD</code> or <code>OPTIONS</code>. Required.</td><td></td></tr>
  <tr><td><code>url</code></td><td>Absolute <code>http</code> or <code>https</code> URL. Required. Credentials in the URL (<code>user:password@</code>) are rejected; use <code>authentication</code>. Percent-encoded characters and empty labels (`a..b`) in the host are rejected too.</td><td></td></tr>
  <tr><td><code>headers</code></td><td>A map of header names to a value or a list of values, or the same as a JSON object text. A <code>Host</code> header is not allowed: the URL names the host.</td><td></td></tr>
  <tr><td><code>queryParameters</code></td><td>Added to the URL's query, in the same forms as <code>headers</code>.</td><td></td></tr>
  <tr><td><code>body</code></td><td>A map, list or plain value is sent as JSON. A text is sent as it is: as <code>application/json</code> when it is a JSON object or array, otherwise as <code>text/plain</code>. A map is sent as a form when the <code>Content-Type</code> header is <code>application/x-www-form-urlencoded</code>. A <code>Content-Type</code> header always wins.</td><td></td></tr>
  <tr><td><code>authentication.*</code></td><td>See <a href="#authentication">Authentication</a>.</td><td>none</td></tr>
  <tr><td><code>connectTimeout</code></td><td>ISO-8601 duration.</td><td><code>PT20S</code></td></tr>
  <tr><td><code>readTimeout</code></td><td>ISO-8601 duration, the longest wait for data from the server.</td><td><code>PT20S</code></td></tr>
  <tr><td><code>followRedirects</code></td><td>Follow up to 5 redirects.</td><td><code>true</code></td></tr>
  <tr><td><code>maxResponseSize</code></td><td>Largest response body in bytes; at most the worker's <code>max-response-size</code>.</td><td>the worker's limit (1 MB)</td></tr>
  <tr><td><code>failOnStatus</code></td><td>Statuses that fail the task, which is then retried: classes such as <code>5xx</code>, codes such as <code>429</code>, separated by commas; <code>none</code> for no status.</td><td><code>5xx</code></td></tr>
  <tr><td><code>retries</code></td><td>Executions before an incident.</td><td><code>3</code></td></tr>
  <tr><td><code>retryBackoff</code></td><td>ISO-8601 duration between attempts.</td><td><code>PT10S</code></td></tr>
</table>

## Authentication

Set `authentication.type` and the fields of that type. Put credentials in `{{secrets.NAME}}` placeholders: the worker resolves them from `eximeebpms.connectors.secrets.NAME` (or the environment variable `EXIMEEBPMS_CONNECTORS_SECRETS_NAME`), and the values never reach a process variable or a log. In a text that is a JSON object or array, such as `headers` or `body` given as JSON, a secret is inserted escaped, so quotes and backslashes in it keep the JSON intact.

<table class="table table-striped">
  <tr><th><code>type</code></th><th>Fields</th></tr>
  <tr><td><code>none</code></td><td></td></tr>
  <tr><td><code>basic</code></td><td><code>username</code> (without <code>:</code>), <code>password</code> (may be empty, for APIs that take a key as the user name)</td></tr>
  <tr><td><code>bearer</code></td><td><code>token</code></td></tr>
  <tr><td><code>apiKey</code></td><td><code>name</code>, <code>value</code>, <code>apiKeyLocation</code>: <code>headers</code> (default) or <code>query</code></td></tr>
  <tr><td><code>oauth2ClientCredentials</code></td><td><code>oauthTokenEndpoint</code>, <code>clientId</code>, <code>clientSecret</code>, optional <code>scopes</code> (separated by spaces) and <code>audience</code>, <code>clientAuthentication</code>: <code>basicAuthHeader</code> (default) or <code>credentialsBody</code></td></tr>
</table>

With OAuth 2.0 the worker requests a token with the client credentials grant and keeps it until shortly before it expires, or for 60 seconds when the server does not say when it expires. When the API rejects a kept token with `401`, the worker requests a new one and sends the request once more.

When a redirect leads to another host, scheme or port, the worker drops the authentication and every header from `headers` except `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` and `User-Agent`, so a key in a header such as `X-Api-Key` does not reach the other host. A redirect with status 307 or 308 to another origin would send the request body there too, so it raises an incident instead; set `followRedirects` to `false` and handle the redirect in the process if you need it. A redirect of the same host from `http` to `https` is followed.

## Result

The task completes with the local variable `response`:

```json
{
  "status": 200,
  "headers": { "content-type": "application/json" },
  "body": { "id": 42, "state": "SHIPPED" }
}
```

Header names are lower-case; repeated headers are joined with `", "`. A JSON body (`application/json` or `*+json`) becomes maps and lists, any other body a text, an empty body `null`. Map what you need with output parameters, e.g. `${response.body.state}`.

## Errors and Retries

* A status listed in `failOnStatus` — by default every 5xx — fails the task. It is retried with `retries` and `retryBackoff`, then raises an incident. Timeouts and connection failures behave the same way.
* Every other status completes the task with `response`. To turn a 4xx into a BPMN error, add an error event definition to the task:

  ```xml
  <bpmn:serviceTask id="getOrder" camunda:type="external" camunda:topic="org.eximeebpms:http-json:1">
    <bpmn:extensionElements>
      <camunda:errorEventDefinition errorRef="OrderNotFound" expression="${response.status == 404}" />
      ...
    </bpmn:extensionElements>
  </bpmn:serviceTask>
  ```

* Invalid inputs, a response larger than the size limit, more than 5 redirects and a denied destination raise an incident at once, without retries. A response over the limit is cut off there, not downloaded to the end.

Incident messages name the element, the host and the status, never the path, the query, the headers or the body, nor any text the server sent.

# Element Templates

The artifact `org.eximeebpms.connectors:eximeebpms-connectors-element-templates` contains templates for Camunda Modeler in Camunda 7 mode, in its `element-templates/` folder. Copy them into the Modeler's element templates directory.

* **REST Connector** (`org.eximeebpms.connectors.HttpJson`) — a form for every input; the result goes to a process variable of your choice (default `response`).
* **REST Connector as agent tool** (`org.eximeebpms.connectors.HttpJson.tool`) — for a tool inside an AI agent's ad-hoc sub-process. You fix the URL and the method; the parts the model chooses are written with `fromAi` as extra input parameters such as `queryParameters.q` or `body.orderId`, whose values are encoded. Do not put a `fromAi` value into the URL: it is not encoded there, and a value such as `../admin` reaches another endpoint of the same host with the element's credentials.

  ```
  queryParameters.q = ${fromAi(toolCall.query, "Text to search for", "string")}
  ```

  The response body becomes `toolCallResult`. The element's documentation is the tool description the model sees.

The Camunda 7 template format has no conditional fields: all authentication fields are shown, fill in only those of the chosen type.

# Allowing Internal Addresses

By default the REST connector calls **public addresses only**. Process models — and, through `fromAi`, an AI model — decide where requests go, and a response can carry instructions aimed at an AI model, so the worker refuses to reach its own network unless you allow it. Denied by default:

* loopback: `127.0.0.0/8`, `::1`;
* private networks: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`, and the shared address space `100.64.0.0/10`;
* link-local, including cloud metadata services (`169.254.169.254`): `169.254.0.0/16`, `fe80::/10`;
* the unspecified address, multicast and reserved ranges, and IPv6 translation ranges that can carry an internal IPv4 address;
* special-purpose ranges: `192.0.0.0/24` (including Oracle Cloud's older metadata address `192.0.0.192`), the benchmarking range `198.18.0.0/15` (used by fake-IP DNS gateways), the documentation ranges `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `2001:db8::/32`, and `192.88.99.0/24`, `100::/64`.

The worker checks the **address a host name resolves to**, at every request and every redirect, and connects only to the address it checked. A public name that resolves to an internal address is denied too, so DNS tricks do not get around the check. Requests through a proxy are the exception, see [Through a Proxy](#through-a-proxy).

A denied request is not sent. It raises an incident naming the address and the property to change:

```
Element 'getOrder' may not call 10.20.1.5 (host orders.internal): it is not a public address
and no entry of eximeebpms.connectors.http.network-policy.allow allows it
```

## Add an Entry

Allow destinations in the worker's configuration (`application.yaml`, or environment variables for the bundle image). Each entry has exactly one of `host` and `cidr`:

<table class="table table-striped">
  <tr><th>Entry</th><th>Allows</th></tr>
  <tr><td><code>host: orders.internal</code></td><td>Requests to this host name, whatever address it resolves to.</td></tr>
  <tr><td><code>host: "*.corp.example"</code></td><td>Requests to every subdomain of <code>corp.example</code> — not to <code>corp.example</code> itself. Quote it in YAML.</td></tr>
  <tr><td><code>cidr: 10.20.0.0/16</code></td><td>Requests to any address in the range; a single address (<code>10.20.1.5</code>) is a range of one.</td></tr>
</table>

International host names can be written either way, `bücher.example` or `xn--bcher-kva.example`.

**Deny entries win.** An address or host matching a `deny` entry is refused even when an `allow` entry admits it, and even when it is public.

### A Single Internal API

```yaml
eximeebpms:
  connectors:
    http:
      network-policy:
        allow:
          - host: orders.internal
```

For the bundle image: `EXIMEEBPMS_CONNECTORS_HTTP_NETWORK_POLICY_ALLOW_0_HOST=orders.internal`.

### An Internal Network, Except One Part of It

```yaml
eximeebpms:
  connectors:
    http:
      network-policy:
        allow:
          - cidr: 10.20.0.0/16
        deny:
          - cidr: 10.20.5.0/24   # e.g. the database subnet
```

For the bundle image: `EXIMEEBPMS_CONNECTORS_HTTP_NETWORK_POLICY_ALLOW_0_CIDR=10.20.0.0/16` and `EXIMEEBPMS_CONNECTORS_HTTP_NETWORK_POLICY_DENY_0_CIDR=10.20.5.0/24`.

### A Local Test Setup

To call a mock server on your own machine:

```yaml
eximeebpms:
  connectors:
    http:
      network-policy:
        allow:
          - host: localhost
          - cidr: 127.0.0.1
```

Keep this out of production configuration.

{{< note title="Allowing a destination allows it for every process" class="warning" >}}
An entry applies to every process model the worker serves, and to every AI agent that uses the REST connector as a tool. Allowing a whole range gives all of them — and, through `fromAi`, the model — access to everything in it. Allow single host names where you can, and deny the parts of a range that must stay out of reach.
{{< /note >}}

A malformed entry stops the worker at startup with a message naming the property. The worker logs the effective policy when it starts.

# Worker Configuration

<table class="table table-striped">
  <tr><th>Property</th><th>Description</th><th>Default</th></tr>
  <tr><td><code>eximeebpms.connectors.http.network-policy.allow</code></td><td>Entries allowing non-public destinations, see <a href="#allowing-internal-addresses">Allowing Internal Addresses</a>.</td><td>none</td></tr>
  <tr><td><code>eximeebpms.connectors.http.network-policy.deny</code></td><td>Entries that are always denied.</td><td>none</td></tr>
  <tr><td><code>eximeebpms.connectors.http.max-response-size</code></td><td>Largest response body the worker reads, e.g. <code>2MB</code>.</td><td><code>1MB</code></td></tr>
  <tr><td><code>eximeebpms.connectors.http.proxy.*</code></td><td>An HTTP proxy for outgoing requests, see <a href="#through-a-proxy">Through a Proxy</a>.</td><td>none</td></tr>
  <tr><td><code>eximeebpms.connectors.http.ssl-bundle</code></td><td>Name of a Spring SSL bundle (<code>spring.ssl.bundle.*</code>) whose trust material replaces the JVM's default trust store, e.g. for an internal certificate authority.</td><td>the JVM's trust store</td></tr>
</table>

Do not set the loggers `org.apache.hc.client5.http.wire`, `org.apache.hc.client5.http.headers` and `org.apache.hc.client5.http.impl.classic` to DEBUG: they write request headers and URIs with their query, credentials and API keys included. The bundle image keeps them at INFO.

The connector keeps no cookies between requests and ignores the JVM's proxy settings (`https.proxyHost`, `socksProxyHost`, `HTTPS_PROXY`).

## Through a Proxy

Where the worker reaches the internet only through an HTTP proxy, configure it:

```yaml
eximeebpms:
  connectors:
    http:
      proxy:
        url: http://proxy.corp:3128
        username: connectors          # optional, basic proxy authentication
        password: ${PROXY_PASSWORD}
        non-proxy-hosts:              # reached directly
          - orders.internal
          - "*.corp.example"
```

{{< note title="The proxy must block internal addresses" class="warning" >}}
Through a proxy, the **proxy** resolves the destination's host name, so the connector cannot see the address it ends up at. For requests through the proxy, the connector checks only what it can judge without a lookup — an address in the URL, also in numeric forms such as `http://2852039166/` (`http://169.254.169.254/` is still denied), and the host entries of the deny list — and leaves everything else to the proxy. Configure the proxy to refuse loopback, private, link-local and metadata addresses, e.g. with Squid ACLs; otherwise process models, and an AI agent through `fromAi`, can reach your internal network through it.
{{< /note >}}

Hosts in `non-proxy-hosts` are reached directly and fully checked by the network policy, as without a proxy — the proxy's own host name too, when a request goes to it directly. The worker logs a warning naming the proxy when it starts.
