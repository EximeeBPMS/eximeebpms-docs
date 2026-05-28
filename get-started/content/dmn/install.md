---

title: 'Download and Installation'
weight: 10

menu:
  main:
    name: "Download and Installation"
    parent: "get-started-dmn"
    identifier: "get-started-dmn-install"
    pre: "Install the EximeeBPMS Platform and Camunda Modeler on your machine."

aliases: [/dmn11/install/]
---

First you need to set up your development environment and install the EximeeBPMS Platform and the Camunda Modeler.


# Prerequisites

Make sure you have the following set of tools installed:

* Java JDK 11+,
* Apache Maven (optional, if not installed you can use embedded Maven inside Eclipse.)
* A modern web browser (recent Firefox, Chrome or Microsoft Edge will work fine)
* Eclipse integrated development environment (IDE)


# EximeeBPMS Platform

First, download a distribution of the EximeeBPMS Platform. You can choose from different distributions for various application servers. In this tutorial, we will use the Apache Tomcat based distribution. Download it from [the download page](https://eximeebpms.org/download/).

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory `$EXIMEEBPMS_HOME`.

After you have successfully unpacked your distribution of the EximeeBPMS Platform, execute the script named `start-eximeebpms.bat` (for Windows users), respectively `start-eximeebpms.sh` (for Unix users).

This script will start the application server and open a welcome screen in your web browser. If the page does not open, go to [http://localhost:8080/eximeebpms-welcome/index.html](http://localhost:8080/eximeebpms-welcome/index.html).

{{< note title="Getting Help" class="info" >}}
If you have trouble setting up the Camunda Platform, you can ask for assistance in the [Camunda Users Forum](https://forum.camunda.org/).
{{< /note >}}

# Camunda Modeler

Follow the instructions in the [Camunda Modeler](/manual/latest/installation/camunda-modeler) section.
