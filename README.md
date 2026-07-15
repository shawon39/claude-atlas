# Claude Atlas

An unofficial field guide to the Claude ecosystem — models, Claude Code, Desktop, Cowork, and
claude.ai. What each product is for, what the jargon means, and which patterns are already stale.

**Live:** https://shawon39.github.io/claude-atlas

> Not affiliated with, endorsed by, or produced by Anthropic. Every page links its official sources;
> when this site and the official docs disagree, the official docs are right.

## How it's built

Plain HTML, CSS, and vanilla JS — a hash-routed single-page app. No framework, no build step, no
dependencies, no CI. Mermaid loads from a CDN; everything else is in this repo.

Layout pattern follows [learn-postman](https://github.com/shawon39/learn-postman).

```
index.html          Shell: topbar, layout, glossary modal, tooltip
assets/styles.css   The design system (all colour in the :root token blocks)
assets/content.js   Every page — this is where you write
assets/glossary.js  Every jargon term
assets/app.js       Router, sidebar, theme, search, tooltips
```

## Working on it

Edit a file, reload the browser. To preview locally:

```
python3 -m http.server 4321
```

Adding a page means adding one object to `CONTENT` in `assets/content.js`. The sidebar, Prev/Next,
home cards, progress bar, and search all derive from it — there is no nav to update.

Contributor guidance — content rules, markup vocabulary, gotchas — is in [AGENTS.md](./AGENTS.md).

## Features

- **Jargon Decoder** — 38 terms. Hover any dotted word for a definition, click to open the full
  glossary. The 📖 button opens it anywhere.
- **Light / dark** — follows your OS, with a toggle that persists.
- **Search** — filters the sidebar and auto-expands matching sections.
- **Every page is dated** and links its official sources.

## Deploying

Push to `main`. Pages is set to deploy from the branch root — no build, no Actions.

## Status

| Section | State |
| --- | --- |
| Part 0 · Start Here | Complete |
| Part 1 · Models | Complete |
| Part 2 · Claude Code | Complete |
| Part 3 · Desktop & Cowork | Complete |
| Part 4 · claude.ai | Complete |
| Part 5 · Recipes | Complete |
| Part 6 · Productivity | Complete |

All sections written. Ongoing job is the monthly sweep — see
[5.4 · Staying current](https://shawon39.github.io/claude-atlas/#staying-current) for the routine and
the list of known expiry dates.

Facts are verified against official docs on the date shown on each page.
