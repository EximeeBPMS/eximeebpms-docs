---

title: "Camunda Migration"
weight: 30

menu:
  main:
    name: "Camunda Migration"
    identifier: "migration"
    parent: "migration-guide"
    pre: "Guides you through the process of migration from Camunda to EximeeBPMS"

---

This guide helps you migrate Camunda 7.24 to EximeeBPMS 1.4.0.

{{< note title="Warning" class="warning" >}}
Before proceeding with the following instructions, please make sure that your Camunda version has been updated to **7.24.0**. Executing the steps on an older version may result in unexpected system behavior.
{{< /note >}}

{{< note title="EximeeBPMS 1.4.0 is Jakarta-only" class="warning" >}}
EximeeBPMS **1.4.0 publishes only the Jakarta EE artifacts** — the `javax`-based variants that existed up to 1.3.0 are gone. The recipe therefore rewrites the `javax` Camunda coordinates onto the Jakarta EximeeBPMS artifacts: `camunda-engine-rest` becomes `eximeebpms-engine-rest-jakarta`, `camunda-webapp` becomes `eximeebpms-webapp-jakarta`, `camunda-engine-spring` becomes `eximeebpms-engine-spring-6`, `camunda-wildfly26` becomes `eximeebpms-wildfly`, and so on. If your project was already using Camunda's `-jakarta` artifacts, nothing changes for you.

**The recipe does not rewrite your own `javax.*` Jakarta EE imports** (`javax.servlet`, `javax.enterprise`, `javax.persistence`, …), and this is deliberate: the namespace move is a migration of your project in its own right, independent of the switch from Camunda to EximeeBPMS, and running it separately keeps the two changes reviewable apart. If your code uses those packages, run the namespace migration **first**, verify your project still builds on Camunda, and only then apply this recipe.

OpenRewrite publishes Jakarta migration recipes for exactly this in its `rewrite-migrate-java` module; pick the **Jakarta EE 10** one, since that is the level EximeeBPMS 1.4.0 is built against (`jakarta.jakartaee-bom` 10.0.0, `jakarta.servlet-api` 6.1.0, `jakarta.ws.rs-api` 4.0.0). Imports that belong to Java SE rather than Jakarta EE, such as `javax.sql.DataSource`, are not part of that migration and stay as they are.
{{< /note >}}

{{< note title="CMMN cannot be migrated" class="warning" >}}
CMMN is removed in 1.4.0, so the recipe has **no mapping for `camunda-cmmn-model`** — there is no EximeeBPMS artifact to point it at. A project that uses CMMN cannot be migrated by this recipe; see [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}}).
{{< /note >}}


# Migration of a sample project

