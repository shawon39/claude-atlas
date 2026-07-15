/* ===========================================================
   Claude Atlas — app logic: sidebar, routing (#hash), Prev/Next,
   Mermaid, jargon tooltips, glossary, search, theme toggle.
   Depends on: content.js (CONTENT), glossary.js (GLOSSARY), mermaid (CDN)
   =========================================================== */
(function () {
  "use strict";

  // ---------- Flatten pages into a single ordered list ----------
  const PAGES = [];
  CONTENT.forEach(part => part.pages.forEach(pg => PAGES.push({ ...pg, part: part.part })));
  const pageIndex = id => PAGES.findIndex(p => p.id === id);

  // ---------- Elements ----------
  const $ = sel => document.querySelector(sel);
  const sidebar = $("#sidebar");
  const pageEl = $("#page");
  const pagerEl = $("#pager");
  const crumbEl = $("#breadcrumb");
  const tooltip = $("#tooltip");
  const progressBar = $("#progressBar");

  // ---------- Theme ----------
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("atlas_theme", t); } catch (e) {}
    $("#themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
    initMermaid();
    // re-render current diagrams with new theme
    const cur = currentId();
    if (cur) renderPage(cur, false);
  }
  $("#themeBtn").addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  // ---------- Mermaid ----------
  function initMermaid() {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: currentTheme() === "dark" ? "dark" : "default",
      flowchart: { htmlLabels: true, curve: "basis" }
    });
  }
  async function runMermaid() {
    if (!window.mermaid) return;
    const nodes = pageEl.querySelectorAll(".mermaid");
    if (!nodes.length) return;
    try {
      await window.mermaid.run({ nodes });
    } catch (e) {
      console.warn("Mermaid render issue:", e);
    }
  }

  // ---------- Sidebar ----------
  const attrEsc = s => s.replace(/"/g, "&quot;");
  function buildSidebar() {
    let html = `<a class="nav-link home-link" data-id="home" href="#home" draggable="false">
      <span class="num">🏠</span><span class="lbl">Home / Overview</span></a>`;
    CONTENT.forEach(part => {
      html += `<div class="group" data-part="${attrEsc(part.part)}">
        <button class="group-title" aria-expanded="true">
          <span class="chev">▸</span><span class="gt-label">${part.part}</span>
        </button>
        <div class="group-links">`;
      part.pages.forEach(pg => {
        html += `<a class="nav-link" data-id="${pg.id}" href="#${pg.id}" draggable="false">
          <span class="num">${pg.num}</span><span class="lbl">${pg.title}</span></a>`;
      });
      html += `</div></div>`;
    });
    sidebar.innerHTML = html;
    applyCollapse();
  }

  function highlightSidebar(id) {
    sidebar.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.id === id);
    });
    const active = sidebar.querySelector(".nav-link.active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  // ---------- Collapsible sidebar sections ----------
  const COLLAPSE_KEY = "atlas_collapsed_groups";
  function getCollapsed() {
    try { return new Set(JSON.parse(localStorage.getItem(COLLAPSE_KEY) || "[]")); }
    catch (e) { return new Set(); }
  }
  function saveCollapsed(set) {
    try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...set])); } catch (e) {}
  }
  function applyCollapse() {
    const collapsed = getCollapsed();
    sidebar.querySelectorAll(".group").forEach(g => {
      const isC = collapsed.has(g.dataset.part);
      g.classList.toggle("collapsed", isC);
      const btn = g.querySelector(".group-title");
      if (btn) btn.setAttribute("aria-expanded", String(!isC));
    });
  }
  function ensureActiveGroupExpanded(part) {
    const collapsed = getCollapsed();
    if (collapsed.has(part)) { collapsed.delete(part); saveCollapsed(collapsed); }
    sidebar.querySelectorAll(".group").forEach(g => {
      if (g.dataset.part === part) {
        g.classList.remove("collapsed");
        g.querySelector(".group-title")?.setAttribute("aria-expanded", "true");
      }
    });
  }
  // Toggle a section when its header is clicked
  sidebar.addEventListener("click", e => {
    const btn = e.target.closest(".group-title");
    if (!btn) return;
    const g = btn.closest(".group");
    const nowCollapsed = g.classList.toggle("collapsed");
    btn.setAttribute("aria-expanded", String(!nowCollapsed));
    const collapsed = getCollapsed();
    nowCollapsed ? collapsed.add(g.dataset.part) : collapsed.delete(g.dataset.part);
    saveCollapsed(collapsed);
  });

  // ---------- Routing ----------
  function currentId() {
    const id = location.hash.replace(/^#/, "");
    return pageIndex(id) >= 0 ? id : null;
  }

  function renderPage(id, scrollTop = true) {
    const idx = pageIndex(id);
    if (idx < 0) return;
    const pg = PAGES[idx];

    crumbEl.innerHTML = `<span>${pg.part} &nbsp;›&nbsp; ${pg.num}</span>` +
      `<span class="pagecount">Page ${idx + 1} of ${PAGES.length}</span>`;
    pageEl.innerHTML = `<h1>${pg.title}</h1>${pg.html}`;

    // Special: fill the glossary appendix page
    if (id === "glossary") buildGlossaryPage();

    enhanceCodeBlocks();
    buildPager(idx);
    highlightSidebar(id);
    ensureActiveGroupExpanded(pg.part);
    hideTooltip();
    if (progressBar) progressBar.style.width = ((idx + 1) / PAGES.length * 100) + "%";
    document.title = pg.title + " · Claude Atlas";
    runMermaid();
    if (scrollTop) window.scrollTo({ top: 0 });
    closeSidebarMobile();
  }

  // Add a "Copy" button to every code block on the current page
  function enhanceCodeBlocks() {
    pageEl.querySelectorAll("pre").forEach(pre => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        const code = (pre.querySelector("code") || pre).innerText;
        let ok = false;
        try { await navigator.clipboard.writeText(code); ok = true; }
        catch (e) {
          const ta = document.createElement("textarea");
          ta.value = code; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { ok = document.execCommand("copy"); } catch (_) {}
          ta.remove();
        }
        btn.textContent = ok ? "Copied!" : "Press Ctrl+C";
        btn.classList.toggle("copied", ok);
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1500);
      });
      pre.appendChild(btn);
    });
  }

  function buildPager(idx) {
    const prev = PAGES[idx - 1];
    const next = PAGES[idx + 1];
    pagerEl.innerHTML = `
      <a class="prev ${prev ? "" : "disabled"}" href="${prev ? "#" + prev.id : "#"}">
        <span class="dir">← Previous</span><span class="ttl">${prev ? prev.title : ""}</span></a>
      <a class="next ${next ? "" : "disabled"}" href="${next ? "#" + next.id : "#"}">
        <span class="dir">Next →</span><span class="ttl">${next ? next.title : ""}</span></a>`;
  }

  // ---------- Home / overview page ----------
  function renderHome() {
    const cards = CONTENT.map(part => {
      const sep = part.part.indexOf("·");
      const label = sep > -1 ? part.part.slice(0, sep).trim() : part.part;
      const name = sep > -1 ? part.part.slice(sep + 1).trim() : "";
      const items = part.pages.map(pg =>
        `<li><a href="#${pg.id}">${pg.num} · ${pg.title}</a></li>`).join("");
      return `<div class="home-card">
        <h3><span class="hc-part">${label}</span>${name || label}</h3>
        <ul>${items}</ul>
      </div>`;
    }).join("");

    pageEl.innerHTML = `
      <div class="home-hero">
        <h1>Claude Atlas — the ecosystem, mapped</h1>
        <p class="sub">An unofficial field guide to the Claude ecosystem, written for engineers who
          want to stay current without reading every changelog. What each product is for, what the
          words mean, and which patterns are already out of date.</p>
        <div class="home-stats">
          <div class="stat"><b>${CONTENT.length}</b><span>sections</span></div>
          <div class="stat"><b>${PAGES.length}</b><span>pages</span></div>
          <div class="stat"><b>${Object.keys(GLOSSARY).length}</b><span>jargon terms</span></div>
        </div>
        <a class="home-cta" href="#${PAGES[0].id}">Start here →</a>
      </div>
      <div class="home-section-title">Everything in the atlas</div>
      <div class="home-grid">${cards}</div>`;

    crumbEl.innerHTML = `<span>Home</span>`;
    pagerEl.innerHTML = "";
    highlightSidebar("home");
    hideTooltip();
    if (progressBar) progressBar.style.width = "0%";
    document.title = "Claude Atlas — an unofficial field guide to the Claude ecosystem";
    window.scrollTo({ top: 0 });
    closeSidebarMobile();
  }

  // ---------- Routing ----------
  function route() {
    const hash = location.hash.replace(/^#/, "");
    if (!hash || hash === "home") { renderHome(); return; }
    if (pageIndex(hash) >= 0) { renderPage(hash); return; }
    renderHome(); // unknown hash → home
  }
  window.addEventListener("hashchange", route);

  // ---------- Glossary (modal + appendix page) ----------
  function glossaryItemsHtml() {
    return Object.keys(GLOSSARY).sort((a, b) =>
      GLOSSARY[a].term.localeCompare(GLOSSARY[b].term)
    ).map(slug => {
      const g = GLOSSARY[slug];
      return `<div class="gloss-item" id="gloss-${slug}" data-slug="${slug}">
        <span class="term">${g.term}</span><br>${g.def}</div>`;
    }).join("");
  }

  function buildGlossaryPage() {
    const list = $("#glossary-list");
    if (!list) return;
    list.innerHTML = glossaryItemsHtml();
    const search = $("#glossarySearch");
    if (search) {
      search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        list.querySelectorAll(".gloss-item").forEach(it => {
          it.style.display = it.textContent.toLowerCase().includes(q) ? "" : "none";
        });
      });
    }
  }

  // Modal
  const backdrop = $("#glossaryModal");
  const modalList = $("#modalList");
  function openGlossaryModal(slug) {
    modalList.innerHTML = glossaryItemsHtml();
    backdrop.classList.add("open");
    if (slug) {
      const target = modalList.querySelector("#gloss-" + slug);
      if (target) {
        target.classList.add("flash");
        target.scrollIntoView({ block: "center" });
      }
    }
  }
  function closeGlossaryModal() { backdrop.classList.remove("open"); }
  $("#modalClose").addEventListener("click", closeGlossaryModal);
  backdrop.addEventListener("click", e => { if (e.target === backdrop) closeGlossaryModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeGlossaryModal(); });
  $("#modalSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    modalList.querySelectorAll(".gloss-item").forEach(it => {
      it.style.display = it.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
  $("#glossaryBtn").addEventListener("click", () => openGlossaryModal(null));

  // ---------- Jargon tooltips (hover) + click to open glossary ----------
  function showTooltip(el) {
    const slug = el.dataset.term;
    const g = GLOSSARY[slug];
    if (!g) return;
    tooltip.innerHTML = `<span class="tt-term">${g.term}</span>${g.def}`;
    // Measure while hidden (visibility:hidden still has layout)
    const r = el.getBoundingClientRect();
    const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
    const gap = 12;

    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(10, Math.min(left, window.innerWidth - tw - 10));

    let top = r.top - th - gap;
    let below = false;
    if (top < 10) { top = r.bottom + gap; below = true; } // flip below if no room above

    // Point the caret at the term's centre, clamped inside the tooltip
    const caretX = Math.max(16, Math.min(r.left + r.width / 2 - left, tw - 16));

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    tooltip.style.setProperty("--caret-x", caretX + "px");
    tooltip.classList.toggle("below", below);
    tooltip.classList.toggle("above", !below);
    tooltip.classList.add("show");
  }
  function hideTooltip() { tooltip.classList.remove("show"); }

  pageEl.addEventListener("mouseover", e => {
    const j = e.target.closest(".jargon");
    if (j) showTooltip(j);
  });
  pageEl.addEventListener("mouseout", e => {
    if (e.target.closest(".jargon")) hideTooltip();
  });
  pageEl.addEventListener("click", e => {
    const j = e.target.closest(".jargon");
    if (j) { hideTooltip(); openGlossaryModal(j.dataset.term); }
  });

  // ---------- Sidebar search (filters nav; auto-expands matching sections) ----------
  $("#search").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      sidebar.querySelectorAll(".nav-link").forEach(a => (a.style.display = ""));
      sidebar.querySelectorAll(".group").forEach(g => (g.style.display = ""));
      applyCollapse(); // restore the user's saved expand/collapse state
      return;
    }
    sidebar.querySelectorAll(".group").forEach(group => {
      let anyVisible = false;
      group.querySelectorAll(".nav-link").forEach(a => {
        const hit = a.textContent.toLowerCase().includes(q);
        a.style.display = hit ? "" : "none";
        if (hit) anyVisible = true;
      });
      group.style.display = anyVisible ? "" : "none";
      if (anyVisible) group.classList.remove("collapsed"); // reveal matches
    });
  });

  // ---------- Sidebar toggle (desktop: hide sidebar · mobile: slide-over) ----------
  const scrim = $("#scrim");
  const isDesktop = () => window.innerWidth > 900;
  function openSidebarMobile() { sidebar.classList.add("open"); scrim.classList.add("show"); }
  function closeSidebarMobile() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }
  $("#menuBtn").addEventListener("click", () => {
    if (isDesktop()) {
      const collapsed = document.body.classList.toggle("nav-collapsed");
      try { localStorage.setItem("atlas_nav_collapsed", collapsed ? "1" : "0"); } catch (e) {}
    } else {
      sidebar.classList.contains("open") ? closeSidebarMobile() : openSidebarMobile();
    }
  });
  scrim.addEventListener("click", closeSidebarMobile);

  // ---------- Boot ----------
  // Restore desktop sidebar-hidden preference
  try { if (isDesktop() && localStorage.getItem("atlas_nav_collapsed") === "1") document.body.classList.add("nav-collapsed"); } catch (e) {}
  // First-ever visit: on the home page collapse all sections; on a deep-linked
  // page, expand only that page's section.
  try {
    if (localStorage.getItem(COLLAPSE_KEY) === null) {
      const hash = location.hash.replace(/^#/, "");
      if (pageIndex(hash) >= 0) {
        const activePart = PAGES[pageIndex(hash)].part;
        saveCollapsed(new Set(CONTENT.map(p => p.part).filter(t => t !== activePart)));
      } else {
        saveCollapsed(new Set(CONTENT.map(p => p.part)));
      }
    }
  } catch (e) {}
  buildSidebar();
  initMermaid();
  route();
})();
