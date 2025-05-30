---

title: "OpenAPI"
weight: 15
layout: "single"

menu:
  main:
    identifier: "rest-api-openapi"
    parent: "rest-api"

---


The EximeeBPMS REST API has an OpenAPI description that follows the
[OpenAPI Specification 3.0.2][spec-3.0.2]. OpenAPI is a standard, language-agnostic interface to RESTful APIs which allows 
both humans and computers to discover and understand the capabilities of the service without access to source code, 
documentation, or through network traffic inspection.

The OpenAPI description brings options for:

* [Client Generation](#client-generation) in different languages:
Providing flexibility for adoption of the process engine in many languages and possibility for custom implementation built on top.
* [Getting Started Experience](#getting-started-experience):
Improving the getting started experience for the users with the option to try out the REST API following along with the documentation and examples.

The documentation is shipped as a single `openapi.json` file archived in a jar artifact.
Download the EximeeBPMS REST API artifact containing the OpenAPI documentation [here][artifact-link]. Choose the correct version and then download the `jar` file.

[spec-3.0.2]: https://github.com/OAI/OpenAPI-Specification/blob/3.0.2/versions/3.0.2.md
[artifact-link]: https://repo1.maven.org/maven2/org/eximeebpms/bpm/eximeebpms-engine-rest-openapi/

Alternatively, you can obtain this artifact with the following Maven coordinates:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine-rest-openapi</artifactId>
  <version>${version.eximeebpms}</version>
</dependency>
```

# Client Generation

To generate REST API client in the language of your preference based on the OpenAPI documentation, 
you will need a client generator library, e.g. [OpenAPI Generator][openapi-generator] or any other library that 
is compatible with OpenAPI Specification version 3.0. 

Follow the steps of the OpenAPI Generator's documentation, how to [install][openapi-gen-install] the tool and 
[generate a simple client][openapi-gen-usage] in one of the supported languages.

[openapi-generator]: https://github.com/OpenAPITools/openapi-generator
[openapi-gen-install]: https://github.com/OpenAPITools/openapi-generator#1---installation
[openapi-gen-usage]: https://github.com/OpenAPITools/openapi-generator#to-generate-a-sample-client-library

# Getting Started Experience

Instead of client generation, you can use one of the OpenAPI editors to play around with the REST API endpoints.

You can go to [Swagger Editor][swagger-editor] and paste the content of the openapi.json on the left-hand side of the editor.
Start a Process engine with enabled cross-origin requests, and you will be able to execute requests from the editor.

Some API Tools also support import of endpoints via upload of a OpenAPI document.
For example, [Postman][postman-site] users can [import the OpenAPI documentation][postman-import] and work with the REST endpoints from a single place.

[cam-platform-run]: {{< ref "/user-guide/eximeebpms-bpm-run.md" >}}
[swagger-ui]: https://github.com/swagger-api/swagger-ui
[swagger-editor]: https://editor.swagger.io/
[postman-site]: https://www.postman.com/
[postman-import]: https://learning.postman.com/docs/postman/collections/working-with-openAPI/



# Coverage

The description currently covers all endpoints of all but the following resources:

* Case Definition
* Case Execution
* Case Instance
* Historic Case Definition
* Historic Case Instance
* Historic Case Activity Instance