1. Review the [OpenRewrite documentation](https://docs.openrewrite.org/)
1. Learn how the *rewrite-maven-plugin* works using the **[sample project](https://github.com/EximeeBPMS/eximeebpms-migration)**
	1. Clone the repository 
	```bash
	git clone git@github.com:EximeeBPMS/eximeebpms-migration.git
	```
	
	1. Review the dependencies in the main pom.xml file of the project
	
	```xml
	<properties>
	    <camunda.version>7.24.0</camunda.version>
	</properties>	 
	<!-- ... -->
	<dependencies>
		<dependency>
		    <groupId>org.camunda.bpm</groupId>
		    <artifactId>camunda-engine</artifactId>
		</dependency>
		<dependency>
		    <groupId>org.camunda.bpm</groupId>
		    <artifactId>camunda-engine-spring</artifactId>
		</dependency>
		<!-- ... -->
	</dependencies>
	```
	
	1. Explore the packages used in the sample project:	
	{{< codebox title="CalculateInterestService.java" lang="java" >}}
	package org.example.bpm.getstarted.loanapproval;
 
	import org.camunda.bpm.engine.delegate.DelegateExecution;
	import org.camunda.bpm.engine.delegate.JavaDelegate;
	 
	public class CalculateInterestService implements JavaDelegate {
	    public void execute(DelegateExecution delegate) {
	        System.out.println("Spring Bean invoked");
	    }
	}{{< /codebox >}}
	
	1. Review the migration configuration file:
	{{< codebox title="replace-camunda-with-eximeebpms.yml" lang="yaml" >}}
	
	type: specs.openrewrite.org/v1beta/recipe
	name: org.eximeebpms.ReplaceCamundaWithEximeeBPMS
	displayName: Replace "Camunda" with "EximeeBPMS" in package names and imports
	recipeList:
	 
	  - org.openrewrite.maven.RenamePropertyKey:
	      oldKey: camunda.version
	      newKey: eximeebpms.version
	  - org.openrewrite.maven.ChangePropertyValue:
	      key: eximeebpms.version
	      newValue: 1.4.0
	 
	  - org.openrewrite.maven.RenamePropertyKey:
	      oldKey: version.camunda
	      newKey: version.eximeebpms
	  - org.openrewrite.maven.ChangePropertyValue:
	      key: version.eximeebpms
	      newValue: 1.4.0
	 
	...
	  - org.openrewrite.java.ChangePackage:
	      oldPackageName: "org.camunda"
	      newPackageName: "org.eximeebpms"
	      recursive: true
	  - org.openrewrite.java.ChangeType:
	      oldFullyQualifiedTypeName: "org.camunda"
	      newFullyQualifiedTypeName: "org.eximeebpms"
	      recursive: true{{< /codebox >}}
	      
		This configuration file replaces Camunda-related package names and versions with those used in EximeeBPMS. It is used by the rewrite-maven-plugin.	     

	1. Perform a test migration.
	After becoming familiar with the plugin, its configuration, and the structure of the sample project, you can run the migration script using the following command: 
	```bash
	mvn rewrite:run
	```
	As a result, the dependencies in the pom.xml file and the packages used in the project should be updated, e.g.:

	```xml
	<properties>
    	<eximeebpms.version>1.4.0</eximeebpms.version>
	</properties>         
	 
	<!-- ... --> 
	 
	<dependencies>
	    <dependency>
	        <groupId>org.eximeebpms.bpm</groupId>
	        <artifactId>eximeebpms-engine</artifactId>
	    </dependency>
	    <dependency>
	        <groupId>org.eximeebpms.bpm</groupId>
	        <artifactId>eximeebpms-engine-spring-6</artifactId>
	    </dependency>
	    <!-- ... -->
	</dependencies>
	```Now:{{< codebox title="CalculateInterestService.java" lang="java" >}}
	package org.example.bpm.getstarted.loanapproval;
 
	import org.eximeebpms.bpm.engine.delegate.DelegateExecution;
	import org.eximeebpms.bpm.engine.delegate.JavaDelegate;
	 
	public class CalculateInterestService implements JavaDelegate {
	    public void execute(DelegateExecution delegate) {
	        System.out.println("Spring Bean invoked");
	    }
	}{{< /codebox >}}
	
# Migration of the Target Project

After understanding the migration process from Camunda to EximeeBPMS, you can perform a similar operation on your target project. To do so, you will need to:

 - Locate the main pom.xml file in your project
 - Add the following plugins in the <build> section

```xml 
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.5.1</version>
            </plugin>
            <plugin>
                <groupId>org.openrewrite.maven</groupId>
                <artifactId>rewrite-maven-plugin</artifactId>
                <version>6.44.0</version>
                <configuration>
                    <configLocation>
                        ${maven.multiModuleProjectDirectory}/replace-camunda-with-eximeebpms.yml
                    </configLocation>
                    <activeRecipes>
                        <recipe>org.eximeebpms.ReplaceCamundaWithEximeeBPMS</recipe>
                    </activeRecipes>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```
	
- Download the configuration file **replace-camunda-with-eximeebpms.yml** and place it in the root directory of your project
- Run the migration command:

```bash
mvn rewrite:run
```
- Verify by building the project and running the platform:

```bash
mvn clean install
```
