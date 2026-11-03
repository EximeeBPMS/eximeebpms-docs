---

title: 'EximeeBPMS License Book'
weight: 20

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries-license-book-platform"
    parent: "user-guide-introduction-third-party-libraries"
    pre: "Third-party dependency inventory and retained license notices"

---

## Current Enterprise snapshot inventory

Source revision: `ced369c10b`. This staging inventory describes the upcoming Enterprise snapshot, not a published release.

Java versions and declared licenses come from a freshly generated aggregate CycloneDX BOM. It spans engine modules, distributions and development/test modules; the dependencies present in a particular distribution are a subset. JavaScript versions come from the same revision's frontend lockfile, including build dependencies. Multiple versions can be required by different modules.

License names below reproduce dependency metadata. Entries without a declaration are marked explicitly. The [SPDX license list](https://spdx.org/licenses/) provides the corresponding standard license texts. For the notices accompanying a particular binary, use its distributed LICENSE and NOTICE files.

### Java dependencies (786)

| Group | Artifact | Version | Declared license |
| --- | --- | --- | --- |
| aopalliance | aopalliance | 1.0 | Public Domain |
| at.yawk.lz4 | lz4-java | 1.11.4 | Apache-2.0 |
| ch.qos.logback | logback-classic | 1.5.38 | EPL-2.0; LGPL-2.1-only |
| ch.qos.logback | logback-core | 1.5.38 | EPL-2.0; LGPL-2.1-only |
| com.cronutils | cron-utils | 9.2.1 | Apache-2.0 |
| com.ethlo.time | itu | 1.7.0 | Apache-2.0 |
| com.fasterxml | classmate | 1.7.3 | Apache-2.0 |
| com.fasterxml.jackson.core | jackson-annotations | 2.21 | Apache-2.0 |
| com.fasterxml.jackson.core | jackson-annotations | 2.22 | Apache-2.0 |
| com.fasterxml.jackson.core | jackson-core | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.core | jackson-databind | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.datatype | jackson-datatype-jdk8 | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.datatype | jackson-datatype-joda | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.datatype | jackson-datatype-jsr310 | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.jakarta.rs | jackson-jakarta-rs-base | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.jakarta.rs | jackson-jakarta-rs-json-provider | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.module | jackson-module-jakarta-xmlbind-annotations | 2.22.3 | Apache-2.0 |
| com.fasterxml.jackson.module | jackson-module-parameter-names | 2.22.3 | Apache-2.0 |
| com.fasterxml.uuid | java-uuid-generator | 4.3.0 | Apache-2.0 |
| com.fasterxml.uuid | java-uuid-generator | 5.2.0 | Apache-2.0 |
| com.github.ben-manes.caffeine | caffeine | 3.2.3 | Apache-2.0 |
| com.github.docker-java | docker-java-api | 3.7.1 | Apache-2.0 |
| com.github.docker-java | docker-java-transport | 3.7.1 | Apache-2.0 |
| com.github.docker-java | docker-java-transport-zerodep | 3.7.1 | Apache-2.0 |
| com.github.luben | zstd-jni | 1.5.6-10 | BSD-2-Clause |
| com.github.luben | zstd-jni | 1.5.6-4 | BSD-2-Clause |
| com.github.stephenc.jcip | jcip-annotations | 1.0-1 | Apache-2.0 |
| com.google.auto.service | auto-service-annotations | 1.1.1 | Apache-2.0 |
| com.google.code.gson | gson | 2.13.2 | Apache-2.0 |
| com.google.code.gson | gson | 2.14.0 | Apache-2.0 |
| com.google.errorprone | error_prone_annotations | 2.41.0 | Apache-2.0 |
| com.google.errorprone | error_prone_annotations | 2.48.0 | Apache-2.0 |
| com.google.errorprone | error_prone_annotations | 2.49.0 | Apache-2.0 |
| com.google.guava | failureaccess | 1.0.3 | Apache-2.0 |
| com.google.guava | guava | 33.7.2-jre | Apache-2.0 |
| com.google.guava | listenablefuture | 9999.0-empty-to-avoid-conflict-with-guava | Apache-2.0 |
| com.google.inject | guice | 6.0.0 | Apache-2.0 |
| com.google.j2objc | j2objc-annotations | 3.1 | Apache-2.0 |
| com.google.protobuf | protobuf-java | 4.31.1 | BSD-3-Clause |
| com.googlecode.javaewah | JavaEWAH | 1.2.3 | Apache-2.0 |
| com.h2database | h2 | 2.4.240 | MPL-2.0; EPL 1.0 |
| com.ibm.async | asyncutil | 0.1.0 | Apache-2.0 |
| com.ibm.db2 | jcc | 11.5.9.0 | International Program License Agreement (IPLA) |
| com.jayway.jsonpath | json-path | 2.10.0 | Apache-2.0 |
| com.jayway.jsonpath | json-path | 2.9.0 | Apache-2.0 |
| com.konghq | unirest-java | 3.14.5 | MIT |
| com.lihaoyi | fastparse_2.13 | 3.1.1 | MIT |
| com.lihaoyi | geny_2.13 | 1.1.0 | MIT |
| com.lihaoyi | sourcecode_2.13 | 0.4.0 | MIT |
| com.microsoft.sqlserver | mssql-jdbc | 13.4.0.jre11 | MIT |
| com.mysql | mysql-connector-j | 9.7.0 | The GNU General Public License, v2 with Universal FOSS Exception, v1.0 |
| com.networknt | json-schema-validator | 1.0.76 | Apache-2.0 |
| com.nimbusds | content-type | 2.3 | Apache-2.0 |
| com.nimbusds | lang-tag | 1.7 | Apache-2.0 |
| com.nimbusds | nimbus-jose-jwt | 10.9.1 | Apache-2.0 |
| com.nimbusds | nimbus-jose-jwt | 9.37.4 | Apache-2.0 |
| com.nimbusds | oauth2-oidc-sdk | 11.38.2 | Apache-2.0 |
| com.opencsv | opencsv | 5.12.0 | Apache-2.0 |
| com.oracle.database.jdbc | ojdbc11 | 23.26.2.0.0 | Oracle Free Use Terms and Conditions (FUTC) |
| com.sun.activation | javax.activation | 1.2.0 | (CDDL-1.0 OR GPL-2.0-with-classpath-exception) |
| com.sun.istack | istack-commons-runtime | 4.1.2 | BSD-3-Clause |
| com.sun.mail | javax.mail | 1.5.6 | (CDDL-1.0 OR GPL-2.0-with-classpath-exception) |
| com.tngtech.archunit | archunit | 1.4.2 | Apache-2.0; BSD-4-Clause |
| com.tngtech.archunit | archunit-junit5 | 1.4.2 | Apache-2.0 |
| com.tngtech.archunit | archunit-junit5-api | 1.4.2 | Apache-2.0 |
| com.tngtech.archunit | archunit-junit5-engine | 1.4.2 | Apache-2.0 |
| com.tngtech.archunit | archunit-junit5-engine-api | 1.4.2 | Apache-2.0 |
| com.vaadin.external.google | android-json | 0.0.20131108.vaadin1 | Apache-2.0 |
| com.zaxxer | HikariCP | 7.0.2 | Apache-2.0 |
| commons-codec | commons-codec | 1.15 | Apache-2.0 |
| commons-codec | commons-codec | 1.19.0 | Apache-2.0 |
| commons-codec | commons-codec | 1.22.0 | Apache-2.0 |
| commons-fileupload | commons-fileupload | 1.6.0 | Apache-2.0 |
| commons-io | commons-io | 2.17.0 | Apache-2.0 |
| commons-io | commons-io | 2.22.0 | Apache-2.0 |
| commons-logging | commons-logging | 1.1.1 | Apache-2.0 |
| commons-logging | commons-logging | 1.3.5 | Apache-2.0 |
| commons-logging | commons-logging | 1.3.6 | Apache-2.0 |
| eu.maveniverse.maven.mima | context | 2.4.45 | EPL-2.0 |
| eu.maveniverse.maven.mima.runtime | embedded-maven | 2.4.45 | EPL-2.0 |
| eu.maveniverse.maven.mima.runtime | standalone-shared | 2.4.45 | EPL-2.0 |
| eu.maveniverse.maven.mima.runtime | standalone-static | 2.4.45 | EPL-2.0 |
| io.agroal | agroal-api | 3.2 | Apache-2.0 |
| io.agroal | agroal-narayana | 3.2 | Apache-2.0 |
| io.agroal | agroal-pool | 3.2 | Apache-2.0 |
| io.micrometer | micrometer-commons | 1.16.8 | Apache-2.0 |
| io.micrometer | micrometer-commons | 1.17.2 | Apache-2.0 |
| io.micrometer | micrometer-core | 1.17.2 | Apache-2.0 |
| io.micrometer | micrometer-jakarta9 | 1.17.2 | Apache-2.0 |
| io.micrometer | micrometer-observation | 1.16.8 | Apache-2.0 |
| io.micrometer | micrometer-observation | 1.17.2 | Apache-2.0 |
| io.micrometer | micrometer-registry-prometheus | 1.17.2 | Apache-2.0 |
| io.netty | netty-all | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-buffer | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-codec | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-codec-dns | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-codec-http | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-codec-http2 | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-codec-socks | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-common | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-handler | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-handler-proxy | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-resolver | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-resolver-dns | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport-classes-epoll | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport-classes-kqueue | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport-native-epoll | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport-native-kqueue | 4.1.138.Final | Apache-2.0 |
| io.netty | netty-transport-native-unix-common | 4.1.138.Final | Apache-2.0 |
| io.opentelemetry | opentelemetry-api | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-common | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-context | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-exporter-logging | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-common | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-extension-autoconfigure | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-extension-autoconfigure-spi | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-logs | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-metrics | 1.67.0 | Apache-2.0 |
| io.opentelemetry | opentelemetry-sdk-trace | 1.67.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-config | 1.7.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-core | 1.7.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-exposition-formats | 1.7.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-exposition-textformats | 1.7.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-model | 1.7.0 | Apache-2.0 |
| io.prometheus | prometheus-metrics-tracer-common | 1.7.0 | Apache-2.0 |
| io.quarkus | quarkus-agroal | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-agroal-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-agroal-dev | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-agroal-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-arc | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-arc-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-arc-dev | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-arc-test-supplement | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-arc-test-supplement-decorator | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-assistant-deployment-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-assistant-dev | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-bootstrap-app-model | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-bootstrap-core | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-bootstrap-json | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-bootstrap-runner | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-builder | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-class-change-agent | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-classloader-commons | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-core | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-core-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-credentials | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-credentials-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-datasource | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-datasource-common | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-datasource-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-datasource-deployment-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-datasource-dev | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-development-mode-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-devservices | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-devservices-common | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-devservices-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-devui-deployment-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-fs-util | 1.4.0 | Apache-2.0 |
| io.quarkus | quarkus-hibernate-validator-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-ide-launcher | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-kubernetes-service-binding-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-mutiny | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-mutiny-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-narayana-jta | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-narayana-jta-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-smallrye-context-propagation | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-smallrye-context-propagation-deployment | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-smallrye-context-propagation-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-smallrye-health-spi | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-transaction-annotations | 3.36.1 | Apache-2.0 |
| io.quarkus | quarkus-value-registry | 3.36.1 | Apache-2.0 |
| io.quarkus.arc | arc | 3.36.1 | Apache-2.0 |
| io.quarkus.arc | arc-processor | 3.36.1 | Apache-2.0 |
| io.quarkus.gizmo | gizmo | 1.10.1 | Apache-2.0 |
| io.quarkus.gizmo | gizmo2 | 2.1.1 | Apache-2.0 |
| io.reactivex.rxjava3 | rxjava | 3.1.12 | Apache-2.0 |
| io.smallrye | jandex | 3.5.3 | Apache-2.0 |
| io.smallrye | jandex | 3.6.0 | Apache-2.0 |
| io.smallrye | jandex-gizmo2 | 3.5.3 | Apache-2.0 |
| io.smallrye | smallrye-context-propagation | 2.3.0 | Apache-2.0 |
| io.smallrye | smallrye-context-propagation-api | 2.3.0 | Apache-2.0 |
| io.smallrye | smallrye-context-propagation-jta | 2.3.0 | Apache-2.0 |
| io.smallrye | smallrye-context-propagation-storage | 2.3.0 | Apache-2.0 |
| io.smallrye.classfile | jdk-classfile-backport | 26 | GPL-2.0-with-classpath-exception |
| io.smallrye.common | smallrye-common-annotation | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-classloader | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-constraint | 2.14.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-constraint | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-cpu | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-cpu | 2.4.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-expression | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-expression | 2.4.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-function | 2.14.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-function | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-io | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-net | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-net | 2.4.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-os | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-os | 2.4.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-process | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-ref | 2.17.0 | Apache-2.0 |
| io.smallrye.common | smallrye-common-resource | 2.17.0 | Apache-2.0 |
| io.smallrye.config | smallrye-config | 3.17.2 | Apache-2.0 |
| io.smallrye.config | smallrye-config-common | 3.17.2 | Apache-2.0 |
| io.smallrye.config | smallrye-config-core | 3.17.2 | Apache-2.0 |
| io.smallrye.reactive | mutiny | 3.2.0 | Apache-2.0 |
| io.smallrye.reactive | mutiny-smallrye-context-propagation | 3.2.0 | Apache-2.0 |
| io.smallrye.reactive | mutiny-zero-flow-adapters | 1.2.0 | Apache-2.0 |
| io.smallrye.reactive | smallrye-reactive-converter-api | 3.0.3 | Apache-2.0 |
| io.smallrye.reactive | smallrye-reactive-converter-mutiny | 3.0.3 | Apache-2.0 |
| io.undertow | undertow-core | 2.4.3.Final | Apache-2.0 |
| jakarta.activation | jakarta.activation-api | 2.1.0 | BSD-3-Clause |
| jakarta.activation | jakarta.activation-api | 2.1.4 | BSD-3-Clause |
| jakarta.annotation | jakarta.annotation-api | 2.1.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.annotation | jakarta.annotation-api | 3.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.authentication | jakarta.authentication-api | 3.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.authentication | jakarta.authentication-api | 3.1.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.authorization | jakarta.authorization-api | 3.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.ejb | jakarta.ejb-api | 4.0.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.el | jakarta.el-api | 5.0.1 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.el | jakarta.el-api | 6.0.1 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.enterprise | jakarta.enterprise.cdi-api | 4.0.1 | Apache-2.0 |
| jakarta.enterprise | jakarta.enterprise.cdi-api | 4.1.0 | Apache-2.0 |
| jakarta.enterprise | jakarta.enterprise.lang-model | 4.0.1 | Apache-2.0 |
| jakarta.enterprise | jakarta.enterprise.lang-model | 4.1.0 | Apache-2.0 |
| jakarta.enterprise.concurrent | jakarta.enterprise.concurrent-api | 3.0.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.enterprise.concurrent | jakarta.enterprise.concurrent-api | 3.1.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.faces | jakarta.faces-api | 4.0.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.inject | jakarta.inject-api | 2.0.1 | Apache-2.0 |
| jakarta.interceptor | jakarta.interceptor-api | 2.1.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.interceptor | jakarta.interceptor-api | 2.2.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.jms | jakarta.jms-api | 3.1.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.json | jakarta.json-api | 2.1.3 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.json.bind | jakarta.json.bind-api | 3.0.4 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.persistence | jakarta.persistence-api | 3.2.0 | EPL-2.0; BSD-3-Clause |
| jakarta.platform | jakarta.jakartaee-web-api | 10.0.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.resource | jakarta.resource-api | 2.1.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.security.enterprise | jakarta.security.enterprise-api | 3.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.servlet | jakarta.servlet-api | 6.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.servlet | jakarta.servlet-api | 6.1.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.servlet.jsp | jakarta.servlet.jsp-api | 3.1.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.servlet.jsp | jakarta.servlet.jsp-api | 4.0.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.servlet.jsp.jstl | jakarta.servlet.jsp.jstl-api | 3.0.2 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.transaction | jakarta.transaction-api | 2.0.1 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.validation | jakarta.validation-api | 3.0.2 | Apache-2.0 |
| jakarta.validation | jakarta.validation-api | 3.1.1 | Apache-2.0 |
| jakarta.websocket | jakarta.websocket-api | 2.2.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.websocket | jakarta.websocket-client-api | 2.2.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| jakarta.ws.rs | jakarta.ws.rs-api | 3.1.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.ws.rs | jakarta.ws.rs-api | 4.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| jakarta.xml.bind | jakarta.xml.bind-api | 3.0.1 | BSD-3-Clause |
| jakarta.xml.bind | jakarta.xml.bind-api | 4.0.0 | BSD-3-Clause |
| jakarta.xml.bind | jakarta.xml.bind-api | 4.0.5 | BSD-3-Clause |
| javax.activation | activation | 1.1 | CDDL-1.0 |
| javax.activation | activation | 1.1.1 | CDDL-1.0 |
| javax.enterprise | cdi-api | 1.0-SP4 | Apache-2.0 |
| javax.inject | javax.inject | 1 | Apache-2.0 |
| javax.jws | jsr181-api | 1.0-MR1 | CDDL+GPLv2 |
| javax.mail | mail | 1.4.4 | CDDL; GPL-2.0-with-classpath-exception |
| javax.validation | validation-api | 1.0.0.GA | Apache-2.0 |
| javax.validation | validation-api | 2.0.1.Final | Apache-2.0 |
| javax.xml.bind | jaxb-api | 2.3.1 | CDDL-1.1; GPL-2.0-with-classpath-exception |
| joda-time | joda-time | 2.12.5 | Apache-2.0 |
| joda-time | joda-time | 2.14.0 | Apache-2.0 |
| junit | junit | 4.13.1 | EPL-1.0 |
| junit | junit | 4.13.2 | EPL-1.0 |
| net.bytebuddy | byte-buddy | 1.18.15 | Apache-2.0 |
| net.bytebuddy | byte-buddy | 1.18.2 | Apache-2.0 |
| net.bytebuddy | byte-buddy | 1.18.3 | Apache-2.0 |
| net.bytebuddy | byte-buddy-agent | 1.18.15 | Apache-2.0 |
| net.bytebuddy | byte-buddy-agent | 1.18.8 | Apache-2.0 |
| net.java.dev.jna | jna | 5.18.1 | LGPL-2.1-or-later; Apache-2.0 |
| net.java.dev.jna | jna | 5.8.0 | LGPL, version 2.1; Apache-2.0 |
| net.minidev | accessors-smart | 2.5.2 | Apache-2.0 |
| net.minidev | accessors-smart | 2.6.0 | Apache-2.0 |
| net.minidev | json-smart | 2.5.2 | Apache-2.0 |
| net.minidev | json-smart | 2.6.0 | Apache-2.0 |
| org.aesh | aesh | 2.8.2 | Apache-2.0 |
| org.aesh | readline | 2.6 | Apache-2.0 |
| org.antlr | antlr4-runtime | 4.13.2 | BSD-3-Clause |
| org.apache.ant | ant | 1.10.17 | Apache-2.0 |
| org.apache.ant | ant-launcher | 1.10.17 | Apache-2.0 |
| org.apache.commons | commons-collections4 | 4.6.0 | Apache-2.0 |
| org.apache.commons | commons-compress | 1.28.0 | Apache-2.0 |
| org.apache.commons | commons-email | 1.5 | Apache-2.0 |
| org.apache.commons | commons-exec | 1.6.0 | Apache-2.0 |
| org.apache.commons | commons-lang3 | 3.19.0 | Apache-2.0 |
| org.apache.commons | commons-lang3 | 3.20.0 | Apache-2.0 |
| org.apache.commons | commons-text | 1.15.0 | Apache-2.0 |
| org.apache.geronimo.specs | geronimo-jta_1.1_spec | 1.1.1 | Apache-2.0 |
| org.apache.groovy | groovy | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-datetime | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-dateutil | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-json | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-jsr223 | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-templates | 5.0.8 | Apache-2.0 |
| org.apache.groovy | groovy-xml | 5.0.8 | Apache-2.0 |
| org.apache.httpcomponents | httpasyncclient | 4.1.5 | Apache-2.0 |
| org.apache.httpcomponents | httpclient | 4.5.13 | Apache-2.0 |
| org.apache.httpcomponents | httpcore | 4.4.13 | Apache-2.0 |
| org.apache.httpcomponents | httpcore-nio | 4.4.13 | Apache-2.0 |
| org.apache.httpcomponents | httpmime | 4.5.13 | Apache-2.0 |
| org.apache.httpcomponents.client5 | httpclient5 | 5.6.5 | Apache-2.0 |
| org.apache.httpcomponents.core5 | httpcore5 | 5.4.4 | Apache-2.0 |
| org.apache.httpcomponents.core5 | httpcore5-h2 | 5.4.4 | Apache-2.0 |
| org.apache.kafka | kafka-clients | 3.9.2 | Apache-2.0 |
| org.apache.kafka | kafka-clients | 4.2.2 | Apache-2.0 |
| org.apache.logging.log4j | log4j-api | 2.25.5 | Apache-2.0 |
| org.apache.logging.log4j | log4j-to-slf4j | 2.25.5 | Apache-2.0 |
| org.apache.maven | maven-artifact | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-builder-support | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-model | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-model-builder | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-repository-metadata | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-resolver-provider | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-settings | 3.9.16 | Apache-2.0 |
| org.apache.maven | maven-settings-builder | 3.9.16 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-api | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-connector-basic | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-impl | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-named-locks | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-spi | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-supplier | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-transport-file | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-transport-http | 1.9.27 | Apache-2.0 |
| org.apache.maven.resolver | maven-resolver-util | 1.9.27 | Apache-2.0 |
| org.apache.maven.shared | maven-invoker | 3.3.0 | Apache-2.0 |
| org.apache.maven.shared | maven-shared-utils | 3.4.2 | Apache-2.0 |
| org.apache.sshd | sshd-common | 2.19.0 | Apache-2.0 |
| org.apache.sshd | sshd-core | 2.19.0 | Apache-2.0 |
| org.apache.tomcat | tomcat | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-annotations-api | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-api | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-catalina | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-coyote | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-el-api | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-jaspic-api | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-jdbc | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-jni | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-jsp-api | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-juli | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-servlet-api | 11.0.26 | Apache License, Version 2.0 and Common Development And Distribution License (CDDL) Version 1.0 and Eclipse Public License - v 2.0 |
| org.apache.tomcat | tomcat-util | 11.0.26 | Apache-2.0 |
| org.apache.tomcat | tomcat-util-scan | 11.0.26 | Apache-2.0 |
| org.apache.tomcat.embed | tomcat-embed-core | 11.0.26 | Apache-2.0 |
| org.apache.tomcat.embed | tomcat-embed-el | 11.0.26 | Apache-2.0 |
| org.apache.tomcat.embed | tomcat-embed-websocket | 11.0.26 | Apache-2.0 |
| org.apiguardian | apiguardian-api | 1.1.2 | Apache-2.0 |
| org.aspectj | aspectjweaver | 1.9.25.1 | EPL-2.0 |
| org.assertj | assertj-core | 3.27.7 | Apache-2.0 |
| org.awaitility | awaitility | 4.2.2 | Apache-2.0 |
| org.awaitility | awaitility | 4.3.0 | Apache-2.0 |
| org.camunda.feel | feel-engine | 1.19.3 | Apache-2.0 |
| org.codehaus.fabric3.api | commonj | 1.1.0 | Fabric3 License |
| org.codehaus.plexus | plexus-cipher | 2.0 | Apache-2.0 |
| org.codehaus.plexus | plexus-classworlds | 2.12.0 | Apache-2.0 |
| org.codehaus.plexus | plexus-compiler-api | 2.16.2 | Apache-2.0 |
| org.codehaus.plexus | plexus-compiler-javac | 2.16.2 | Apache-2.0 |
| org.codehaus.plexus | plexus-component-annotations | 2.2.0 | Apache-2.0 |
| org.codehaus.plexus | plexus-interpolation | 1.29 | Apache-2.0 |
| org.codehaus.plexus | plexus-sec-dispatcher | 2.0 | Apache-2.0 |
| org.codehaus.plexus | plexus-utils | 3.6.1 | Apache-2.0 |
| org.crac | crac | 1.5.0 | BSD-2-Clause |
| org.eclipse.angus | angus-activation | 1.0.0 | BSD-3-Clause |
| org.eclipse.angus | angus-activation | 2.0.3 | BSD-3-Clause |
| org.eclipse.jgit | org.eclipse.jgit | 7.6.0.202603022253-r | BSD-3-Clause |
| org.eclipse.jgit | org.eclipse.jgit.ssh.apache | 7.6.0.202603022253-r | BSD-3-Clause |
| org.eclipse.microprofile.config | microprofile-config-api | 3.1.1-RC1 | Apache-2.0 |
| org.eclipse.microprofile.context-propagation | microprofile-context-propagation-api | 1.3 | Apache-2.0 |
| org.eclipse.parsson | parsson | 1.1.9 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| org.eclipse.sisu | org.eclipse.sisu.inject | 1.0.0 | EPL-2.0 |
| org.eclipse.sisu | org.eclipse.sisu.plexus | 1.0.0 | EPL-2.0 |
| org.freemarker | freemarker | 2.3.35 | Apache-2.0 |
| org.fusesource.jansi | jansi | 2.4.0 | Apache-2.0 |
| org.glassfish.expressly | expressly | 5.0.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| org.glassfish.expressly | expressly | 6.0.0 | EPL-2.0; GNU General Public License, version 2 with the GNU Classpath Exception |
| org.glassfish.extras | glassfish-embedded-all | 3.1.1 | (CDDL-1.0 OR GPL-2.0-with-classpath-exception) |
| org.glassfish.hk2 | class-model | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2 | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2-api | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2-core | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2-locator | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2-runlevel | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | hk2-utils | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | osgi-resource-locator | 3.0.0 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2 | spring-bridge | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.hk2.external | aopalliance-repackaged | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception |
| org.glassfish.jaxb | jaxb-core | 4.0.9 | BSD-3-Clause |
| org.glassfish.jaxb | jaxb-runtime | 4.0.9 | BSD-3-Clause |
| org.glassfish.jaxb | txw2 | 4.0.9 | BSD-3-Clause |
| org.glassfish.jersey.containers | jersey-container-servlet | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.core | jersey-client | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.core | jersey-common | 4.0.3 | EPL-2.0; The GNU General Public License (GPL), Version 2, With Classpath Exception; Apache License, 2.0; Public Domain |
| org.glassfish.jersey.core | jersey-server | 4.0.3 | EPL-2.0; The GNU General Public License (GPL), Version 2, With Classpath Exception; Apache License, 2.0; Modified BSD |
| org.glassfish.jersey.ext | jersey-bean-validation | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.ext | jersey-entity-filtering | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.ext | jersey-spring6 | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.inject | jersey-hk2 | 4.0.3 | EPL-2.0; GPL-2.0-with-classpath-exception; BSD-3-Clause; BSD-2-Clause; Apache License, 2.0; Public Domain; Modified BSD; jQuery license; MIT; W3C license |
| org.glassfish.jersey.media | jersey-media-json-jackson | 4.0.3 | EPL-2.0; The GNU General Public License (GPL), Version 2, With Classpath Exception; Apache License, 2.0 |
| org.graalvm.js | js | 25.1.3 | UPL-1.0; MIT |
| org.graalvm.js | js-language | 25.1.3 | UPL-1.0; MIT |
| org.graalvm.js | js-scriptengine | 25.1.3 | UPL-1.0 |
| org.graalvm.polyglot | polyglot | 25.1.3 | UPL-1.0 |
| org.graalvm.regex | regex | 25.1.3 | UPL-1.0 |
| org.graalvm.sdk | collections | 25.1.3 | UPL-1.0 |
| org.graalvm.sdk | jniutils | 25.1.3 | UPL-1.0 |
| org.graalvm.sdk | nativeimage | 23.1.2 | UPL-1.0 |
| org.graalvm.sdk | nativeimage | 25.1.3 | UPL-1.0 |
| org.graalvm.sdk | word | 23.1.2 | UPL-1.0 |
| org.graalvm.sdk | word | 25.1.3 | UPL-1.0 |
| org.graalvm.shadowed | icu4j | 25.1.3 | Unicode/ICU License |
| org.graalvm.shadowed | xz | 25.1.3 | UPL-1.0 |
| org.graalvm.truffle | truffle-api | 25.1.3 | UPL-1.0 |
| org.graalvm.truffle | truffle-compiler | 25.1.3 | UPL-1.0 |
| org.graalvm.truffle | truffle-runtime | 25.1.3 | UPL-1.0 |
| org.hamcrest | hamcrest | 3.0 | BSD-3-Clause |
| org.hamcrest | hamcrest-core | 1.3 | BSD-3-Clause |
| org.hdrhistogram | HdrHistogram | 2.2.2 | CC0-1.0; BSD-2-Clause |
| org.hibernate.javax.persistence | hibernate-jpa-2.0-api | 1.0.1.Final | Not declared in source metadata |
| org.hibernate.models | hibernate-models | 1.1.2 | Apache-2.0 |
| org.hibernate.orm | hibernate-core | 7.4.13.Final | Apache-2.0 |
| org.hibernate.validator | hibernate-validator | 9.1.1.Final | Apache-2.0 |
| org.hibernate.validator | hibernate-validator | 9.1.5.Final | Apache-2.0 |
| org.hibernate.validator | hibernate-validator-cdi | 9.1.1.Final | Apache-2.0 |
| org.infinispan | infinispan-commons | 16.0.13 | Apache-2.0 |
| org.infinispan | infinispan-core | 16.0.13 | Apache-2.0 |
| org.infinispan | infinispan-counter-api | 16.0.13 | Apache-2.0 |
| org.infinispan.protostream | protostream | 6.0.7 | Apache-2.0 |
| org.infinispan.protostream | protostream-types | 6.0.7 | Apache-2.0 |
| org.javassist | javassist | 3.33.0-GA | MPL-1.1; LGPL-2.1-only; Apache-2.0 |
| org.jboss | jandex | 2.4.3.Final | Apache-2.0 |
| org.jboss | jandex | 2.4.5.Final | Apache-2.0 |
| org.jboss | jboss-dmr | 1.7.0.Final | Apache-2.0 |
| org.jboss | jboss-ejb-client | 5.0.8.Final | Apache-2.0 |
| org.jboss | jboss-iiop-client | 2.0.1.Final | Apache-2.0 |
| org.jboss | jboss-transaction-spi | 8.0.0.Final | Public Domain |
| org.jboss | jboss-vfs | 3.1.0.Final | lgpl |
| org.jboss | jboss-vfs | 3.3.2.Final | Apache-2.0 |
| org.jboss | staxmapper | 1.5.0.Final | Apache-2.0 |
| org.jboss.arquillian.config | arquillian-config-api | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.config | arquillian-config-impl-base | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.config | arquillian-config-spi | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.container | arquillian-container-impl-base | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.container | arquillian-container-spi | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.container | arquillian-container-test-api | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.container | arquillian-container-test-impl-base | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.container | arquillian-container-test-spi | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.core | arquillian-core-api | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.core | arquillian-core-impl-base | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.core | arquillian-core-spi | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.junit | arquillian-junit-container | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.junit | arquillian-junit-core | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.test | arquillian-test-api | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.test | arquillian-test-impl-base | 1.10.2.Final | Apache-2.0 |
| org.jboss.arquillian.test | arquillian-test-spi | 1.10.2.Final | Apache-2.0 |
| org.jboss.classfilewriter | jboss-classfilewriter | 1.3.1.Final | Apache-2.0 |
| org.jboss.common | jboss-common-beans | 2.0.1.Final | lgpl |
| org.jboss.ejb3 | jboss-ejb3-ext-api | 2.4.0.Final | Apache-2.0 |
| org.jboss.invocation | jboss-invocation | 2.0.1.Final | Apache-2.0 |
| org.jboss.ironjacamar | ironjacamar-common-api | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-common-impl | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-common-spi | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-core-api | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-core-impl | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-deployers-common | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-jdbc | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.ironjacamar | ironjacamar-spec-api | 1.0.10.Final | lgpl |
| org.jboss.ironjacamar | ironjacamar-validator | 3.0.22.Final | LGPL-2.1+ |
| org.jboss.logging | commons-logging-jboss-logging | 2.0.0.Final | Apache-2.0 |
| org.jboss.logging | jboss-logging | 3.0.0.CR1 | lgpl |
| org.jboss.logging | jboss-logging | 3.5.0.Final | Apache-2.0 |
| org.jboss.logging | jboss-logging | 3.6.3.Final | Apache-2.0 |
| org.jboss.logmanager | jboss-logmanager | 2.1.19.Final | Apache-2.0 |
| org.jboss.logmanager | jboss-logmanager | 3.2.2.Final | Apache-2.0 |
| org.jboss.marshalling | jboss-marshalling | 2.3.0 | Apache-2.0 |
| org.jboss.marshalling | jboss-marshalling-river | 2.3.0 | Apache-2.0 |
| org.jboss.metadata | jboss-metadata-common | 17.1.0 | Apache-2.0 |
| org.jboss.metadata | jboss-metadata-ear | 17.1.0 | Apache-2.0 |
| org.jboss.metadata | jboss-metadata-ejb | 17.1.0 | Apache-2.0 |
| org.jboss.metadata | jboss-metadata-web | 17.1.0 | Apache-2.0 |
| org.jboss.modules | jboss-modules | 2.1.6.Final | Apache-2.0; Indiana University Extreme! Lab Software License 1.1.1 |
| org.jboss.msc | jboss-msc | 1.5.6.Final | LGPL-2.1 |
| org.jboss.narayana.jta | narayana-jta | 7.3.4.Final | Apache-2.0 |
| org.jboss.narayana.jts | narayana-jts-integration | 7.3.4.Final | Apache-2.0 |
| org.jboss.remoting | jboss-remoting | 5.0.32.Final | Apache-2.0 |
| org.jboss.resteasy | resteasy-core | 6.2.16.Final | Apache-2.0 |
| org.jboss.resteasy | resteasy-core | 6.2.3.Final | Apache-2.0 |
| org.jboss.resteasy | resteasy-core-spi | 6.2.16.Final | Apache-2.0 |
| org.jboss.resteasy | resteasy-core-spi | 6.2.3.Final | Apache-2.0 |
| org.jboss.shrinkwrap | shrinkwrap-api | 1.2.6 | Apache-2.0 |
| org.jboss.shrinkwrap | shrinkwrap-impl-base | 1.2.6 | Apache-2.0 |
| org.jboss.shrinkwrap | shrinkwrap-spi | 1.2.6 | Apache-2.0 |
| org.jboss.shrinkwrap.descriptors | shrinkwrap-descriptors-api-base | 2.0.0 | Apache-2.0 |
| org.jboss.shrinkwrap.descriptors | shrinkwrap-descriptors-spi | 2.0.0 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-api | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-api-maven | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-api-maven-archive | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-api-maven-embedded | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-depchain | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-impl-maven | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-impl-maven-archive | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-impl-maven-embedded | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-spi | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-spi-maven | 3.3.7 | Apache-2.0 |
| org.jboss.shrinkwrap.resolver | shrinkwrap-resolver-spi-maven-archive | 3.3.7 | Apache-2.0 |
| org.jboss.slf4j | slf4j-jboss-logmanager | 2.0.2.Final | Apache-2.0 |
| org.jboss.spec | jboss-javaee-6.0 | 3.0.2.Final | LGPL-2.1-only |
| org.jboss.spec.jakarta.el | jakarta.el-api | 6.0.2.Final | EPL-2.0; GPL-2.0-with-classpath-exception; Apache-2.0 |
| org.jboss.spec.javax.annotation | jboss-annotations-api_1.1_spec | 1.0.1.Final | CDDL or GPLv2 with exceptions |
| org.jboss.spec.javax.ejb | jboss-ejb-api_3.1_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.el | jboss-el-api_2.2_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.enterprise.deploy | jboss-jad-api_1.2_spec | 1.0.1.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.faces | jboss-jsf-api_2.1_spec | 2.0.9.Final | CDDL or GPLv2 with exceptions |
| org.jboss.spec.javax.interceptor | jboss-interceptors-api_1.1_spec | 1.0.1.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.jms | jboss-jms-api_1.1_spec | 1.0.1.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.management.j2ee | jboss-j2eemgmt-api_1.1_spec | 1.0.1.Final | lgpl |
| org.jboss.spec.javax.resource | jboss-connector-api_1.6_spec | 1.0.1.Final | CDDL or GPLv2 with exceptions |
| org.jboss.spec.javax.rmi | jboss-rmi-api_1.0_spec | 1.0.4.Final | lgpl |
| org.jboss.spec.javax.security.auth.message | jboss-jaspi-api_1.0_spec | 1.0.1.Final | lgpl |
| org.jboss.spec.javax.security.jacc | jboss-jacc-api_1.4_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.servlet | jboss-servlet-api_3.0_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.servlet.jsp | jboss-jsp-api_2.2_spec | 1.0.1.Final | lgpl |
| org.jboss.spec.javax.servlet.jstl | jboss-jstl-api_1.2_spec | 1.0.3.Final | CDDL or GPLv2 with exceptions |
| org.jboss.spec.javax.transaction | jboss-transaction-api_1.1_spec | 1.0.1.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.ws.rs | jboss-jaxrs-api_1.1_spec | 1.0.1.Final | CDDL |
| org.jboss.spec.javax.xml.bind | jboss-jaxb-api_2.2_spec | 1.0.4.Final | CDDL or GPLv2 with exceptions |
| org.jboss.spec.javax.xml.registry | jboss-jaxr-api_1.0_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.xml.rpc | jboss-jaxrpc-api_1.1_spec | 1.0.1.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.xml.soap | jboss-saaj-api_1.3_spec | 1.0.2.Final | Common Development and Distribution License; GNU General Public License, Version 2 with the Classpath Exception |
| org.jboss.spec.javax.xml.ws | jboss-jaxws-api_2.2_spec | 2.0.1.Final | lgpl |
| org.jboss.stdio | jboss-stdio | 1.1.0.Final | LGPL-2.1 |
| org.jboss.threads | jboss-threads | 3.9.2 | Apache-2.0 |
| org.jboss.xnio | xnio-api | 3.8.16.Final | Apache-2.0 |
| org.jctools | jctools-core | 4.0.5 | Apache-2.0 |
| org.jetbrains | annotations | 17.0.0 | Apache-2.0 |
| org.jetbrains | annotations | 26.1.0 | Apache-2.0 |
| org.jgroups | jgroups | 5.5.6.Final | Apache-2.0 |
| org.jruby | jruby-complete | 9.1.17.0 | GPL-2.0; LGPL-2.1; EPL-2.0 |
| org.jspecify | jspecify | 1.0.0 | Apache-2.0 |
| org.jspecify | jspecify | 1.0.1 | Apache-2.0 |
| org.junit.jupiter | junit-jupiter | 6.0.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter | 6.1.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-api | 6.0.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-api | 6.1.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-engine | 6.0.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-engine | 6.1.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-params | 6.0.3 | EPL-2.0 |
| org.junit.jupiter | junit-jupiter-params | 6.1.3 | EPL-2.0 |
| org.junit.platform | junit-platform-commons | 6.0.3 | EPL-2.0 |
| org.junit.platform | junit-platform-commons | 6.1.3 | EPL-2.0 |
| org.junit.platform | junit-platform-engine | 6.0.3 | EPL-2.0 |
| org.junit.platform | junit-platform-engine | 6.1.3 | EPL-2.0 |
| org.junit.platform | junit-platform-launcher | 6.0.3 | EPL-2.0 |
| org.junit.vintage | junit-vintage-engine | 6.0.3 | EPL-2.0 |
| org.junit.vintage | junit-vintage-engine | 6.1.3 | EPL-2.0 |
| org.liquibase | liquibase-core | 5.0.4 | FSL-1.1-ALv2 |
| org.mariadb.jdbc | mariadb-java-client | 3.5.10 | LGPL-2.1-or-later |
| org.mockito | mockito-core | 5.23.0 | MIT |
| org.mockito | mockito-junit-jupiter | 5.23.0 | MIT |
| org.mybatis | mybatis | 3.5.15 | Apache-2.0 |
| org.mybatis | mybatis | 3.5.19 | Apache-2.0 |
| org.objenesis | objenesis | 3.3 | Apache-2.0 |
| org.opentest4j | opentest4j | 1.3.0 | Apache-2.0 |
| org.ow2.asm | asm | 9.7.1 | BSD-3-Clause |
| org.ow2.asm | asm | 9.9.1 | BSD-3-Clause |
| org.ow2.asm | asm-analysis | 9.9.1 | BSD-3-Clause |
| org.ow2.asm | asm-commons | 9.10.1 | BSD-3-Clause |
| org.ow2.asm | asm-commons | 9.9.1 | BSD-3-Clause |
| org.ow2.asm | asm-tree | 9.9.1 | BSD-3-Clause |
| org.ow2.asm | asm-util | 9.9.1 | BSD-3-Clause |
| org.postgresql | postgresql | 42.7.12 | BSD-2-Clause |
| org.projectlombok | lombok | 1.18.46 | MIT |
| org.projectlombok | lombok | 1.18.48 | MIT |
| org.projectodd.vdx | vdx-core | 1.1.6 | Apache-2.0 |
| org.projectodd.vdx | vdx-wildfly | 1.1.6 | Apache-2.0 |
| org.python | jython-standalone | 2.7.4 | Jython Software License |
| org.reactivestreams | reactive-streams | 1.0.4 | MIT-0 |
| org.rnorth.duct-tape | duct-tape | 1.0.8 | MIT |
| org.scala-lang | scala-library | 2.13.15 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-api | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-chrome-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-chromium-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-devtools-v141 | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-devtools-v142 | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-devtools-v143 | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-edge-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-firefox-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-http | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-ie-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-java | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-json | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-manager | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-os | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-remote-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-safari-driver | 4.39.0 | Apache-2.0 |
| org.seleniumhq.selenium | selenium-support | 4.39.0 | Apache-2.0 |
| org.skyscreamer | jsonassert | 1.5.3 | Apache-2.0 |
| org.slf4j | jcl-over-slf4j | 2.0.18 | Apache-2.0 |
| org.slf4j | jul-to-slf4j | 2.0.20 | MIT |
| org.slf4j | slf4j-api | 1.7.25 | MIT |
| org.slf4j | slf4j-api | 1.7.36 | MIT |
| org.slf4j | slf4j-api | 2.0.17 | MIT |
| org.slf4j | slf4j-api | 2.0.18 | MIT |
| org.slf4j | slf4j-api | 2.0.20 | MIT |
| org.slf4j | slf4j-jdk14 | 2.0.18 | MIT |
| org.springframework | spring-aop | 7.0.10 | Apache-2.0 |
| org.springframework | spring-aspects | 7.0.10 | Apache-2.0 |
| org.springframework | spring-beans | 7.0.10 | Apache-2.0 |
| org.springframework | spring-beans | 7.0.9 | Apache-2.0 |
| org.springframework | spring-context | 7.0.10 | Apache-2.0 |
| org.springframework | spring-core | 7.0.10 | Apache-2.0 |
| org.springframework | spring-core | 7.0.9 | Apache-2.0 |
| org.springframework | spring-expression | 7.0.10 | Apache-2.0 |
| org.springframework | spring-jdbc | 7.0.10 | Apache-2.0 |
| org.springframework | spring-orm | 7.0.10 | Apache-2.0 |
| org.springframework | spring-test | 7.0.10 | Apache-2.0 |
| org.springframework | spring-tx | 7.0.10 | Apache-2.0 |
| org.springframework | spring-web | 7.0.10 | Apache-2.0 |
| org.springframework | spring-webmvc | 7.0.10 | Apache-2.0 |
| org.springframework.boot | spring-boot | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-actuator | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-actuator-autoconfigure | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-autoconfigure | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-configuration-processor | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-data-commons | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-data-jpa | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-devtools | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-health | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-hibernate | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-http-converter | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-jackson | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-jackson2 | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-jdbc | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-jersey | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-jpa | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-micrometer-metrics | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-micrometer-observation | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-persistence | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-security | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-security-oauth2-client | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-servlet | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-sql | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-actuator | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-data-jpa | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-jackson | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-jdbc | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-jersey | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-logging | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-micrometer-metrics | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-oauth2-client | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-security | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-test | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-tomcat | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-tomcat-runtime | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-validation | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-starter-web | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-test | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-test-autoconfigure | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-tomcat | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-transaction | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-validation | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-web-server | 4.1.2 | Apache-2.0 |
| org.springframework.boot | spring-boot-webmvc | 4.1.2 | Apache-2.0 |
| org.springframework.data | spring-data-commons | 4.1.2 | Apache-2.0 |
| org.springframework.data | spring-data-jpa | 4.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-config | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-core | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-crypto | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-oauth2-client | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-oauth2-core | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-oauth2-jose | 7.1.2 | Apache-2.0 |
| org.springframework.security | spring-security-web | 7.1.2 | Apache-2.0 |
| org.testcontainers | testcontainers | 2.0.5 | MIT |
| org.testcontainers | testcontainers-database-commons | 2.0.5 | MIT |
| org.testcontainers | testcontainers-db2 | 2.0.5 | MIT |
| org.testcontainers | testcontainers-jdbc | 2.0.5 | MIT |
| org.testcontainers | testcontainers-mariadb | 2.0.5 | MIT |
| org.testcontainers | testcontainers-mssqlserver | 2.0.5 | MIT |
| org.testcontainers | testcontainers-mysql | 2.0.5 | MIT |
| org.testcontainers | testcontainers-oracle-free | 2.0.5 | MIT |
| org.testcontainers | testcontainers-postgresql | 2.0.5 | MIT |
| org.wildfly | wildfly-clustering-common | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-ejb-spi | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-infinispan-embedded-service | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-server-api | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-server-service | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-service | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-clustering-singleton-api | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-common-ee-dependency-management | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-common-expansion-dependency-management | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-concurrency-spi | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-connector | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-dist | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-ee | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-ejb3 | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-galleon-pack | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-iiop-openjdk | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-naming | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-naming-client | 2.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-standard-ee-bom | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-standard-expansion-bom | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-transactions | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-web-common | 41.0.1.Final | Apache-2.0 |
| org.wildfly | wildfly-weld-common | 41.0.1.Final | Apache-2.0 |
| org.wildfly.client | wildfly-client-config | 1.0.1.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-cache-spi | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-context | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-function | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-marshalling-jboss | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-marshalling-protostream | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-marshalling-spi | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-server-api | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-server-local | 10.0.9.Final | Apache-2.0 |
| org.wildfly.clustering | wildfly-clustering-server-spi | 10.0.9.Final | Apache-2.0 |
| org.wildfly.common | wildfly-common | 2.0.1 | Apache-2.0 |
| org.wildfly.core | wildfly-controller | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-controller-client | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-core-management-client | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-core-security | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-deployment-repository | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-domain-http-interface | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-domain-management | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-embedded | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-io-spi | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-network | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-platform-mbean | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-process-controller | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-remoting | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-request-controller | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-server | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-service | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-subsystem | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-threads | 33.0.1.Final | Apache-2.0 |
| org.wildfly.core | wildfly-version | 33.0.1.Final | Apache-2.0 |
| org.wildfly.discovery | wildfly-discovery-client | 1.3.0.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-asn1 | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-audit | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth-server | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth-server-deprecated | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth-server-http | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth-server-sasl | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-auth-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-base | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-client | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-credential | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-credential-source-impl | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-credential-store | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-encryption | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-http | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-http-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-keystore | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-mechanism | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-mechanism-digest | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-mechanism-gssapi | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-password-impl | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-permission | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-provider-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-realm | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-sasl | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-sasl-anonymous | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-sasl-auth-util | 2.5.0.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-sasl-digest | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-security-manager | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-security-manager-action | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-ssh-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-ssl | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-x500 | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-x500-cert | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-x500-cert-acme | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security | wildfly-elytron-x500-cert-util | 2.9.2.Final | Apache-2.0 |
| org.wildfly.security.elytron-web | undertow-server | 4.2.1.Final | Apache-2.0 |
| org.wildfly.security.jakarta | jakarta-authorization | 4.0.0.Final | Apache-2.0 |
| org.wildfly.transaction | wildfly-transaction-client | 3.0.5.Final | Apache-2.0 |
| org.wildfly.wildfly-http-client | wildfly-http-client-common | 2.1.4.Final | Apache-2.0 |
| org.wildfly.wildfly-http-client | wildfly-http-ejb-client | 2.1.4.Final | Apache-2.0 |
| org.xerial.snappy | snappy-java | 1.1.10.12 | Apache-2.0 |
| org.xmlunit | xmlunit-core | 2.11.0 | Apache-2.0 |
| org.yaml | snakeyaml | 2.6 | Apache-2.0 |
| tools.jackson.core | jackson-core | 3.1.7 | Apache-2.0 |
| tools.jackson.core | jackson-databind | 3.1.7 | Apache-2.0 |
| xalan | xalan | 2.7.3 | Not declared in source metadata |

### JavaScript dependencies (871)

| Package | Version | Declared license | Use |
| --- | --- | --- | --- |
| @babel/code-frame | 7.29.7 | MIT | Build/development |
| @babel/compat-data | 7.29.7 | MIT | Build/development |
| @babel/core | 7.29.6 | MIT | Build/development |
| @babel/generator | 7.29.7 | MIT | Build/development |
| @babel/helper-annotate-as-pure | 7.29.7 | MIT | Build/development |
| @babel/helper-compilation-targets | 7.29.7 | MIT | Build/development |
| @babel/helper-create-class-features-plugin | 7.29.7 | MIT | Build/development |
| @babel/helper-create-regexp-features-plugin | 7.29.7 | MIT | Build/development |
| @babel/helper-define-polyfill-provider | 0.6.8 | MIT | Build/development |
| @babel/helper-globals | 7.29.7 | MIT | Build/development |
| @babel/helper-member-expression-to-functions | 7.29.7 | MIT | Build/development |
| @babel/helper-module-imports | 7.29.7 | MIT | Build/development |
| @babel/helper-module-transforms | 7.29.7 | MIT | Build/development |
| @babel/helper-optimise-call-expression | 7.29.7 | MIT | Build/development |
| @babel/helper-plugin-utils | 7.29.7 | MIT | Build/development |
| @babel/helper-remap-async-to-generator | 7.29.7 | MIT | Build/development |
| @babel/helper-replace-supers | 7.29.7 | MIT | Build/development |
| @babel/helper-skip-transparent-expression-wrappers | 7.29.7 | MIT | Build/development |
| @babel/helper-string-parser | 7.29.7 | MIT | Build/development |
| @babel/helper-validator-identifier | 7.29.7 | MIT | Build/development |
| @babel/helper-validator-option | 7.29.7 | MIT | Build/development |
| @babel/helper-wrap-function | 7.29.7 | MIT | Build/development |
| @babel/helpers | 7.29.2 | MIT | Build/development |
| @babel/parser | 7.29.7 | MIT | Build/development |
| @babel/plugin-bugfix-firefox-class-in-computed-class-key | 7.29.7 | MIT | Build/development |
| @babel/plugin-bugfix-safari-class-field-initializer-scope | 7.27.1 | MIT | Build/development |
| @babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression | 7.27.1 | MIT | Build/development |
| @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining | 7.27.1 | MIT | Build/development |
| @babel/plugin-bugfix-v8-static-class-fields-redefine-readonly | 7.29.7 | MIT | Build/development |
| @babel/plugin-proposal-private-property-in-object | 7.21.0-placeholder-for-preset-env.2 | MIT | Build/development |
| @babel/plugin-syntax-import-assertions | 7.29.7 | MIT | Build/development |
| @babel/plugin-syntax-import-attributes | 7.29.7 | MIT | Build/development |
| @babel/plugin-syntax-unicode-sets-regex | 7.18.6 | MIT | Build/development |
| @babel/plugin-transform-arrow-functions | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-async-generator-functions | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-async-to-generator | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-block-scoped-functions | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-block-scoping | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-class-properties | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-class-static-block | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-classes | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-computed-properties | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-destructuring | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-dotall-regex | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-duplicate-keys | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-duplicate-named-capturing-groups-regex | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-dynamic-import | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-explicit-resource-management | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-exponentiation-operator | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-export-namespace-from | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-for-of | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-function-name | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-json-strings | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-literals | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-logical-assignment-operators | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-member-expression-literals | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-modules-amd | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-modules-commonjs | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-modules-systemjs | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-modules-umd | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-named-capturing-groups-regex | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-new-target | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-nullish-coalescing-operator | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-numeric-separator | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-object-assign | 7.25.9 | MIT | Build/development |
| @babel/plugin-transform-object-rest-spread | 7.25.9 | MIT | Build/development |
| @babel/plugin-transform-object-rest-spread | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-object-super | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-optional-catch-binding | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-optional-chaining | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-parameters | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-private-methods | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-private-property-in-object | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-property-literals | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-regenerator | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-regexp-modifiers | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-reserved-words | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-shorthand-properties | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-spread | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-sticky-regex | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-template-literals | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-typeof-symbol | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-unicode-escapes | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-unicode-property-regex | 7.29.7 | MIT | Build/development |
| @babel/plugin-transform-unicode-regex | 7.27.1 | MIT | Build/development |
| @babel/plugin-transform-unicode-sets-regex | 7.29.7 | MIT | Build/development |
| @babel/preset-env | 7.29.2 | MIT | Build/development |
| @babel/preset-modules | 0.1.6-no-external-plugins | MIT | Build/development |
| @babel/template | 7.29.7 | MIT | Build/development |
| @babel/traverse | 7.29.7 | MIT | Build/development |
| @babel/types | 7.29.7 | MIT | Build/development |
| @bpmn-io/align-to-origin | 0.7.0 | MIT | Runtime |
| @bpmn-io/cm-theme | 0.1.0-alpha.2 | MIT | Runtime |
| @bpmn-io/diagram-js-ui | 0.2.3 | MIT | Runtime |
| @bpmn-io/dmn-migrate | 0.5.0 | MIT | Runtime |
| @bpmn-io/dmn-variable-resolver | 0.4.0 | MIT | Runtime |
| @bpmn-io/draggle | 4.1.1 | MIT | Runtime |
| @bpmn-io/feel-editor | 1.10.1 | MIT | Runtime |
| @bpmn-io/feel-lint | 1.4.0 | MIT | Runtime |
| @bpmn-io/form-js | 1.8.7 | SEE LICENSE IN LICENSE | Runtime |
| @bpmn-io/form-js-carbon-styles | 1.15.2 | SEE LICENSE IN LICENSE | Runtime |
| @bpmn-io/form-js-editor | 1.15.2 | SEE LICENSE IN LICENSE | Runtime |
| @bpmn-io/form-js-playground | 1.15.2 | SEE LICENSE IN LICENSE | Runtime |
| @bpmn-io/form-js-viewer | 1.15.2 | SEE LICENSE IN LICENSE | Runtime |
| @bpmn-io/properties-panel | 3.27.3 | MIT | Runtime |
| @carbon/grid | 11.37.0 | Apache-2.0 | Runtime |
| @carbon/layout | 11.35.0 | Apache-2.0 | Runtime |
| @codemirror/autocomplete | 6.18.6 | MIT | Runtime |
| @codemirror/commands | 6.8.1 | MIT | Runtime |
| @codemirror/lang-json | 6.0.1 | MIT | Runtime |
| @codemirror/language | 6.11.1 | MIT | Runtime |
| @codemirror/lint | 6.8.5 | MIT | Runtime |
| @codemirror/search | 6.5.11 | MIT | Runtime |
| @codemirror/state | 6.5.2 | MIT | Runtime |
| @codemirror/view | 6.37.1 | MIT | Runtime |
| @colors/colors | 1.5.0 | MIT | Build/development |
| @discoveryjs/json-ext | 0.6.3 | MIT | Build/development |
| @discoveryjs/json-ext | 1.1.0 | Not declared in source metadata | Build/development |
| @eslint-community/eslint-utils | 4.10.1 | MIT | Build/development |
| @eslint-community/regexpp | 4.12.2 | MIT | Build/development |
| @eslint/config-array | 0.21.2 | Apache-2.0 | Build/development |
| @eslint/config-helpers | 0.4.2 | Apache-2.0 | Build/development |
| @eslint/core | 0.17.0 | Apache-2.0 | Build/development |
| @eslint/eslintrc | 3.3.7 | MIT | Build/development |
| @eslint/js | 9.39.5 | MIT | Build/development |
| @eslint/object-schema | 2.1.7 | Apache-2.0 | Build/development |
| @eslint/plugin-kit | 0.4.1 | Apache-2.0 | Build/development |
| @formatjs/ecma402-abstract | 2.3.6 | MIT | Build/development |
| @formatjs/fast-memoize | 2.2.7 | MIT | Build/development |
| @formatjs/icu-messageformat-parser | 2.11.4 | MIT | Build/development |
| @formatjs/icu-skeleton-parser | 1.8.16 | MIT | Build/development |
| @formatjs/intl-localematcher | 0.6.2 | MIT | Build/development |
| @humanfs/core | 0.19.2 | Apache-2.0 | Build/development |
| @humanfs/node | 0.16.8 | Apache-2.0 | Build/development |
| @humanfs/types | 0.15.0 | Apache-2.0 | Build/development |
| @humanwhocodes/module-importer | 1.0.1 | Apache-2.0 | Build/development |
| @humanwhocodes/retry | 0.4.3 | Apache-2.0 | Build/development |
| @ibm/plex | 6.4.0 | OFL-1.1 | Runtime |
| @ibm/telemetry-js | 1.9.1 | Apache-2.0 | Runtime |
| @jridgewell/gen-mapping | 0.3.13 | MIT | Build/development |
| @jridgewell/remapping | 2.3.5 | MIT | Build/development |
| @jridgewell/resolve-uri | 3.1.2 | MIT | Build/development |
| @jridgewell/source-map | 0.3.6 | MIT | Build/development |
| @jridgewell/sourcemap-codec | 1.5.0 | MIT | Build/development |
| @jridgewell/trace-mapping | 0.3.31 | MIT | Build/development |
| @jsonjoy.com/base64 | 1.1.2 | Apache-2.0 | Build/development |
| @jsonjoy.com/base64 | 17.67.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/buffers | 1.2.1 | Apache-2.0 | Build/development |
| @jsonjoy.com/buffers | 17.67.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/codegen | 1.0.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/codegen | 17.67.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-core | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-fsa | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-node | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-node-builtins | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-node-to-fsa | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-node-utils | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-print | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/fs-snapshot | 4.80.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/json-pack | 1.21.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/json-pack | 17.67.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/json-pointer | 1.0.2 | Apache-2.0 | Build/development |
| @jsonjoy.com/json-pointer | 17.67.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/util | 1.9.0 | Apache-2.0 | Build/development |
| @jsonjoy.com/util | 17.67.0 | Apache-2.0 | Build/development |
| @kurkle/color | 0.3.4 | MIT | Runtime |
| @leichtgewicht/ip-codec | 2.0.5 | MIT | Build/development |
| @lezer/common | 1.2.3 | MIT | Runtime |
| @lezer/highlight | 1.2.1 | MIT | Runtime |
| @lezer/json | 1.0.3 | MIT | Runtime |
| @lezer/lr | 1.4.2 | MIT | Runtime |
| @lezer/markdown | 1.4.3 | MIT | Runtime |
| @marijn/find-cluster-break | 1.0.2 | MIT | Runtime |
| @noble/hashes | 1.4.0 | MIT | Build/development |
| @noble/hashes | 1.8.0 | MIT | Runtime |
| @nodable/entities | 2.1.1 | MIT | Runtime |
| @paralleldrive/cuid2 | 2.2.2 | MIT | Runtime |
| @peculiar/asn1-cms | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-csr | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-ecc | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-pfx | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-pkcs8 | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-pkcs9 | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-rsa | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-schema | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-x509 | 2.8.0 | MIT | Build/development |
| @peculiar/asn1-x509-attr | 2.8.0 | MIT | Build/development |
| @peculiar/utils | 2.0.3 | MIT | Build/development |
| @peculiar/x509 | 1.14.3 | MIT | Build/development |
| @pkgr/core | 0.3.6 | MIT | Build/development |
| @polka/url | 1.0.0-next.29 | MIT | Build/development |
| @socket.io/component-emitter | 3.1.2 | MIT | Build/development |
| @types/body-parser | 1.19.5 | MIT | Build/development |
| @types/bonjour | 3.5.13 | MIT | Build/development |
| @types/connect | 3.4.38 | MIT | Build/development |
| @types/connect-history-api-fallback | 1.5.4 | MIT | Build/development |
| @types/cors | 2.8.18 | MIT | Build/development |
| @types/eslint | 9.6.1 | MIT | Build/development |
| @types/estree | 1.0.9 | MIT | Build/development |
| @types/express | 5.0.6 | MIT | Build/development |
| @types/express-serve-static-core | 5.1.3 | MIT | Build/development |
| @types/html-minifier-terser | 6.1.0 | MIT | Build/development |
| @types/http-errors | 2.0.5 | MIT | Build/development |
| @types/json-schema | 7.0.15 | MIT | Build/development |
| @types/less | 3.0.8 | MIT | Build/development |
| @types/mime | 1.3.5 | MIT | Build/development |
| @types/node | 22.15.29 | MIT | Build/development |
| @types/qs | 6.14.0 | MIT | Build/development |
| @types/range-parser | 1.2.7 | MIT | Build/development |
| @types/send | 0.17.4 | MIT | Build/development |
| @types/serve-index | 1.9.4 | MIT | Build/development |
| @types/serve-static | 2.2.0 | MIT | Build/development |
| @types/trusted-types | 2.0.7 | MIT | Runtime (optional) |
| @types/ws | 8.18.1 | MIT | Build/development |
| @webassemblyjs/ast | 1.14.1 | MIT | Build/development |
| @webassemblyjs/floating-point-hex-parser | 1.13.2 | MIT | Build/development |
| @webassemblyjs/helper-api-error | 1.13.2 | MIT | Build/development |
| @webassemblyjs/helper-buffer | 1.14.1 | MIT | Build/development |
| @webassemblyjs/helper-numbers | 1.13.2 | MIT | Build/development |
| @webassemblyjs/helper-wasm-bytecode | 1.13.2 | MIT | Build/development |
| @webassemblyjs/helper-wasm-section | 1.14.1 | MIT | Build/development |
| @webassemblyjs/ieee754 | 1.13.2 | MIT | Build/development |
| @webassemblyjs/leb128 | 1.13.2 | Apache-2.0 | Build/development |
| @webassemblyjs/utf8 | 1.13.2 | MIT | Build/development |
| @webassemblyjs/wasm-edit | 1.14.1 | MIT | Build/development |
| @webassemblyjs/wasm-gen | 1.14.1 | MIT | Build/development |
| @webassemblyjs/wasm-opt | 1.14.1 | MIT | Build/development |
| @webassemblyjs/wasm-parser | 1.14.1 | MIT | Build/development |
| @webassemblyjs/wast-printer | 1.14.1 | MIT | Build/development |
| @xtuc/ieee754 | 1.2.0 | BSD-3-Clause | Build/development |
| @xtuc/long | 4.2.2 | Apache-2.0 | Build/development |
| abbrev | 1.1.1 | ISC | Build/development |
| accepts | 1.3.8 | MIT | Build/development |
| accepts | 2.0.0 | MIT | Build/development |
| acorn | 8.17.0 | MIT | Build/development |
| acorn-jsx | 5.3.2 | MIT | Build/development |
| acorn-walk | 8.3.4 | MIT | Build/development |
| ajv | 6.15.0 | MIT | Build/development |
| ajv | 8.20.0 | MIT | Build/development |
| ajv-formats | 3.0.1 | MIT | Build/development |
| ajv-keywords | 3.5.2 | MIT | Build/development |
| ajv-keywords | 5.1.0 | MIT | Build/development |
| angular | 1.8.3 | MIT | Runtime |
| angular-animate | 1.8.2 | MIT | Runtime |
| angular-cookies | 1.8.2 | MIT | Runtime |
| angular-data-depend | 1.0.0 | MIT | Runtime |
| angular-loader | 1.8.3 | MIT | Runtime |
| angular-mocks | 1.8.3 | MIT | Build/development |
| angular-moment | 1.3.0 | MIT | Runtime |
| angular-resource | 1.8.2 | MIT | Runtime |
| angular-route | 1.8.3 | MIT | Runtime |
| angular-sanitize | 1.8.2 | MIT | Runtime |
| angular-touch | 1.8.2 | MIT | Runtime |
| angular-translate | 2.19.0 | MIT | Runtime |
| angular-ui-bootstrap | 2.5.6 | MIT | Runtime |
| ansi-regex | 3.0.1 | MIT | Build/development |
| ansi-regex | 5.0.1 | MIT | Build/development |
| ansi-styles | 3.2.1 | MIT | Build/development |
| ansi-styles | 4.3.0 | MIT | Build/development |
| anymatch | 3.1.3 | ISC | Build/development |
| anynum | 1.0.0 | MIT | Runtime |
| argparse | 2.0.1 | Python-2.0 | Build/development |
| array-find-index | 1.0.2 | MIT | Build/development |
| array-move | 4.0.0 | MIT | Runtime |
| asap | 2.0.6 | MIT | Runtime |
| asn1js | 3.0.10 | BSD-3-Clause | Build/development |
| asynckit | 0.4.0 | MIT | Runtime |
| atoa | 1.0.0 | MIT | Runtime |
| babel-loader | 10.0.0 | MIT | Build/development |
| babel-plugin-polyfill-corejs2 | 0.4.17 | MIT | Build/development |
| babel-plugin-polyfill-corejs3 | 0.14.2 | MIT | Build/development |
| babel-plugin-polyfill-regenerator | 0.6.8 | MIT | Build/development |
| balanced-match | 1.0.2 | MIT | Build/development |
| base64id | 2.0.0 | MIT | Build/development |
| baseline-browser-mapping | 2.11.20 | Apache-2.0 | Build/development |
| batch | 0.6.1 | MIT | Build/development |
| big.js | 5.2.2 | MIT | Build/development |
| big.js | 6.2.2 | MIT | Runtime |
| binary-extensions | 2.3.0 | MIT | Build/development |
| body-parser | 1.20.9 | MIT | Build/development |
| body-parser | 2.4.0 | MIT | Build/development |
| bonjour-service | 1.3.0 | MIT | Build/development |
| boolbase | 1.0.0 | ISC | Build/development |
| bootstrap | 3.4.1 | MIT | Runtime |
| bpmn-font | 0.12.1 | SIL | Runtime |
| bpmn-js | 16.5.0 | SEE LICENSE IN LICENSE | Runtime |
| bpmn-moddle | 8.1.0 | MIT | Runtime |
| brace-expansion | 1.1.21 | MIT | Build/development |
| brace-expansion | 2.1.7 | MIT | Build/development |
| braces | 3.0.3 | MIT | Build/development |
| browserslist | 4.28.8 | MIT | Build/development |
| buffer-from | 1.1.2 | MIT | Build/development |
| bundle-name | 4.1.1 | MIT | Build/development |
| bytes | 3.1.2 | MIT | Build/development |
| bytestreamjs | 2.0.1 | BSD-3-Clause | Build/development |
| call-bind-apply-helpers | 1.0.2 | MIT | Runtime |
| call-bound | 1.0.4 | MIT | Runtime |
| callsites | 3.1.0 | MIT | Build/development |
| camel-case | 4.1.2 | MIT | Build/development |
| camunda-dmn-js | 1.8.0 | MIT | Runtime |
| camunda-dmn-moddle | 1.3.0 | MIT | Runtime |
| caniuse-lite | 1.0.30001810 | CC-BY-4.0 | Build/development |
| chalk | 2.4.2 | MIT | Build/development |
| chalk | 4.1.2 | MIT | Build/development |
| chart.js | 4.4.9 | MIT | Runtime |
| chokidar | 3.6.0 | MIT | Build/development |
| chokidar | 5.0.0 | MIT | Build/development |
| chrome-trace-event | 1.0.4 | MIT | Build/development |
| classnames | 2.5.1 | MIT | Runtime |
| clean-css | 5.3.3 | MIT | Build/development |
| clipboard | 2.0.11 | MIT | Runtime |
| cliui | 7.0.4 | ISC | Build/development |
| clone-deep | 4.0.1 | MIT | Build/development |
| clsx | 2.1.1 | MIT | Runtime |
| codemirror | 6.0.1 | MIT | Runtime |
| color-convert | 1.9.3 | MIT | Build/development |
| color-convert | 2.0.1 | MIT | Build/development |
| color-name | 1.1.3 | MIT | Build/development |
| color-name | 1.1.4 | MIT | Build/development |
| combined-stream | 1.0.8 | MIT | Runtime |
| commander | 10.0.1 | MIT | Build/development |
| commander | 14.0.3 | Not declared in source metadata | Build/development |
| commander | 2.20.3 | MIT | Build/development |
| commander | 8.3.0 | MIT | Build/development |
| component-emitter | 1.3.1 | MIT | Runtime |
| component-event | 0.2.1 | MIT | Runtime |
| component-props | 1.1.1 | Not declared in source metadata | Runtime |
| component-xor | 0.0.4 | MIT | Runtime |
| compressible | 2.0.18 | MIT | Build/development |
| compression | 1.8.2 | MIT | Build/development |
| concat-map | 0.0.1 | MIT | Build/development |
| connect | 3.7.0 | MIT | Build/development |
| connect-history-api-fallback | 2.0.0 | MIT | Build/development |
| content-disposition | 1.1.0 | MIT | Build/development |
| content-type | 1.0.5 | MIT | Build/development |
| content-type | 2.1.0 | MIT | Build/development |
| contra | 1.9.4 | MIT | Runtime |
| convert-source-map | 2.0.0 | MIT | Build/development |
| cookie | 0.7.2 | MIT | Build/development |
| cookie-signature | 1.2.2 | MIT | Build/development |
| cookiejar | 2.1.4 | MIT | Runtime |
| copy-anything | 2.0.6 | MIT | Build/development |
| copy-webpack-plugin | 14.0.0 | MIT | Build/development |
| core-js | 3.35.1 | MIT | Runtime |
| core-js-compat | 3.49.0 | MIT | Build/development |
| cors | 2.8.5 | MIT | Build/development |
| crelt | 1.0.6 | MIT | Runtime |
| cross-spawn | 7.0.6 | MIT | Build/development |
| css-loader | 7.1.5 | MIT | Build/development |
| css-select | 4.3.0 | BSD-2-Clause | Build/development |
| css-what | 6.1.0 | BSD-2-Clause | Build/development |
| css.escape | 1.5.1 | MIT | Runtime |
| cssesc | 3.0.0 | MIT | Build/development |
| custom-event | 1.0.1 | MIT | Build/development |
| date-format | 4.0.14 | MIT | Build/development |
| debug | 2.6.9 | MIT | Build/development |
| debug | 3.2.7 | MIT | Build/development |
| debug | 4.3.7 | MIT | Build/development |
| debug | 4.4.3 | MIT | Runtime |
| debuglog | 1.0.1 | MIT | Build/development |
| decimal.js | 10.6.0 | MIT | Build/development |
| deep-is | 0.1.4 | MIT | Build/development |
| default-browser | 5.5.1 | MIT | Build/development |
| default-browser-id | 5.0.1 | MIT | Build/development |
| define-lazy-prop | 3.0.0 | MIT | Build/development |
| delayed-stream | 1.0.0 | MIT | Runtime |
| delegate | 3.2.0 | MIT | Runtime |
| depd | 1.1.2 | MIT | Build/development |
| depd | 2.0.0 | MIT | Build/development |
| destroy | 1.2.0 | MIT | Build/development |
| dezalgo | 1.0.4 | ISC | Runtime |
| di | 0.0.1 | MIT | Build/development |
| diagram-js | 12.8.1 | MIT | Runtime |
| diagram-js | 13.4.0 | MIT | Runtime |
| diagram-js-direct-editing | 2.1.2 | MIT | Runtime |
| diagram-js-grid | 0.2.0 | MIT | Runtime |
| diagram-js-origin | 1.4.0 | MIT | Runtime |
| didi | 10.2.2 | MIT | Runtime |
| didi | 9.0.2 | MIT | Runtime |
| diff | 3.5.1 | BSD-3-Clause | Build/development |
| dmn-font | 0.6.2 | SIL | Runtime |
| dmn-js | 15.1.0 | SEE LICENSE IN LICENSE | Runtime |
| dmn-js-decision-table | 15.1.0 | SEE LICENSE IN LICENSE | Runtime |
| dmn-js-drd | 15.1.0 | SEE LICENSE IN LICENSE | Runtime |
| dmn-js-literal-expression | 15.1.0 | SEE LICENSE IN LICENSE | Runtime |
| dmn-js-properties-panel | 3.2.1 | MIT | Runtime |
| dmn-js-shared | 15.1.0 | SEE LICENSE IN LICENSE | Runtime |
| dmn-moddle | 10.0.0 | MIT | Runtime |
| dns-packet | 5.6.1 | MIT | Build/development |
| dom-converter | 0.2.0 | MIT | Build/development |
| dom-iterator | 1.0.2 | MIT | Runtime |
| dom-serialize | 2.2.1 | MIT | Build/development |
| dom-serializer | 1.4.1 | MIT | Build/development |
| dom4 | 2.1.6 | MIT | Runtime |
| domelementtype | 2.3.0 | BSD-2-Clause | Build/development |
| domhandler | 4.3.1 | BSD-2-Clause | Build/development |
| domify | 1.4.2 | MIT | Runtime |
| domify | 2.0.0 | MIT | Runtime |
| dompurify | 3.4.17 | (MPL-2.0 OR Apache-2.0) | Runtime |
| domutils | 2.8.0 | BSD-2-Clause | Build/development |
| dot-case | 3.0.4 | MIT | Build/development |
| downloadjs | 1.4.7 | MIT | Runtime |
| dunder-proto | 1.0.1 | MIT | Runtime |
| ee-first | 1.1.1 | MIT | Build/development |
| electron-to-chromium | 1.5.419 | ISC | Build/development |
| emoji-regex | 8.0.0 | MIT | Build/development |
| emojis-list | 3.0.0 | MIT | Build/development |
| encodeurl | 1.0.2 | MIT | Build/development |
| encodeurl | 2.0.0 | MIT | Build/development |
| engine.io | 6.6.11 | MIT | Build/development |
| engine.io-parser | 5.2.3 | MIT | Build/development |
| enhanced-resolve | 5.26.0 | MIT | Build/development |
| ent | 2.2.2 | MIT | Build/development |
| entities | 2.2.0 | BSD-2-Clause | Build/development |
| entities | 4.5.0 | BSD-2-Clause | Build/development |
| entities | 6.0.0 | BSD-2-Clause | Build/development |
| envinfo | 7.21.0 | MIT | Build/development |
| errno | 0.1.8 | MIT | Build/development (optional) |
| error-ex | 1.3.4 | MIT | Build/development |
| es-define-property | 1.0.1 | MIT | Runtime |
| es-errors | 1.3.0 | MIT | Runtime |
| es-module-lexer | 2.3.1 | MIT | Build/development |
| es-object-atoms | 1.1.1 | MIT | Runtime |
| es-set-tostringtag | 2.1.0 | MIT | Runtime |
| escalade | 3.2.0 | MIT | Build/development |
| escape-html | 1.0.3 | MIT | Runtime |
| escape-string-regexp | 1.0.5 | MIT | Build/development |
| escape-string-regexp | 4.0.0 | MIT | Build/development |
| escape-string-regexp | 5.0.0 | Not declared in source metadata | Build/development |
| eslint | 9.39.5 | MIT | Build/development |
| eslint-config-prettier | 10.1.8 | MIT | Build/development |
| eslint-plugin-camunda-licensed | 1.1.0 | MIT | Build/development |
| eslint-plugin-i18n-json | 4.0.1 | MIT | Build/development |
| eslint-plugin-license-header | 0.9.0 | MIT | Build/development |
| eslint-plugin-prettier | 5.5.6 | MIT | Build/development |
| eslint-scope | 8.4.0 | BSD-2-Clause | Build/development |
| eslint-visitor-keys | 3.4.3 | Apache-2.0 | Build/development |
| eslint-visitor-keys | 4.2.1 | Apache-2.0 | Build/development |
| eslint-webpack-plugin | 6.0.0 | MIT | Build/development |
| espree | 10.4.0 | BSD-2-Clause | Build/development |
| esquery | 1.7.0 | BSD-3-Clause | Build/development |
| esrecurse | 4.3.0 | BSD-2-Clause | Build/development |
| estraverse | 5.3.0 | BSD-2-Clause | Build/development |
| esutils | 2.0.3 | BSD-2-Clause | Build/development |
| etag | 1.8.1 | MIT | Build/development |
| eventemitter3 | 4.0.7 | MIT | Build/development |
| events | 3.3.0 | MIT | Runtime |
| exports-loader | 5.0.0 | MIT | Build/development |
| express | 5.2.1 | MIT | Build/development |
| extend | 3.0.2 | MIT | Build/development |
| fast-deep-equal | 3.1.3 | MIT | Build/development |
| fast-diff | 1.3.0 | Apache-2.0 | Build/development |
| fast-json-stable-stringify | 2.1.0 | MIT | Build/development |
| fast-levenshtein | 2.0.6 | MIT | Build/development |
| fast-safe-stringify | 2.1.1 | MIT | Runtime |
| fast-uri | 3.1.9 | BSD-3-Clause | Build/development |
| fast-xml-builder | 1.2.0 | MIT | Runtime |
| fast-xml-parser | 5.8.0 | MIT | Runtime |
| fdir | 6.5.0 | MIT | Build/development |
| feelers | 1.4.0 | MIT | Runtime |
| feelin | 3.2.0 | MIT | Runtime |
| feelin | 4.3.0 | MIT | Runtime |
| file-drops | 0.5.0 | MIT | Runtime |
| file-entry-cache | 8.0.0 | MIT | Build/development |
| file-loader | 6.2.0 | MIT | Build/development |
| fill-range | 7.1.1 | MIT | Build/development |
| finalhandler | 1.1.2 | MIT | Build/development |
| finalhandler | 2.1.1 | MIT | Build/development |
| find-up | 4.1.0 | MIT | Build/development |
| find-up | 5.0.0 | MIT | Build/development |
| flat | 5.0.2 | BSD-3-Clause | Build/development |
| flat-cache | 4.0.1 | MIT | Build/development |
| flatpickr | 4.6.13 | MIT | Runtime |
| flatted | 3.4.4 | ISC | Build/development |
| focus-trap | 7.6.5 | MIT | Runtime |
| follow-redirects | 1.16.2 | MIT | Build/development |
| form-data | 4.0.6 | MIT | Runtime |
| formidable | 3.5.4 | MIT | Runtime |
| forwarded | 0.2.0 | MIT | Build/development |
| fresh | 2.0.0 | MIT | Build/development |
| fs-extra | 8.1.0 | MIT | Build/development |
| fs.realpath | 1.0.0 | ISC | Build/development |
| fsevents | 2.3.3 | MIT | Build/development (optional) |
| function-bind | 1.1.2 | MIT | Runtime |
| gensync | 1.0.0-beta.2 | MIT | Build/development |
| get-caller-file | 2.0.5 | ISC | Build/development |
| get-intrinsic | 1.3.0 | MIT | Runtime |
| get-proto | 1.0.1 | MIT | Runtime |
| glob | 7.2.3 | ISC | Build/development |
| glob-parent | 5.1.2 | ISC | Build/development |
| glob-parent | 6.0.2 | ISC | Build/development |
| glob-to-regex.js | 1.3.1 | Apache-2.0 | Build/development |
| globals | 14.0.0 | MIT | Build/development |
| globals | 17.13.0 | MIT | Build/development |
| good-listener | 1.2.2 | MIT | Runtime |
| gopd | 1.2.0 | MIT | Runtime |
| graceful-fs | 4.2.11 | ISC | Build/development |
| hammerjs | 2.0.8 | MIT | Runtime |
| has-flag | 3.0.0 | MIT | Build/development |
| has-flag | 4.0.0 | MIT | Build/development |
| has-symbols | 1.1.0 | MIT | Runtime |
| has-tostringtag | 1.0.2 | MIT | Runtime |
| hasown | 2.0.4 | MIT | Runtime |
| he | 1.2.0 | MIT | Build/development |
| hosted-git-info | 2.8.9 | ISC | Build/development |
| htm | 3.1.1 | Apache-2.0 | Runtime |
| html-escaper | 3.0.3 | MIT | Build/development |
| html-loader | 5.1.0 | MIT | Build/development |
| html-minifier-terser | 6.1.0 | MIT | Build/development |
| html-minifier-terser | 7.2.0 | MIT | Build/development |
| html-webpack-plugin | 5.6.8 | MIT | Build/development |
| htmlparser2 | 6.1.0 | MIT | Build/development |
| http-errors | 1.8.1 | MIT | Build/development |
| http-errors | 2.0.1 | MIT | Build/development |
| http-proxy | 1.18.1 | MIT | Build/development |
| http-proxy-middleware | 4.2.0 | MIT | Build/development |
| httpxy | 0.5.5 | MIT | Build/development |
| hyperdyperid | 1.2.0 | MIT | Build/development |
| iconv-lite | 0.4.24 | MIT | Build/development |
| iconv-lite | 0.6.3 | MIT | Build/development (optional) |
| iconv-lite | 0.7.3 | MIT | Build/development |
| icss-utils | 5.1.0 | ISC | Build/development |
| ids | 1.0.5 | MIT | Runtime |
| ignore | 5.3.2 | MIT | Build/development |
| image-size | 0.5.5 | MIT | Build/development (optional) |
| import-fresh | 3.3.1 | MIT | Build/development |
| import-local | 3.2.0 | MIT | Build/development |
| imurmurhash | 0.1.4 | MIT | Build/development |
| indent-string | 3.2.0 | MIT | Build/development |
| inferno | 5.6.3 | MIT | Runtime |
| inferno-shared | 5.6.3 | MIT | Runtime |
| inferno-vnode-flags | 5.6.3 | MIT | Runtime |
| inflight | 1.0.6 | ISC | Build/development |
| inherits | 2.0.4 | ISC | Build/development |
| inherits-browser | 0.1.0 | ISC | Runtime |
| interpret | 3.1.1 | MIT | Build/development |
| ipaddr.js | 1.9.1 | MIT | Build/development |
| ipaddr.js | 2.5.0 | MIT | Build/development |
| irregular-plurals | 1.4.0 | MIT | Build/development |
| is-arrayish | 0.2.1 | MIT | Build/development |
| is-binary-path | 2.1.0 | MIT | Build/development |
| is-core-module | 2.16.1 | MIT | Build/development |
| is-docker | 3.0.0 | MIT | Build/development |
| is-extglob | 2.1.1 | MIT | Build/development |
| is-fullwidth-code-point | 3.0.0 | MIT | Build/development |
| is-glob | 4.0.3 | MIT | Build/development |
| is-in-ssh | 1.0.0 | MIT | Build/development |
| is-inside-container | 1.0.0 | MIT | Build/development |
| is-network-error | 1.3.2 | MIT | Build/development |
| is-number | 7.0.0 | MIT | Build/development |
| is-plain-obj | 4.1.0 | MIT | Build/development |
| is-plain-object | 2.0.4 | MIT | Build/development |
| is-promise | 4.0.0 | MIT | Build/development |
| is-regex | 1.2.1 | MIT | Build/development |
| is-what | 3.14.1 | MIT | Build/development |
| is-wsl | 3.1.1 | MIT | Build/development |
| isbinaryfile | 4.0.10 | MIT | Build/development |
| isexe | 2.0.0 | ISC | Build/development |
| isobject | 3.0.1 | MIT | Build/development |
| jest-diff | 22.4.3 | MIT | Build/development |
| jest-get-type | 22.4.3 | MIT | Build/development |
| jest-worker | 27.5.1 | MIT | Build/development |
| jquery | 3.7.1 | MIT | Runtime |
| jquery-ui | 1.13.2 | MIT | Runtime |
| js-tokens | 4.0.0 | MIT | Build/development |
| js-yaml | 4.3.2 | MIT | Build/development |
| jsesc | 3.1.0 | MIT | Build/development |
| json-buffer | 3.0.1 | MIT | Build/development |
| json-parse-even-better-errors | 2.3.1 | MIT | Build/development |
| json-schema-traverse | 0.4.1 | MIT | Build/development |
| json-schema-traverse | 1.0.0 | MIT | Build/development |
| json-stable-stringify-without-jsonify | 1.0.1 | MIT | Build/development |
| json5 | 1.0.2 | MIT | Build/development |
| json5 | 2.2.3 | MIT | Build/development |
| jsonfile | 4.0.0 | MIT | Build/development |
| karma | 6.4.2 | MIT | Build/development |
| karma-webpack | 5.0.1 | MIT | Build/development |
| keyv | 4.5.4 | MIT | Build/development |
| kind-of | 6.0.3 | MIT | Build/development |
| lang-feel | 2.3.0 | MIT | Runtime |
| launch-editor | 2.14.2 | MIT | Build/development |
| less | 4.2.0 | Apache-2.0 | Build/development |
| less-loader | 13.1.0 | MIT | Build/development |
| levn | 0.4.1 | MIT | Build/development |
| lezer-feel | 1.7.0 | MIT | Runtime |
| license-checker | 25.0.1 | BSD-3-Clause | Build/development |
| lines-and-columns | 1.2.4 | MIT | Build/development |
| loader-utils | 1.4.2 | MIT | Build/development |
| loader-utils | 2.0.4 | MIT | Build/development |
| locate-path | 5.0.0 | MIT | Build/development |
| locate-path | 6.0.0 | MIT | Build/development |
| lodash | 4.18.1 | MIT | Runtime |
| lodash.debounce | 4.0.8 | MIT | Build/development |
| lodash.merge | 4.6.2 | MIT | Build/development |
| log-symbols | 2.2.0 | MIT | Build/development |
| log4js | 6.9.1 | Apache-2.0 | Build/development |
| lower-case | 2.0.2 | MIT | Build/development |
| lru-cache | 5.1.1 | ISC | Build/development |
| luxon | 3.6.1 | MIT | Runtime |
| make-dir | 2.1.0 | MIT | Build/development (optional) |
| marked | 15.0.12 | MIT | Runtime |
| math-intrinsics | 1.1.0 | MIT | Runtime |
| media-typer | 0.3.0 | MIT | Build/development |
| media-typer | 1.1.1 | MIT | Build/development |
| memfs | 4.80.0 | Apache-2.0 | Build/development |
| merge-descriptors | 2.0.0 | MIT | Build/development |
| merge-stream | 2.0.0 | MIT | Build/development |
| methods | 1.1.2 | MIT | Runtime |
| micromatch | 4.0.8 | MIT | Build/development |
| mime | 1.6.0 | MIT | Build/development (optional) |
| mime | 2.6.0 | MIT | Runtime |
| mime-db | 1.52.0 | MIT | Runtime |
| mime-db | 1.54.0 | MIT | Build/development |
| mime-types | 2.1.35 | MIT | Runtime |
| mime-types | 3.0.2 | MIT | Build/development |
| min-dash | 3.8.1 | MIT | Runtime |
| min-dash | 4.2.3 | MIT | Runtime |
| min-dom | 4.2.1 | MIT | Runtime |
| min-dom | 5.1.1 | MIT | Runtime |
| mini-css-extract-plugin | 2.8.0 | MIT | Build/development |
| minimatch | 3.1.5 | ISC | Build/development |
| minimatch | 9.0.9 | ISC | Build/development |
| minimist | 1.2.8 | MIT | Build/development |
| minimizer-webpack-plugin | 5.13.1 | MIT | Build/development |
| mitt | 3.0.1 | MIT | Runtime |
| mkdirp | 0.5.6 | MIT | Build/development |
| moddle | 5.0.4 | MIT | Runtime |
| moddle | 6.2.3 | MIT | Runtime |
| moddle-xml | 10.1.0 | MIT | Runtime |
| moddle-xml | 9.0.6 | MIT | Runtime |
| moment | 2.31.0 | MIT | Runtime |
| mousetrap | 1.6.5 | Apache-2.0 WITH LLVM-exception | Runtime |
| mrmime | 2.0.1 | MIT | Build/development |
| ms | 2.0.0 | MIT | Build/development |
| ms | 2.1.3 | MIT | Runtime |
| multicast-dns | 7.2.5 | MIT | Build/development |
| nanoid | 3.3.19 | MIT | Build/development |
| natural-compare | 1.4.0 | MIT | Build/development |
| needle | 3.3.1 | MIT | Build/development (optional) |
| negotiator | 0.6.3 | MIT | Build/development |
| negotiator | 0.6.4 | MIT | Build/development |
| negotiator | 1.1.0 | MIT | Build/development |
| no-case | 3.0.4 | MIT | Build/development |
| node-releases | 2.0.54 | MIT | Build/development |
| nopt | 4.0.3 | ISC | Build/development |
| normalize-package-data | 2.5.0 | BSD-2-Clause | Build/development |
| normalize-path | 3.0.0 | MIT | Build/development |
| npm-normalize-package-bin | 1.0.1 | ISC | Build/development |
| nth-check | 2.1.1 | BSD-2-Clause | Build/development |
| object-assign | 4.1.1 | MIT | Build/development |
| object-inspect | 1.13.4 | MIT | Runtime |
| object-refs | 0.3.0 | MIT | Runtime |
| object-refs | 0.4.0 | MIT | Runtime |
| on-finished | 2.3.0 | MIT | Build/development |
| on-finished | 2.4.1 | MIT | Build/development |
| on-headers | 1.1.0 | MIT | Build/development |
| once | 1.4.0 | ISC | Runtime |
| open | 11.0.4 | MIT | Build/development |
| opencollective-postinstall | 2.0.3 | MIT | Runtime |
| opener | 1.5.2 | (WTFPL OR MIT) | Build/development |
| optionator | 0.9.4 | MIT | Build/development |
| os-homedir | 1.0.2 | MIT | Build/development |
| os-tmpdir | 1.0.2 | MIT | Build/development |
| osenv | 0.1.5 | ISC | Build/development |
| p-limit | 2.3.0 | MIT | Build/development |
| p-limit | 3.1.0 | MIT | Build/development |
| p-locate | 4.1.0 | MIT | Build/development |
| p-locate | 5.0.0 | MIT | Build/development |
| p-retry | 8.0.1 | MIT | Build/development |
| p-try | 2.2.0 | MIT | Build/development |
| param-case | 3.0.4 | MIT | Build/development |
| parent-module | 1.0.1 | MIT | Build/development |
| parse-json | 5.2.0 | MIT | Build/development |
| parse-node-version | 1.0.1 | MIT | Build/development |
| parse5 | 7.3.0 | MIT | Build/development |
| parseurl | 1.3.3 | MIT | Build/development |
| pascal-case | 3.1.2 | MIT | Build/development |
| path-exists | 4.0.0 | MIT | Build/development |
| path-expression-matcher | 1.5.0 | MIT | Runtime |
| path-intersection | 2.2.1 | MIT | Runtime |
| path-intersection | 3.1.0 | MIT | Runtime |
| path-is-absolute | 1.0.1 | MIT | Build/development |
| path-key | 3.1.1 | MIT | Build/development |
| path-parse | 1.0.7 | MIT | Build/development |
| path-to-regexp | 8.4.2 | MIT | Build/development |
| picocolors | 1.1.1 | ISC | Build/development |
| picomatch | 2.3.2 | MIT | Build/development |
| picomatch | 4.0.4 | MIT | Build/development |
| pify | 4.0.1 | MIT | Build/development (optional) |
| pkg-dir | 4.2.0 | MIT | Build/development |
| pkijs | 3.4.0 | BSD-3-Clause | Build/development |
| plur | 2.1.2 | MIT | Build/development |
| postcss | 8.5.23 | MIT | Build/development |
| postcss-modules-extract-imports | 3.1.0 | ISC | Build/development |
| postcss-modules-local-by-default | 4.2.0 | MIT | Build/development |
| postcss-modules-scope | 3.2.1 | ISC | Build/development |
| postcss-modules-values | 4.0.0 | ISC | Build/development |
| postcss-selector-parser | 7.1.6 | MIT | Build/development |
| postcss-value-parser | 4.2.0 | MIT | Build/development |
| powershell-utils | 0.2.1 | MIT | Build/development |
| preact | 10.29.8 | MIT | Runtime |
| prelude-ls | 1.2.1 | MIT | Build/development |
| prettier | 3.8.3 | MIT | Build/development |
| prettier-linter-helpers | 1.0.1 | MIT | Build/development |
| pretty-error | 4.0.0 | MIT | Build/development |
| pretty-format | 22.4.3 | MIT | Build/development |
| proxy-addr | 2.0.8 | MIT | Build/development |
| prr | 1.0.1 | MIT | Build/development (optional) |
| punycode | 1.4.1 | MIT | Build/development |
| punycode | 2.3.1 | MIT | Build/development |
| pvtsutils | 1.3.6 | MIT | Build/development |
| pvutils | 1.1.5 | MIT | Build/development |
| q | 1.5.1 | MIT | Runtime |
| qjobs | 1.2.0 | MIT | Build/development |
| qs | 6.16.2 | BSD-3-Clause | Runtime |
| qs | 6.17.0 | BSD-3-Clause | Build/development |
| range-parser | 1.3.0 | MIT | Build/development |
| raw-body | 2.5.3 | MIT | Build/development |
| raw-body | 3.0.2 | MIT | Build/development |
| raw-loader | 4.0.2 | MIT | Build/development |
| read-installed | 4.0.3 | ISC | Build/development |
| read-package-json | 2.1.2 | ISC | Build/development |
| readdir-scoped-modules | 1.1.0 | ISC | Build/development |
| readdirp | 3.6.0 | MIT | Build/development |
| readdirp | 5.1.1 | MIT | Build/development |
| rechoir | 0.8.0 | MIT | Build/development |
| reflect-metadata | 0.2.2 | Apache-2.0 | Build/development |
| regenerate | 1.4.2 | MIT | Build/development |
| regenerate-unicode-properties | 10.2.2 | MIT | Build/development |
| regexpu-core | 6.4.0 | MIT | Build/development |
| regjsgen | 0.8.0 | MIT | Build/development |
| regjsparser | 0.13.2 | BSD-2-Clause | Build/development |
| relateurl | 0.2.7 | MIT | Build/development |
| renderkid | 3.0.0 | MIT | Build/development |
| require-directory | 2.1.1 | MIT | Build/development |
| require-from-string | 2.0.2 | MIT | Build/development |
| requireindex | 1.2.0 | MIT | Build/development |
| requirejs | 2.3.7 | MIT | Runtime |
| requirejs-angular-define | 1.1.0 | MIT | Runtime |
| requires-port | 1.0.0 | MIT | Build/development |
| resolve | 1.22.12 | MIT | Build/development |
| resolve-cwd | 3.0.0 | MIT | Build/development |
| resolve-from | 4.0.0 | MIT | Build/development |
| resolve-from | 5.0.0 | MIT | Build/development |
| rfdc | 1.4.1 | MIT | Build/development |
| rimraf | 3.0.2 | ISC | Build/development |
| router | 2.2.0 | MIT | Build/development |
| run-applescript | 7.1.0 | MIT | Build/development |
| safe-buffer | 5.2.1 | MIT | Build/development |
| safe-regex-test | 1.1.0 | MIT | Build/development |
| safer-buffer | 2.1.2 | MIT | Build/development |
| sax | 1.4.1 | ISC | Build/development (optional) |
| saxen | 8.1.2 | MIT | Runtime |
| schema-utils | 3.3.0 | MIT | Build/development |
| schema-utils | 4.8.1 | MIT | Build/development |
| select | 1.1.2 | MIT | Runtime |
| selection-ranges | 3.0.3 | MIT | Runtime |
| selection-ranges | 4.0.3 | MIT | Runtime |
| selection-update | 0.1.2 | MIT | Runtime |
| selfsigned | 5.5.0 | MIT | Build/development |
| semver | 5.7.2 | ISC | Build/development |
| semver | 5.7.2 | ISC | Build/development (optional) |
| semver | 6.3.1 | ISC | Build/development |
| semver | 7.7.2 | ISC | Build/development |
| send | 1.2.1 | MIT | Build/development |
| serialize-javascript | 7.1.4 | BSD-3-Clause | Build/development |
| serve-index | 1.9.2 | MIT | Build/development |
| serve-static | 2.2.1 | MIT | Build/development |
| setprototypeof | 1.2.0 | ISC | Build/development |
| shallow-clone | 3.0.1 | MIT | Build/development |
| shebang-command | 2.0.0 | MIT | Build/development |
| shebang-regex | 3.0.0 | MIT | Build/development |
| shell-quote | 1.11.0 | MIT | Build/development |
| side-channel | 1.1.1 | MIT | Runtime |
| side-channel-list | 1.0.1 | MIT | Runtime |
| side-channel-map | 1.0.1 | MIT | Runtime |
| side-channel-weakmap | 1.0.2 | MIT | Runtime |
| simple-html-tokenizer | 0.1.1 | MIT | Build/development |
| sirv | 3.0.2 | MIT | Build/development |
| slide | 1.1.6 | ISC | Build/development |
| socket.io | 4.8.1 | MIT | Build/development |
| socket.io-adapter | 2.5.8 | MIT | Build/development |
| socket.io-parser | 4.2.7 | MIT | Build/development |
| source-map | 0.6.1 | BSD-3-Clause | Build/development |
| source-map-js | 1.2.2 | BSD-3-Clause | Build/development |
| source-map-support | 0.5.21 | MIT | Build/development |
| spdx-compare | 1.0.0 | MIT | Build/development |
| spdx-correct | 3.2.0 | Apache-2.0 | Build/development |
| spdx-exceptions | 2.5.0 | CC-BY-3.0 | Build/development |
| spdx-expression-parse | 3.0.1 | MIT | Build/development |
| spdx-license-ids | 3.0.21 | CC0-1.0 | Build/development |
| spdx-ranges | 2.1.1 | (MIT AND CC-BY-3.0) | Build/development |
| spdx-satisfies | 4.0.1 | MIT | Build/development |
| statuses | 1.5.0 | MIT | Build/development |
| statuses | 2.0.2 | MIT | Build/development |
| streamroller | 3.1.5 | MIT | Build/development |
| string-width | 4.2.3 | MIT | Build/development |
| strip-ansi | 6.0.1 | MIT | Build/development |
| strip-json-comments | 3.1.1 | MIT | Build/development |
| strnum | 2.4.0 | MIT | Runtime |
| style-mod | 4.1.2 | MIT | Runtime |
| superagent | 10.3.0 | MIT | Runtime |
| supports-color | 5.5.0 | MIT | Build/development |
| supports-color | 7.2.0 | MIT | Build/development |
| supports-color | 8.1.1 | MIT | Build/development |
| supports-preserve-symlinks-flag | 1.0.0 | MIT | Build/development |
| svg-inline-loader | 0.8.2 | MIT | Build/development |
| synckit | 0.11.13 | MIT | Build/development |
| tabbable | 6.2.0 | MIT | Runtime |
| table-js | 9.2.0 | MIT | Runtime |
| tapable | 2.3.3 | MIT | Build/development |
| terser | 5.51.2 | BSD-2-Clause | Build/development |
| terser-webpack-plugin | 5.6.1 | MIT | Build/development |
| thingies | 2.6.1 | MIT | Build/development |
| thunky | 1.1.0 | MIT | Build/development |
| ticky | 1.0.1 | MIT | Runtime |
| tiny-emitter | 2.1.0 | MIT | Runtime |
| tiny-svg | 3.1.3 | MIT | Runtime |
| tinyglobby | 0.2.16 | MIT | Build/development |
| tmp | 0.2.7 | MIT | Build/development |
| to-regex-range | 5.0.1 | MIT | Build/development |
| toidentifier | 1.0.1 | MIT | Build/development |
| totalist | 3.0.1 | MIT | Build/development |
| tree-dump | 1.1.0 | Apache-2.0 | Build/development |
| treeify | 1.1.0 | MIT | Build/development |
| tslib | 1.14.1 | 0BSD | Build/development |
| tslib | 2.8.1 | 0BSD | Build/development |
| tsyringe | 4.10.0 | MIT | Build/development |
| type-check | 0.4.0 | MIT | Build/development |
| type-is | 1.6.18 | MIT | Build/development |
| type-is | 2.1.0 | MIT | Build/development |
| ua-parser-js | 0.7.40 | MIT | Build/development |
| undici-types | 6.21.0 | MIT | Build/development |
| unicode-canonical-property-names-ecmascript | 2.0.1 | MIT | Build/development |
| unicode-match-property-ecmascript | 2.0.0 | MIT | Build/development |
| unicode-match-property-value-ecmascript | 2.2.1 | MIT | Build/development |
| unicode-property-aliases-ecmascript | 2.2.0 | MIT | Build/development |
| universalify | 0.1.2 | MIT | Build/development |
| unpipe | 1.0.0 | MIT | Build/development |
| update-browserslist-db | 1.3.2 | MIT | Build/development |
| uri-js | 4.4.1 | BSD-2-Clause | Build/development |
| util-deprecate | 1.0.2 | MIT | Build/development |
| util-extend | 1.0.3 | MIT | Build/development |
| utila | 0.4.0 | MIT | Build/development |
| utils-merge | 1.0.1 | MIT | Build/development |
| validate-npm-package-license | 3.0.4 | Apache-2.0 | Build/development |
| vary | 1.1.2 | MIT | Build/development |
| void-elements | 2.0.1 | MIT | Build/development |
| w3c-keyname | 2.2.8 | MIT | Runtime |
| watchpack | 2.6.3 | MIT | Build/development |
| webpack | 5.112.2 | MIT | Build/development |
| webpack-bundle-analyzer | 5.4.0 | MIT | Build/development |
| webpack-cli | 7.2.3 | MIT | Build/development |
| webpack-dev-middleware | 8.5.0 | MIT | Build/development |
| webpack-dev-server | 6.1.0 | MIT | Build/development |
| webpack-merge | 4.2.2 | MIT | Build/development |
| webpack-merge | 6.0.1 | MIT | Build/development |
| webpack-sources | 3.6.0 | MIT | Build/development |
| which | 2.0.2 | ISC | Build/development |
| wildcard | 2.0.1 | MIT | Build/development |
| word-wrap | 1.2.5 | MIT | Build/development |
| wrap-ansi | 7.0.0 | MIT | Build/development |
| wrappy | 1.0.2 | ISC | Runtime |
| ws | 8.21.3 | MIT | Build/development |
| wsl-utils | 1.0.1 | MIT | Build/development |
| xml-naming | 0.1.0 | MIT | Runtime |
| y18n | 5.0.8 | ISC | Build/development |
| yallist | 3.1.1 | ISC | Build/development |
| yargs | 16.2.0 | MIT | Build/development |
| yargs-parser | 20.2.9 | ISC | Build/development |
| yocto-queue | 0.1.0 | MIT | Build/development |

## Retained license notices

The following notices are retained from the earlier license book. Version numbers in this historical notice text describe its original inputs; the current version inventory is above.

<details><summary>Read retained license and copyright notices</summary>

<!-- retained-license-notices -->

# Java Dependencies
<div><details><summary>logback-classic@1.5.18(<a href="https://opensource.org/licenses/EPL-1.0">EPL 1.0</a>)</summary><pre>Copyright (C) 1999-2024, QOS.ch. All rights reserved
</pre></details></div>
<div><details><summary>logback-core@1.5.18(<a href="https://opensource.org/licenses/EPL-1.0">EPL 1.0</a>)</summary><pre>Copyright (C) 1999-2024, QOS.ch. All rights reserved.</pre></details></div>
<div><details><summary>jackson-annotations@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: </pre></details></div>
<div><details><summary>jackson-annotations@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>
)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-core@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-core/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-core@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-databind@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-databind/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-databind@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers:</pre></details></div>
<div><details><summary>jackson-dataformat-csv@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-dataformats-text/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-dataformat-csv@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-datatype-jdk8@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-datatype-jsr310@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-modules-java8/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-datatype-jsr310@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-jakarta-rs-base@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-jakarta-rs-providers/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-jakarta-rs-base@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-jakarta-rs-json-provider@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-jakarta-rs-providers/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-jakarta-rs-json-provider@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-jaxrs-base@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-jaxrs-providers/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-jaxrs-json-provider@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-jaxrs-providers/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-module-jakarta-xmlbind-annotations@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-modules-base/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-module-jakarta-xmlbind-annotations@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>jackson-module-jaxb-annotations@2.15.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers: https://github.com/FasterXML/jackson-modules-base/blob/2.16/release-notes/CREDITS-2.x</pre></details></div>
<div><details><summary>jackson-module-parameter-names@2.18.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

