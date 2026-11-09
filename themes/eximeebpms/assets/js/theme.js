"use strict";

(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const themeMenu = document.getElementById("theme-menu");
  const themeChoices = [...themeMenu.querySelectorAll("[data-theme-choice]")];
  const themeNames = { light: "Light", dark: "Dark", system: "System" };
  function currentPreference() {
    return root.dataset.theme === "light" || root.dataset.theme === "dark" ? root.dataset.theme : "system";
  }
  function showPreference() {
    const preference = currentPreference();
    root.dataset.themePreference = preference;
    themeButton.setAttribute("aria-label", `Color theme: ${themeNames[preference]}`);
    themeButton.title = `Color theme: ${themeNames[preference]}`;
    themeChoices.forEach(choice => choice.setAttribute("aria-checked", String(choice.dataset.themeChoice === preference)));
  }
  function closeThemeMenu(returnFocus) {
    if (themeMenu.hidden) return;
    themeMenu.hidden = true; themeButton.setAttribute("aria-expanded", "false");
    if (returnFocus) themeButton.focus();
  }
  function openThemeMenu() {
    showPreference();
    themeMenu.hidden = false; themeButton.setAttribute("aria-expanded", "true");
    (themeChoices.find(choice => choice.getAttribute("aria-checked") === "true") || themeChoices[0]).focus();
  }
  showPreference();
  themeButton.addEventListener("click", () => themeMenu.hidden ? openThemeMenu() : closeThemeMenu(false));
  themeChoices.forEach(choice => choice.addEventListener("click", () => {
    const preference = choice.dataset.themeChoice;
    if (preference === "system") delete root.dataset.theme; else root.dataset.theme = preference;
    try {
      if (preference === "system") localStorage.removeItem("eximeebpms-docs-theme");
      else localStorage.setItem("eximeebpms-docs-theme", preference);
    } catch (_) { /* Storage can be disabled. */ }
    showPreference(); closeThemeMenu(true);
  }));
  themeMenu.addEventListener("keydown", event => {
    const index = themeChoices.indexOf(document.activeElement);
    if (event.key === "Escape") { event.preventDefault(); closeThemeMenu(true); }
    else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      themeChoices[(index + step + themeChoices.length) % themeChoices.length].focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault(); themeChoices[event.key === "Home" ? 0 : themeChoices.length - 1].focus();
    } else if (event.key === "Tab") closeThemeMenu(false);
  });
  document.addEventListener("click", event => { if (!event.target.closest(".theme-switcher")) closeThemeMenu(false); });
  themeMenu.closest(".theme-switcher").addEventListener("focusout", event => {
    // A null target (Safari does not focus clicked buttons) is left to the click handler.
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeThemeMenu(false);
  });

  // Landing pages have no article: the skip link then targets the whole shell.
  if (!document.getElementById("main-content")) {
    const shell = document.querySelector(".docs-shell");
    if (shell) { shell.id = "main-content"; shell.tabIndex = -1; }
  }

  const menuButton = document.querySelector(".mobile-menu");
  const sidebar = document.querySelector(".docs-sidebar");
  function closeMenu() {
    sidebar.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    const article = document.querySelector(".docs-article");
    if (article) article.inert = false;
  }
  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    const article = document.querySelector(".docs-article");
    if (article) article.inert = open;
  });
  sidebar.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeMenu(); menuButton.focus(); }
  });
  matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);

  document.querySelectorAll(".content-text pre").forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "copy-wrapper";
    block.before(wrapper); wrapper.append(block);
    const button = document.createElement("button");
    button.type = "button"; button.className = "copy-button"; button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(block.querySelector("code")?.textContent ?? block.textContent);
        button.textContent = "Copied";
      } catch (_) { button.textContent = "Select code to copy"; }
      setTimeout(() => { button.textContent = "Copy"; }, 2000);
    });
    wrapper.append(button);
  });

  document.querySelectorAll(".content-text table").forEach(table => {
    if (table.closest(".tsm-tbl-wrap,.tbl-wrap")) {
      const existing = table.parentElement;
      existing.tabIndex = 0; existing.setAttribute("role", "region"); existing.setAttribute("aria-label", "Scrollable table");
      return;
    }
    const container = document.createElement("div"); container.className = "table-container";
    const scroll = document.createElement("div"); scroll.className = "table-scroll"; scroll.tabIndex = 0;
    scroll.setAttribute("role", "region"); scroll.setAttribute("aria-label", "Scrollable table");
    table.before(container); container.append(scroll); scroll.append(table);
    const expand = document.createElement("button"); expand.type = "button"; expand.className = "table-expand"; expand.textContent = "Expand table";
    expand.addEventListener("click", () => {
      const dialog = document.createElement("dialog"); dialog.className = "table-dialog"; dialog.setAttribute("aria-label", "Expanded table");
      const heading = document.createElement("div"); heading.className = "dialog-heading";
      const title = document.createElement("h2"); title.textContent = "Expanded table";
      const close = document.querySelector(".search-close").cloneNode(true);
      close.className = "table-close icon-button"; close.setAttribute("aria-label", "Close table");
      close.addEventListener("click", () => dialog.close());
      heading.append(title, close);
      const area = scroll.cloneNode(false); const copy = table.cloneNode(true);
      copy.querySelectorAll("[id]").forEach(node => node.removeAttribute("id")); copy.removeAttribute("id");
      area.append(copy); dialog.append(heading, area); document.body.append(dialog);
      dialog.addEventListener("close", () => { dialog.remove(); expand.focus(); }, {once:true}); dialog.showModal();
    });
    container.append(expand);
  });

  document.querySelectorAll(".toggle-instructions").forEach(toggle => {
    toggle.setAttribute("role", "button"); toggle.tabIndex = 0; toggle.setAttribute("aria-expanded", "false");
    function activate() {
      const open = toggle.closest(".gs-download-step-panel").classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", activate);
    toggle.addEventListener("keydown", event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); activate(); } });
  });

  document.querySelectorAll("[data-bpmn-diagram]").forEach(async element => {
    try {
      const response = await fetch(`${element.dataset.bpmnDiagram}.bpmn`);
      if (!response.ok) throw new Error("Diagram unavailable");
      const xml = await response.text();
      const viewer = new window.EximeeBpmnViewer({container:element, width:"100%", height:"100%"});
      viewer.importXML(xml, error => {
        if (error) { element.textContent = "Unable to display diagram."; return; }
        const canvas = viewer.get("canvas");
        const fit = () => {
          const inner = canvas.viewbox().inner;
          const padding = 16;
          const width = inner.width + padding * 2;
          const height = inner.height + padding * 2;
          const scale = Math.min(1, element.clientWidth / width);
          const elementHeight = Math.max(180, Math.ceil(height * scale));
          element.style.height = `${elementHeight}px`;
          // Never enlarge beyond 100 % and centre the diagram when the minimum height applies.
          const zoom = Math.min(1, element.clientWidth / width, elementHeight / height);
          const viewWidth = element.clientWidth / zoom;
          const viewHeight = elementHeight / zoom;
          canvas.viewbox({ x: inner.x + inner.width / 2 - viewWidth / 2, y: inner.y + inner.height / 2 - viewHeight / 2, width: viewWidth, height: viewHeight });
        };
        new ResizeObserver(fit).observe(element); fit();
      });
    } catch (_) { element.textContent = "Unable to load diagram."; }
  });

  const tocLinks = [...document.querySelectorAll(".docs-toc a")];
  const headings = tocLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  if (headings.length) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.isIntersecting);
      if (entry) tocLinks.forEach(link => {
        if (decodeURIComponent(link.hash.slice(1)) === entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, {rootMargin:"-80px 0px -65% 0px"});
    headings.forEach(heading => observer.observe(heading));
  }

  const dialog = document.querySelector(".search-dialog");
  const input = dialog.querySelector("input");
  const list = dialog.querySelector(".search-list");
  const status = dialog.querySelector(".search-status");
  const previous = dialog.querySelector(".search-previous");
  const next = dialog.querySelector(".search-next");
  const pagefindBase = document.querySelector("script[data-pagefind-base]").dataset.pagefindBase;
  let modulePromise, results = [], page = 0, generation = 0, timer;
  function openSearch() { if (!dialog.open) dialog.showModal(); input.focus(); }
  document.querySelector(".search-launch").addEventListener("click", openSearch);
  dialog.querySelector(".search-close").addEventListener("click", () => dialog.close());
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
  });
  async function renderResults(token) {
    const data = await Promise.all(results.slice(page * 10, (page + 1) * 10).map(result => result.data()));
    if (token !== generation) return;
    list.replaceChildren();
    for (const result of data) {
      const li = document.createElement("li"), heading = document.createElement("h3"), link = document.createElement("a"), excerpt = document.createElement("p");
      link.href = result.url; link.textContent = result.meta?.title || result.url;
      const text = new DOMParser().parseFromString(result.excerpt || "", "text/html");
      excerpt.textContent = text.body.textContent;
      heading.append(link); li.append(heading, excerpt); list.append(li);
    }
    previous.disabled = page === 0; next.disabled = (page + 1) * 10 >= results.length;
    status.textContent = results.length ? `${results.length} results · Page ${page + 1}` : "No results.";
  }
  function showSearchError(token) {
    if (token !== generation) return;
    list.replaceChildren(); previous.disabled = next.disabled = true;
    status.textContent = "Search is unavailable. Please try again.";
  }
  input.addEventListener("input", () => {
    clearTimeout(timer); const token = ++generation;
    timer = setTimeout(async () => {
      const term = input.value.trim();
      if (!term) { list.replaceChildren(); status.textContent = ""; previous.disabled = next.disabled = true; return; }
      status.textContent = "Searching…";
      try {
        modulePromise ??= import(`${pagefindBase}pagefind.js`).then(async mod => { await mod.init(); return mod; }).catch(error => { modulePromise = null; throw error; });
        const mod = await modulePromise; const response = await mod.search(term);
        if (token !== generation) return;
        results = response.results; page = 0; await renderResults(token);
      } catch (_) { showSearchError(token); }
    }, 150);
  });
  previous.addEventListener("click", () => { if (page > 0) { page--; const token = ++generation; renderResults(token).catch(() => showSearchError(token)); } });
  next.addEventListener("click", () => { if ((page + 1) * 10 < results.length) { page++; const token = ++generation; renderResults(token).catch(() => showSearchError(token)); } });
})();
