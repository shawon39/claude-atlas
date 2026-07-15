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
  <li><b>Long conversations cost more per turn</b>, because the whole transcript is re-sent each time. Turn 50 is more expensive than turn 2. <span class="jargon" data-term="prompt-caching">Prompt caching</span> softens the blow — the unchanged prefix is billed at roughly a tenth — but it does not make the transcript shorter.</li>
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

  /* ============================ PART 2 ============================ */
  {
    part: "Part 2 · Claude Code",
    pages: [
      {
        id: "what-is-claude-code",
        num: "2.1",
        title: "What Claude Code is",
        html: `
${VERIFIED}
<p class="lead">You run Claude Code in your terminal. A colleague runs it in VS Code. Someone dispatched a task from their phone and finished it on a laptop. That is one tool, not four.</p>

<p>The name misleads. Claude Code is not a CLI that happens to have integrations — it is an agentic coding tool with several front doors, and the session is shared between them.</p>

<h2>The four surfaces</h2>
<table class="doc">
<thead><tr><th>Surface</th><th>What it adds</th></tr></thead>
<tbody>
<tr><td><b>Terminal</b></td><td>The original. Everything works here first.</td></tr>
<tr><td><b>Desktop app</b><br><small>Code tab, macOS + Windows</small></td><td>Parallel sessions with git isolation, integrated terminal and file editor, visual diff review, side chats, dispatch from your phone.</td></tr>
<tr><td><b>VS Code / JetBrains</b></td><td>Inline diffs, @-mentions of files and line ranges, plan review, and your IDE's own errors fed to Claude automatically.</td></tr>
<tr><td><b>Web</b><br><small>claude.ai/code, research preview</small></td><td>Runs on Anthropic's cloud. Sessions survive closing the browser. Needs GitHub auth to clone and push.</td></tr>
</tbody>
</table>

<h2>One session, many doors</h2>
<div class="mermaid">
flowchart TD
    T["Terminal"] --> S[("Session store<br/>~/.claude/projects/")]
    D["Desktop · Code tab"] --> S
    I["VS Code / JetBrains"] --> S
    W["Web · claude.ai/code"] --> S
    S --> R["Your repo<br/>files, tests, git"]
</div>
<p class="diagram-caption">Sessions are saved continuously as JSONL. Any surface can pick one up.</p>

<p>This is why <code>/teleport</code> exists — it pulls a web session into your terminal. Start something on the train, finish it at your desk.</p>

<div class="callout tip">
  <div class="c-head">💡 The IDE extensions are not a separate product</div>
  <p>The VS Code and JetBrains plugins run the same <code>claude</code> binary. JetBrains literally shells out to it in the IDE terminal. Both expose a hidden built-in MCP server named <code>ide</code> that hands Claude your current selection and your linter's diagnostics — which is most of what makes IDE use feel different.</p>
</div>

<h2>What it actually does</h2>
<p>Given a task, Claude Code reads your files, runs your commands, edits code, and checks its work — looping until done or until it needs you. Every one of those actions is <span class="jargon" data-term="tool-use">tool use</span>. Unlike a <span class="jargon" data-term="workflow">workflow</span>, nobody drew the path in advance: it is an <span class="jargon" data-term="agent">agent</span> in the strict sense, picking its own next step.</p>
<p>That is the whole value and the whole risk, which is why <a href="#core-loop">permission modes</a> exist and why <a href="#core-loop">plan mode</a> is the habit worth building first.</p>

<h2>What it is not</h2>
<ul>
  <li><b>Not autocomplete.</b> It is not competing with tab-completion; it takes whole tasks.</li>
  <li><b>Not <span class="jargon" data-term="cowork">Cowork</span>.</b> Cowork does knowledge work — documents, spreadsheets, research. Claude Code lives in a git checkout.</li>
  <li><b>Not the <span class="jargon" data-term="agent-sdk">Agent SDK</span>.</b> The SDK is this harness packaged as a library for your own apps.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/setup">Setup</a> — platforms and install methods</li>
    <li><a href="https://code.claude.com/docs/en/desktop">The desktop app</a> · <a href="https://code.claude.com/docs/en/claude-code-on-the-web">Claude Code on the web</a></li>
    <li><a href="https://code.claude.com/docs/en/vs-code">VS Code</a> · <a href="https://code.claude.com/docs/en/jetbrains">JetBrains</a></li>
    <li><a href="https://code.claude.com/docs/en/sessions">Sessions</a></li>
  </ul>
</div>
`
      },

      {
        id: "install-auth",
        num: "2.2",
        title: "Install & authenticate",
        html: `
${VERIFIED}
<p class="lead">Fresh machine to first prompt: about five minutes, most of it deciding how you want to pay.</p>

<h2>Install</h2>
<table class="doc">
<thead><tr><th>Platform</th><th>Command</th></tr></thead>
<tbody>
<tr><td>macOS / Linux</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td></tr>
<tr><td>Windows</td><td><code>irm https://claude.ai/install.ps1 | iex</code></td></tr>
<tr><td>Homebrew</td><td><code>brew install --cask claude-code</code></td></tr>
<tr><td>WinGet</td><td><code>winget install Anthropic.ClaudeCode</code></td></tr>
<tr><td>npm</td><td><code>npm install -g @anthropic-ai/claude-code</code> <small>(Node 22+)</small></td></tr>
</tbody>
</table>

<p>The native installer is the default path — it needs no Node. Supported: macOS 13+, Windows 10 (1809+), Ubuntu 20.04+ / Debian 10+ / Alpine 3.19+.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Homebrew does not auto-update Claude Code</div>
  <p>The casks (<code>claude-code</code> stable, <code>claude-code@latest</code>) are pinned by default. If you install via brew, updating is your job — and this tool ships changes weekly.</p>
</div>

<h2>Authenticate</h2>
<p>Two paths that matter for most people:</p>
<ul>
  <li><b>Claude subscription</b> — Pro ($20/mo), Max ($100 or $200/mo), Team, or Enterprise. Run <code>claude</code> and log in. Usage comes out of your plan's shared pool.</li>
  <li><b>Claude Console</b> — pay-as-you-go API billing. Better if you want per-token costs and no weekly caps.</li>
</ul>
<p>Also supported: Amazon Bedrock, Google Vertex, Microsoft Foundry, and gateway setups.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The Free plan does not include Claude Code</div>
  <p>Pro is the entry point. Free covers claude.ai chat, file creation, and skills — not this.</p>
</div>

<h2>Where your credentials live</h2>
<p>macOS keeps them in the Keychain. Linux uses <code>~/.claude/.credentials.json</code> at mode <code>0600</code>. Windows inherits your user profile's permissions.</p>

<h3>Precedence, highest first</h3>
<ol>
  <li>Cloud provider vars (<code>CLAUDE_CODE_USE_BEDROCK</code> / <code>_VERTEX</code> / <code>_FOUNDRY</code>)</li>
  <li><code>ANTHROPIC_AUTH_TOKEN</code></li>
  <li><code>ANTHROPIC_API_KEY</code></li>
  <li><code>apiKeyHelper</code> script</li>
  <li><code>CLAUDE_CODE_OAUTH_TOKEN</code></li>
  <li>Your subscription login</li>
</ol>

<div class="callout tip">
  <div class="c-head">💡 The classic confusion</div>
  <p>A stale exported <code>ANTHROPIC_API_KEY</code> silently outranks the subscription you just logged into — so your usage bills to the API instead of your plan, with no warning. If billing looks wrong, check your environment before anything else.</p>
</div>

<h2>For CI and scripts</h2>
<p><code>claude setup-token</code> mints a one-year OAuth token — the right way to authenticate a pipeline without embedding a personal key. See <a href="#headless-ci">headless &amp; CI</a>.</p>

<h2>When it misbehaves</h2>
<p><code>/doctor</code> runs a setup checkup and fixes what it can. Run it first, before debugging anything else. If a login is close to expiring, recent versions warn you (<code>Your login expires in 3 days · run /login to renew</code>).</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/setup">Setup</a> — every install method</li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — methods, storage, precedence</li>
    <li><a href="https://claude.com/pricing">Pricing</a> — which plans include Claude Code</li>
    <li><a href="https://code.claude.com/docs/en/costs">Costs</a></li>
  </ul>
</div>
`
      },

      {
        id: "core-loop",
        num: "2.3",
        title: "The core loop",
        html: `
${VERIFIED}
<p class="lead">You type "fix the failing test in AccountService". What happens next — and what stops it doing something you didn't want?</p>

<p>Claude explores, plans, asks permission where the rules require it, edits, and verifies. Three controls sit on top of that loop, and they are most of what "using Claude Code well" means.</p>

<h2>1. Plan first, for anything non-trivial</h2>
<p><span class="jargon" data-term="plan-mode">Plan mode</span> makes Claude explore and propose without touching a file. You read the plan, then approve. <b>Shift+Tab</b> cycles into it; <code>/plan</code> does it for one prompt.</p>

<div class="callout tip">
  <div class="c-head">💡 The single highest-leverage habit</div>
  <p>For any change bigger than a one-liner, plan first. Reading a wrong plan costs thirty seconds. Reviewing a wrong diff across nine files costs your afternoon.</p>
</div>

<h2>2. Permission modes decide how much rope</h2>
<p>A <span class="jargon" data-term="permission-mode">permission mode</span> is your standing answer to "what may Claude do without asking?" There are six.</p>
<table class="doc">
<thead><tr><th>Mode</th><th>Claude can…</th></tr></thead>
<tbody>
<tr><td><b>default</b> <small>(shown as Manual)</small></td><td>Read. It asks before anything else.</td></tr>
<tr><td><b>acceptEdits</b></td><td>Edit files and run common filesystem commands without asking.</td></tr>
<tr><td><b>plan</b></td><td>Explore only — no edits at all.</td></tr>
<tr><td><b><span class="jargon" data-term="auto-mode">auto</span></b></td><td>Act freely, with every action screened by a safety classifier.</td></tr>
<tr><td><b>dontAsk</b></td><td>Only what you pre-approved; everything else is denied rather than prompted.</td></tr>
<tr><td><b>bypassPermissions</b></td><td>Everything. Sandbox-only territory.</td></tr>
</tbody>
</table>

<div class="mermaid">
stateDiagram-v2
    [*] --> Manual
    Manual --> acceptEdits: Shift+Tab
    acceptEdits --> Plan: Shift+Tab
    Plan --> Manual: Shift+Tab
    Manual: Manual (default)<br/>reads only, asks for the rest
    acceptEdits: acceptEdits<br/>edits without asking
    Plan: Plan<br/>explores, never edits
</div>
<p class="diagram-caption">Shift+Tab cycles these three. auto, dontAsk and bypassPermissions are set deliberately, not cycled into.</p>

<h3>Auto mode is not "yes to everything"</h3>
<p>It is the interesting one. A classifier screens each action and blocks the genuinely dangerous: piping downloads into a shell, production deploys, mass deletion, force pushes, <code>terraform destroy</code>, IAM changes, sending secrets to external endpoints. It allows local file work, dependency installs, read-only HTTP, and pushes to your own branches.</p>
<p>Some paths are never auto-approved in any mode except <code>bypassPermissions</code>: <code>.git</code>, <code>.claude</code>, shell RC files, <code>.mcp.json</code>, editor configs.</p>

<div class="callout warn">
  <div class="c-head">⚠️ bypassPermissions means what it says</div>
  <p>No classifier, no prompts. Use it in a container you can throw away — not on the machine holding your production credentials.</p>
</div>

<h2>3. Rewind beats arguing</h2>
<p>Claude Code takes <span class="jargon" data-term="checkpoint">checkpoints</span> as it edits. <code>/rewind</code> rolls back the code, the conversation, or both. That last choice matters: rolling back the code while keeping the conversation means Claude remembers what didn't work.</p>

<h2>Sessions persist</h2>
<p>Everything is saved as JSONL under <code>~/.claude/projects/</code>. Useful commands:</p>
<table class="doc">
<thead><tr><th>Command</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>claude -c</code></td><td>Continue the most recent session</td></tr>
<tr><td><code>claude -r</code></td><td>Interactive picker (also <code>/resume</code>)</td></tr>
<tr><td><code>claude --from-pr 42</code></td><td>Resume from a pull request</td></tr>
<tr><td><code>/branch fix-attempt-2</code></td><td>Fork the conversation, keeping the original</td></tr>
<tr><td><code>/rename</code></td><td>Name it so you can find it later</td></tr>
</tbody>
</table>

<h2>Keeping the window clean</h2>
<p><code>/context</code> shows what is eating your <span class="jargon" data-term="context-window">context window</span>. <code>/compact</code> summarises the transcript to reclaim room. <code>/clear</code> starts fresh but keeps project memory.</p>
<p>As <a href="#how-claude-thinks">how Claude thinks</a> argues: when a session goes sideways, <code>/clear</code> and a better prompt usually beats explaining again.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Permission modes</a> — all six, plus the auto-mode classifier rules</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a> · <a href="https://code.claude.com/docs/en/sessions">Sessions</a></li>
    <li><a href="https://code.claude.com/docs/en/commands">Slash commands</a></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context window</a></li>
  </ul>
</div>
`
      },

      {
        id: "claude-directory",
        num: "2.4",
        title: "The .claude directory",
        html: `
${VERIFIED}
<p class="lead">Someone hands you a repo with a <code>.claude/</code> folder. What is in it, and which parts are yours versus the team's?</p>

<p>Everything Claude Code knows about a project lives in two places: a folder in the repo, and a folder in your home directory. That is the whole configuration surface.</p>

<div class="mermaid">
flowchart TD
    subgraph U ["~/.claude/ · you, every project"]
        U1["settings.json"]
        U2["CLAUDE.md"]
        U3["agents/ · skills/ · rules/"]
        U4["projects/ — sessions + auto memory"]
    end
    subgraph P ["./.claude/ · this repo, the team"]
        P1["settings.json — committed"]
        P2["settings.local.json — gitignored"]
        P3["agents/ · skills/ · rules/"]
        P4["../CLAUDE.md"]
        P5["../.mcp.json"]
    end
    U --> M["Merged config<br/>for this session"]
    P --> M
</div>
<p class="diagram-caption">Two roots merge into one effective config. Project settings win over user settings.</p>

<h2>Settings, and who wins</h2>
<table class="doc">
<thead><tr><th>File</th><th>Scope</th><th>Commit it?</th></tr></thead>
<tbody>
<tr><td><code>~/.claude/settings.json</code></td><td>You, everywhere</td><td>n/a</td></tr>
<tr><td><code>./.claude/settings.json</code></td><td>This repo, everyone</td><td><b>Yes</b> — team conventions</td></tr>
<tr><td><code>./.claude/settings.local.json</code></td><td>This repo, this machine</td><td><b>No</b> — gitignore it</td></tr>
<tr><td>Managed settings</td><td>Whole organisation</td><td>Deployed by IT</td></tr>
</tbody>
</table>

<p>Precedence, highest first: <b>Managed → CLI flags → Local → Project → User.</b> Managed settings cannot be overridden, which is the point of them.</p>

<p>Inside a settings file you'll mostly find <code>permissions</code> (allow/deny rules and the default mode), <code>env</code> (environment variables), and <code>hooks</code>.</p>

<h2>The rest of the folder</h2>
<table class="doc">
<thead><tr><th>Path</th><th>What it is</th></tr></thead>
<tbody>
<tr><td><code>CLAUDE.md</code></td><td>Always-loaded instructions. <a href="#memory-rules">Details →</a></td></tr>
<tr><td><code>.claude/rules/*.md</code></td><td>Modular rules, optionally scoped to file globs. <a href="#memory-rules">Details →</a></td></tr>
<tr><td><code>.claude/skills/**/SKILL.md</code></td><td>Loaded on demand. <a href="#skills-commands">Details →</a></td></tr>
<tr><td><code>.claude/agents/*.md</code></td><td>Custom <span class="jargon" data-term="subagent">subagents</span>. <a href="#subagents">Details →</a></td></tr>
<tr><td><code>.claude/output-styles/*.md</code></td><td>Response-style overrides</td></tr>
<tr><td><code>.mcp.json</code> or <code>.claude/mcp.json</code></td><td>Project <span class="jargon" data-term="mcp">MCP</span> servers. <a href="#mcp">Details →</a></td></tr>
<tr><td><code>~/.claude/projects/&lt;project&gt;/</code></td><td>Session JSONL + <span class="jargon" data-term="memory">auto memory</span></td></tr>
<tr><td><code>~/.claude/keybindings.json</code></td><td>Your shortcuts. Hot-reloads.</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The commit rule</div>
  <p>Commit what makes the team faster: <code>CLAUDE.md</code>, project <code>settings.json</code>, shared skills and agents, <code>.mcp.json</code>. Gitignore what is yours alone: <code>settings.local.json</code>, <code>CLAUDE.local.md</code>. Sessions and auto memory never leave your machine anyway.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ .claude is a protected path</div>
  <p>Claude will not auto-approve edits to its own config — same treatment as <code>.git</code> and your shell RC files. A prompt-injected instruction to quietly rewrite your permissions does not get to succeed silently.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/settings">Settings</a> — scopes and precedence</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — CLAUDE.md, rules, auto memory</li>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Permission modes</a> — protected paths</li>
    <li><a href="https://code.claude.com/docs/en/keybindings">Keybindings</a></li>
  </ul>
</div>
`
      },

      {
        id: "memory-rules",
        num: "2.5",
        title: "CLAUDE.md, rules & memory",
        html: `
${VERIFIED}
<p class="lead">Claude keeps writing <code>SELECT Id FROM Account</code> inside a loop. You correct it. Next session, it does it again. Where do you write "we don't do that here" so it sticks?</p>

<p>Four places, with different costs. Picking the wrong one is why people's <code>CLAUDE.md</code> files bloat to 500 lines and stop working.</p>

<h2>CLAUDE.md — always loaded, always billed</h2>
<table class="doc">
<thead><tr><th>File</th><th>Applies to</th></tr></thead>
<tbody>
<tr><td><code>~/.claude/CLAUDE.md</code></td><td>Every project you touch</td></tr>
<tr><td><code>./CLAUDE.md</code></td><td>This repo — commit it, share it</td></tr>
<tr><td><code>./CLAUDE.local.md</code></td><td>This repo, just you — gitignore it</td></tr>
<tr><td>Managed <code>CLAUDE.md</code></td><td>Everyone in the org, deployed by IT</td></tr>
</tbody>
</table>

<p>Files load recursively from your working directory up to the repo root, and nested ones load as Claude reads into those subdirectories. <code>@path/to/file</code> imports another file inline (max 4 hops deep).</p>

<div class="callout warn">
  <div class="c-head">⚠️ Every line of CLAUDE.md is on every single request</div>
  <p>It is the most expensive place to put anything. A 500-line CLAUDE.md is a permanent tax on every turn, and long instruction lists get followed less reliably than short ones. If it isn't true for <i>most</i> requests, it does not belong here.</p>
</div>

<h2>Rules — the better home for specifics</h2>
<p><code>.claude/rules/*.md</code> holds modular rules, and the good part is the frontmatter: a <code>paths</code> glob scopes a rule to matching files.</p>

<pre><code>---
paths:
  - "force-app/**/*.cls"
  - "force-app/**/*.trigger"
---

- Bulkify everything. No SOQL or DML inside loops.
- Query only fields you use.
- New Apex needs a matching test class with meaningful asserts.</code></pre>

<p>That guidance costs nothing until Claude opens an Apex file. Same trick works at <code>~/.claude/rules/</code> for personal preferences across every project.</p>

<h2>Auto memory — what Claude writes to itself</h2>
<p>Claude Code keeps machine-local notes at <code>~/.claude/projects/&lt;project&gt;/memory/</code>. <code>MEMORY.md</code> is an index — the first 200 lines (or 25KB) load at session start. Topic files load only when relevant.</p>
<p>Toggle it with <code>autoMemoryEnabled</code>, relocate it with <code>autoMemoryDirectory</code>, or kill it with <code>CLAUDE_CODE_DISABLE_AUTO_MEMORY=1</code>. <span class="jargon" data-term="subagent">Subagents</span> keep their own.</p>

<h2>Which one do you want?</h2>
<table class="doc">
<thead><tr><th>You want to say…</th><th>Put it in</th></tr></thead>
<tbody>
<tr><td>"Run <code>npm test</code>, not <code>jest</code>"</td><td><code>./CLAUDE.md</code> — true every time</td></tr>
<tr><td>"Never SOQL in a loop"</td><td><code>.claude/rules/apex.md</code> with a paths glob</td></tr>
<tr><td>"I prefer terse answers"</td><td><code>~/.claude/CLAUDE.md</code></td></tr>
<tr><td>"My sandbox alias is <code>dev-sh</code>"</td><td><code>./CLAUDE.local.md</code></td></tr>
<tr><td>"That flaky test needs a retry"</td><td>Let auto memory learn it</td></tr>
</tbody>
</table>

<p><code>/memory</code> opens any of them for editing. <code>/init</code> generates a starting <code>CLAUDE.md</code> by reading your repo — a good first move in a new project.</p>

<div class="callout tip">
  <div class="c-head">💡 A CLAUDE.md that earns its keep</div>
  <p>Commands, conventions, and gotchas — the things a new hire would ask on day one. Not a style guide, not your architecture, not anything Claude can read from the code itself.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — CLAUDE.md hierarchy, imports, rules, auto memory</li>
    <li><a href="https://code.claude.com/docs/en/settings">Settings</a> — autoMemoryEnabled, claudeMdExcludes</li>
    <li><a href="https://code.claude.com/docs/en/commands">/init and /memory</a></li>
  </ul>
</div>
`
      },

      {
        id: "skills-commands",
        num: "2.6",
        title: "Skills & slash commands",
        html: `
${VERIFIED}
<p class="lead">You have explained your deploy checklist to Claude five times this month. Write it once instead.</p>

<p>A <span class="jargon" data-term="skill">skill</span> is a folder with a <code>SKILL.md</code>. Claude loads its one-line description always, and the full contents only when relevant — <span class="jargon" data-term="progressive-disclosure">progressive disclosure</span>. That is the difference from <code>CLAUDE.md</code>, which pays for itself on every request whether you need it or not.</p>

<h2>The format</h2>
<pre><code>---
name: deploy-check
description: Pre-deployment checks for the Salesforce org — run before any sf project deploy.
---

Before deploying, in order:

1. \`sf project deploy start --dry-run\` — no destructive changes unless asked
2. Run the Apex test suite; fail on any coverage below 85%
3. Check for hardcoded IDs in changed metadata
4. List anything touching a managed package one-way door</code></pre>

<p>Drop that at <code>.claude/skills/deploy-check/SKILL.md</code> and it works two ways: type <code>/deploy-check</code>, or just say "I'm about to deploy" and Claude reaches for it.</p>

<h3>Frontmatter worth knowing</h3>
<table class="doc">
<thead><tr><th>Field</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>name</code></td><td>Becomes the <span class="jargon" data-term="slash-command">slash command</span></td></tr>
<tr><td><code>description</code></td><td>The always-in-context line. This is what triggers auto-loading — write it well.</td></tr>
<tr><td><code>disable-model-invocation</code></td><td><code>true</code> = only runs when you type it</td></tr>
<tr><td><code>context</code></td><td><code>inline</code>, <code>fork</code>, or <code>subagent</code></td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The description does all the work</div>
  <p>It is the only part Claude sees until the skill fires. "Deployment stuff" never triggers. "Pre-deployment checks for the Salesforce org — run before any sf project deploy" triggers exactly when it should. Write the trigger condition, not a title.</p>
</div>

<h3>Where a skill runs</h3>
<ul>
  <li><b>inline</b> — in your conversation. Default.</li>
  <li><b>fork</b> — an isolated session; you get the result, not the mess.</li>
  <li><b>subagent</b> — an isolated worker returning a summary. Good for expensive research.</li>
</ul>

<h2>Skills and commands merged</h2>
<div class="callout warn">
  <div class="c-head">⚠️ Two directories, one outcome</div>
  <p><code>.claude/commands/*.md</code> and <code>.claude/skills/**/SKILL.md</code> both produce a slash command. The old <code>commands/</code> folder still works and needs no migration — but <code>SKILL.md</code> is the format to learn. Blog posts describing them as separate systems are out of date.</p>
</div>

<h2>The built-ins worth memorising</h2>
<table class="doc">
<thead><tr><th>Command</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>/init</code></td><td>Generate a starting CLAUDE.md from your repo</td></tr>
<tr><td><code>/plan</code></td><td>Plan before editing</td></tr>
<tr><td><code>/context</code></td><td>See what's eating the context window</td></tr>
<tr><td><code>/compact</code></td><td>Summarise to reclaim room</td></tr>
<tr><td><code>/clear</code></td><td>Fresh start, keeps project memory</td></tr>
<tr><td><code>/rewind</code></td><td>Roll back code and/or conversation</td></tr>
<tr><td><code>/model</code> · <code>/effort</code></td><td>Switch model · set <span class="jargon" data-term="effort">effort</span></td></tr>
<tr><td><code>/code-review</code> · <code>/security-review</code></td><td>Review the diff for bugs · vulnerabilities</td></tr>
<tr><td><code>/btw</code></td><td>Side question without polluting history</td></tr>
<tr><td><code>/doctor</code></td><td>Diagnose your setup</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Deprecated: /output-style</div>
  <p>Deprecated in v2.1.73, <b>removed in v2.1.91</b>. Output styles still exist — manage them through <code>/config</code>.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a> — SKILL.md format and frontmatter</li>
    <li><a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview">Agent Skills overview</a> — the cross-product spec</li>
    <li><a href="https://code.claude.com/docs/en/commands">Slash commands</a></li>
    <li><a href="https://code.claude.com/docs/en/output-styles">Output styles</a> — the removed command</li>
  </ul>
</div>
`
      },

      {
        id: "subagents",
        num: "2.7",
        title: "Subagents & parallel work",
        html: `
${VERIFIED}
<p class="lead">You want to audit 30 LWC components for a deprecated wire adapter. Reading all 30 in one session would burn your context window before Claude reached the tenth.</p>

<p>That is the problem <span class="jargon" data-term="subagent">subagents</span> solve. Each one gets its own <span class="jargon" data-term="context-window">context window</span>, does a job, and returns a summary — not its whole transcript. The mess stays in their window; only the answer comes back to yours.</p>

<div class="mermaid">
flowchart TD
    M["Your session<br/>(the orchestrator)"] --> A["Subagent 1<br/>components 1–10"]
    M --> B["Subagent 2<br/>components 11–20"]
    M --> C["Subagent 3<br/>components 21–30"]
    A --> R["Summaries only<br/>return to your context"]
    B --> R
    C --> R
    R --> M
</div>
<p class="diagram-caption">Three windows' worth of reading, one window's worth of cost.</p>

<h2>The built-ins</h2>
<p><b>Explore</b> discovers a codebase — point it at a question, get back where things live. <b>Plan</b> analyses before editing. Both ship with Claude Code and need no setup.</p>

<h2>Your own</h2>
<p>Drop a Markdown file in <code>.claude/agents/</code> with frontmatter — <code>name</code>, <code>description</code>, <code>model</code>, <code>skills</code>, <code>permissionMode</code>. The <code>model</code> field is the lever people miss: put cheap readers on Haiku 4.5 and keep the orchestrator smart.</p>

<div class="callout tip">
  <div class="c-head">💡 Match the model to the job</div>
  <p>A subagent grepping 30 files is reading, not reasoning. Haiku 4.5 at <code>low</code> <span class="jargon" data-term="effort">effort</span> does it for a fraction of the cost — see <a href="#choosing">choosing a model</a>.</p>
</div>

<h2>How they run</h2>
<table class="doc">
<thead><tr><th>Mode</th><th>Behaviour</th></tr></thead>
<tbody>
<tr><td><b>inline</b></td><td>Shares your context. Cheap, but no isolation.</td></tr>
<tr><td><b>fork</b></td><td>Fresh context, returns a summary. The usual choice.</td></tr>
<tr><td><b>background</b></td><td>Runs while you keep working. Can auto-commit, push, open a PR.</td></tr>
</tbody>
</table>

<p>Subagents can spawn their own, up to five levels deep. <code>/tasks</code> lists what's running; <code>claude agents</code> opens a dedicated view for dispatching and monitoring.</p>

<h2>Worktrees: parallel without collisions</h2>
<p>Two sessions editing one checkout will fight. <span class="jargon" data-term="worktree">Worktrees</span> give each session its own checkout of the same repo, so you can run a refactor and a bugfix at once without either seeing the other's half-finished files.</p>

<h2>The experimental end</h2>
<p><b>Agent teams</b> — multiple coordinated sessions with a shared task list and inter-agent messaging — are disabled by default. <b>Dynamic workflows</b> script many subagents with cross-verification. Both are real; both are moving. Know they exist, don't build your week on them yet.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Subagents are not free</div>
  <p>Each one is a fresh conversation with its own token bill. Fanning out five to answer something a single <code>grep</code> would settle costs more than it saves. Fan out when the work is genuinely parallel and genuinely expensive.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/sub-agents">Subagents</a> — built-ins, custom agents, execution modes</li>
    <li><a href="https://code.claude.com/docs/en/agent-teams">Agent teams</a> (experimental) · <a href="https://code.claude.com/docs/en/workflows">Workflows</a></li>
    <li><a href="https://code.claude.com/docs/en/worktrees">Worktrees</a> · <a href="https://code.claude.com/docs/en/agent-view">Agent view</a></li>
  </ul>
</div>
`
      },

      {
        id: "hooks",
        num: "2.8",
        title: "Hooks",
        html: `
${VERIFIED}
<p class="lead">Your CLAUDE.md says "run Prettier after every edit." Claude does it — usually. On a long session, sometimes not. You want <i>always</i>.</p>

<p>That is the entire case for <span class="jargon" data-term="hook">hooks</span>. An instruction is a request the model interprets. A hook is your code, fired by the harness, every time, whatever the model was thinking about.</p>

<div class="callout tip">
  <div class="c-head">💡 The rule</div>
  <p>If it <i>must</i> happen, make it a hook. If it <i>should usually</i> happen, an instruction is fine. Never write "CRITICAL: YOU MUST ALWAYS…" in CLAUDE.md for something a five-line hook guarantees.</p>
</div>

<h2>When they fire</h2>
<div class="mermaid">
sequenceDiagram
    participant You
    participant CC as Claude Code
    participant H as Your hook
    participant T as Tool
    Note over CC: SessionStart
    You->>CC: A prompt
    Note over CC: UserPromptSubmit
    CC->>H: PreToolUse (Edit)
    H-->>CC: allow / block
    CC->>T: Edit the file
    T-->>CC: done
    CC->>H: PostToolUse (Edit)
    H-->>CC: ran Prettier
    CC-->>You: Response
    Note over CC: Stop
</div>
<p class="diagram-caption">PreToolUse can veto. PostToolUse reacts. Stop fires when the turn ends.</p>

<table class="doc">
<thead><tr><th>Event</th><th>Fires</th></tr></thead>
<tbody>
<tr><td><code>SessionStart</code> / <code>SessionEnd</code></td><td>Session boundaries</td></tr>
<tr><td><code>UserPromptSubmit</code></td><td>You hit enter — before Claude sees it</td></tr>
<tr><td><code>PreToolUse</code></td><td>Before a tool runs. Can block it.</td></tr>
<tr><td><code>PostToolUse</code></td><td>After a tool succeeds</td></tr>
<tr><td><code>Stop</code> / <code>StopFailure</code></td><td>The turn ends / ends badly</td></tr>
</tbody>
</table>

<h2>What a hook can be</h2>
<p>Not just shell scripts: <b>command</b> (a script, JSON on stdin), <b>http</b> (POST to an endpoint), <b>mcp_tool</b> (call an MCP server), <b>prompt</b> (a single-turn LLM call), <b>agent</b> (a subagent).</p>
<p>That <code>prompt</code> type is quietly powerful — "check this diff doesn't log PII" is a judgement call a regex can't make, and now it runs on every edit.</p>

<h2>Targeting</h2>
<p><code>matcher</code> picks the tool: exact (<code>Bash</code>), alternation (<code>Edit|Write</code>), regex (<code>mcp__.*__write</code>), or <code>*</code>. Then <code>if</code> narrows by arguments — <code>if: "Bash(git *)"</code> or <code>if: "Edit(*.ts)"</code>.</p>

<h2>Exit codes are the API</h2>
<table class="doc">
<thead><tr><th>Code</th><th>Means</th></tr></thead>
<tbody>
<tr><td><code>0</code></td><td>Success. JSON on stdout is parsed for extra instructions.</td></tr>
<tr><td><code>2</code></td><td><b>Blocking error.</b> stderr goes to Claude — this is how you veto.</td></tr>
<tr><td>anything else</td><td>Non-blocking error. Logged, work continues.</td></tr>
</tbody>
</table>

<p>JSON output can carry <code>decision</code> (block/continue), <code>reason</code>, <code>systemMessage</code>, and <code>additionalContext</code> — so a hook can inject facts into the conversation, not just police it.</p>

<h2>Worth building</h2>
<ul>
  <li><b>PostToolUse on <code>Edit|Write</code></b> — format, lint, or run the affected test.</li>
  <li><b>PreToolUse on <code>Bash</code></b> with <code>if: "Bash(sf project deploy*)"</code> — exit 2 unless the target org is a sandbox. A hook that has saved someone's afternoon.</li>
  <li><b>SessionStart</b> — inject today's sprint context, or which org you're pointed at.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Hooks run with your permissions</div>
  <p>They are arbitrary code executing on every matching tool call, defined in a file that lives in the repo. Read hooks in a repo you didn't write before you run Claude Code in it — the same care you'd give a <code>Makefile</code> or a git hook.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/hooks">Hooks</a> — events and configuration</li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide</a> — types, matchers, exit codes, output fields</li>
    <li><a href="https://code.claude.com/docs/en/settings">Settings</a> — where hooks are declared</li>
  </ul>
</div>
`
      },

      {
        id: "mcp",
        num: "2.9",
        title: "MCP in Claude Code",
        html: `
${VERIFIED}
<p class="lead">Claude can read your Apex classes. It cannot tell you which fields are actually populated in production, because that lives in your org, not your repo.</p>

<p><span class="jargon" data-term="mcp">MCP</span> closes that gap. An MCP server exposes an external system — your Salesforce org, Jira, a database — as tools Claude can call. Write it once against an open standard; every MCP-speaking client can use it.</p>

<h2>Adding one</h2>
<pre><code>claude mcp add salesforce --transport stdio -- npx -y @some/salesforce-mcp
claude mcp add jira --transport http https://mcp.example.com/jira</code></pre>

<p>Three transports: <b>stdio</b> (a local command — most common), <b>http</b>, and <b>sse</b>. Servers needing OAuth get authorised with <code>claude mcp auth &lt;name&gt;</code>.</p>

<h2>Scopes</h2>
<table class="doc">
<thead><tr><th>Scope</th><th>Lives in</th><th>For</th></tr></thead>
<tbody>
<tr><td><b>local</b></td><td><code>.mcp.json</code></td><td>This project</td></tr>
<tr><td><b>project</b></td><td><code>.claude/mcp.json</code></td><td>This project, committed for the team</td></tr>
<tr><td><b>user</b></td><td><code>~/.claude/.mcp.json</code></td><td>Every project you touch</td></tr>
</tbody>
</table>
<p>First match wins, local to user.</p>

<h2>Why 20 servers don't drown your context</h2>
<p><span class="jargon" data-term="tool-search">Tool search</span> is on by default. Tool <i>names</i> load at session start; the full JSON schemas stay deferred until Claude actually reaches for one. Without it, a handful of rich MCP servers would eat your <span class="jargon" data-term="context-window">context window</span> before you typed anything.</p>
<p><code>/mcp</code> shows connection status, lets you enable and disable servers, manages OAuth, and — usefully — shows the token cost of each one.</p>

<div class="callout tip">
  <div class="c-head">💡 Turn off what you're not using</div>
  <p>Every connected server costs some context. <code>/mcp</code> tells you exactly how much. A server you last used in March is a permanent tax on every request until you disable it.</p>
</div>

<h2>The Salesforce case</h2>
<p>This is where MCP earns its keep for org work. With a Salesforce MCP server, Claude can run SOQL against a sandbox, describe objects, check field-level security, read Apex logs, and run tests — while reading your repo in the same session. "Why does this trigger fail in the sandbox but not locally?" becomes answerable, because Claude can look at both.</p>

<div class="callout warn">
  <div class="c-head">⚠️ An MCP server is code you are trusting</div>
  <p>It runs with your credentials and can act on your systems. A tool description is untrusted input — a malicious server can describe a tool in ways designed to steer the model. Install servers the way you'd install a dependency with production access: from sources you trust. Tools marked <code>requiresUserInteraction</code> always prompt, even when auto-approved.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Claude Code's MCP is local; claude.ai's connectors are not</div>
  <p>Here, a stdio server runs on your machine as your user. On claude.ai, a custom connector is reached from <b>Anthropic's cloud</b> — so it must be internet-reachable. Same protocol, different trust and networking model. Don't carry assumptions across.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/mcp">MCP in Claude Code</a> — adding servers, transports, scopes, OAuth</li>
    <li><a href="https://modelcontextprotocol.io/">Model Context Protocol</a> — the standard itself</li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context window</a> — deferred tool schemas</li>
    <li><a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">Custom connectors on claude.ai</a> — the cloud-side model</li>
  </ul>
</div>
`
      },

      {
        id: "headless-ci",
        num: "2.10",
        title: "Headless & CI",
        html: `
${VERIFIED}
<p class="lead">You want every pull request reviewed for SOQL-in-a-loop before a human looks at it. No terminal, no conversation — just a verdict.</p>

<p><span class="jargon" data-term="headless">Headless mode</span> is Claude Code without the chat: one prompt in, one answer out, structured if you ask.</p>

<pre><code>claude -p "Review the diff for SOQL or DML inside loops. List findings."</code></pre>

<p>It reads stdin too, so <code>git diff | claude -p "review this"</code> works.</p>

<h2>--bare is the flag that matters in CI</h2>
<p>By default Claude Code discovers hooks, skills, plugins, MCP servers, auto memory, and <code>CLAUDE.md</code>. Reproducible? Not remotely — the answer depends on whose machine it ran on.</p>
<p><code>--bare</code> skips all discovery. You then load exactly what you want:</p>
<pre><code>claude -p "$PROMPT" --bare \
  --append-system-prompt-file ./ci/review-rules.md \
  --settings ./ci/settings.json \
  --output-format json</code></pre>

<div class="callout tip">
  <div class="c-head">💡 Use --bare for anything automated</div>
  <p>Without it, a developer adding a skill to their local <code>~/.claude/</code> can change what your pipeline does. <code>--bare</code> also skips OAuth and keychain reads — so authenticate with <code>ANTHROPIC_API_KEY</code> or an <code>apiKeyHelper</code> in JSON settings.</p>
</div>

<h2>Getting structured output</h2>
<table class="doc">
<thead><tr><th>Flag</th><th>Gives you</th></tr></thead>
<tbody>
<tr><td><code>--output-format text</code></td><td>Plain text. Default.</td></tr>
<tr><td><code>--output-format json</code></td><td>Result plus session ID, cost, usage metadata</td></tr>
<tr><td><code>--output-format stream-json</code></td><td>Newline-delimited events, streaming</td></tr>
<tr><td><code>--json-schema</code></td><td>Validates output against your schema; result lands in <code>structured_output</code></td></tr>
</tbody>
</table>

<p><code>--json-schema</code> is what turns "Claude wrote a review" into "the pipeline has a pass/fail and a findings array." It's the difference between a toy and a gate.</p>

<pre><code>COST=$(claude -p "$PROMPT" --output-format json | jq -r '.total_cost_usd')</code></pre>

<h2>Permissions in CI</h2>
<p>Nobody is there to approve anything, so pre-approve precisely:</p>
<pre><code>claude -p "$PROMPT" --allowedTools "Read,Bash(git diff *)" --permission-mode dontAsk</code></pre>
<p><code>dontAsk</code> denies anything not pre-approved rather than hanging on a prompt. The trailing space before <code>*</code> enables prefix matching.</p>

<h2>The shape of it</h2>
<div class="mermaid">
flowchart LR
    A["Pull request<br/>opened"] --> B["GitHub Action"]
    B --> C["claude -p --bare<br/>--json-schema"]
    C --> D{"findings<br/>empty?"}
    D -- Yes --> E["✓ pass"]
    D -- No --> F["Comment on the PR<br/>· fail the check"]
</div>
<p class="diagram-caption">Authenticate with a token from <code>claude setup-token</code>, stored as a repo secret.</p>

<p>Anthropic ship a GitHub Actions integration and a GitLab CI/CD one. Both wrap the same headless binary.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Untrusted input meets your credentials</div>
  <p>A PR from a fork contains code written by a stranger, and your job feeds it to an agent holding your tokens. Treat diff content as hostile: pin <code>--allowedTools</code> to the minimum, never grant write access to a fork-triggered job, and prefer commenting over acting.</p>
</div>

<h2>Continuing a session</h2>
<p><code>--continue</code> resumes the most recent; <code>--resume &lt;id&gt;</code> targets one. Capture the ID with <code>--output-format json | jq -r '.session_id'</code> to chain steps.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/headless">Headless mode</a> — -p, --bare, output formats, JSON schema</li>
    <li><a href="https://code.claude.com/docs/en/github-actions">GitHub Actions</a> · <a href="https://code.claude.com/docs/en/gitlab-ci-cd">GitLab CI/CD</a></li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — claude setup-token</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Permissions</a> — allowedTools syntax</li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ PART 3 ============================ */
  {
    part: "Part 3 · Desktop & Cowork",
    pages: [
      {
        id: "desktop-app",
        num: "3.1",
        title: "The desktop app",
        html: `
${VERIFIED}
<p class="lead">You are reading a Salesforce setup page and want to ask about it. Alt-tab to a browser, describe the screen in words, hope you described it right?</p>

<p>Double-tap Option. The quick entry box appears over whatever you're doing, you click the window you're asking about, and a screenshot of it goes with your question. That interaction is most of why the desktop app exists.</p>

<h2>Three tabs, three modes of working</h2>
<table class="doc">
<thead><tr><th>Tab</th><th>For</th></tr></thead>
<tbody>
<tr><td><b>Chat</b></td><td>What you already know from claude.ai. Same conversations, synced.</td></tr>
<tr><td><b>Cowork</b></td><td>Delegate a whole task and walk away. <a href="#cowork">Part 3.2 →</a></td></tr>
<tr><td><b>Code</b></td><td>Claude Code, with parallel sessions, visual diff review, and an integrated editor. <a href="#what-is-claude-code">Part 2.1 →</a></td></tr>
</tbody>
</table>

<p>Conversations, <span class="jargon" data-term="project">projects</span>, <span class="jargon" data-term="memory">memory</span>, and preferences sync across every device you use.</p>

<h2>Quick entry — the reason to install it</h2>
<p><b>Double-tap Option</b> on a Mac opens a small input over your current app. Rebind it to Option+Space or anything else. Two things make it more than a shortcut:</p>
<ul>
  <li><b>Click a window to attach it.</b> A screenshot of that app goes with your message — no describing, no cropping.</li>
  <li><b>Caps Lock dictates</b>, with live transcription.</li>
</ul>

<h2>Desktop extensions (.mcpb)</h2>
<p>An <span class="jargon" data-term="mcpb">.mcpb file</span> is a local <span class="jargon" data-term="mcp">MCP</span> server bundled for one-click install — a zip with a manifest. The app ships its own Node runtime, so most extensions need no toolchain from you. Node, Python, and binary servers are all supported, and the format is open-sourced.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Renamed: .dxt is now .mcpb</div>
  <p>Desktop Extensions used the <code>.dxt</code> extension; they are now <b>.mcpb</b> (MCP Bundle). Existing <code>.dxt</code> files still work, but anything written today should say <code>.mcpb</code>.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 This is where local MCP servers belong</div>
  <p>Desktop runs MCP servers <b>on your machine</b>, as you. That is the opposite of claude.ai's custom <span class="jargon" data-term="connector">connectors</span>, which Anthropic reaches from their cloud. If a tool needs to touch your filesystem or something behind your VPN, Desktop is the surface — see <a href="#connectors-files">4.5</a>.</p>
</div>

<h2>Platforms</h2>
<p>macOS 11+ and Windows 10+. Linux is in beta — Ubuntu 22.04+ or Debian 12+, via apt or a <code>.deb</code>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Linux beta is missing pieces</div>
  <p>No <span class="jargon" data-term="computer-use">computer use</span> and no dictation. The quick-entry hotkey works on X11 but needs desktop support on Wayland. Cowork on Linux needs KVM hardware virtualisation, roughly 25 GB of disk, and 8 GB of RAM.</p>
</div>

<h2>Claude in Chrome</h2>
<p>The browser extension is not a fourth tab — it is a capability the other surfaces borrow. Cowork and Claude Code both drive the browser through it. Chrome only, and beta on paid plans.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/10065433-install-claude-desktop">Install Claude Desktop</a> — platforms, Linux beta limits</li>
    <li><a href="https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac">Quick entry on Mac</a></li>
    <li><a href="https://support.claude.com/en/articles/12922929-building-desktop-extensions-with-mcpb">Building desktop extensions with MCPB</a></li>
    <li><a href="https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop">Local MCP servers on Desktop</a></li>
    <li><a href="https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome">Claude in Chrome</a></li>
    <li><a href="https://code.claude.com/docs/en/desktop">Claude Code in the desktop app</a></li>
  </ul>
</div>
`
      },

      {
        id: "cowork",
        num: "3.2",
        title: "Cowork",
        html: `
${VERIFIED}
<p class="lead">"Go through this quarter's release notes folder, pull out everything customer-facing, and build me a summary deck." Then close your laptop.</p>

<p>That is <span class="jargon" data-term="cowork">Cowork</span>. You describe an outcome; Claude makes a plan, breaks it into subtasks, runs them — often in parallel — and comes back with finished work. Spreadsheets with working formulas, decks, organised folders.</p>

<div class="callout tip">
  <div class="c-head">💡 What Cowork is actually for</div>
  <p>Anthropic reports <b>over 90% of Cowork usage is not software development</b> — mostly business operations and content creation. If you are reaching for it to write code, you want <a href="#what-is-claude-code">Claude Code</a>.</p>
</div>

<h2>How a task runs</h2>
<div class="mermaid">
flowchart TD
    A["You describe an outcome"] --> B["Claude plans it"]
    B --> C["Splits into subtasks"]
    C --> D1["Subagent"]
    C --> D2["Subagent"]
    C --> D3["Subagent"]
    D1 --> E["Deliverables<br/>.xlsx · .pptx · .docx · files"]
    D2 --> E
    D3 --> E
    E --> F["You review"]
</div>
<p class="diagram-caption">Parallel subagents, each running end to end. You see the result, not the middle.</p>

<h2>Remote by default — and why that matters</h2>
<p>Cowork runs in an isolated, temporary <span class="jargon" data-term="sandbox">sandbox</span> on Anthropic's servers. Work continues with your laptop shut, and sessions sync across devices so you can start on desktop and check from your phone.</p>

<table class="doc">
<thead><tr><th></th><th>Remote session <small>(default)</small></th><th>Local session <small>(desktop only)</small></th></tr></thead>
<tbody>
<tr><td>Runs where</td><td>Ephemeral sandbox on Anthropic infra</td><td>Agent loop native; code in a local VM<br><small>Apple Virtualization.framework / Hyper-V</small></td></tr>
<tr><td>Egress</td><td>Mandatory proxy. Private, internal, and cloud-metadata addresses unreachable.</td><td>Your machine's network</td></tr>
<tr><td>Your local files</td><td>Bridged through the desktop app — <b>only while it is open</b>, with per-call permission checks</td><td>Direct</td></tr>
<tr><td>Live artifacts</td><td>—</td><td>Desktop only</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Remote sessions reach your local files only while the desktop app is open</div>
  <p>Close the app and a remote task loses the bridge to your filesystem. It keeps running — it just cannot see your folders any more. If a task needs local files, leave the app running.</p>
</div>

<h2>Connected folders, not uploads</h2>
<p>On desktop, Claude reads and writes files in folders you have connected. No manual uploading, no downloading results — the deck lands in your folder.</p>

<h2>Permission modes</h2>
<table class="doc">
<thead><tr><th>Mode</th><th>Behaviour</th></tr></thead>
<tbody>
<tr><td><b>Manually approve</b></td><td>You approve each action</td></tr>
<tr><td><b>Automatically approve</b></td><td>Claude screens each action and blocks anything it judges unsafe</td></tr>
<tr><td><b>Skip all approvals</b></td><td>What it says</td></tr>
</tbody>
</table>
<p>Deletions always require explicit permission, in every mode. Connector tokens never enter the sandbox — they are injected outside it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ You remain responsible for what Claude does on your behalf</div>
  <p>Anthropic's own wording. Prompt-injection defences exist — RL training, classifiers, action screening — but a task that reads untrusted content and has permission to act is a real risk surface. Scope the folders and connectors you attach.</p>
</div>

<h2>Projects and memory</h2>
<p>Cowork has <span class="jargon" data-term="project">projects</span> for organising tasks. One wrinkle worth knowing: <b>within Cowork, memory works in projects only</b>, and your chat memory does not carry into Cowork yet.</p>

<h2>Cost</h2>
<p>Cowork consumes more of your allowance than chatting — it is running subagents and executing code. Paid plans only (Pro, Max, Team, Enterprise). Sessions cannot be shared.</p>

<h2>Timeline, if you read conflicting posts</h2>
<p>Research preview 12 January 2026 → GA on macOS and Windows 9 April 2026 → web and mobile beta 7 July 2026, rolling out from Max first.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Claude Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview">Cowork architecture overview</a> — remote vs local, egress, tokens</li>
    <li><a href="https://support.claude.com/en/articles/13364135-use-claude-cowork-safely">Use Claude Cowork safely</a> — permission modes, injection defences</li>
    <li><a href="https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile">Cowork on web, desktop and mobile</a></li>
    <li><a href="https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork">Projects in Cowork</a></li>
    <li><a href="https://claude.com/blog/cowork-web-mobile">Cowork on web and mobile</a> — the &gt;90% statistic</li>
    <li><a href="https://claude.com/blog/the-claude-cowork-product-guide">The Cowork product guide</a></li>
  </ul>
</div>
`
      },

      {
        id: "cowork-practice",
        num: "3.3",
        title: "Plugins, schedules & computer use",
        html: `
${VERIFIED}
<p class="lead">The status report you build every Monday from Jira and Slack. You could describe it to Cowork every week — or teach it once and let it run at 8am while you sleep.</p>

<p>Three features turn Cowork from a clever one-off into something that works when you aren't watching.</p>

<h2>Plugins — capability bundles</h2>
<p>A <span class="jargon" data-term="plugin">plugin</span> packages <span class="jargon" data-term="skill">skills</span>, <span class="jargon" data-term="connector">connectors</span>, and <span class="jargon" data-term="subagent">subagents</span> into one installable thing, sometimes with slash commands and <span class="jargon" data-term="hook">hooks</span>. Install from the <b>Customize</b> menu in the left sidebar → Plugins → Browse.</p>

<p>There's a catalog by function — sales, finance, legal, marketing, HR, engineering, design, operations, data analysis — and a "Plugin Create" for building your own. Available on all paid plans.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Half a plugin greys out in chat</div>
  <p>Plugins work in web chat, the Desktop Chat tab, and Cowork — but <b>hooks and subagents only run in Cowork</b>. Install a plugin and find features greyed out in chat? That's why, and it's expected.</p>
</div>

<h2>Scheduled tasks</h2>
<p>Type <code>/schedule</code> in any Cowork task, or use <b>Scheduled</b> in the sidebar. Cadences: hourly, daily, weekly, weekdays, or manual.</p>

<div class="callout tip">
  <div class="c-head">💡 They run without you</div>
  <p>Scheduled tasks run remotely — <b>with no device online</b>. Your computer can be asleep or the app closed. That is the difference between "a macro I trigger" and "a thing that happens."</p>
</div>

<p>Caveat worth planning around: a scheduled task that needs <i>local</i> files still needs the desktop app open, because that bridge is what reaches your filesystem. Schedule tasks that live in connectors and the sandbox; keep local-file work interactive.</p>

<h2>Computer use</h2>
<p><span class="jargon" data-term="computer-use">Computer use</span> lets Claude drive your actual screen — clicking, typing, opening apps, taking screenshots to navigate. Research preview since 23 March 2026. <b>Pro and Max only</b>; Team and Enterprise do not have access. macOS and Windows desktop.</p>

<h3>It is the last resort, by design</h3>
<p>Claude tries in this order:</p>
<ol>
  <li><b>Connectors</b> — an API is precise and cheap</li>
  <li><b>The browser</b> — via Claude in Chrome</li>
  <li><b>Your screen</b> — only when nothing else can reach it</li>
</ol>
<p>That ordering is the right instinct. Driving a GUI by screenshot is slow and brittle; use it for the legacy desktop app with no API, not for things a connector already does.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Guardrails, and where they stop</div>
  <p>Finance, trading, and crypto apps are off-limits by default, and you can add your own app blocklist. Permission is per app. But an agent with mouse and keyboard on your machine is a broad grant — it is a research preview, and it deserves the caution that implies.</p>
</div>

<h2>Connectors</h2>
<p>Cowork uses your existing MCP connector settings — nothing separate to configure. Work spanning Slack and Google Drive comes back with citations to the files and messages it used.</p>

<h2>Putting it together</h2>
<p>The Monday report: a plugin bundling your Jira and Slack connectors with a skill describing the report's shape, on a weekly <code>/schedule</code>. It runs at 8am from Anthropic's infrastructure whether or not your laptop is open, and the deck is waiting.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/13837440-use-plugins-in-claude">Use plugins in Claude</a> — what they bundle, where they run</li>
    <li><a href="https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork">Schedule recurring tasks in Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork">Let Claude use your computer in Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities">Use connectors to extend Claude's capabilities</a></li>
    <li><a href="https://claude.com/blog/cowork-plugins">Cowork plugins</a></li>
  </ul>
</div>
`
      },

      {
        id: "one-task-three-surfaces",
        num: "3.4",
        title: "One task, three surfaces",
        html: `
${VERIFIED}
<p class="lead">Same task: "Summarise this quarter's release notes for the customer success team." Chat, Cowork, and Claude Code will all attempt it. They produce different things, cost different amounts, and fail differently.</p>

<p>The <a href="#ecosystem-map">ecosystem map</a> gives you the rule. This page is the worked example.</p>

<h2>In chat</h2>
<p>You paste the release notes in, or attach the files. Claude reads them, you steer, and it drafts a summary in the conversation. If you want a deck, it can generate one — file creation runs on all plans.</p>
<p><b>You get:</b> a good draft, fast, with you in the loop every turn.<br>
<b>It costs:</b> the least.<br>
<b>It breaks when:</b> the notes are spread across 40 files in a folder you'd have to attach one by one.</p>

<h2>In Cowork</h2>
<p>You connect the folder and describe the outcome. Claude plans, fans out <span class="jargon" data-term="subagent">subagents</span> across the files, and returns a finished <code>.pptx</code> in your folder. You were making coffee.</p>
<p><b>You get:</b> a deliverable, not a draft.<br>
<b>It costs:</b> noticeably more of your allowance — subagents and code execution.<br>
<b>It breaks when:</b> you actually wanted to shape the argument yourself. Delegation means accepting someone else's judgement calls.</p>

<h2>In Claude Code</h2>
<p>If the release notes are Markdown in a git repo, this is not a stretch — Claude Code reads the repo, greps the history, and writes a summary file with a commit.</p>
<p><b>You get:</b> something version-controlled and reviewable as a diff.<br>
<b>It costs:</b> similar to chat.<br>
<b>It breaks when:</b> the source isn't in a repo. Claude Code is at home in a git checkout and awkward outside one.</p>

<h2>Side by side</h2>
<table class="doc">
<thead><tr><th></th><th>Chat</th><th>Cowork</th><th>Claude Code</th></tr></thead>
<tbody>
<tr><td><b>You are…</b></td><td>in the loop every turn</td><td>away</td><td>reviewing diffs</td></tr>
<tr><td><b>Work lives in</b></td><td>the conversation</td><td>connected folders and apps</td><td>a git repo</td></tr>
<tr><td><b>Output</b></td><td>a draft (+ files if asked)</td><td>finished documents</td><td>committed files</td></tr>
<tr><td><b>Runs when closed?</b></td><td>No</td><td>Yes — remote sessions</td><td>Yes — web / background</td></tr>
<tr><td><b>Cost</b></td><td>$</td><td>$$$</td><td>$$</td></tr>
<tr><td><b>Plans</b></td><td>All, incl. Free</td><td>Paid only</td><td>Paid only</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The tiebreaker</div>
  <p>Ask what you want to be doing while it runs. Thinking alongside it → chat. Something else entirely → Cowork. Reviewing its work like a colleague's PR → Claude Code.</p>
</div>

<h2>The mistake worth naming</h2>
<p>Reaching for Cowork because it sounds the most powerful. It is the most <i>autonomous</i>, which is not the same thing. Autonomy is a cost you pay for not being there — you spend more allowance and you give up the small course-corrections that make chat feel so effective. If you are at your desk anyway, chat often gets you a better answer sooner.</p>

<p>The mirror-image mistake: pasting file after file into chat because that's the surface you know, when the whole job was "read this folder."</p>

<h2>They share one budget</h2>
<p>Every surface draws from the same allowance — a rolling 5-hour session limit, plus weekly caps on paid plans. Choosing a surface is a spending decision. See <a href="#plans-limits">plans &amp; usage limits</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://claude.com/blog/the-claude-cowork-product-guide">The Claude Cowork product guide</a> — Anthropic's own chat vs Cowork vs Code framing</li>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Cowork</a> — including relative usage cost</li>
    <li><a href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude">Create and edit files with Claude</a></li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a></li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ PART 4 ============================ */
  {
    part: "Part 4 · claude.ai",
    pages: [
      {
        id: "projects",
        num: "4.1",
        title: "Projects",
        html: `
${VERIFIED}
<p class="lead">You explain your org's data model at the start of every conversation. Third time this week.</p>

<p>A <span class="jargon" data-term="project">project</span> is a workspace with a knowledge base and its own instructions. Upload the docs once; every conversation in that project starts knowing them.</p>

<h2>What goes in one</h2>
<ul>
  <li><b>Project knowledge</b> — documents, code, specs. Uploaded once, available to every chat inside.</li>
  <li><b>Custom instructions</b> — per-project standing orders. "Answer as a Salesforce architect. Assume the managed package context."</li>
  <li><b>Its own <span class="jargon" data-term="memory">memory</span></b> — each project keeps a separate memory space and summary. See <a href="#memory">4.3</a>.</li>
</ul>

<h2>When the knowledge base gets big</h2>
<p>On paid plans, a project nearing the context limit automatically switches to a retrieval mode, expanding effective capacity <b>up to 10×</b>. Claude searches the knowledge base rather than holding all of it in the <span class="jargon" data-term="context-window">context window</span> at once.</p>

<div class="callout tip">
  <div class="c-head">💡 What that costs you</div>
  <p>Retrieval means Claude sees the <i>relevant parts</i>, not everything. Great for a 200-document reference library. Worse if your question needs connections across documents that no single search surfaces. If precision matters more than breadth, a smaller, curated project beats a giant one.</p>
</div>

<h2>Good projects and bad ones</h2>
<p><b>Good:</b> stable reference material with a clear boundary — your org's architecture docs, a coding-standards set, a client's requirements. Things that are true across many conversations.</p>
<p><b>Bad:</b> a dumping ground. Every document is context Claude has to sift. A project with 300 stale files gives worse answers than one with the 12 that matter.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Projects are not Claude Code's CLAUDE.md</div>
  <p>Same instinct, different surfaces. Project instructions apply to chats on claude.ai; <a href="#memory-rules">CLAUDE.md</a> applies to Claude Code sessions in a repo. And <b>Cowork projects are separate again</b> — Cowork supports memory in projects only, and chat memory does not carry across. Three project-shaped things; do not assume they share state.</p>
</div>

<h2>Sharing</h2>
<p>Projects can be shared, with visibility and member roles you control — useful for a team knowledge base where everyone's chats start from the same footing.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/9517075-what-are-projects">What are projects</a> — knowledge, instructions, the 10× retrieval mode</li>
    <li><a href="https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects">Create and manage projects</a></li>
    <li><a href="https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing">Project visibility and sharing</a></li>
    <li><a href="https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork">Projects in Cowork</a> — the separate one</li>
  </ul>
</div>
`
      },

      {
        id: "artifacts",
        num: "4.2",
        title: "Artifacts",
        html: `
${VERIFIED}
<p class="lead">You ask for a chart of your org's object relationships. It appears in a panel beside the conversation, not as 200 lines of code you have to imagine rendering.</p>

<p>An <span class="jargon" data-term="artifact">artifact</span> is standalone content in its own window — a document, a chart, a working app. Claude iterates on it in place while the conversation continues beside it.</p>

<h2>What they can be</h2>
<ul>
  <li><b>Documents and diagrams</b> — the common case.</li>
  <li><b>Interactive apps</b> — real HTML/JS that runs.</li>
  <li><b>AI-powered artifacts</b> — apps that call Claude themselves. You can build, host, and share a small AI tool without a backend, an API key, or a deploy.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 The one people miss</div>
  <p>AI-powered artifacts mean you can build an internal tool — a "paste an Apex error, get an explanation" widget — and share a link with your team. No hosting, no key management. For prototypes that would otherwise never get built, this is the shortest path there is.</p>
</div>

<h2>Publishing</h2>
<p>Publishing makes an artifact public by link — available on Free, Pro, and Max. There's a curated <b>Inspiration</b> gallery under Artifacts in the sidebar, and you can remix what others published.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Published means public</div>
  <p>Anyone with the link can open it. An artifact built from your org's data, published to share with a colleague, is on the public internet. Check what's baked into it before you publish — and prefer sending a screenshot for anything sensitive.</p>
</div>

<h2>Editing in place</h2>
<p>Since June 2026 you can edit an artifact directly rather than asking Claude to regenerate it. Fixing a typo yourself beats a round trip.</p>

<h2>In Claude Code</h2>
<p>Claude Code can publish session output as an artifact too — useful when the clearest answer to "what did you find?" is a rendered page rather than terminal text.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them">What are artifacts</a></li>
    <li><a href="https://support.claude.com/en/articles/9547008-publish-and-share-artifacts">Publish and share artifacts</a> — public-by-link, the gallery</li>
    <li><a href="https://www.anthropic.com/news/claude-powered-artifacts">Claude-powered artifacts</a> · <a href="https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts">Prototype AI-powered apps</a></li>
    <li><a href="https://code.claude.com/docs/en/artifacts">Artifacts in Claude Code</a></li>
  </ul>
</div>
`
      },

      {
        id: "memory",
        num: "4.3",
        title: "Memory & chat search",
        html: `
${VERIFIED}
<p class="lead">You told Claude you're a Salesforce engineer in March. In July, in a brand-new chat, it still knows.</p>

<p>That is <span class="jargon" data-term="memory">memory</span> on claude.ai — and it is not the same mechanism as <a href="#memory-rules">Claude Code's auto memory</a> or the API's memory tool. Same word, three different things.</p>

<h2>How it works</h2>
<p>Claude summarises your conversations into a synthesis of key insights — your role, your projects, your preferences, how you like to work. It refreshes roughly every 24 hours and gets injected into new standalone chats.</p>

<p>Note what that implies: memory is a <b>periodically-updated summary</b>, not a transcript. Something you said an hour ago may not be in it yet. It is a sketch of you, not a log.</p>

<h2>You can read and edit it</h2>
<p><b>Settings → Capabilities → View and edit memory.</b> This is the part people don't realise: it's not a black box. You can read what Claude thinks it knows, edit it directly, and correct anything wrong.</p>

<div class="callout tip">
  <div class="c-head">💡 Go read your memory once</div>
  <p>If Claude keeps making an assumption you can't place — the wrong tech stack, a project you finished last year — it is probably written down. Two minutes in the editor fixes months of small annoyances.</p>
</div>

<table class="doc">
<thead><tr><th>Control</th><th>Does</th></tr></thead>
<tbody>
<tr><td><b>Pause</b></td><td>Stops recording. Existing memory stays.</td></tr>
<tr><td><b>Reset</b></td><td>Permanent delete.</td></tr>
<tr><td><b>Import / export</b></td><td>Bring memories from another assistant, or back yours up.</td></tr>
</tbody>
</table>

<h2>Project memory is separate</h2>
<p>Each <span class="jargon" data-term="project">project</span> has its own memory space and its own summary. Client work in one project doesn't bleed into another. Useful for consultants and anyone whose contexts should stay apart.</p>

<h2>Incognito chats</h2>
<p>The ghost icon. Not saved to history, doesn't contribute to memory. Available on all plans. The right tool for the one-off question you don't want shaping every future conversation.</p>

<h2>Chat search</h2>
<p>Ask Claude to find previous conversations in plain language — "what did we decide about the trigger framework?" It searches your history. Pairs with memory: memory holds the gist, search finds the specifics.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Three memories, one word</div>
  <p><b>claude.ai memory</b> — summaries of your chats, editable in settings. <b>Claude Code auto memory</b> — machine-local notes per project, in <code>~/.claude/projects/</code>. <b>The memory tool</b> — an API feature writing to a directory you control. Nothing is shared between them. And Cowork supports memory in projects only, with chat memory not carrying across.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context">Chat search and memory</a> — how the synthesis works, editing, incognito</li>
    <li><a href="https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude">Import and export memory</a></li>
    <li><a href="https://code.claude.com/docs/en/memory">Claude Code memory</a> — the different one</li>
  </ul>
</div>
`
      },

      {
        id: "research",
        num: "4.4",
        title: "Research & web search",
        html: `
${VERIFIED}
<p class="lead">"Which Salesforce DevOps tools support this workflow, and what do teams actually say about them?" That is not a search — it's a dozen searches and a synthesis.</p>

<p>Three features overlap here and people pick wrong. The distinction is worth two minutes.</p>

<h2>Web search vs extended thinking vs Research</h2>
<table class="doc">
<thead><tr><th>Use</th><th>When</th></tr></thead>
<tbody>
<tr><td><b>Web search</b></td><td>You need a current fact. Toggle on, get a cited answer. All plans.</td></tr>
<tr><td><b>Extended thinking</b></td><td>Hard reasoning over what Claude already knows. No lookup.</td></tr>
<tr><td><b>Research</b></td><td>An open question needing many sources, gathered and reconciled into a report.</td></tr>
</tbody>
</table>

<p>Anthropic publish their own guidance on choosing between them — it's linked below and worth reading once.</p>

<h2>How Research runs</h2>
<div class="mermaid">
sequenceDiagram
    participant You
    participant C as Claude
    participant W as The web / your apps
    You->>C: An open question
    Note over C: Plan: decompose into<br/>lines of enquiry
    C->>W: Many searches, in parallel
    W-->>C: Sources
    Note over C: Read, reconcile,<br/>follow up on gaps
    C->>W: Follow-up searches
    W-->>C: More sources
    C-->>You: Report with citations
</div>
<p class="diagram-caption">It is agentic: Claude decides what to look up next based on what it found.</p>

<p>Enable it from the <b>+</b> menu → Research. It needs web search on. Listed under Pro on the pricing page.</p>

<h2>Research over your own stuff</h2>
<p>With the Google Workspace integration, Research can draw on Gmail, Calendar, and Docs alongside the web. "What did we agree with this client, and what has changed in the product since?" spans both — and that combination is where it earns its keep.</p>

<div class="callout tip">
  <div class="c-head">💡 Judge it by the citations</div>
  <p>Every claim links its source. That's the feature — not the prose. Skim the citations first: if they're thin, the report is confident-sounding and unreliable. A cited report you can audit beats a fluent one you can't.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Research is not cheap</div>
  <p>It runs many searches and reads a lot. On a subscription that comes out of the same allowance as everything else. Use it for questions that genuinely need a dozen sources — not for "what's the syntax for a Flow formula."</p>
</div>

<h2>Web search itself</h2>
<p>Toggleable, cited, available globally on all plans including Free. When Claude answers from search it tells you where it looked — so you can check.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/11088861-use-research-on-claude">Use Research</a> · <a href="https://support.claude.com/en/articles/11106443-using-research">Using Research</a></li>
    <li><a href="https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research">When to use web search, extended thinking, and Research</a></li>
    <li><a href="https://support.claude.com/en/articles/11101545-using-research-and-google-workspace">Research and Google Workspace</a></li>
    <li><a href="https://support.claude.com/en/articles/10684626-enable-and-use-web-search">Enable and use web search</a></li>
  </ul>
</div>
`
      },

      {
        id: "connectors-files",
        num: "4.5",
        title: "Skills, connectors & files",
        html: `
${VERIFIED}
<p class="lead">"Build me a spreadsheet of these 200 records with a pivot and a chart." Claude writes Python, runs it, and hands you an .xlsx. On the free plan.</p>

<p>Three capabilities turn chat from a text box into something that produces work. All three live under <b>Customize</b>, which since May 2026 is one directory for skills, connectors, and plugins.</p>

<h2>File creation</h2>
<p>Claude runs code in an isolated, sandboxed container to produce real files: <code>.xlsx</code> with working formulas, <code>.pptx</code>, <code>.docx</code>, PDFs, scripts, images. Up to 30 MB per file. <b>All plans, including Free.</b> Toggle it in Settings → Capabilities.</p>

<div class="callout tip">
  <div class="c-head">💡 This is also how Claude does maths properly</div>
  <p>Asked to analyse numbers, Claude can compute them rather than predict them. "What's the median?" answered by running code is a different reliability class from one answered from a language model's intuition. If precision matters, ask it to calculate.</p>
</div>

<h2>Skills</h2>
<p><span class="jargon" data-term="skill">Skills</span> are folders of instructions and optional scripts that Claude loads when relevant. Four kinds:</p>
<ul>
  <li><b>Anthropic's</b> — Excel, Word, PowerPoint, PDF. The reason generated files look properly made.</li>
  <li><b>Custom</b> — yours. Markdown, plus scripts if needed.</li>
  <li><b>Partner</b> — Notion, Figma, Atlassian, and others.</li>
  <li><b>Organisation-provisioned</b> — on Team and Enterprise.</li>
</ul>
<p>Available on all tiers where code execution is enabled. Same <code>SKILL.md</code> format as <a href="#skills-commands">Claude Code skills</a> — an open spec, so a skill can travel between surfaces.</p>

<h2>Connectors</h2>
<p>A <span class="jargon" data-term="connector">connector</span> is a hosted <span class="jargon" data-term="mcp">MCP</span> server you toggle on. The Connectors Directory splits them into Anthropic-verified and community. Google Workspace (Gmail, Calendar, Drive) is available to all users.</p>
<p>Gmail is read-only with draft creation — Claude can write a reply but not send it. Answers cite the files and messages they came from, and connector data isn't used for training.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Custom connectors run from Anthropic's cloud, not your machine</div>
  <p>The single most misunderstood thing here. Add a custom connector by URL and <b>Anthropic's infrastructure</b> connects to it — from every client, including the Desktop app. Your MCP server must be reachable from Anthropic's IP ranges. It cannot be on localhost or behind your VPN.</p>
  <p>For a local server, you want <a href="#desktop-app">Desktop extensions</a> or <a href="#mcp">Claude Code's MCP</a>. Same protocol; opposite networking model.</p>
</div>

<h2>Picking between them</h2>
<table class="doc">
<thead><tr><th>You want Claude to…</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Follow your process reliably</td><td>A <b>skill</b></td></tr>
<tr><td>Reach a system it can't see</td><td>A <b>connector</b></td></tr>
<tr><td>Produce a real file</td><td><b>File creation</b> — already on</td></tr>
<tr><td>All three, packaged</td><td>A <b><span class="jargon" data-term="plugin">plugin</span></b> (Cowork)</td></tr>
</tbody>
</table>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude">Create and edit files</a> — the sandbox, formats, limits</li>
    <li><a href="https://support.claude.com/en/articles/12512176-what-are-skills">What are skills</a></li>
    <li><a href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities">Use connectors</a> · <a href="https://support.claude.com/en/articles/11596036-anthropic-connectors-directory-faq">Connectors Directory FAQ</a></li>
    <li><a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">Custom connectors via remote MCP</a> — the cloud-side model</li>
    <li><a href="https://support.claude.com/en/articles/10166901-use-google-workspace-connectors">Google Workspace connectors</a></li>
    <li><a href="https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory">The unified Customize directory</a></li>
  </ul>
</div>
`
      },

      {
        id: "plans-limits",
        num: "4.6",
        title: "Plans & usage limits",
        html: `
${VERIFIED}
<p class="lead">It's Thursday afternoon and Claude says you've hit your weekly limit. What actually ran you out?</p>

<p>Probably not what you think. The limits are simple once you see them; the surprise is that everything shares one budget.</p>

<h2>The plans</h2>
<table class="doc">
<thead><tr><th>Plan</th><th>Price</th><th>Gets you</th></tr></thead>
<tbody>
<tr><td><b>Free</b></td><td>$0</td><td>Chat, file creation, skills, web search, memory. <b>No Claude Code, no Cowork.</b></td></tr>
<tr><td><b>Pro</b></td><td>$20/mo<br><small>$17 billed annually</small></td><td>≥5× Free usage. Claude Code, Cowork, Research, Design, Science.</td></tr>
<tr><td><b>Max 5×</b></td><td>$100/mo</td><td>5× Pro usage</td></tr>
<tr><td><b>Max 20×</b></td><td>$200/mo</td><td>20× Pro usage, higher output limits, early access to new features</td></tr>
</tbody>
</table>
<p>Team and Enterprise exist above these; this site doesn't cover their administration.</p>

<h2>Two limits, stacked</h2>
<ul>
  <li><b>A rolling 5-hour session limit</b> — every plan.</li>
  <li><b>Weekly limits</b> — paid plans, resetting at a fixed time for your account.</li>
</ul>
<p>The weekly reset shows two numbers: one for <b>Opus</b> specifically, and one for all other models. So heavy Opus use can wall you off from Opus while leaving Sonnet available.</p>
<p><b>Settings → Usage</b> shows progress bars. Look there before guessing.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Every surface spends the same budget</div>
  <p>Anthropic's wording: usage of all Claude surfaces — claude.ai, Claude Code, Claude Desktop — counts toward the same limit. The Thursday wall is usually a long Claude Code session, not your chats. And <a href="#cowork">Cowork</a> costs noticeably more than chatting.</p>
</div>

<h2>What actually burns it</h2>
<ul>
  <li><b>Model choice.</b> Fable 5 drains fastest, then Opus, then Sonnet, then Haiku. See <a href="#choosing">choosing a model</a>.</li>
  <li><b>Conversation length.</b> The whole transcript is re-sent every turn — turn 50 costs far more than turn 2. See <a href="#how-claude-thinks">how Claude thinks</a>.</li>
  <li><b>Agentic work.</b> Cowork tasks, subagents, and Research run many turns you never see.</li>
  <li><b><span class="jargon" data-term="effort">Effort</span>.</b> Thinking tokens bill as output — the 5×-priced kind.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 How to not hit the wall</div>
  <p>Default to Sonnet 5 and raise <span class="jargon" data-term="effort">effort</span> when a task needs it, rather than defaulting to the biggest model. <code>/clear</code> between unrelated tasks instead of letting one session run all day. Save Opus for work that's actually hard. That is usually the whole fix.</p>
</div>

<h2>Usage credits</h2>
<p>Paid plans can buy <span class="jargon" data-term="usage-credits">usage credits</span> for extra capacity — also how you reach Fable 5 beyond your included allocation.</p>

<h2>Context windows on a plan</h2>
<p>On paid plans the newest models offer up to a 1M-token <span class="jargon" data-term="context-window">context window</span>; others are 500K or 200K. Automatic <span class="jargon" data-term="compaction">context management</span> summarises older messages when you approach the limit, so long chats continue rather than stopping.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://claude.com/pricing">Pricing</a> — the plan matrix</li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a> — one pool, context windows</li>
    <li><a href="https://support.claude.com/en/articles/9797557-usage-limit-best-practices">Usage limit best practices</a> — the 5-hour and weekly limits</li>
    <li><a href="https://support.claude.com/en/articles/8325606-what-is-the-pro-plan">What is the Pro plan</a> · <a href="https://support.claude.com/en/articles/11049741-what-is-the-max-plan">What is the Max plan</a></li>
    <li><a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a></li>
    <li><a href="https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan">Claude Code on Pro or Max</a></li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ PART 5 ============================ */
  {
    part: "Part 5 · Recipes",
    pages: [
      {
        id: "recipe-lwc",
        num: "5.1",
        title: "Ship an LWC feature",
        html: `
${VERIFIED}
<p class="lead">"Build a datatable LWC that shows Opportunities with server-side pagination, sortable columns, and an inline owner filter." Four files, an Apex controller, and a test class. Where do you start?</p>

<p>Not by typing that prompt and hoping. This recipe is the shape of a session that reliably lands: <b>set up once, plan first, implement in a tighter mode, verify with your own tools.</b></p>

<h2>Setup: a CLAUDE.md that earns its place</h2>
<p>Written once, in the repo root. Commands and conventions only — the things a new hire asks on day one.</p>

<pre><code># RocketPhone SFDX

## Commands
- Deploy to sandbox: sf project deploy start --target-org dev
- Dry run first: sf project deploy start --dry-run --target-org dev
- Apex tests: sf apex run test --target-org dev --wait 10
- LWC tests: npm run test:unit

## Conventions
- LWC lives in force-app/main/default/lwc
- Apex controllers are @AuraEnabled(cacheable=true) unless they mutate
- Every Apex method gets a test with meaningful asserts, not just coverage
- Never commit .env or org credentials</code></pre>

<p>Apex-specific guidance does <i>not</i> go here — it goes in a scoped rule, so it costs nothing until Claude opens an Apex file:</p>

<pre><code>---
paths:
  - "force-app/**/*.cls"
  - "force-app/**/*.trigger"
---

- Bulkify everything. No SOQL or DML inside loops.
- Query only the fields you use.
- Respect sharing: "with sharing" unless there is a documented reason not to.</code></pre>

<p>That is <a href="#memory-rules">2.5</a> in practice: always-true things in <code>CLAUDE.md</code>, file-specific things in <code>.claude/rules/</code>.</p>

<h2>The session</h2>
<div class="mermaid">
sequenceDiagram
    participant You
    participant C as Claude Code
    participant SF as sf CLI / org
    You->>C: Shift+Tab → plan mode, then the request
    C->>C: Reads existing LWCs, the object model
    C-->>You: A plan: 4 files, controller, tests
    You->>C: Corrects one assumption, approves
    Note over C: Shift+Tab → acceptEdits
    C->>C: Writes component + Apex + tests
    C->>SF: sf apex run test
    SF-->>C: 1 failure
    C->>C: Fixes, re-runs
    SF-->>C: Pass
    C-->>You: Done — review the diff
</div>
<p class="diagram-caption">The correction happens against a plan, not against nine written files.</p>

<h3>1. Plan mode, always</h3>
<p><b>Shift+Tab</b> into <span class="jargon" data-term="plan-mode">plan mode</span>, then describe the feature. Claude explores your existing components and object model without touching anything, then proposes.</p>
<p>This is where you catch "it's going to build a new Apex controller when <code>OpportunityListController</code> already does 80% of this." Thirty seconds of reading versus an afternoon of reviewing.</p>

<div class="callout tip">
  <div class="c-head">💡 The plan is the cheapest place to be wrong</div>
  <p>A wrong plan costs one paragraph of correction. A wrong implementation costs a diff review, a rollback, and the context you both burned getting there.</p>
</div>

<h3>2. Approve into acceptEdits</h3>
<p>When you approve a plan, pick the mode it continues in. <code>acceptEdits</code> is the sweet spot for this work: Claude writes files without prompting on each one, but you are still in the loop for anything beyond the filesystem.</p>

<h3>3. Let it run your tests</h3>
<p>Because <code>CLAUDE.md</code> names the commands, Claude runs <code>sf apex run test</code> and <code>npm run test:unit</code> itself, reads the failures, and fixes them. This is the part that feels like magic and is really just "you told it how."</p>

<h3>4. Review before you commit</h3>
<p><code>/code-review</code> reads the diff for bugs and cleanups. It is not a substitute for your eyes — it is a first pass that catches the boring things so your review can be about the design.</p>

<h2>When it goes sideways</h2>
<p>Claude misunderstands the object model and starts fixing symptoms. You explain again. It half-fixes. You explain again.</p>
<p><b>Stop.</b> <code>/rewind</code> the code back and keep the conversation — Claude keeps what it learned without the broken files. Or <code>/clear</code> and start over with a prompt containing what you just learned. As <a href="#how-claude-thinks">0.3</a> argues: you are fighting a cluttered <span class="jargon" data-term="context-window">context window</span>, not a stupid model.</p>

<h2>What to steal</h2>
<ul>
  <li><b>Commands in CLAUDE.md.</b> Everything else follows from Claude being able to run your tests.</li>
  <li><b>Apex rules in <code>.claude/rules/</code> with a paths glob</b>, not in CLAUDE.md.</li>
  <li><b>Plan mode for anything multi-file.</b> Non-negotiable.</li>
  <li><b>Sonnet 5 for this.</b> Patterned work — save Opus for the hard debugging. See <a href="#choosing">1.2</a>.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Permission modes</a> — plan mode, acceptEdits</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — CLAUDE.md and rules with paths globs</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a> — /rewind</li>
    <li><a href="https://code.claude.com/docs/en/commands">Slash commands</a> — /code-review</li>
  </ul>
</div>
`
      },

      {
        id: "recipe-impact",
        num: "5.2",
        title: "Apex impact analysis",
        html: `
${VERIFIED}
<p class="lead">Someone asks you to rename a picklist value on a managed-package object. You know the answer is "it depends" and you know finding out takes two hours of clicking through Setup.</p>

<p>This recipe teaches Claude to do that scan — and the interesting part is that it needs <b>two</b> things your repo alone cannot give it: a written-down checklist, and live access to the org.</p>

<h2>Why the repo isn't enough</h2>
<p>Your repo knows about Apex, LWC, and metadata you've retrieved. It does not know which Reports filter on that value, which Flows branch on it, whether a subscriber org depends on it, or whether any records actually use it. That lives in the org.</p>

<div class="mermaid">
flowchart TD
    A["Proposed change:<br/>rename a picklist value"] --> B["Skill: the checklist"]
    B --> C["Repo scan<br/>grep Apex · LWC · metadata"]
    B --> D["Org scan via MCP<br/>Flows · Reports · dependencies"]
    C --> E["Risk report"]
    D --> E
    E --> F{"Managed package<br/>one-way door?"}
    F -- Yes --> G["Stop. Escalate."]
    F -- No --> H["Proceed with a plan"]
</div>
<p class="diagram-caption">Two sources, one report. Neither half is sufficient alone.</p>

<h2>Part 1 — the checklist as a skill</h2>
<p>Put your expertise where Claude can load it on demand. <code>.claude/skills/impact-analysis/SKILL.md</code>:</p>

<pre><code>---
name: impact-analysis
description: Assess the blast radius of a Salesforce metadata change (field, picklist value, Apex method, LWC @api property) before it ships. Use whenever someone proposes renaming, deleting, or changing the type of existing metadata.
---

Work through all of these. Report findings even when uncertain — a false
positive costs a minute; a missed dependency costs a release.

## In the repo
1. grep Apex, triggers, LWC, Aura for the API name and the literal value
2. Check test classes that assert on it
3. Check custom metadata and static resources

## In the org (requires the Salesforce MCP server)
4. Query dependencies via the Tooling API
5. Flows and Process Builders that reference it
6. Reports and list views that filter on it
7. Validation rules and formula fields
8. Whether records actually use the value

## One-way doors — stop and escalate
- Anything in a managed package that subscribers depend on
- Field type changes with existing data
- API-name changes on anything integrated externally

## Output
A table: what references it, where, and how it breaks. Then a verdict:
safe / needs migration / do not do this.</code></pre>

<div class="callout tip">
  <div class="c-head">💡 The description is the trigger</div>
  <p>That long <code>description</code> is doing real work — it is the only part in <span class="jargon" data-term="context-window">context</span> until the skill fires. "Impact analysis stuff" would never trigger. Naming the situations ("renaming, deleting, or changing the type") makes it fire exactly when it should. See <a href="#skills-commands">2.6</a>.</p>
</div>

<h2>Part 2 — the org, via MCP</h2>
<p>A Salesforce <span class="jargon" data-term="mcp">MCP</span> server gives Claude tools to query your org: run SOQL, describe objects, read metadata, check dependencies. Salesforce publish an official one — <a href="https://github.com/salesforcecli/mcp"><code>salesforcecli/mcp</code></a>, the DX MCP Server. It runs locally against your existing SF CLI credentials, and it <b>requires</b> you to name the orgs it may touch:</p>

<pre><code>claude mcp add salesforce --transport stdio -- \\
  npx -y @salesforce/mcp --orgs my-dev-sandbox</code></pre>

<p>Once connected, <code>/mcp</code> shows its status and what it costs you in context. See <a href="#salesforce-setup">6.5</a> for the setup in full — including why this is <i>not</i> the same product as Salesforce's Hosted MCP.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Point it at a sandbox</div>
  <p>An MCP server runs with your credentials and can act on your org. For read-only analysis this is safe enough, but the same connection that runs a SELECT can run a DELETE if a tool exposes one. Authenticate against a sandbox, and reach for <code>dontAsk</code> or explicit <code>allowedTools</code> if you want a hard floor under it. See <a href="#mcp">2.9</a>.</p>
</div>

<h2>Running it</h2>
<p>"I need to rename the <code>Status__c</code> picklist value 'Pending' to 'Awaiting Review'. What breaks?"</p>
<p>Claude loads the skill because your description matched, greps the repo, queries the org through MCP, and returns the table. Use <b>Opus 4.8</b> here — this is diagnostic reasoning across sparse evidence, exactly the work it is best at.</p>

<div class="callout warn">
  <div class="c-head">⚠️ This is a first pass, not a sign-off</div>
  <p>A dependency scan finds what it can see. Dynamic SOQL built from strings, an integration referencing the API name from outside your org, a hardcoded value in a Flow someone built last year — Claude will miss things a scan cannot reach. Treat the output as a strong starting list, not a guarantee. The verdict is still yours.</p>
</div>

<h2>What to steal</h2>
<ul>
  <li><b>Encode the checklist you already run.</b> A skill is your expertise, written once.</li>
  <li><b>Repo + org together.</b> Either alone gives a confidently incomplete answer.</li>
  <li><b>Name the one-way doors explicitly.</b> Managed-package breakage is the one that ends careers.</li>
  <li><b>Ask for uncertain findings.</b> Tell it to report low-confidence hits — you filter, it shouldn't.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a> — SKILL.md and the description-as-trigger</li>
    <li><a href="https://code.claude.com/docs/en/mcp">MCP in Claude Code</a> — adding servers, scopes, /mcp</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/choosing-a-model">Choosing a model</a></li>
    <li><a href="https://code.claude.com/docs/en/permissions">Permissions</a> — allowedTools</li>
  </ul>
</div>
`
      },

      {
        id: "recipe-ci",
        num: "5.3",
        title: "PR review in CI",
        html: `
${VERIFIED}
<p class="lead">Every PR should get checked for SOQL in a loop, hardcoded IDs, and missing null guards before a human spends attention on it. PMD catches some of it. The rest needs judgement.</p>

<p>This recipe runs Claude Code <span class="jargon" data-term="headless">headless</span> in GitHub Actions and turns its output into a gate — pass or fail, with findings.</p>

<div class="mermaid">
flowchart LR
    A["PR opened"] --> B["GitHub Action"]
    B --> C["git diff"]
    C --> D["claude -p --bare<br/>--json-schema"]
    D --> E{"findings<br/>empty?"}
    E -- Yes --> F["✓ check passes"]
    E -- No --> G["Comment findings<br/>· fail the check"]
</div>
<p class="diagram-caption">The schema is what makes this a gate rather than a wall of prose.</p>

<h2>1. A token</h2>
<p><code>claude setup-token</code> mints a one-year OAuth token. Store it as a repo secret. Do not use your personal API key.</p>

<h2>2. The schema — the load-bearing part</h2>
<p>Without it you get an essay. With it you get something a pipeline can branch on.</p>

<pre><code>{
  "type": "object",
  "properties": {
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "file":       { "type": "string" },
          "line":       { "type": "integer" },
          "severity":   { "type": "string", "enum": ["high", "medium", "low"] },
          "rule":       { "type": "string" },
          "why":        { "type": "string" }
        },
        "required": ["file", "line", "severity", "rule", "why"]
      }
    },
    "verdict": { "type": "string", "enum": ["pass", "fail"] }
  },
  "required": ["findings", "verdict"]
}</code></pre>

<h2>3. The workflow</h2>
<pre><code>name: Claude review
on: pull_request

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }

      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: Review the diff
        env:
          CLAUDE_CODE_OAUTH_TOKEN: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
        run: |
          git diff origin/\${{ github.base_ref }}...HEAD > /tmp/diff.patch
          claude -p "Review the diff in /tmp/diff.patch against ci/review-rules.md.
                     Report every finding, including uncertain ones." \\
            --bare \\
            --allowedTools "Read" \\
            --permission-mode dontAsk \\
            --json-schema ./ci/review-schema.json \\
            --output-format json > /tmp/result.json

      - name: Gate
        run: |
          jq -r '.structured_output.findings[] |
                 "\\(.file):\\(.line) [\\(.severity)] \\(.rule) — \\(.why)"' /tmp/result.json
          test "$(jq -r '.structured_output.verdict' /tmp/result.json)" = "pass"</code></pre>

<div class="callout tip">
  <div class="c-head">💡 --bare is what makes this reproducible</div>
  <p>Without it, Claude Code discovers hooks, skills, plugins, MCP servers, and CLAUDE.md — so your pipeline's behaviour depends on whatever a developer last added locally. <code>--bare</code> skips all discovery; you load exactly what you list. See <a href="#headless-ci">2.10</a>.</p>
</div>

<h2>4. The rules file</h2>
<p><code>ci/review-rules.md</code> holds the Salesforce-specific bar — SOQL and DML in loops, hardcoded IDs, missing null checks on SOQL results, <code>with sharing</code> omissions, tests that assert nothing. Keep it in the repo so it reviews in PRs like any other code.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Tell it to report everything; filter afterwards</div>
  <p>Ask for "only high-severity issues" and current models take you at your word — they find the bugs, judge them below your bar, and stay quiet. Measured recall drops even though bug-finding improved. Ask for every finding with a severity attached, then filter in <code>jq</code>. Filtering is a pipeline's job, not a judgement call you delegate.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ A fork PR is code from a stranger</div>
  <p>This job feeds untrusted content to an agent holding your token. <code>--allowedTools "Read"</code> and <code>dontAsk</code> are not paranoia — they are the floor. Never give a fork-triggered job write access, and prefer commenting over acting. Treat the diff as hostile input, because occasionally it is.</p>
</div>

<h2>What to steal</h2>
<ul>
  <li><b><code>--json-schema</code>.</b> The difference between a bot that talks and a check that gates.</li>
  <li><b><code>--bare</code> everywhere automated.</b> Reproducibility is not optional in CI.</li>
  <li><b>Rules in the repo</b>, reviewed like code.</li>
  <li><b>Report-everything-filter-later.</b> Do not delegate the severity bar.</li>
  <li><b>Minimum tools.</b> <code>Read</code> is usually all a reviewer needs.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/headless">Headless mode</a> — -p, --bare, --json-schema, output formats</li>
    <li><a href="https://code.claude.com/docs/en/github-actions">GitHub Actions</a> · <a href="https://code.claude.com/docs/en/gitlab-ci-cd">GitLab CI/CD</a></li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — claude setup-token</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Permissions</a> — allowedTools, dontAsk</li>
  </ul>
</div>
`
      },

      {
        id: "staying-current",
        num: "5.4",
        title: "Staying current",
        html: `
${VERIFIED}
<p class="lead">Everything on this site has a shelf life. Three pages here carry dates that expire within a month of being written. That is not a flaw in the writing — it is the subject.</p>

<p>In the twelve months to July 2026 Anthropic shipped a new model family, renamed an SDK, replaced how thinking is configured, retired six models, and launched a second product surface. Any static understanding of this ecosystem decays in weeks.</p>

<h2>Three feeds, and only three</h2>
<table class="doc">
<thead><tr><th>Feed</th><th>Covers</th></tr></thead>
<tbody>
<tr><td><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a></td><td>claude.ai, Desktop, Cowork. <b>The single best one</b> if you read only one.</td></tr>
<tr><td><a href="https://code.claude.com/docs/en/changelog">Claude Code changelog</a></td><td>The CLI. Moves fastest — versions ship most weeks.</td></tr>
<tr><td><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a></td><td>The authoritative retirement table. The one that breaks code.</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 Skip the newsletters</div>
  <p>Secondary coverage is where stale patterns come from — a post from March describing <code>budget_tokens</code> as current reads exactly like one from July. The three feeds above are primary sources and take fifteen minutes a month between them.</p>
</div>

<h2>The monthly sweep</h2>
<p>Once a month, ~20 minutes:</p>
<ol>
  <li><b>Read the three feeds</b> since your last sweep.</li>
  <li><b>Ask what changed for you</b> — not everything matters. A new Cowork plugin category is noise if you don't use Cowork.</li>
  <li><b>Patch what's affected</b> and bump that page's verified date.</li>
  <li><b>Check the expiry list</b> below.</li>
</ol>

<p>This is itself a Claude Code task. A skill holding the three URLs and the diff-what-changed instruction, on a <code>/loop</code> or a scheduled run, turns "I should keep up" into something that happens.</p>

<h2>Known expiries</h2>
<p>Dated things this site already knows are coming. When you read this, check them off:</p>
<table class="doc">
<thead><tr><th>Date</th><th>What</th><th>Affects</th></tr></thead>
<tbody>
<tr><td><b>21 Jul 2026</b></td><td><code>claude-mythos-preview</code> retires → <code>claude-mythos-5</code></td><td><a href="#lineup">1.1</a></td></tr>
<tr><td><b>24 Jul 2026</b></td><td>Opus 4.7 fast mode <b>removed</b></td><td><a href="#thinking-effort">1.3</a></td></tr>
<tr><td><b>3 Aug 2026</b></td><td>Claude in Slack → Claude Tag cutover</td><td><a href="#ecosystem-map">0.2</a>, <a href="#stale-patterns">1.4</a></td></tr>
<tr><td><b>5 Aug 2026</b></td><td><code>claude-opus-4-1</code> <b>retires</b></td><td><a href="#stale-patterns">1.4</a></td></tr>
<tr><td><b>31 Aug 2026</b></td><td>Sonnet 5 intro pricing ends ($2/$10 → $3/$15)</td><td><a href="#lineup">1.1</a></td></tr>
</tbody>
</table>

<h2>What actually breaks you</h2>
<p>Not missing a feature — you'll find it eventually. What costs you is <b>confidently using something that was removed</b>. The failure modes, in order of nastiness:</p>
<ol>
  <li><b>Silent degradation.</b> The worst. A retired <code>-fast</code> model string silently falls back to standard speed — no error, you just quietly lose what you thought you had.</li>
  <li><b>A 400 in production.</b> <code>budget_tokens</code>, <code>temperature</code>, assistant prefill. Loud, at least.</li>
  <li><b>A 404 on a retired model.</b> Loudest, easiest to fix.</li>
</ol>
<p><a href="#stale-patterns">1.4 · Stale patterns</a> is the running list. It is the page most worth re-reading after a sweep.</p>

<h2>How this site defends itself</h2>
<p>Three mechanisms, all visible to you:</p>
<ul>
  <li><b>Every page is dated.</b> The badge is a claim about freshness you can hold this site to. An old date means trust it less — that's the contract.</li>
  <li><b>Every page cites official sources.</b> When this site and the docs disagree, the docs are right and this site has a bug.</li>
  <li><b>Scope is deliberately narrow.</b> No API, no enterprise admin, nothing in fast-moving beta. Those omissions exist so the rest can stay true. A complete map that is six months stale is worse than a partial one that is right.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ If a page's date is old, believe the date</div>
  <p>This site is one person's notes with a public URL. The verified badge is not a promise that a page is current — it is a precise statement about when someone last checked. That is the most honest thing an unofficial reference can offer.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — the single feed to watch</li>
    <li><a href="https://code.claude.com/docs/en/changelog">Claude Code changelog</a></li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a> — the authoritative table</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/migration-guide">Migration guide</a></li>
    <li><a href="https://support.claude.com/en/articles/14503520-available-beta-and-research-preview-features">Beta and research preview features</a></li>
  </ul>
</div>
`
      }
    ]
  },

  /* ============================ PART 6 ============================ */
  {
    part: "Part 6 · Productivity",
    pages: [
      {
        id: "four-layers",
        num: "6.1",
        title: "The four layers",
        html: `
${VERIFIED}
<p class="lead">You want Claude to stop writing SOQL in loops. Where does that instruction go — <code>CLAUDE.md</code>? A rule? A skill? A hook? Pick wrong and it gets ignored.</p>

<p>This is the single most useful thing to get right, and the answer changed during 2025–26. Most advice you'll read online is answering an older question.</p>

<h2>What changed</h2>
<p>In 2025, <span class="jargon" data-term="claude-md">CLAUDE.md</span> was <i>the</i> lever — everything went in it, and files grew to 800 lines. In 2026 Anthropic split the job across four mechanisms and stated the division plainly:</p>

<div class="callout tip">
  <div class="c-head">💡 Anthropic's own framing</div>
  <p>"Procedures belong in skills. <b>CLAUDE.md is for facts</b> Claude should hold all the time: build commands, monorepo layout, team conventions." And: "Keep CLAUDE.md under 200 lines, give it an owner, and <b>review changes to it like code</b>."</p>
</div>

<h2>Where each thing goes</h2>
<table class="doc">
<thead><tr><th>Layer</th><th>For</th><th>Costs you</th></tr></thead>
<tbody>
<tr>
  <td><b><code>CLAUDE.md</code></b></td>
  <td><b>Facts</b>, always true. Build commands, repo layout, conventions. Increasingly just a router pointing elsewhere.</td>
  <td>Every request, forever</td>
</tr>
<tr>
  <td><b><code>.claude/rules/</code></b><br><small>with a <code>paths</code> glob</small></td>
  <td><b>Hard constraints scoped to files.</b> Apex rules that load only when Claude opens Apex.</td>
  <td>Nothing until a matching file is read</td>
</tr>
<tr>
  <td><b><span class="jargon" data-term="skill">Skills</span></b></td>
  <td><b>Procedures.</b> Anything with steps. A 30-line checklist belongs here, not in CLAUDE.md.</td>
  <td>One description line, until invoked</td>
</tr>
<tr>
  <td><b><span class="jargon" data-term="hook">Hooks</span></b></td>
  <td><b>Enforcement.</b> Things that must happen every time, whatever the model decides.</td>
  <td>Nothing in context — it's your code</td>
</tr>
</tbody>
</table>

<h2>So: no SOQL in loops?</h2>
<p>Not <code>CLAUDE.md</code> — it isn't true of every request, and it competes with everything else on every turn. Options, in order of strength:</p>
<ol>
  <li><b><code>.claude/rules/apex.md</code></b> with <code>paths: ["force-app/**/*.cls"]</code>. Free until relevant. Start here.</li>
  <li><b>A PMD rule and a hook</b> that runs it after every edit. Now it is <i>enforced</i>, not requested.</li>
  <li><b>ApexGuru</b>, if you have it — see <a href="#salesforce-setup">6.5</a>.</li>
</ol>

<div class="callout tip">
  <div class="c-head">💡 The rule practitioners keep rediscovering</div>
  <p><b>Never send an LLM to do a linter's job.</b> Independently arrived at across many community write-ups, and it follows from the layers above: a linter is deterministic, costs a fraction of a cent, and can't be argued with. An instruction is a suggestion competing for attention. If a linter can catch it, that is where it belongs.</p>
</div>

<h2>The compaction trap nobody mentions</h2>
<p>Scoping rules to paths has a cost that is not obvious. When <span class="jargon" data-term="compaction">compaction</span> fires mid-session:</p>

<table class="doc">
<thead><tr><th>Survives?</th><th>What</th></tr></thead>
<tbody>
<tr><td><b>Re-injected from disk</b></td><td>Project-root <code>CLAUDE.md</code>, unscoped rules, auto <span class="jargon" data-term="memory">memory</span></td></tr>
<tr><td><b>Lost</b> until a matching file is read again</td><td>Rules with a <code>paths</code> glob · nested <code>CLAUDE.md</code> in subdirectories</td></tr>
</tbody>
</table>

<p>So a rule that <i>must</i> hold for a whole long session — a security constraint, say — should not be path-scoped. Drop the glob or move it to the project root and pay the context cost deliberately.</p>

<h2>The 200-line number, honestly</h2>
<p>Anthropic says under 200 lines. That's their number and it's the one to follow. But be aware the wider "keep it short" consensus rests on <b>very little</b>: essentially that one figure plus one influential community post, repeated. At least one well-known practitioner runs an ~800-line file and reports it works fine.</p>
<p>Treat 200 as a strong default, not physics. The real test is the one on the <a href="#claude-md-ignored">next page</a>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Two current Anthropic docs contradict each other</div>
  <p>The best-practices page says you can improve adherence with emphasis — "IMPORTANT", "YOU MUST". The model-migration guide says exactly that phrasing now <b>overtriggers</b> on 4.6-and-later models, and recommends softening <code>CRITICAL: You MUST use this tool when…</code> to <code>Use this tool when…</code>.</p>
  <p>Both are live. The migration guide is model-specific and about newer behaviour, so trust it for current models. Mentioned because it will trip you.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more">Steering Claude Code</a> — the four-layer split, the 200-line figure, facts-vs-procedures</li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a> — writing an effective CLAUDE.md</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — rules, paths globs, compaction behaviour</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/migration-guide">Migration guide</a> — why aggressive phrasing now overtriggers</li>
    <li><a href="https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start">Claude Code in large codebases</a> — "lean and layered"</li>
  </ul>
</div>
`
      },

      {
        id: "claude-md-ignored",
        num: "6.2",
        title: "Why Claude ignores your CLAUDE.md",
        html: `
${VERIFIED}
<p class="lead">You wrote the rule. It's right there in <code>CLAUDE.md</code>. Claude ignored it anyway — and it will do it again tomorrow.</p>

<p>This is the most-repeated complaint about Claude Code, continuously, across every model release. It is not a bug, and it is not you being bad at writing instructions. There is a mechanism.</p>

<h2>The mechanism</h2>
<p><code>CLAUDE.md</code> is not part of the system prompt. It is delivered as a <b>user message</b>, wrapped in a <span class="jargon" data-term="system-reminder">system reminder</span> that says, roughly:</p>

<blockquote>
  <p><i>"IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task."</i></p>
</blockquote>

<p>Read that again. Claude is <b>explicitly told to discount your CLAUDE.md unless it judges it relevant</b>. When Claude ignores your rule, it is following instructions — just not yours.</p>

<div class="callout tip">
  <div class="c-head">💡 Where this comes from</div>
  <p>This is <b>community research, not official documentation</b> — discovered by proxying the API and reading what actually gets sent, and reproducible the same way. Anthropic's docs corroborate the effect without describing the mechanism: they call CLAUDE.md instructions <b>advisory</b>, in contrast to hooks, which are <b>deterministic</b>.</p>
</div>

<p>That single word — advisory — is the whole story. If you need a guarantee, you need a <span class="jargon" data-term="hook">hook</span>.</p>

<h2>What predicts whether a rule sticks</h2>
<p>The best taxonomy comes from practitioners, and it explains why people's experiences differ so wildly:</p>

<table class="doc">
<thead><tr><th>Kind of instruction</th><th>Does it work?</th></tr></thead>
<tbody>
<tr>
  <td><b>Facts</b><br><small>"Tests run with <code>npm run test:unit</code>"</small></td>
  <td><b>Always.</b> No controversy. Claude cannot guess these and has no competing instinct.</td>
</tr>
<tr>
  <td><b>Regression constraints</b><br><small>Tied to a failure you actually saw, one sentence each</small></td>
  <td><b>Consistently</b>, if short and specific.</td>
</tr>
<tr>
  <td><b>Behaviour rules from scratch</b><br><small>Written in anticipation of a problem you haven't had</small></td>
  <td><b>Usually not followed.</b></td>
</tr>
</tbody>
</table>

<p>That last row is why the "does CLAUDE.md even work?" argument never resolves. People who fill it with commands and layout say it works. People who fill it with aspirational style preferences say it's useless. <b>Both are reporting accurately.</b></p>

<h2>Why your style rule loses</h2>
<p>A developer asked Claude directly why it kept ignoring his formatting preference. The answer: <b>the surrounding code was like that, so it followed that style.</b></p>
<p>Your codebase is a much louder instruction than your CLAUDE.md. Thousands of lines of existing convention versus one bullet point — the bullet point loses. This is the strongest argument for the linter rule in <a href="#four-layers">6.1</a>: change the code, or change the check, not the prose.</p>

<h2>Four ways to write rules that stick</h2>
<ul>
  <li><b>Phrase positively.</b> "Always clarify intent before acting" beats "Never act without checking" — telling a model not to do something can prime the thing. The pink-elephant problem.</li>
  <li><b>Remove contradictions.</b> Two conflicting instructions don't fight it out; Claude tends to <b>ignore both</b>. Conflicts across a user file, a project file, and a nested file are easy to create by accident.</li>
  <li><b>Write from observed failures</b>, not imagined ones. If it hasn't gone wrong yet, you're guessing.</li>
  <li><b>Cut anything a linter could catch.</b> The model already infers style from surrounding code — a style section is context spent for nothing.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ The canary trick doesn't prove what you think</div>
  <p>A popular tip: put "always call me Mr Tinkleberry" in CLAUDE.md, and if Claude uses the name you know it read the file. It doesn't work as a test. You're filling the conversation with turns reinforcing that one behaviour — and Claude can happily greet you correctly <b>while ignoring every rule that matters</b>. Compliance on a trivial instruction is not evidence of compliance on an important one.</p>
</div>

<h2>Anthropic's own diagnosis</h2>
<p>Worth knowing, because it's checkable: <i>"If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost."</i></p>
<p>The prescribed test, per line: <b>"Would removing this cause Claude to make mistakes?"</b> If not, cut it. And if Claude already does the thing correctly without the instruction, delete it — or convert it to a hook.</p>

<div class="callout tip">
  <div class="c-head">💡 The honest summary</div>
  <p>CLAUDE.md is a <b>reliable place for facts</b> and an <b>unreliable place for behaviour</b>. Put commands and layout in it. Put procedures in skills, scoped constraints in rules, and anything that must not fail in a hook. Stop trying to win an argument with a file that Claude has been told to treat as optional.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a> — the pruning test, the too-long diagnosis</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — conflicting instructions, <code>/memory</code> to check what loaded</li>
    <li><a href="https://code.claude.com/docs/en/hooks">Hooks</a> — deterministic enforcement vs advisory instructions</li>
    <li><a href="https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more">Steering Claude Code</a></li>
  </ul>
  <h3>Community research (labelled, not official)</h3>
  <ul>
    <li><a href="https://www.humanlayer.dev/blog/writing-a-good-claude-md">Writing a good CLAUDE.md</a> — HumanLayer, Nov 2025. The system-reminder finding, obtained by proxying the API. The only claim here backed by an inspectable method rather than anecdote.</li>
  </ul>
</div>
`
      },

      {
        id: "session-loop",
        num: "6.3",
        title: "The session loop",
        html: `
${VERIFIED}
<p class="lead">Two engineers give Claude the same task. One gets a working fix in ten minutes. The other spends an hour correcting, re-explaining, and eventually doing it themselves. The difference is rarely the prompt.</p>

<h2>1. Give Claude a way to verify its work</h2>
<p>This is now the <b>first section</b> of Anthropic's best-practices page — it displaced explore-plan-code as the headline advice. It is also the only tip that every independent source repeats.</p>

<div class="callout tip">
  <div class="c-head">💡 Why it matters more than anything else</div>
  <p>Anthropic's framing: "Claude stops when the work <i>looks</i> done. Without a check it can run, 'looks done' is the only signal available, and <b>you become the verification loop</b>: every mistake waits for you to notice it."</p>
</div>

<p>Give it something that returns pass or fail and the loop closes itself. A test suite, a build exit code, a linter, a script that diffs against a fixture, a screenshot to compare.</p>

<table class="doc">
<thead><tr><th>Instead of</th><th>Say</th></tr></thead>
<tbody>
<tr><td><i>"add validation to the Account trigger"</i></td><td><i>"add validation to the Account trigger. Write a failing test for a blank BillingCountry first, then make it pass. Run <code>sf apex run test</code> and show me the output."</i></td></tr>
<tr><td><i>"the deploy is failing"</i></td><td><i>"the deploy fails with this error: [paste]. Fix it and verify with <code>--dry-run</code>. Address the root cause, don't suppress it."</i></td></tr>
</tbody>
</table>

<p>Then decide <b>how hard the check gates</b>. Anthropic's four tiers, weakest to strongest:</p>
<ol>
  <li><b>In one prompt</b> — "run the tests and iterate until they pass."</li>
  <li><b>Across a session</b> — <code>/goal</code> sets a condition an evaluator re-checks every turn.</li>
  <li><b>A deterministic gate</b> — a Stop <span class="jargon" data-term="hook">hook</span> blocks the turn from ending until your script passes. (Claude Code overrides it after 8 consecutive blocks.)</li>
  <li><b>A second opinion</b> — a verification <span class="jargon" data-term="subagent">subagent</span> with fresh context that didn't write the code.</li>
</ol>

<p>And ask for <b>evidence, not assertion</b>. "Tests pass" is a claim. The pasted test output is a fact.</p>

<h2>2. Plan first — but not always</h2>
<p><span class="jargon" data-term="plan-mode">Plan mode</span> is the standard advice, and it's good advice. The caveat most guides omit is Anthropic's own: <b>planning adds overhead.</b> Skip it for typos, log lines, renames — anything whose diff you could describe in one sentence.</p>
<p>Plan when you're unsure of the approach, when the change spans files, or when you don't know the code. That's a judgement call, not a ritual.</p>

<h2>3. Course-correct early — and know when to quit</h2>
<table class="doc">
<thead><tr><th>Key</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>Esc</code></td><td>Stop mid-action. Context is kept, so you can redirect.</td></tr>
<tr><td><code>Esc Esc</code> / <code>/rewind</code></td><td>Restore earlier code and/or conversation.</td></tr>
<tr><td><code>/clear</code></td><td>Reset. Keeps project memory.</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The two-correction rule</div>
  <p>Straight from Anthropic: if you've corrected Claude <b>more than twice on the same issue</b>, the context is now polluted with failed approaches. <code>/clear</code> and write a better prompt using what you just learned. "A clean session with a better prompt almost always outperforms a long session with accumulated corrections."</p>
  <p>This is the highest-value habit on this page. The instinct to explain <i>one more time</i> is almost always wrong.</p>
</div>

<h2>4. Spend context deliberately</h2>
<ul>
  <li><b><code>/clear</code> between unrelated tasks.</b> The cheapest thing you can do.</li>
  <li><b><code>/compact focus on the auth bug</code></b> — steering compaction beats letting it guess.</li>
  <li><b><code>/btw</code></b> for side questions. The answer appears in an overlay and <b>never enters conversation history</b>. Badly underused.</li>
  <li><b><code>/context</code></b> to see what's actually eating the window.</li>
  <li><b>Delegate big reads to <span class="jargon" data-term="subagent">subagents</span></b> — the single highest-leverage context move. See <a href="#scaling">6.4</a>.</li>
  <li><b>Tell compaction what to keep</b>, in CLAUDE.md: <i>"When compacting, always preserve the list of modified files and the test commands."</i></li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Checkpoints don't track bash</div>
  <p><code>/rewind</code> restores files Claude edited. It does <b>not</b> undo what a shell command did — if Claude ran <code>rm</code> or <code>mv</code>, rewind can't help. Git is your durable history; <code>/rewind</code> is within-session undo. Don't confuse them.</p>
</div>

<h2>What the data says separates people</h2>
<p>Anthropic analysed ~400,000 sessions across ~235,000 users. Experts trigger about <b>12 actions per prompt versus a novice's 5</b>, and get ~3,200 words back versus ~600. Verified success runs <b>15% for novices against 28–33% for experienced users</b>; when a problem appears, novices abandon 19% of the time versus 5–7%.</p>

<div class="callout tip">
  <div class="c-head">💡 The finding that should encourage you</div>
  <p><b>Domain expertise — not coding background — predicts success.</b> "Success depends on what the user brings." Your fifteen years of knowing what breaks in a Salesforce org <i>is</i> the differentiator. Claude supplies throughput; you supply the judgement about what "correct" means here.</p>
  <p>The other useful number: the novice→intermediate gap is <b>bigger</b> than the intermediate→expert gap. The habits on this page are where the returns are.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a> — verification, the four gating tiers, the two-correction rule</li>
    <li><a href="https://www.anthropic.com/research/claude-code-expertise">How Claude Code is used in practice</a> — the 400k-session study</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a> · <a href="https://code.claude.com/docs/en/goal">/goal</a></li>
    <li><a href="https://code.claude.com/docs/en/interactive-mode">Interactive mode</a> — /btw and side questions</li>
    <li><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Effective context engineering</a></li>
  </ul>
</div>
`
      },

      {
        id: "scaling",
        num: "6.4",
        title: "Scaling, and where it breaks",
        html: `
${VERIFIED}
<p class="lead">Five Claude sessions running at once sounds like five times the output. In practice most people who try it quietly go back to two.</p>

<p>Parallelism works — but only for a specific shape of work, and the ceiling is lower than the marketing suggests. This page is the honest version.</p>

<h2>Subagents are researchers, not coders</h2>
<p>The most durable insight in this whole area: <b>read-heavy work parallelises; write-heavy work doesn't.</b></p>
<p>Three <span class="jargon" data-term="subagent">subagents</span> searching a codebase can't corrupt each other — conflicting reads are harmless. Three subagents <i>editing</i>, each unaware of the others' decisions, produce incompatible work that you then have to reconcile.</p>

<div class="callout tip">
  <div class="c-head">💡 Anthropic's own product design concedes this</div>
  <p>Of the three built-in subagents, <b>two are read-only</b>: <code>Explore</code> and <code>Plan</code>. Only <code>General-purpose</code> writes. That split isn't an accident.</p>
</div>

<p>So the reliable use is investigation: <i>"use subagents to find every place we reference this field."</i> They burn their context on the search and hand back the answer. Your window stays clean for the actual work.</p>

<h2>The number is three to five</h2>
<p>Anthropic put it well: <b>"Three focused teammates often outperform five scattered ones."</b> Independent practitioner reports converge on the same 3–5 range. Treat larger claims as outliers, not targets.</p>

<h2>Worktrees fix files, not infrastructure</h2>
<p><span class="jargon" data-term="worktree">Worktrees</span> are native — <code>claude --worktree</code> or <code>-w</code> — and they genuinely solve file collisions between parallel sessions.</p>

<div class="callout warn">
  <div class="c-head">⚠️ They do not solve the thing that actually breaks</div>
  <p>Ports. Databases. <b>Migrations.</b> Test data. Caches. Two worktrees share one org and one database — if session A runs a migration, session B breaks. Every real failure report about parallel sessions lives in that gap, and nothing has closed it.</p>
  <p>The practical split: worktrees are near-free for <b>stateless</b> work (libraries, pure logic, docs) and genuinely painful for <b>stateful</b> app development. That difference explains almost all the disagreement you'll read.</p>
</div>

<p>For Salesforce this matters more than most stacks: your sandbox is shared state. Two sessions deploying to the same org is not parallelism, it's a race.</p>

<h2>The real bottleneck is you</h2>
<p>The most consistent report from people who've pushed parallelism hard is not that Claude fails. It's that <b>they run out of review capacity</b>. One well-known practitioner describes being wiped out for the day by 11am running four agents.</p>
<p>And reviewing code you didn't ask for is harder than reviewing your own work — you must first reconstruct what the author was trying to do, then judge whether they did it. Four agents produce four of those.</p>

<div class="callout tip">
  <div class="c-head">💡 The honest reframe</div>
  <p>Parallelism doesn't make you faster at your job. It <b>changes your job</b>, from author to editor. Some people find that a better use of their expertise; plenty find it exhausting. It's worth knowing which you are before you build a workflow around it.</p>
  <p>And note the asymmetry: this is a <b>multiplier on existing discipline</b>, not a substitute for it. Every credible success story is gated on something — a real test suite, written architecture, clean decomposition. That's why it works for the people writing the blog posts and fails for the people reading them.</p>
</div>

<h2>The adversarial review step</h2>
<p>Before calling long unattended work done, have a subagent review the diff in fresh context. It sees the change and your criteria, not the reasoning that produced it, so it judges the result on its own terms. <code>/code-review</code> does exactly this.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The reviewer trap</div>
  <p>Anthropic's own caveat, and it's underrated: <b>"A reviewer prompted to find gaps will usually report some, even when the work is sound, because that is what it was asked to do."</b> Chasing every finding produces extra abstraction, defensive code, and tests for cases that can't happen.</p>
  <p>Tell the reviewer to flag only what affects correctness or the stated requirements. Treat the rest as optional.</p>
</div>

<h2>Before you reach for a third-party orchestrator</h2>
<p>A generation of tools existed to bolt parallelism onto Claude Code. Anthropic then shipped <code>--worktree</code>, background subagents, the agent view, agent teams, and dynamic workflows — first-party and free. Several of the best-known orchestrators are now abandoned or de-invested.</p>
<p><b>Try the built-ins first.</b> Check a tool's last commit date and actual download numbers before adopting it; star counts in this space are badly disconnected from use.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/sub-agents">Subagents</a> — the built-in read-only Explore and Plan</li>
    <li><a href="https://code.claude.com/docs/en/worktrees">Worktrees</a> — the --worktree flag</li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a> — adversarial review and the reviewer caveat</li>
    <li><a href="https://code.claude.com/docs/en/agent-teams">Agent teams</a> · <a href="https://code.claude.com/docs/en/workflows">Dynamic workflows</a></li>
    <li><a href="https://www.anthropic.com/engineering/building-c-compiler">Building a C compiler with Claude</a> — 16 parallel instances, and an honest account of what broke</li>
  </ul>
</div>
`
      },

      {
        id: "salesforce-setup",
        num: "6.5",
        title: "Your Salesforce setup",
        html: `
${VERIFIED}
<p class="lead">There is official, actively-maintained Salesforce tooling for Claude — and almost nobody writes about it. If you set up one thing this week, make it this.</p>

<h2>Two things exist, both official</h2>
<table class="doc">
<thead><tr><th>What</th><th>Gives you</th></tr></thead>
<tbody>
<tr>
  <td><b><code>forcedotcom/sf-skills</code></b><br><small>Salesforce, Apache-2.0</small></td>
  <td>60+ <span class="jargon" data-term="skill">skills</span> for Apex, LWC, test generation, log debugging. Built for Agentforce Vibes, explicitly compatible with Claude Code. Install with <code>npx skills add forcedotcom/sf-skills</code>.</td>
</tr>
<tr>
  <td><b><code>salesforcecli/mcp</code></b><br><small>Salesforce, Apache-2.0</small></td>
  <td>The DX <span class="jargon" data-term="mcp">MCP</span> Server. 15 toolsets, 60+ tools. Runs <b>locally</b> against your SF CLI credentials — metadata, deploy, tests, org queries.</td>
</tr>
</tbody>
</table>

<p>Both are shipping weekly as of July 2026. This is the answer to the placeholder in <a href="#recipe-impact">recipe 5.2</a>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Two different Salesforce MCP products, constantly confused</div>
  <p><b>DX MCP</b> (<code>salesforcecli/mcp</code>) runs on <b>your machine</b>, against your CLI credentials, for <b>development</b> — metadata, deploys, tests.</p>
  <p><b>Hosted MCP</b> is Salesforce-hosted, for <b>org data and actions</b> — Platform, Data 360, Tableau, MuleSoft.</p>
  <p>Most blog posts blur them. They have different trust models and different use cases. For Claude Code in a repo, you almost always want the local DX one.</p>
</div>

<h3>The flag that matters</h3>
<p>DX MCP <b>requires <code>--orgs</code></b> — you must explicitly name which orgs the model may touch. That is a good default and worth respecting rather than working around. Non-GA tools sit behind <code>--allow-non-ga-tools</code>; leave that off unless you mean it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ sf-skills has no stability guarantee</div>
  <p>Salesforce's own warning: "Expect frequent changes. Skills may be renamed, restructured, or removed between releases." It is explicitly <b>not</b> under GA API stability guarantees. Don't hard-code skill names into your own tooling, and re-check after upgrades.</p>
</div>

<h2>The honest picture of quality</h2>
<p>A Salesforce Developer Advocate put it better than any vendor blog:</p>
<blockquote><p><i>"You move from 60% correct to 95% correct — a massive improvement — but the remaining 5% is why validators exist."</i></p></blockquote>
<p>And the sharpest framing of why Apex is harder than it looks: models already know Apex, LWC, and SOQL <i>as languages</i>. But knowing a language and consistently producing code that respects your org's constraints are different problems.</p>

<p>The one independent field report worth knowing — an admin building Flows — found that <b>without refined CLAUDE.md guidance, Claude produced XML that wasn't valid and failed deployment</b>. That directly contradicts "production-ready" vendor framing, and it validates the <a href="#four-layers">configure-first</a> approach: the file isn't a nicety here, it's what makes output deployable.</p>

<h2>What nobody has actually measured</h2>
<div class="callout tip">
  <div class="c-head">💡 The most useful thing on this page</div>
  <p>There is <b>no published independent evaluation</b> of three things you care most about:</p>
  <ul>
    <li><b>LWC Jest test quality</b> — are the tests meaningful?</li>
    <li><b>Apex test <i>assertion</i> quality</b> — does it prove behaviour, or pad line coverage?</li>
    <li><b>Governor limits in practice</b> — every source <i>asserts</i> Claude respects them; not one shows a failure case.</li>
  </ul>
  <p>Every source asserts; none demonstrates. Treat generated tests as drafts to review, not as coverage you've earned.</p>
</div>

<h2>Claims to distrust</h2>
<p>The Salesforce-plus-AI content farm is unusually bad. Specifically:</p>
<ul>
  <li><b>"85% of Claude's Apex compiles first try vs ChatGPT's 60%"</b> — repeated verbatim across vendor blogs with <b>no primary source</b>. Fabricated.</li>
  <li><b>"Automatically achieves 75%+ coverage"</b> — cited as a quality claim. <b>75% is the Salesforce deployment floor</b>, and Salesforce's own guidance says the focus "should not be on the percentage of code covered." Anyone quoting it as an achievement is telling you they don't do this for a living.</li>
  <li><b>"MCP is read-only for Salesforce"</b> — plainly wrong. DX MCP ships deploy, write-apex-class, run-tests, and bulk DML.</li>
  <li><b>"40–60% faster", "2–3x faster Flow builds"</b> — vendor self-benchmarks, no methodology.</li>
</ul>

<h2>Why it feels like nobody does this</h2>
<p>Because they don't blog about it. Salesforce development is a closed-shop professional ecosystem — practice circulates in Trailblazer groups and consultancy Slacks, not Hacker News. There is real usage and there are real user-group demos; there is no observable public consensus.</p>
<p>Which means: <b>there's no established playbook for you to copy.</b> The recipes in <a href="#recipe-lwc">Part 5</a> are a starting point, and your own <code>.claude/rules/</code> will be worth more than anything you find online.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://github.com/forcedotcom/sf-skills">forcedotcom/sf-skills</a> — Salesforce's official skills collection (Apache-2.0)</li>
    <li><a href="https://github.com/salesforcecli/mcp">salesforcecli/mcp</a> — the official DX MCP Server (Apache-2.0)</li>
    <li><a href="https://code.claude.com/docs/en/mcp">MCP in Claude Code</a> — adding and scoping servers</li>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a></li>
  </ul>
  <p><small>Salesforce tooling is cited from Salesforce's own repositories — the first-party source for those products, the same principle as citing Anthropic for Claude.</small></p>
</div>
`
      },

      {
        id: "wastes-time",
        num: "6.6",
        title: "What wastes your time",
        html: `
${VERIFIED}
<p class="lead">Claude felt sharp in February and dumb in April. You weren't imagining it — and the reason is more interesting than "they nerfed the model."</p>

<h2>The degradation was real, and it wasn't the model</h2>
<p>Anthropic published a postmortem on 23 April 2026 confirming genuine degradation from <b>4 March to 20 April</b> across Claude Code, the Agent SDK, and Cowork. Three separate bugs:</p>

<table class="doc">
<thead><tr><th>Cause</th><th>Fixed</th></tr></thead>
<tbody>
<tr><td>Default reasoning <span class="jargon" data-term="effort">effort</span> switched <b>high → medium</b> to reduce UI freezing. Anthropic: "the wrong tradeoff."</td><td>7 Apr</td></tr>
<tr><td>A <b>caching bug</b> cleared thinking history <i>every turn</i> instead of once — Claude appeared forgetful and repetitive, and it burned usage faster.</td><td>10 Apr</td></tr>
<tr><td>A system prompt capped commentary at 25 words — a measured <b>3% intelligence drop</b>.</td><td>20 Apr</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 Why this story is worth knowing</div>
  <p>The community was <b>right about the symptom and wrong about the mechanism</b>. The theories were "they quantized it" and "they nerfed it to save compute." All three bugs were in the <b>harness</b>, not the model — Anthropic confirmed the API and inference layer were unaffected.</p>
  <p>The lesson isn't "trust the vendor." It's that <b>"it feels worse" is real data worth reporting</b>, and that your explanation for it is probably wrong. Anthropic's own evals initially failed to reproduce it.</p>
</div>

<h2>The five failure patterns</h2>
<p>Anthropic names these directly. All five are recognisable within a day of using the tool:</p>
<table class="doc">
<thead><tr><th>Pattern</th><th>Fix</th></tr></thead>
<tbody>
<tr><td><b>The kitchen sink session.</b> One task, then something unrelated, then back. Context full of noise.</td><td><code>/clear</code> between unrelated tasks</td></tr>
<tr><td><b>Correcting over and over.</b> Context polluted with failed approaches.</td><td>After two failures, <code>/clear</code> and rewrite the prompt</td></tr>
<tr><td><b>The over-specified CLAUDE.md.</b> Too long, so rules get lost in noise.</td><td>Prune. Convert to a <span class="jargon" data-term="hook">hook</span>. See <a href="#claude-md-ignored">6.2</a></td></tr>
<tr><td><b>The trust-then-verify gap.</b> Plausible code that fails edge cases.</td><td>"If you can't verify it, don't ship it"</td></tr>
<tr><td><b>The infinite exploration.</b> "Investigate X" unscoped; hundreds of files read.</td><td>Scope it, or use a <span class="jargon" data-term="subagent">subagent</span></td></tr>
</tbody>
</table>

<h2>The stale-advice tax</h2>
<p>Tips still circulating that do nothing. Each one costs you nothing but confidence — which is the expensive kind of nothing:</p>
<table class="doc">
<thead><tr><th>Still repeated</th><th>Reality</th></tr></thead>
<tbody>
<tr><td><b>"say <i>think hard</i> / <i>think harder</i>"</b></td><td>Not recognised. Passed through as ordinary text. Use <code>/effort</code>.</td></tr>
<tr><td><b><code>MAX_THINKING_TOKENS=8000</code></b></td><td>Ignored by every adaptive-thinking model.</td></tr>
<tr><td><b>"<code>@imports</code> save context"</b></td><td>False. Imports load at launch. Use <code>.claude/rules/</code> with a <code>paths</code> glob.</td></tr>
<tr><td><b>"exit 1 to block a hook"</b></td><td><b>Exit 2 blocks.</b> Exit 1 is non-blocking — your guard silently <b>fails open</b>.</td></tr>
<tr><td><b>"disable MCP servers to save context"</b></td><td>Mostly obsolete — tool schemas are deferred now. Only names load.</td></tr>
<tr><td><b>"12 hook events"</b></td><td>~30. Any guide saying 12 or 13 is years behind.</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ The exit-1 one can actually hurt you</div>
  <p>A hook meant to block dangerous commands, written with <code>exit 1</code>, does not block. It logs and the action proceeds. Unix convention makes <code>exit 1</code> the natural choice, so this is easy to get wrong — and a guard that fails open is worse than no guard, because you stopped watching.</p>
</div>

<h2>Money and limits</h2>
<ul>
  <li><b>Anthropic publishes no numeric limits.</b> Max 5× means "5× Pro", not a number. <b>Every specific figure you read in a blog is reverse-engineered or invented.</b> Distrust "~900 prompts per window" and similar.</li>
  <li><b><code>/status</code> before you start.</b> The real cause of bill shock isn't heavy use — it's silent billing-owner switching, where a stray env var flips you from subscription to API billing.</li>
  <li><b><code>/usage-credits</code></b> lets you set a <b>monthly spend cap</b> in the CLI. This is the actual answer to "how do I stop this costing more than I meant" and almost nobody mentions it.</li>
  <li><b><code>/usage</code></b> attributes spend to skills, subagents, plugins, and individual MCP servers.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Switching model does not restore a spent limit</div>
  <p>Widely-repeated bad advice. Session and weekly windows are <b>shared across models</b> — <code>/model sonnet</code> won't buy you more room after you've hit your weekly cap. It only helps against a <i>model-specific</i> Opus limit.</p>
</div>

<p>Worth knowing: <span class="jargon" data-term="opusplan">opusplan</span> — Opus plans, Sonnet implements — buys most of the judgement at much of the saving.</p>

<h2>Develop your intuition</h2>
<p>Anthropic close their best-practices page with something unusually honest, and it's the right note to end on:</p>
<blockquote><p><i>"Sometimes you should let context accumulate because you're deep in one complex problem. Sometimes you should skip planning because the task is exploratory. Sometimes a vague prompt is exactly right because you want to see how Claude interprets the problem before constraining it."</i></p></blockquote>
<p>Everything in Part 6 is a starting point, not a law. Notice what works. When output is great, notice what you did — the prompt, the context, the mode. When it struggles, ask whether the context was noisy, the prompt vague, or the task too big for one pass.</p>
<p>That intuition is the actual skill. <span class="jargon" data-term="agentic-engineering">Agentic engineering</span> is not about knowing the flags.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://www.anthropic.com/engineering/april-23-postmortem">April 23 postmortem</a> — the three harness bugs, in Anthropic's own words</li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a> — the five failure patterns, "develop your intuition"</li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide</a> — exit codes; exit 2 blocks</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — imports load at launch</li>
    <li><a href="https://support.claude.com/en/articles/9797557-usage-limit-best-practices">Usage limit best practices</a> · <a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a></li>
    <li><a href="https://code.claude.com/docs/en/costs">Costs</a></li>
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
