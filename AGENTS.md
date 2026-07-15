# Claude Atlas

An unofficial documentation site about the Claude ecosystem. **Plain HTML, CSS, and vanilla JS — a
hash-routed single-page app. No framework, no build step, no CI.** Push to `main`, GitHub Pages
serves it.

Live at `https://shawon39.github.io/claude-atlas`.

Layout pattern follows `shawon39/learn-postman`; the palette is Atlas indigo.

## Working on it

Nothing to install, nothing to build. Edit a file, reload the browser.

Local preview: `python3 -m http.server 4321` (run it from another directory with
`--directory <path>` — Python can't read the cwd inside the OneDrive folder).

## Structure

```
index.html          Shell only: topbar, layout, modal, tooltip. No content.
assets/styles.css   Whole design system. All colour lives in the :root token blocks.
assets/content.js   CONTENT — every page. This is where you write.
assets/glossary.js  GLOSSARY — every jargon term.
assets/app.js       Router, sidebar, theme, search, tooltips, glossary. Rarely touched.
```

## Adding a page — the only workflow you need

Add one object to the right part's `pages` array in `assets/content.js`:

```js
{ id: "hooks", num: "2.5", title: "Hooks", html: `${VERIFIED} <p class="lead">…</p>` }
```

That's it. The sidebar, Prev/Next, the home cards, the page count, the progress bar, and search all
derive from `CONTENT` automatically. **There is no nav to update and no index to rebuild.**

To add a section, append `{ part: "Part 2 · Claude Code", pages: [...] }` to `CONTENT`.

## Content rules

These are not style preferences. They are what keeps the site true and maintainable.

1. **Short sentences.** One idea per sentence, average under 20 words. Two commas means split it.
2. **Plain English before jargon.** Wrap terms as `<span class="jargon" data-term="slug">…</span>` —
   the slug must exist in `glossary.js`. Never define a term using another undefined term.
3. **Example first.** Open every page with `<p class="lead">` stating a concrete task ("You want X"),
   then the concept, then the reference detail. Never open with a definition.
4. **Cite every factual claim.** End each page with a `<div class="sources">` block. Cite only:
   `platform.claude.com` (API/platform), `code.claude.com` (Claude Code), `support.claude.com`
   (consumer apps), `anthropic.com/news` and `claude.com/blog` (announcements),
   `anthropic.com/engineering` (best-practice and research posts). Other domains are stale mirrors.
   **Verify every URL resolves before publishing** — a dead citation is worse than none. An audit
   in July 2026 found a hallucinated support-article ID that had shipped.
5. **Opinion is allowed, but label it.** Pages may give recommendations (which model, which habit) —
   that is the point of the site. Keep facts cited and opinions clearly the author's. Where advice
   comes from community practice rather than official guidance, say so.
6. **Date every page.** Start the `html` with `${VERIFIED}`. Bump the `VERIFIED` constant — or make it
   per-page — when you re-check facts. This is the site's main defence against going stale.
7. **Flag deprecations loudly.** `<div class="callout warn">` with a `<div class="c-head">⚠️ …</div>`.
8. **Mermaid for flows and architecture only.** `<div class="mermaid">…</div>`, one or two per page.
   Never for lists or hierarchies a table handles better. Add a `<p class="diagram-caption">`.
9. **Don't transcribe official reference tables.** Link them; explain the 20% people actually use.
10. **Omit what can't be verified.** If official docs are unclear or conflicting, say so or leave it
   out. Never guess.

## Markup vocabulary

| Element | Use |
| --- | --- |
| `<p class="lead">` | Opening paragraph |
| `<div class="callout tip">` + `<div class="c-head">💡 …</div>` | Insight worth boxing |
| `<div class="callout warn">` | Deprecations, traps |
| `<div class="callout try">` | Do-this-now |
| `<table class="doc">` | All tables |
| `<span class="jargon" data-term="slug">` | Glossary term (hover + click) |
| `<div class="mermaid">` | Diagram |
| `<div class="sources">` | Official sources, end of page |

## Gotchas

- `content.js` uses template literals, so two characters bite:
  - **Backticks** — a markdown backtick inside `html:` terminates the string. Use `<code>` tags in
    prose; inside a `<pre>` showing markdown, escape as `` \` ``.
  - **`${`** — interpolates. GitHub Actions `${{ secrets.X }}` **must** be written `\${{ secrets.X }}`
    or the page silently breaks. Same for any `${...}` you want shown literally.
  - `node --check assets/content.js` catches both. Run it before every push.
- Mermaid inside `content.js` is a JS string, not HTML, so write `-->` normally (**not** `--&gt;`).
- Every `data-term` slug must exist in `GLOSSARY` or the tooltip silently does nothing.
- Bump the `?v=` query on the script/style tags in `index.html` after a content change. GitHub
  Pages sends `cache-control: max-age=600`, so a stale asset self-heals within 10 minutes — the
  bump is for seeing your own change immediately, not for correctness.
- `404.html` uses **absolute** `/claude-atlas/` paths: Pages serves it for missing paths at any
  depth, so relative links would break.

## Scope boundaries

Deliberately out of scope — do not add pages for these:

- The Claude API and Agent SDK (link out only; changes weekly, well documented already)
- Team/enterprise administration (SSO, SCIM, seat billing, role permissions)
- Beta and preview features likely to move (mention where relevant, don't document in depth)

## Maintenance

The single feed to watch is the [release notes](https://support.claude.com/en/articles/12138966-release-notes),
plus the [Claude Code changelog](https://code.claude.com/docs/en/changelog) and
[model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations). Sweep
monthly: check what changed, patch affected pages, bump the verified date.

Known expiries to action: Opus 4.7 fast mode removed **24 Jul 2026**; Claude Tag cutover
**3 Aug 2026**; Opus 4.1 retires **5 Aug 2026**; Sonnet 5 intro pricing ends **31 Aug 2026**.
