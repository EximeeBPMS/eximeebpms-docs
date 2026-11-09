---
title: 'Connector Dependencies and Compatibility'
description: "Version lines, the runtime, the SDKs and pinned libraries, and how to check the artifacts of an embedded application."
weight: 30
menu:
  main:
    identifier: 'ai-agent-dependencies'
    parent: 'ai-agent-reference'
---

{{< note title="Enterprise Edition only" class="warning" >}}
This reference describes Enterprise Connectors **1.0.0-ee**, consuming released
Enterprise engine **1.4.3-ee**. The worker and engine have independent version
lines. Use matching connector modules and templates from the same worker release.
{{< /note >}}

## Version lines and runtime

| Component | Documented baseline | Meaning |
| --- | --- | --- |
| Enterprise Connectors | `1.0.0-ee` | Own release line; a connector version is not an engine version |
| Enterprise engine dependency | `1.4.3-ee` | Ad-hoc turn/result/history contract consumed by this release |
| Java | `21` minimum | Connector compilation/runtime baseline |
| Stock bundle image | Alpine `3.24`, OpenJDK `25` | The image runtime is separate from the minimum Java baseline; stdio runtimes are not bundled |
| Spring Boot BOM | `4.1.2` | Connector root POM's declared Boot line, independent of the engine's current Boot version |

[Deployment and Operations]({{< ref "/user-guide/ai-agent/running-the-connectors.md" >}})
explains bundle and embedded deployment. Use one connector release version across
its artifacts and matching element templates. A mutable image tag or a matching
version number alone does not establish compatibility with another engine version.

## SDKs and directly pinned runtime libraries

These are the root POM's declared versions for the documented connector baseline.
The list is separate from the [engine Tech Stack]({{< ref "/introduction/tech-stack.md" >}})
and the engine's license book.

| Purpose | Maven artifact or BOM | Declared version |
| --- | --- | --- |
| OpenAI provider | `com.openai:openai-java-core` | `4.100.0` |
| Anthropic provider | `com.anthropic:anthropic-java-core` | `3.5.0` |
| MCP SDK | `io.modelcontextprotocol.sdk:mcp-bom` (`mcp-core`, `mcp-json-jackson2`) | `2.1.0` |
| MCP WebClient transport | `org.springframework.ai:mcp-spring-webflux` | `2.0.2` |
| Model/tool JSON Schema validation | `com.networknt:json-schema-validator` | `3.0.8` |
| Private JDBC migration runtime | `org.flywaydb:flyway-core` and database modules | `13.12.0` |
| Private migration Jackson core/databind | `tools.jackson.core:jackson-core`, `jackson-databind` | `3.2.4` |
| Private migration Jackson annotations | `com.fasterxml.jackson.core:jackson-annotations` | `2.22` |

Provider SDK version, vendor API version and model name are different settings.
An SDK upgrade does not automatically expose new options through the connector.
Use only the types, APIs and options documented in
[Model Providers]({{< ref "/user-guide/ai-agent/providers.md" >}}).
The MCP SDK version is likewise not an MCP protocol-version guarantee: test the
chosen server with the [supported connector transports]({{< ref "/user-guide/ai-agent/connectors/mcp-connector.md" >}}).
Spring AI supplies MCP transport classes here; it is not the worker's LLM-provider abstraction.

The Flyway runtime and its Jackson libraries are privately relocated. They do
not select the embedding application's Flyway/Jackson version, configuration or
migration history. Other Jackson, HTTP transport, database-driver and Spring
versions are resolved through dependency management and the assembled module graph;
do not infer those effective versions from a similarly named property in the engine.

## Embedded applications and artifact inspection

An embedded worker shares dependency resolution with its host. Inspect the effective
POM and dependency tree of that application, especially when the host overrides
Boot, Jackson, HTTP client, MCP or provider SDK versions. The stock bundle is the
preassembled distribution; adding the bundle JAR as an ordinary dependency does
not reproduce an embedded starter deployment.

For the exact transitive versions and notices of a release, inspect the matching
artifacts and their LICENSE/NOTICE files. The tables above cover the operator-relevant
runtime pins; they are not a complete dependency/license inventory and do not list
build plugins or test libraries. Source builds can inspect resolution with
`./mvnw dependency:tree` using their configured Enterprise Maven access.
