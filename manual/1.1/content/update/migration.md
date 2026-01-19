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

This guide helps you migrate Camunda 7.23 to EximeeBPMS 1.0.0.

{{< note title="Warning" class="warning" >}}
Before proceeding with the following instructions, please make sure that your Camunda version has been updated to **7.23.0**. Executing the steps on an older version may result in unexpected system behavior.
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
	    <camunda.version>7.23.0</camunda.version>
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
	      newValue: 1.0.0
	 
	  - org.openrewrite.maven.RenamePropertyKey:
	      oldKey: version.camunda
	      newKey: version.eximeebpms
	  - org.openrewrite.maven.ChangePropertyValue:
	      key: version.eximeebpms
	      newValue: 1.0.0
	 
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
    	<eximeebpms.version>1.0.0</eximeebpms.version>
	</properties>         
	 
	<!-- ... --> 
	 
	<dependencies>
	    <dependency>
	        <groupId>org.eximeebpms.bpm</groupId>
	        <artifactId>eximeebpms-engine</artifactId>
	    </dependency>
	    <dependency>
	        <groupId>org.eximeebpms.bpm</groupId>
	        <artifactId>eximeebpms-engine-spring</artifactId>
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
                <version>3.3.2</version>
            </plugin>
            <plugin>
                <groupId>org.openrewrite.maven</groupId>
                <artifactId>rewrite-maven-plugin</artifactId>
                <version>6.3.2</version>
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
