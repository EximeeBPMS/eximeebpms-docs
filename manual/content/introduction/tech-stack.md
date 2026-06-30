---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

The Tech Stack Compatibility Matrix covers all EximeeBPMS releases — from the first OSS release (**v1.0.0**) through the current **Enterprise** track — showing the exact dependency versions, application servers, databases, and build tools for each milestone.

Use the **OSS Releases** tab for a focused view of Maven Central releases (v1.0.0–v1.2.0), or switch to **Full Timeline** to include the Enterprise track and see all changes at a glance.

{{< note title="Breaking changes since v1.2.0" class="warning" >}}
The <strong>javax</strong> namespace was removed in v1.2.0. The Enterprise track additionally bumps Java to 21 and drops Tomcat 9 (javax legacy) and WildFly 26.
{{< /note >}}

<div style="margin-top:16px;">
  <iframe
    src="../../tech-stack-matrix.html"
    style="width:100%;height:1380px;border:none;display:block;border-radius:8px;"
    title="EximeeBPMS Tech Stack Compatibility Matrix"
    loading="lazy">
  </iframe>
</div>

<p style="margin-top:12px;font-size:13px;">
  Having trouble viewing the embedded table?
  <a href="../../tech-stack-matrix.html" target="_blank" rel="noopener">Open in a new tab ↗</a>
</p>
