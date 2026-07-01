---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

Dependency versions across all EximeeBPMS releases. Highlighted cells indicate a change relative to the previous release.

Use the **OSS Releases** tab for a focused view of Maven Central releases, or switch to **Full Timeline** to include the Enterprise track and see all changes at a glance.

<style>
.tsm-wrap{--tsm-surface:#fff;--tsm-border:#DDE3F0;--tsm-ink1:#0D1526;--tsm-ink2:#334165;--tsm-ink3:#7480A0;--tsm-accent:#2155D4;--tsm-up-bg:#ECF3FF;--tsm-up-b:#3B82F6;--tsm-mj-bg:#FFF8EC;--tsm-mj-b:#D97706;--tsm-bk-bg:#FFF0F4;--tsm-bk-b:#E11D48;--tsm-dr-bg:#FEF2F2;--tsm-dr-b:#DC2626;--tsm-du-bg:#F5F0FF;--tsm-du-b:#7C3AED;font-size:13px;line-height:1.5;margin-top:20px}
.tsm-wrap .tsm-tabs{display:flex;background:var(--tsm-surface);border:1px solid var(--tsm-border);border-radius:8px;overflow:hidden;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.tsm-wrap .tsm-tb{flex:1;padding:10px 18px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:500;color:var(--tsm-ink3);border-right:1px solid var(--tsm-border);transition:background .15s,color .15s;text-align:left}
.tsm-wrap .tsm-tb:last-child{border-right:none}
.tsm-wrap .tsm-tb:hover:not(.tsm-on){background:#F3F5FB;color:var(--tsm-ink2)}
.tsm-wrap .tsm-tb.tsm-on{background:var(--tsm-accent);color:#fff}
.tsm-wrap .tsm-tb .tsm-tb-sub{font-size:11px;opacity:.7;display:block;margin-top:2px}
.tsm-wrap .tsm-panel{display:none}.tsm-wrap .tsm-panel.tsm-on{display:block}
.tsm-wrap .tsm-tbl-wrap{background:var(--tsm-surface);border-radius:8px;border:1px solid var(--tsm-border);overflow:hidden;overflow-x:auto;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.tsm-wrap table{width:100%;border-collapse:collapse;font-size:13px;min-width:620px;font-variant-numeric:tabular-nums}
.tsm-wrap thead tr{background:#18253D}
.tsm-wrap thead th{padding:11px 14px;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7A95B8;white-space:nowrap;border-right:1px solid rgba(255,255,255,.05);text-align:left}
.tsm-wrap thead th:last-child{border-right:none}
.tsm-wrap thead th.tsm-ver{text-align:center}
.tsm-wrap thead th .tsm-vbadge{display:inline-block;background:rgba(33,85,212,.5);color:#93B4FF;font-size:9px;padding:1px 5px;border-radius:3px;margin-left:6px;vertical-align:middle}
.tsm-wrap .tsm-c0{width:108px}.tsm-wrap .tsm-c1{width:215px}.tsm-wrap .tsm-cv{min-width:145px}
.tsm-wrap tbody tr:not(.tsm-gr) td{padding:8px 14px;border-bottom:1px solid var(--tsm-border);border-right:1px solid var(--tsm-border);vertical-align:top}
.tsm-wrap tbody tr:not(.tsm-gr) td:last-child{border-right:none}
.tsm-wrap tbody tr:not(.tsm-gr):last-child td{border-bottom:none}
.tsm-wrap tbody tr:not(.tsm-gr) td.tsm-ver{text-align:center}
.tsm-wrap tbody tr:not(.tsm-gr):hover td{background:rgba(33,85,212,.025)!important}
.tsm-wrap .tsm-gr td{padding:6px 14px;background:#EBF0FA;color:#3D4E72;font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;border-bottom:1px solid #D2DDEF}
.tsm-wrap td.tsm-lbl{font-size:10.5px;color:var(--tsm-ink3);text-transform:uppercase;letter-spacing:.07em;font-weight:600}
.tsm-wrap td.tsm-comp{font-weight:500;color:var(--tsm-ink1)}
.tsm-wrap td.tsm-comp .tsm-sub{display:block;font-size:11px;font-weight:400;color:var(--tsm-ink3);margin-top:1px}
.tsm-wrap td.tsm-up{background:var(--tsm-up-bg);box-shadow:inset 4px 0 0 var(--tsm-up-b)}
.tsm-wrap td.tsm-mj{background:var(--tsm-mj-bg);box-shadow:inset 4px 0 0 var(--tsm-mj-b)}
.tsm-wrap td.tsm-bk{background:var(--tsm-bk-bg);box-shadow:inset 4px 0 0 var(--tsm-bk-b)}
.tsm-wrap td.tsm-dr{background:var(--tsm-dr-bg);box-shadow:inset 4px 0 0 var(--tsm-dr-b);color:#991B1B}
.tsm-wrap td.tsm-du{background:var(--tsm-du-bg);box-shadow:inset 4px 0 0 var(--tsm-du-b);text-align:left!important}
.tsm-wrap .tsm-ns{display:inline-block;font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px}
.tsm-wrap .tsm-ns-j{background:#F0EAFF;color:#6D28D9}
.tsm-wrap .tsm-ns-k{background:#E0F2FE;color:#0369A1}
.tsm-wrap .tsm-chip{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 5px;border-radius:3px;vertical-align:middle;margin-left:4px;white-space:nowrap}
.tsm-wrap .tsm-chi-mj{background:#FEF3C7;color:#92400E}
.tsm-wrap .tsm-chi-bk{background:#FFE4E6;color:#9F1239}
.tsm-wrap .tsm-chi-dr{background:#FEE2E2;color:#991B1B}
.tsm-wrap .tsm-chi-up{background:#DBEAFE;color:#1E40AF}
.tsm-wrap .tsm-vl{display:block;line-height:1.35}
.tsm-wrap .tsm-vls{display:block;font-size:11px;color:var(--tsm-ink3);margin-top:2px}
.tsm-wrap .tsm-vls.tsm-st{text-decoration:line-through;color:#FCA5A5}
.tsm-wrap .tsm-legend{margin-top:16px;background:var(--tsm-surface);border:1px solid var(--tsm-border);border-radius:8px;padding:14px 20px;display:flex;flex-wrap:wrap;gap:8px 24px;font-size:12px;color:var(--tsm-ink2)}
.tsm-wrap .tsm-lg-item{display:flex;align-items:center;gap:8px}
.tsm-wrap .tsm-lg-sw{width:14px;height:14px;border-radius:3px;flex-shrink:0;border:1px solid rgba(0,0,0,.08)}
.tsm-wrap .tsm-tbl-wrap,.tsm-wrap .tsm-top-scroll{scrollbar-width:thin;scrollbar-color:#93AACF #EBF0FA}
.tsm-wrap .tsm-tbl-wrap::-webkit-scrollbar,.tsm-wrap .tsm-top-scroll::-webkit-scrollbar{height:5px}
.tsm-wrap .tsm-tbl-wrap::-webkit-scrollbar-track{background:#EBF0FA;border-radius:0 0 6px 6px}
.tsm-wrap .tsm-top-scroll::-webkit-scrollbar-track{background:#EBF0FA;border-radius:6px 6px 0 0}
.tsm-wrap .tsm-tbl-wrap::-webkit-scrollbar-thumb,.tsm-wrap .tsm-top-scroll::-webkit-scrollbar-thumb{background:#93AACF;border-radius:10px}
.tsm-wrap .tsm-tbl-wrap::-webkit-scrollbar-thumb:hover,.tsm-wrap .tsm-top-scroll::-webkit-scrollbar-thumb:hover{background:#2155D4}
.tsm-wrap .tsm-top-scroll{overflow-x:auto;overflow-y:hidden;height:6px;border-radius:6px 6px 0 0;border:1px solid var(--tsm-border);border-bottom:none}
.tsm-wrap .tsm-top-scroll-inner{height:1px}
</style>

<div class="tsm-wrap">

<div class="tsm-tabs">
  <button class="tsm-tb tsm-on" data-tsm="oss">
    OSS Releases
    <span class="tsm-tb-sub">v1.0.0 → v1.2.0 · Maven Central</span>
  </button>
  <button class="tsm-tb" data-tsm="ent">
    Full Timeline
    <span class="tsm-tb-sub">v1.0.0 → Enterprise (current)</span>
  </button>
</div>

<!-- OSS panel -->
<div class="tsm-panel tsm-on" id="tsm-p-oss">
<div class="tsm-tbl-wrap">
<table>
<thead><tr>
  <th class="tsm-c0">Category</th>
  <th class="tsm-c1">Component / Dependency</th>
  <th class="tsm-cv tsm-ver">v1.0.0</th>
  <th class="tsm-cv tsm-ver">v1.1.0</th>
  <th class="tsm-cv tsm-ver">v1.2.0</th>
</tr></thead>
<tbody>
<tr class="tsm-gr"><td colspan="5">Platform Requirements</td></tr>
<tr><td class="tsm-lbl">Platform</td><td class="tsm-comp">Java (build &amp; runtime)</td><td class="tsm-ver">17</td><td class="tsm-ver">17</td><td class="tsm-ver">17</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Jakarta EE Spec</td><td class="tsm-ver">10.0.0</td><td class="tsm-ver">10.0.0</td><td class="tsm-ver">10.0.0</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Jakarta Servlet API</td><td class="tsm-ver">6.x</td><td class="tsm-ver">6.x</td><td class="tsm-ver tsm-up">6.1.0</td></tr>
<tr>
  <td class="tsm-lbl"></td>
  <td class="tsm-comp">Namespace<span class="tsm-sub">javax / jakarta support</span></td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td></tr>
<tr class="tsm-gr"><td colspan="5">Application Servers</td></tr>
<tr><td class="tsm-lbl">App Server</td><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">Jakarta · 10.x</span></td><td class="tsm-ver">10.1.36</td><td class="tsm-ver tsm-up">10.1.43</td><td class="tsm-ver tsm-up">10.1.50</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">javax legacy · 9.x</span></td><td class="tsm-ver">9.0.100</td><td class="tsm-ver tsm-up">9.0.107</td><td class="tsm-ver tsm-up">9.0.113</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">WildFly</td><td class="tsm-ver">35.0.0.Final</td><td class="tsm-ver tsm-mj">37.0.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver">37.0.0.Final</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">WildFly legacy<span class="tsm-sub">26.x</span></td><td class="tsm-ver">26.0.1.Final</td><td class="tsm-ver">26.0.1.Final</td><td class="tsm-ver">26.0.1.Final</td></tr>
<tr class="tsm-gr"><td colspan="5">Application Frameworks</td></tr>
<tr>
  <td class="tsm-lbl">Framework</td>
  <td class="tsm-comp">Spring Framework</td>
  <td class="tsm-du"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.4 <small>(jakarta)</small></span></td>
  <td class="tsm-du"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.10 <small>(jakarta)</small></span></td>
  <td class="tsm-mj tsm-ver">7.0.5 <span class="tsm-chip tsm-chi-mj">Major</span><span class="tsm-vls">jakarta-only; Spring 5 removed</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Spring Boot</td><td class="tsm-ver">3.4.4</td><td class="tsm-ver tsm-up">3.5.5</td><td class="tsm-mj tsm-ver">4.0.3 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Quarkus</td><td class="tsm-ver">3.20.0</td><td class="tsm-ver tsm-up">3.27.0</td><td class="tsm-ver tsm-up">3.28.4</td></tr>
<tr class="tsm-gr"><td colspan="5">Persistence Layer</td></tr>
<tr><td class="tsm-lbl">Persistence</td><td class="tsm-comp">Hibernate ORM</td><td class="tsm-ver">5.6.5.Final</td><td class="tsm-ver">5.6.5.Final</td><td class="tsm-mj tsm-ver">7.2.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">MyBatis</td><td class="tsm-ver">3.5.15</td><td class="tsm-ver tsm-up">3.5.19</td><td class="tsm-ver">3.5.19</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Liquibase</td><td class="tsm-ver">4.8.0</td><td class="tsm-ver">4.8.0</td><td class="tsm-mj tsm-ver">5.0.1 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr class="tsm-gr"><td colspan="5">Data Processing &amp; Scripting</td></tr>
<tr><td class="tsm-lbl">Data</td><td class="tsm-comp">Jackson Databind</td><td class="tsm-ver">2.15.2</td><td class="tsm-ver">2.15.2</td><td class="tsm-ver">2.15.2</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">FEEL-Scala<span class="tsm-sub">DMN Engine</span></td><td class="tsm-ver">1.19.1</td><td class="tsm-ver tsm-up">1.19.3</td><td class="tsm-ver">1.19.3</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Groovy</td><td class="tsm-ver">4.0.22</td><td class="tsm-ver">4.0.22</td><td class="tsm-ver">4.0.22</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">FreeMarker</td><td class="tsm-ver">2.3.31</td><td class="tsm-ver">2.3.31</td><td class="tsm-ver">2.3.31</td></tr>
<tr class="tsm-gr"><td colspan="5">Supported Databases — JDBC Drivers</td></tr>
<tr><td class="tsm-lbl">Database</td><td class="tsm-comp">H2 (embedded / testing)</td><td class="tsm-ver">2.3.232</td><td class="tsm-ver">2.3.232</td><td class="tsm-ver">2.3.232</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">PostgreSQL JDBC driver</td><td class="tsm-ver">42.5.5</td><td class="tsm-ver">42.5.5</td><td class="tsm-ver">42.5.5</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">MySQL Connector/J</td><td class="tsm-ver">8.3.0</td><td class="tsm-ver">8.3.0</td><td class="tsm-ver">8.3.0</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Oracle JDBC</td><td class="tsm-ver">23.5.0</td><td class="tsm-ver">23.5.0</td><td class="tsm-ver">23.5.0</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">SQL Server JDBC</td><td class="tsm-ver">8.4.1 (jre8)</td><td class="tsm-ver">8.4.1 (jre8)</td><td class="tsm-ver">8.4.1 (jre8)</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">IBM DB2 JDBC</td><td class="tsm-ver">11.5.0.0</td><td class="tsm-ver">11.5.0.0</td><td class="tsm-ver">11.5.0.0</td></tr>
<tr class="tsm-gr"><td colspan="5">Build &amp; Frontend Tools</td></tr>
<tr><td class="tsm-lbl">Build</td><td class="tsm-comp">Apache Maven (wrapper)</td><td class="tsm-ver">3.8.8</td><td class="tsm-ver">3.8.8</td><td class="tsm-ver">3.8.8</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Node.js<span class="tsm-sub">Cockpit / Tasklist / Admin UI</span></td><td class="tsm-ver">20.14.0 LTS</td><td class="tsm-ver">20.14.0 LTS</td><td class="tsm-ver">20.14.0 LTS</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">npm</td><td class="tsm-ver">10.7.0</td><td class="tsm-ver">10.7.0</td><td class="tsm-ver">10.7.0</td></tr>
</tbody>
</table>
</div>
</div>

<!-- Enterprise / Full Timeline panel -->
<div class="tsm-panel" id="tsm-p-ent">
<div class="tsm-tbl-wrap">
<table>
<thead><tr>
  <th class="tsm-c0">Category</th>
  <th class="tsm-c1">Component / Dependency</th>
  <th class="tsm-cv tsm-ver">v1.0.0</th>
  <th class="tsm-cv tsm-ver">v1.1.0</th>
  <th class="tsm-cv tsm-ver">v1.2.0</th>
  <th class="tsm-cv tsm-ver">Enterprise <span class="tsm-vbadge">current</span></th>
</tr></thead>
<tbody>
<tr class="tsm-gr"><td colspan="6">Platform Requirements</td></tr>
<tr><td class="tsm-lbl">Platform</td><td class="tsm-comp">Java (build &amp; runtime)</td><td class="tsm-ver">17</td><td class="tsm-ver">17</td><td class="tsm-ver">17</td><td class="tsm-mj tsm-ver">21 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Jakarta EE Spec</td><td class="tsm-ver">10.0.0</td><td class="tsm-ver">10.0.0</td><td class="tsm-ver">10.0.0</td><td class="tsm-ver">10.0.0</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Jakarta Servlet API</td><td class="tsm-ver">6.x</td><td class="tsm-ver">6.x</td><td class="tsm-ver tsm-up">6.1.0</td><td class="tsm-ver">6.1.0</td></tr>
<tr>
  <td class="tsm-lbl"></td>
  <td class="tsm-comp">Namespace</td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-bk tsm-ver"><span class="tsm-ns tsm-ns-k">jakarta only</span></td></tr>
<tr class="tsm-gr"><td colspan="6">Application Servers</td></tr>
<tr><td class="tsm-lbl">App Server</td><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">Jakarta · 10.x</span></td><td class="tsm-ver">10.1.36</td><td class="tsm-ver tsm-up">10.1.43</td><td class="tsm-ver tsm-up">10.1.50</td><td class="tsm-ver tsm-up">10.1.56</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">javax legacy · 9.x</span></td><td class="tsm-ver">9.0.100</td><td class="tsm-ver tsm-up">9.0.107</td><td class="tsm-ver tsm-up">9.0.113</td><td class="tsm-dr tsm-ver"><span class="tsm-chip tsm-chi-dr">Dropped</span><span class="tsm-vls tsm-st">was 9.0.113</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">WildFly</td><td class="tsm-ver">35.0.0.Final</td><td class="tsm-ver tsm-mj">37.0.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver">37.0.0.Final</td><td class="tsm-mj tsm-ver">40.0.1.Final <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">WildFly legacy<span class="tsm-sub">26.x</span></td><td class="tsm-ver">26.0.1.Final</td><td class="tsm-ver">26.0.1.Final</td><td class="tsm-ver">26.0.1.Final</td><td class="tsm-dr tsm-ver"><span class="tsm-chip tsm-chi-dr">Dropped</span><span class="tsm-vls tsm-st">was 26.0.1.Final</span></td></tr>
<tr class="tsm-gr"><td colspan="6">Application Frameworks</td></tr>
<tr>
  <td class="tsm-lbl">Framework</td>
  <td class="tsm-comp">Spring Framework</td>
  <td class="tsm-du"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.4 <small>(jakarta)</small></span></td>
  <td class="tsm-du"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.10 <small>(jakarta)</small></span></td>
  <td class="tsm-mj tsm-ver">7.0.5 <span class="tsm-chip tsm-chi-mj">Major</span><span class="tsm-vls">jakarta-only; Spring 5 removed</span></td>
  <td class="tsm-ver tsm-up">7.0.8</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Spring Boot</td><td class="tsm-ver">3.4.4</td><td class="tsm-ver tsm-up">3.5.5</td><td class="tsm-mj tsm-ver">4.0.3 <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver tsm-up">4.1.0</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Quarkus</td><td class="tsm-ver">3.20.0</td><td class="tsm-ver tsm-up">3.27.0</td><td class="tsm-ver tsm-up">3.28.4</td><td class="tsm-ver tsm-up">3.36.1</td></tr>
<tr class="tsm-gr"><td colspan="6">Persistence Layer</td></tr>
<tr><td class="tsm-lbl">Persistence</td><td class="tsm-comp">Hibernate ORM</td><td class="tsm-ver">5.6.5.Final</td><td class="tsm-ver">5.6.5.Final</td><td class="tsm-mj tsm-ver">7.2.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver">7.2.0.Final</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">MyBatis</td><td class="tsm-ver">3.5.15</td><td class="tsm-ver tsm-up">3.5.19</td><td class="tsm-ver">3.5.19</td><td class="tsm-ver">3.5.19</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Liquibase</td><td class="tsm-ver">4.8.0</td><td class="tsm-ver">4.8.0</td><td class="tsm-mj tsm-ver">5.0.1 <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver tsm-up">5.0.3</td></tr>
<tr class="tsm-gr"><td colspan="6">Data Processing &amp; Scripting</td></tr>
<tr><td class="tsm-lbl">Data</td><td class="tsm-comp">Jackson Databind</td><td class="tsm-ver">2.15.2</td><td class="tsm-ver">2.15.2</td><td class="tsm-ver">2.15.2</td><td class="tsm-up tsm-ver">2.21.4 <span class="tsm-chip tsm-chi-up">Upgrade</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">FEEL-Scala<span class="tsm-sub">DMN Engine</span></td><td class="tsm-ver">1.19.1</td><td class="tsm-ver tsm-up">1.19.3</td><td class="tsm-ver">1.19.3</td><td class="tsm-ver">1.19.3</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Groovy</td><td class="tsm-ver">4.0.22</td><td class="tsm-ver">4.0.22</td><td class="tsm-ver">4.0.22</td><td class="tsm-mj tsm-ver">5.0.6 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">FreeMarker</td><td class="tsm-ver">2.3.31</td><td class="tsm-ver">2.3.31</td><td class="tsm-ver">2.3.31</td><td class="tsm-ver">2.3.31</td></tr>
<tr class="tsm-gr"><td colspan="6">Supported Databases — JDBC Drivers</td></tr>
<tr><td class="tsm-lbl">Database</td><td class="tsm-comp">H2 (embedded / testing)</td><td class="tsm-ver">2.3.232</td><td class="tsm-ver">2.3.232</td><td class="tsm-ver">2.3.232</td><td class="tsm-ver tsm-up">2.4.240</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">PostgreSQL JDBC driver</td><td class="tsm-ver">42.5.5</td><td class="tsm-ver">42.5.5</td><td class="tsm-ver">42.5.5</td><td class="tsm-ver tsm-up">42.7.11</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">MySQL Connector/J</td><td class="tsm-ver">8.3.0</td><td class="tsm-ver">8.3.0</td><td class="tsm-ver">8.3.0</td><td class="tsm-mj tsm-ver">9.7.0 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Oracle JDBC</td><td class="tsm-ver">23.5.0</td><td class="tsm-ver">23.5.0</td><td class="tsm-ver">23.5.0</td><td class="tsm-ver tsm-up">23.26.2</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">SQL Server JDBC</td><td class="tsm-ver">8.4.1 (jre8)</td><td class="tsm-ver">8.4.1 (jre8)</td><td class="tsm-ver">8.4.1 (jre8)</td><td class="tsm-mj tsm-ver">13.4.0 (jre11) <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">IBM DB2 JDBC</td><td class="tsm-ver">11.5.0.0</td><td class="tsm-ver">11.5.0.0</td><td class="tsm-ver">11.5.0.0</td><td class="tsm-ver tsm-up">11.5.9.0</td></tr>
<tr class="tsm-gr"><td colspan="6">Build &amp; Frontend Tools</td></tr>
<tr><td class="tsm-lbl">Build</td><td class="tsm-comp">Apache Maven (wrapper)</td><td class="tsm-ver">3.8.8</td><td class="tsm-ver">3.8.8</td><td class="tsm-ver">3.8.8</td><td class="tsm-ver">3.8.8</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">Node.js<span class="tsm-sub">Cockpit / Tasklist / Admin UI</span></td><td class="tsm-ver">20.14.0 LTS</td><td class="tsm-ver">20.14.0 LTS</td><td class="tsm-ver">20.14.0 LTS</td><td class="tsm-ver">20.14.0 LTS</td></tr>
<tr><td class="tsm-lbl"></td><td class="tsm-comp">npm</td><td class="tsm-ver">10.7.0</td><td class="tsm-ver">10.7.0</td><td class="tsm-ver">10.7.0</td><td class="tsm-ver">10.7.0</td></tr>
</tbody>
</table>
</div>
</div>

<div class="tsm-legend">
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:#fff;"></div>No change</div>
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:var(--tsm-up-bg);box-shadow:inset 4px 0 0 var(--tsm-up-b);"></div>Patch / minor update</div>
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:var(--tsm-mj-bg);box-shadow:inset 4px 0 0 var(--tsm-mj-b);"></div>Major version upgrade</div>
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:var(--tsm-bk-bg);box-shadow:inset 4px 0 0 var(--tsm-bk-b);"></div>Breaking change</div>
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:var(--tsm-dr-bg);box-shadow:inset 4px 0 0 var(--tsm-dr-b);"></div>Dropped / removed</div>
  <div class="tsm-lg-item"><div class="tsm-lg-sw" style="background:var(--tsm-du-bg);box-shadow:inset 4px 0 0 var(--tsm-du-b);"></div>Dual namespace (javax + jakarta)</div>
</div>

</div>

<script>
(function(){
  var wrap = document.currentScript.previousElementSibling;
  while(wrap && !wrap.classList.contains('tsm-wrap')) wrap = wrap.previousElementSibling;
  if(!wrap) return;
  wrap.querySelectorAll('.tsm-tb').forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = btn.getAttribute('data-tsm');
      wrap.querySelectorAll('.tsm-tb').forEach(function(b){ b.classList.remove('tsm-on'); });
      wrap.querySelectorAll('.tsm-panel').forEach(function(p){ p.classList.remove('tsm-on'); });
      btn.classList.add('tsm-on');
      wrap.querySelector('#tsm-p-' + t).classList.add('tsm-on');
    });
  });
})();
</script>

<script>
(function(){
  document.querySelectorAll('.tsm-wrap .tsm-tbl-wrap').forEach(function(wrap){
    var top=document.createElement('div');
    top.className='tsm-top-scroll';
    var inner=document.createElement('div');
    inner.className='tsm-top-scroll-inner';
    top.appendChild(inner);
    wrap.parentNode.insertBefore(top,wrap);
    function syncW(){ inner.style.width=wrap.scrollWidth+'px'; }
    syncW();
    var lock=false;
    top.addEventListener('scroll',function(){ if(lock)return; lock=true; wrap.scrollLeft=top.scrollLeft; lock=false; });
    wrap.addEventListener('scroll',function(){ if(lock)return; lock=true; top.scrollLeft=wrap.scrollLeft; lock=false; });
    if(window.ResizeObserver) new ResizeObserver(syncW).observe(wrap);
  });
})();
</script>
