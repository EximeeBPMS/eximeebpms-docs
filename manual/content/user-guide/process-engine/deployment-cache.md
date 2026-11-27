---

title: 'Deployment Cache'
weight: 150

menu:
  main:
    identifier: "user-guide-process-engine-pd-cache"
    parent: "user-guide-process-engine"

---
---

All process definitions are cached (after they have been parsed) to avoid polling the database every time a process definition is needed and because process definition data doesn't change. This reduces the latency of referencing the process definitions and thus improves the performance of the system.

# Customize the maximum Capacity of the Cache

If one has many process definitions, the cache might occupy a large amount of memory and the capacity of the working memory may reach its limits. Therefore, after the maximum capacity is reached the least recently used process definition entry is evicted from the cache to satisfy the capacity condition. However, if one still meets out of memory issues, it can be necessary to lower the maximum capacity of the cache. 

By changing the maximum capacity, the configuration effects all of the following cache components:

 * Process definition
 * Decision definition
 * Decision requirements definition
 * Form definition
 * BPMN and DMN model instances (BPMN can use a separate capacity; see below)
   
In the process engine configuration one can specify the maximum capacity of the cache. The default value is *1000*. When the process engine is created, this property will be set and all resources will be scanned and deployed accordingly. As an example the maximum capacity could be set to *120* as follows:

```xml
<bean id="processEngineConfiguration" class="org.eximeebpms.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....
					
	<property name="cacheCapacity" value="120" />  
</bean>
```

The limit applies to entries in each cache, not a shared memory budget. The memory in bytes depends on the size of each definition/model.

## Separate BPMN model capacity (Unreleased)

Set `bpmnModelInstanceCacheCapacity` before engine construction to limit BPMN model instances independently. Omit it to inherit the configured `cacheCapacity` (default `1000`). An explicit value must be positive; zero or a negative value fails engine startup with `ENGINE-03177`. DMN models and definition caches continue to use `cacheCapacity`.

```xml
<property name="cacheCapacity" value="1000" />
<property name="bpmnModelInstanceCacheCapacity" value="100" />
```

For Run and Spring Boot:

```yaml
eximeebpms:
  bpm:
    generic-properties:
      properties:
        bpmnModelInstanceCacheCapacity: 100
```

The corresponding environment variable is
`EXIMEEBPMS_BPM_GENERICPROPERTIES_PROPERTIES_BPMNMODELINSTANCECACHECAPACITY=100`.
In Java, call `ProcessEngineConfigurationImpl.setBpmnModelInstanceCacheCapacity(Integer)`;
`null` restores inheritance before construction. Restart the engine to apply a changed capacity.
A custom `DeploymentCache` supplied by the application retains its own sizes.

`100` is an example, not a recommended default. A smaller cache may reduce retained model memory but increases resource reads and parsing when callers request evicted models. Size it using the active model working set, latency, model sizes and heap/GC measurements. It does not bound total heap or the memory retained by executable definitions.

## Process-definition descriptions (Unreleased)

Process-definition queries, including key-based REST lookups, read descriptions directly from deployed BPMN XML without populating the BPMN model cache. Each resource is read once per query, also when it declares several processes. Existing description formatting is preserved. Setting `enableFetchProcessDefinitionDescription=false` skips description reads and leaves descriptions absent as before; the default remains `true`.

The engine keeps the extracted description text, not the model, in a small bounded cache, so repeated queries do not read and parse the XML again. Two optional settings limit it. Set them before engine construction:

| Setting | Meaning |
| --- | --- |
| `processDefinitionDescriptionCacheCapacity` | Maximum number of cached descriptions. Unset inherits `cacheCapacity` (default `1000`). `0` disables the cache. |
| `processDefinitionDescriptionCacheMaxCharacters` | Total character budget of the cached descriptions, in UTF-16 code units. Default `1048576` (at most 2 MiB of text, not counting keys and object overhead). `0` disables the cache. |

A negative value of either setting fails engine startup with `ENGINE-03178`. With a disabled cache or evicted entries, the XML is read again on the next query. Run and Spring Boot take the settings as generic properties, for example `eximeebpms.bpm.generic-properties.properties.processDefinitionDescriptionCacheCapacity: 500`, or as environment variables such as `EXIMEEBPMS_BPM_GENERICPROPERTIES_PROPERTIES_PROCESSDEFINITIONDESCRIPTIONCACHEMAXCHARACTERS=262144`. A custom `DeploymentCache` supplied by the application keeps its own sizes, and these settings do not apply to it.

Size the capacity to at least the number of definitions that one query returns, for example an unpaged list of all definitions. The cache evicts the least recently used entry, so a list longer than the capacity gets almost no hits and reads every resource again. A description longer than the character budget is never cached and is read from the XML on each query.

A description is cached only after the transaction of the query commits. A rolled-back transaction, or one that cannot report its commit, still returns descriptions but does not fill the cache. Entries are removed when their definition or deployment is deleted, when a process application is undeployed with its cache entries removed, when the deployment cache is purged and when the engine closes. This invalidation is local to each engine node: deleting a definition on another node leaves this node's entry until normal eviction displaces it, with no effect on query results.

Direct model API access still loads and caches the complete model. Resource bytes may remain in the current command until it finishes, so a large result list can still allocate significant transient memory.


# Provide a custom Cache Implementation

The default implementation of the cache evicts the least recently used entry as soon as the maximum capacity is exceeded. If it is necessary to choose the evicted cache entries by a different criteria, one can provide its own cache implementation.

One can do this by implementing the Cache interface from *org.eximeebpms.commons.utils.cache package*. Let's assume for example that the following class has been implemented:

```java
public class MyCacheImplementation<K, V> implements Cache<K, V> {
	
	// implement interface methods and your own cache logic here
}
```

Next, one need to plug in *MyCacheImplementation* into a custom *CacheFactory*:

```java
public class MyCacheFactory implements CacheFactory {

  @Override
  public <T> Cache<String, T> createCache(int maxNumberOfElementsInCache) {
    return new MyCacheImplementation<String, T>(maxNumberOfElementsInCache);
  }
}
```
    
The factory is used to provide the cache implementation for different cache components such as process definitions and BPMN/DMN models. Once this is done, one can use the process engine configuration where one can specify a set of resources. When the process engine is created, all those resources will be scanned and deployed. In the given example the custom cache factory could now be deployed as follows:

```xml
<bean id="processEngineConfiguration" class="org.eximeebpms.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....

	<property name="cacheFactory">
			<bean class="org.eximeebpms.bpm.engine.test.api.cfg.MyCacheFactory" />
	</property>
</bean>
```




