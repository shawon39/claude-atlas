/* ===========================================================
   CONTENT — drives the sidebar, the pages, and Prev/Next order.
   Structure:
     CONTENT = [ { part, pages: [ { id, num, title, html } ] } ]
   To add a page: add an object to the right part's `pages` array.
   Wrap jargon like: <span class="jargon" data-term="agent">agent</span>
   Add a diagram with: <div class="mermaid">flowchart LR; A-->B</div>
   Date every page with: <p class="verified">…</p>
   =========================================================== */

const VERIFIED = `<p class="verified">Verified against official docs on <time datetime="2026-07-15">July 15, 2026</time></p>`;

const CONTENT = [
  /* ============================ PART 0 ============================ */
  {
    part: "Part 0 · Start Here",
    pages: [
      {
        id: "welcome",
        num: "0.1",
        title: "Welcome",
        html: `
${VERIFIED}
<p class="lead">You want to use the Claude ecosystem well and not fall behind it. That is harder than it sounds.</p>

<p>In the twelve months to July 2026 Anthropic shipped a new model family, renamed an SDK, replaced the way thinking is configured, retired six models, and launched an entire second product surface (<span class="jargon" data-term="cowork">Cowork</span>). Official documentation covers all of it accurately — but it is reference material, and reference material does not tell you what to care about.</p>

<p>This site does that. It is a map, not a mirror.</p>

<h2>What this covers</h2>
<ul>
  <li><b>Models</b> — the current lineup, what each is actually for, and the patterns that no longer work.</li>
  <li><b>Claude Code</b> — the CLI and its surfaces, the <code>.claude</code> directory, <span class="jargon" data-term="skill">skills</span>, <span class="jargon" data-term="subagent">subagents</span>, <span class="jargon" data-term="hook">hooks</span>, <span class="jargon" data-term="mcp">MCP</span>, and <span class="jargon" data-term="headless">headless</span> use in CI.</li>
  <li><b>Claude Desktop and Cowork</b> — delegated knowledge work, and how it differs from chat and from Claude Code.</li>
  <li><b>claude.ai</b> — <span class="jargon" data-term="project">projects</span>, <span class="jargon" data-term="artifact">artifacts</span>, <span class="jargon" data-term="memory">memory</span>, research, connectors, and usage limits.</li>
  <li><b>Recipes</b> — end-to-end workflows, several of them Salesforce-flavoured.</li>
</ul>

<h2>What this leaves out, on purpose</h2>
<ul>
  <li><b>The Claude API and <span class="jargon" data-term="agent-sdk">Agent SDK</span>.</b> Superbly documented already, changing weekly, and not what most people need day to day. This site covers products you <i>use</i>, not APIs you <i>call</i>. Where the two meet, you get a link.</li>
  <li><b>Team and enterprise administration.</b> SSO, SCIM, role permissions, seat billing. Not the audience.</li>
  <li><b>Anything in beta that is likely to move.</b> Mentioned where it matters, not documented in depth.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 Why the omissions matter</div>
  <p>Those cuts are what keep this site maintainable, and a maintainable site is the only kind that stays true. A complete map that is six months stale is worse than a partial one that is right.</p>
</div>

<h2>How to read it</h2>
<p><b>Every page is dated.</b> The badge at the top of each page tells you when its claims were last checked against official docs. If a page is months old, trust it less.</p>
<p><b>Every page cites its sources.</b> The list at the bottom links the official page behind each claim. When this site and the official docs disagree, the official docs are right — and this site has a bug.</p>
<p><b>Dotted words are jargon.</b> Hover any <span class="jargon" data-term="context-window">dotted term</span> for a plain-English definition, or click it to open the full Jargon Decoder. The 📖 button in the top bar opens it any time.</p>
<p><b>Deprecated things are called out in a yellow box.</b> If you see one, stop and read it. It usually means something you learned is now wrong.</p>
<p><b>Examples come first.</b> Pages open with a concrete task and then explain the concept, because that is the order in which people actually need the information.</p>

<h2>Where to go next</h2>
<p>New to the ecosystem? Read <a href="#ecosystem-map">the ecosystem map</a> — it answers "which of these things should I even be using?" Just want to know which model to pick today? Jump to <a href="#choosing">choosing a model</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/home">Claude Platform docs</a> — API and platform reference</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code docs</a> — the CLI and its surfaces</li>
    <li><a href="https://support.claude.com/">Claude Help Center</a> — claude.ai, Desktop, and Cowork</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — the single best changelog to watch</li>
  </ul>
</div>
`
      },

      {
        id: "ecosystem-map",
        num: "0.2",
        title: "The ecosystem map",
        html: `
${VERIFIED}
<p class="lead">You want Claude to fix a failing Apex test. Which of the six things called "Claude" do you open?</p>

<p>That question has a clean answer, and once you internalise it the rest of the ecosystem stops feeling like a pile of overlapping products. There is one rule:</p>

<div class="callout tip">
  <div class="c-head">💡 The one rule</div>
  <p>Pick the surface by <b>how much autonomy the work needs</b>, and <b>where the work lives</b>.</p>
</div>

<h2>The short answer</h2>
<table class="doc">
<thead><tr><th>You want to…</th><th>Use</th><th>Because</th></tr></thead>
<tbody>
<tr><td>Ask something, think out loud, draft text</td><td><b>Chat</b><br><small>claude.ai or the Desktop Chat tab</small></td><td>Conversational — you stay in the loop every turn</td></tr>
<tr><td>Delegate multi-step office work and walk away</td><td><b>Cowork</b><br><small>Desktop, web, mobile</small></td><td>Plans, splits into subtasks, produces documents and files</td></tr>
<tr><td>Build, refactor, debug, or review software</td><td><b>Claude Code</b><br><small>terminal, Desktop, IDE, web</small></td><td>Lives in your repo, runs your tools, edits your files</td></tr>
<tr><td>Embed Claude in your own software</td><td><b>Claude API / Agent SDK</b></td><td>You write the loop, or the SDK writes it for you</td></tr>
</tbody>
</table>

<h2>The decision tree</h2>
<div class="mermaid">
flowchart TD
    A["I want Claude to<br/>do something"] --> B{"Does the work<br/>live in a code repo?"}
    B -- Yes --> C["Claude Code"]
    B -- No --> D{"Do I want to stay<br/>in the loop each turn?"}
    D -- "Yes, conversational" --> E["Chat"]
    D -- "No, delegate it" --> F{"One-off<br/>or recurring?"}
    F -- "One-off" --> G["Cowork task"]
    F -- "Recurring" --> H["Cowork + /schedule"]
    A --> I{"Am I building this into<br/>my own product?"}
    I -- Yes --> J["Claude API / Agent SDK"]
</div>
<p class="diagram-caption">Where the work lives decides the surface. Autonomy decides the mode.</p>

<h2>So: the failing Apex test</h2>
<p><b>Claude Code.</b> The work lives in a repo, needs to read your classes, run <code>sf apex run test</code>, and edit files. Chat would make you paste code back and forth. Cowork could technically do it, but it is built for knowledge work, not for living inside a git checkout.</p>

<h2>The four surfaces in one paragraph each</h2>

<h3>Chat</h3>
<p>The thing you already know: claude.ai in a browser, the Chat tab in the Desktop app, or the mobile app. You ask, it answers, you steer every turn. It has grown real capabilities — it can run code in a sandbox to produce spreadsheets and slide decks, search the web, remember you across conversations, and reach into connected apps like Drive and Slack. Use it for thinking, drafting, and questions.</p>

<h3>Cowork</h3>
<p>Anthropic's answer to "do this whole task for me." You describe an outcome, Claude makes a plan, breaks it into subtasks, runs them (often in parallel), and comes back with finished work — spreadsheets with working formulas, decks, organised folders. It runs in an isolated environment on Anthropic's servers by default, so you can close your laptop. Paid plans only.</p>

<div class="callout tip">
  <div class="c-head">💡 What Cowork is actually for</div>
  <p>Anthropic reports that <b>over 90% of Cowork usage is not software development</b>. If you are reaching for it to write code, you are probably reaching for the wrong surface.</p>
</div>

<h3>Claude Code</h3>
<p>An agentic coding tool that runs where your code is. Despite the name it is not only a CLI — the same tool runs in the terminal, in the Claude Desktop app's Code tab, in VS Code and JetBrains, and in the browser at claude.ai/code. Sessions are shared across those surfaces, so you can start a task on your phone and pull it into your terminal.</p>

<h3>Claude API and Agent SDK</h3>
<p>For when Claude goes inside something you are building. The API is the raw interface; the <span class="jargon" data-term="agent-sdk">Agent SDK</span> hands you the Claude Code harness as a library. This site does not cover them beyond this paragraph — the <a href="https://platform.claude.com/docs/en/home">official docs</a> are excellent and change too fast for a secondary source to track honestly.</p>

<h2>The things around the edges</h2>
<p>These are real, but they are features of the surfaces above rather than separate products:</p>
<ul>
  <li><b>Claude in Chrome</b> — a browser extension that lets Claude click and navigate websites. It backs the browser-control features in Cowork and Claude Code.</li>
  <li><b>Computer use in Cowork</b> — a research preview where Claude drives your actual screen. Pro and Max only.</li>
  <li><b>Claude Design and Claude Science</b> — newer Labs products, in beta.</li>
  <li><b>Claude Tag</b> — Claude in Slack, rebuilt. The old Claude in Slack app switches over on <b>3 August 2026</b>.</li>
</ul>

<h2>One usage pool</h2>
<p>A practical detail that catches people out: on a subscription, <b>all of these draw from the same usage allowance</b>. Claude Code in your terminal, a Cowork task, and a chat on your phone all spend the same budget. There is a rolling 5-hour session limit and, on paid plans, weekly caps.</p>
<p>That is why "which surface" and "which model" are cost decisions, not just convenience ones — see <a href="#choosing">choosing a model</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Claude Cowork</a></li>
    <li><a href="https://claude.com/blog/the-claude-cowork-product-guide">The Claude Cowork product guide</a> — chat vs Cowork vs Claude Code</li>
    <li><a href="https://claude.com/blog/cowork-web-mobile">Cowork on web and mobile</a> — the &gt;90% non-development statistic</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code setup</a> · <a href="https://code.claude.com/docs/en/desktop">the desktop app</a></li>
    <li><a href="https://platform.claude.com/docs/en/agent-sdk/overview">Claude Agent SDK overview</a></li>
    <li><a href="https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome">Get started with Claude in Chrome</a></li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag</a></li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a></li>
  </ul>
</div>
`
      },

      {
        id: "how-claude-thinks",
        num: "0.3",
        title: "How Claude thinks",
        html: `
${VERIFIED}
<p class="lead">You spent an hour with Claude on a refactor. It read six files, ran the tests twice, fixed a bug. Then you asked it to apply the same pattern to the file you looked at first — and it had forgotten what was in it.</p>

<p>Nothing broke. This is the single most useful mental model in the ecosystem, and everything on this page exists to explain it.</p>

<h2>Claude has no memory between turns</h2>
<p>The model is stateless. It does not "remember" your last message; the entire conversation is re-sent on every single turn. What feels like memory is just the transcript being replayed.</p>
<p>So on each turn, something assembles a package: your system prompt, your <span class="jargon" data-term="claude-md">CLAUDE.md</span>, the conversation so far, files that were read, tool results. That package is the <span class="jargon" data-term="context-window">context window</span>, and the model sees exactly it — nothing more.</p>

<div class="mermaid">
sequenceDiagram
    participant You
    participant Harness as Claude Code / chat
    participant Model as Claude
    You->>Harness: "Now do the same in utils.ts"
    Note over Harness: Assemble context:<br/>system prompt + CLAUDE.md +<br/>full transcript + file contents
    Harness->>Model: Entire package, every turn
    Note over Model: Think (adaptive)
    Model-->>Harness: Tool call: read utils.ts
    Harness-->>Model: File contents (added to context)
    Note over Model: Think again
    Model-->>Harness: Final answer
    Harness-->>You: Response
</div>
<p class="diagram-caption">Nothing persists in the model. The harness rebuilds the whole package every turn.</p>

<p>Two consequences follow, and they explain most surprising behaviour:</p>
<ol>
  <li><b>Long conversations cost more per turn</b>, because the whole transcript is re-sent each time. Turn 50 is more expensive than turn 2.</li>
  <li><b>When the package gets too big, something must be dropped or summarised</b> — and that is when Claude "forgets."</li>
</ol>

<h2>The window is big, but it is not the point</h2>
<p>Current models hold 1M <span class="jargon" data-term="token">tokens</span>; Haiku 4.5 holds 200K. A token is roughly 3.5 characters of English, so 1M tokens is something like 750,000 words. Enormous.</p>
<p>It still fills. Agentic work is the reason: reading a dozen files, each tool result, every test output — it accumulates fast. And there is a subtler problem the official docs name directly: <span class="jargon" data-term="context-rot">context rot</span>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ More context is not better</div>
  <p>A focused 30K-token session often outperforms a sprawling 300K one. Curating what Claude sees is a real skill — and it is why <span class="jargon" data-term="subagent">subagents</span> exist. They burn their own context on the messy search and hand back only the answer.</p>
</div>

<h2>Thinking happens before the answer</h2>
<p>Given the package, Claude can reason before it responds — working on scrap paper before speaking. On current models this is <span class="jargon" data-term="thinking">adaptive</span>: Claude decides when to think and how deeply, based on the task. You do not set a budget.</p>
<p>Two things about thinking that surprise people:</p>
<p><b>You usually cannot see it.</b> On the newest models the raw chain of thought is never returned. You can opt into a summary, but the default returns nothing. The reasoning happened and you were billed for it; you just do not get to read it.</p>
<p><b>It is billed as output.</b> Thinking tokens count toward output tokens — the expensive kind. This is why the <a href="#thinking-effort"><span class="jargon" data-term="effort">effort</span> dial</a> is a cost control as much as a quality control.</p>

<h2>What you actually control</h2>
<p>You cannot make the model remember. You can control what goes into the package:</p>
<table class="doc">
<thead><tr><th>Lever</th><th>Where</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><b><code>CLAUDE.md</code></b></td><td>Claude Code</td><td>Always in context. Keep it short — it is on every request.</td></tr>
<tr><td><b>Skills</b></td><td>Everywhere</td><td>Description in context; body loads on demand.</td></tr>
<tr><td><b>Subagents</b></td><td>Claude Code</td><td>Isolate expensive exploration in a separate window.</td></tr>
<tr><td><b><code>/compact</code></b></td><td>Claude Code</td><td>Summarise the transcript to reclaim room.</td></tr>
<tr><td><b><code>/clear</code></b></td><td>Claude Code</td><td>Start fresh. Underrated.</td></tr>
<tr><td><b>Effort</b></td><td>Everywhere</td><td>How much thinking to spend.</td></tr>
</tbody>
</table>

<h2>The habit that follows from all this</h2>
<p>When a session starts going wrong — Claude contradicts itself, forgets a decision, or re-reads a file it already read — the instinct is to explain harder. Usually the better move is to <b>start a fresh session with a better opening prompt</b>.</p>
<p>You are not fighting the model's intelligence; you are fighting a cluttered whiteboard, and clutter compounds. A clean window with a precise prompt beats a long conversation with three corrections in it, almost every time.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">Context windows</a> — sizes and context rot</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking">Adaptive thinking</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/compaction">Compaction</a></li>
    <li><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Effective context engineering for AI agents</a></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Claude Code context window</a></li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ PART 1 ============================ */
  {
    part: "Part 1 · Models",
    pages: [
      {
        id: "lineup",
        num: "1.1",
        title: "Current lineup",
        html: `
${VERIFIED}
<p class="lead">A 50,000-token coding session costs about 25 cents on Sonnet 5 and about 50 cents on Fable 5 in input alone — before either has written a line back.</p>

<p>Model choice is a real decision, made several times a day. This page is the reference; <a href="#choosing">choosing a model</a> is the guide.</p>

<h2>The models</h2>
<table class="doc">
<thead><tr><th>Model</th><th>Model ID</th><th>In / out per MTok</th><th>Context</th><th>Max output</th></tr></thead>
<tbody>
<tr><td><b>Claude Fable 5</b></td><td><code>claude-fable-5</code></td><td>$10 / $50</td><td>1M</td><td>128K</td></tr>
<tr><td><b>Claude Mythos 5</b><br><small>Restricted access</small></td><td><code>claude-mythos-5</code></td><td>$10 / $50</td><td>1M</td><td>128K</td></tr>
<tr><td><b>Claude Opus 4.8</b></td><td><code>claude-opus-4-8</code></td><td>$5 / $25</td><td>1M</td><td>128K</td></tr>
<tr><td><b>Claude Sonnet 5</b><br><small>Intro $2 / $10 through 31 Aug 2026</small></td><td><code>claude-sonnet-5</code></td><td>$3 / $15</td><td>1M</td><td>128K</td></tr>
<tr><td><b>Claude Haiku 4.5</b></td><td><code>claude-haiku-4-5</code></td><td>$1 / $5</td><td>200K</td><td>64K</td></tr>
</tbody>
</table>

<p>Pricing is per million tokens, input / output. Output costs 5× input on every model — which is why <a href="#thinking-effort">thinking tokens</a> matter to your bill.</p>

<h2>What each one is for</h2>
<p><b>Claude Fable 5</b> is the flagship of the Claude 5 family and the most capable model Anthropic has released generally. It is built for long-horizon agentic work — overnight runs, large migrations, problems where you want maximum capability and can absorb the cost. <span class="jargon" data-term="thinking">Thinking</span> is always on and cannot be disabled. Distinctive trait: it does not need hand-holding, and prompts written for older models are often <i>too</i> prescriptive for it.</p>

<p><b>Claude Mythos 5</b> is Fable 5 with some safeguards lifted, available only to approved organisations through Project Glasswing. It is listed here for completeness. You almost certainly cannot use it, and if you can, you already know.</p>

<p><b>Claude Opus 4.8</b> is the daily driver for serious engineering. Complex agentic coding, code review, architecture. It is what this site was built with. At half Fable 5's price with the same 1M context, it is the default choice when the work is hard but not extraordinary.</p>

<p><b>Claude Sonnet 5</b> is the current default on claude.ai for Free and Pro, and the right default for most work. It reaches near-Opus quality on coding and agentic tasks at a fraction of the cost, and the introductory pricing makes it cheaper still until the end of August 2026.</p>

<p><b>Claude Haiku 4.5</b> is the speed play. Near-frontier intelligence, fastest responses, cheapest tokens, and the only current model with a 200K context rather than 1M. Ideal for classification, <span class="jargon" data-term="subagent">subagents</span>, and anything latency-sensitive.</p>

<h2>Also still available</h2>
<p>Not every active model is in the table above. <b>Opus 4.7</b>, <b>Opus 4.6</b>, and <b>Sonnet 4.6</b> all still work and can be pinned if you need stability. They are superseded rather than broken. Two notes if you use them:</p>
<ul>
  <li>Opus 4.7 introduced the <code>xhigh</code> effort level and the current tokenizer.</li>
  <li>Opus 4.6 and Sonnet 4.6 still accept the old <code>budget_tokens</code> thinking parameter, which is deprecated. Newer models reject it outright — see <a href="#stale-patterns">stale patterns</a>.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Do not add date suffixes to model IDs</div>
  <p>From the 4.6 generation onward, a dateless ID like <code>claude-opus-4-8</code> <b>is</b> the pinned snapshot, not a floating alias. <code>claude-sonnet-5-20260630</code> is not a thing and will 404. The habit comes from Claude 3-era IDs, which genuinely did carry dates.</p>
</div>

<h2>The Fable 5 wrinkle</h2>
<p>Worth knowing if you read about Fable 5 and found conflicting accounts. It launched on 9 June 2026, was suspended on 12 June under a US export-control directive after a safeguard bypass was reported, and was redeployed globally on 1 July with an improved safety classifier. Consumer access changed several times through that window and now runs largely on usage credits.</p>
<p>There is also a live behaviour you will notice: if you send Fable 5 a request that trips its safeguards, <b>Opus 4.8 answers instead</b>, with a visible notice, and the conversation stays on Opus until you switch back manually.</p>

<h2>Which one should you use?</h2>
<p>The short version: <b>Sonnet 5 by default, Opus 4.8 when the work is hard, Haiku 4.5 for volume, and Fable 5 almost never.</b> The reasoning is on the <a href="#choosing">next page</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/overview">Models overview</a> — the canonical table</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/pricing">Pricing</a></li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions">Model IDs and versions</a></li>
    <li><a href="https://www.anthropic.com/news/claude-fable-5-mythos-5">Introducing Claude Fable 5 and Claude Mythos 5</a></li>
    <li><a href="https://www.anthropic.com/news/redeploying-fable-5">Redeploying Fable 5</a> — the suspension timeline</li>
    <li><a href="https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5">Why Claude switched models in your conversation with Fable 5</a></li>
    <li><a href="https://www.anthropic.com/news/claude-opus-4-8">Claude Opus 4.8</a> · <a href="https://www.anthropic.com/news/claude-sonnet-5">Claude Sonnet 5</a> · <a href="https://www.anthropic.com/news/claude-haiku-4-5">Claude Haiku 4.5</a></li>
  </ul>
</div>
`
      },

      {
        id: "choosing",
        num: "1.2",
        title: "Choosing a model",
        html: `
${VERIFIED}
<p class="lead">You are about to refactor a managed package's trigger framework across 40 classes. Reach for Fable 5, because it is the most capable model?</p>

<p>No. Use Opus 4.8 at <code>xhigh</code> <span class="jargon" data-term="effort">effort</span>. It costs half as much, and the task is hard but not <i>extraordinary</i> — it is exactly the "complex agentic coding" Opus 4.8 is built for. This page is mostly about why that instinct — bigger model equals better outcome — is the expensive mistake.</p>

<div class="callout tip">
  <div class="c-head">💡 The rule that saves the most money</div>
  <p><b>Try tuning effort before switching models.</b> This is Anthropic's own guidance, not a folk tip. Sonnet 5 at <code>xhigh</code> beats Sonnet 5 at <code>medium</code> on a hard problem, and still costs less than Opus 4.8.</p>
</div>

<p>The corollary: if a model is underperforming, ask "is it under-thinking, or is it out of depth?" Under-thinking is an effort problem, and effort is cheap. Out of depth is a model problem.</p>

<h2>The decision tree</h2>
<div class="mermaid">
flowchart TD
    A["Pick a model"] --> B{"Latency-critical<br/>or high volume?"}
    B -- Yes --> C["Haiku 4.5"]
    B -- No --> D{"Is it hard?<br/>Architecture, tricky<br/>debugging, big refactor"}
    D -- No --> E["Sonnet 5 · default"]
    D -- Yes --> F{"Did Sonnet 5<br/>at xhigh fail?"}
    F -- "Not tried yet" --> G["Raise effort first"]
    G --> F
    F -- "Yes, genuinely stuck" --> H["Opus 4.8"]
    H --> I{"Long autonomous run,<br/>hours unsupervised?"}
    I -- "Yes, and cost is<br/>not the constraint" --> J["Fable 5"]
    I -- No --> H
</div>
<p class="diagram-caption">Note the loop: effort gets raised before the model gets upgraded.</p>

<h2>By scenario</h2>
<table class="doc">
<thead><tr><th>Model</th><th>Cost</th><th>Reach for it when…</th></tr></thead>
<tbody>
<tr><td>Claude Fable 5</td><td>$$$$</td><td>The hardest reasoning and overnight autonomous runs, where correctness outweighs cost.</td></tr>
<tr><td>Claude Mythos 5</td><td>$$$$</td><td>Not available to most people — approved organisations only, via Project Glasswing.</td></tr>
<tr><td>Claude Opus 4.8</td><td>$$$</td><td>Serious coding sessions, code review, architecture, and long-horizon work.</td></tr>
<tr><td>Claude Sonnet 5</td><td>$$</td><td>Your default for most work, and for agents that run at volume.</td></tr>
<tr><td>Claude Haiku 4.5</td><td>$</td><td>Classification, subagents, and latency-sensitive tasks.</td></tr>
</tbody>
</table>

<h2>Concretely, in Salesforce terms</h2>
<table class="doc">
<thead><tr><th>Task</th><th>Model</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Generate Apex test classes for a service class</td><td><b>Sonnet 5</b></td><td>Well-defined, patterned work. Sonnet 5 is strong here and cheap.</td></tr>
<tr><td>Refactor a trigger framework across 40 classes</td><td><b>Opus 4.8</b> at <code>xhigh</code></td><td>Hard, multi-file, needs sustained coherence.</td></tr>
<tr><td>"Why does this batch job hit CPU limits only in prod?"</td><td><b>Opus 4.8</b></td><td>Diagnostic reasoning across sparse evidence.</td></tr>
<tr><td>Triage 500 support emails into categories</td><td><b>Haiku 4.5</b></td><td>High volume, simple judgement, latency matters.</td></tr>
<tr><td>Subagents fanning out over 30 LWC components</td><td><b>Haiku 4.5</b> for the workers</td><td>Cheap parallel readers reporting to a smarter orchestrator.</td></tr>
<tr><td>An overnight migration you review in the morning</td><td><b>Fable 5</b></td><td>Long-horizon autonomy is precisely its edge.</td></tr>
<tr><td>Writing this documentation site</td><td><b>Opus 4.8</b> drafting, <b>Sonnet 5</b> bulk</td><td>Judgement where it counts, volume where it doesn't.</td></tr>
</tbody>
</table>

<h2>When Fable 5 is actually right</h2>
<p>Narrower than the marketing suggests. Fable 5 earns its 2× premium when:</p>
<ul>
  <li>The run is <b>long and unsupervised</b> — hours of autonomous work you review afterwards.</li>
  <li>The task is at <b>the edge of what any model can do</b>, and you have already watched Opus 4.8 fail.</li>
  <li><b>Correctness dominates cost</b> — a subtly wrong migration costs more than the tokens.</li>
</ul>
<p>Its own guidance says something telling: prompts written for older models are often <i>too prescriptive</i> for Fable 5 and reduce output quality. If you are still writing step-by-step instructions, you are not using the thing you are paying for.</p>
<p>For everything else — and this is most things — Opus 4.8 does the job at half the price.</p>

<h2>The subscription angle</h2>
<p>If you are on Pro or Max rather than the API, cost is not dollars per token, it is <b>your weekly allowance</b>. All surfaces draw from one pool: terminal, Cowork, and phone chat all spend the same budget. Fable 5 drains it fastest, and beyond your included allocation it runs on usage credits.</p>

<div class="callout warn">
  <div class="c-head">⚠️ On a subscription, "always use the biggest model" doesn't mean a bigger bill</div>
  <p>It means hitting a wall on Thursday. Sonnet 5 as a default is what keeps you working all week.</p>
</div>

<h2>What to do when you are unsure</h2>
<ol>
  <li>Start on <b>Sonnet 5</b> at default effort.</li>
  <li>If the output is shallow, raise <b>effort</b> to <code>xhigh</code> before touching the model.</li>
  <li>If it is still wrong in kind rather than depth, move to <b>Opus 4.8</b>.</li>
  <li>Only if Opus 4.8 genuinely cannot do it, and the run is long and unsupervised, consider <b>Fable 5</b>.</li>
</ol>
<p>Most work never leaves step 1 or 2.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/choosing-a-model">Choosing the right model</a> — including the effort-before-model rule</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a></li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/overview">Models overview</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5">Prompting Claude Fable 5</a></li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a></li>
    <li><a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a></li>
  </ul>
</div>
`
      },

      {
        id: "thinking-effort",
        num: "1.3",
        title: "Thinking, effort & fast mode",
        html: `
${VERIFIED}
<p class="lead">Your agent gives a shallow answer to a hard question. The instinct is to upgrade the model. Usually the fix is one dial: raise effort from <code>high</code> to <code>xhigh</code> and ask again.</p>

<p>Three controls govern how hard Claude works and how fast it answers. They interact, and only one of them is a dial you turn.</p>

<h2>Thinking: adaptive, and not yours to tune</h2>
<p>Claude reasons before answering. On current models that reasoning is <span class="jargon" data-term="thinking">adaptive</span> — Claude decides when to think and how deeply, per request, based on the task.</p>
<p>You do not set a thinking budget. That is the whole design.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Deprecated: budget_tokens</div>
  <p>Setting <code>thinking: {type: "enabled", budget_tokens: N}</code> is the old way. It is <b>deprecated</b> on Opus 4.6 and Sonnet 4.6, and <b>rejected with a 400 error</b> on Opus 4.7, Opus 4.8, Sonnet 5, and Fable 5. Use <code>thinking: {type: "adaptive"}</code> and control depth with effort instead.</p>
</div>

<p>Per-model behaviour differs in ways that bite:</p>
<table class="doc">
<thead><tr><th>Model</th><th>Thinking</th></tr></thead>
<tbody>
<tr><td><b>Fable 5</b></td><td>Always on. Cannot be disabled — an explicit <code>disabled</code> returns a 400.</td></tr>
<tr><td><b>Opus 4.8 / 4.7</b></td><td>Adaptive is the only on-mode. Omitting the parameter runs <i>without</i> thinking.</td></tr>
<tr><td><b>Sonnet 5</b></td><td>Adaptive runs by default when you omit the parameter.</td></tr>
<tr><td><b>Opus 4.6 / Sonnet 4.6</b></td><td>Adaptive recommended; <code>budget_tokens</code> still accepted but deprecated.</td></tr>
</tbody>
</table>

<p>Note the trap in the middle two rows: on Opus 4.8, <i>omitting</i> <code>thinking</code> means no thinking. On Sonnet 5, omitting it means adaptive thinking. Same absence, opposite behaviour.</p>

<h3>You mostly cannot read the thinking</h3>
<p>On the newest models the raw chain of thought is never returned. You can opt into a <b>summary</b> (<code>display: "summarized"</code>), but the default is <code>"omitted"</code> — thinking blocks arrive with empty text.</p>
<p>This matters if you stream responses to users: the default looks like a long pause before anything appears. Opt into summaries if the wait needs explaining.</p>
<p>You are billed for thinking either way. Visibility is not the same as cost.</p>

<h2>Effort: the dial that matters</h2>
<p><code>low</code> · <code>medium</code> · <code>high</code> · <code>xhigh</code> · <code>max</code>. Default is <code>high</code>.</p>
<table class="doc">
<thead><tr><th>Level</th><th>Use for</th></tr></thead>
<tbody>
<tr><td><code>low</code></td><td>Short scoped tasks, latency-sensitive work, cheap subagents</td></tr>
<tr><td><code>medium</code></td><td>Cost-sensitive work you can trade a little quality on</td></tr>
<tr><td><code>high</code></td><td>The default. Most intelligence-sensitive work</td></tr>
<tr><td><code>xhigh</code></td><td><b>Coding and agentic work</b> — the recommended setting, and Claude Code's default</td></tr>
<tr><td><code>max</code></td><td>Correctness outweighs cost. Can overthink; test before committing</td></tr>
</tbody>
</table>

<p><b>Effort is a cost control.</b> Thinking tokens are billed as output — the 5×-priced kind. Effort is the main lever on the size of that bill.</p>

<div class="callout tip">
  <div class="c-head">💡 Higher effort can be cheaper overall</div>
  <p>Counterintuitive but real: on agentic work, better planning up front means fewer wrong turns, fewer tool calls, fewer turns total. <code>xhigh</code> on a coding task can cost less end to end than <code>medium</code> flailing.</p>
</div>

<p>Newer models also respect low effort <i>strictly</i> — at <code>low</code> they scope work to exactly what you asked rather than going above and beyond. Good for latency; risky on genuinely complex problems.</p>

<h3>Where you set it</h3>
<ul>
  <li><b>Claude Code</b> — <code>/effort</code> (or <code>/config</code>). Defaults to <code>xhigh</code>.</li>
  <li><b>claude.ai</b> — Settings, per model. Opus 4.7 and later expose <code>xhigh</code>.</li>
  <li><b>API</b> — <code>output_config: { effort: "xhigh" }</code>. Note it is nested inside <code>output_config</code>, not top-level.</li>
</ul>

<h2>Fast mode: speed, at a price</h2>
<p>A <b>research preview</b> that runs the same model at up to <b>2.5× output tokens per second</b>, for premium pricing. Same intelligence, less waiting.</p>
<ul>
  <li><b>Opus 4.8</b> — supported. $10/$50 per MTok in fast mode (double standard Opus pricing).</li>
  <li><b>Opus 4.7</b> — deprecated 25 June 2026, <b>removed 24 July 2026</b>. Do not build on it.</li>
  <li><b>Opus 4.6 and earlier</b> — not supported.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Deprecated: fast mode on Opus 4.7</div>
  <p>Removed on <b>24 July 2026</b> — days away as this page was verified. If you are using <code>claude-opus-4-7</code> with fast mode, move to <code>claude-opus-4-8</code>. Older <code>-fast</code> model strings like <code>claude-opus-4-6-fast</code> are already retired and <b>silently fall back to standard speed</b>, so you lose the speed without an error telling you.</p>
</div>

<p>In Claude Code, toggle it with <code>/fast</code>. On the API it needs the beta endpoint, the <code>fast-mode-2026-02-01</code> beta flag, and <code>speed: "fast"</code> as a top-level parameter.</p>
<p>Reach for it when a human is waiting. Skip it for background and batch work, where the premium buys nothing.</p>

<h2>Putting it together</h2>
<p>For a hard Apex refactor with Claude Code: <b>Opus 4.8</b>, effort <code>xhigh</code>, adaptive thinking on, fast mode off. You are not watching each token, the planning quality pays for itself, and the speed premium would be wasted.</p>
<p>For a chat where you are waiting on the answer: <b>Opus 4.8</b>, effort <code>high</code>, fast mode on if the wait annoys you.</p>
<p>For a subagent scanning 30 files: <b>Haiku 4.5</b>, effort <code>low</code>. It is reading, not reasoning.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking">Adaptive thinking</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/fast-mode">Fast mode</a> — pricing and the 4.7 removal date</li>
    <li><a href="https://code.claude.com/docs/en/fast-mode">Fast mode in Claude Code</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/extended-thinking">Extended thinking</a> — the legacy mode</li>
    <li><a href="https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings">Change the model, effort and thinking settings</a></li>
  </ul>
</div>
`
      },

      {
        id: "stale-patterns",
        num: "1.4",
        title: "Stale patterns to unlearn",
        html: `
${VERIFIED}
<p class="lead">Half of what a well-informed engineer knew about Claude in mid-2025 is now wrong. Not subtly wrong — returns-a-400 wrong. This page is the diff.</p>

<p>If you read one page on this site to avoid embarrassing yourself, read this one. Blog posts, Stack Overflow answers, and other models' training data are all full of these.</p>

<h2>Retired models</h2>
<p>Gone. These return a 404 — not a deprecation warning, a hard failure.</p>
<table class="doc">
<thead><tr><th>Model</th><th>Retired</th><th>Use instead</th></tr></thead>
<tbody>
<tr><td><code>claude-3-5-sonnet-20240620</code> / <code>-20241022</code></td><td>28 Oct 2025</td><td><code>claude-sonnet-5</code></td></tr>
<tr><td><code>claude-3-opus-20240229</code></td><td>5 Jan 2026</td><td><code>claude-opus-4-8</code></td></tr>
<tr><td><code>claude-3-7-sonnet-20250219</code></td><td>19 Feb 2026</td><td><code>claude-sonnet-5</code></td></tr>
<tr><td><code>claude-3-5-haiku-20241022</code></td><td>19 Feb 2026</td><td><code>claude-haiku-4-5</code></td></tr>
<tr><td><code>claude-3-haiku-20240307</code></td><td>20 Apr 2026</td><td><code>claude-haiku-4-5</code></td></tr>
<tr><td><code>claude-opus-4-20250514</code></td><td>15 Jun 2026</td><td><code>claude-opus-4-8</code></td></tr>
<tr><td><code>claude-sonnet-4-20250514</code></td><td>15 Jun 2026</td><td><code>claude-sonnet-5</code></td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Retiring soon: Opus 4.1</div>
  <p><code>claude-opus-4-1</code> was deprecated on 5 June 2026 and <b>retires 5 August 2026</b> — about three weeks after this page was verified. Migrate to <code>claude-opus-4-8</code>.</p>
</div>

<p>Also note <code>claude-mythos-preview</code> retires <b>21 July 2026</b> in favour of <code>claude-mythos-5</code>, and Opus 4.7 fast mode is removed <b>24 July 2026</b> (see <a href="#thinking-effort">thinking and effort</a>).</p>

<h2>API parameters that now fail</h2>

<div class="callout warn">
  <div class="c-head">⚠️ budget_tokens</div>
  <p><b>Old:</b> <code>thinking: { type: "enabled", budget_tokens: 10000 }</code><br>
     <b>New:</b> <code>thinking: { type: "adaptive" }</code> plus <code>output_config: { effort: "xhigh" }</code></p>
  <p>Deprecated on Opus 4.6 / Sonnet 4.6. <b>Returns 400</b> on Opus 4.7, Opus 4.8, Sonnet 5, and Fable 5. There is no direct replacement for the number — <span class="jargon" data-term="effort">effort</span> is the control now.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ temperature, top_p, top_k</div>
  <p><b>Old:</b> <code>temperature: 0.7</code> to tune creativity, <code>temperature: 0</code> for determinism.<br>
     <b>New:</b> Remove them. Steer with prompting.</p>
  <p>Non-default values <b>return 400</b> on Opus 4.7, Opus 4.8, and Sonnet 5. If you used <code>temperature: 0</code> for determinism, know that it never actually guaranteed identical outputs.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ output_format</div>
  <p><b>Old:</b> top-level <code>output_format</code> on <code>messages.create()</code><br>
     <b>New:</b> <code>output_config: { format: { type: "json_schema", schema: ... } }</code></p>
  <p>The old parameter still works during a transition period, but new code should not use it.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Assistant prefill</div>
  <p><b>Old:</b> ending <code>messages</code> with an <code>assistant</code> turn to force a response shape.<br>
     <b>New:</b> structured outputs via <code>output_config.format</code>, or a system-prompt instruction.</p>
  <p><b>Returns 400</b> on Fable 5, Opus 4.6, 4.7, 4.8, and Sonnet 4.6.</p>
</div>

<h2>Names that changed</h2>
<table class="doc">
<thead><tr><th>Old name</th><th>Current name</th></tr></thead>
<tbody>
<tr><td>Claude Code SDK</td><td><b>Claude <span class="jargon" data-term="agent-sdk">Agent SDK</span></b></td></tr>
<tr><td>Anthropic API</td><td><b>Claude API</b></td></tr>
<tr><td>Claude in Slack</td><td><b>Claude Tag</b> (cutover 3 Aug 2026)</td></tr>
<tr><td>Desktop extensions as <code>.dxt</code></td><td><b><code>.mcpb</code></b> (MCP Bundle) — <code>.dxt</code> still works</td></tr>
</tbody>
</table>

<h2>URLs that moved</h2>
<p>Search engines still surface the old ones. All of these redirect, but cite the current domain:</p>
<table class="doc">
<thead><tr><th>Old</th><th>Current</th><th>For</th></tr></thead>
<tbody>
<tr><td><code>docs.anthropic.com</code></td><td><b><code>platform.claude.com/docs</code></b></td><td>API and platform</td></tr>
<tr><td><code>docs.claude.com</code></td><td><b><code>platform.claude.com/docs</code></b></td><td>API and platform</td></tr>
<tr><td><code>console.anthropic.com</code></td><td><b><code>platform.claude.com</code></b></td><td>Console</td></tr>
<tr><td><code>support.anthropic.com</code></td><td><b><code>support.claude.com</code></b></td><td>Help centre</td></tr>
<tr><td>—</td><td><b><code>code.claude.com/docs</code></b></td><td>Claude Code</td></tr>
</tbody>
</table>
<p>Rule of thumb: <b>platform</b> for the API, <b>code</b> for Claude Code, <b>support</b> for the apps.</p>

<h2>Claude Code specifics</h2>

<div class="callout warn">
  <div class="c-head">⚠️ The /output-style command</div>
  <p>Deprecated in v2.1.73 and <b>removed in v2.1.91</b>. Output styles still exist — manage them through <code>/config</code> instead.</p>
</div>

<p><b>Commands and skills merged.</b> <code>.claude/commands/*.md</code> and <code>.claude/skills/**/SKILL.md</code> both produce a slash command. The old <code>commands/</code> directory still works and needs no migration, but <code>SKILL.md</code> is the format to learn.</p>

<h2>Things that are true but sound wrong</h2>
<p>Not deprecations — just facts that trip people who learned earlier:</p>
<ul>
  <li><b>1M context is standard</b>, not a beta flag, on Fable 5, Opus 4.6+, Sonnet 5, and Sonnet 4.6. No header needed, no long-context surcharge.</li>
  <li><b>Custom <span class="jargon" data-term="connector">connectors</span> run from Anthropic's cloud, not your machine</b> — even in the Desktop app. Your MCP server must be reachable from Anthropic's infrastructure.</li>
  <li><b>Claude Code is not only a CLI.</b> It runs in the terminal, the Desktop app, VS Code, JetBrains, and the browser.</li>
  <li><b>The free plan includes file creation and skills</b>, but not Claude Code.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a> — the authoritative retirement table</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/migration-guide">Migration guide</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking">Adaptive thinking</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs">Structured outputs</a></li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions">Model IDs and versions</a></li>
    <li><a href="https://platform.claude.com/docs/en/agent-sdk/overview">Agent SDK overview</a> — the SDK rename</li>
    <li><a href="https://code.claude.com/docs/en/output-styles">Output styles</a> — the removed command</li>
    <li><a href="https://support.claude.com/en/articles/12922929-building-desktop-extensions-with-mcpb">Building desktop extensions with MCPB</a></li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag</a></li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ APPENDIX ============================ */
  {
    part: "Appendix",
    pages: [
      {
        id: "glossary",
        num: "A.1",
        title: "Jargon Decoder",
        html: `
<p class="lead">Every term used on this site, in plain English. Also pops up whenever you hover a <span class="jargon" data-term="agent">dotted word</span> in a page — or click one to jump straight here.</p>
<input id="glossarySearch" class="gloss-search" placeholder="Filter terms…" style="width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:10px;background:var(--bg-soft);color:var(--text);margin:8px 0 4px;font-size:14px;">
<div id="glossary-list"></div>
`
      }
    ]
  }
];
