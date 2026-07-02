---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

Dependency versions across all EximeeBPMS releases. Highlighted cells indicate a change relative to the previous release.

By default the table shows the two most recent OSS releases plus the current Enterprise release. Use the **Show older versions** selector above the table to bring earlier releases back into view.

<style>
.tsm-wrap{--tsm-surface:#fff;--tsm-border:#DDE3F0;--tsm-ink1:#0D1526;--tsm-ink2:#334165;--tsm-ink3:#7480A0;--tsm-accent:#2155D4;--tsm-up-bg:#ECF3FF;--tsm-up-b:#3B82F6;--tsm-mj-bg:#FFF8EC;--tsm-mj-b:#D97706;--tsm-bk-bg:#FFF0F4;--tsm-bk-b:#E11D48;--tsm-dr-bg:#FEF2F2;--tsm-dr-b:#DC2626;--tsm-du-bg:#F5F0FF;--tsm-du-b:#7C3AED;font-size:13px;line-height:1.5;margin-top:20px}
.tsm-wrap .tsm-toolbar{display:flex;justify-content:flex-end;margin-bottom:10px}
.tsm-wrap .tsm-colsel{position:relative}
.tsm-wrap .tsm-colsel-btn{display:flex;align-items:center;gap:8px;background:var(--tsm-surface);border:1px solid var(--tsm-border);border-radius:8px;padding:8px 14px;font-size:12.5px;font-weight:600;color:var(--tsm-ink2);cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.tsm-wrap .tsm-colsel-btn:hover{background:#F3F5FB}
.tsm-wrap .tsm-colsel-btn .tsm-colsel-caret{font-size:10px;color:var(--tsm-ink3);transition:transform .15s}
.tsm-wrap .tsm-colsel.tsm-open .tsm-colsel-btn .tsm-colsel-caret{transform:rotate(180deg)}
.tsm-wrap .tsm-colsel-count{display:inline-block;background:rgba(33,85,212,.1);color:var(--tsm-accent);font-size:10.5px;font-weight:700;padding:1px 7px;border-radius:10px}
.tsm-wrap .tsm-colsel-menu{display:none;position:absolute;right:0;top:calc(100% + 6px);z-index:5;background:var(--tsm-surface);border:1px solid var(--tsm-border);border-radius:8px;box-shadow:0 6px 20px rgba(13,21,38,.12);padding:8px;min-width:190px}
.tsm-wrap .tsm-colsel.tsm-open .tsm-colsel-menu{display:block}
.tsm-wrap .tsm-colsel-hint{font-size:10.5px;color:var(--tsm-ink3);padding:4px 8px 8px;border-bottom:1px solid var(--tsm-border);margin-bottom:4px}
.tsm-wrap .tsm-colsel-item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:13px;color:var(--tsm-ink1)}
.tsm-wrap .tsm-colsel-item:hover{background:#F3F5FB}
.tsm-wrap .tsm-colsel-item input{cursor:pointer}
.tsm-wrap .tsm-tbl-wrap{background:var(--tsm-surface);border-radius:8px;border:1px solid var(--tsm-border);overflow:hidden;overflow-x:auto;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.tsm-wrap table{width:100%;border-collapse:collapse;font-size:13px;min-width:480px;font-variant-numeric:tabular-nums}
.tsm-wrap thead tr{background:#18253D}
.tsm-wrap thead th{padding:11px 14px;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7A95B8;white-space:nowrap;border-right:1px solid rgba(255,255,255,.05);text-align:left}
.tsm-wrap thead th:last-child{border-right:none}
.tsm-wrap thead th.tsm-ver{text-align:center}
.tsm-wrap thead th .tsm-vbadge{display:inline-block;background:rgba(33,85,212,.5);color:#93B4FF;font-size:9px;padding:1px 5px;border-radius:3px;margin-left:6px;vertical-align:middle}
.tsm-wrap .tsm-c1{width:260px}.tsm-wrap .tsm-cv{min-width:145px}
.tsm-wrap tbody tr:not(.tsm-gr) td{padding:8px 14px;border-bottom:1px solid var(--tsm-border);border-right:1px solid var(--tsm-border);vertical-align:top}
.tsm-wrap tbody tr:not(.tsm-gr) td:last-child{border-right:none}
.tsm-wrap tbody tr:not(.tsm-gr):last-child td{border-bottom:none}
.tsm-wrap tbody tr:not(.tsm-gr) td.tsm-ver{text-align:center}
.tsm-wrap tbody tr:not(.tsm-gr):hover td{background:rgba(33,85,212,.025)!important}
.tsm-wrap .tsm-gr td{padding:6px 14px;background:#EBF0FA;color:#3D4E72;font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;border-bottom:1px solid #D2DDEF}
.tsm-wrap td.tsm-comp{font-weight:500;color:var(--tsm-ink1)}
.tsm-wrap td.tsm-comp .tsm-sub{display:block;font-size:11px;font-weight:400;color:var(--tsm-ink3);margin-top:1px}
.tsm-wrap td.tsm-up{background:var(--tsm-up-bg);box-shadow:inset 4px 0 0 var(--tsm-up-b)}
.tsm-wrap td.tsm-mj{background:var(--tsm-mj-bg);box-shadow:inset 4px 0 0 var(--tsm-mj-b)}
.tsm-wrap td.tsm-bk{background:var(--tsm-bk-bg);box-shadow:inset 4px 0 0 var(--tsm-bk-b)}
.tsm-wrap td.tsm-dr{background:var(--tsm-dr-bg);box-shadow:inset 4px 0 0 var(--tsm-dr-b);color:#991B1B}
.tsm-wrap td.tsm-du{background:var(--tsm-du-bg);box-shadow:inset 4px 0 0 var(--tsm-du-b);text-align:center}
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
.tsm-wrap .tsm-col-hidden{display:none}
</style>

<div class="tsm-wrap">

<div class="tsm-toolbar">
  <div class="tsm-colsel">
    <button class="tsm-colsel-btn" type="button" data-tsm-colsel-btn>
      <span>Show older versions</span>
      <span class="tsm-colsel-count" data-tsm-hidden-count>1 hidden</span>
      <span class="tsm-colsel-caret">▾</span>
    </button>
    <div class="tsm-colsel-menu">
      <div class="tsm-colsel-hint">Add earlier OSS releases to the table</div>
      <label class="tsm-colsel-item"><input type="checkbox" data-tsm-toggle="v1.0.0"> v1.0.0</label>
    </div>
  </div>
</div>

<div class="tsm-tbl-wrap">
<table>
<thead><tr>
  <th class="tsm-c1">Component / Dependency</th>
  <th class="tsm-cv tsm-ver tsm-col-hidden" data-v="v1.0.0">v1.0.0</th>
  <th class="tsm-cv tsm-ver" data-v="v1.1.0">v1.1.0</th>
  <th class="tsm-cv tsm-ver" data-v="v1.2.0">v1.2.0</th>
  <th class="tsm-cv tsm-ver" data-v="ent">Enterprise <span class="tsm-vbadge">current</span></th>
</tr></thead>
<tbody>
<tr class="tsm-gr"><td colspan="5">Platform Requirements</td></tr>
<tr><td class="tsm-comp">Java (build &amp; runtime)</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">17</td><td class="tsm-ver" data-v="v1.1.0">17</td><td class="tsm-ver" data-v="v1.2.0">17</td><td class="tsm-mj tsm-ver" data-v="ent">21 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-comp">Jakarta EE Spec</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">10.0.0</td><td class="tsm-ver" data-v="v1.1.0">10.0.0</td><td class="tsm-ver" data-v="v1.2.0">10.0.0</td><td class="tsm-ver" data-v="ent">10.0.0</td></tr>
<tr><td class="tsm-comp">Jakarta Servlet API</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">6.x</td><td class="tsm-ver" data-v="v1.1.0">6.x</td><td class="tsm-ver tsm-up" data-v="v1.2.0">6.1.0</td><td class="tsm-ver" data-v="ent">6.1.0</td></tr>
<tr><td class="tsm-comp">Namespace<span class="tsm-sub">javax / jakarta support</span></td>
  <td class="tsm-du tsm-ver tsm-col-hidden" data-v="v1.0.0"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver" data-v="v1.1.0"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-du tsm-ver" data-v="v1.2.0"><span class="tsm-ns tsm-ns-j">javax</span> <span class="tsm-ns tsm-ns-k">jakarta</span></td>
  <td class="tsm-bk tsm-ver" data-v="ent"><span class="tsm-ns tsm-ns-k">jakarta only</span></td></tr>
<tr class="tsm-gr"><td colspan="5">Application Servers</td></tr>
<tr><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">Jakarta · 10.x</span></td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">10.1.36</td><td class="tsm-ver tsm-up" data-v="v1.1.0">10.1.43</td><td class="tsm-ver tsm-up" data-v="v1.2.0">10.1.50</td><td class="tsm-ver tsm-up" data-v="ent">10.1.56</td></tr>
<tr><td class="tsm-comp">Apache Tomcat<span class="tsm-sub">javax legacy · 9.x</span></td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">9.0.100</td><td class="tsm-ver tsm-up" data-v="v1.1.0">9.0.107</td><td class="tsm-ver tsm-up" data-v="v1.2.0">9.0.113</td><td class="tsm-dr tsm-ver" data-v="ent"><span class="tsm-chip tsm-chi-dr">Dropped</span><span class="tsm-vls tsm-st">was 9.0.113</span></td></tr>
<tr><td class="tsm-comp">WildFly</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">35.0.0.Final</td><td class="tsm-ver tsm-mj" data-v="v1.1.0">37.0.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver" data-v="v1.2.0">37.0.0.Final</td><td class="tsm-mj tsm-ver" data-v="ent">40.0.1.Final <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-comp">WildFly legacy<span class="tsm-sub">26.x</span></td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">26.0.1.Final</td><td class="tsm-ver" data-v="v1.1.0">26.0.1.Final</td><td class="tsm-ver" data-v="v1.2.0">26.0.1.Final</td><td class="tsm-dr tsm-ver" data-v="ent"><span class="tsm-chip tsm-chi-dr">Dropped</span><span class="tsm-vls tsm-st">was 26.0.1.Final</span></td></tr>
<tr class="tsm-gr"><td colspan="5">Application Frameworks</td></tr>
<tr><td class="tsm-comp">Spring Framework</td>
  <td class="tsm-du tsm-ver tsm-col-hidden" data-v="v1.0.0"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.4 <small>(jakarta)</small></span></td>
  <td class="tsm-du tsm-ver" data-v="v1.1.0"><span class="tsm-vl">5.3.39 <small>(javax)</small></span><span class="tsm-vl">6.2.10 <small>(jakarta)</small></span></td>
  <td class="tsm-mj tsm-ver" data-v="v1.2.0">7.0.5 <span class="tsm-chip tsm-chi-mj">Major</span><span class="tsm-vls">jakarta-only; Spring 5 removed</span></td>
  <td class="tsm-ver tsm-up" data-v="ent">7.0.8</td></tr>
<tr><td class="tsm-comp">Spring Boot</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">3.4.4</td><td class="tsm-ver tsm-up" data-v="v1.1.0">3.5.5</td><td class="tsm-mj tsm-ver" data-v="v1.2.0">4.0.3 <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver tsm-up" data-v="ent">4.1.0</td></tr>
<tr><td class="tsm-comp">Quarkus</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">3.20.0</td><td class="tsm-ver tsm-up" data-v="v1.1.0">3.27.0</td><td class="tsm-ver tsm-up" data-v="v1.2.0">3.28.4</td><td class="tsm-ver tsm-up" data-v="ent">3.36.1</td></tr>
<tr class="tsm-gr"><td colspan="5">Persistence Layer</td></tr>
<tr><td class="tsm-comp">Hibernate ORM</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">5.6.5.Final</td><td class="tsm-ver" data-v="v1.1.0">5.6.5.Final</td><td class="tsm-mj tsm-ver" data-v="v1.2.0">7.2.0.Final <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver" data-v="ent">7.2.0.Final</td></tr>
<tr><td class="tsm-comp">MyBatis</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">3.5.15</td><td class="tsm-ver tsm-up" data-v="v1.1.0">3.5.19</td><td class="tsm-ver" data-v="v1.2.0">3.5.19</td><td class="tsm-ver" data-v="ent">3.5.19</td></tr>
<tr><td class="tsm-comp">Liquibase</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">4.8.0</td><td class="tsm-ver" data-v="v1.1.0">4.8.0</td><td class="tsm-mj tsm-ver" data-v="v1.2.0">5.0.1 <span class="tsm-chip tsm-chi-mj">Major</span></td><td class="tsm-ver tsm-up" data-v="ent">5.0.3</td></tr>
<tr class="tsm-gr"><td colspan="5">Data Processing &amp; Scripting</td></tr>
<tr><td class="tsm-comp">Jackson Databind</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">2.15.2</td><td class="tsm-ver" data-v="v1.1.0">2.15.2</td><td class="tsm-ver" data-v="v1.2.0">2.15.2</td><td class="tsm-up tsm-ver" data-v="ent">2.21.4 <span class="tsm-chip tsm-chi-up">Upgrade</span></td></tr>
<tr><td class="tsm-comp">FEEL-Scala<span class="tsm-sub">DMN Engine</span></td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">1.19.1</td><td class="tsm-ver tsm-up" data-v="v1.1.0">1.19.3</td><td class="tsm-ver" data-v="v1.2.0">1.19.3</td><td class="tsm-ver" data-v="ent">1.19.3</td></tr>
<tr><td class="tsm-comp">Groovy</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">4.0.22</td><td class="tsm-ver" data-v="v1.1.0">4.0.22</td><td class="tsm-ver" data-v="v1.2.0">4.0.22</td><td class="tsm-mj tsm-ver" data-v="ent">5.0.6 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-comp">FreeMarker</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">2.3.31</td><td class="tsm-ver" data-v="v1.1.0">2.3.31</td><td class="tsm-ver" data-v="v1.2.0">2.3.31</td><td class="tsm-ver" data-v="ent">2.3.31</td></tr>
<tr class="tsm-gr"><td colspan="5">Supported Databases — JDBC Drivers</td></tr>
<tr><td class="tsm-comp">H2 (embedded / testing)</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">2.3.232</td><td class="tsm-ver" data-v="v1.1.0">2.3.232</td><td class="tsm-ver" data-v="v1.2.0">2.3.232</td><td class="tsm-ver tsm-up" data-v="ent">2.4.240</td></tr>
<tr><td class="tsm-comp">PostgreSQL JDBC driver</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">42.5.5</td><td class="tsm-ver" data-v="v1.1.0">42.5.5</td><td class="tsm-ver" data-v="v1.2.0">42.5.5</td><td class="tsm-ver tsm-up" data-v="ent">42.7.11</td></tr>
<tr><td class="tsm-comp">MySQL Connector/J</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">8.3.0</td><td class="tsm-ver" data-v="v1.1.0">8.3.0</td><td class="tsm-ver" data-v="v1.2.0">8.3.0</td><td class="tsm-mj tsm-ver" data-v="ent">9.7.0 <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-comp">Oracle JDBC</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">23.5.0</td><td class="tsm-ver" data-v="v1.1.0">23.5.0</td><td class="tsm-ver" data-v="v1.2.0">23.5.0</td><td class="tsm-ver tsm-up" data-v="ent">23.26.2</td></tr>
<tr><td class="tsm-comp">SQL Server JDBC</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">8.4.1 (jre8)</td><td class="tsm-ver" data-v="v1.1.0">8.4.1 (jre8)</td><td class="tsm-ver" data-v="v1.2.0">8.4.1 (jre8)</td><td class="tsm-mj tsm-ver" data-v="ent">13.4.0 (jre11) <span class="tsm-chip tsm-chi-mj">Major</span></td></tr>
<tr><td class="tsm-comp">IBM DB2 JDBC</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">11.5.0.0</td><td class="tsm-ver" data-v="v1.1.0">11.5.0.0</td><td class="tsm-ver" data-v="v1.2.0">11.5.0.0</td><td class="tsm-ver tsm-up" data-v="ent">11.5.9.0</td></tr>
<tr class="tsm-gr"><td colspan="5">Build &amp; Frontend Tools</td></tr>
<tr><td class="tsm-comp">Apache Maven (wrapper)</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">3.8.8</td><td class="tsm-ver" data-v="v1.1.0">3.8.8</td><td class="tsm-ver" data-v="v1.2.0">3.8.8</td><td class="tsm-ver" data-v="ent">3.8.8</td></tr>
<tr><td class="tsm-comp">Node.js<span class="tsm-sub">Cockpit / Tasklist / Admin UI</span></td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">20.14.0 LTS</td><td class="tsm-ver" data-v="v1.1.0">20.14.0 LTS</td><td class="tsm-ver" data-v="v1.2.0">20.14.0 LTS</td><td class="tsm-ver" data-v="ent">20.14.0 LTS</td></tr>
<tr><td class="tsm-comp">npm</td><td class="tsm-ver tsm-col-hidden" data-v="v1.0.0">10.7.0</td><td class="tsm-ver" data-v="v1.1.0">10.7.0</td><td class="tsm-ver" data-v="v1.2.0">10.7.0</td><td class="tsm-ver" data-v="ent">10.7.0</td></tr>
</tbody>
</table>
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

  var colsel = wrap.querySelector('.tsm-colsel');
  var btn = wrap.querySelector('[data-tsm-colsel-btn]');
  var countEl = wrap.querySelector('[data-tsm-hidden-count]');
  var checkboxes = wrap.querySelectorAll('.tsm-colsel-menu input[type="checkbox"]');

  function updateCount(){
    var hidden = 0;
    checkboxes.forEach(function(cb){ if(!cb.checked) hidden++; });
    countEl.textContent = hidden + ' hidden';
    countEl.style.display = hidden === 0 ? 'none' : '';
  }

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    colsel.classList.toggle('tsm-open');
  });
  document.addEventListener('click', function(e){
    if(!colsel.contains(e.target)) colsel.classList.remove('tsm-open');
  });

  checkboxes.forEach(function(cb){
    cb.addEventListener('change', function(){
      var v = cb.getAttribute('data-tsm-toggle');
      wrap.querySelectorAll('[data-v="' + v + '"]').forEach(function(el){
        el.classList.toggle('tsm-col-hidden', !cb.checked);
      });
      updateCount();
    });
  });

  updateCount();
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
