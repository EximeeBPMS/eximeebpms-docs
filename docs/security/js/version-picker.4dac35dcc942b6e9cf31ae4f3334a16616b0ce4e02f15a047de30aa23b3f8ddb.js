"use strict";

(() => {
  const picker = document.querySelector("#version-select");
  const initialVersion = picker?.value;
  picker?.addEventListener("change", async () => {
    if (!picker.value || picker.disabled) return;
    picker.disabled = true;
    const base = new URL(picker.dataset.base, location.origin);
    const relative = location.pathname.startsWith(base.pathname) ? location.pathname.slice(base.pathname.length) : "";
    const targetRoot = `/${picker.dataset.section}/${encodeURIComponent(picker.value)}/`;
    let target = targetRoot;
    if (relative) {
      try {
        const response = await fetch(targetRoot + relative, { method: "HEAD", signal: AbortSignal.timeout(4000) });
        if (response.ok) target += relative + location.hash;
      } catch (_) { /* The selected manual remains reachable when the page check fails. */ }
    }
    // A back/forward-cache restore must retain a usable picker and its original selection.
    picker.value = initialVersion;
    picker.disabled = false;
    location.assign(target);
  });
})();
