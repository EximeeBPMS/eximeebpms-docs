---

title: 'JNDI Bindings for EximeeBPMS Services'
weight: 20

menu:
  main:
    identifier: "user-guide-runtime-container-integration-jndi"
    parent: "user-guide-runtime-container-integration"

---

The EximeeBPMS Services (i.e., Process Engine Service and Process Application Service) are provided via JNDI Bindings with the following JNDI names:

* Process Engine Service: `java:global/eximeebpms-bpm-platform/process-engine/ProcessEngineService!org.eximeebpms.bpm.ProcessEngineService`
* Process Application Service: `java:global/eximeebpms-bpm-platform/process-engine/ProcessApplicationService!org.eximeebpms.bpm.ProcessApplicationService`

On JBoss EAP and WildFly, you are able to get any of these EximeeBPMS Services through a JNDI lookup. 
However, on Apache Tomcat you have to do quite a bit more to be able to do a lookup to get one of these EximeeBPMS Services.