# Jackson JSON processor

Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers, as well as supported
commercially by FasterXML.com.

## Licensing

Jackson core and extension components may be licensed under different licenses.
To find the details that apply to this artifact see the accompanying LICENSE file.
For more information, including possible other licensing options, contact
FasterXML.com (http://fasterxml.com).

## Credits

A list of contributors may be found from CREDITS file, which is included
in some artifacts (usually source distributions); but is always available
from the source code management (SCM) system project uses.
</pre></details></div>
<div><details><summary>java-uuid-generator@4.3.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Java UUID generator library has been written by Tatu Saloranta (tatu.saloranta@iki.fi)

Other developers who have contributed code are:

* Eric Bie contributed extensive unit test suite which has helped ensure high implementation
  quality</pre></details></div>
<div><details><summary>java-uuid-generator@5.1.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)

Java UUID generator library has been written by Tatu Saloranta (tatu.saloranta@iki.fi)

Other developers who have contributed code are:

* Eric Bie contributed extensive unit test suite which has helped ensure high implementation
  quality
</pre></details></div>
<div><details><summary>classmate@1.7.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2007-, Tatu Saloranta (tatu.saloranta@iki.fi)
Jackson is a high-performance, Free/Open Source JSON processing library.
It was originally written by Tatu Saloranta (tatu.saloranta@iki.fi), and has
been in development since 2007.
It is currently developed by a community of developers</pre></details></div>
<div><details><summary>jcip-annotations@1.0-1(<a href="https://creativecommons.org/licenses/by/3.0/us/">Creative Commons Attribution</a>)</summary><pre>Copyright: 2005 Brian Goetz and Tim Peierls</pre></details></div>
<div><details><summary>gson@2.8.9(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: 2008 Google Inc.</pre></details></div>
<div><details><summary>h2@2.3.232(<a href="https://opensource.org/licenses/EPL-1.0">EPL 1.0</a>)</summary><pre>Copyright 2004-2024 H2 Group</pre></details></div>
<div><details><summary>asyncutil@0.1.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) IBM Corporation 2017. All Rights Reserved</pre></details></div>
<div><details><summary>icu4j@71.1(Unicode
)</summary><pre>Copyright 2021 and later: Unicode, Inc. and others
</pre></details></div>
<div><details><summary>json-path@2.9.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2011 the original author or authors</pre></details></div>
<div><details><summary>fastparse_2.13@3.1.1(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2014 Li Haoyi (haoyi.sg@gmail.com)</pre></details></div>
<div><details><summary>geny_2.13@1.1.0(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2016 Li Haoyi (haoyi.sg@gmail.com)</pre></details></div>
<div><details><summary>sourcecode_2.13@0.4.0(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2014 Li Haoyi (haoyi.sg@gmail.com)</pre></details></div>
<div><details><summary>content-type@2.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2020, Connect2id Ltd.</pre></details></div>
<div><details><summary>lang-tag@1.7(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2012-2022, Connect2id Ltd.</pre></details></div>
<div><details><summary>nimbus-jose-jwt@9.37.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2012 - 2022, Connect2id Ltd.</pre></details></div>
<div><details><summary>oauth2-oidc-sdk@9.43.6(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) Connect2id Ltd., 2012 - 2023
</pre></details></div>
<div><details><summary>jakarta.activation@1.2.2(<a href="https://www.eclipse.org/org/documents/edl-v10.php">EDL 1.0</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved</pre></details></div>
<div><details><summary>jaxb-core@4.0.5(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jaxb-impl@2.3.6(<a href="https://www.eclipse.org/org/documents/edl-v10.php">EDL 1.0</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jaxb-impl@4.0.5(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>HikariCP@5.1.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (C)  Brett Wooldridge</pre></details></div>
<div><details><summary>commons-codec@1.15(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Notice file:
======================================================================
Apache Commons Codec
Copyright 2002-2021 The Apache Software Foundation
This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).
src/test/org/apache/commons/codec/language/DoubleMetaphoneTest.java
contains test data from http://aspell.net/test/orig/batch0.tab.
Copyright (C) 2002 Kevin Atkinson (kevina@gnu.org)
The content of package org.apache.commons.codec.language.bm has been translated
from the original php source code available at http://stevemorse.org/phoneticinfo.htm
with permission from the original authors.
Original source copyright:
Copyright (c) 2008 Alexander Beider & Stephen P. Morse.
======================================================================</pre></details></div>
<div><details><summary>commons-codec@1.17.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Apache Commons Codec
Copyright 2002-2024 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).
</pre></details></div>
<div><details><summary>commons-fileupload@1.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Notice file
Apache Commons FileUpload
Copyright 2002-2023 The Apache Software Foundation
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).</pre></details></div>
<div><details><summary>commons-io@2.17.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Apache Commons IO
Copyright 2002-2024 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).
</pre></details></div>
<div><details><summary>commons-logging@1.1.1(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: 2003-2014 The Apache Software Foundation This product includes software developed at
The Apache Software Foundation (http://www.apache.org/)</pre></details></div>
<div><details><summary>commons-logging@1.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Notice file:
====================================================================
Apache Commons Logging
Copyright 2003-2016 The Apache Software Foundation
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
Copyright 2003-2016 The Apache Software Foundation												
====================================================================</pre></details></div>
<div><details><summary>micrometer-commons@1.14.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) 2017-Present VMware, Inc. All Rights Reserved.

This product contains a modified portion of 'io.netty.util.internal.logging',
in the Netty/Common library distributed by The Netty Project:

  * Copyright 2013 The Netty Project
  * License: Apache License v2.0
  * Homepage: https://netty.io

This product contains a modified portion of 'StringUtils.isBlank()',
in the Commons Lang library distributed by The Apache Software Foundation:

  * Copyright 2001-2019 The Apache Software Foundation
  * License: Apache License v2.0
  * Homepage: https://commons.apache.org/proper/commons-lang/

This product contains a modified portion of 'JsonUtf8Writer',
in the Moshi library distributed by Square, Inc:

  * Copyright 2010 Google Inc.
  * License: Apache License v2.0
  * Homepage: https://github.com/square/moshi

This product contains a modified portion of the 'org.springframework.lang'
package in the Spring Framework library, distributed by VMware, Inc:

  * Copyright 2002-2019 the original author or authors.
  * License: Apache License v2.0
  * Homepage: https://spring.io/projects/spring-framework
</pre></details></div>
<div><details><summary>micrometer-observation@1.14.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) 2017-Present VMware, Inc. All Rights Reserved.

This product contains a modified portion of 'io.netty.util.internal.logging',
in the Netty/Common library distributed by The Netty Project:

  * Copyright 2013 The Netty Project
  * License: Apache License v2.0
  * Homepage: https://netty.io

This product contains a modified portion of 'StringUtils.isBlank()',
in the Commons Lang library distributed by The Apache Software Foundation:

  * Copyright 2001-2019 The Apache Software Foundation
  * License: Apache License v2.0
  * Homepage: https://commons.apache.org/proper/commons-lang/

This product contains a modified portion of 'JsonUtf8Writer',
in the Moshi library distributed by Square, Inc:

  * Copyright 2010 Google Inc.
  * License: Apache License v2.0
  * Homepage: https://github.com/square/moshi

This product contains a modified portion of the 'org.springframework.lang'
package in the Spring Framework library, distributed by VMware, Inc:

  * Copyright 2002-2019 the original author or authors.
  * License: Apache License v2.0
  * Homepage: https://spring.io/projects/spring-framework
</pre></details></div>
<div><details><summary>jakarta.activation-api@1.2.2(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.										
Notice file: 
==================================================================
# Notices for Jakarta Activation
This content is produced and maintained by Jakarta Activation project.
* Project home: https://projects.eclipse.org/projects/ee4j.jaf
## Copyright
All content is the property of the respective authors or their employers. For
more information regarding authorship of content, please consult the listed
source code repository logs.
## Declared Project Licenses
This program and the accompanying materials are made available under the terms
of the Eclipse Distribution License v. 1.0,
which is available at http://www.eclipse.org/org/documents/edl-v10.php.
SPDX-License-Identifier: BSD-3-Clause
## Source Code
The project maintains the following source code repositories:
* https://github.com/eclipse-ee4j/jaf
## Third-party Content
This project leverages the following third party content.
JUnit (4.12)
* License: Eclipse Public License
====================================================================										</pre></details></div>
<div><details><summary>jakarta.activation-api@2.1.0(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jakarta.activation-api@2.1.3(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jakarta.annotation-api@1.3.5(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Notice file:
==================================================================
# Notices for Jakarta Activation
This content is produced and maintained by Jakarta Activation project.
* Project home: https://projects.eclipse.org/projects/ee4j.jaf
## Copyright
All content is the property of the respective authors or their employers. For
more information regarding authorship of content, please consult the listed
source code repository logs.
## Declared Project Licenses
This program and the accompanying materials are made available under the terms
of the Eclipse Distribution License v. 1.0,
which is available at http://www.eclipse.org/org/documents/edl-v10.php.
SPDX-License-Identifier: BSD-3-Clause
## Source Code
The project maintains the following source code repositories:
* https://github.com/eclipse-ee4j/jaf
## Third-party Content
This project leverages the following third party content.
JUnit (4.12)
* License: Eclipse Public License
====================================================================	
Copyright (C) Oracle and/or its affiliates. All rights reserved.																							</pre></details></div>
<div><details><summary>jakarta.annotation-api@2.1.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) Jakarta Annotations™</pre></details></div>
<div><details><summary>jakarta.el-api@4.0.0(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) Jakarta Annotations™</pre></details></div>
<div><details><summary>jakarta.inject-api@2.0.1(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) Eclipse Jakarta Dependency Injection project. All content is the property of the respective authors or their employers. For more information regarding authorship of content, please consult the listed source code repository logs</pre></details></div>
<div><details><summary>jakarta.servlet-api@6.0.0(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 1997, 2021 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jakarta.validation-api@2.0.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors (https://github.com/eclipse-ee4j/beanvalidation-api/blob/master/copyright.txt)</pre></details></div>
<div><details><summary>jakarta.validation-api@3.0.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) https://github.com/jakartaee/validation/blob/master/copyright.txt</pre></details></div>
<div><details><summary>jakarta.ws.rs-api@2.1.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Notice file:
==================================================================
# Notices for Jakarta Activation
This content is produced and maintained by Jakarta Activation project.
* Project home: https://projects.eclipse.org/projects/ee4j.jaf
## Copyright
All content is the property of the respective authors or their employers. For
more information regarding authorship of content, please consult the listed
source code repository logs.
## Declared Project Licenses
This program and the accompanying materials are made available under the terms
of the Eclipse Distribution License v. 1.0,
which is available at http://www.eclipse.org/org/documents/edl-v10.php.
SPDX-License-Identifier: BSD-3-Clause
## Source Code
The project maintains the following source code repositories:
* https://github.com/eclipse-ee4j/jaf
## Third-party Content
This project leverages the following third party content.
JUnit (4.12)
* License: Eclipse Public License
====================================================================	
Copyright (C) Oracle and/or its affiliates. All rights reserved.																								</pre></details></div>
<div><details><summary>jakarta.ws.rs-api@3.1.0(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright: Oracle and/or its affiliates. All rights reserved.
Licensed under EPL 2.0</pre></details></div>
<div><details><summary>jakarta.xml.bind-api@2.3.3(<a href="https://www.eclipse.org/org/documents/edl-v10.php">EDL 1.0</a>)</summary><pre>Copyright:(c) 2017, 2018 Oracle and/or its affiliates. All rights reserved.
Notice file: https://github.com/eclipse-ee4j/jaxb-api/blob/master/NOTICE.md</pre></details></div>
<div><details><summary>jakarta.xml.bind-api@3.0.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 1997, 2021 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jakarta.xml.bind-api@4.0.0(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved</pre></details></div>
<div><details><summary>jakarta.xml.bind-api@4.0.2(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 1997, 2024 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>joda-time@2.12.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>=============================================================================
= NOTICE file corresponding to section 4d of the Apache License Version 2.0 =
=============================================================================
This product includes software developed by
Joda.org (https://www.joda.org/).</pre></details></div>
<div><details><summary>accessors-smart@2.5.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2011-2023 JSON-SMART authors</pre></details></div>
<div><details><summary>accessors-smart@2.5.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2011-2024 JSON-SMART authors</pre></details></div>
<div><details><summary>json-smart@2.5.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2011-2023 JSON-SMART authors</pre></details></div>
<div><details><summary>json-smart@2.5.2(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2011-2024 JSON-SMART authors
</pre></details></div>
<div><details><summary>commons-lang3@3.17.0(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2001-2024 The Apache Software Foundation

Apache Commons Lang
Copyright 2001-2024 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).
</pre></details></div>
<div><details><summary>groovy-datetime@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy-dateutil@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy-json@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy-jsr223@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy-templates@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy-xml@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>groovy@4.0.22(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2003-2023 The Apache Software Foundation
Licensed under Apache 2.0
Notice
This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
The Java source files in src/main/java/org/apache/groovy/util/concurrent/concurrentlinkedhashmap/
are from https://github.com/ben-manes/concurrentlinkedhashmap and the following notice applies:
Copyright 2010-2012 Google Inc. All Rights Reserved.
The Java source file src/main/java/org/apache/groovy/util/concurrent/ConcurrentReferenceHashMap
is from https://github.com/hazelcast/hazelcast and the following notice applies:
Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
This product bundles icons from the famfamfam.com silk icons set
http://www.famfamfam.com/lab/icons/silk/
Licensed under the Creative Commons Attribution Licence v2.5
http://creativecommons.org/licenses/by/2.5/</pre></details></div>
<div><details><summary>httpclient@4.5.14(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The Apache Software Foundation</pre></details></div>
<div><details><summary>httpcore@4.4.16(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The Apache Software Foundation</pre></details></div>
<div><details><summary>log4j-api@2.24.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2024 Apache Software Foundation

Apache Log4j
Copyright 1999-2024 Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).

ResolverUtil.java
Copyright 2005-2006 Tim Fennell

Dumbster SMTP test server
Copyright 2004 Jason Paul Kitchen

TypeUtil.java
Copyright 2002-2012 Ramnivas Laddad, Juergen Hoeller, Chris Beams

picocli (http://picocli.info)
Copyright 2017 Remko Popma

TimeoutBlockingWaitStrategy.java and parts of Util.java
Copyright 2011 LMAX Ltd.
</pre></details></div>
<div><details><summary>log4j-to-slf4j@2.24.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2024 Apache Software Foundation

Apache Log4j
Copyright 1999-2024 Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).

ResolverUtil.java
Copyright 2005-2006 Tim Fennell

Dumbster SMTP test server
Copyright 2004 Jason Paul Kitchen

TypeUtil.java
Copyright 2002-2012 Ramnivas Laddad, Juergen Hoeller, Chris Beams

picocli (http://picocli.info)
Copyright 2017 Remko Popma

TimeoutBlockingWaitStrategy.java and parts of Util.java
Copyright 2011 LMAX Ltd.
</pre></details></div>
<div><details><summary>tomcat-embed-core@10.1.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2025 The Apache Software Foundation
</pre></details></div>
<div><details><summary>tomcat-embed-el@10.1.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2025 The Apache Software Foundation
</pre></details></div>
<div><details><summary>tomcat-embed-websocket@10.1.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2025 The Apache Software Foundation
</pre></details></div>
<div><details><summary>tomcat@10.1.36(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 1999-2025 The Apache Software Foundation
</pre></details></div>
<div><details><summary>angus-activation@1.0.0(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>angus-activation@2.0.2(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>freemarker@2.3.31(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright:  Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.</pre></details></div>
<div><details><summary>expressly@5.0.0(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2022 Contributors to the Eclipse Foundation.
Copyright (c) 1997, 2021 Oracle and/or its affiliates and others.</pre></details></div>
<div><details><summary>aopalliance-repackaged@2.6.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2013, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd.</pre></details></div>
<div><details><summary>aopalliance-repackaged@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2013, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd</pre></details></div>
<div><details><summary>jakarta.inject@2.6.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>class-model@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019, 2020 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-api@2.6.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-api@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019, 2020 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-core@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd</pre></details></div>
<div><details><summary>hk2-locator@2.6.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-locator@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019, 2020 Payara Services Ltd</pre></details></div>
<div><details><summary>hk2-runlevel@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-utils@2.6.1(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2-utils@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019, 2020 Payara Services Ltd.</pre></details></div>
<div><details><summary>hk2@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2010, 2018 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>osgi-resource-locator@1.0.3(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2018, 2019 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>spring-bridge@3.0.6(<a href="https://opensource.org/licenses/EPL-2.0">EPL 2.0</a>)</summary><pre>Copyright (c) 2013, 2018 Oracle and/or its affiliates. All rights reserved.
Copyright (c) 2019, 2020 Payara Services Ltd.</pre></details></div>
<div><details><summary>jersey-container-servlet-core@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2012, 2021 Oracle and/or its affiliates. All rights reserved  

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-container-servlet-core@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-container-servlet@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2012, 2021 Oracle and/or its affiliates. All rights reserved 

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-container-servlet@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-client@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2012, 2021 Oracle and/or its affiliates. All rights reserved

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-client@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-common@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2021 Oracle and/or its affiliates. All rights reserved  

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-common@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-server@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2010, 2021 Oracle and/or its affiliates. All rights reserved

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-server@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-bean-validation@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-entity-filtering@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-spring6@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-hk2@2.34(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2017, 2021 Oracle and/or its affiliates. All rights reserved

Further third-party content may be included: https://github.com/eclipse-ee4j/jersey/blob/2.34/NOTICE.md#third-party-content</pre></details></div>
<div><details><summary>jersey-hk2@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>jersey-media-json-jackson@3.1.10(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright various authors and contributors
</pre></details></div>
<div><details><summary>js-scriptengine@21.3.12(<a href="https://opensource.org/licenses/UPL">UPL</a>)</summary><pre>Copyright (c) 2019, Oracle and/or its affiliates.
</pre></details></div>
<div><details><summary>js@21.3.12(<a href="https://opensource.org/licenses/UPL">UPL</a>)</summary><pre>Copyright (c) 2019, Oracle and/or its affiliates.
</pre></details></div>
<div><details><summary>regex@21.3.12(<a href="https://opensource.org/licenses/UPL">UPL</a>)</summary><pre>Copyright (c) 2019, Oracle and/or its affiliates.
</pre></details></div>
<div><details><summary>graal-sdk@21.3.12(<a href="https://opensource.org/licenses/UPL">UPL</a>)</summary><pre>Copyright (c) 2019, Oracle and/or its affiliates.
</pre></details></div>
<div><details><summary>truffle-api@21.3.12(<a href="https://opensource.org/licenses/UPL">UPL</a>)</summary><pre>Copyright (c) 2019, Oracle and/or its affiliates.
</pre></details></div>
<div><details><summary>hibernate-validator@8.0.2.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: https://github.com/hibernate/hibernate-validator/blob/8.0.2.Final/copyright.txt
</pre></details></div>
<div><details><summary>javassist@3.25.0-GA(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: (C) 1999-2020 by Shigeru Chiba, All rights reserved.</pre></details></div>
<div><details><summary>javassist@3.30.2-GA(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (C) 1999-2023 by Shigeru Chiba, All rights reserved.</pre></details></div>
<div><details><summary>jboss-logging@3.4.1.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright JBoss, Home of Professional Open Source
Copyright 2010 Red Hat, Inc., and individual contributorsas indicated by the @author tags.</pre></details></div>
<div><details><summary>jboss-logging@3.5.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2010 Red Hat, Inc.</pre></details></div>
<div><details><summary>jboss-logging@3.6.1.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2023 Red Hat, Inc.</pre></details></div>
<div><details><summary>resteasy-core-spi@6.2.3.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2010 Red Hat, Inc.</pre></details></div>
<div><details><summary>resteasy-core@6.2.3.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2013 Red Hat, Inc., and individual contributors</pre></details></div>
<div><details><summary>resteasy-jaxrs@3.15.6.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: list of conributors https://github.com/resteasy/resteasy/graphs/contributors</pre></details></div>
<div><details><summary>jboss-annotations-api_1.3_spec@2.0.1.Final(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Copyright (c) 2012, 2019 Oracle and/or its affiliates. All rights reserved.</pre></details></div>
<div><details><summary>jboss-jaxrs-api_2.1_spec@2.0.1.Final(<a href="https://opensource.org/licenses/EPL-2.0">EPL-2.0</a>)</summary><pre>Notice file: 
=====================================================================================
Notices for the Jakarta RESTful Web Services Project
This content is produced and maintained by the Jakarta RESTful Web Services project.

Project home: https://projects.eclipse.org/projects/ee4j.jaxrs
Trademarks
Jakarta RESTful Web Services is a trademark of the Eclipse Foundation.

Copyright
All content is the property of the respective authors or their employers. 
For more information regarding authorship of content, please 
consult the listed source code repository logs.

Declared Project Licenses
This program and the accompanying materials are made available 
under the terms of the Eclipse Public License v. 2.0 which is available 
at http://www.eclipse.org/legal/epl-2.0. This Source Code may also be made 
available under the following Secondary Licenses when the conditions for 
such availability set forth in the Eclipse Public License v. 2.0 are 
satisfied: GNU General Public License, version 2 with the GNU Classpath 
Exception which is available at https://www.gnu.org/software/classpath/license.html.

SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0

Source Code
The project maintains the following source code repositories:

https://github.com/eclipse-ee4j/jaxrs-api
Third-party Content
This project leverages the following third party content.

javaee-api (7.0)

License: Apache-2.0 AND W3C
JUnit (4.11)

License: Common Public License 1.0
Mockito (2.16.0)

Project: http://site.mockito.org
Source: https://github.com/mockito/mockito/releases/tag/v2.16.0
Cryptography
Content may contain encryption software. The country in 
which you are currently may have restrictions on the import, 
possession, and use, and/or re-export to another country, of encryption software. 
BEFORE using any encryption software, please check the country's laws, 
regulations and policies concerning the import, possession, or use, 
and re-export of encryption software, to see if this is permitted.
https://github.com/jboss/jboss-jakarta-jaxrs-api_spec
===============================================================================
Copyright: Jakarta RESTful Web Services Project, Eclipse Foundation  
List of contributors: https://projects.eclipse.org/projects/ee4j.jaxrs/who</pre></details></div>
<div><details><summary>jboss-jaxb-api_2.3_spec@2.0.1.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright Red Hat</pre></details></div>
<div><details><summary>jandex@2.4.3.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright 2013 Red Hat, Inc., and individual contributors</pre></details></div>
<div><details><summary>mybatis@3.5.15(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright various authors: https://mybatis.org/mybatis-3/team.html

iBATIS
   This product includes software developed by
   The Apache Software Foundation (https://www.apache.org/).

   Copyright 2010 The Apache Software Foundation

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

OGNL
//--------------------------------------------------------------------------
//  Copyright (c) 2004, Drew Davidson and Luke Blanshard
//  All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are
//  met:
//
//  Redistributions of source code must retain the above copyright notice,
//  this list of conditions and the following disclaimer.
//  Redistributions in binary form must reproduce the above copyright
//  notice, this list of conditions and the following disclaimer in the
//  documentation and/or other materials provided with the distribution.
//  Neither the name of the Drew Davidson nor the names of its contributors
//  may be used to endorse or promote products derived from this software
//  without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
//  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
//  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
//  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
//  OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
//  AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
//  THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//  DAMAGE.
//--------------------------------------------------------------------------

Refactored SqlBuilder class (SQL, AbstractSQL)

   This product includes software developed by
   Adam Gent (https://gist.github.com/3650165)

   Copyright 2010 Adam Gent

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.</pre></details></div>
<div><details><summary>asm-commons@9.6(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2000-2011 INRIA, France Telecom</pre></details></div>
<div><details><summary>asm@9.7.1(<a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>)</summary><pre>Copyright (c) 2000-2011 INRIA, France Telecom</pre></details></div>
<div><details><summary>reactive-streams@1.0.3(<a href="https://creativecommons.org/share-your-work/public-domain/cc0/">CC0</a>)</summary><pre>CopyrightWaiver:https://github.com/reactive-streams/reactive-streams-jvm/blob/master/CopyrightWaivers.txt</pre></details></div>
<div><details><summary>reactive-streams@1.0.4(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright 2014 Reactive Streams</pre></details></div>
<div><details><summary>scala-library@2.13.15(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) 2002-2024 EPFL
Copyright (c) 2011-2024 Lightbend, Inc.

Scala includes software developed at
LAMP/EPFL (https://lamp.epfl.ch/) and
Lightbend, Inc. (https://www.lightbend.com/).

Licensed under the Apache License, Version 2.0 (the "License").
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This software includes projects with other licenses -- see `doc/LICENSE.md`.
</pre></details></div>
<div><details><summary>jul-to-slf4j@2.0.17(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2004-2022 QOS.ch Sarl (Switzerland)
</pre></details></div>
<div><details><summary>slf4j-api@1.7.25(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2004-2017 QOS.ch</pre></details></div>
<div><details><summary>slf4j-api@1.7.26(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright: (c) 2004-2017 QOS.ch</pre></details></div>
<div><details><summary>slf4j-api@1.7.36(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2004-2017 QOS.ch</pre></details></div>
<div><details><summary>slf4j-api@2.0.17(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2004-2023 QOS.ch</pre></details></div>
<div><details><summary>slf4j-jdk14@1.7.26(<a href="https://opensource.org/licenses/MIT">MIT</a>)</summary><pre>Copyright (c) 2004-2017 QOS.ch</pre></details></div>
<div><details><summary>spring-boot-autoconfigure@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-jdbc@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-jersey@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-json@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-logging@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-oauth2-client@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-security@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-tomcat@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-validation@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter-web@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot-starter@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-boot@3.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-config@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-core@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-crypto@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-oauth2-client@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-oauth2-core@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-oauth2-jose@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-security-web@6.4.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-aop@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-aop@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-beans@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-beans@6.2.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-beans@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-context@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-context@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-core@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-core@6.2.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-core@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-expression@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-expression@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-jcl@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-jcl@6.2.4(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-jcl@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-jdbc@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-jdbc@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-orm@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-orm@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-tx@5.3.39(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-tx@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-web@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>spring-webmvc@6.2.5(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright: various authors
</pre></details></div>
<div><details><summary>wildfly-common-ee-dependency-management@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>wildfly-common-expansion-dependency-management@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>wildfly-dist@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>wildfly-galleon-pack@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>wildfly-standard-ee-bom@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>wildfly-standard-expansion-bom@35.0.0.Final(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright The WildFly Authors</pre></details></div>
<div><details><summary>snakeyaml@2.3(<a href="https://opensource.org/licenses/Apache-2.0">Apache 2.0</a>)</summary><pre>Copyright (c) 2008, SnakeYAML</pre></details></div>

# EximeeBPMS Web Applications Javascript Dependencies

<div><details><summary><a href="https://github.com/bpmn-io/align-to-origin">@bpmn-io/align-to-origin@0.7.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2019-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/cm-theme">@bpmn-io/cm-theme@0.1.0-alpha.2</a> (MIT)</summary><pre>Copyright (c) 2023-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software  is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/diagram-js-ui">@bpmn-io/diagram-js-ui@0.2.3</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2022-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-migrate">@bpmn-io/dmn-migrate@0.5.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2020-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-variable-resolver">@bpmn-io/dmn-variable-resolver@0.4.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2023-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/draggle.git">@bpmn-io/draggle@4.1.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright © 2015-2016 Nicolas Bevacqua
Copyright © 2023 bpmn-io

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/feel-editor">@bpmn-io/feel-editor@1.9.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/feel-lint">@bpmn-io/feel-lint@1.3.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2022 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/form-js">@bpmn-io/form-js@1.8.7</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2021-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/form-js">@bpmn-io/form-js-editor@1.11.3</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2021-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/form-js">@bpmn-io/form-js-playground@1.11.3</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2021-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/form-js">@bpmn-io/form-js-viewer@1.11.3</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2021-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/properties-panel">@bpmn-io/properties-panel@3.25.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2021-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/autocomplete.git">@codemirror/autocomplete@6.18.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/commands.git">@codemirror/commands@6.7.1</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/lang-json.git">@codemirror/lang-json@6.0.1</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/language.git">@codemirror/language@6.10.3</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/lint.git">@codemirror/lint@6.8.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/search.git">@codemirror/search@6.5.7</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/state.git">@codemirror/state@6.4.1</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/view.git">@codemirror/view@6.34.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ibm/plex.git">@ibm/plex@6.4.0</a> (OFL-1.1)</summary><pre>Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"

This Font Software is licensed under the SIL Open Font License, Version 1.1.

This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/kurkle/color">@kurkle/color@0.3.2</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2018-2021 Jukka Kurkela

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/lezer-parser/common.git">@lezer/common@1.2.3</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/lezer-parser/highlight.git">@lezer/highlight@1.2.1</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/lezer-parser/json.git">@lezer/json@1.0.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2020 by Marijn Haverbeke <marijn@haverbeke.berlin>, Arun
Srinivasan <rulfzid@gmail.com>, and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/lezer-parser/lr.git">@lezer/lr@1.4.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/lezer-parser/markdown.git">@lezer/markdown@1.3.2</a> (MIT)</summary><pre>MIT License

Copyright (C) 2020 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7-route</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7-cookies</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7-animate</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7-resource</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs@1.9.7-sanitize</a> (SEE LICENSE IN LICENSE.md)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Angular.js`,
which is licensed under the `MIT License`. As such, all unmodified code and
materials are subject to the terms, conditions, and any other stipulation
associated with Angular.js's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Angular.js

The MIT License (MIT)

Copyright (c) 2010-2021 Google LLC. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs-essentials@2.5.6-angular-ui-bootstrap-2.5.7</a> (HeroDevs NES License)</summary><pre># This project contains IP governed by multiple licenses.
This project originated from Open Source contributions and is currently licensed
under a permissive license. As such, all unmodified code and materials are
subject to the terms, conditions, and any other stipulation associated with the
current license.
All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.
Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.


The HeroDevs NES License
Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
https://docs.herodevs.com.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

The MIT License
Copyright (c) 2012-2017 the AngularUI Team,
https://github.com/organizations/angular-ui/teams/291112

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs-essentials@1.3.0-angular-moment-1.3.2</a> (HeroDevs NES License)</summary><pre># This project contains IP governed by multiple licenses.
This project originated from Open Source contributions and is currently licensed
under a permissive license. As such, all unmodified code and materials are
subject to the terms, conditions, and any other stipulation associated with the
current license.
All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.
Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License
The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
https://docs.herodevs.com.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

## The MIT License (MIT)
Copyright (c) 2013-2016 Uri Shaked and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="">@neverendingsupport/angularjs-essentials@2.19.1-angular-translate-2.20.4</a> (HeroDevs NES License)</summary><pre># This project contains IP governed by multiple licenses.
This project originated from Open Source contributions and is currently licensed
under a permissive license. As such, all unmodified code and materials are
subject to the terms, conditions, and any other stipulation associated with the
current license.
All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.
Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact support@herodevs.com to learn more.


The HeroDevs NES License
Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
https://docs.herodevs.com.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

The MIT License
Copyright (c) 2013-2017 The angular-translate team and Pascal Precht

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/neverendingsupport/bootstrap.git">@neverendingsupport/bootstrap@3.4.5</a> (HeroDevs NES License)</summary><pre># This project contains IP governed by two licenses.

This project originated from the Open Source contributions of `Twitter` & `the
Bootstrap community`, which is licensed under the `MIT License`. As such, all
unmodified code and materials are subject to the terms, conditions, and any
other stipulation associated with Bootstrap's MIT License.

All other materials, including new files or modifications to existing files
(Updates) are original works of HeroDevs, Inc. and licensed under the HeroDevs
NES License.

Access to this project, via any medium, is restricted to parties explicitly
authorized by HeroDevs, Inc. Contact
[support@herodevs.com](mailto:support@herodevs.com) to learn more.

## HeroDevs License

The HeroDevs NES License

Copyright © 2023-present, HeroDevs, Inc. All Rights Reserved.

Access to this source code is restricted, regardless of medium, to parties
authorized by a valid commercial license. Use of this source code, as well as
any other associated asset, is also subject to the terms and conditions of the
Never-Ending Support program. For more information, visit
[https://docs.herodevs.com](https://docs.herodevs.com).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

# Bootstrap
The MIT License (MIT)

Copyright (c) 2011-2019 Twitter, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/Nikku/angular-data-depend.git">angular-data-depend@1.0.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2013 Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/sindresorhus/array-move">array-move@4.0.0</a> (MIT)</summary><pre>MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/MikeMcl/big.js.git">big.js@6.2.2</a> (MIT)</summary><pre>The MIT License (MIT)
=====================

Copyright © `<2024>` `Michael Mclaughlin`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/bpmn-font">bpmn-font@0.12.1</a> (SIL)</summary><pre>Copyright (c) 2014-present, Camunda Services GmbH

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/bpmn-js">bpmn-js@16.5.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/bpmn-moddle">bpmn-moddle@8.1.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/call-bind">call-bind@1.0.7</a> (MIT)</summary><pre>MIT License

Copyright (c) 2020 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/camunda/camunda-bpm-platform/tree/master/webapps/frontend">camunda-bpm-webapp@7.24.0-SNAPSHOT</a> ()</summary><pre>Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
under one or more contributor license agreements. See the NOTICE file
distributed with this work for additional information regarding copyright
ownership. Camunda licenses this file to you under the Apache License,
Version 2.0; you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre></details></div>
<div><details><summary><a href="https://github.com/camunda/camunda-dmn-js">camunda-dmn-js@1.8.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2022-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/camunda/camunda-dmn-moddle">camunda-dmn-moddle@1.3.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-2018 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/chartjs/Chart.js.git">chart.js@4.4.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-2022 Chart.js Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/JedWatson/classnames">classnames@2.5.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2018 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/zenorocha/clipboard.js">clipboard@2.0.11</a> (MIT)</summary><pre>MIT License

Copyright (c) Zeno Rocha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/lukeed/clsx">clsx@2.1.1</a> (MIT)</summary><pre>MIT License

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/cmmn-js">cmmn-js@0.20.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/cmmn-moddle">cmmn-moddle@5.0.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/codemirror/basic-setup.git">codemirror@6.0.1</a> (MIT)</summary><pre>MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/sindresorhus/component-emitter.git">component-emitter@1.3.1</a> (MIT)</summary><pre>(The MIT License)

Copyright (c) 2014 Component contributors <dev@component.io>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/marijnh/crelt">crelt@1.0.6</a> (MIT)</summary><pre>Copyright (C) 2020 by Marijn Haverbeke <marijn@haverbeke.berlin>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/mathiasbynens/CSS.escape.git">css.escape@1.5.1</a> (MIT)</summary><pre>Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/define-data-property">define-data-property@1.1.4</a> (MIT)</summary><pre>MIT License

Copyright (c) 2023 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/diagram-js">diagram-js@13.4.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/diagram-js-direct-editing">diagram-js-direct-editing@2.1.2</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-2017 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/diagram-js-grid">diagram-js-grid@0.2.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2023-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/diagram-js-origin">diagram-js-origin@1.4.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014  Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/didi">didi@4.0.0</a> (MIT)</summary><pre>The MIT License

Copyright (C) 2013 Vojta Jína.
Copyright (C) 2015-present Nico Rehwaldt.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-font">dmn-font@0.6.2</a> (SIL)</summary><pre>Copyright (c) 2014, camunda Services GmbH

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js">dmn-js@15.1.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js">dmn-js-decision-table@15.1.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js">dmn-js-drd@15.1.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js">dmn-js-literal-expression@15.1.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js-properties-panel">dmn-js-properties-panel@3.2.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015-2018 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-js">dmn-js-shared@15.1.0</a> (SEE LICENSE IN LICENSE)</summary><pre>Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or
application,
the watermark must stay fully visible and not visually overlapped by other
elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/dmn-moddle">dmn-moddle@10.0.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015-2017 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/WebReflection/dom4.git">dom4@2.1.6</a> (MIT)</summary><pre>Copyright (C) 2013-2015 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/cure53/DOMPurify">dompurify@3.2.4</a> ((MPL-2.0 OR Apache-2.0))</summary><pre>DOMPurify
Copyright 2025 Dr.-Ing. Mario Heiderich, Cure53

DOMPurify is free software; you can redistribute it and/or modify it under the
terms of either:

a) the Apache License Version 2.0, or
b) the Mozilla Public License Version 2.0

-----------------------------------------------------------------------------

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by
the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all
other entities that control, are controlled by, or are under common
control with that entity. For the purposes of this definition,
"control" means (i) the power, direct or indirect, to cause the
direction or management of such entity, whether by contract or
otherwise, or (ii) ownership of fifty percent (50%) or more of the
outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity
exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications,
including but not limited to software source code, documentation
source, and configuration files.

"Object" form shall mean any form resulting from mechanical
transformation or translation of a Source form, including but
not limited to compiled object code, generated documentation,
and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or
Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work
(an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object
form, that is based on (or derived from) the Work and for which the
editorial revisions, annotations, elaborations, or other modifications
represent, as a whole, an original work of authorship. For the purposes
of this License, Derivative Works shall not include works that remain
separable from, or merely link (or bind by name) to the interfaces of,
the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including
the original version of the Work and any modifications or additions
to that Work or Derivative Works thereof, that is intentionally
submitted to Licensor for inclusion in the Work by the copyright owner
or by an individual or Legal Entity authorized to submit on behalf of
the copyright owner. For the purposes of this definition, "submitted"
means any form of electronic, verbal, or written communication sent
to the Licensor or its representatives, including but not limited to
communication on electronic mailing lists, source code control systems,
and issue tracking systems that are managed by, or on behalf of, the
Licensor for the purpose of discussing and improving the Work, but
excluding communication that is conspicuously marked or otherwise
designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity
on behalf of whom a Contribution has been received by Licensor and
subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
copyright license to reproduce, prepare Derivative Works of,
publicly display, publicly perform, sublicense, and distribute the
Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
(except as stated in this section) patent license to make, have made,
use, offer to sell, sell, import, and otherwise transfer the Work,
where such license applies only to those patent claims licensable
by such Contributor that are necessarily infringed by their
Contribution(s) alone or by combination of their Contribution(s)
with the Work to which such Contribution(s) was submitted. If You
institute patent litigation against any entity (including a
cross-claim or counterclaim in a lawsuit) alleging that the Work
or a Contribution incorporated within the Work constitutes direct
or contributory patent infringement, then any patent licenses
granted to You under this License for that Work shall terminate
as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
Work or Derivative Works thereof in any medium, with or without
modifications, and in Source or Object form, provided that You
meet the following conditions:

(a) You must give any other recipients of the Work or
Derivative Works a copy of this License; and

(b) You must cause any modified files to carry prominent notices
stating that You changed the files; and

(c) You must retain, in the Source form of any Derivative Works
that You distribute, all copyright, patent, trademark, and
attribution notices from the Source form of the Work,
excluding those notices that do not pertain to any part of
the Derivative Works; and

(d) If the Work includes a "NOTICE" text file as part of its
distribution, then any Derivative Works that You distribute must
include a readable copy of the attribution notices contained
within such NOTICE file, excluding those notices that do not
pertain to any part of the Derivative Works, in at least one
of the following places: within a NOTICE text file distributed
as part of the Derivative Works; within the Source form or
documentation, if provided along with the Derivative Works; or,
within a display generated by the Derivative Works, if and
wherever such third-party notices normally appear. The contents
of the NOTICE file are for informational purposes only and
do not modify the License. You may add Your own attribution
notices within Derivative Works that You distribute, alongside
or as an addendum to the NOTICE text from the Work, provided
that such additional attribution notices cannot be construed
as modifying the License.

You may add Your own copyright statement to Your modifications and
may provide additional or different license terms and conditions
for use, reproduction, or distribution of Your modifications, or
for any such Derivative Works as a whole, provided Your use,
reproduction, and distribution of the Work otherwise complies with
the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
any Contribution intentionally submitted for inclusion in the Work
by You to the Licensor shall be under the terms and conditions of
this License, without any additional terms or conditions.
Notwithstanding the above, nothing herein shall supersede or modify
the terms of any separate license agreement you may have executed
with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
names, trademarks, service marks, or product names of the Licensor,
except as required for reasonable and customary use in describing the
origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
agreed to in writing, Licensor provides the Work (and each
Contributor provides its Contributions) on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied, including, without limitation, any warranties or conditions
of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
PARTICULAR PURPOSE. You are solely responsible for determining the
appropriateness of using or redistributing the Work and assume any
risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
whether in tort (including negligence), contract, or otherwise,
unless required by applicable law (such as deliberate and grossly
negligent acts) or agreed to in writing, shall any Contributor be
liable to You for damages, including any direct, indirect, special,
incidental, or consequential damages of any character arising as a
result of this License or out of the use or inability to use the
Work (including but not limited to damages for loss of goodwill,
work stoppage, computer failure or malfunction, or any and all
other commercial damages or losses), even if such Contributor
has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
the Work or Derivative Works thereof, You may choose to offer,
and charge a fee for, acceptance of support, warranty, indemnity,
or other liability obligations and/or rights consistent with this
License. However, in accepting such obligations, You may act only
on Your own behalf and on Your sole responsibility, not on behalf
of any other Contributor, and only if You agree to indemnify,
defend, and hold each Contributor harmless for any liability
incurred by, or claims asserted against, such Contributor by reason
of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

To apply the Apache License to your work, attach the following
boilerplate notice, with the fields enclosed by brackets "[]"
replaced with your own identifying information. (Don't include
the brackets!)  The text should be enclosed in the appropriate
comment syntax for the file format. We also recommend that a
file or class name and description of purpose be included on the
same "printed page" as the copyright notice for easier
identification within third-party archives.

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-----------------------------------------------------------------------------
Mozilla Public License, version 2.0

1. Definitions

1.1. “Contributor”

means each individual or legal entity that creates, contributes to the
creation of, or owns Covered Software.

1.2. “Contributor Version”

means the combination of the Contributions of others (if any) used by a
Contributor and that particular Contributor’s Contribution.

1.3. “Contribution”

means Covered Software of a particular Contributor.

1.4. “Covered Software”

means Source Code Form to which the initial Contributor has attached the
notice in Exhibit A, the Executable Form of such Source Code Form, and
Modifications of such Source Code Form, in each case including portions
thereof.

1.5. “Incompatible With Secondary Licenses”
means

a. that the initial Contributor has attached the notice described in
Exhibit B to the Covered Software; or

b. that the Covered Software was made available under the terms of version
1.1 or earlier of the License, but not also under the terms of a
Secondary License.

1.6. “Executable Form”

means any form of the work other than Source Code Form.

1.7. “Larger Work”

means a work that combines Covered Software with other material, in a separate
file or files, that is not Covered Software.

1.8. “License”

means this document.

1.9. “Licensable”

means having the right to grant, to the maximum extent possible, whether at the
time of the initial grant or subsequently, any and all of the rights conveyed by
this License.

1.10. “Modifications”

means any of the following:

a. any file in Source Code Form that results from an addition to, deletion
from, or modification of the contents of Covered Software; or

b. any new file in Source Code Form that contains any Covered Software.

1.11. “Patent Claims” of a Contributor

means any patent claim(s), including without limitation, method, process,
and apparatus claims, in any patent Licensable by such Contributor that
would be infringed, but for the grant of the License, by the making,
using, selling, offering for sale, having made, import, or transfer of
either its Contributions or its Contributor Version.

1.12. “Secondary License”

means either the GNU General Public License, Version 2.0, the GNU Lesser
General Public License, Version 2.1, the GNU Affero General Public
License, Version 3.0, or any later versions of those licenses.

1.13. “Source Code Form”

means the form of the work preferred for making modifications.

1.14. “You” (or “Your”)

means an individual or a legal entity exercising rights under this
License. For legal entities, “You” includes any entity that controls, is
controlled by, or is under common control with You. For purposes of this
definition, “control” means (a) the power, direct or indirect, to cause
the direction or management of such entity, whether by contract or
otherwise, or (b) ownership of more than fifty percent (50%) of the
outstanding shares or beneficial ownership of such entity.


2. License Grants and Conditions

2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

a. under intellectual property rights (other than patent or trademark)
Licensable by such Contributor to use, reproduce, make available,
modify, display, perform, distribute, and otherwise exploit its
Contributions, either on an unmodified basis, with Modifications, or as
part of a Larger Work; and

b. under Patent Claims of such Contributor to make, use, sell, offer for
sale, have made, import, and otherwise transfer either its Contributions
or its Contributor Version.

2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution become
effective for each Contribution on the date the Contributor first distributes
such Contribution.

2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under this
License. No additional rights or licenses will be implied from the distribution
or licensing of Covered Software under this License. Notwithstanding Section
2.1(b) above, no patent license is granted by a Contributor:

a. for any code that a Contributor has removed from Covered Software; or

b. for infringements caused by: (i) Your and any other third party’s
modifications of Covered Software, or (ii) the combination of its
Contributions with other software (except as part of its Contributor
Version); or

c. under Patent Claims infringed by Covered Software in the absence of its
Contributions.

This License does not grant any rights in the trademarks, service marks, or
logos of any Contributor (except as may be necessary to comply with the
notice requirements in Section 3.4).

2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this License
(see Section 10.2) or under the terms of a Secondary License (if permitted
under the terms of Section 3.3).

2.5. Representation

Each Contributor represents that the Contributor believes its Contributions
are its original creation(s) or it has sufficient rights to grant the
rights to its Contributions conveyed by this License.

2.6. Fair Use

This License is not intended to limit any rights You have under applicable
copyright doctrines of fair use, fair dealing, or other equivalents.

2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted in
Section 2.1.


3. Responsibilities

3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under the
terms of this License. You must inform recipients that the Source Code Form
of the Covered Software is governed by the terms of this License, and how
they can obtain a copy of this License. You may not attempt to alter or
restrict the recipients’ rights in the Source Code Form.

3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

a. such Covered Software must also be made available in Source Code Form,
as described in Section 3.1, and You must inform recipients of the
Executable Form how they can obtain a copy of such Source Code Form by
reasonable means in a timely manner, at a charge no more than the cost
of distribution to the recipient; and

b. You may distribute such Executable Form under the terms of this License,
or sublicense it under different terms, provided that the license for
the Executable Form does not attempt to limit or alter the recipients’
rights in the Source Code Form under this License.

3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for the
Covered Software. If the Larger Work is a combination of Covered Software
with a work governed by one or more Secondary Licenses, and the Covered
Software is not Incompatible With Secondary Licenses, this License permits
You to additionally distribute such Covered Software under the terms of
such Secondary License(s), so that the recipient of the Larger Work may, at
their option, further distribute the Covered Software under the terms of
either this License or such Secondary License(s).

3.4. Notices

You may not remove or alter the substance of any license notices (including
copyright notices, patent notices, disclaimers of warranty, or limitations
of liability) contained within the Source Code Form of the Covered
Software, except that You may alter any license notices to the extent
required to remedy known factual inaccuracies.

3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on behalf
of any Contributor. You must make it absolutely clear that any such
warranty, support, indemnity, or liability obligation is offered by You
alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.

4. Inability to Comply Due to Statute or Regulation

If it is impossible for You to comply with any of the terms of this License
with respect to some or all of the Covered Software due to statute, judicial
order, or regulation then You must: (a) comply with the terms of this License
to the maximum extent possible; and (b) describe the limitations and the code
they affect. Such description must be placed in a text file included with all
distributions of the Covered Software under this License. Except to the
extent prohibited by statute or regulation, such description must be
sufficiently detailed for a recipient of ordinary skill to be able to
understand it.

5. Termination

5.1. The rights granted under this License will terminate automatically if You
fail to comply with any of its terms. However, if You become compliant,
then the rights granted under this License from a particular Contributor
are reinstated (a) provisionally, unless and until such Contributor
explicitly and finally terminates Your grants, and (b) on an ongoing basis,
if such Contributor fails to notify You of the non-compliance by some
reasonable means prior to 60 days after You have come back into compliance.
Moreover, Your grants from a particular Contributor are reinstated on an
ongoing basis if such Contributor notifies You of the non-compliance by
some reasonable means, this is the first time You have received notice of
non-compliance with this License from such Contributor, and You become
compliant prior to 30 days after Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions, counter-claims,
and cross-claims) alleging that a Contributor Version directly or
indirectly infringes any patent, then the rights granted to You by any and
all Contributors for the Covered Software under Section 2.1 of this License
shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all end user
license agreements (excluding distributors and resellers) which have been
validly granted by You or Your distributors under this License prior to
termination shall survive termination.

6. Disclaimer of Warranty

Covered Software is provided under this License on an “as is” basis, without
warranty of any kind, either expressed, implied, or statutory, including,
without limitation, warranties that the Covered Software is free of defects,
merchantable, fit for a particular purpose or non-infringing. The entire
risk as to the quality and performance of the Covered Software is with You.
Should any Covered Software prove defective in any respect, You (not any
Contributor) assume the cost of any necessary servicing, repair, or
correction. This disclaimer of warranty constitutes an essential part of this
License. No use of  any Covered Software is authorized under this License
except under this disclaimer.

7. Limitation of Liability

Under no circumstances and under no legal theory, whether tort (including
negligence), contract, or otherwise, shall any Contributor, or anyone who
distributes Covered Software as permitted above, be liable to You for any
direct, indirect, special, incidental, or consequential damages of any
character including, without limitation, damages for lost profits, loss of
goodwill, work stoppage, computer failure or malfunction, or any and all
other commercial damages or losses, even if such party shall have been
informed of the possibility of such damages. This limitation of liability
shall not apply to liability for death or personal injury resulting from such
party’s negligence to the extent applicable law prohibits such limitation.
Some jurisdictions do not allow the exclusion or limitation of incidental or
consequential damages, so this exclusion and limitation may not apply to You.

8. Litigation

Any litigation relating to this License may be brought only in the courts of
a jurisdiction where the defendant maintains its principal place of business
and such litigation shall be governed by laws of that jurisdiction, without
reference to its conflict-of-law provisions. Nothing in this Section shall
prevent a party’s ability to bring cross-claims or counter-claims.

9. Miscellaneous

This License represents the complete agreement concerning the subject matter
hereof. If any provision of this License is held to be unenforceable, such
provision shall be reformed only to the extent necessary to make it
enforceable. Any law or regulation which provides that the language of a
contract shall be construed against the drafter shall not be used to construe
this License against a Contributor.


10. Versions of the License

10.1. New Versions

Mozilla Foundation is the license steward. Except as provided in Section
10.3, no one other than the license steward has the right to modify or
publish new versions of this License. Each version will be given a
distinguishing version number.

10.2. Effect of New Versions

You may distribute the Covered Software under the terms of the version of
the License under which You originally received the Covered Software, or
under the terms of any subsequent version published by the license
steward.

10.3. Modified Versions

If you create software not governed by this License, and you want to
create a new license for such software, you may create and use a modified
version of this License if you rename the license and remove any
references to the name of the license steward (except to note that such
modified license differs from this License).

10.4. Distributing Source Code Form that is Incompatible With Secondary Licenses
If You choose to distribute Source Code Form that is Incompatible With
Secondary Licenses under the terms of this version of the License, the
notice described in Exhibit B of this License must be attached.

Exhibit A - Source Code Form License Notice

This Source Code Form is subject to the
terms of the Mozilla Public License, v.
2.0. If a copy of the MPL was not
distributed with this file, You can
obtain one at
http://mozilla.org/MPL/2.0/.

If it is not possible or desirable to put the notice in a particular file, then
You may include the notice in a location (such as a LICENSE file in a relevant
directory) where a recipient would be likely to look for such a notice.

You may add additional accurate notices of copyright ownership.

Exhibit B - “Incompatible With Secondary Licenses” Notice

This Source Code Form is “Incompatible
With Secondary Licenses”, as defined by
the Mozilla Public License, v. 2.0.

</pre></details></div>
<div><details><summary><a href="https://github.com/rndme/download.git">downloadjs@1.4.7</a> (MIT)</summary><pre>MIT License

Copyright (c) 2016 dandavis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/es-define-property">es-define-property@1.0.0</a> (MIT)</summary><pre>MIT License

Copyright (c) 2024 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/es-errors">es-errors@1.3.0</a> (MIT)</summary><pre>MIT License

Copyright (c) 2024 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/component/escape-html">escape-html@1.0.3</a> (MIT)</summary><pre>(The MIT License)

Copyright (c) 2012-2013 TJ Holowaychuk
Copyright (c) 2015 Andreas Lubbe
Copyright (c) 2015 Tiancheng "Timothy" Gu

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/Gozala/events">events@3.3.0</a> (MIT)</summary><pre>MIT

Copyright Joyent, Inc. and other Node contributors.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/davidmarkclements/fast-safe-stringify">fast-safe-stringify@2.1.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2016 David Mark Clements
Copyright (c) 2017 David Mark Clements & Matteo Collina
Copyright (c) 2018 David Mark Clements, Matteo Collina & Ruben Bridgewater

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/NaturalIntelligence/fast-xml-parser">fast-xml-parser@4.3.4</a> (MIT)</summary><pre>MIT License

Copyright (c) 2017 Amit Kumar Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/feelers">feelers@1.4.0</a> (MIT)</summary><pre>Copyright (c) 2023-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the
Software without restriction, including without limitation the rights to use,
copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software,
and to permit persons to whom the Software  is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE
OR OTHER DEALINGS IN THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/feelin">feelin@3.1.2</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2019-present Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/file-drops">file-drops@0.5.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2018-present Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/chmln/flatpickr">flatpickr@4.6.13</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2017 Gregory Petrosyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/focus-trap/focus-trap">focus-trap@7.6.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015-2016 David Clark

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/Raynos/function-bind.git">function-bind@1.1.2</a> (MIT)</summary><pre>Copyright (c) 2013 Raynos.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/get-intrinsic">get-intrinsic@1.2.4</a> (MIT)</summary><pre>MIT License

Copyright (c) 2020 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/gopd">gopd@1.0.1</a> (MIT)</summary><pre>MIT License

Copyright (c) 2022 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/hammerjs/hammer.js">hammerjs@2.0.8</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (C) 2011-2014 by Jorik Tangelder (Eight Media)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/inspect-js/has-property-descriptors">has-property-descriptors@1.0.2</a> (MIT)</summary><pre>MIT License

Copyright (c) 2022 Inspect JS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/inspect-js/has-proto">has-proto@1.0.3</a> (MIT)</summary><pre>MIT License

Copyright (c) 2022 Inspect JS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/inspect-js/has-symbols">has-symbols@1.0.3</a> (MIT)</summary><pre>MIT License

Copyright (c) 2016 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/inspect-js/hasOwn">hasown@2.0.2</a> (MIT)</summary><pre>MIT License

Copyright (c) Jordan Harband and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/developit/htm">htm@3.1.1</a> (Apache-2.0)</summary><pre>
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by
the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all
other entities that control, are controlled by, or are under common
control with that entity. For the purposes of this definition,
"control" means (i) the power, direct or indirect, to cause the
direction or management of such entity, whether by contract or
otherwise, or (ii) ownership of fifty percent (50%) or more of the
outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity
exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications,
including but not limited to software source code, documentation
source, and configuration files.

"Object" form shall mean any form resulting from mechanical
transformation or translation of a Source form, including but
not limited to compiled object code, generated documentation,
and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or
Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work
(an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object
form, that is based on (or derived from) the Work and for which the
editorial revisions, annotations, elaborations, or other modifications
represent, as a whole, an original work of authorship. For the purposes
of this License, Derivative Works shall not include works that remain
separable from, or merely link (or bind by name) to the interfaces of,
the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including
the original version of the Work and any modifications or additions
to that Work or Derivative Works thereof, that is intentionally
submitted to Licensor for inclusion in the Work by the copyright owner
or by an individual or Legal Entity authorized to submit on behalf of
the copyright owner. For the purposes of this definition, "submitted"
means any form of electronic, verbal, or written communication sent
to the Licensor or its representatives, including but not limited to
communication on electronic mailing lists, source code control systems,
and issue tracking systems that are managed by, or on behalf of, the
Licensor for the purpose of discussing and improving the Work, but
excluding communication that is conspicuously marked or otherwise
designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity
on behalf of whom a Contribution has been received by Licensor and
subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
copyright license to reproduce, prepare Derivative Works of,
publicly display, publicly perform, sublicense, and distribute the
Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
(except as stated in this section) patent license to make, have made,
use, offer to sell, sell, import, and otherwise transfer the Work,
where such license applies only to those patent claims licensable
by such Contributor that are necessarily infringed by their
Contribution(s) alone or by combination of their Contribution(s)
with the Work to which such Contribution(s) was submitted. If You
institute patent litigation against any entity (including a
cross-claim or counterclaim in a lawsuit) alleging that the Work
or a Contribution incorporated within the Work constitutes direct
or contributory patent infringement, then any patent licenses
granted to You under this License for that Work shall terminate
as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
Work or Derivative Works thereof in any medium, with or without
modifications, and in Source or Object form, provided that You
meet the following conditions:

(a) You must give any other recipients of the Work or
Derivative Works a copy of this License; and

(b) You must cause any modified files to carry prominent notices
stating that You changed the files; and

(c) You must retain, in the Source form of any Derivative Works
that You distribute, all copyright, patent, trademark, and
attribution notices from the Source form of the Work,
excluding those notices that do not pertain to any part of
the Derivative Works; and

(d) If the Work includes a "NOTICE" text file as part of its
distribution, then any Derivative Works that You distribute must
include a readable copy of the attribution notices contained
within such NOTICE file, excluding those notices that do not
pertain to any part of the Derivative Works, in at least one
of the following places: within a NOTICE text file distributed
as part of the Derivative Works; within the Source form or
documentation, if provided along with the Derivative Works; or,
within a display generated by the Derivative Works, if and
wherever such third-party notices normally appear. The contents
of the NOTICE file are for informational purposes only and
do not modify the License. You may add Your own attribution
notices within Derivative Works that You distribute, alongside
or as an addendum to the NOTICE text from the Work, provided
that such additional attribution notices cannot be construed
as modifying the License.

You may add Your own copyright statement to Your modifications and
may provide additional or different license terms and conditions
for use, reproduction, or distribution of Your modifications, or
for any such Derivative Works as a whole, provided Your use,
reproduction, and distribution of the Work otherwise complies with
the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
any Contribution intentionally submitted for inclusion in the Work
by You to the Licensor shall be under the terms and conditions of
this License, without any additional terms or conditions.
Notwithstanding the above, nothing herein shall supersede or modify
the terms of any separate license agreement you may have executed
with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
names, trademarks, service marks, or product names of the Licensor,
except as required for reasonable and customary use in describing the
origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
agreed to in writing, Licensor provides the Work (and each
Contributor provides its Contributions) on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied, including, without limitation, any warranties or conditions
of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
PARTICULAR PURPOSE. You are solely responsible for determining the
appropriateness of using or redistributing the Work and assume any
risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
whether in tort (including negligence), contract, or otherwise,
unless required by applicable law (such as deliberate and grossly
negligent acts) or agreed to in writing, shall any Contributor be
liable to You for damages, including any direct, indirect, special,
incidental, or consequential damages of any character arising as a
result of this License or out of the use or inability to use the
Work (including but not limited to damages for loss of goodwill,
work stoppage, computer failure or malfunction, or any and all
other commercial damages or losses), even if such Contributor
has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
the Work or Derivative Works thereof, You may choose to offer,
and charge a fee for, acceptance of support, warranty, indemnity,
or other liability obligations and/or rights consistent with this
License. However, in accepting such obligations, You may act only
on Your own behalf and on Your sole responsibility, not on behalf
of any other Contributor, and only if You agree to indemnify,
defend, and hold each Contributor harmless for any liability
incurred by, or claims asserted against, such Contributor by reason
of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

To apply the Apache License to your work, attach the following
boilerplate notice, with the fields enclosed by brackets "[]"
replaced with your own identifying information. (Don't include
the brackets!)  The text should be enclosed in the appropriate
comment syntax for the file format. We also recommend that a
file or class name and description of purpose be included on the
same "printed page" as the copyright notice for easier
identification within third-party archives.

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/ids">ids@1.0.5</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/infernojs/inferno">inferno@5.6.3</a> (MIT)</summary><pre># MIT License
Copyright (c) 2013-2016 Dominic Gannaway

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/isaacs/inherits">inherits@2.0.4</a> (ISC)</summary><pre>The ISC License

Copyright (c) Isaac Z. Schlueter

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/inherits-browser">inherits-browser@0.1.0</a> (ISC)</summary><pre>The ISC License

Copyright (c) 2022-present Nico Rehwaldt
Copyright (c) 2011-2022 Isaac Z. Schlueter

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/jquery/jquery.git">jquery@3.7.1</a> (MIT)</summary><pre>Copyright OpenJS Foundation and other contributors, https://openjsf.org/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/jquery/jquery-ui">jquery-ui@1.13.2</a> (MIT)</summary><pre>Copyright jQuery Foundation and other contributors, https://jquery.org/

This software consists of voluntary contributions made by many
individuals. For exact contribution history, see the revision history
available at https://github.com/jquery/jquery-ui

The following license applies to all parts of this software except as
documented below:

====

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

====

Copyright and related rights for sample code are waived via CC0. Sample
code is defined as all source code contained within the demos directory.

CC0: http://creativecommons.org/publicdomain/zero/1.0/

====

All files located in the node_modules and external directories are
externally maintained libraries used by this software which have their
own licenses; we recommend you read them, as their terms may differ from
the terms above.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/lang-feel.git">lang-feel@2.2.0</a> (MIT)</summary><pre>MIT License

Copyright (C) 2022-current Nico Rehwaldt <https://github.com/nikku>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/lezer-feel.git">lezer-feel@1.4.0</a> (MIT)</summary><pre>MIT License

Copyright (C) 2020 by Nico Rehwaldt <git_nikku@nixis.de> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/moment/luxon">luxon@3.5.0</a> (MIT)</summary><pre>Copyright 2019 JS Foundation and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/markedjs/marked">marked@14.1.3</a> (MIT)</summary><pre># License information

## Contribution License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## Marked

Copyright (c) 2018+, MarkedJS (https://github.com/markedjs/)
Copyright (c) 2011-2018, Christopher Jeffrey (https://github.com/chjj/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Markdown

Copyright © 2004, John Gruber
http://daringfireball.net/
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.
* Neither the name “Markdown” nor the names of its contributors may be used to
endorse or promote products derived from this software without specific prior
written permission.

This software is provided by the copyright holders and contributors “as is” and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright owner or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/min-dash">min-dash@3.8.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2017-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/min-dom">min-dom@3.2.1</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 Nico Rehwaldt
Copyright (c) 2015-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/developit/mitt">mitt@3.0.1</a> (MIT)</summary><pre>MIT License

Copyright (c) 2021 Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/moddle">moddle@4.1.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/moddle-xml">moddle-xml@7.5.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/moment/moment.git">moment@2.30.1</a> (MIT)</summary><pre>Copyright (c) JS Foundation and other contributors

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ccampbell/mousetrap">mousetrap@1.6.5</a> (Apache-2.0 WITH LLVM-exception)</summary><pre>
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by
the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all
other entities that control, are controlled by, or are under common
control with that entity. For the purposes of this definition,
"control" means (i) the power, direct or indirect, to cause the
direction or management of such entity, whether by contract or
otherwise, or (ii) ownership of fifty percent (50%) or more of the
outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity
exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications,
including but not limited to software source code, documentation
source, and configuration files.

"Object" form shall mean any form resulting from mechanical
transformation or translation of a Source form, including but
not limited to compiled object code, generated documentation,
and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or
Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work
(an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object
form, that is based on (or derived from) the Work and for which the
editorial revisions, annotations, elaborations, or other modifications
represent, as a whole, an original work of authorship. For the purposes
of this License, Derivative Works shall not include works that remain
separable from, or merely link (or bind by name) to the interfaces of,
the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including
the original version of the Work and any modifications or additions
to that Work or Derivative Works thereof, that is intentionally
submitted to Licensor for inclusion in the Work by the copyright owner
or by an individual or Legal Entity authorized to submit on behalf of
the copyright owner. For the purposes of this definition, "submitted"
means any form of electronic, verbal, or written communication sent
to the Licensor or its representatives, including but not limited to
communication on electronic mailing lists, source code control systems,
and issue tracking systems that are managed by, or on behalf of, the
Licensor for the purpose of discussing and improving the Work, but
excluding communication that is conspicuously marked or otherwise
designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity
on behalf of whom a Contribution has been received by Licensor and
subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
copyright license to reproduce, prepare Derivative Works of,
publicly display, publicly perform, sublicense, and distribute the
Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
(except as stated in this section) patent license to make, have made,
use, offer to sell, sell, import, and otherwise transfer the Work,
where such license applies only to those patent claims licensable
by such Contributor that are necessarily infringed by their
Contribution(s) alone or by combination of their Contribution(s)
with the Work to which such Contribution(s) was submitted. If You
institute patent litigation against any entity (including a
cross-claim or counterclaim in a lawsuit) alleging that the Work
or a Contribution incorporated within the Work constitutes direct
or contributory patent infringement, then any patent licenses
granted to You under this License for that Work shall terminate
as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
Work or Derivative Works thereof in any medium, with or without
modifications, and in Source or Object form, provided that You
meet the following conditions:

(a) You must give any other recipients of the Work or
Derivative Works a copy of this License; and

(b) You must cause any modified files to carry prominent notices
stating that You changed the files; and

(c) You must retain, in the Source form of any Derivative Works
that You distribute, all copyright, patent, trademark, and
attribution notices from the Source form of the Work,
excluding those notices that do not pertain to any part of
the Derivative Works; and

(d) If the Work includes a "NOTICE" text file as part of its
distribution, then any Derivative Works that You distribute must
include a readable copy of the attribution notices contained
within such NOTICE file, excluding those notices that do not
pertain to any part of the Derivative Works, in at least one
of the following places: within a NOTICE text file distributed
as part of the Derivative Works; within the Source form or
documentation, if provided along with the Derivative Works; or,
within a display generated by the Derivative Works, if and
wherever such third-party notices normally appear. The contents
of the NOTICE file are for informational purposes only and
do not modify the License. You may add Your own attribution
notices within Derivative Works that You distribute, alongside
or as an addendum to the NOTICE text from the Work, provided
that such additional attribution notices cannot be construed
as modifying the License.

You may add Your own copyright statement to Your modifications and
may provide additional or different license terms and conditions
for use, reproduction, or distribution of Your modifications, or
for any such Derivative Works as a whole, provided Your use,
reproduction, and distribution of the Work otherwise complies with
the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
any Contribution intentionally submitted for inclusion in the Work
by You to the Licensor shall be under the terms and conditions of
this License, without any additional terms or conditions.
Notwithstanding the above, nothing herein shall supersede or modify
the terms of any separate license agreement you may have executed
with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
names, trademarks, service marks, or product names of the Licensor,
except as required for reasonable and customary use in describing the
origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
agreed to in writing, Licensor provides the Work (and each
Contributor provides its Contributions) on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied, including, without limitation, any warranties or conditions
of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
PARTICULAR PURPOSE. You are solely responsible for determining the
appropriateness of using or redistributing the Work and assume any
risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
whether in tort (including negligence), contract, or otherwise,
unless required by applicable law (such as deliberate and grossly
negligent acts) or agreed to in writing, shall any Contributor be
liable to You for damages, including any direct, indirect, special,
incidental, or consequential damages of any character arising as a
result of this License or out of the use or inability to use the
Work (including but not limited to damages for loss of goodwill,
work stoppage, computer failure or malfunction, or any and all
other commercial damages or losses), even if such Contributor
has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
the Work or Derivative Works thereof, You may choose to offer,
and charge a fee for, acceptance of support, warranty, indemnity,
or other liability obligations and/or rights consistent with this
License. However, in accepting such obligations, You may act only
on Your own behalf and on Your sole responsibility, not on behalf
of any other Contributor, and only if You agree to indemnify,
defend, and hold each Contributor harmless for any liability
incurred by, or claims asserted against, such Contributor by reason
of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

--- Exceptions to the Apache 2.0 License ----

As an exception, if, as a result of your compiling your source code, portions
of this Software are embedded into an Object form of such source code, you
may redistribute such embedded portions in such Object form without complying
with the conditions of Sections 4(a), 4(b) and 4(d) of the License.

In addition, if you combine or link compiled forms of this Software with
software that is licensed under the GPLv2 ("Combined Software") and if a
court of competent jurisdiction determines that the patent provision (Section
3), the indemnity provision (Section 9) or other Section of the License
conflicts with the conditions of the GPLv2, you may retroactively and
prospectively choose to deem waived or otherwise exclude such Section(s) of
the License, but only in their entirety and only with respect to the Combined
Software.
</pre></details></div>
<div><details><summary><a href="https://github.com/inspect-js/object-inspect">object-inspect@1.13.2</a> (MIT)</summary><pre>MIT License

Copyright (c) 2013 James Halliday

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/object-refs">object-refs@0.4.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/path-intersection">path-intersection@3.1.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2017 camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/preactjs/preact">preact@10.24.3</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015-present Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/kriskowal/q">q@1.5.1</a> (MIT)</summary><pre>Copyright 2009–2017 Kristopher Michael Kowal. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/qs.git">qs@6.13.0</a> (BSD-3-Clause)</summary><pre>BSD 3-Clause License

Copyright (c) 2014, Nathan LaFreniere and other
[contributors](https://github.com/ljharb/qs/graphs/contributors)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/saxen">saxen@8.1.2</a> (MIT)</summary><pre>The MIT License (MIT)
Copyright (c) 2012 Vopilovskii Konstantin   <flash.vkv@gmail.com>
Copyright (c) 2017-present Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/selection-ranges">selection-ranges@4.0.2</a> (MIT)</summary><pre>Copyright (c) 2017-present Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/nikku/selection-update">selection-update@0.1.2</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015 Nico Rehwaldt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/set-function-length">set-function-length@1.2.2</a> (MIT)</summary><pre>MIT License

Copyright (c) Jordan Harband and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ljharb/side-channel">side-channel@1.0.6</a> (MIT)</summary><pre>MIT License

Copyright (c) 2019 Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/marijnh/style-mod">style-mod@4.1.2</a> (MIT)</summary><pre>Copyright (C) 2018 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/ladjs/superagent">superagent@8.1.2</a> (MIT)</summary><pre>(The MIT License)

Copyright (c) 2014-2016 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre></details></div>
<div><details><summary><a href="https://github.com/focus-trap/tabbable">tabbable@6.2.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2015 David Clark

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/table-js">table-js@9.2.0</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2017-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/bpmn-io/tiny-svg">tiny-svg@2.2.4</a> (MIT)</summary><pre>The MIT License (MIT)

Copyright (c) 2014 Nico Rehwaldt
Copyright (c) 2015-present camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</pre></details></div>
<div><details><summary><a href="https://github.com/marijnh/w3c-keyname">w3c-keyname@2.2.8</a> (MIT)</summary><pre>Copyright (C) 2016 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre></details></div>
</details>
