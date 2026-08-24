---

title: 'Plugins'
weight: 60

menu:
  main:
    identifier: "webapps-welcome-plugins"
    parent: "webapps-welcome"

---

In addition to the [configurable custom links]({{< ref "/webapps/welcome/configuration.md" >}}), plugins can be used to add functionality to the Welcome application. For further details about the concepts behind plugins, please read the [Cockpit plugins section]({{< ref "/webapps/cockpit/extend/plugins.md" >}}). The two plugin points below are frontend only; a Welcome plugin can also register backend resources via the `org.eximeebpms.bpm.welcome.plugin.spi.WelcomePlugin` SPI — see `spring-boot-starter/starter-security`'s `SsoLogoutWelcomePlugin` for a real example that exposes its own JAX-RS resource.


# Plugin point


**Name:** `welcome.dashboard`.

{{< img src="../img/welcome-dashboard-plugin.jpg" title="Plugin Point" >}}

**Name:** `welcome.profile`.

{{< img src="../img/welcome-profile-plugin.jpg" title="Plugin Point" >}}
