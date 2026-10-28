/* ===========================================================
   CONTENT — drives the sidebar, the pages, and Prev/Next order.
   Structure:
     CONTENT = [ { part, pages: [ { id, num, title, html } ] } ]
   To add a page: add an object to the right part's `pages` array.
   Wrap jargon like: <span class="jargon" data-term="agent">agent</span>
   Add a diagram with: <div class="mermaid">flowchart LR; A-->B</div>
   Date every page with: <p class="verified">…</p>
   =========================================================== */

const VERIFIED = `<p class="verified">Verified against official docs on <time datetime="2026-10-28">October 28, 2026</time></p>`;

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
<p class="lead">You want to use Claude well and keep up as it changes. The official docs are accurate, but they are reference material. They do not tell you what matters.</p>

<p>This site does that. It is a map, not a mirror.</p>

<p>The ground moves fast. A few recent examples:</p>
<ul>
  <li><b>New models.</b> The Claude 5.5 family shipped in autumn 2026: Opus 5.5 on 22 September, Sonnet 5.5 on 28 September, Haiku 5.5 on 7 October.</li>
  <li><b>One app instead of two modes.</b> Chat and <span class="jargon" data-term="cowork">Cowork</span> merged into one conversation from 16 September 2026.</li>
  <li><b>Slack.</b> Claude Tag replaced Claude in Slack on 3 August 2026.</li>
  <li><b>API.</b> API version <code>2026-10-21</code> removed <code>temperature</code>, <code>top_p</code> and <code>top_k</code>.</li>
</ul>

<h2>What this covers</h2>
<ul>
  <li><b>Models</b>: the current lineup, what each is for, and the patterns that no longer work.</li>
  <li><b>Claude Code</b>: the CLI and its surfaces, the <code>.claude</code> directory, <span class="jargon" data-term="skill">skills</span>, <span class="jargon" data-term="subagent">subagents</span>, <span class="jargon" data-term="hook">hooks</span>, <span class="jargon" data-term="mcp">MCP</span>, and <span class="jargon" data-term="headless">headless</span> use in CI.</li>
  <li><b>Claude Desktop and Cowork</b>: handing Claude a whole task, and how that differs from a quick chat and from Claude Code.</li>
  <li><b>claude.ai</b>: <span class="jargon" data-term="project">projects</span>, <span class="jargon" data-term="artifact">artifacts</span>, <span class="jargon" data-term="memory">memory</span>, research, connectors, and usage limits.</li>
  <li><b>Recipes</b>: end-to-end workflows, several of them for Salesforce.</li>
</ul>

<h2>What this leaves out, on purpose</h2>
<ul>
  <li><b>The Claude API and <span class="jargon" data-term="agent-sdk">Agent SDK</span>.</b> They are well documented and change weekly. This site covers products you <i>use</i>, not APIs you <i>call</i>. Where the two meet, you get a link.</li>
  <li><b>Team and enterprise administration.</b> SSO, SCIM, role permissions, seat billing.</li>
  <li><b>Betas likely to move.</b> Mentioned where they matter, not documented in depth.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 Why the omissions matter</div>
  <p>The cuts keep the site small enough to maintain. Only a maintained site stays true. A partial map that is right beats a complete one that is six months stale.</p>
</div>

<h2>How to read it</h2>
<p><b>Every page is dated.</b> The badge at the top says when its claims were last checked against official docs. If a page is months old, trust it less.</p>
<p><b>Every page cites its sources.</b> The list at the bottom links the official page behind each claim. If this site and the official docs disagree, the docs are right and this site has a bug.</p>
<p><b>Dotted words are jargon.</b> Hover any <span class="jargon" data-term="context-window">dotted term</span> for a plain-English definition. Click it to open the Jargon Decoder. The 📖 button in the top bar opens it any time.</p>
<p><b>Yellow boxes flag deprecations and traps.</b> If you see one, read it. It usually means something you learned is now wrong.</p>
<p><b>Examples come first.</b> Pages open with a concrete task, then the concept, then the reference detail.</p>
<p><b>Opinions are labelled.</b> Recommendations are the author's. Facts are cited.</p>

<h2>Where to go next</h2>
<table class="doc">
<thead><tr><th>If you want to…</th><th>Read</th></tr></thead>
<tbody>
<tr><td>Know which Claude product to open for a task</td><td><a href="#ecosystem-map">The ecosystem map</a></td></tr>
<tr><td>Understand why Claude "forgets" in long sessions</td><td><a href="#how-claude-thinks">How Claude thinks</a></td></tr>
<tr><td>Pick a model today</td><td><a href="#choosing">Choosing a model</a></td></tr>
<tr><td>Fix code that broke after a model upgrade</td><td><a href="#stale-patterns">Stale patterns to unlearn</a></td></tr>
</tbody>
</table>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/home">Claude Platform docs</a>: API and platform reference</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code docs</a>: the CLI and its surfaces</li>
    <li><a href="https://support.claude.com/en/">Claude Help Center</a>: claude.ai, Desktop, and Cowork</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a>: model launches, the Cowork and chat merge, Claude Tag</li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a></li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag</a></li>
    <li><a href="https://platform.claude.com/docs/en/api/migration-2026-10-21">Migrating to API version 2026-10-21</a></li>
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
<p class="lead">You want Claude to fix a failing Apex test. Which of the things called "Claude" do you open?</p>

<p>There is a clean answer. Once you know the rule, the products stop feeling like a pile of overlaps.</p>

<div class="callout tip">
  <div class="c-head">💡 The one rule</div>
  <p>Pick the surface by <b>where the work lives</b>. Then decide <b>how much you want to stay in the loop</b>.</p>
</div>

<h2>The short answer</h2>
<table class="doc">
<thead><tr><th>You want to…</th><th>Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Ask, think out loud, draft, or hand off office work</td><td><b>The Claude app</b><br><small>claude.ai, Desktop, mobile</small></td><td>"Summarise this contract." "Build a quarterly report from these three spreadsheets."</td></tr>
<tr><td>Build, refactor, debug, or review software</td><td><b>Claude Code</b><br><small>terminal, Desktop Code tab, IDE, browser</small></td><td>"Make this failing Apex test pass."</td></tr>
<tr><td>Run a task on a schedule</td><td><b>A scheduled task</b><br><small>in the Claude app or Claude Code</small></td><td>"Every Monday, summarise last week's open cases."</td></tr>
<tr><td>Put Claude inside your own software</td><td><b>Claude API / Agent SDK</b></td><td>A support bot in your product.</td></tr>
</tbody>
</table>

<h2>The decision tree</h2>
<div class="mermaid">
flowchart TD
    A["I want Claude to<br/>do something"] --> I{"Am I building this into<br/>my own product?"}
    I -- Yes --> J["Claude API / Agent SDK"]
    I -- No --> B{"Does the work<br/>live in a code repo?"}
    B -- Yes --> C["Claude Code"]
    B -- No --> D["The Claude app<br/>(chat + Cowork, one conversation)"]
    D --> F{"Recurring?"}
    F -- Yes --> H["Scheduled task"]
    F -- No --> G["Ask it, or hand it the whole task"]
</div>
<p class="diagram-caption">Where the work lives decides the surface. In the Claude app, Claude picks the tools.</p>

<h2>So: the failing Apex test</h2>
<p><b>Claude Code.</b> The work lives in a repo. Claude needs to read your classes, run <code>sf apex run test</code>, and edit files. In the Claude app you would paste code back and forth.</p>

<h2>The surfaces, one paragraph each</h2>

<h3>The Claude app (chat and Cowork)</h3>
<p>This is claude.ai in a browser, the Claude Desktop app, and the mobile apps. Chat and Cowork are now <b>one conversation</b>. You no longer pick a mode first. Ask a quick question and you get an answer. Describe a whole task and Claude plans it, works through it, and returns finished files: reports, spreadsheets, decks.</p>
<p>Longer tasks run in the cloud and keep going after you close your laptop. Work that touches your own computer (local files, the built-in browser, <span class="jargon" data-term="computer-use">computer use</span>) needs Claude Desktop open.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Rolling out, not everywhere yet</div>
  <p>The merge began on 16 September 2026. It is rolling out gradually to Pro and Max on web, desktop, and mobile. Team gets it as a beta, and Enterprise when an admin turns on "Chat and Cowork unified". If your message box still shows <b>Chat</b> and <b>Cowork</b> options, you are on the old experience: pick Cowork to hand off a task. Once switched, an account cannot go back.</p>
</div>

<p>Cowork tasks need a paid plan. Anthropic reported in July 2026 that more than 90% of Cowork usage was not software development.</p>

<h3>Claude Code</h3>
<p>An agentic coding tool that runs where your code is. It is not only a CLI. The same tool runs in the terminal, the Code tab of Claude Desktop, VS Code and JetBrains, and the browser at claude.ai/code. Desktop sessions can move to the cloud or be watched from your phone. It needs a Pro, Max, Team, Enterprise, or Console account. The free plan does not include it.</p>

<h3>Claude API and Agent SDK</h3>
<p>For putting Claude inside something you build. The API is the raw interface. The <span class="jargon" data-term="agent-sdk">Agent SDK</span> gives you the Claude Code harness as a library. This site links out rather than covering them. The <a href="https://platform.claude.com/docs/en/home">official docs</a> change too fast for a secondary source to track honestly.</p>

<h2>Things around the edges</h2>
<p>These are features of the surfaces above, or smaller products:</p>
<ul>
  <li><b>Claude in Chrome</b>: an extension that lets Claude read, click, and navigate websites. Paid plans, Google Chrome only. Tasks can start from the side panel, Cowork, or Claude Code.</li>
  <li><b>Computer use in Desktop</b>: Claude drives your screen. Research preview, Pro and Max only, macOS and Windows, off by default.</li>
  <li><b>Claude Design, Slides, and Docs</b>: since 16 September 2026 these work in any conversation, including Claude Code. Results save as artifacts.</li>
  <li><b>Claude Tag</b>: tag <code>@Claude</code> in Slack and it does the work. Beta, Team and Enterprise only. It replaced Claude in Slack on 3 August 2026.</li>
  <li><b>Claude Duet</b>: a proactive assistant app that checks your connected apps and asks before acting. Announced 21 October 2026. Research preview by waitlist, starting with US Pro and Max.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Standalone Claude Design closes 14 December 2026</div>
  <p>The old site at claude.ai/design goes read-only on that date. Chats and comments do not transfer, and public links stop working. Move your design systems and projects into Claude before then.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>You need a fast answer or a draft.</b> Open the Claude app and ask.</li>
  <li><b>You want a finished deliverable from several sources.</b> Describe the outcome in the Claude app and let it run. Keep Desktop open if it needs your local files.</li>
  <li><b>The work lives in git.</b> Use Claude Code, even for small fixes.</li>
  <li><b>Your team lives in Slack.</b> On Team or Enterprise, use Claude Tag in the channel.</li>
</ul>

<h2>One usage pool</h2>
<p>On a subscription, claude.ai, Claude Code, and Claude Desktop count toward <b>the same usage limit</b>. Paid plans have a limit that resets every five hours, plus weekly limits. With usage credits turned on, work continues on credits instead of stopping.</p>
<p>So "which surface" and "which model" are cost decisions, not just convenience. See <a href="#choosing">choosing a model</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a>: the merge, rollout, and what needs Desktop</li>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Claude Cowork</a>: plans and platforms</li>
    <li><a href="https://claude.com/resources/articles/cowork-web-mobile">Cowork on web and mobile</a>: the 90% non-development figure</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code setup</a> · <a href="https://code.claude.com/docs/en/desktop">the Desktop app</a>: surfaces, plans, computer use</li>
    <li><a href="https://code.claude.com/docs/en/agent-sdk/overview">Claude Agent SDK overview</a></li>
    <li><a href="https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome">Get started with Claude in Chrome</a></li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a>: Design, Slides, and Docs in any conversation</li>
    <li><a href="https://support.claude.com/en/articles/17440474-move-from-standalone-claude-design-to-claude">Move from standalone Claude Design to Claude</a></li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag</a></li>
    <li><a href="https://claude.com/resources/articles/claude-duet">Introducing Claude Duet</a></li>
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
<p class="lead">You spent an hour with Claude on a refactor. It read six files, ran the tests twice, and fixed a bug. Then you asked it to apply the same pattern to the first file you looked at. It had forgotten what was in it.</p>

<p>Nothing broke. This page explains why, and it is the most useful mental model on the site.</p>

<h2>Claude has no memory between turns</h2>
<p>The model is stateless. It does not remember your last message. The whole conversation is sent again on every turn. What feels like memory is the transcript being replayed.</p>
<p>Each turn, the app or harness assembles a package: the system prompt, your <span class="jargon" data-term="claude-md">CLAUDE.md</span>, the conversation so far, files read, and tool results. That package is the <span class="jargon" data-term="context-window">context window</span>. The model sees exactly that, and nothing more.</p>

<div class="mermaid">
sequenceDiagram
    participant You
    participant Harness as Claude Code / Claude app
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

<p>Two consequences explain most surprising behaviour:</p>
<ol>
  <li><b>Long conversations cost more per turn.</b> The whole transcript is re-sent, so turn 50 costs more than turn 2. <span class="jargon" data-term="prompt-caching">Prompt caching</span> softens this. A cached prefix is billed at 10% of the input price on most models, 5% on Opus 5.5 and Sonnet 5.5, and 2.5% on Fable 5.1. It still takes up room in the window.</li>
  <li><b>When the package gets too big, something is summarised or dropped.</b> That is when Claude "forgets."</li>
</ol>

<h2>The window is big, but size is not the point</h2>
<p>Every current model holds 1M <span class="jargon" data-term="token">tokens</span>. Older models such as Haiku 4.5 hold 200K. On the current tokenizer, 1M tokens is roughly 555,000 words. Text produces about 30% more tokens on Claude 4.7 and later models than on older ones.</p>
<p>The window still fills. Agentic work fills it fast: a dozen file reads, every tool result, every test run. And the docs name a subtler problem, <span class="jargon" data-term="context-rot">context rot</span>: as the token count grows, accuracy and recall degrade.</p>

<div class="callout warn">
  <div class="c-head">⚠️ More context is not better</div>
  <p>Curating what Claude sees matters as much as how much room there is. In the author's experience, a focused 30K-token session often beats a sprawling 300K one. This is why <span class="jargon" data-term="subagent">subagents</span> exist: they spend their own context on a messy search and hand back only the answer.</p>
</div>

<h2>Thinking happens before the answer</h2>
<p>Claude can reason before it responds, like working on scrap paper. On current models this is <span class="jargon" data-term="thinking">adaptive</span>: Claude decides when to think and how much. Thinking is on by default on every current model. On Opus 5.5 and Fable 5.1 it cannot be turned off.</p>
<p>Two things surprise people:</p>
<p><b>You never see the raw reasoning.</b> On current models, thinking text is hidden by default. You can opt into a <i>summary</i>. No setting returns the raw chain of thought.</p>
<p><b>It is billed as output.</b> Thinking tokens are billed as output tokens, the expensive kind, even when hidden. This makes the <a href="#thinking-effort"><span class="jargon" data-term="effort">effort</span> dial</a> a cost control as much as a quality control.</p>

<h2>What you actually control</h2>
<p>You cannot make the model remember. You can control what goes into the package:</p>
<table class="doc">
<thead><tr><th>Lever</th><th>Where</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><b><code>CLAUDE.md</code></b> (or <code>AGENTS.md</code>)</td><td>Claude Code</td><td>Loaded at the start of every session. Keep it short: you pay for it on every request.</td></tr>
<tr><td><b>Skills</b></td><td>Claude Code, Claude app</td><td>Only the description loads at start. The body loads when used.</td></tr>
<tr><td><b>Subagents</b></td><td>Claude Code</td><td>Do large reads in a separate window. Only a summary comes back.</td></tr>
<tr><td><b><code>/compact</code></b></td><td>Claude Code</td><td>Replace the conversation with a summary. Add a focus, e.g. <code>/compact focus on the auth bug</code>.</td></tr>
<tr><td><b><code>/clear</code></b></td><td>Claude Code</td><td>Start fresh. Underrated.</td></tr>
<tr><td><b><code>/context</code></b></td><td>Claude Code</td><td>Show what is using the window right now.</td></tr>
<tr><td><b>Effort</b></td><td>Everywhere</td><td>How much thinking to spend.</td></tr>
</tbody>
</table>
<p>Claude Code also compacts automatically as you near the limit, so a full window does not end the session.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Switching to unrelated work</b> in the same terminal: run <code>/clear</code>. Old conversation crowds out what you need next.</li>
  <li><b>Starting a long new phase</b> of the same task: run <code>/compact</code> with a focus, so the summary keeps what you choose.</li>
  <li><b>About to read 30 files to find one answer</b>: send a subagent, so the reads stay out of your window.</li>
  <li><b>Claude contradicts itself or re-reads files</b>: start a fresh session with a better opening prompt. See below.</li>
</ul>

<h2>The habit that follows</h2>
<p>When a session goes wrong, the instinct is to explain harder. The author's advice: <b>start a fresh session with a better opening prompt</b>.</p>
<p>You are not fighting the model's intelligence. You are fighting a cluttered whiteboard, and clutter compounds. A clean window with a precise prompt beats a long conversation with three corrections in it, almost every time.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">Context windows</a>: sizes and context rot</li>
    <li><a href="https://platform.claude.com/docs/en/models/overview">Models overview</a>: words per token, cache-read rates</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/thinking">Thinking</a>: defaults, hidden and summarised thinking, billing</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a></li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/pricing">Pricing</a>: prompt caching and the tokenizer</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/compaction">Compaction</a></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Claude Code context window</a>: what loads, <code>/compact</code>, <code>/clear</code>, subagents</li>
    <li><a href="https://www.anthropic.com/research/effective-context-engineering-for-ai-agents">Effective context engineering for AI agents</a></li>
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
<p class="lead">A coding session that sends 50,000 input tokens costs about 10 cents on Sonnet 5.5, 20 cents on Opus 5.5, and 50 cents on Fable 5.1. That is before any model writes a word back.</p>

<p>You make this choice several times a day. This page is the reference. <a href="#choosing">Choosing a model</a> is the guide.</p>

<h2>The models</h2>
<table class="doc">
<thead><tr><th>Model</th><th>Model ID</th><th>In / out per MTok</th><th>Context / max output</th><th>Default effort (API)</th></tr></thead>
<tbody>
<tr><td><b>Claude Fable 5.1</b></td><td><code>claude-fable-5-1</code></td><td>$10 / $50</td><td>1M / 128K</td><td><code>high</code></td></tr>
<tr><td><b>Claude Mythos 5.1</b><br><small>Verified organisations only</small></td><td><code>claude-mythos-5-1</code></td><td>$10 / $50</td><td>1M / 128K</td><td><code>high</code></td></tr>
<tr><td><b>Claude Opus 5.5</b></td><td><code>claude-opus-5-5</code></td><td>$4 / $20</td><td>1M / 128K</td><td><code>medium</code></td></tr>
<tr><td><b>Claude Sonnet 5.5</b></td><td><code>claude-sonnet-5-5</code></td><td>$2 / $10</td><td>1M / 128K</td><td><code>high</code></td></tr>
<tr><td><b>Claude Haiku 5.5</b></td><td><code>claude-haiku-5-5</code></td><td>$0.10 / $0.50<br><small>$0.50 / $2.50 above 100K-token prompts</small></td><td>1M / 128K</td><td><code>medium</code></td></tr>
</tbody>
</table>

<p>Prices are per million tokens, input / output. Output costs 5× input on every current model. That is why <a href="#thinking-effort">thinking tokens</a> matter to your bill. All four main models share a June 2026 knowledge cutoff.</p>
<p>Two discounts matter. Batch requests are 50% off. Cached input costs 10% of the input price on most models, 5% on Opus 5.5 and Sonnet 5.5, and 2.5% on Fable 5.1 and Mythos 5.1.</p>

<h2>What each one is for</h2>
<table class="doc">
<thead><tr><th>Model</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><b>Opus 5.5</b></td><td>You are unsure. Anthropic recommends it as the starting model for most work. Long agentic coding, big refactors, code review, financial models, reports. It is the default in Claude Code on Pro, Max, Team, and Enterprise.</td></tr>
<tr><td><b>Sonnet 5.5</b></td><td>The task is well scoped and you want it faster and cheaper. Bug fixes, routine development, polished docs, slides, and sheets. Also building out work that Opus 5.5 has planned.</td></tr>
<tr><td><b>Haiku 5.5</b></td><td>Volume or speed matters most. Classification, extraction, routing, summaries, live support, and <span class="jargon" data-term="subagent">subagents</span> next to Opus or Sonnet.</td></tr>
<tr><td><b>Fable 5.1</b></td><td>Opus 5.5 at higher effort still falls short. Agent runs that last hours, multistep deep research, analysis carried through to a finished document.</td></tr>
<tr><td><b>Mythos 5.1</b></td><td>You are a verified organisation doing cyber defence or life-sciences work. Most people cannot use it.</td></tr>
</tbody>
</table>

<p><b>Opus 5.5</b> launched on 22 September 2026 as the first Claude 5.5 model. Anthropic says it performs at Fable 5.1's level on most work. It writes output more than 30% faster than Opus 5. At default settings it costs about 40% less to run than Opus 5. <span class="jargon" data-term="thinking">Thinking</span> is always on.</p>
<p><b>Sonnet 5.5</b> launched on 28 September 2026 as a faster, cheaper complement to Opus 5.5. Anthropic says Opus 5.5 is still clearly stronger at complex, open-ended work.</p>
<p><b>Haiku 5.5</b> launched on 7 October 2026. It is the first Haiku with adjustable <span class="jargon" data-term="effort">effort</span>, and the first with a 1M context window. It is the only current model whose price rises with prompt length.</p>
<p><b>Fable 5.1</b> launched on 1 September 2026, per the release notes. It keeps Fable 5's prices but cuts cache reads to a quarter. Mythos 5.1 is the same model with different safeguards. Access runs through the Cyber Verification Program and the Life Sciences Verification Program, and is limited to some US organisations for now.</p>

<h2>Legacy models, still available</h2>
<p>These still work and can be pinned. They are superseded, not broken: <b>Fable 5</b>, <b>Opus 5</b>, <b>Opus 4.8</b>, <b>Opus 4.7</b>, <b>Opus 4.6</b>, <b>Opus 4.5</b>, <b>Sonnet 5</b>, <b>Sonnet 4.6</b>, and <b>Haiku 4.5</b>. Notes if you use them:</p>
<ul>
  <li>Sonnet 5's $2 / $10 launch price is now its standard price. The rise to $3 / $15 planned for 1 September 2026 did not happen.</li>
  <li>Opus 5 and Opus 4.8 cost $5 / $25. Opus 5.5 is cheaper per token and stronger.</li>
  <li>Opus 4.6 and Sonnet 4.6 still accept the old <code>budget_tokens</code> thinking setting, which is deprecated. Newer models reject it. See <a href="#stale-patterns">stale patterns</a>.</li>
  <li>Haiku 4.5 holds 200K tokens, not 1M.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Sonnet 4.5 retires 30 November 2026</div>
  <p><code>claude-sonnet-4-5-20250929</code> was deprecated on 30 September 2026. Requests will fail after 30 November 2026. The official replacement is <code>claude-sonnet-5-5</code>.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Do not add date suffixes to model IDs</div>
  <p>From the 4.6 generation on, a dateless ID like <code>claude-opus-5-5</code> <b>is</b> the pinned snapshot, not a floating alias. Use the ID exactly as listed. Date suffixes are a habit from older IDs such as <code>claude-sonnet-4-5-20250929</code>.</p>
</div>

<h2>When Fable trips a safeguard</h2>
<p>Fable 5 and 5.1 run safety classifiers. In the Claude apps, a blocked request is re-run on an Opus model in the same conversation. Opus 5 answers biology, chemistry, and life-sciences requests. Opus 4.8 answers offensive-cybersecurity requests. You see a notice, and the reply is labelled with the model that answered.</p>
<p>The conversation then stays on Opus until you switch back. Switching is on by default. Turn it off in Settings &gt; Capabilities. On the API nothing switches unless you configure fallbacks: you get a normal 200 response with a refusal stop reason.</p>

<h2>Which one should you use?</h2>
<p>The author's short version: <b>Opus 5.5 by default, Sonnet 5.5 for well-scoped work you want cheaper, Haiku 5.5 for volume, and Fable 5.1 only when Opus 5.5 has already fallen short.</b> The reasoning is on the <a href="#choosing">next page</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/models/overview">Models overview</a>: the canonical table, legacy list, cutoffs</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/pricing">Pricing</a>: cache, batch, Haiku 5.5 tiers, Sonnet 5 price note</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a>: Sonnet 4.5 retirement</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions">Model IDs and versions</a></li>
    <li><a href="https://www.anthropic.com/claude-opus-5-5">Claude Opus 5.5</a> · <a href="https://www.anthropic.com/claude-sonnet-5-5">Claude Sonnet 5.5</a> · <a href="https://www.anthropic.com/claude-haiku-5-5">Claude Haiku 5.5</a></li>
    <li><a href="https://www.anthropic.com/claude-fable-and-mythos-5-1">Claude Fable 5.1 and Claude Mythos 5.1</a></li>
    <li><a href="https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1">What's new in Claude Fable 5.1</a></li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a>: launch dates</li>
    <li><a href="https://code.claude.com/docs/en/model-config">Claude Code model configuration</a>: default model per plan</li>
    <li><a href="https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5-or-fable-5-1">Why Claude switched models in your conversation with Fable 5 or Fable 5.1</a></li>
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
<p class="lead">You are about to refactor a managed package's trigger framework across 40 classes. Should you reach for Fable 5.1, because it is the most capable model?</p>

<p>Usually not. Start with Opus 5.5 and raise <span class="jargon" data-term="effort">effort</span> to <code>high</code> or <code>xhigh</code>. Anthropic says Opus 5.5 performs at Fable 5.1's level on most work, at 40% of the per-token price. Large refactors are listed as Opus 5.5 work. The expensive mistake is assuming the biggest model gives the best outcome.</p>

<div class="callout tip">
  <div class="c-head">💡 The rule that saves the most money</div>
  <p><b>Tune effort before you switch models.</b> This is Anthropic's own guidance: tuning effort is often a better lever than switching models.</p>
</div>

<p>If a model underperforms, ask: is it under-thinking, or out of its depth? Under-thinking is an effort problem, and effort is cheap. Out of depth is a model problem.</p>
<p>Note that Opus 5.5 defaults to <code>medium</code> effort. A shallow answer from Opus 5.5 is often fixed by raising effort, not by changing model.</p>

<h2>The decision tree</h2>
<div class="mermaid">
flowchart TD
    A["Pick a model"] --> B{"High volume or<br/>latency-critical?"}
    B -- Yes --> C["Haiku 5.5"]
    B -- No --> D{"Well scoped,<br/>and cost or speed matters?"}
    D -- Yes --> E["Sonnet 5.5"]
    D -- No --> F["Opus 5.5 · default"]
    F --> G{"Good enough?"}
    G -- "No: shallow" --> H["Raise effort"]
    H --> G
    G -- "No, even at xhigh / max" --> J["Fable 5.1"]
</div>
<p class="diagram-caption">Note the loop: effort goes up before the model does.</p>

<h2>By scenario</h2>
<table class="doc">
<thead><tr><th>Model</th><th>Cost</th><th>Reach for it when…</th></tr></thead>
<tbody>
<tr><td>Claude Fable 5.1</td><td>$$$$</td><td>Hours-long agent sessions, deep research, and work where Opus 5.5 at high effort already fell short.</td></tr>
<tr><td>Claude Mythos 5.1</td><td>$$$$</td><td>Not available to most people. Verified organisations only.</td></tr>
<tr><td>Claude Opus 5.5</td><td>$$$</td><td>Your default. Long agentic coding, large refactors, code review, knowledge work.</td></tr>
<tr><td>Claude Sonnet 5.5</td><td>$$</td><td>Well-scoped everyday coding and documents, and agents that run at volume.</td></tr>
<tr><td>Claude Haiku 5.5</td><td>$</td><td>Classification, extraction, routing, summaries, and subagents.</td></tr>
</tbody>
</table>

<h2>Concretely, in Salesforce terms</h2>
<p>These picks are the author's.</p>
<table class="doc">
<thead><tr><th>Task</th><th>Model</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Generate Apex test classes for a service class</td><td><b>Sonnet 5.5</b></td><td>Well defined and patterned. Fast and cheap.</td></tr>
<tr><td>Refactor a trigger framework across 40 classes</td><td><b>Opus 5.5</b> at <code>high</code> or <code>xhigh</code></td><td>Hard, multi-file, needs sustained coherence.</td></tr>
<tr><td>"Why does this batch job hit CPU limits only in prod?"</td><td><b>Opus 5.5</b></td><td>Diagnostic reasoning from sparse evidence.</td></tr>
<tr><td>Triage 500 support emails into categories</td><td><b>Haiku 5.5</b> at <code>low</code></td><td>High volume, simple judgement, latency matters.</td></tr>
<tr><td>Subagents fanning out over 30 LWC components</td><td><b>Haiku 5.5</b> for the workers</td><td>Cheap parallel readers reporting to a smarter lead.</td></tr>
<tr><td>An overnight org-wide migration you review in the morning</td><td><b>Opus 5.5</b>, or <b>Fable 5.1</b> if Opus falls short</td><td>Long autonomous runs are where Fable earns its price.</td></tr>
<tr><td>Writing this documentation site</td><td><b>Opus 5.5</b> drafting, <b>Sonnet 5.5</b> bulk</td><td>Judgement where it counts, volume where it doesn't.</td></tr>
</tbody>
</table>

<h2>When Fable 5.1 is actually right</h2>
<p>Fable 5.1 costs 2.5× Opus 5.5 per token. It earns that when:</p>
<ul>
  <li>The run is <b>long and unsupervised</b>: hours of autonomous work you review afterwards.</li>
  <li>The task needs <b>the most capability available</b>, and you have watched Opus 5.5 at <code>xhigh</code> or <code>max</code> fall short.</li>
  <li><b>Correctness dominates cost</b>: a subtly wrong migration costs more than the tokens.</li>
</ul>
<p>One wrinkle: Fable 5.1 cache reads cost 2.5% of its input price. Long sessions that keep re-reading a cached prefix narrow the gap.</p>

<h2>Combining models</h2>
<p>You do not have to pick one. Anthropic describes two patterns. An <b>executor</b> model escalates hard decisions to a stronger <b>advisor</b>. Or a strong <b>orchestrator</b> hands bulk work to cheaper <b>workers</b>. In Claude Code, the <code>opusplan</code> alias uses Opus in plan mode, then Sonnet to execute.</p>

<h2>The subscription angle</h2>
<p>On Pro or Max, cost is not dollars per token. It is <b>your usage allowance</b>. claude.ai, Claude Code, and Claude Desktop share one limit, with a five-hour window and weekly caps. Max plans have a separate weekly limit for Fable. Fast mode in Claude Code bills to usage credits only.</p>

<div class="callout warn">
  <div class="c-head">⚠️ On a subscription, "always use the biggest model" doesn't mean a bigger bill</div>
  <p>It means hitting a wall on Thursday. Keep the expensive models and high effort for the work that needs them.</p>
</div>

<h2>What to do when you are unsure</h2>
<ol>
  <li>Start on <b>Opus 5.5</b> at its default effort (<code>medium</code>).</li>
  <li>If the output is shallow, raise effort to <code>high</code>, then <code>xhigh</code>, before touching the model.</li>
  <li>If the task turns out to be routine, drop to <b>Sonnet 5.5</b> to save cost.</li>
  <li>Only if Opus 5.5 at <code>xhigh</code> or <code>max</code> still falls short, try <b>Fable 5.1</b>.</li>
</ol>
<p>Most work never leaves step 1 or 2.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/choosing-a-model">Choosing the right model</a>: effort before model, the selection matrix</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence">Optimizing for cost and intelligence</a>: advisor and orchestrator patterns</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a></li>
    <li><a href="https://platform.claude.com/docs/en/models/overview">Models overview</a></li>
    <li><a href="https://www.anthropic.com/claude-opus-5-5">Claude Opus 5.5</a>: Fable 5.1-level performance, 40% lower cost than Opus 5</li>
    <li><a href="https://code.claude.com/docs/en/model-config">Claude Code model configuration</a>: aliases including <code>opusplan</code></li>
    <li><a href="https://code.claude.com/docs/en/fast-mode">Fast mode in Claude Code</a>: usage credits only</li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a></li>
    <li><a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a>: the separate Fable limit on Max</li>
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
<p class="lead">Your agent gives a shallow answer to a hard question. The instinct is to upgrade the model. Usually the fix is one dial: raise effort and ask again.</p>

<p>Three controls govern how hard Claude works and how fast it answers. They interact, and effort is the one you turn most.</p>

<h2>Thinking: adaptive, and mostly not yours to tune</h2>
<p>Claude reasons before answering. On current models that reasoning is <span class="jargon" data-term="thinking">adaptive</span>: Claude decides per request when to think and how deeply. You do not set a thinking budget. Effort steers it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Deprecated: budget_tokens</div>
  <p><code>thinking: {type: "enabled", budget_tokens: N}</code> is the old way. It is <b>deprecated</b> on Opus 4.6 and Sonnet 4.6. It is <b>rejected with a 400 error</b> on every later model. Omit <code>thinking</code> or send <code>{type: "adaptive"}</code>, and control depth with effort.</p>
</div>

<p>Per-model behaviour differs in ways that bite:</p>
<table class="doc">
<thead><tr><th>Model</th><th>No <code>thinking</code> field</th><th>Can you turn thinking off?</th></tr></thead>
<tbody>
<tr><td><b>Fable 5.1, Opus 5.5</b></td><td>Thinking on</td><td>No. <code>disabled</code> returns a 400.</td></tr>
<tr><td><b>Sonnet 5.5</b></td><td>Thinking on</td><td><code>disabled</code> returns a 400. Send <code>{type: "between_tools"}</code> to skip up-front thinking, at <code>high</code> effort or below.</td></tr>
<tr><td><b>Haiku 5.5, Opus 5</b></td><td>Thinking on</td><td>Yes, at <code>high</code> effort or below.</td></tr>
<tr><td><b>Sonnet 5</b></td><td>Thinking on</td><td>Yes.</td></tr>
<tr><td><b>Opus 4.8, Opus 4.7</b></td><td>Thinking <i>off</i></td><td>It is off unless you send <code>{type: "adaptive"}</code>.</td></tr>
<tr><td><b>Opus 4.6, Sonnet 4.6</b></td><td>Thinking <i>off</i></td><td>Off unless you send <code>adaptive</code>. <code>budget_tokens</code> still works but is deprecated.</td></tr>
</tbody>
</table>

<p>Note the trap: on Opus 4.8, <i>omitting</i> <code>thinking</code> means no thinking. On every 5.x model, omitting it means adaptive thinking. Same absence, opposite behaviour.</p>
<p>In the Claude apps, thinking cannot be turned off on Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, or Opus 5.</p>

<h3>You cannot read the raw thinking</h3>
<p>On current models, thinking text is hidden by default (<code>display: "omitted"</code>). The blocks arrive with empty text. Opt into a summary with <code>display: "summarized"</code>. No setting returns the raw chain of thought.</p>
<p>This matters if you stream to users: the default looks like a long pause. A beta option, <code>display: "updates"</code>, returns only the short progress notes Claude writes between tool calls. Opus 5.5 and Fable 5.1 put those notes in thinking blocks, so a client that shows only text goes quiet during tool runs.</p>
<p>You are billed for the full thinking either way. Hiding it cuts latency, not cost.</p>

<h2>Effort: the dial that matters</h2>
<p><code>low</code> · <code>medium</code> · <code>high</code> · <code>xhigh</code> · <code>max</code>. All four current models support all five levels.</p>
<table class="doc">
<thead><tr><th>Level</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><code>low</code></td><td>Simple tasks that need speed and low cost: subagents, chat, short tool calls.</td></tr>
<tr><td><code>medium</code></td><td>Agentic work balancing speed, cost, and quality. The default on Opus 5.5 and Haiku 5.5.</td></tr>
<tr><td><code>high</code></td><td>Complex reasoning, hard coding, agentic tasks. The default on most other models.</td></tr>
<tr><td><code>xhigh</code></td><td>Long agentic and coding runs, over 30 minutes, with token budgets in the millions.</td></tr>
<tr><td><code>max</code></td><td>The deepest reasoning, cost no object. Can overthink simple or structured tasks.</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Opus 5.5 defaults to medium, not high</div>
  <p>A request that omits effort runs one level lower on Opus 5.5 than on Opus 5. Level names are not equal across models either. Anthropic reports Opus 5.5 at <code>medium</code> matches or beats Opus 5 at <code>high</code>. Re-test your settings when you change model rather than copying them over.</p>
</div>

<p><b>Effort is a cost control.</b> Thinking tokens are billed as output, the 5×-priced kind. Effort is the main lever on that bill. It affects all output, including tool calls: lower effort means fewer, terser calls.</p>
<p>Low effort really is low. At <code>low</code>, Haiku 5.5 is more likely to skip a search or a check, and Fable 5.1 calls search tools less often. Good for latency. Risky on complex problems.</p>

<div class="callout tip">
  <div class="c-head">💡 Higher effort can be cheaper overall</div>
  <p>The author's experience: on agentic work, better planning means fewer wrong turns and fewer tool calls. A higher setting can cost less end to end than a low one that flails. Measure on your own tasks.</p>
</div>

<h3>Where you set it</h3>
<ul>
  <li><b>Claude Code</b>: <code>/effort</code> opens a slider, or <code>/effort high</code> sets it directly. Also <code>--effort</code>, <code>CLAUDE_CODE_EFFORT_LEVEL</code>, the <code>effortLevel</code> setting, and an <code>effort</code> field in skill or subagent frontmatter. Defaults: <code>medium</code> on Opus 5.5, Sonnet 5.5, and Haiku 5.5; <code>high</code> on most others.</li>
  <li><b>Claude Code, one turn</b>: put <code>ultrathink</code> in your prompt for deeper reasoning on that turn only. Phrases like "think hard" are just text.</li>
  <li><b>Claude apps</b>: the model menu next to the send button. Low, Medium, High, Extra high, Max. Extra high is on Opus 4.7 and newer. Sonnet 5.5 and Fable 5.1 default to Medium there.</li>
  <li><b>API</b>: <code>output_config: { effort: "high" }</code>. It sits inside <code>output_config</code>, not at the top level.</li>
</ul>
<p>Changing top-level effort between requests breaks the prompt cache. On Opus 5.5, Opus 5, Sonnet 5.5, Haiku 5.5, and Fable 5.1, a beta per-message effort change keeps the cache.</p>

<h2>Fast mode: speed, at a price</h2>
<p>Fast mode runs the same model at up to <b>2.5× output tokens per second</b>, for premium pricing. Same intelligence. The gain is in output speed, not time to the first token.</p>
<table class="doc">
<thead><tr><th>Model</th><th>Fast price (in / out per MTok)</th><th>Status on the API</th></tr></thead>
<tbody>
<tr><td><b>Opus 5.5</b></td><td>$8 / $40</td><td>Available. No beta header, no access request.</td></tr>
<tr><td><b>Opus 5, Opus 4.8</b></td><td>$10 / $50</td><td>Research preview. Needs the <code>fast-mode-2026-02-01</code> header and waitlist access.</td></tr>
<tr><td>Opus 4.7</td><td>—</td><td>Removed on 24 July 2026.</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Fast mode on Opus 4.6 fails silently</div>
  <p>A <code>speed: "fast"</code> request to Opus 4.6 with the beta header succeeds but runs at standard speed. Check <code>usage.speed</code> in the response: it says <code>"standard"</code>. Other unsupported models return an error.</p>
</div>

<p>On the API, set <code>speed: "fast"</code> as a top-level parameter. Fast mode does not work with the Batch API. In Claude Code, toggle it with <code>/fast</code>. There it bills to usage credits only on subscription plans, and Team and Enterprise need an Owner to enable it. The Claude Code docs still call it a research preview.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Hard Apex refactor in Claude Code</b>: Opus 5.5, effort <code>high</code> or <code>xhigh</code>, fast mode off. You are not watching every token, and planning pays for itself.</li>
  <li><b>Live debugging while you wait</b>: Opus 5.5 at <code>medium</code>, with <code>/fast</code> on. Turn it on at the start of the session: switching mid-conversation re-reads the context at the fast uncached price.</li>
  <li><b>Subagent scanning 30 files</b>: Haiku 5.5 at <code>low</code>. It is reading, not reasoning.</li>
  <li><b>Overnight batch job</b>: standard speed, Batch API. The fast premium buys nothing when nobody is waiting.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/thinking">Thinking</a>: per-model behaviour, display options, billing</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a>: levels, defaults, per-message effort</li>
    <li><a href="https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5">What's new in Claude Opus 5.5</a>: medium default, thinking always on</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5">Prompting Claude Opus 5.5</a>: effort calibration</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/fast-mode">Fast mode</a>: models, pricing, the Opus 4.6 behaviour</li>
    <li><a href="https://code.claude.com/docs/en/fast-mode">Fast mode in Claude Code</a>: <code>/fast</code>, usage credits, the Opus 4.7 removal</li>
    <li><a href="https://code.claude.com/docs/en/model-config">Claude Code model configuration</a>: <code>/effort</code>, defaults, <code>ultrathink</code></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/extended-thinking">Extended thinking</a>: the legacy mode</li>
    <li><a href="https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings">Change the model, effort and thinking settings</a></li>
    <li><a href="https://www.anthropic.com/claude-sonnet-5-5">Claude Sonnet 5.5</a> · <a href="https://www.anthropic.com/claude-fable-and-mythos-5-1">Claude Fable 5.1</a>: app default effort</li>
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
<p class="lead">You revive an integration written a year ago, point it at a current model, and it fails with a 400. Much of what a well-informed engineer knew about Claude in 2025 is now wrong. This page is the diff.</p>

<p>Blog posts, forum answers, and other models' training data are full of these patterns.</p>

<h2>When to use it</h2>
<ul>
  <li>A request returns <b>400</b> right after you change the model ID.</li>
  <li>You are reviewing code, maybe AI-written, that sets <code>temperature</code> or <code>budget_tokens</code>.</li>
  <li>You are following a tutorial that cites <code>docs.anthropic.com</code> or names Claude in Slack.</li>
  <li>You are auditing a codebase for models that are retired or about to retire.</li>
</ul>

<h2>Retired models</h2>
<p>Requests to retired models fail. The table shows Anthropic's official replacement for each.</p>
<table class="doc">
<thead><tr><th>Model</th><th>Retired</th><th>Official replacement</th></tr></thead>
<tbody>
<tr><td><code>claude-3-5-sonnet-20240620</code> / <code>-20241022</code></td><td>28 Oct 2025</td><td><code>claude-sonnet-5-5</code></td></tr>
<tr><td><code>claude-3-opus-20240229</code></td><td>5 Jan 2026</td><td><code>claude-opus-4-8</code></td></tr>
<tr><td><code>claude-3-7-sonnet-20250219</code></td><td>19 Feb 2026</td><td><code>claude-sonnet-5-5</code></td></tr>
<tr><td><code>claude-3-5-haiku-20241022</code></td><td>19 Feb 2026</td><td><code>claude-haiku-4-5-20251001</code></td></tr>
<tr><td><code>claude-3-haiku-20240307</code></td><td>20 Apr 2026</td><td><code>claude-haiku-4-5-20251001</code></td></tr>
<tr><td><code>claude-opus-4-20250514</code></td><td>15 Jun 2026</td><td><code>claude-opus-4-8</code></td></tr>
<tr><td><code>claude-sonnet-4-20250514</code></td><td>15 Jun 2026</td><td><code>claude-sonnet-5-5</code></td></tr>
<tr><td><code>claude-opus-4-1-20250805</code></td><td>5 Aug 2026</td><td><code>claude-opus-4-8</code></td></tr>
</tbody>
</table>
<p>The author's advice: for new work, skip the listed replacement and go straight to the current lineup (Opus 5.5, Sonnet 5.5, Haiku 5.5). Some retired models remain on Bedrock or Google Cloud, which set their own dates.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Retiring soon: Sonnet 4.5</div>
  <p><code>claude-sonnet-4-5-20250929</code> was deprecated on 30 September 2026 and <b>retires 30 November 2026</b>. Migrate to <code>claude-sonnet-5-5</code>. Also watch Opus 4.5, whose retirement is "not sooner than" 24 November 2026.</p>
</div>

<p><code>claude-mythos-preview</code> is deprecated, and its retirement date is "to be announced". Fast mode on Opus 4.7 was removed on 24 July 2026 (see <a href="#thinking-effort">thinking and effort</a>).</p>

<h2>API parameters that now fail</h2>

<div class="callout warn">
  <div class="c-head">⚠️ temperature, top_p, top_k</div>
  <p><b>Old:</b> <code>temperature: 0.7</code> to tune creativity, <code>temperature: 0</code> for consistency.<br>
     <b>New:</b> Remove them. Steer with prompting.</p>
  <p>API version <code>2026-10-21</code> <b>removed</b> all three. Sending any of them returns a 400, even at the default value. On the older <code>2023-06-01</code> version, non-default values return a 400 on Claude 4.7 and later models. On older models that still accepted a low temperature, that effect is gone, and no other setting replaces it.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ budget_tokens</div>
  <p><b>Old:</b> <code>thinking: { type: "enabled", budget_tokens: 10000 }</code><br>
     <b>New:</b> omit <code>thinking</code> (or send <code>{ type: "adaptive" }</code>) and set <code>output_config: { effort: "high" }</code>.</p>
  <p>Deprecated on Opus 4.6 and Sonnet 4.6. <b>Returns 400</b> on every later model. There is no direct replacement for the number. <span class="jargon" data-term="effort">Effort</span> is the control now.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Turning thinking off</div>
  <p><b>Old:</b> <code>thinking: { type: "disabled" }</code> for speed.<br>
     <b>New:</b> lower effort instead.</p>
  <p><b>Returns 400</b> on Opus 5.5, Fable 5.1, and Sonnet 5.5. Sonnet 5.5 offers <code>{ type: "between_tools" }</code> as its lowest setting.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Forced tool use</div>
  <p><b>Old:</b> <code>tool_choice: { type: "any" }</code> or <code>{ type: "tool", name: "..." }</code> to force a call.<br>
     <b>New:</b> <code>tool_choice: { type: "auto" }</code> with <code>strict: true</code> on the tool, or structured outputs. Say in the prompt when to use the tool.</p>
  <p><b>Returns 400</b> on Fable 5.1, Opus 5.5, and Sonnet 5.5.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Assistant prefill</div>
  <p><b>Old:</b> ending <code>messages</code> with an <code>assistant</code> turn to force a response shape.<br>
     <b>New:</b> structured outputs via <code>output_config.format</code>, or a system-prompt instruction.</p>
  <p><b>Returns 400</b> on Opus 4.6 and every later Opus, Fable 5.1, Sonnet 5.5, and Haiku 5.5.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ output_format</div>
  <p><b>Old:</b> top-level <code>output_format</code> on <code>messages.create()</code><br>
     <b>New:</b> <code>output_config: { format: { type: "json_schema", schema: ... } }</code></p>
  <p><code>output_format</code> is deprecated. It now returns a 400 unless you add the <code>structured-outputs-2025-11-13</code> beta header.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Editing conversation history</div>
  <p><b>Old:</b> rewriting earlier turns, the system prompt, or the tool list between requests.<br>
     <b>New:</b> keep the conversation append-only. Add instructions with mid-conversation system messages.</p>
  <p>On Fable 5.1 and Opus 5.5, changing anything before a thinking block invalidates it. For accounts created on or after 31 August 2026, the next request returns a 400.</p>
</div>

<h2>Names that changed</h2>
<table class="doc">
<thead><tr><th>Old name</th><th>Current name</th></tr></thead>
<tbody>
<tr><td>Claude Code SDK</td><td><b>Claude <span class="jargon" data-term="agent-sdk">Agent SDK</span></b></td></tr>
<tr><td>Anthropic API</td><td><b>Claude API</b></td></tr>
<tr><td>Claude in Slack</td><td><b>Claude Tag</b> (switched over 3 Aug 2026)</td></tr>
<tr><td>Chat and Cowork as separate modes</td><td><b>One Claude</b> conversation (rolling out since 16 Sep 2026)</td></tr>
<tr><td>Routines (Claude Code cloud)</td><td><b>Scheduled tasks</b></td></tr>
<tr><td>Desktop extensions as <code>.dxt</code></td><td><b><code>.mcpb</code></b> (<span class="jargon" data-term="mcpb">MCP Bundle</span>). <code>.dxt</code> still works.</td></tr>
</tbody>
</table>

<h2>URLs that moved</h2>
<p>Search engines still surface old URLs. They redirect, but cite the current one:</p>
<table class="doc">
<thead><tr><th>Old</th><th>Current</th><th>For</th></tr></thead>
<tbody>
<tr><td><code>docs.anthropic.com</code>, <code>docs.claude.com</code></td><td><b><code>platform.claude.com/docs</code></b></td><td>API and platform</td></tr>
<tr><td><code>console.anthropic.com</code></td><td><b><code>platform.claude.com</code></b></td><td>Console</td></tr>
<tr><td><code>support.anthropic.com</code></td><td><b><code>support.claude.com</code></b></td><td>Help centre</td></tr>
<tr><td><code>platform.claude.com/docs/en/agent-sdk</code></td><td><b><code>code.claude.com/docs/en/agent-sdk</code></b></td><td>Agent SDK</td></tr>
<tr><td><code>anthropic.com/engineering/…</code></td><td><b><code>anthropic.com/research/…</code></b></td><td>Engineering posts</td></tr>
<tr><td><code>claude.com/blog/…</code></td><td><b><code>claude.com/resources/articles/…</code></b></td><td>Product posts</td></tr>
</tbody>
</table>
<p>Rule of thumb: <b>platform</b> for the API, <b>code</b> for Claude Code, <b>support</b> for the apps.</p>

<h2>Claude Code specifics</h2>
<ul>
  <li><b>The default model changed.</b> Claude Code now defaults to Opus 5.5 on Pro, Max, Team, Enterprise, and the API. Advice that "Pro uses Sonnet" is out of date.</li>
  <li><b><code>/output-style</code> is back.</b> If you read it was removed: since v2.1.269, <code>/output-style &lt;style&gt;</code> switches styles again. <code>/config</code> also works.</li>
  <li><b>Commands and skills merged.</b> <code>.claude/commands/deploy.md</code> and <code>.claude/skills/deploy/SKILL.md</code> both create <code>/deploy</code>. Old command files keep working. Prefer <code>SKILL.md</code> for new work. If both share a name, the skill wins.</li>
</ul>

<h2>Things that are true but sound wrong</h2>
<ul>
  <li><b>1M context is standard on every current model.</b> No beta header. Standard pricing across the window, except Haiku 5.5, which costs more above 100K-token prompts.</li>
  <li><b>Custom <span class="jargon" data-term="connector">connectors</span> connect from Anthropic's cloud, not your machine.</b> This holds even in the Desktop app. Your MCP server must be reachable from Anthropic's IP ranges.</li>
  <li><b>Claude Code is not only a CLI.</b> It runs in the terminal, the Desktop app, VS Code, JetBrains, and the browser.</li>
  <li><b>The free plan includes artifacts but not Claude Code.</b> Free users can add one custom connector.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a>: the retirement table and parameter removals</li>
    <li><a href="https://platform.claude.com/docs/en/api/migration-2026-10-21">Migrating to API version 2026-10-21</a>: sampling parameters removed</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/migration-guide">Migration guides</a> · <a href="https://platform.claude.com/docs/en/models/opus-5-5/migration-guide">Opus 5.5 migration guide</a> · <a href="https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide">Sonnet 5.5 migration guide</a></li>
    <li><a href="https://platform.claude.com/docs/en/models/haiku-5-5/whats-new-haiku-5-5">What's new in Claude Haiku 5.5</a> · <a href="https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1">What's new in Claude Fable 5.1</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/thinking">Thinking</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs">Structured outputs</a>: the <code>output_format</code> deprecation</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions">Model IDs and versions</a></li>
    <li><a href="https://code.claude.com/docs/en/agent-sdk/overview">Agent SDK overview</a></li>
    <li><a href="https://code.claude.com/docs/en/model-config">Claude Code model configuration</a>: default model per plan</li>
    <li><a href="https://code.claude.com/docs/en/output-styles">Output styles</a> · <a href="https://code.claude.com/docs/en/skills">Skills</a></li>
    <li><a href="https://code.claude.com/docs/en/routines">Scheduled tasks</a>: formerly routines</li>
    <li><a href="https://www.anthropic.com/research/desktop-extensions">Desktop Extensions</a>: the <code>.mcpb</code> rename</li>
    <li><a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">Get started with custom connectors using remote MCP</a></li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">Context windows</a>: 1M by default</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code setup</a>: plans that include Claude Code</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a>: artifacts on every plan</li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag</a> · <a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a></li>
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
<p class="lead">You want a bug fixed across three files, the tests run, and a pull request opened. Claude Code does that work inside your repo. You can drive it from a terminal, an IDE, a desktop app, a browser, or your phone.</p>

<p>Claude Code is an agentic coding tool. It reads your code, runs commands, edits files, and checks its work. Every surface runs the same engine, so your <code>CLAUDE.md</code>, settings, and MCP servers apply everywhere.</p>

<h2>The surfaces</h2>
<table class="doc">
<thead><tr><th>Surface</th><th>What it adds</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><b>Terminal</b></td><td>The full CLI. New features land here first.</td><td>You live in a shell, or you want to script and pipe Claude.</td></tr>
<tr><td><b>Desktop app</b><br><small>Code tab · macOS, Windows (x64 and ARM64), Linux beta</small></td><td>Parallel sessions, git worktree isolation, visual diff review with line comments, an integrated terminal, a browser pane for previewing your app.</td><td>You run several tasks side by side and want to review diffs visually.</td></tr>
<tr><td><b>VS Code / JetBrains</b></td><td>Inline diffs, @-mentions of files and line ranges, plan review, and your IDE's errors available to Claude.</td><td>You want Claude next to your editor, seeing what you have selected.</td></tr>
<tr><td><b>Web and mobile</b><br><small>claude.ai/code · Claude app</small></td><td><span class="jargon" data-term="cloud-session">Cloud sessions</span> on Anthropic's machines. They keep running when you close the laptop.</td><td>The task is long, the repo is not on your machine, or you want several tasks running at once.</td></tr>
</tbody>
</table>

<p>The desktop app includes Claude Code, so it needs no separate CLI install. It needs a paid plan. Cloud sessions clone and push through GitHub.</p>

<h2>Moving work between surfaces</h2>
<p>Each surface keeps its own session list. You move a task between them on purpose.</p>
<div class="mermaid">
flowchart LR
    W["Cloud session<br/>claude.ai/code or phone"] -->|"claude --teleport"| T["Terminal"]
    T -->|"claude --cloud"| W2["New cloud session"]
    T -->|"/desktop"| D["Desktop app"]
    T -->|"Remote Control"| P["Phone or browser<br/>steering your local session"]
</div>
<p class="diagram-caption">Teleport pulls a cloud session down. <code>--cloud</code> starts a new one; it cannot push an existing terminal session up.</p>

<table class="doc">
<thead><tr><th>You want to…</th><th>Do this</th></tr></thead>
<tbody>
<tr><td>Finish a cloud task on your laptop</td><td><code>claude --teleport</code>, or <code>/teleport</code> inside a session. It checks out the branch and loads the conversation.</td></tr>
<tr><td>Hand a task to the cloud and keep working</td><td><code>claude --cloud "Fix the flaky test in auth.spec.ts"</code></td></tr>
<tr><td>Review a terminal session's diffs visually</td><td><code>/desktop</code> (macOS and x64 Windows)</td></tr>
<tr><td>Steer a local session from your phone</td><td><code>/remote-control</code>. Code still runs on your machine.</td></tr>
</tbody>
</table>
<p>Teleport, <code>--cloud</code>, and <code>/desktop</code> need a claude.ai subscription login, not an API key.</p>

<div class="callout tip">
  <div class="c-head">💡 The IDE plugins wrap the same CLI</div>
  <p>The VS Code extension bundles its own copy of the CLI for its chat panel. The JetBrains plugin runs your installed <code>claude</code> in the IDE terminal, so install the CLI first. Both start a hidden built-in MCP server named <code>ide</code>. It hands Claude your current selection and lets it read your IDE's diagnostics. That is most of what makes IDE use feel different.</p>
</div>

<h2>What it actually does</h2>
<p>Given a task, Claude Code reads files, runs commands, edits code, and checks the result. It loops until the job is done or it needs you. Each of those actions is <span class="jargon" data-term="tool-use">tool use</span>. Nobody drew the path in advance, unlike a <span class="jargon" data-term="workflow">workflow</span>. It is an <span class="jargon" data-term="agent">agent</span>: it picks its own next step.</p>
<p>That is the whole value and the whole risk. It is why <a href="#core-loop">permission modes</a> exist, and why <a href="#core-loop">plan mode</a> is the habit worth building first.</p>
<p>On a Pro, Max, Team, or Enterprise plan, and on the Anthropic API, Claude Code starts on Opus 5.5. Switch with <code>/model</code>.</p>

<h2>When to use it</h2>
<ul>
  <li><b>A change that spans files.</b> "Rename this field everywhere and update the tests." Claude finds every use, edits, and runs the suite.</li>
  <li><b>A bug you can describe but not locate.</b> Paste the stack trace. Claude traces it through the code and proposes a fix.</li>
  <li><b>Chores you keep postponing.</b> Lint fixes, dependency bumps, release notes, tests for untested code.</li>
  <li><b>Git work.</b> "Commit this with a clear message and open a PR."</li>
</ul>

<h2>What it is not</h2>
<ul>
  <li><b>Not autocomplete.</b> It does not compete with tab completion. It takes whole tasks.</li>
  <li><b>Not <span class="jargon" data-term="cowork">Cowork</span>.</b> Cowork handles documents, spreadsheets, and research in the Claude app, where it is merging into ordinary chat. Claude Code works in a code checkout.</li>
  <li><b>Not the <span class="jargon" data-term="agent-sdk">Agent SDK</span>.</b> The SDK packages this same harness as a library for your own apps.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/overview">Overview</a> — surfaces and moving work between them</li>
    <li><a href="https://code.claude.com/docs/en/desktop">The desktop app</a> · <a href="https://code.claude.com/docs/en/claude-code-on-the-web">Cloud sessions</a> — teleport, <code>--cloud</code>, plans</li>
    <li><a href="https://code.claude.com/docs/en/vs-code">VS Code</a> · <a href="https://code.claude.com/docs/en/jetbrains">JetBrains</a> — bundled CLI, the <code>ide</code> MCP server</li>
    <li><a href="https://code.claude.com/docs/en/sessions">Sessions</a> · <a href="https://code.claude.com/docs/en/remote-control">Remote Control</a></li>
    <li><a href="https://code.claude.com/docs/en/model-config">Model configuration</a> — default model per plan</li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a></li>
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
<p class="lead">You have a fresh laptop and want your first prompt running in five minutes. Most of that time goes on choosing how to pay.</p>

<h2>Install</h2>
<table class="doc">
<thead><tr><th>Platform</th><th>Command</th></tr></thead>
<tbody>
<tr><td>macOS / Linux / WSL</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td></tr>
<tr><td>Windows PowerShell</td><td><code>irm https://claude.ai/install.ps1 | iex</code></td></tr>
<tr><td>Windows CMD</td><td><code>curl -fsSL https://claude.ai/install.cmd -o install.cmd &amp;&amp; install.cmd &amp;&amp; del install.cmd</code></td></tr>
<tr><td>Homebrew</td><td><code>brew install --cask claude-code</code></td></tr>
<tr><td>WinGet</td><td><code>winget install Anthropic.ClaudeCode</code></td></tr>
<tr><td>apt / dnf / apk</td><td>Signed repositories for Debian, Ubuntu, Fedora, RHEL, and Alpine. See Setup.</td></tr>
<tr><td>npm</td><td><code>npm install -g @anthropic-ai/claude-code</code> <small>(Node 22+; never with <code>sudo</code>)</small></td></tr>
</tbody>
</table>

<p>The native installer is the recommended path. It needs no Node. Supported systems: macOS 13+, Windows 10 1809+ or Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+. You need 4 GB of RAM and an x64 or ARM64 processor.</p>
<p>On native Windows, Git for Windows is optional. With it, Claude uses Git Bash. Without it, Claude runs commands through PowerShell. Use WSL 2 if you want <span class="jargon" data-term="sandbox">sandboxing</span>.</p>
<p>Check the install with <code>claude --version</code>. For a fuller check, run <code>claude doctor</code> in your shell.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Only the native install updates itself</div>
  <p>Native installs update in the background. Homebrew, WinGet, apt, dnf, and apk do not, by default. Upgrade them yourself, or set <code>CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1</code> to let Claude Code run the Homebrew or WinGet upgrade for you. The <code>claude-code</code> cask tracks the stable channel, about a week behind. <code>claude-code@latest</code> gets every release.</p>
</div>

<h2>Pick a sign-in</h2>
<table class="doc">
<thead><tr><th>Option</th><th>How you pay</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><b>Claude subscription</b></td><td>Pro ($20/month, or $17/month billed annually), Max (from $100/month), Team, or Enterprise. Usage comes from your plan's limits.</td><td>You are one person coding most days. This is the default for most people.</td></tr>
<tr><td><b>Claude Console</b></td><td>Pay-as-you-go API billing. An admin must invite you.</td><td>Your organization wants per-token billing and API-style controls.</td></tr>
<tr><td><b>Cloud provider</b></td><td>Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry. Set the provider's environment variables; no browser login.</td><td>Your company already buys Claude through its cloud account.</td></tr>
</tbody>
</table>
<p>Run <code>claude</code> and follow the browser prompt. If the browser cannot reach back, for example over SSH or in a container, paste the code it shows into the terminal.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The Free plan does not include Claude Code</div>
  <p>Pro is the entry point. Claude Code is included in every paid plan.</p>
</div>

<h2>Where your credentials live</h2>
<ul>
  <li><b>macOS:</b> the encrypted Keychain. If the Keychain is locked, for example over SSH, it falls back to <code>~/.claude/.credentials.json</code>.</li>
  <li><b>Linux:</b> <code>~/.claude/.credentials.json</code> at mode <code>0600</code>.</li>
  <li><b>Windows:</b> <code>%USERPROFILE%\\.claude\\.credentials.json</code>, protected by your user profile's permissions.</li>
</ul>

<h3>Precedence, highest first</h3>
<ol>
  <li>Cloud provider credentials (<code>CLAUDE_CODE_USE_BEDROCK</code> / <code>_VERTEX</code> / <code>_FOUNDRY</code>)</li>
  <li><code>ANTHROPIC_AUTH_TOKEN</code> — bearer token for an LLM gateway</li>
  <li><code>ANTHROPIC_API_KEY</code> — a Console key</li>
  <li><code>apiKeyHelper</code> script output</li>
  <li><code>CLAUDE_CODE_OAUTH_TOKEN</code> — the long-lived token from <code>claude setup-token</code></li>
  <li>Anthropic profile and federation credentials</li>
  <li>Your subscription login from <code>/login</code></li>
</ol>

<div class="callout tip">
  <div class="c-head">💡 The classic billing surprise</div>
  <p>An exported <code>ANTHROPIC_API_KEY</code> outranks your subscription. In an interactive session, Claude Code asks once whether to use it and remembers your answer. In <code>-p</code> mode it always uses it. So usage can land on the API instead of your plan. If billing looks wrong, run <code>/status</code> to see the active credential, then <code>unset ANTHROPIC_API_KEY</code>.</p>
</div>

<h2>Two accounts on one machine</h2>
<p>Give each account its own config directory. For example, <code>alias claude-work='CLAUDE_CONFIG_DIR=~/.claude-work claude'</code> keeps a work login, settings, and history apart from your personal one.</p>

<h2>For CI and scripts</h2>
<p><code>claude setup-token</code> mints a one-year OAuth token tied to your subscription. Store it as <code>CLAUDE_CODE_OAUTH_TOKEN</code> in the pipeline. It can only make model requests. It cannot start Remote Control or load claude.ai connectors. <code>--bare</code> mode ignores it; use an API key there. See <a href="#headless-ci">headless &amp; CI</a>.</p>

<h2>When it misbehaves</h2>
<p>Run <code>/doctor</code> inside a session first. It checks installation, settings, extensions, and <code>CLAUDE.md</code>, then proposes fixes. Within three days of a login expiring, Claude Code warns at startup: <code>Your login expires in 3 days · run /login to renew</code>. Renew early if you leave sessions running unattended.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/setup">Setup</a> — install methods, requirements, updates</li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — sign-in types, storage, precedence, <code>setup-token</code></li>
    <li><a href="https://claude.com/pricing">Pricing</a> — which plans include Claude Code</li>
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
<p class="lead">You type "fix the failing test in AccountService". What happens next, and what stops Claude doing something you didn't want?</p>

<p>Claude explores, plans, edits, and verifies. Permission rules decide which steps need your approval. Three controls sit on top of that loop: plan mode, permission modes, and rewind. Using them well is most of what "using Claude Code well" means.</p>

<h2>1. Plan first, for anything non-trivial</h2>
<p><span class="jargon" data-term="plan-mode">Plan mode</span> makes Claude research and propose a change without editing your code. You read the plan, then approve it. Press <b>Shift+Tab</b> to cycle into it, or start one prompt with <code>/plan</code>, as in <code>/plan fix the auth bug</code>.</p>

<div class="callout tip">
  <div class="c-head">💡 Author's take: the highest-leverage habit</div>
  <p>For any change bigger than a one-liner, plan first. Reading a wrong plan costs thirty seconds. Reviewing a wrong diff across nine files costs your afternoon.</p>
</div>

<h2>2. Permission modes decide how much rope</h2>
<p>A <span class="jargon" data-term="permission-mode">permission mode</span> is your standing answer to "what may Claude do without asking?" There are six.</p>
<table class="doc">
<thead><tr><th>Mode</th><th>Runs without asking</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><b>default</b> <small>(shown as Manual)</small></td><td>Reads only. It asks before anything else.</td><td>You are in unfamiliar code and want to see every step.</td></tr>
<tr><td><b>acceptEdits</b></td><td>Reads, file edits, and common filesystem commands such as <code>mkdir</code> and <code>mv</code>.</td><td>You trust the plan and will review the diff at the end.</td></tr>
<tr><td><b>plan</b></td><td>Reads, plus commands the classifier approves when auto is available. No edits to your code.</td><td>You want a proposal before any change.</td></tr>
<tr><td><b><span class="jargon" data-term="auto-mode">auto</span></b></td><td>Everything, with a safety classifier checking each action.</td><td>Day-to-day work where you don't want a prompt every minute.</td></tr>
<tr><td><b>dontAsk</b></td><td>Only pre-approved tools. Anything that would prompt is denied.</td><td>Locked-down scripts where nobody is there to answer.</td></tr>
<tr><td><b>bypassPermissions</b></td><td>Everything, with no checks.</td><td>A throwaway container or VM, and nowhere else.</td></tr>
</tbody>
</table>

<p><b>Auto is the starting mode</b> for new terminal and VS Code sessions on Claude Code v2.1.283 or later. <code>claude -p</code> and the Agent SDK start in <code>default</code>. Auto mode is on every plan, with a recent model: on the Anthropic API that means Opus 4.6 or later, Sonnet 4.6 or later, Haiku 5.5, or a Fable model. Team and Enterprise admins can turn it off.</p>

<div class="mermaid">
stateDiagram-v2
    [*] --> Auto
    Auto --> Manual: Shift+Tab
    Manual --> acceptEdits: Shift+Tab
    acceptEdits --> Plan: Shift+Tab
    Plan --> Auto: Shift+Tab
    Auto: Auto<br/>acts, classifier checks each step
    Manual: Manual (default)<br/>reads only, asks for the rest
    acceptEdits: acceptEdits<br/>edits without asking
    Plan: Plan<br/>researches, never edits
</div>
<p class="diagram-caption">The Shift+Tab cycle. Auto appears only where it is available. If you enable bypassPermissions, it slots in after Plan. dontAsk is never in the cycle.</p>

<h3>Auto mode is not "yes to everything"</h3>
<p>A classifier screens each action. By default it blocks <code>curl | bash</code>, production deploys and migrations, force pushes, <code>git reset --hard</code>, <code>terraform destroy</code>, and printing a live credential into the transcript. It allows local file work in your project, installing dependencies your lock files declare, read-only HTTP requests, and pushes to the repo you are in. Deploy branches such as <code>production</code> or <code>gh-pages</code> are excluded from that.</p>
<p>Some paths are protected. Writes to <code>.git</code>, <code>.claude</code>, <code>.vscode</code>, <code>.idea</code>, <code>.husky</code>, shell RC files such as <code>.bashrc</code> and <code>.zshrc</code>, <code>.gitconfig</code>, <code>.npmrc</code>, <code>.mcp.json</code>, and <code>.claude.json</code> are never approved silently. Manual and acceptEdits ask. Auto sends them to the classifier. Only bypassPermissions lets them through.</p>

<div class="callout warn">
  <div class="c-head">⚠️ bypassPermissions means what it says</div>
  <p>No classifier, no prompts, and no protection against prompt injection. Use it only in an isolated container or VM, ideally without internet. It refuses to run as root on Linux and macOS. Deny rules still apply.</p>
</div>

<h2>3. Rewind beats arguing</h2>
<p>Claude Code takes a <span class="jargon" data-term="checkpoint">checkpoint</span> before each prompt you send. Run <code>/rewind</code>, or press <b>Esc</b> twice on an empty prompt. Pick a message, then choose:</p>
<ul>
  <li><b>Restore code and conversation</b> — a clean do-over.</li>
  <li><b>Restore code</b> — undo the edits but keep the chat, so Claude remembers what failed.</li>
  <li><b>Restore conversation</b> — rewind the chat, keep the files.</li>
  <li><b>Summarize from here / up to here</b> — compress part of the conversation to free space.</li>
</ul>
<p>Checkpoints track Claude's file edits only. Files changed only by shell commands, by you outside Claude Code, or usually by subagents are not restored. Keep using git.</p>

<h2>Sessions persist</h2>
<p>Each session is saved as JSONL under <code>~/.claude/projects/&lt;project&gt;/</code> and kept for 30 days by default. Useful commands:</p>
<table class="doc">
<thead><tr><th>Command</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>claude -c</code></td><td>Continue the most recent session in this directory</td></tr>
<tr><td><code>claude -r</code> · <code>/resume</code></td><td>Open the session picker, or resume by name or ID</td></tr>
<tr><td><code>claude --from-pr 42</code></td><td>Open the picker filtered to sessions linked to that pull request</td></tr>
<tr><td><code>/branch try-streaming</code></td><td>Fork the conversation and switch to the copy. The original stays.</td></tr>
<tr><td><code>claude -n auth-refactor</code> · <code>/rename</code></td><td>Name a session so you can resume it by name</td></tr>
</tbody>
</table>

<h2>Keeping the window clean</h2>
<p><code>/context</code> shows what fills your <span class="jargon" data-term="context-window">context window</span>. <code>/compact</code> summarizes the conversation to reclaim room; add a focus, such as <code>/compact keep the test output</code>. <code>/clear</code> starts a fresh conversation and saves the old one for <code>/resume</code>. Claude Code also <span class="jargon" data-term="compaction">compacts</span> automatically as the window fills.</p>
<p>As <a href="#how-claude-thinks">how Claude thinks</a> argues: when a session goes sideways, <code>/clear</code> and a better prompt usually beat explaining again.</p>

<h2>When to use which control</h2>
<table class="doc">
<thead><tr><th>Situation</th><th>Move</th></tr></thead>
<tbody>
<tr><td>A refactor touching many files</td><td><code>/plan</code> first, approve, then let auto mode run</td></tr>
<tr><td>Claude went down the wrong path for ten minutes</td><td><code>/rewind</code> → Restore code, then redirect</td></tr>
<tr><td>You want to try a second approach without losing the first</td><td><code>/branch</code></td></tr>
<tr><td>You are switching to an unrelated task</td><td><code>/clear</code></td></tr>
<tr><td>A long debugging session is near the limit</td><td><code>/compact</code> with a focus</td></tr>
</tbody>
</table>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Permission modes</a> — all six, the default mode, auto-mode rules, protected paths</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a> · <a href="https://code.claude.com/docs/en/sessions">Sessions</a></li>
    <li><a href="https://code.claude.com/docs/en/commands">Commands</a></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context window</a> — what survives compaction</li>
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

<p>Claude Code reads its configuration from two places: the project, and <code>~/.claude</code> in your home directory. Most people only ever edit <code>CLAUDE.md</code> and <code>settings.json</code>. Everything else is optional.</p>

<div class="mermaid">
flowchart TD
    subgraph U ["~/.claude/ · you, every project"]
        U1["settings.json · CLAUDE.md"]
        U2["skills/ · agents/ · rules/ · output-styles/"]
        U3["projects/ — transcripts + auto memory"]
    end
    subgraph P ["your repo · the team"]
        P1[".claude/settings.json — committed"]
        P2[".claude/settings.local.json — yours"]
        P3[".claude/skills/ · agents/ · rules/ · workflows/"]
        P4["CLAUDE.md · .mcp.json"]
    end
    U --> M["Effective config<br/>for this session"]
    P --> M
</div>
<p class="diagram-caption">Two roots combine into one session config. Where both set the same key, the project wins.</p>

<h2>Settings, and who wins</h2>
<table class="doc">
<thead><tr><th>File</th><th>Applies to</th><th>Commit it?</th></tr></thead>
<tbody>
<tr><td><code>~/.claude/settings.json</code></td><td>You, in every project</td><td>n/a</td></tr>
<tr><td><code>.claude/settings.json</code></td><td>Everyone in this repo</td><td><b>Yes</b> — team permissions, hooks, plugins</td></tr>
<tr><td><code>.claude/settings.local.json</code></td><td>You, in this repo</td><td><b>No</b> — Claude Code excludes it from git when it creates the file</td></tr>
<tr><td>Managed settings</td><td>Your whole organization</td><td>Deployed by IT</td></tr>
</tbody>
</table>

<p>Precedence, highest first: <b>Managed → <code>--settings</code> on the command line → Local → Project → User.</b> Nobody can override a managed key. List settings such as <code>permissions.allow</code> merge across files instead of replacing each other.</p>
<p>Inside a settings file you will mostly find <code>permissions</code> (allow, ask, and deny rules), <code>env</code> (environment variables), <code>hooks</code>, and <code>model</code>. Run <code>/status</code> to see which files loaded.</p>

<div class="callout warn">
  <div class="c-head">⚠️ A committed file can't grant everything</div>
  <p>Allow rules in a repo's <code>settings.json</code> apply only after each teammate trusts the folder. Deny and ask rules apply at once. A project file cannot switch on <code>auto</code> or <code>bypassPermissions</code> as the default mode; set those in user or managed settings.</p>
</div>

<h2>Where each change belongs</h2>
<table class="doc">
<thead><tr><th>You want to…</th><th>Edit</th></tr></thead>
<tbody>
<tr><td>Tell Claude your build commands and conventions</td><td><code>CLAUDE.md</code> (or an existing <code>AGENTS.md</code>). <a href="#memory-rules">Details →</a></td></tr>
<tr><td>Give Apex-only guidance that loads only for Apex files</td><td><code>.claude/rules/*.md</code> with a <code>paths</code> glob. <a href="#memory-rules">Details →</a></td></tr>
<tr><td>Save a checklist you run with <code>/deploy-check</code></td><td><code>.claude/skills/&lt;name&gt;/SKILL.md</code>. <a href="#skills-commands">Details →</a></td></tr>
<tr><td>Define a reviewer with its own tools</td><td><code>.claude/agents/*.md</code>, a custom <span class="jargon" data-term="subagent">subagent</span>. <a href="#subagents">Details →</a></td></tr>
<tr><td>Save a script that orchestrates many subagents</td><td><code>.claude/workflows/*.js</code>. Each file becomes a <code>/name</code> command.</td></tr>
<tr><td>Block a command or run a formatter after every edit</td><td><code>settings.json</code> → <code>permissions</code> or <code>hooks</code></td></tr>
<tr><td>Connect Jira or a database for the whole team</td><td><code>.mcp.json</code> at the repo root, for <span class="jargon" data-term="mcp">MCP</span> servers. <a href="#mcp">Details →</a></td></tr>
<tr><td>Change how Claude formats replies</td><td><code>.claude/output-styles/*.md</code></td></tr>
<tr><td>Rebind a shortcut</td><td><code>~/.claude/keybindings.json</code>. Changes apply without a restart.</td></tr>
</tbody>
</table>

<p>Two more files live outside the folder. <code>~/.claude.json</code> holds your account state, trust decisions, and personal MCP servers; Claude Code writes it for you. <code>~/.claude/projects/&lt;project&gt;/</code> holds session transcripts and <span class="jargon" data-term="memory">auto memory</span>.</p>

<div class="callout tip">
  <div class="c-head">💡 The commit rule</div>
  <p>Commit what makes the team faster: <code>CLAUDE.md</code>, <code>.claude/settings.json</code>, shared skills, agents, commands, workflows, and <code>.mcp.json</code>. Keep what is yours alone out of git: <code>settings.local.json</code> and <code>CLAUDE.local.md</code>. Transcripts and auto memory live in your home directory and never enter the repo.</p>
</div>

<h2>Housekeeping</h2>
<p>Transcripts are plain text, not encrypted. Anything a tool read, including a <code>.env</code> file, can end up in one. Claude Code deletes transcripts and checkpoint snapshots after 30 days; change that with <code>cleanupPeriodDays</code>. Auto memory is exempt from that cleanup. To wipe one project's local state now, run <code>claude purge</code> with the project path. Add <code>--dry-run</code> to preview.</p>

<div class="callout warn">
  <div class="c-head">⚠️ .claude is a protected path</div>
  <p>Claude will not silently edit its own config. It gets the same treatment as <code>.git</code> and your shell RC files. A prompt-injected instruction to quietly rewrite your permissions does not get to succeed silently.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/claude-directory">The .claude directory</a> — every file, cleanup, <code>claude purge</code></li>
    <li><a href="https://code.claude.com/docs/en/settings">Settings</a> — scopes, precedence, trust</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — CLAUDE.md, AGENTS.md, rules, auto memory</li>
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

<p>Three places, each with a different cost: <span class="jargon" data-term="claude-md">CLAUDE.md</span>, rules, and auto memory. Picking the wrong one is why <code>CLAUDE.md</code> files bloat to 500 lines and stop working.</p>

<h2>CLAUDE.md — loaded every session</h2>
<table class="doc">
<thead><tr><th>File</th><th>Applies to</th></tr></thead>
<tbody>
<tr><td><code>~/.claude/CLAUDE.md</code></td><td>Every project you touch</td></tr>
<tr><td><code>./CLAUDE.md</code> or <code>./.claude/CLAUDE.md</code></td><td>This repo — commit it, share it</td></tr>
<tr><td><code>./CLAUDE.local.md</code></td><td>This repo, just you — gitignore it</td></tr>
<tr><td>Managed <code>CLAUDE.md</code></td><td>Everyone in the organization, deployed by IT</td></tr>
</tbody>
</table>

<p>At launch, Claude Code loads these files from your working directory and every directory above it. They stack rather than override; the closest one is read last. A <code>CLAUDE.md</code> in a subdirectory loads when Claude first reads or edits a file there.</p>
<p><code>@path/to/file</code> imports another file, up to four hops deep. Imports help organize but do not save context: the imported file loads too. HTML comments (<code>&lt;!-- note --&gt;</code>) are stripped before loading, so you can leave notes for humans for free.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Keep each CLAUDE.md under 200 lines</div>
  <p>That is the official target. Longer files use more context and get followed less reliably. Claude Code warns at startup when a file runs long. If a line isn't true for <i>most</i> requests, it does not belong here.</p>
</div>

<p>CLAUDE.md is guidance, not enforcement. To guarantee something, use a <span class="jargon" data-term="hook">hook</span> or a <code>permissions.deny</code> rule.</p>

<h3>Already have an AGENTS.md?</h3>
<p>Claude Code reads <span class="jargon" data-term="agents-md">AGENTS.md</span> directly when your path has no <code>CLAUDE.md</code> or <code>CLAUDE.local.md</code>. If you have both, it reads only the <code>CLAUDE.md</code> files. To read both, set <b>Project instructions</b> in <code>/config</code>, or put <code>@AGENTS.md</code> at the top of your <code>CLAUDE.md</code>.</p>

<h2>Rules — the better home for specifics</h2>
<p><code>.claude/rules/*.md</code> holds one topic per file. A <code>paths</code> glob in the frontmatter scopes a rule to matching files:</p>

<pre><code>---
paths:
  - "force-app/**/*.cls"
  - "force-app/**/*.trigger"
---

- Bulkify everything. No SOQL or DML inside loops.
- Query only fields you use.
- New Apex needs a matching test class with meaningful asserts.</code></pre>

<p>That guidance costs nothing until Claude reads or edits an Apex file. A rule with no <code>paths</code> loads every session, like <code>CLAUDE.md</code>. Put personal rules for every project in <code>~/.claude/rules/</code>.</p>
<p>After <code>/compact</code>, the project-root <code>CLAUDE.md</code> reloads from disk. Path-scoped rules drop out and reload the next time a matching file is touched.</p>

<h2>Auto memory — what Claude writes to itself</h2>
<p>Claude keeps notes at <code>~/.claude/projects/&lt;project&gt;/memory/</code>. All worktrees of one repo share them. They record your preferences, your corrections, project context it can't read from the code, and where to find outside information. It skips anything in the code or your <code>CLAUDE.md</code>.</p>
<ul>
  <li><code>MEMORY.md</code> is the index. Its first 200 lines or 25KB load at session start, whichever comes first.</li>
  <li>Topic files load only when Claude needs them.</li>
  <li>Memory is machine-local. It never syncs to other machines or cloud sessions.</li>
  <li>Toggle it in <code>/memory</code> (<code>autoMemoryEnabled</code>). Move it with <code>autoMemoryDirectory</code>. Turn it off with <code>CLAUDE_CODE_DISABLE_AUTO_MEMORY=1</code>.</li>
  <li><span class="jargon" data-term="subagent">Subagents</span> do not see the main memory. They can keep their own.</li>
</ul>
<p>Say "remember that the API tests need a local Redis" and Claude saves it to auto memory. Say "add this to CLAUDE.md" to put it in the shared file instead.</p>

<h2>Which one do you want?</h2>
<table class="doc">
<thead><tr><th>You want to say…</th><th>Put it in</th></tr></thead>
<tbody>
<tr><td>"Run <code>npm test</code>, not <code>jest</code>"</td><td><code>./CLAUDE.md</code> — true every time</td></tr>
<tr><td>"Never SOQL in a loop"</td><td><code>.claude/rules/apex.md</code> with a paths glob</td></tr>
<tr><td>"I prefer terse answers"</td><td><code>~/.claude/CLAUDE.md</code></td></tr>
<tr><td>"My sandbox alias is <code>dev-sh</code>"</td><td><code>./CLAUDE.local.md</code></td></tr>
<tr><td>"That flaky test needs a retry"</td><td>Let auto memory learn it</td></tr>
<tr><td>"Here is our 8-step release procedure"</td><td>A <a href="#skills-commands">skill</a> — it loads only when needed</td></tr>
<tr><td>"Never edit <code>.env</code>"</td><td>A <code>permissions.deny</code> rule — enforced, not suggested</td></tr>
</tbody>
</table>

<h2>When to add a line</h2>
<p>The official guidance: add to <code>CLAUDE.md</code> when Claude makes the same mistake twice, when code review catches something Claude should have known, when you type the same correction you typed last session, or when a new teammate would need the same context.</p>

<h2>Tools for keeping it lean</h2>
<ul>
  <li><code>/init</code> writes a starting <code>CLAUDE.md</code> from your repo. If one exists, it suggests improvements instead.</li>
  <li><code>/memory</code> opens any of these files and the auto memory folder.</li>
  <li><code>/context</code> lists which memory files actually loaded.</li>
  <li><code>/doctor prompt-audit</code> checks your instruction files for outdated advice, missing files, and contradictions. Nothing changes until you approve.</li>
  <li><code>claudeMdExcludes</code> skips other teams' <code>CLAUDE.md</code> files in a large monorepo.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 A CLAUDE.md that earns its keep</div>
  <p>Commands, conventions, and gotchas — the things a new hire asks on day one. Not a style guide, not an architecture tour, not anything Claude can read from the code. The <code>/doctor</code> checkup cuts exactly that kind of derivable content.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a> — CLAUDE.md, AGENTS.md, imports, rules, auto memory, prompt audit</li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context window</a> — what reloads after compaction</li>
    <li><a href="https://code.claude.com/docs/en/commands">Commands</a> — <code>/init</code>, <code>/memory</code>, <code>/doctor</code></li>
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

<p>A <span class="jargon" data-term="skill">skill</span> is a folder with a <code>SKILL.md</code> file. Claude always sees each skill's short description. It loads the full contents only when the skill is relevant. That is <span class="jargon" data-term="progressive-disclosure">progressive disclosure</span>, and it is the difference from <code>CLAUDE.md</code>, which loads in full every session.</p>

<h2>The format</h2>
<pre><code>---
name: deploy-check
description: Pre-deployment checks for the Salesforce org. Use before any sf project deploy.
---

Before deploying, in order:

1. \`sf project deploy start --dry-run\` — no destructive changes unless asked
2. Run the Apex test suite; fail on any coverage below 85%
3. Check for hardcoded IDs in changed metadata
4. List anything touching a managed package one-way door</code></pre>

<p>Save it as <code>.claude/skills/deploy-check/SKILL.md</code>. It now works two ways: type <code>/deploy-check</code>, or say "I'm about to deploy" and Claude loads it.</p>

<h3>Where skills live</h3>
<table class="doc">
<thead><tr><th>Path</th><th>Available in</th></tr></thead>
<tbody>
<tr><td><code>.claude/skills/&lt;name&gt;/SKILL.md</code></td><td>This repo, for everyone who clones it</td></tr>
<tr><td><code>~/.claude/skills/&lt;name&gt;/SKILL.md</code></td><td>All your projects on this machine</td></tr>
<tr><td>Inside a <span class="jargon" data-term="plugin">plugin</span></td><td>Wherever the plugin is on, as <code>/plugin-name:skill-name</code></td></tr>
<tr><td>Managed settings directory</td><td>Everyone your organization deploys it to</td></tr>
</tbody>
</table>
<p>On a name clash, enterprise beats personal, and personal beats project.</p>

<h3>Frontmatter worth knowing</h3>
<table class="doc">
<thead><tr><th>Field</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>name</code></td><td>The <span class="jargon" data-term="slash-command">slash command</span>. Defaults to the folder name.</td></tr>
<tr><td><code>description</code></td><td>What the skill does and when to use it. Always in context, and it decides auto-loading.</td></tr>
<tr><td><code>when_to_use</code></td><td>Extra trigger hints, appended to the description</td></tr>
<tr><td><code>disable-model-invocation</code></td><td><code>true</code> = runs only when you type it. Its description leaves context too.</td></tr>
<tr><td><code>user-invocable</code></td><td><code>false</code> = hidden from the <code>/</code> menu; only Claude can use it</td></tr>
<tr><td><code>allowed-tools</code></td><td>Tools the skill may use without asking</td></tr>
<tr><td><code>context: fork</code></td><td>Run in a forked subagent instead of your conversation</td></tr>
<tr><td><code>model</code> · <code>effort</code></td><td>Override the model or <span class="jargon" data-term="effort">effort</span> for that turn</td></tr>
<tr><td><code>paths</code></td><td>Only auto-load for matching files</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The description does all the work</div>
  <p>It is the only part Claude sees until the skill fires. "Deployment stuff" never triggers. "Pre-deployment checks for the Salesforce org. Use before any sf project deploy" triggers exactly when it should. Write the trigger condition, not a title. The listing cuts the description and <code>when_to_use</code> at 1,536 characters combined.</p>
</div>

<h3>Where a skill runs</h3>
<ul>
  <li><b>Inline</b> (the default) — in your conversation, using your context.</li>
  <li><b><code>context: fork</code></b> — in a forked subagent. You get the result, not the mess. It runs in the background by default; set <code>background: false</code> to wait for it. Name a subagent type with <code>agent</code>.</li>
</ul>

<h2>Skills and commands are one system</h2>
<p><code>.claude/commands/deploy.md</code> and <code>.claude/skills/deploy/SKILL.md</code> both create <code>/deploy</code>. Command files still work and need no migration. Skills add a folder for supporting files and automatic loading. If both exist with the same name, the skill wins. Learn <code>SKILL.md</code>.</p>
<p>The <code>SKILL.md</code> format is the Agent Skills open standard. Anthropic donated it to the Agentic AI Foundation, part of the Linux Foundation, on 22 October 2026. The same format works in claude.ai and the Claude API.</p>

<h2>Keeping skills in check</h2>
<ul>
  <li><code>/skills</code> lists your skills. Sort by token cost and hide any from Claude or the menu.</li>
  <li><code>/skill-doctor</code> shows what each skill costs in context and how often it gets used.</li>
  <li><code>/reload-skills</code> picks up skills you added mid-session.</li>
  <li>Don't name a skill folder <code>synced</code> or <code>anthropic-skills</code>. Both are reserved; Claude Code keeps skills synced from your claude.ai account in <code>~/.claude/skills/synced/</code>.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ A skill is code you run</div>
  <p>Skills can carry scripts and steer Claude's tools. Install them only from sources you trust, and read the files first.</p>
</div>

<h2>When to use a skill</h2>
<table class="doc">
<thead><tr><th>You want…</th><th>Use</th></tr></thead>
<tbody>
<tr><td>A procedure you repeat: release checklist, PR review steps, migration recipe</td><td>A skill</td></tr>
<tr><td>Facts true in every session: build commands, conventions</td><td><a href="#memory-rules">CLAUDE.md</a></td></tr>
<tr><td>Something that must happen every time, such as formatting after each edit</td><td>A <span class="jargon" data-term="hook">hook</span></td></tr>
<tr><td>A helper with its own tools and model, returning a summary</td><td>A <a href="#subagents">subagent</a></td></tr>
<tr><td>Every reply in a different tone or length</td><td>An output style: <code>/output-style concise</code></td></tr>
</tbody>
</table>

<h2>The built-ins worth memorising</h2>
<table class="doc">
<thead><tr><th>Command</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>/init</code></td><td>Generate a starting CLAUDE.md from your repo</td></tr>
<tr><td><code>/plan</code></td><td>Plan before editing</td></tr>
<tr><td><code>/context</code></td><td>See what fills the context window</td></tr>
<tr><td><code>/compact</code></td><td>Summarize to reclaim room</td></tr>
<tr><td><code>/clear</code></td><td>Start a fresh conversation; the old one stays in <code>/resume</code></td></tr>
<tr><td><code>/rewind</code></td><td>Roll back code and/or conversation</td></tr>
<tr><td><code>/model</code> · <code>/effort</code></td><td>Switch model · set effort</td></tr>
<tr><td><code>/code-review</code> · <code>/security-review</code></td><td>Review the diff for bugs · vulnerabilities</td></tr>
<tr><td><code>/btw</code></td><td>Ask a side question without adding it to the conversation</td></tr>
<tr><td><code>/output-style</code></td><td>List or switch output styles, such as Concise or Explanatory</td></tr>
<tr><td><code>/doctor</code></td><td>Check your setup and propose fixes</td></tr>
</tbody>
</table>
<p>Several built-ins are bundled skills, including <code>/doctor</code>, <code>/code-review</code>, <code>/simplify</code>, <code>/batch</code>, <code>/debug</code>, and <code>/loop</code>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a> — SKILL.md format, locations, frontmatter, bundled skills</li>
    <li><a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview">Agent Skills overview</a> — progressive disclosure, cross-surface limits, security</li>
    <li><a href="https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation">Donating Agent Skills to the Agentic AI Foundation</a></li>
    <li><a href="https://code.claude.com/docs/en/commands">Commands</a> — every built-in</li>
    <li><a href="https://code.claude.com/docs/en/output-styles">Output styles</a> — <code>/output-style</code> and when a style fits</li>
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
<p class="lead">You want to audit 30 LWC components for a deprecated wire adapter. Reading all 30 in one session would fill your context window before Claude reached the tenth.</p>

<p><span class="jargon" data-term="subagent">Subagents</span> solve that. Each one gets its own <span class="jargon" data-term="context-window">context window</span>, does one job, and returns a summary. The file contents stay in its window. Only the answer comes back to yours.</p>

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
<p class="diagram-caption">Three windows' worth of reading, one window's worth of clutter.</p>

<h2>When to use it</h2>
<ul>
  <li><b>A side task would flood your conversation.</b> "Find every component that uses <code>getRecord</code>" returns pages of search hits you won't need again.</li>
  <li><b>The same check runs on many independent files.</b> Split the 30 components into three batches.</li>
  <li><b>Cheap reading, smart deciding.</b> A Haiku subagent does the grunt work while your main session stays on Opus.</li>
  <li><b>Not for</b> a single <code>grep</code>, or for edits that must happen in order in one file.</li>
</ul>

<h2>The built-ins</h2>
<table class="doc">
<thead><tr><th>Subagent</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><b>Explore</b></td><td>Fast, read-only codebase search. On a Claude subscription or Console account it runs on the <code>opus</code> alias.</td></tr>
<tr><td><b>Plan</b></td><td>Read-only research during <span class="jargon" data-term="plan-mode">plan mode</span>, before Claude presents a plan.</td></tr>
<tr><td><b>General-purpose</b></td><td>Multi-step tasks that need to read and act. Has every tool available to subagents.</td></tr>
</tbody>
</table>
<p>All three ship with Claude Code. No setup.</p>

<h2>Your own</h2>
<p>Put a Markdown file in <code>.claude/agents/</code> (this project) or <code>~/.claude/agents/</code> (all your projects). Only <code>name</code> and <code>description</code> are required. The body becomes the subagent's system prompt.</p>
<pre><code>---
name: lwc-auditor
description: Read-only audit of LWC components for deprecated wire adapters.
tools: Read, Glob, Grep
model: haiku
effort: low
---
List each component that imports the deprecated adapter, with file and line.</code></pre>
<p>Fields worth knowing: <code>tools</code> / <code>disallowedTools</code>, <code>model</code> (<code>sonnet</code>, <code>opus</code>, <code>haiku</code>, <code>fable</code>, a full model ID, or <code>inherit</code>), <code>effort</code>, <code>permissionMode</code>, <code>skills</code>, <code>background</code>, and <code>isolation: worktree</code>. Claude Code picks up edits to these folders within seconds.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The /agents wizard is gone</div>
  <p>Since v2.1.198, <code>/agents</code> only prints a reminder. Ask Claude to write the subagent, or edit the file yourself.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 Match the model to the job</div>
  <p>A subagent grepping 30 files is reading, not reasoning. Haiku 5.5 is the first Haiku with adjustable <span class="jargon" data-term="effort">effort</span>, and Anthropic pitches it as a subagent beside Opus 5.5 and Sonnet 5.5. The built-in Explore runs on Opus on a subscription. For cheap bulk reading, the author's advice is a custom subagent with <code>model: haiku</code>. See <a href="#choosing">choosing a model</a>.</p>
</div>

<h2>How they run</h2>
<table class="doc">
<thead><tr><th>Mode</th><th>Behaviour</th></tr></thead>
<tbody>
<tr><td><b>Foreground</b></td><td>Blocks your conversation until done. Permission prompts reach you as they come up.</td></tr>
<tr><td><b>Background</b></td><td>Runs while you keep working. The default for subagents Claude spawns from your main conversation. <code>Ctrl+B</code> moves a running task to the background.</td></tr>
<tr><td><b>Fork</b></td><td>Inherits your whole conversation instead of starting fresh. On by default in interactive sessions. <code>/subtask</code> starts one.</td></tr>
</tbody>
</table>
<p>A subagent can spawn its own, up to three layers below your main conversation. By default 20 can run at once. <code>/tasks</code> lists running and finished subagents and opens their transcripts.</p>

<h2>Worktrees: parallel without collisions</h2>
<p>Two sessions editing one checkout will fight. A <span class="jargon" data-term="worktree">worktree</span> gives each session its own checkout of the same repo.</p>
<pre><code>claude --worktree feature-auth</code></pre>
<p>That creates <code>.claude/worktrees/feature-auth/</code> on a new branch, <code>worktree-feature-auth</code>. Add <code>.claude/worktrees/</code> to <code>.gitignore</code>. List gitignored files such as <code>.env</code> in a <code>.worktreeinclude</code> file to copy them in. For subagents, set <code>isolation: worktree</code> in the frontmatter.</p>

<h2>When a few subagents aren't enough</h2>
<table class="doc">
<thead><tr><th>Option</th><th>What it is</th><th>Use it when</th></tr></thead>
<tbody>
<tr><td><b>Agent view</b><br/><code>claude agents</code></td><td>One screen to dispatch and watch background sessions. Research preview.</td><td>You have several independent tasks to hand off and check on later.</td></tr>
<tr><td><b><span class="jargon" data-term="dynamic-workflow">Dynamic workflows</span></b></td><td>A script Claude writes that runs many subagents and cross-checks their results. All paid plans; on Pro, switch it on in <code>/config</code>.</td><td>A codebase-wide audit, a 500-file migration, or research that needs sources checked against each other. Try <code>/deep-research</code>, or put <code>ultracode</code> in a prompt.</td></tr>
<tr><td><b><span class="jargon" data-term="agent-team">Agent teams</span></b></td><td>A lead session plus teammates, with a shared task list and direct messaging. Experimental and off by default (<code>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code>).</td><td>Workers must challenge each other: competing bug theories, or one reviewer each for security, performance and tests.</td></tr>
<tr><td><b>Projects</b></td><td>One ongoing conversation that starts parallel cloud threads. Public beta, Pro and Max.</td><td>Work that spans days and should run with your laptop closed.</td></tr>
</tbody>
</table>
<p>Workflows run up to 16 agents at once by default, capped at 1,000 per run. Agent teams and projects are still moving. In the author's view, know they exist but don't build your week on them yet.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Subagents are not free</div>
  <p>Each one is a fresh conversation with its own token bill, and it counts toward the same usage limits as your main session. Agent teams use significantly more tokens than a single session. Fanning out five subagents to answer what one <code>grep</code> would settle costs more than it saves. Fan out when the work is both parallel and expensive.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/sub-agents">Subagents</a> — built-ins, frontmatter, foreground/background/fork, limits</li>
    <li><a href="https://code.claude.com/docs/en/agents">Run agents in parallel</a> — subagents vs agent view vs teams vs workflows vs projects</li>
    <li><a href="https://code.claude.com/docs/en/workflows">Dynamic workflows</a> · <a href="https://code.claude.com/docs/en/agent-teams">Agent teams</a> (experimental) · <a href="https://code.claude.com/docs/en/agent-view">Agent view</a></li>
    <li><a href="https://code.claude.com/docs/en/worktrees">Worktrees</a></li>
    <li><a href="https://code.claude.com/docs/en/model-config">Model configuration</a> — aliases, effort in subagent frontmatter</li>
    <li><a href="https://www.anthropic.com/claude-haiku-5-5">Claude Haiku 5.5</a> — adjustable effort, subagent use</li>
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

<p>That is the whole case for <span class="jargon" data-term="hook">hooks</span>. An instruction is a request the model interprets. A hook is your code, fired by Claude Code itself, every time.</p>

<div class="callout tip">
  <div class="c-head">💡 The rule</div>
  <p>If it <i>must</i> happen, make it a hook. If it <i>should usually</i> happen, an instruction is fine. Never write "CRITICAL: YOU MUST ALWAYS…" in CLAUDE.md for something a five-line hook guarantees.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>Format or lint every edit.</b> <code>PostToolUse</code> on <code>Edit|Write</code> runs Prettier on the changed file.</li>
  <li><b>Block a risky command.</b> <code>PreToolUse</code> on <code>Bash</code> exits 2 when a deploy targets production.</li>
  <li><b>Know when Claude is waiting.</b> A <code>Notification</code> hook sends a desktop alert, so you can stop watching the terminal.</li>
  <li><b>Restore context.</b> <code>SessionStart</code> injects sprint notes or the target org, including after compaction.</li>
  <li><b>Keep going until done.</b> A prompt-based <code>Stop</code> hook checks a condition before Claude stops. <code>/goal</code> is the built-in shortcut for this.</li>
</ul>

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
<p class="diagram-caption">PreToolUse can veto. PostToolUse reacts. Stop fires when Claude finishes responding.</p>

<table class="doc">
<thead><tr><th>Event</th><th>Fires</th></tr></thead>
<tbody>
<tr><td><code>SessionStart</code> / <code>SessionEnd</code></td><td>Session begins or resumes / ends</td></tr>
<tr><td><code>UserPromptSubmit</code></td><td>You submit a prompt, before Claude processes it</td></tr>
<tr><td><code>PreToolUse</code></td><td>Before a tool runs. Can block it.</td></tr>
<tr><td><code>PostToolUse</code></td><td>After a tool succeeds</td></tr>
<tr><td><code>Notification</code></td><td>Claude Code sends a notification, such as waiting for input</td></tr>
<tr><td><code>Stop</code> / <code>StopFailure</code></td><td>Claude finishes responding / the turn ends on an API error</td></tr>
</tbody>
</table>
<p>Two dozen more events cover permission requests, failed tools, subagents, tasks, compaction, file changes, worktrees, and model switches. The reference has the full list.</p>

<h2>Where they live</h2>
<p>Hooks go in a settings file: <code>~/.claude/settings.json</code> (all projects), <code>.claude/settings.json</code> (committed for the team), or <code>.claude/settings.local.json</code> (yours, gitignored). Plugins and skill or subagent frontmatter can carry hooks too. Entries from every level merge.</p>
<pre><code>{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }
        ]
      }
    ]
  }
}</code></pre>
<p><code>/hooks</code> lists what is configured (read-only). <code>"disableAllHooks": true</code> turns them all off.</p>

<h2>What a hook can be</h2>
<table class="doc">
<thead><tr><th>Type</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>command</code></td><td>Runs a shell command. Event JSON arrives on stdin.</td></tr>
<tr><td><code>http</code></td><td>POSTs the event JSON to a URL</td></tr>
<tr><td><code>mcp_tool</code></td><td>Calls a tool on a configured MCP server</td></tr>
<tr><td><code>prompt</code></td><td>One model call that answers <code>{"ok": true}</code> or <code>{"ok": false, "reason": "…"}</code></td></tr>
<tr><td><code>agent</code></td><td>A subagent that can use tools to verify a condition. Experimental.</td></tr>
</tbody>
</table>
<p>The <code>prompt</code> type handles judgement calls. "Check this diff doesn't log PII" is something a regex can't decide, and it can now run on every edit.</p>

<h2>Targeting</h2>
<p><code>matcher</code> picks the tool. Plain names are exact matches: <code>Bash</code>, or a list like <code>Edit|Write</code>. Anything with other characters is a regex: <code>mcp__memory__.*</code>. <code>*</code> or empty matches everything. Events such as <code>UserPromptSubmit</code> and <code>Stop</code> ignore the matcher.</p>
<p><code>if</code> narrows a tool hook with one permission rule, such as <code>"if": "Bash(git *)"</code>. It is best-effort. Use permission rules for hard allow and deny.</p>

<h2>Exit codes are the API</h2>
<table class="doc">
<thead><tr><th>Code</th><th>Means</th></tr></thead>
<tbody>
<tr><td><code>0</code></td><td>Success. A JSON object on stdout is applied.</td></tr>
<tr><td><code>2</code></td><td><b>Blocking error.</b> On events that can block, the action stops and stderr is the reason.</td></tr>
<tr><td>anything else</td><td>Non-blocking error. The action goes ahead; you see a notice.</td></tr>
</tbody>
</table>
<p>Exit <code>1</code> does <i>not</i> block. For a policy, use exit 2, or set <code>"onFailure": "block"</code> on a command or http hook.</p>
<p>For finer control, exit 0 and print JSON. <code>"continue": false</code> stops Claude. <code>systemMessage</code> warns you. Inside <code>hookSpecificOutput</code>, <code>permissionDecision</code> can be <code>allow</code>, <code>deny</code>, <code>ask</code> or <code>defer</code>. <code>updatedInput</code> rewrites a tool's arguments. <code>additionalContext</code> feeds Claude facts on its next request. Pick one style per hook: exit codes, or exit 0 plus JSON.</p>

<h2>Worth building</h2>
<ul>
  <li><b>PostToolUse on <code>Edit|Write</code></b> — format, lint, or run the affected test.</li>
  <li><b>PreToolUse on <code>Bash</code></b> with <code>"if": "Bash(sf project deploy *)"</code> — exit 2 unless the target org is a sandbox. The author's pick for the hook most likely to save an afternoon.</li>
  <li><b>SessionStart</b> — inject today's sprint context, or which org you're pointed at.</li>
</ul>

<h2>Settings hooks vs mods</h2>
<p>A <span class="jargon" data-term="mod">mod</span> is a plugin of JavaScript or TypeScript handlers that run <i>inside</i> Claude Code. Mods are on by default from v2.1.287. They can draw panes, rewrite tool calls, and add instant <code>/commands</code>. The docs now call the settings-file kind "settings hooks".</p>
<p>Use a settings hook to block, allow, or log an event with a script. Use a mod when you want interface or to rewrite events. Mods are not sandboxed, so install them only from sources you trust.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Hooks run with your permissions</div>
  <p>Command hooks run shell commands with your full user permissions. In an interactive session, Claude Code holds back settings-file hooks until you accept the folder's trust dialog. A <code>claude -p</code> run shows no dialog and treats the folder as trusted. So hooks committed in a repo's <code>.claude/settings.json</code> will run. Before scripting <code>-p</code> over a repo you didn't write, read its <code>.claude/</code> files, or use <code>--bare</code>.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/hooks">Hooks reference</a> — events, handler types, matchers, exit codes, JSON output, security</li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Automate actions with hooks</a> — Prettier, notifications, common recipes</li>
    <li><a href="https://code.claude.com/docs/en/plugins/mods/overview">Mods overview</a> — mods vs settings hooks</li>
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
<p class="lead">Claude can read your Apex classes. It cannot tell you which fields are actually populated in your sandbox, because that lives in your org, not your repo.</p>

<p><span class="jargon" data-term="mcp">MCP</span> closes that gap. An MCP server exposes an outside system — your Salesforce org, Jira, a database — as tools Claude can call. It is an open standard, so one server works in every client that speaks MCP.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Claude needs live data outside the repo</b>: org metadata, Jira tickets, rows in a database.</li>
  <li><b>Claude should act in another system</b> in the same session as the code, such as filing the ticket for the bug it just found.</li>
  <li><b>Your team needs the same tools.</b> Commit a project <code>.mcp.json</code> and everyone gets them.</li>
  <li><b>Skip it</b> when a CLI already does the job. In the author's view, Claude running <code>sf</code> or <code>gh</code> through Bash is often simpler than another server.</li>
</ul>

<h2>Adding one</h2>
<pre><code>claude mcp add --transport http jira https://mcp.example.com/jira
claude mcp add --transport stdio salesforce -- npx -y @some/salesforce-mcp</code></pre>
<p>The package name above is a placeholder. Options go before the server name. <code>--</code> separates Claude's options from the server's own command.</p>
<table class="doc">
<thead><tr><th>Transport</th><th>Use it for</th></tr></thead>
<tbody>
<tr><td><b>http</b></td><td>Remote servers. Recommended.</td></tr>
<tr><td><b>stdio</b></td><td>A local process on your machine</td></tr>
<tr><td><b>ws</b> (WebSocket)</td><td>JSON config only, via <code>.mcp.json</code> or <code>claude mcp add-json</code></td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ SSE is deprecated</div>
  <p>The SSE transport is deprecated. Use HTTP where the server supports it.</p>
</div>

<p>For servers that need OAuth, sign in from <code>/mcp</code> or with <code>claude mcp login &lt;name&gt;</code>. A <code>claude -p</code> run can't complete OAuth, so sign in interactively first.</p>

<h2>Scopes</h2>
<table class="doc">
<thead><tr><th>Scope</th><th>Stored in</th><th>For</th></tr></thead>
<tbody>
<tr><td><b>local</b> (default)</td><td><code>~/.claude.json</code></td><td>This project, just you</td></tr>
<tr><td><b>project</b></td><td><code>.mcp.json</code> in the project root</td><td>This project, committed for the team</td></tr>
<tr><td><b>user</b></td><td><code>~/.claude.json</code></td><td>Every project you open</td></tr>
</tbody>
</table>
<p>If two scopes define the same server, the order is local, then project, then user, then plugin servers, then claude.ai connectors. The winning entry is used whole; fields don't merge. Servers in a project's <code>.mcp.json</code> need your approval before they connect.</p>

<h2>Why 20 servers don't drown your context</h2>
<p><span class="jargon" data-term="tool-search">Tool search</span> is on by default. Only tool names and server instructions load at session start. Full tool definitions load when Claude needs one. Without it, a few rich servers would eat your <span class="jargon" data-term="context-window">context window</span> before you typed anything.</p>
<p><code>/mcp</code> shows each server's status, tool count and sign-in state, and turns servers off without removing them. <code>/context</code> shows what is filling your context right now.</p>

<div class="callout tip">
  <div class="c-head">💡 Turn off what you're not using</div>
  <p>Even deferred, every server adds its tool names and instructions to each session. A server you last used months ago is a small tax on every request. Toggle it off in <code>/mcp</code>.</p>
</div>

<h2>Large results</h2>
<p>Claude Code warns when one MCP result passes 10,000 tokens and caps results at 25,000 by default. Raise the cap with <code>MAX_MCP_OUTPUT_TOKENS</code>. Over the cap, the result is saved to a file and Claude reads the file when it needs it. A wide SOQL query can hit this.</p>

<h2>Your claude.ai connectors come along</h2>
<p>If you sign in with a claude.ai account, the <span class="jargon" data-term="connector">connectors</span> you added on claude.ai appear in Claude Code automatically. They don't load when an API key, an <code>apiKeyHelper</code>, or a <code>claude setup-token</code> token is the active credential.</p>

<h2>Permissions</h2>
<p>Allow every tool from one server with <code>mcp__jira__*</code>. Allow one tool with its full name, <code>mcp__jira__create_issue</code>. An allow rule that doesn't name a server, such as <code>mcp__*</code>, is ignored.</p>
<p>Server authors can set <code>_meta["anthropic/requiresUserInteraction"]</code> to <code>true</code> on a tool. Claude Code then asks on every call, even in auto and bypass modes.</p>

<h2>The Salesforce case</h2>
<p>This is where MCP earns its keep for org work. With a Salesforce MCP server pointed at a sandbox, Claude can query the org while it reads your repo. The exact tools depend on the server. "Why does this trigger fail in the sandbox but not locally?" becomes answerable, because Claude can look at both.</p>

<div class="callout warn">
  <div class="c-head">⚠️ An MCP server is code you are trusting</div>
  <p>It runs with your credentials and can act on your systems. The docs say to verify you trust each server before connecting it. Servers that fetch outside content expose you to <span class="jargon" data-term="prompt-injection">prompt injection</span>. Also note: a <code>claude -p</code> run connects a repo's <code>.mcp.json</code> servers without asking, unless you pass <code>--bare</code>.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Claude Code's MCP is local; claude.ai's custom connectors are not</div>
  <p>Here, a stdio server runs on your machine as your user. A custom connector on claude.ai is reached from <b>Anthropic's cloud</b>. It must be reachable over the public internet from Anthropic's IP ranges. A server behind a VPN or firewall won't connect unless you allowlist those IPs. Same protocol, different trust and network model.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/mcp">MCP in Claude Code</a> — adding servers, transports, scopes, OAuth, tool search, output limits, connectors</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Permissions</a> — MCP rule syntax</li>
    <li><a href="https://code.claude.com/docs/en/headless">Headless mode</a> — what <code>-p</code> loads without <code>--bare</code></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context window</a> — what loads at startup, <code>/context</code></li>
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
<p class="lead">You want every pull request checked for SOQL-in-a-loop before a human looks at it. No terminal, no conversation — just a verdict.</p>

<p><span class="jargon" data-term="headless">Headless mode</span> is Claude Code without the chat. Pass <code>-p</code>: one prompt in, one answer out. It exits 0 on success and non-zero on failure, so scripts can branch on it.</p>

<pre><code>claude -p "Review the diff for SOQL or DML inside loops. List findings."</code></pre>

<p>It reads stdin too, so <code>git diff main | claude -p "review this"</code> works. Piped input is capped at 10MB.</p>

<h2>When to use it</h2>
<ul>
  <li><b>A pull-request gate</b> that passes or fails on Claude's findings.</li>
  <li><b>A project-specific linter</b> in <code>package.json</code>, such as a typo check on the diff.</li>
  <li><b>A nightly job</b> on your CI runner, such as a summary of yesterday's commits.</li>
  <li><b>Multi-step scripts</b> that review first, then summarise, in one conversation.</li>
</ul>
<p>Don't want to host the runner? Cloud scheduled tasks (formerly routines) run on a schedule, an API call, or a GitHub event on Anthropic's infrastructure. They are in research preview.</p>

<h2>--bare is the flag that matters in CI</h2>
<p>By default, <code>-p</code> loads what an interactive session would: hooks, skills, commands, subagents, plugins, MCP servers, auto memory, and <code>CLAUDE.md</code>. The answer then depends on whose machine ran it.</p>
<p><code>--bare</code> skips all of that discovery. You load exactly what you want:</p>
<pre><code>claude -p "$PROMPT" --bare   --append-system-prompt-file ./ci/review-rules.md   --settings ./ci/settings.json   --output-format json</code></pre>
<p>Other flags load the rest: <code>--mcp-config</code> for servers, <code>--agents</code> for subagents, <code>--plugin-dir</code> for a plugin. The docs recommend <code>--bare</code> for scripted calls and say it will become the default for <code>-p</code>.</p>

<div class="callout tip">
  <div class="c-head">💡 Use --bare for anything automated</div>
  <p>Without it, a <code>-p</code> run executes the hooks in a repo's <code>.claude/settings.json</code> and connects its <code>.mcp.json</code> servers, even in a folder you never trusted. A teammate's <code>~/.claude/</code> can also change what runs. <code>--bare</code> never reads OAuth, the keychain, or <code>CLAUDE_CODE_OAUTH_TOKEN</code>. Authenticate with <code>ANTHROPIC_API_KEY</code> or an <code>apiKeyHelper</code> in your settings JSON.</p>
</div>

<h2>Getting structured output</h2>
<table class="doc">
<thead><tr><th>Flag</th><th>Gives you</th></tr></thead>
<tbody>
<tr><td><code>--output-format text</code></td><td>Plain text. Default.</td></tr>
<tr><td><code>--output-format json</code></td><td><code>result</code> plus session ID, cost, and usage</td></tr>
<tr><td><code>--output-format stream-json</code></td><td>Newline-delimited events. Add <code>--verbose</code>, and <code>--include-partial-messages</code> for tokens as they arrive.</td></tr>
<tr><td><code>--json-schema</code></td><td>With <code>json</code> output: the answer matches your schema and lands in <code>structured_output</code></td></tr>
</tbody>
</table>

<p><code>--json-schema</code> turns "Claude wrote a review" into "the pipeline has a pass/fail and a findings array." That is the difference between a toy and a gate. Check that <code>structured_output</code> exists before using it. It is missing when the run ends without valid output, for example if Claude declined.</p>

<pre><code>COST=$(claude -p "$PROMPT" --output-format json | jq -r '.total_cost_usd')</code></pre>
<p>The cost is a client-side estimate and can differ from your bill.</p>

<h2>Permissions in CI</h2>
<p>Nobody is there to approve anything, so pre-approve precisely:</p>
<pre><code>claude -p "$PROMPT" --allowedTools "Read,Bash(git diff *)" --permission-mode dontAsk</code></pre>
<p><code>dontAsk</code> denies every call that would otherwise prompt, instead of hanging. Reads in your working directory and read-only commands still run. The space before <code>*</code> matters: <code>Bash(git diff *)</code> matches <code>git diff</code> but not <code>git diff-index</code>.</p>
<p>Since v2.1.302, a <code>-p</code> run with no mode set starts in Manual mode. Calls that need approval are denied unless a rule or hook approves them.</p>

<h2>The shape of it</h2>
<div class="mermaid">
flowchart LR
    A["Pull request<br/>opened"] --> B["GitHub Action"]
    B --> C["claude -p --bare<br/>--json-schema"]
    C --> D{"findings<br/>empty?"}
    D -- Yes --> E["✓ pass"]
    D -- No --> F["Comment on the PR<br/>· fail the check"]
</div>
<p class="diagram-caption">With --bare, store an API key as the repo secret. A setup-token token won't be read.</p>
<p>The full walk-through is in the <a href="#recipe-ci">CI review recipe</a>.</p>

<h2>Ready-made integrations</h2>
<table class="doc">
<thead><tr><th>Option</th><th>What it is</th><th>Use it when</th></tr></thead>
<tbody>
<tr><td><b>GitHub Actions</b><br/><code>anthropics/claude-code-action@v1</code></td><td>Responds to <code>@claude</code> in issues and PRs, or runs a <code>prompt</code> on any event, including a schedule. Built on the Agent SDK. Set up with <code>/install-github-app</code>.</td><td>You want Claude to answer comments, turn issues into PRs, or run a custom review.</td></tr>
<tr><td><b>Code Review</b></td><td>Automatic review on every pull request, with no workflow file.</td><td>You want reviews without maintaining YAML.</td></tr>
<tr><td><b>GitLab CI/CD</b></td><td>A <code>.gitlab-ci.yml</code> job that runs <code>claude -p</code>. Beta, maintained by GitLab.</td><td>Your code lives on GitLab.</td></tr>
</tbody>
</table>
<p>The GitHub Action takes either <code>ANTHROPIC_API_KEY</code> or <code>CLAUDE_CODE_OAUTH_TOKEN</code>. <code>claude setup-token</code> creates that token: valid one year, Pro, Max, Team or Enterprise, model requests only. For a secret shared across an organization, use an API key. An OAuth token is tied to the subscription of whoever created it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Untrusted input meets your credentials</div>
  <p>A PR contains code someone else wrote, and your job feeds it to an agent holding your tokens. On public repos, GitHub withholds secrets from runs triggered by fork PRs. By default the Action also requires write access from the person who triggers it, and rejects bots. Still treat diff content as hostile. The author's advice: pin <code>--allowedTools</code> to the minimum, never give a fork-triggered job write access, and prefer commenting over acting.</p>
</div>

<h2>Continuing a session</h2>
<p><code>--continue</code> resumes the most recent conversation. <code>--resume &lt;id&gt;</code> targets one. Capture the ID to chain steps:</p>
<pre><code>session_id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue that review" --resume "$session_id"</code></pre>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/headless">Run Claude Code programmatically</a> — -p, --bare, output formats, JSON schema, permissions, resume</li>
    <li><a href="https://code.claude.com/docs/en/github-actions">GitHub Actions</a> · <a href="https://code.claude.com/docs/en/gitlab-ci-cd">GitLab CI/CD</a> (beta)</li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — claude setup-token, credential order</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Permissions</a> — allowedTools syntax</li>
    <li><a href="https://code.claude.com/docs/en/routines">Scheduled tasks</a> — cloud jobs, formerly routines</li>
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
<p class="lead">You are on a Salesforce setup page and want to ask about it. You could switch to a browser and describe the screen in words. Or you could double-tap Option, click the window, and ask.</p>

<p>That shortcut is quick entry. It is the most visible reason to install Claude Desktop. The less visible reason matters more: Desktop is the only way Claude can reach your own computer — its folders, its apps, and local tools.</p>

<h2>What Desktop adds over the browser</h2>
<table class="doc">
<thead><tr><th>Capability</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><b>Quick entry</b> <small>(Mac)</small></td><td>Ask from any app, with a screenshot of the window attached</td></tr>
<tr><td><b>Local folders</b></td><td>Claude reads, organises, and creates files in folders you grant</td></tr>
<tr><td><b>Built-in browser</b></td><td>A browser Claude can drive, with nothing to install</td></tr>
<tr><td><b><span class="jargon" data-term="computer-use">Computer use</span></b></td><td>Claude clicks and types in your apps. Beta, Pro and Max only — <a href="#cowork-practice">3.3</a></td></tr>
<tr><td><b>Local <span class="jargon" data-term="mcp">MCP</span> servers</b></td><td>Tools that run on your machine, as you</td></tr>
<tr><td><b>Code tab</b></td><td>Claude Code with parallel sessions, diff review, and a terminal — <a href="#what-is-claude-code">2.1</a></td></tr>
</tbody>
</table>

<p>Conversations, <span class="jargon" data-term="project">projects</span>, and <span class="jargon" data-term="memory">memory</span> follow your account across web, desktop, and mobile.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Chat and Cowork are now one</div>
  <p>Desktop used to have separate Chat, Cowork, and Code tabs. On accounts with the new unified experience, Chat and Cowork are a single conversation, and Claude starts a task when it needs to. Code is still its own tab. If you still see separate Chat and Cowork options, your account has not moved yet. See <a href="#cowork">3.2</a>.</p>
</div>

<h2>Things that need Desktop open</h2>
<p>Long tasks run in Anthropic's cloud and keep going when you close the laptop. But three things only work while the app is open on your computer:</p>
<ul>
  <li>Access to your local files and folders</li>
  <li>The built-in browser</li>
  <li>Computer use</li>
</ul>
<p>Close the app and a cloud task loses its bridge to your machine.</p>

<h2>Quick entry</h2>
<p><b>Double-tap Option</b> on a Mac opens a small input over your current app. You can switch it to Option+Space or a custom shortcut in Settings → Desktop app.</p>
<ul>
  <li><b>Click a window to attach it.</b> Its contents go with your message. You can also drag to capture part of the screen.</li>
  <li><b>Caps Lock dictates.</b> It is off by default, because it takes over Caps Lock. Turn it on in the same settings.</li>
</ul>
<p>Quick entry is macOS only, on every plan including Free. It needs macOS 12 or later; dictation needs macOS 14 or later.</p>

<h2>Desktop extensions (.mcpb)</h2>
<p>An <span class="jargon" data-term="mcpb">.mcpb file</span> is a local MCP server packed into one installable file — a zip with a manifest. Desktop ships its own Node.js runtime, so most extensions need no setup from you. Node, Python, and binary servers are all supported. Anthropic open-sourced the format.</p>
<p>Install from Settings → Desktop app → Extensions → <b>Browse extensions</b>. To install a file you were given, use Advanced settings → <b>Install Extension…</b>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Renamed: .dxt is now .mcpb</div>
  <p>Desktop extensions used the <code>.dxt</code> extension. They are now <b>.mcpb</b> (MCP Bundle). Old <code>.dxt</code> files still work. Anything written today should say <code>.mcpb</code>.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 Local tools belong here</div>
  <p>Desktop runs local MCP servers <b>on your machine</b>, with your permissions. Custom <span class="jargon" data-term="connector">connectors</span> are different: Anthropic's cloud reaches them, even when you use Desktop. If a tool must touch your filesystem or something behind your VPN, use a local server in Desktop. See <a href="#connectors-files">4.5</a>.</p>
</div>

<h2>Platforms</h2>
<p>macOS 13 (Ventura) or later. Windows 10 or later, with separate x64 and ARM64 installers. Linux is in beta: Ubuntu 22.04+ or Debian 12+, on x64 or arm64.</p>
<p>On Linux, install from Anthropic's apt repository. The app does not update itself; updates arrive with <code>sudo apt upgrade</code>. A manual <code>.deb</code> install also works but gets no updates.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The Linux beta is missing pieces</div>
  <p>No computer use and no dictation. Quick entry works on X11; on Wayland it depends on your desktop's global-shortcuts support. Cowork tasks on Linux need KVM hardware virtualisation, about 25 GB of free disk, and at least 8 GB of RAM.</p>
</div>

<h2>Claude in Chrome</h2>
<p>The Chrome extension is not part of the app. It lets Claude browse in your own Chrome, signed in as you. Paid plans only, Google Chrome only — no other Chromium browsers, no mobile.</p>
<p>On most paid plans, the Chrome side panel now runs as a Cowork session. It saves to your history, and you can continue it on web, Desktop, or mobile. For Cowork tasks, Desktop uses Claude in Chrome if you have it, and the built-in browser if you don't. Change this in Settings → Cowork → Preferred browser.</p>

<h2>When to use it</h2>
<ul>
  <li><b>You want to ask about what is on screen.</b> Quick entry plus a clicked window beats describing a setup page in words.</li>
  <li><b>The work lives in local files.</b> Grant a folder and Claude edits the spreadsheets in place. No uploads, no downloads.</li>
  <li><b>A tool only exists on your machine or network.</b> Install it as an .mcpb extension or a local MCP server.</li>
  <li><b>You want Claude Code without a terminal.</b> The Code tab gives you sessions, diffs, and pull requests in one window.</li>
</ul>
<p>If you only chat and never touch local files, the browser at claude.ai does the same job. <i>(Author's opinion: install Desktop anyway on a Mac — quick entry alone earns its place.)</i></p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/10065433-install-claude-desktop">Install Claude Desktop</a> — platforms, Linux beta limits</li>
    <li><a href="https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac">Use quick entry with Claude Desktop on Mac</a></li>
    <li><a href="https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop">Getting started with local MCP servers on Claude Desktop</a> — extensions, bundled Node</li>
    <li><a href="https://www.anthropic.com/engineering/desktop-extensions">Desktop Extensions: one-click MCP server installation</a> — .mcpb format, .dxt rename</li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a> — what needs Desktop open</li>
    <li><a href="https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome">Get started with Claude in Chrome</a></li>
    <li><a href="https://code.claude.com/docs/en/desktop">Claude Code in the desktop app</a> — Code tab, Windows ARM64</li>
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
<p class="lead">"Go through this quarter's release-notes folder, pull out everything customer-facing, and build me a summary deck." Then close your laptop.</p>

<p>That is <span class="jargon" data-term="cowork">Cowork</span>. You describe an outcome. Claude makes a plan, works through the steps, and comes back with finished files: spreadsheets with working formulas, Word-style documents, PowerPoint-compatible decks, organised folders.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Cowork is no longer a separate mode</div>
  <p>Since 16 September 2026, chat and Cowork are merging into one conversation. You no longer pick a mode first. You ask, and Claude decides whether to answer or run a task. Your chats, Cowork tasks, projects, connectors, and skills carry over. Once your account switches, you cannot switch back.</p>
  <p>The rollout is gradual: Pro and Max first, Team in beta, and Enterprise where an admin turns on "Chat and Cowork unified". If your message box still shows separate Chat and Cowork options, you are on the old layout.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 What Cowork is actually for</div>
  <p>When Anthropic reviewed Cowork usage in July 2026, <b>more than 90% was not software development</b>. Business operations and content creation made up roughly half. If you want Claude to write code, use <a href="#what-is-claude-code">Claude Code</a>.</p>
</div>

<h2>How a task runs</h2>
<div class="mermaid">
flowchart TD
    A["You describe an outcome"] --> B["Claude plans the steps"]
    B --> C["Splits off subtasks"]
    C --> D1["Subagent"]
    C --> D2["Subagent"]
    C --> D3["Subagent"]
    D1 --> E["Deliverables<br/>.xlsx · .pptx · .docx · files"]
    D2 --> E
    D3 --> E
    E --> F["You review and edit"]
</div>
<p class="diagram-caption">Claude can hand pieces of the job to <span class="jargon" data-term="subagent">subagents</span>. You see the result and any questions, not every step.</p>

<p>You can stop or redirect Claude while it works. If it needs a decision, it asks — and the question reaches your phone.</p>

<h2>Where tasks run</h2>
<p>Tasks run in the cloud by default, in an isolated <span class="jargon" data-term="sandbox">sandbox</span> on Anthropic's servers. They keep going when your laptop is closed. You can start a task on your phone, or check on a desktop task from it.</p>
<p>Since 6 October 2026, every new Pro and Max task runs in the cloud. The "Only on your computer" option is gone. Tasks already running locally stay local. Some organisations still run local sessions on existing desktop deployments.</p>

<table class="doc">
<thead><tr><th></th><th>Cloud session <small>(default)</small></th><th>Local session <small>(older tasks, some orgs)</small></th></tr></thead>
<tbody>
<tr><td>Runs where</td><td>A temporary sandbox, created per session and destroyed after</td><td>Agent runs on your device; code runs in a local Linux VM<br><small>Apple Virtualization.framework / Hyper-V</small></td></tr>
<tr><td>Network</td><td>Every request goes through a mandatory proxy. Only allow-listed sites are reachable. Private, internal, and cloud-metadata addresses are blocked.</td><td>The VM filters its own outbound traffic</td></tr>
<tr><td>Your local files</td><td>Reached through Desktop — <b>only while it is open</b>, only connected folders, each call permission-checked</td><td>Direct, within connected folders</td></tr>
<tr><td>Memory</td><td>Shared with your chats</td><td>Not used</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Cloud tasks reach your files only while Desktop is open</div>
  <p>Close the app and a cloud task loses the bridge to your computer. It keeps running, but it can no longer see your folders, your browser, or your screen. If a task needs local files, leave the app open.</p>
</div>

<h2>Connected folders, not uploads</h2>
<p>On Desktop, Claude reads and writes only in folders you connect. Nothing to upload, nothing to download — the deck lands in your folder. Claude fetches copies of the files it needs, and deletes them when you delete the session.</p>

<h2>Permission modes</h2>
<p>A setting in the message box controls how much Claude does without asking. It applies to the whole conversation, and you can change it at any time.</p>
<table class="doc">
<thead><tr><th>Mode</th><th>Behaviour</th><th>Default on</th></tr></thead>
<tbody>
<tr><td><b>Manual</b></td><td>Claude asks before each action. Use it for sensitive files, new tools, and anything hard to undo.</td><td>Enterprise</td></tr>
<tr><td><b>Auto</b></td><td>Claude checks each action for safety and blocks unsafe ones</td><td>Pro, Max, Team</td></tr>
<tr><td><b>Skip</b></td><td>Nothing checks Claude's actions. Only for tasks you fully trust.</td><td>—</td></tr>
</tbody>
</table>
<p>In every mode, Claude asks before permanently deleting a file. Connector sign-in tokens never enter the sandbox; connector calls happen on Anthropic's servers.</p>

<div class="callout warn">
  <div class="c-head">⚠️ "You remain responsible for all actions taken by Claude performed on your behalf"</div>
  <p>That is Anthropic's wording. Defences against prompt injection — hidden instructions in a page or file that try to steer Claude — include training, content classifiers, and action screening in Auto mode. Anthropic still calls the risk non-zero. A task that reads untrusted content and is allowed to act is a real risk. Connect a dedicated working folder, keep backups, and attach only the connectors the task needs.</p>
</div>

<h2>Projects, memory, and instructions</h2>
<p><span class="jargon" data-term="project">Projects</span> group related tasks with their own files, instructions, and memory. They work on every surface.</p>
<ul>
  <li><b>Chat memory now reaches Cowork.</b> Since 25 August 2026, cloud tasks use what Claude remembers from your chats, and what comes up in a task carries back. Local sessions do not use memory.</li>
  <li><b>Projects keep their own memory.</b> A project also uses your account memory. Turn off "Use account memory" on the project page to isolate it.</li>
  <li><b>One task without memory?</b> Turn off Memory in the "+" menu before your first message. You cannot change it once the task starts.</li>
  <li><b>Global instructions moved.</b> Cowork's global instructions are now part of "Instructions for Claude" under Settings → Your Claude.</li>
</ul>

<h2>Limits worth knowing</h2>
<ul>
  <li><b>Paid plans only</b> — Pro, Max, Team, Enterprise.</li>
  <li><b>It uses more of your allowance.</b> Every step costs tokens, so a multi-step task uses more than a quick question. Check Settings → Usage.</li>
  <li><b>Sessions cannot be shared.</b> You can share the individual artifacts a task creates.</li>
  <li><b>In the unified experience:</b> no "Add from GitHub", no branching a conversation from an earlier point, and incognito chats cannot create files or run code.</li>
  <li><b>Live artifacts made before 19 August 2026</b> work only in Desktop. Newer ones work on web too.</li>
</ul>

<h2>When to use it</h2>
<ul>
  <li><b>The job is a deliverable, not an answer.</b> "Turn these 40 call notes into a spreadsheet of objections by product."</li>
  <li><b>The inputs are spread out.</b> A folder of files plus Slack threads plus a Drive doc, pulled into one report.</li>
  <li><b>You will not be at your desk.</b> Start it before a meeting; answer its questions from your phone.</li>
  <li><b>It repeats.</b> Turn it into a scheduled task — <a href="#cowork-practice">3.3</a>.</li>
</ul>
<p><i>Author's opinion:</i> if you are at your desk and want to shape the argument yourself, a plain back-and-forth gets a better result sooner. Delegation means accepting Claude's judgement calls.</p>

<h2>Short history</h2>
<p>Research preview on Mac, 12 January 2026 → general availability on macOS and Windows, 9 April 2026 → web and mobile, 7 July 2026 → merged into chat, 16 September 2026 → new Pro and Max tasks cloud-only, 6 October 2026.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a> — the merge, permissions, limitations</li>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Claude Cowork</a> — plans, permission modes, sharing</li>
    <li><a href="https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview">Claude Cowork architecture overview</a> — cloud vs local, network, tokens</li>
    <li><a href="https://support.claude.com/en/articles/13364135-use-claude-cowork-safely">Use Claude Cowork safely</a> — injection defences, responsibility</li>
    <li><a href="https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile">Use Claude Cowork on web, desktop and mobile</a> — 6 October change, file bridge</li>
    <li><a href="https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork">Organize your tasks with projects in Claude Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context">Use Claude's chat search and memory</a> — memory across chat and Cowork</li>
    <li><a href="https://claude.com/resources/articles/cowork-web-mobile">Claude Cowork is coming to mobile and web</a> — the 90% figure</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — launch dates</li>
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
<p class="lead">You build the same status report every Monday from Jira and Slack. You could explain it to Claude every week. Or you could teach it once and have it run at 8am while you sleep.</p>

<p>Three features make that work: plugins teach Claude the job, scheduled tasks run it without you, and computer use reaches apps nothing else can.</p>

<h2>Plugins — capability bundles</h2>
<p>A <span class="jargon" data-term="plugin">plugin</span> packages <span class="jargon" data-term="skill">skills</span>, <span class="jargon" data-term="connector">connectors</span>, and <span class="jargon" data-term="subagent">subagents</span> for one role, sometimes with slash commands and <span class="jargon" data-term="hook">hooks</span>. You install one thing instead of configuring each piece.</p>
<ul>
  <li><b>Install:</b> Customize (left sidebar) → Plugins → Discover → pick one → Add. You can also upload a plugin file.</li>
  <li><b>Catalog:</b> sales, finance, legal, marketing, HR, engineering, design, operations, data analysis. Partners such as Salesforce publish their own.</li>
  <li><b>Build your own:</b> the Plugin Create plugin walks you through it, or start from an Anthropic template.</li>
  <li><b>Use it:</b> type <code>/</code> or click "+" to see its skills. Run a command as <code>/plugin-name:command</code>.</li>
  <li><b>Plans:</b> all paid plans. On Team and Enterprise, owners can enable sharing and run an organisation library.</li>
</ul>
<p>Plugins save to your account. They also appear in Claude Code (v2.1.273 or later) when you sign in with the same Claude account — not with an API key or a cloud provider such as Bedrock.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Part of a plugin greys out in chat</div>
  <p>Skills and commands work everywhere. <b>Hooks, subagents, and local MCP servers run only in Cowork and Claude Code.</b> If those parts look greyed out in chat, that is expected. Local MCP servers run on your computer with your permissions, so install plugins only from sources you trust.</p>
</div>

<h2>Scheduled tasks</h2>
<p>In the unified experience, just say what to do and how often — "every Monday at 8am, summarise my inbox." Claude asks a few questions, shows you the name, schedule, and instructions, and you click <b>Schedule</b>.</p>
<p>On the older layout, type <code>/schedule</code> in a task, or go to <b>Scheduled</b> → New task. You can let Claude set it up, or fill in the name, prompt, approval mode, frequency, and optionally a model and working folder yourself.</p>
<p>Cadences: hourly, daily, weekly, weekdays, or manual (run on demand). Each run is its own session. From the Scheduled sidebar you can see past and upcoming runs, edit, pause, resume, or run a task now. All paid plans.</p>

<div class="callout tip">
  <div class="c-head">💡 They run without you</div>
  <p>Scheduled tasks run in the cloud. Your computer can be asleep and the app closed. That is the difference between "a macro I trigger" and "a thing that happens."</p>
</div>

<p>The catch: a task that needs <i>local</i> files or apps runs only on your computer. Plan around it. Schedule work that lives in connectors and cloud files; keep local-file work interactive. Older Pro and Max local scheduled tasks, created before 6 October 2026, keep running on your machine.</p>

<p>Anthropic's safety advice for schedules: start with low-risk work, avoid irreversible actions and sensitive data, review the output, and pause tasks you no longer use.</p>

<h2>Computer use</h2>
<p><span class="jargon" data-term="computer-use">Computer use</span> lets Claude drive your actual screen. It takes screenshots, clicks, types, and opens apps. It is in beta, in the Desktop app on macOS and Windows, in both Cowork and Claude Code. <b>Pro and Max only</b>; Team and Enterprise do not have it. Not available on Linux.</p>
<p>Turn it on with the "Enable computer use" toggle in Settings → Capabilities. On macOS 15 or later, Claude works in background windows and asks before taking over the full screen. It needs the Desktop app open.</p>

<h3>It is the last resort, by design</h3>
<p>Claude usually picks the fastest route:</p>
<ol>
  <li><b>Connectors</b> — an API is precise and cheap</li>
  <li><b>A browser</b> — the built-in one, or your Chrome via Claude in Chrome</li>
  <li><b>Your screen</b> — only when nothing else can reach it</li>
</ol>
<p><i>Author's opinion:</i> keep it that way. Driving an app by screenshot is slow and brittle. Use it for the legacy desktop app with no API, not for something a connector already does.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Guardrails, and where they stop</div>
  <p>Claude asks permission for each app. Investment, trading, and crypto apps are blocked by default, and you can add your own blocklist. But there is no sandbox between Claude and your screen, and if Claude clicks a link, it opens even in an app you never approved. Block sensitive apps such as banking, health portals, and dating apps. Start with low-stakes tasks and watch closely.</p>
</div>

<h2>Connectors</h2>
<p>Tasks use the same connectors as your chats — Google Drive, Gmail, Microsoft 365, Slack, and so on. Manage them in Customize → Connectors. Work that spans Slack and Drive comes back citing the files and messages it used.</p>

<h2>When to use it</h2>
<table class="doc">
<thead><tr><th>Feature</th><th>Use it when…</th></tr></thead>
<tbody>
<tr><td><b>Plugin</b></td><td>A team repeats a role-specific job — a sales team's call follow-ups, a finance team's month-end checks — and wants it done the same way every time.</td></tr>
<tr><td><b>Scheduled task</b></td><td>The work repeats on a clock: a Monday status report, a daily inbox summary, a weekly competitor scan.</td></tr>
<tr><td><b>Computer use</b></td><td>The data sits in a desktop app with no connector and no web version, such as an old internal tool.</td></tr>
</tbody>
</table>

<h2>Putting it together</h2>
<p>The Monday report: a plugin with your Jira and Slack connectors and a skill that describes the report's shape, on a weekly schedule. It runs at 8am in Anthropic's cloud, laptop open or not, and the deck is waiting when you sit down.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/13837440-use-plugins-in-claude">Use plugins in Claude</a> — what they bundle, where each part runs</li>
    <li><a href="https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork">Schedule recurring tasks in Claude Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork">Let Claude use your computer in Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/13364135-use-claude-cowork-safely">Use Claude Cowork safely</a> — schedule and computer-use guardrails</li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a> — scheduling and connectors in the unified experience</li>
    <li><a href="https://claude.com/resources/articles/the-claude-cowork-product-guide">The Claude Cowork product guide</a> — citations to files and messages</li>
    <li><a href="https://code.claude.com/docs/en/desktop">Claude Code in the desktop app</a> — computer use in the Code tab</li>
  </ul>
</div>
`
      },

      {
        id: "one-task-three-surfaces",
        num: "3.4",
        title: "One task, three ways",
        html: `
${VERIFIED}
<p class="lead">Same task: "Summarise this quarter's release notes for the customer success team." You can steer Claude through it, hand it off, or run it in Claude Code. Each gives you something different, costs a different amount, and fails differently.</p>

<p>The <a href="#ecosystem-map">ecosystem map</a> gives you the rule. This page is the worked example.</p>

<p>Chat and <span class="jargon" data-term="cowork">Cowork</span> used to be two modes you picked between. Since 16 September 2026 they are one conversation. You ask, and Claude decides whether to answer or run a task. So the real choice is now how you work, not which product you open.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Still seeing separate Chat and Cowork options?</div>
  <p>The merge is rolling out gradually: Pro and Max first, Team in beta, Enterprise where an admin turns on "Chat and Cowork unified". On the old layout, pick Chat to steer and Cowork to hand off. Once your account switches, it cannot switch back.</p>
</div>

<h2>1. Steer it in the conversation</h2>
<p>You paste the release notes in, or attach the files. Claude reads them, you steer, and it drafts a summary in the conversation. Want a deck instead? It can make one. File creation works on every plan, including Free.</p>
<p><b>You get:</b> a good draft, fast, with you in the loop every turn.<br>
<b>It costs:</b> the least. A quick back-and-forth uses less than a multi-step task.<br>
<b>It breaks when:</b> the notes are spread across 40 files you would have to attach one by one.</p>

<h2>2. Hand off the whole task</h2>
<p>Same conversation, bigger ask. In Claude Desktop, give Claude access to the release-notes folder. Then describe the outcome: "Go through this folder and build a summary deck." Claude plans the work and may split it across several <span class="jargon" data-term="subagent">subagents</span>. The finished <code>.pptx</code> lands in your folder.</p>
<p>Longer tasks keep running in the cloud after you close your laptop. Your local folder is reachable only while Claude Desktop is open.</p>
<p><b>You get:</b> a deliverable, not a draft.<br>
<b>It costs:</b> more of your allowance. Every step Claude takes uses tokens. Paid plans only.<br>
<b>It breaks when:</b> you wanted to shape the argument yourself. Delegation means accepting Claude's judgement calls.</p>

<div class="callout tip">
  <div class="c-head">💡 Just want an answer?</div>
  <p>Say so. Tell Claude you need a quick answer, not a file or a finished deliverable. That keeps a simple question from turning into a task.</p>
</div>

<h2>3. Run it in Claude Code</h2>
<p>If the release notes are Markdown in a git repo, this is a natural fit. Claude Code reads the repo, checks the history, writes a summary file, and commits it. Run it as a <span class="jargon" data-term="cloud-session">cloud session</span> and it keeps going after you close your laptop.</p>
<p><b>You get:</b> something version-controlled and reviewable as a diff.<br>
<b>It costs:</b> usage from the same plan limit. Cloud sessions have no separate charge.<br>
<b>It breaks when:</b> the source is not in a repo. Cloud sessions start from a git repository, so loose files are awkward.</p>

<h2>Side by side</h2>
<table class="doc">
<thead><tr><th></th><th>Steer it</th><th>Hand it off</th><th>Claude Code</th></tr></thead>
<tbody>
<tr><td><b>You are…</b></td><td>in the loop every turn</td><td>away</td><td>reviewing diffs</td></tr>
<tr><td><b>Work lives in</b></td><td>the conversation</td><td>folders and connected apps</td><td>a git repo</td></tr>
<tr><td><b>Output</b></td><td>a draft, plus files if asked</td><td>finished documents</td><td>committed files</td></tr>
<tr><td><b>Keeps running if you close the laptop?</b></td><td>—</td><td>Yes, in the cloud. Local files need Desktop open.</td><td>Yes, as a cloud session</td></tr>
<tr><td><b>Plans</b></td><td>All, including Free</td><td>Paid only</td><td>Pro, Max, Team, Enterprise, or Console</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The tiebreaker</div>
  <p>Ask what you want to be doing while it runs. Thinking alongside it → steer it. Something else entirely → hand it off. Reviewing its work like a colleague's PR → Claude Code.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>You are at your desk and want to shape the message.</b> Paste the notes and steer. "Lead with the two changes that affect renewals."</li>
  <li><b>The notes sit in a folder of 40 files.</b> Connect the folder in Desktop and ask for the finished deck. Answer Claude's questions as they come.</li>
  <li><b>The notes live in your docs repo.</b> Use Claude Code. Review the summary as a diff before you merge it.</li>
  <li><b>You need it every quarter.</b> Ask Claude to repeat it on a schedule — see <a href="#cowork-practice">3.3</a>.</li>
</ul>

<h2>The mistake worth naming</h2>
<p><i>Author's opinion:</i> handing off work you should have steered. A handoff is the most <i>autonomous</i> option, which is not the same as the most powerful. Autonomy is a cost you pay for not being there. You spend more allowance, and you give up the small course-corrections that make a conversation work. If you are at your desk anyway, steering often gets a better answer sooner.</p>
<p>The mirror-image mistake: pasting file after file into the conversation when the whole job was "read this folder."</p>

<h2>They share one budget</h2>
<p>claude.ai, Claude Desktop, and Claude Code all count toward the same usage limit. Paid plans have a limit that resets every five hours, plus weekly limits. Choosing how to work is a spending decision. See <a href="#plans-limits">plans &amp; usage limits</a>.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a> — the merge, rollout, local files, usage</li>
    <li><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Claude Cowork</a> — paid plans, sub-agents, connected folders, relative usage</li>
    <li><a href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude">Create and edit files with Claude</a> — file creation on all plans</li>
    <li><a href="https://code.claude.com/docs/en/claude-code-on-the-web">Use Claude Code in the cloud</a> — cloud sessions, git repositories, usage</li>
    <li><a href="https://code.claude.com/docs/en/setup">Claude Code setup</a> — which plans include Claude Code</li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a> — one shared limit</li>
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
<p class="lead">You explain your org's data model at the start of every chat. Third time this week. Put it in a project once instead.</p>

<p>A <span class="jargon" data-term="project">project</span> is a workspace with its own chats, files, and instructions. Upload the docs once. Every chat in that project starts knowing them.</p>

<h2>When to use it</h2>
<ul>
  <li><b>A client engagement.</b> Their requirements, org notes, and naming rules in one place. Every chat starts from the same facts.</li>
  <li><b>A standing role.</b> Instructions like "Answer as a Salesforce architect. Assume the managed package context."</li>
  <li><b>A reference library you query often.</b> Coding standards, architecture docs, release notes.</li>
  <li><b>Work you want kept apart.</b> Each project has its own memory, so one client's details stay out of another's chats.</li>
</ul>

<h2>What goes in one</h2>
<ul>
  <li><b>Project knowledge</b> — documents, code, text. Uploaded once, used in every chat inside.</li>
  <li><b>Project instructions</b> — standing orders for every chat in the project.</li>
  <li><b>Project <span class="jargon" data-term="memory">memory</span></b> — its own memory space. Claude also uses your account memory unless you turn off <b>Use account memory</b> for that project. See <a href="#memory">4.3</a>.</li>
</ul>
<p>Projects are on every plan. Free accounts can create up to five.</p>

<h2>When the knowledge base gets big</h2>
<p>On paid plans, a project near the <span class="jargon" data-term="context-window">context window</span> limit switches on <span class="jargon" data-term="rag">RAG</span> mode. Anthropic says this expands capacity <b>by up to 10×</b>. Claude then searches the knowledge base instead of holding all of it at once.</p>

<div class="callout tip">
  <div class="c-head">💡 What retrieval costs you</div>
  <p>Retrieval means Claude sees the <i>relevant parts</i>, not everything. Great for a 200-document library. Worse when a question needs links across documents that no single search surfaces. The author's advice: if precision matters more than breadth, a small curated project beats a giant one.</p>
</div>

<h2>Projects also save usage</h2>
<p>Project content is cached. Reused cached content counts less against your limits than new content. Caches expire after a break, so your first message after a long pause counts in full again.</p>

<h2>Good projects and bad ones</h2>
<p><b>Good:</b> stable material with a clear boundary. True across many chats.</p>
<p><b>Bad:</b> a dumping ground. In the author's experience, 300 stale files give worse answers than the 12 that matter.</p>

<h2>Sharing</h2>
<p>Sharing is a Team and Enterprise feature. A project is <b>Public</b> (everyone in the org) or <b>Private</b> (invited members only). Members get <b>Can view</b> or <b>Can edit</b>. Chats inside a shared project stay private unless you share them.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Projects are not Claude Code's CLAUDE.md</div>
  <p>Same instinct, different surfaces. Project instructions apply to chats on claude.ai. <a href="#memory-rules">CLAUDE.md</a> applies to Claude Code sessions in a repo. They share nothing.</p>
  <p>Chat and Cowork projects now work the same way. Where chat and <a href="#cowork">Cowork</a> have merged, projects work in every conversation.</p>
</div>

<h2>A new version is in beta</h2>
<p>A new kind of project is rolling out, starting with select Pro and Max Claude Code users. The project becomes one conversation. Claude splits the work into parallel threads that run in the cloud and keep going if you close your laptop. Each thread starts with the project's files, repos, instructions, and memory. A <b>Library</b> holds files you add and files Claude produces. Several threads at once use your allowance faster. Existing projects may be moved, with nothing deleted.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/9517075-what-are-projects">What are projects</a> — knowledge, instructions, RAG and the 10× claim, the new beta</li>
    <li><a href="https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects">Create and manage projects</a> — the Free limit, project memory</li>
    <li><a href="https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing">Project visibility and sharing</a></li>
    <li><a href="https://support.claude.com/en/articles/9797557-usage-limit-best-practices">Usage limit best practices</a> — project caching</li>
    <li><a href="https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork">Projects in Cowork</a></li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a></li>
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
<p class="lead">You need a one-page diagram of your org's object relationships for Thursday's review. Ask for it, and it opens in a panel beside the chat, ready to edit and share.</p>

<p>An <span class="jargon" data-term="artifact">artifact</span> is a standalone thing Claude makes for you: a document, deck, design, dashboard, or small working app. Claude usually makes one when the content is substantial, self-contained, and likely to be reused. Every artifact is saved to the <b>Artifacts</b> tab in the sidebar.</p>

<h2>When to use it</h2>
<ul>
  <li><b>A deck from your notes.</b> "Turn these release notes into eight slides for the CS team." Export to PowerPoint or PDF.</li>
  <li><b>A doc others will edit.</b> A spec or proposal your team edits with Claude in real time.</li>
  <li><b>A small internal tool.</b> A "paste an Apex error, get an explanation" widget your team opens by link.</li>
  <li><b>A visual you'd otherwise describe.</b> A chart, a mockup, a comparison of three options side by side.</li>
</ul>

<h2>The templates</h2>
<table class="doc">
<thead><tr><th>Template</th><th>Makes</th><th>Plans</th></tr></thead>
<tbody>
<tr><td><b>Docs</b></td><td>Living documents you write with Claude and your team</td><td>All plans</td></tr>
<tr><td><b>Slides</b></td><td>Presentations. Export to PowerPoint, PDF, or Google Slides, or present in Claude</td><td>All plans</td></tr>
<tr><td><b>Design</b></td><td>Mockups, prototypes, one-pagers, landing pages</td><td>All plans</td></tr>
<tr><td><b>Dashboards</b> (beta)</td><td>Charts from data platforms or connected apps. Each chart shows its query and last refresh</td><td>Pro, Max, Team, Enterprise</td></tr>
<tr><td><b>Motion</b> (beta)</td><td>Animated explainers, exportable as MP4</td><td>Team, Enterprise</td></tr>
</tbody>
</table>
<p>Since 16 September 2026, Docs, Slides, and Design work in any conversation, including Claude Code. Artifacts need <b>Create and edit files</b> turned on (formerly "Code execution and file creation"), under Settings → Capabilities.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Standalone Claude Design closes 14 December 2026</div>
  <p>The separate site at claude.ai/design goes read-only on that date. Move your design systems now, from the Artifacts page in Claude. Chats and comments do not transfer. Public project links stop working.</p>
</div>

<h2>Editing</h2>
<ul>
  <li><b>Ask in chat</b> — "make the title shorter."</li>
  <li><b>Edit directly</b> — type in a doc, change a slide, move things on a design canvas. Faster than a round trip for a typo.</li>
  <li><b>Edit with Claude</b> — highlight text in a doc and target just that section.</li>
</ul>

<h2>AI-powered artifacts</h2>
<p>An artifact can call Claude itself, so it works as a small app. There is no backend, API key, or deploy. Each person who uses it signs in with their own Claude account, and the usage counts against <i>their</i> plan. New artifacts ask permission the first time they use Claude.</p>

<div class="callout tip">
  <div class="c-head">💡 The one people miss</div>
  <p>The author's view: for a prototype that would otherwise never get built, this is the shortest path there is. Build the tool in a chat, share the link, done.</p>
</div>

<h2>Sharing</h2>
<p>Artifacts start <b>private to you</b>. You choose who else sees them.</p>
<ul>
  <li><b>Pro and Max</b> — "Only you", "Anyone with the link", or invited people. Email invitations (beta) give view, comment, or edit access.</li>
  <li><b>Older chat artifacts</b> — show a <b>Publish</b> button on Free, Pro, and Max. Publishing creates a public link anyone can open, with no Claude account needed.</li>
  <li><b>Connected data</b> — an artifact that pulls from connected apps uses each viewer's own connections.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ "Anyone with the link" means anyone</div>
  <p>A link to an artifact built from your org's data can be forwarded anywhere. Check what is baked into it before you share. For anything sensitive, share with named people instead.</p>
</div>

<h2>In Claude Code</h2>
<p>Claude Code can publish session output as a live artifact at a private claude.ai URL. The page updates as the session continues. Use it when a rendered page beats terminal text: an annotated diff, a dashboard, options side by side. <code>/slides</code> and <code>/design</code> start from the templates. Needs Pro, Max, Team, or Enterprise and a claude.ai login.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them">Claude Artifacts: Design, Slides, Docs, and the Artifacts tab</a> — templates, plans, editing, AI-powered artifacts</li>
    <li><a href="https://support.claude.com/en/articles/9547008-share-artifacts">Share artifacts</a></li>
    <li><a href="https://support.claude.com/en/articles/17440474-move-from-standalone-claude-design-to-claude">Move from standalone Claude Design</a> — the 14 December 2026 closure</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — Design, Slides, Docs in any conversation (16 Sep 2026)</li>
    <li><a href="https://code.claude.com/docs/en/artifacts">Share session output as artifacts</a> — Claude Code</li>
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
<p class="lead">Last month you told Claude you're a Salesforce engineer. Today, in a brand-new chat, it still knows. You want to see what else it remembers.</p>

<p>That is <span class="jargon" data-term="memory">memory</span> on claude.ai. It is not the same thing as <a href="#memory-rules">Claude Code's auto memory</a> or the API's memory tool. Same word, three mechanisms.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Leave it on</b> so you stop repeating your role, stack, and preferences.</li>
  <li><b>Say "remember this"</b> for a standing fact: "I always want Apex examples with test classes."</li>
  <li><b>Use chat search</b> for a past decision: "What did we decide about the trigger framework?"</li>
  <li><b>Use incognito</b> for a one-off question you don't want shaping later chats.</li>
</ul>

<h2>How it works</h2>
<p>Claude saves memory as separate <b>topics</b> during your chats. It saves on its own, and you can also tell it what to remember, change, or forget. Claude uses them in later chats.</p>
<p>Memory is on by default on Free, Pro, and Max. On Team and Enterprise, an owner enables it, then each member turns it on.</p>

<h2>You can read and edit it</h2>
<p><b>Settings → Your Claude → Manage</b> (next to Your memory) lists every topic. Edit or delete any of them.</p>

<div class="callout tip">
  <div class="c-head">💡 Go read your memory once</div>
  <p>If Claude keeps making an assumption you can't place — the wrong tech stack, a project you finished — it is probably a saved topic. The author's tip: two minutes in that list fixes months of small annoyances.</p>
</div>

<table class="doc">
<thead><tr><th>Control</th><th>Does</th></tr></thead>
<tbody>
<tr><td><b>Pause memory</b></td><td>Keeps existing memory. Claude stops using it and stops saving.</td></tr>
<tr><td><b>Reset memory</b></td><td>Permanently deletes all memory, including project memories.</td></tr>
<tr><td><b>Include sensitive topics</b></td><td>Off by default. Health, politics, and religion are not saved unless you turn it on.</td></tr>
<tr><td><b>Memory off for one chat</b></td><td>In the <b>+</b> menu, before your first message. The chat stays searchable.</td></tr>
<tr><td><b>Import / export</b></td><td>Import: run a prompt in your old assistant, paste the result. Export: ask Claude to write out its memories verbatim. Import is experimental.</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ Deleting a chat does not delete what it taught Claude</div>
  <p>Memory topics saved from a conversation survive when you delete that conversation. Delete the topic itself in settings. Some things are never saved at all, such as government ID numbers and financial account numbers.</p>
</div>

<h2>Project memory</h2>
<p>Each <span class="jargon" data-term="project">project</span> has its own memory. Inside a project, Claude uses that project's memory plus your non-project memory, but never another project's. To seal a project off completely, turn off <b>Use account memory</b> on its page. Useful for consultants and anyone whose contexts must stay apart.</p>

<h2>Incognito chats</h2>
<p>The ghost icon, on all plans. Not saved to history or memory, and chat search never finds them. On Team and Enterprise they still appear in standard data exports.</p>

<h2>Chat search</h2>
<p>Ask in plain language and Claude searches your past chats. It covers your non-project chats, or one project's chats. Paid plans only: Pro, Max, Team, Enterprise. Memory holds the gist; search finds the specifics. The toggle is <b>Search and reference chats</b> in Settings → Your Claude.</p>

<h2>Memory and Cowork tasks</h2>
<p>Memory is shared between chat and <a href="#cowork">Cowork</a> tasks that run in the cloud. Tasks that run only on your computer don't use it, and their memory stays with those tasks.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Three memories, one word</div>
  <p><b>claude.ai memory</b> — topics saved from your chats, editable in settings. <b>Claude Code auto memory</b> — machine-local notes per repo, in <code>~/.claude/projects/&lt;project&gt;/memory/</code>. <b>The memory tool</b> — an API feature writing to storage you control. Nothing is shared between them.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context">Chat search and memory</a> — topics, controls, project memory, incognito, Cowork</li>
    <li><a href="https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude">Import and export memory</a></li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — memory across chat and Cowork, topics, sensitive-topics setting (25 Aug 2026)</li>
    <li><a href="https://code.claude.com/docs/en/memory">How Claude remembers your project</a> — Claude Code auto memory</li>
    <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool">Memory tool</a> — the API one</li>
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
<p class="lead">"Which Salesforce DevOps tools support this workflow, and what do teams say about them?" That is not one search. It is a dozen searches and a synthesis.</p>

<p>Three features overlap here, and people pick the wrong one. The difference takes two minutes to learn.</p>

<h2>When to use which</h2>
<table class="doc">
<thead><tr><th>Use</th><th>When</th><th>Example</th></tr></thead>
<tbody>
<tr><td><b>Web search</b></td><td>A current fact. One or two searches.</td><td>"What's the latest Salesforce release name?"</td></tr>
<tr><td><b>Higher <span class="jargon" data-term="effort">effort</span> / thinking</b></td><td>Hard reasoning over what you give it. No lookup.</td><td>"Why does this trigger recurse? Here's the code."</td></tr>
<tr><td><b>Research</b></td><td>An open question needing many sources, reconciled into a cited report.</td><td>"Compare three DevOps tools on cost, setup, and user complaints."</td></tr>
</tbody>
</table>
<p>Anthropic's guide puts Research at "five or more tool calls over 1-3 minutes." Pairing Research with thinking gives a more carefully planned, longer report.</p>

<h2>How Research runs</h2>
<div class="mermaid">
sequenceDiagram
    participant You
    participant C as Claude
    participant W as The web / your apps
    You->>C: An open question
    Note over C: Plan: split into<br/>lines of enquiry
    C->>W: Many searches
    W-->>C: Sources
    Note over C: Read, reconcile,<br/>find gaps
    C->>W: Follow-up searches
    W-->>C: More sources
    C-->>You: Report with citations
</div>
<p class="diagram-caption">It is agentic: each search builds on what the last one found.</p>

<h2>Starting Research</h2>
<ul>
  <li>Click <b>+</b> → <b>Research</b>, or type <code>/deep-research</code> in the new combined chat and Cowork experience.</li>
  <li>Paid plans only: Pro, Max, Team, Enterprise. Web, Desktop, and mobile.</li>
  <li>It needs web search on.</li>
  <li>It runs on Opus 5.5 (falling back to Opus 4.8), whatever model your chat uses.</li>
</ul>

<h2>Research over your own stuff</h2>
<p>Research can search your <a href="#connectors-files">connectors</a> alongside the web, including Gmail, Google Calendar, and Google Docs. "What did we agree with this client, and what has changed in the product since?" spans both. That combination is where it earns its keep.</p>
<ul>
  <li>On mobile, Research uses the web only and silently skips connectors. Start it on the web or in Desktop.</li>
  <li>It cannot use local MCP servers configured in Claude Desktop.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Connector tools run without asking</div>
  <p>During Research, connector tools run without per-call approval. Only enable connectors in that chat that you are happy for Claude to use freely.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 Judge it by the citations</div>
  <p>The author's rule: skim the sources first. If they're thin, the report is confident-sounding and unreliable. A cited report you can audit beats a fluent one you can't.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Research is not cheap</div>
  <p>It counts against the same limits as normal chats, but drains them faster: many sources, long reports. Save it for questions that need a dozen sources, not "what's the syntax for a Flow formula."</p>
</div>

<h2>Web search itself</h2>
<p>On every plan, including Free. Every answer includes citations, so you can check where Claude looked. Paste a URL and Claude reads the full page.</p>
<p>In the new combined chat and Cowork experience there is no web search toggle. Claude searches when it helps. Elsewhere, turn it on from <b>+</b> → <b>Web search</b>. On Team and Enterprise, an owner enables it first.</p>
<p>One trap on Free: a long pasted article loads into the <span class="jargon" data-term="context-window">context window</span> and can use a large share of your limit.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/11088861-use-research-on-claude">Use Research</a> — plans, connectors, models, usage</li>
    <li><a href="https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research">When to use web search, extended thinking, and Research</a></li>
    <li><a href="https://support.claude.com/en/articles/10684626-enable-and-use-web-search">Enable and use web search</a> — citations, web fetch</li>
    <li><a href="https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude">Claude Cowork and chat are one Claude</a> — no search toggle, <code>/deep-research</code></li>
    <li><a href="https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings">Change the model, effort, and thinking settings</a></li>
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
<p class="lead">"Build me a spreadsheet of these 200 records with a pivot and a chart." Claude writes Python, runs it, and hands you an .xlsx. On the Free plan.</p>

<p>Three capabilities turn chat from a text box into something that produces work. Manage all three under <b>Customize</b> in the left sidebar: one directory with Skills, Connectors, and Plugins tabs.</p>

<h2>When to use which</h2>
<table class="doc">
<thead><tr><th>You want Claude to…</th><th>Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Produce a real file</td><td><b>File creation</b> — on by default</td><td>An .xlsx with working formulas from a CSV export</td></tr>
<tr><td>Follow your process reliably</td><td>A <b><span class="jargon" data-term="skill">skill</span></b></td><td>Your team's code-review checklist, applied the same way every time</td></tr>
<tr><td>Reach a system it can't see</td><td>A <b><span class="jargon" data-term="connector">connector</span></b></td><td>"Summarise this week's unread client emails"</td></tr>
<tr><td>All of these, packaged for a role</td><td>A <b><span class="jargon" data-term="plugin">plugin</span></b></td><td>A sales plugin with skills plus CRM access</td></tr>
</tbody>
</table>

<h2>File creation</h2>
<p>Claude runs code in an isolated, sandboxed container to make real files: <code>.xlsx</code>, <code>.pptx</code>, <code>.docx</code>, PDFs, PNG charts, and Python scripts. Up to 30 MB per file, for uploads and downloads. <b>All plans, including Free.</b> No sandbox is ever shared between users.</p>
<p>The setting is <b>Create and edit files</b> (formerly "Code execution and file creation"), in Settings → Capabilities. Internet access from the sandbox is a separate <b>Allow network egress</b> toggle.</p>

<div class="callout tip">
  <div class="c-head">💡 This is also how Claude does maths properly</div>
  <p>Asked to analyse numbers, Claude can compute them rather than predict them. A median from running code is a different reliability class from one guessed by a language model. If precision matters, ask it to calculate.</p>
</div>

<h2>Skills</h2>
<p><span class="jargon" data-term="skill">Skills</span> are folders of instructions, scripts, and resources that Claude loads when a task needs them. Four kinds:</p>
<ul>
  <li><b>Anthropic's</b> — Excel, Word, PowerPoint, PDF. The reason generated files look properly made.</li>
  <li><b>Custom</b> — yours or your org's. Brand rules, meeting-note formats, review checklists.</li>
  <li><b>Partner</b> — Notion, Figma, Atlassian, and others, built to work with their connectors.</li>
  <li><b>Organisation-provisioned</b> — pushed by owners on Team and Enterprise.</li>
</ul>
<p>All plans. Skills need code execution on. They use the same <code>SKILL.md</code> format as <a href="#skills-commands">Claude Code skills</a>. That format is the open Agent Skills standard, which Anthropic donated to the Linux Foundation's Agentic AI Foundation on 22 October 2026. A skill can travel between surfaces and tools.</p>

<h2>Connectors</h2>
<p>A <span class="jargon" data-term="connector">connector</span> links Claude to an app so it can read your data and take actions there. A custom connector is a remote <span class="jargon" data-term="mcp">MCP</span> server you add by URL. Claude gets only the access you already have in that app. Connect one under <b>Customize → Connectors</b>, then toggle it per chat from the <b>+</b> menu. Some connectors are marked <b>Interactive</b>: they draw live dashboards or boards inside the chat.</p>
<p>Connectors are on every plan. Free accounts can add one custom connector. On Team and Enterprise, an owner enables connectors first.</p>

<h3>Google Workspace</h3>
<ul>
  <li><b>Gmail</b> — search, read, draft, send, reply, and forward. Claude asks before each send by default.</li>
  <li><b>Calendar</b> — read, find free time, and create, update, or delete events.</li>
  <li><b>Drive</b> — search and read files, upload, and save Claude's files to Drive.</li>
  <li>Answers cite the emails, events, and files they used. Anthropic says it does not train on Gmail, Drive, or Calendar connector data.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Custom connectors run from Anthropic's cloud, not your machine</div>
  <p>The most misunderstood thing here. Add a custom connector by URL and <b>Anthropic's servers</b> connect to it — from every client, including the Desktop app. Your MCP server must be reachable over the public internet from Anthropic's IP ranges. A server on localhost, a private network, or behind your VPN won't connect.</p>
  <p>For a local server, use <a href="#desktop-app">Desktop extensions</a> or <a href="#mcp">Claude Code's MCP</a>. Same protocol, opposite networking model.</p>
</div>

<h2>Plugins</h2>
<p>A <span class="jargon" data-term="plugin">plugin</span> bundles skills and connectors for a role. Add one from <b>Customize → Plugins</b>. Its skills and commands work in chat, Cowork, and Claude Code under the same account. Example: Salesforce in Claude (beta, paid plans) adds a plugin with 37 sales skills.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude">Create and edit files</a> — the sandbox, formats, 30 MB limit</li>
    <li><a href="https://support.claude.com/en/articles/12512176-what-are-skills">What are skills</a></li>
    <li><a href="https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation">Donating Agent Skills to the Agentic AI Foundation</a></li>
    <li><a href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities">Use connectors</a> — plans, permissions, interactive connectors</li>
    <li><a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">Custom connectors via remote MCP</a> — the cloud-side model</li>
    <li><a href="https://support.claude.com/en/articles/10166901-use-google-workspace-connectors">Google Workspace connectors</a></li>
    <li><a href="https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory">Skills, connectors, and plugins in one directory</a></li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — Salesforce in Claude beta (15 Sep 2026)</li>
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
<p class="lead">It's Thursday afternoon and Claude says you've hit your weekly limit. You want to know what ran you out, and how to stop it happening again.</p>

<p>Probably not what you think. The limits are simple once you see them. The surprise is that everything shares one budget.</p>

<h2>When to use which plan</h2>
<table class="doc">
<thead><tr><th>Plan</th><th>Price</th><th>Gets you</th><th>Pick it when</th></tr></thead>
<tbody>
<tr><td><b>Free</b></td><td>$0</td><td>Chat, web search, files and code, memory, connectors, artifacts, Design, Slides, Docs, up to 5 projects. Sonnet and Haiku. <b>No Claude Code, no Research.</b></td><td>You chat a few times a week</td></tr>
<tr><td><b>Pro</b></td><td>$20/mo<br><small>$17/mo billed annually</small></td><td>At least 5× Free usage per 5-hour session. Claude Code, Research, Projects, Opus, Claude in Chrome. Fable only through usage credits.</td><td>Claude is part of your daily work</td></tr>
<tr><td><b>Max 5×</b></td><td>$100/mo</td><td>5× Pro usage. Higher output limits, priority at peak times. Separate weekly Fable allowance. $100/mo API credits.</td><td>You hit Pro limits most weeks</td></tr>
<tr><td><b>Max 20×</b></td><td>$200/mo</td><td>Everything in Max 5×, at 20× Pro usage. $200/mo API credits.</td><td>You run Claude Code or long tasks all day</td></tr>
</tbody>
</table>
<p>Team and Enterprise exist above these. This site doesn't cover their administration.</p>

<h2>Two limits, stacked</h2>
<ul>
  <li><b>A 5-hour limit</b> — rolling, on every plan.</li>
  <li><b>Weekly limits</b> — paid plans, resetting at a fixed time for your account.</li>
</ul>
<p>There is no fixed message count. <b>Settings → Usage</b> shows progress bars: the current 5-hour session, the weekly limit for all models, and a separate Fable bar if your plan includes Fable. Look there before guessing.</p>
<p>Some plans also get a saved <b>limit reset</b>. Use it to refill your 5-hour or weekly limit when you need it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Every surface spends the same budget</div>
  <p>claude.ai, Claude Code, and Claude Desktop count against the same limits. The Thursday wall is usually a long Claude Code session or a long-running task, not your chats.</p>
</div>

<h2>What actually burns it</h2>
<ul>
  <li><b>Conversation length.</b> The whole transcript is re-read every turn. Turn 50 costs far more than turn 2. See <a href="#how-claude-thinks">how Claude thinks</a>.</li>
  <li><b>Big messages and attachments.</b></li>
  <li><b>Tools and multi-step tasks.</b> Research, web search, running code, making files, browsing. Each runs turns you never see.</li>
  <li><b>Model and <span class="jargon" data-term="effort">effort</span>.</b> Higher effort uses more tokens. Fable is the costliest to reach: Pro gets it only through usage credits. See <a href="#choosing">choosing a model</a>.</li>
  <li><b>Artifacts.</b> Making and using them counts too.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 How to not hit the wall</div>
  <p>The author's habits: default to Sonnet 5.5 for everyday work and save Opus 5.5 for work that is actually hard. Use Low or Medium <span class="jargon" data-term="effort">effort</span> for routine tasks; Anthropic says this makes usage last longer. Start a fresh chat — or <code>/clear</code> in Claude Code — between unrelated tasks. Put documents you reuse in a <a href="#projects">project</a>, where cached content counts for less. That is usually the whole fix.</p>
</div>

<h2>Usage credits</h2>
<p><span class="jargon" data-term="usage-credits">Usage credits</span> let paid plans keep working past a limit instead of stopping. They bill at standard API rates and cover both Claude and Claude Code. Turn them on in <b>Settings → Usage</b>, set a monthly spend limit, and optionally auto-reload. In most cases they don't expire. They are also how Pro reaches Fable, and how Max keeps using Fable after its weekly Fable limit.</p>

<h2>Monthly API credits (Max)</h2>
<p>Max includes API credits every month: $100 on 5×, $200 on 20×. Claim them by linking a Claude Console organization in <b>Settings → Billing</b>. They expire at the end of each billing cycle.</p>
<div class="callout warn">
  <div class="c-head">⚠️ API credits are not extra Claude Code usage</div>
  <p>They cover the API, the Console, Managed Agents, the Agent SDK, and <code>claude -p</code> with that org's API key. They do <b>not</b> cover interactive Claude Code or extra usage in Claude. Your plan limits stay the same. Usage credits and API credits are separate things.</p>
</div>

<h2>Context windows on a plan</h2>
<p>The newest models support up to a 1M-token <span class="jargon" data-term="context-window">context window</span>. Others support 500K or 200K. Near the limit, automatic <span class="jargon" data-term="compaction">context management</span> summarises older messages so the chat continues. It needs code execution on, and those long chats use more of your limit.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://claude.com/pricing">Pricing</a> — the plan matrix, models and Fable access per plan</li>
    <li><a href="https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work">How usage and length limits work</a> — one pool, context windows</li>
    <li><a href="https://support.claude.com/en/articles/9797557-usage-limit-best-practices">Usage limit best practices</a> — the usage bars, what burns usage</li>
    <li><a href="https://support.claude.com/en/articles/8325606-what-is-the-pro-plan">What is the Pro plan</a> · <a href="https://support.claude.com/en/articles/11049741-what-is-the-max-plan">What is the Max plan</a></li>
    <li><a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a></li>
    <li><a href="https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans">Monthly API credits for Max and Team</a></li>
    <li><a href="https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings">Change the model, effort, and thinking settings</a> — effort and usage</li>
    <li><a href="https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan">Claude Code on Pro or Max</a> — shared limits</li>
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
<p class="lead">You need a datatable LWC that lists Opportunities, with server-side pagination, sortable columns, and an owner filter. That means four component files, an Apex controller, and a test class. Here is how to land it in one Claude Code session.</p>

<p>The shape that works: <b>set up once, plan first, let Claude build and test, then review.</b></p>

<h2>When to use it</h2>
<ul>
  <li><b>A new component with an Apex controller.</b> Several files that must agree with each other.</li>
  <li><b>A change across an existing LWC and its Apex.</b> A new filter, a new column, a new query path.</li>
  <li><b>Any work where Claude can run your tests.</b> The whole recipe leans on that loop.</li>
  <li><b>Not for a one-file fix.</b> A label or a typo doesn't need a plan. Just ask.</li>
</ul>

<h2>Setup: a short CLAUDE.md</h2>
<p>Write it once, in the repo root. Put in commands and conventions: what a new hire asks on day one. <code>/init</code> drafts a starter file from your codebase. Keep it under 200 lines. Longer files cost context and get followed less.</p>

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

<p>Apex-only guidance goes in a path-scoped rule instead. Save it as <code>.claude/rules/apex.md</code>. It loads only when Claude reads or edits a matching file, so it costs nothing the rest of the time:</p>

<pre><code>---
paths:
  - "force-app/**/*.cls"
  - "force-app/**/*.trigger"
---

- Bulkify everything. No SOQL or DML inside loops.
- Query only the fields you use.
- Respect sharing: "with sharing" unless there is a documented reason not to.</code></pre>

<p>That is <a href="#memory-rules">2.5</a> in practice. Always-true things go in <span class="jargon" data-term="claude-md">CLAUDE.md</span>. File-specific things go in <code>.claude/rules/</code>.</p>

<h2>The session</h2>
<div class="mermaid">
sequenceDiagram
    participant You
    participant C as Claude Code
    participant SF as sf CLI / org
    You->>C: /plan and the request
    C->>C: Reads existing LWCs and the object model
    C-->>You: A plan: 4 files, controller, tests
    You->>C: Corrects one assumption, approves
    Note over C: Continues in auto mode or accept-edits
    C->>C: Writes component, Apex, tests
    C->>SF: sf apex run test
    SF-->>C: 1 failure
    C->>C: Fixes, re-runs
    SF-->>C: Pass
    C-->>You: Done. Review the diff
</div>
<p class="diagram-caption">You correct a plan, not nine written files.</p>

<h3>1. Start in plan mode</h3>
<p>Type <code>/plan</code> followed by the request. Or press <b>Shift+Tab</b> until the status bar says plan mode. In <span class="jargon" data-term="plan-mode">plan mode</span> Claude reads your components and object model but edits nothing. Then it proposes a plan.</p>
<p>This is where you catch "it's about to build a new controller when <code>OpportunityListController</code> already does 80% of this." Thirty seconds of reading saves an afternoon of review.</p>

<div class="callout tip">
  <div class="c-head">💡 The plan is the cheapest place to be wrong</div>
  <p>A wrong plan costs one paragraph of correction. A wrong implementation costs a diff review, a rollback, and the context you both burned getting there.</p>
</div>

<h3>2. Approve into a faster mode</h3>
<p>Approving the plan also picks the <span class="jargon" data-term="permission-mode">permission mode</span> Claude continues in:</p>
<table class="doc">
<thead><tr><th>Option</th><th>What happens</th><th>Pick it when</th></tr></thead>
<tbody>
<tr><td><b>Yes, and use auto mode</b></td><td>Claude runs edits and commands. A separate classifier model reviews each action in the background.</td><td>You trust the plan and want tests to run without prompts.</td></tr>
<tr><td><b>Yes, auto-accept edits</b><br><small>shown instead when auto mode isn't available</small></td><td>File edits run without asking. Other shell commands, such as <code>sf</code>, still ask unless you allowed them.</td><td>You want to approve each deploy yourself.</td></tr>
<tr><td><b>Yes, manually approve edits</b></td><td>You review every edit.</td><td>Unfamiliar code, or a risky change.</td></tr>
<tr><td><b>No, keep planning</b></td><td>Stays in plan mode.</td><td>The plan is still wrong.</td></tr>
</tbody>
</table>
<p><b>The author's take:</b> <span class="jargon" data-term="auto-mode">auto mode</span> suits this recipe when it's available. Auto-accept edits is the safe fallback.</p>

<h3>3. Let it run your tests</h3>
<p>Because <code>CLAUDE.md</code> names the commands, Claude runs <code>sf apex run test</code> and <code>npm run test:unit</code> itself. It reads the failures and fixes them. That feels like magic. It is really "you told it how."</p>
<p>To stop the prompts on every run, allow the command once, for example with the rule <code>Bash(sf apex run test *)</code>.</p>

<h3>4. Review before you commit</h3>
<p><code>/code-review</code> checks the current diff for correctness bugs. Add <code>--fix</code> to have Claude apply its findings. <code>/simplify</code> is the separate cleanup pass; it does not hunt for bugs. Neither replaces your eyes. They clear the boring findings so your review can be about design.</p>

<h2>When it goes sideways</h2>
<p>Claude misreads the object model and starts patching symptoms. You explain again. It half-fixes. You explain again.</p>
<p><b>Stop.</b> Run <code>/rewind</code>, or press Esc twice, and pick <b>Restore code</b>. The files go back, but the conversation stays, so Claude keeps what it learned. Or run <code>/clear</code> and start fresh with a prompt that includes what you just learned. As <a href="#how-claude-thinks">0.3</a> argues, you are fighting a cluttered <span class="jargon" data-term="context-window">context window</span>, not a weak model.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Rewind only undoes Claude's file edits</div>
  <p>A <span class="jargon" data-term="checkpoint">checkpoint</span> tracks files Claude changed with its edit tools. A file that only a shell command changed, such as one written by an <code>sf</code> command, is not restored. Use git for that.</p>
</div>

<h2>Which model</h2>
<p>Claude Code defaults to Opus 5.5 at <code>medium</code> <span class="jargon" data-term="effort">effort</span> on Pro, Max, Team, Enterprise and the API.</p>
<p><b>The author's take:</b> that default handles this recipe well. For patterned, well-scoped work like a datatable, Sonnet 5.5 (<code>/model sonnet</code>) is the cheaper pick. Save Fable 5.1 for hard, open-ended debugging. See <a href="#choosing">1.2</a>.</p>

<h2>What to steal</h2>
<ul>
  <li><b>Commands in CLAUDE.md.</b> Everything else follows from Claude being able to run your tests.</li>
  <li><b>Apex rules in <code>.claude/rules/</code> with a <code>paths</code> glob</b>, not in CLAUDE.md.</li>
  <li><b>Plan mode for anything multi-file.</b> Non-negotiable.</li>
  <li><b>Rewind early.</b> Two failed corrections means reset, not a third explanation.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Choose a permission mode</a> — plan mode, plan approval options, auto mode, accept-edits</li>
    <li><a href="https://code.claude.com/docs/en/memory">How Claude remembers your project</a> — CLAUDE.md size, /init, path-scoped rules</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a> — /rewind and what it doesn't track</li>
    <li><a href="https://code.claude.com/docs/en/commands">Commands</a> — /plan, /code-review, /simplify, /clear</li>
    <li><a href="https://code.claude.com/docs/en/code-review-local">Review locally with /code-review</a></li>
    <li><a href="https://code.claude.com/docs/en/model-config">Model configuration</a> — default model and effort</li>
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
<p class="lead">Someone asks you to rename a picklist value on a managed-package object. The honest answer is "it depends." Finding out means two hours of clicking through Setup.</p>

<p>This recipe teaches Claude to run that scan. It needs <b>two</b> things your repo alone cannot give it: a written checklist, and live access to the org.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Renaming or deleting</b> a field, a picklist value, or an Apex method.</li>
  <li><b>Changing a field's type</b> when records already hold data.</li>
  <li><b>Changing an LWC <code>@api</code> property</b> that other components set.</li>
  <li><b>Before a managed-package release</b>, on anything subscribers might depend on.</li>
</ul>

<h2>Why the repo isn't enough</h2>
<p>Your repo knows the Apex, LWC, and metadata you retrieved. It does not know which Reports filter on that value, which Flows branch on it, or whether any records use it. That lives in the org.</p>

<div class="mermaid">
flowchart TD
    A["Proposed change:<br/>rename a picklist value"] --> B["Skill: the checklist"]
    B --> C["Repo scan<br/>grep Apex · LWC · metadata"]
    B --> D["Org scan via sf CLI<br/>dependencies · Flows · Reports"]
    C --> E["Risk report"]
    D --> E
    E --> F{"Managed package<br/>one-way door?"}
    F -- Yes --> G["Stop. Escalate."]
    F -- No --> H["Proceed with a plan"]
</div>
<p class="diagram-caption">Two sources, one report. Neither half is enough alone.</p>

<h2>Part 1 — the checklist as a skill</h2>
<p>Put your expertise where Claude can load it on demand: <code>.claude/skills/impact-analysis/SKILL.md</code>.</p>

<pre><code>---
name: impact-analysis
description: Assess the blast radius of a Salesforce metadata change (field, picklist value, Apex method, LWC @api property) before it ships. Use whenever someone proposes renaming, deleting, or changing the type of existing metadata.
---

Work through all of these. Report findings even when uncertain. A false
positive costs a minute; a missed dependency costs a release.

## In the repo
1. grep Apex, triggers, LWC, Aura for the API name and the literal value
2. Check test classes that assert on it
3. Check custom metadata and static resources

## In the org (needs an org authorized in the sf CLI)
4. Query MetadataComponentDependency with the Tooling API
   (sf data query --use-tooling-api). Filter on RefMetadataComponentId
   with the 18-character ID; name filters are not supported.
5. Reports are not in that result. Check them separately.
6. Flows that reference it
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
  <p>Until the <span class="jargon" data-term="skill">skill</span> loads, its <code>description</code> is all Claude sees of it. Say what it does and when to use it. "Impact analysis stuff" would never fire. Naming the situations ("renaming, deleting, or changing the type") makes it fire exactly when it should. The listing cuts descriptions at 1,536 characters, so put the key use case first. See <a href="#skills-commands">2.6</a>.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ The dependency object is still Beta</div>
  <p>Salesforce labels MetadataComponentDependency Beta and "for evaluation purposes only, not for production use." A Tooling API query returns at most 2,000 rows, and it leaves out Reports. Treat its answer as one input, not the whole picture.</p>
</div>

<h2>Part 2 — the org</h2>
<p>Claude needs a way to query your org. The simplest route: let it run the <code>sf</code> CLI against an org you already authorized. Two setups work:</p>

<table class="doc">
<thead><tr><th>Setup</th><th>What you get</th><th>Use it when</th></tr></thead>
<tbody>
<tr>
  <td><b>sf CLI only</b></td>
  <td>Claude runs the <code>sf</code> commands you allow. Nothing else to install.</td>
  <td>You want this one scan with the fewest moving parts.</td>
</tr>
<tr>
  <td><b>Salesforce Development <span class="jargon" data-term="plugin">plugin</span></b><br><small>by Salesforce</small></td>
  <td>A few dozen Salesforce skills, the <code>sf</code> CLI, Salesforce-hosted <span class="jargon" data-term="mcp">MCP</span> servers, and <span class="jargon" data-term="hook">hooks</span>, including a production deploy-safety gate. Install with <code>/plugin install salesforce-development@claude-plugins-official</code>.</td>
  <td>You do daily Salesforce work in Claude Code, not just this scan.</td>
</tr>
</tbody>
</table>
<p>Salesforce documents the plugin in its <a href="https://github.com/forcedotcom/sf-skills/tree/main/plugins/builder/salesforce-development">plugin README</a>. See <a href="#salesforce-setup">6.5</a> for the wider Salesforce setup.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The Salesforce DX MCP server reaches end of life on 2 Nov 2026</div>
  <p>The local DX MCP server (<code>@salesforce/mcp</code>) gets no releases after that date, and its repo will be archived. A pinned version keeps working, but expect no fixes. Salesforce says its tooling now ships as skills, in <a href="https://github.com/forcedotcom/sf-skills">forcedotcom/sf-skills</a>. Details: <a href="https://github.com/forcedotcom/mcp/issues/46">forcedotcom/mcp#46</a>.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Point it at a sandbox</div>
  <p>Any route into the org runs with your credentials. The CLI that runs a SELECT can also deploy or delete. Authenticate against a sandbox (<code>sf org login web --alias my-sandbox</code>). Allow only the reads you need, such as <code>Bash(sf data query *)</code>, and deny the rest, such as <code>Bash(sf project deploy *)</code>. If you connect an MCP server, allow its tools by exact name (<code>mcp__server__tool</code>). See <a href="#mcp">2.9</a>.</p>
</div>

<h2>Running it</h2>
<p>"I need to rename the <code>Status__c</code> picklist value 'Pending' to 'Awaiting Review'. What breaks?"</p>
<p>Claude loads the skill because your description matched. It greps the repo, queries the org, and returns the table.</p>
<p><b>The author's take on models:</b> this is diagnostic reasoning across sparse evidence. On the default Opus 5.5, raise effort first (<code>/effort high</code>). For a high-stakes change with murky evidence, try Fable 5.1 (<code>/model fable</code>). Anthropic suggests Fable for root-cause investigations. It can bill to usage credits instead of your plan limits; Claude Code asks first.</p>

<div class="callout warn">
  <div class="c-head">⚠️ This is a first pass, not a sign-off</div>
  <p>A dependency scan finds what it can see. Dynamic SOQL built from strings, an outside integration that uses the API name, a hardcoded value in an old Flow: a scan can miss all of these. Treat the output as a strong starting list, not a guarantee. The verdict is still yours.</p>
</div>

<h2>What to steal</h2>
<ul>
  <li><b>Encode the checklist you already run.</b> A skill is your expertise, written once.</li>
  <li><b>Repo and org together.</b> Either alone gives a confidently incomplete answer.</li>
  <li><b>Name the one-way doors.</b> Managed-package breakage is the one that ends careers.</li>
  <li><b>Ask for uncertain findings.</b> You filter. Claude shouldn't.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/skills">Extend Claude with skills</a> — SKILL.md, description, the 1,536-character cap</li>
    <li><a href="https://code.claude.com/docs/en/discover-plugins">Install and manage plugins</a> — /plugin install</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Configure permissions</a> — Bash rules, MCP tool rules</li>
    <li><a href="https://code.claude.com/docs/en/mcp">Connect Claude Code to tools via MCP</a></li>
    <li><a href="https://code.claude.com/docs/en/model-config">Model configuration</a> — /effort, Fable guidance, usage credits</li>
  </ul>
  <p><small>Salesforce tooling facts are linked inline to Salesforce's own repositories, the first-party source for those products.</small></p>
</div>
`
      },

      {
        id: "recipe-ci",
        num: "5.3",
        title: "PR review in CI",
        html: `
${VERIFIED}
<p class="lead">Every PR should be checked for SOQL in a loop, hardcoded IDs, and missing null guards before a human spends attention on it. PMD catches some of it. The rest needs judgement.</p>

<p>This recipe runs Claude Code <span class="jargon" data-term="headless">headless</span> in GitHub Actions. It turns the output into a gate: the check passes or fails, with findings.</p>

<h2>When to use it</h2>
<table class="doc">
<thead><tr><th>You want</th><th>Use</th></tr></thead>
<tbody>
<tr><td>A PR check that <b>fails</b> on your own rules and can block a merge</td><td><b>This recipe</b></td></tr>
<tr><td>Review comments on every PR, no workflow to maintain (Team and Enterprise)</td><td>Code Review, the managed service. It never blocks: its check run doesn't fail.</td></tr>
<tr><td><code>@claude</code> in PR comments to answer questions or push fixes</td><td>The Claude Code GitHub Action. Set it up with <code>/install-github-app</code>.</td></tr>
<tr><td>A review of your own branch before you push</td><td><code>/code-review</code> in your session</td></tr>
</tbody>
</table>

<div class="mermaid">
flowchart LR
    A["PR opened"] --> B["GitHub Action"]
    B --> C["git diff"]
    C --> D["claude --bare -p<br/>--json-schema"]
    D --> E{"any high-severity<br/>findings?"}
    E -- No --> F["✓ check passes"]
    E -- Yes --> G["Print findings<br/>· fail the check"]
</div>
<p class="diagram-caption">The schema makes this a gate rather than a wall of prose. The severity filter lives in the pipeline.</p>

<h2>1. A key</h2>
<p>Create an API key in the Claude Console. Store it as the repo secret <code>ANTHROPIC_API_KEY</code>.</p>

<div class="callout warn">
  <div class="c-head">⚠️ --bare ignores subscription tokens</div>
  <p><code>claude setup-token</code> mints a one-year OAuth token for <code>CLAUDE_CODE_OAUTH_TOKEN</code>. It bills your Pro, Max, Team, or Enterprise plan. But bare mode never reads OAuth credentials. With <code>--bare</code>, authenticate with <code>ANTHROPIC_API_KEY</code>. For a secret shared across repos, Anthropic also recommends a Console API key, because an OAuth token is tied to one person's subscription.</p>
</div>

<h2>2. The schema — the load-bearing part</h2>
<p>Without it you get an essay. With it you get something a pipeline can branch on. Save it as <code>ci/review-schema.json</code>:</p>

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
    }
  },
  "required": ["findings"]
}</code></pre>

<p>The result lands in the <code>structured_output</code> field. If a run ends without valid output, for example because Claude declined, that field is missing. The gate below treats that as a failure.</p>

<h2>3. The workflow</h2>
<pre><code>name: Claude review
on: pull_request

jobs:
  review:
    if: github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v6
        with: { fetch-depth: 0 }

      - name: Install Claude Code
        run: |
          curl -fsSL https://claude.ai/install.sh | bash
          echo "$HOME/.local/bin" >> "$GITHUB_PATH"

      - name: Review the diff
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/\${{ github.base_ref }}...HEAD |
            claude --bare -p "Review the diff on stdin against ci/review-rules.md.
                       Report every finding, including uncertain ones." \\
              --allowedTools "Read" \\
              --permission-mode dontAsk \\
              --max-budget-usd 2 \\
              --json-schema "$(cat ci/review-schema.json)" \\
              --output-format json > /tmp/result.json

      - name: Gate
        run: |
          jq -e '.structured_output' /tmp/result.json > /dev/null ||
            { echo "No structured output"; exit 1; }
          jq -r '.structured_output.findings[] |
                 "\\(.file):\\(.line) [\\(.severity)] \\(.rule) — \\(.why)"' /tmp/result.json
          jq -e '[.structured_output.findings[] | select(.severity == "high")] | length == 0' /tmp/result.json</code></pre>

<p>Piping the diff in means Claude needs no shell access to read it. Piped input is capped at 10MB. <code>--max-budget-usd</code> caps the spend per run; pick your own number.</p>

<div class="callout tip">
  <div class="c-head">💡 --bare is what makes this reproducible</div>
  <p>Without it, <code>claude -p</code> loads hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md, as an interactive session would. Worse, it runs a repo's <code>.claude/settings.json</code> hooks and <code>.mcp.json</code> servers with no trust prompt. On a PR branch, that is the PR author's config. <code>--bare</code> skips all of it; you load only what you pass. Anthropic calls it the recommended mode for scripted calls and plans to make it the default for <code>-p</code>. See <a href="#headless-ci">2.10</a>.</p>
</div>

<h2>4. The rules file</h2>
<p><code>ci/review-rules.md</code> holds the Salesforce-specific bar: SOQL and DML in loops, hardcoded IDs, missing null checks on SOQL results, missing <code>with sharing</code>, tests that assert nothing. Bare mode doesn't load CLAUDE.md, so the prompt names this file. Keep it in the repo so it gets reviewed in PRs like any other code.</p>

<div class="callout warn">
  <div class="c-head">⚠️ Ask for everything; filter afterwards</div>
  <p>Anthropic's prompting guide warns that a prompt saying "only report high-severity issues" or "be conservative" may be followed literally, and the model reports less. Ask for every finding with a severity, then filter in a separate step. Here that step is <code>jq</code>. Filtering is the pipeline's job, not a judgement call you hand to the model.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ A fork PR is code from a stranger</div>
  <p>This job feeds untrusted content to an agent holding your key. <code>--allowedTools "Read"</code> and <code>dontAsk</code> are the floor, not paranoia. On public repos, GitHub withholds secrets from fork-triggered runs, so the <code>if:</code> line skips forks instead of failing. <b>The author's advice:</b> don't switch to <code>pull_request_target</code> to get secrets into fork runs. Prefer printing findings over acting on them. Treat the diff as hostile input, because occasionally it is.</p>
</div>

<h2>What to steal</h2>
<ul>
  <li><b><code>--json-schema</code>.</b> The difference between a bot that talks and a check that gates.</li>
  <li><b><code>--bare</code> everywhere automated</b>, with an API key.</li>
  <li><b>Rules in the repo</b>, reviewed like code.</li>
  <li><b>Report everything, filter in the pipeline.</b> Don't delegate the severity bar.</li>
  <li><b>Minimum tools.</b> <code>Read</code> is usually all a reviewer needs.</li>
</ul>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/headless">Run Claude Code programmatically</a> — -p, --bare, --json-schema, structured_output, stdin cap</li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a> — claude setup-token, bare mode and OAuth</li>
    <li><a href="https://code.claude.com/docs/en/github-actions">Claude Code GitHub Actions</a> · <a href="https://code.claude.com/docs/en/gitlab-ci-cd">GitLab CI/CD</a></li>
    <li><a href="https://code.claude.com/docs/en/code-review">Code Review</a> — the managed service and how it compares</li>
    <li><a href="https://code.claude.com/docs/en/permissions">Configure permissions</a> — allowedTools, dontAsk</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5">Prompting Claude Opus 5</a> — report everything, filter in a separate pass</li>
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
<p class="lead">You want to know, once a month, what changed in Claude and whether it breaks anything you rely on. Here is the routine.</p>

<p>The pace is real. From 24 July to 21 October 2026, Anthropic released five new models. Opus 5.5 shipped with a lower default effort than Opus 5. A new API version started rejecting <code>temperature</code>. Any static understanding of this ecosystem decays in weeks.</p>

<h2>When to use it</h2>
<ul>
  <li><b>Monthly</b>, on a calendar reminder.</li>
  <li><b>Before you upgrade</b> an SDK major version or switch models.</li>
  <li><b>When Claude behaves differently</b> after an update and you want to know why.</li>
  <li><b>When a page here carries an old verified date.</b></li>
</ul>

<h2>Three feeds, and only three</h2>
<table class="doc">
<thead><tr><th>Feed</th><th>Covers</th><th>Read it</th></tr></thead>
<tbody>
<tr><td><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a></td><td>The Claude apps, Cowork, Claude Code, Claude in Chrome, model launches. <b>The best single feed.</b></td><td>Every sweep</td></tr>
<tr><td><a href="https://code.claude.com/docs/en/changelog">Claude Code changelog</a></td><td>The CLI. New versions ship most days.</td><td>Skim; search for what you use</td></tr>
<tr><td><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a></td><td>The retirement table. The one that breaks code.</td><td>Every sweep</td></tr>
</tbody>
</table>
<p>If you call the API directly, add the <a href="https://platform.claude.com/docs/en/release-notes/overview">Claude Platform release notes</a>. That is where new API versions and SDK major releases appear.</p>

<div class="callout tip">
  <div class="c-head">💡 Skip the newsletters</div>
  <p><b>The author's advice:</b> secondary coverage is where stale patterns come from. A post telling you to tune <code>temperature</code> reads exactly like a current one. The feeds above are primary sources and take about fifteen minutes a month.</p>
</div>

<h2>The monthly sweep</h2>
<p>About 20 minutes, in the author's experience:</p>
<ol>
  <li><b>Read the feeds</b> since your last sweep.</li>
  <li><b>Ask what changed for you.</b> Not everything matters. A new Chrome feature is noise if you don't use Chrome.</li>
  <li><b>Patch what's affected</b> and bump that page's verified date.</li>
  <li><b>After a model change, run <code>/doctor prompt-audit</code>.</b> It checks your CLAUDE.md, rules, skills, and subagents for instructions written for older models, missing files, and contradictions. It proposes edits and changes nothing until you say so.</li>
  <li><b>Check the expiry list</b> below.</li>
</ol>

<p>This is itself a Claude Code task. Put the feed URLs and a "what changed since last time" instruction in a <span class="jargon" data-term="skill">skill</span>. Run it with <code>/loop</code> while a session is open, or schedule it in the cloud with <code>/schedule</code> (cloud scheduled tasks, formerly routines).</p>

<h2>Known expiries</h2>
<p>Dated changes this site already knows about. Check them off as they pass:</p>
<table class="doc">
<thead><tr><th>Date</th><th>What</th><th>Affects</th></tr></thead>
<tbody>
<tr><td><b>2 Nov 2026</b></td><td>Salesforce DX MCP server (<code>@salesforce/mcp</code>) reaches end of life</td><td><a href="#recipe-impact">5.2</a>, <a href="#salesforce-setup">6.5</a></td></tr>
<tr><td><b>24 Nov 2026</b></td><td>Earliest possible retirement of <code>claude-opus-4-5-20251101</code> ("not sooner than")</td><td><a href="#stale-patterns">1.4</a></td></tr>
<tr><td><b>30 Nov 2026</b></td><td><code>claude-sonnet-4-5-20250929</code> <b>retires</b> → <code>claude-sonnet-5-5</code></td><td><a href="#lineup">1.1</a>, <a href="#stale-patterns">1.4</a></td></tr>
<tr><td><b>14 Dec 2026</b></td><td>Standalone Claude Design (claude.ai/design) closes and goes read-only</td><td><a href="#artifacts">4.2</a></td></tr>
<tr><td><b>Not set</b></td><td><code>claude-haiku-4-5-20251001</code>: its "not sooner than" date (15 Oct 2026) has passed; it is still Active</td><td><a href="#lineup">1.1</a></td></tr>
<tr><td><b>Not set</b></td><td><code>claude-mythos-preview</code>: deprecated, retirement date to be announced</td><td><a href="#lineup">1.1</a></td></tr>
</tbody>
</table>
<p>Anthropic gives at least 60 days' notice before retiring a publicly released model.</p>
<p><b>Already resolved:</b> Opus 4.7 left fast mode on 24 Jul 2026. Claude in Slack switched to Claude Tag on 3 Aug 2026 (see <a href="#ecosystem-map">0.2</a>). <code>claude-opus-4-1</code> retired on 5 Aug 2026. Sonnet 5's $2/$10 price is now standard; the planned rise to $3/$15 did not happen.</p>

<h2>What actually breaks you</h2>
<p>Not missing a feature. You'll find it eventually. What costs you is <b>confidently using something that changed</b>. The failure modes, worst first:</p>
<ol>
  <li><b>Silent degradation.</b> No error; you just get less. An Opus 5.5 request that omits <code>effort</code> runs at <code>medium</code>, one level below Opus 5's default. On Opus 4.6, <code>speed: "fast"</code> with the beta header succeeds but runs at standard speed; only <code>usage.speed</code> tells you.</li>
  <li><b>A 400 in production.</b> Opus 5.5 rejects disabled thinking, <code>budget_tokens</code>, and a prefilled assistant turn. API version <code>2026-10-21</code> rejects <code>temperature</code>, <code>top_p</code>, and <code>top_k</code>, even at default values. New SDK major versions send that API version by default, so an upgrade alone can trigger it.</li>
  <li><b>A retired model.</b> Requests to it fail. Loud, and the easiest to fix.</li>
</ol>
<p><a href="#stale-patterns">1.4 · Stale patterns</a> is the running list. It is the page most worth re-reading after a sweep.</p>

<h2>How this site defends itself</h2>
<p>Three mechanisms, all visible to you:</p>
<ul>
  <li><b>Every page is dated.</b> The badge is a claim about freshness you can hold this site to. An old date means trust it less. That's the contract.</li>
  <li><b>Every page cites official sources.</b> When this site and the docs disagree, the docs are right and this site has a bug.</li>
  <li><b>Scope is deliberately narrow.</b> No API reference, no enterprise admin, nothing in fast-moving beta. Those omissions exist so the rest can stay true. A complete map that is six months stale is worse than a partial one that is right.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ If a page's date is old, believe the date</div>
  <p>This site is one person's notes with a public URL. The verified badge is not a promise that a page is current. It is a precise statement about when someone last checked. That is the most honest thing an unofficial reference can offer.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Release notes</a> — the single feed to watch</li>
    <li><a href="https://code.claude.com/docs/en/changelog">Claude Code changelog</a> — Opus 4.7 removed from fast mode in v2.1.219</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/model-deprecations">Model deprecations</a> — retirement dates, 60-day notice, sampling parameters</li>
    <li><a href="https://platform.claude.com/docs/en/release-notes/overview">Claude Platform release notes</a> — API version 2026-10-21 and SDK majors</li>
    <li><a href="https://platform.claude.com/docs/en/api/migration-2026-10-21">Migrating to API version 2026-10-21</a></li>
    <li><a href="https://platform.claude.com/docs/en/models/opus-5-5/migration-guide">Claude Opus 5.5 migration guide</a> — settings that return 400</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/effort">Effort</a> — default levels per model</li>
    <li><a href="https://platform.claude.com/docs/en/build-with-claude/fast-mode">Fast mode</a> — supported models, the Opus 4.6 exception</li>
    <li><a href="https://platform.claude.com/docs/en/about-claude/pricing">Pricing</a> — Sonnet 5 price made standard</li>
    <li><a href="https://code.claude.com/docs/en/memory">How Claude remembers your project</a> — /doctor prompt-audit</li>
    <li><a href="https://code.claude.com/docs/en/commands">Commands</a> — /loop, /schedule</li>
    <li><a href="https://support.claude.com/en/articles/15594475-what-is-claude-tag">What is Claude Tag?</a> — the 3 Aug 2026 switch from Claude in Slack</li>
    <li><a href="https://support.claude.com/en/articles/17440474-move-from-standalone-claude-design-to-claude">Move from standalone Claude Design to Claude</a> — the 14 Dec 2026 closure</li>
    <li><a href="https://support.claude.com/en/articles/14503520-available-beta-and-research-preview-features">Available beta and research preview features</a></li>
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
<p class="lead">You want Claude to stop writing SOQL inside loops. Where does that instruction go: <code>CLAUDE.md</code>, a rule, a skill, or a hook? Pick wrong and it gets ignored, or it costs context on every request.</p>

<p>Claude Code gives you four places for instructions. Each has one job and its own cost. Get this right and most other habits follow.</p>

<h2>Two kinds of instruction</h2>
<p>Anthropic's best-practices page now splits every instruction into two kinds:</p>
<ul>
  <li><b>Claude decides.</b> Your prompt, <span class="jargon" data-term="claude-md">CLAUDE.md</span>, and <span class="jargon" data-term="skill">skills</span>. Claude usually follows them, but nothing guarantees it.</li>
  <li><b>Claude Code enforces.</b> <span class="jargon" data-term="hook">Hooks</span>, deny rules, and managed settings. The harness applies them every time, whatever the model decides.</li>
</ul>

<div class="callout tip">
  <div class="c-head">💡 Anthropic's own framing</div>
  <p>"Procedures belong in skills." CLAUDE.md holds facts Claude needs all the time. Keep it under 200 lines, give it an owner, and "review changes to it like code."</p>
</div>

<h2>Where each thing goes</h2>
<table class="doc">
<thead><tr><th>Layer</th><th>For</th><th>Context cost</th></tr></thead>
<tbody>
<tr>
  <td><b><code>CLAUDE.md</code></b></td>
  <td><b>Facts Claude can't find in the repo.</b> Test and lint commands. Misleading code to avoid copying. Team decisions. Anything you've corrected twice. The root file should be "pointers and critical gotchas only."</td>
  <td>Loaded every session. Every line takes a little attention on every task.</td>
</tr>
<tr>
  <td><b><code>.claude/rules/</code></b><br><small>with a <code>paths</code> glob</small></td>
  <td><b>Constraints for part of the codebase.</b> Apex rules that load only when Claude touches Apex.</td>
  <td>Nothing until Claude reads, writes, or edits a matching file. Rules without <code>paths</code> load at launch.</td>
</tr>
<tr>
  <td><b>Skills</b></td>
  <td><b>Procedures.</b> Anything with steps: a release, a runbook, a review checklist.</td>
  <td>Name and description every session. The full file only when the task needs it.</td>
</tr>
<tr>
  <td><b>Hooks and deny rules</b></td>
  <td><b>Enforcement.</b> Things that must always (or never) happen.</td>
  <td>None. The harness runs them, not the model.</td>
</tr>
</tbody>
</table>

<div class="mermaid">
flowchart TD
  A["New instruction"] --> B{"Must it hold every time, no exceptions?"}
  B -- Yes --> H["Hook or deny rule"]
  B -- No --> C{"Is it a procedure with steps?"}
  C -- Yes --> S["Skill"]
  C -- No --> D{"Does it matter only for some files?"}
  D -- Yes --> R["Rule with a paths glob"]
  D -- No --> E{"Can Claude find it by reading the repo?"}
  E -- Yes --> X["Leave it out"]
  E -- No --> M["CLAUDE.md"]
</div>
<p class="diagram-caption">Ask the questions in this order. Most instructions end up somewhere other than CLAUDE.md.</p>

<div class="callout tip">
  <div class="c-head">💡 Already have an AGENTS.md?</div>
  <p>Claude Code reads <code>AGENTS.md</code> as project instructions (v2.1.277 or later). You don't need a separate <code>CLAUDE.md</code> for a repo already set up for other coding agents.</p>
</div>

<h2>So: no SOQL in loops?</h2>
<p>Not <code>CLAUDE.md</code>. It isn't true of every task, and it would compete for attention on every turn. Options, weakest to strongest:</p>
<ol>
  <li><b>A path-scoped rule.</b> Free until relevant. Start here.
<pre>---
paths:
  - "force-app/**/*.cls"
---
- Never put SOQL or DML inside a loop. Query once, then use a Map.</pre></li>
  <li><b>A static check run by a hook.</b> Run a PMD rule after every edit (a <code>PostToolUse</code> hook) or before Claude can finish (a <code>Stop</code> hook). Now it is enforced, not requested.</li>
  <li><b>The Salesforce Development plugin's gates.</b> It adds an Apex pre-deploy diagnostics check on <code>sf project deploy</code>. See <a href="#salesforce-setup">6.5</a>.</li>
</ol>

<div class="callout tip">
  <div class="c-head">💡 Never send an LLM to do a linter's job</div>
  <p>Community practice, and the author's strong view. A linter is deterministic, nearly free, and can't be argued with. An instruction is a suggestion competing for attention. If a linter can catch it, put it there.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>"Run one test with <code>npm run test:unit -- path</code>."</b> Claude can't guess this. Put it in <code>CLAUDE.md</code>.</li>
  <li><b>"API handlers must validate with our zod schemas."</b> Only matters in <code>src/api/</code>. Use a rule with <code>paths</code>.</li>
  <li><b>"How we cut a release."</b> Ten steps with side effects. Make it a skill, with <code>disable-model-invocation: true</code> so only you can start it.</li>
  <li><b>"Never read <code>.env</code>."</b> No exceptions allowed. Use a deny rule. Deny rules hold in every permission mode, including auto.</li>
</ul>

<h2>The compaction trap</h2>
<p>Scoping rules to paths has a hidden cost. When <span class="jargon" data-term="compaction">compaction</span> runs:</p>
<table class="doc">
<thead><tr><th>After compaction</th><th>What</th></tr></thead>
<tbody>
<tr><td><b>Re-injected from disk</b></td><td>Project-root <code>CLAUDE.md</code>, unscoped rules, auto <span class="jargon" data-term="memory">memory</span>, skill descriptions, the plan from plan mode</td></tr>
<tr><td><b>Gone until a matching file is touched again</b></td><td>Rules with a <code>paths</code> glob, nested <code>CLAUDE.md</code> files in subdirectories</td></tr>
<tr><td><b>Re-injected, but capped</b></td><td>Skills already invoked: 5,000 tokens each, 25,000 in total, oldest dropped first</td></tr>
</tbody>
</table>
<p>So a rule that must hold for a whole long session, such as a security constraint, should not be path-scoped. Drop the glob or move it to the root <code>CLAUDE.md</code>. And put a skill's most important steps near the top of <code>SKILL.md</code>, because truncation keeps the start.</p>

<h2>The 200-line number, honestly</h2>
<p>Anthropic's memory docs say to target under 200 lines per <code>CLAUDE.md</code>: longer files cost more context and reduce adherence. Follow it. <i>The author's caveat:</i> the wider "keep it short" consensus rests on little published evidence beyond that figure. Treat 200 as a strong default, not physics. The real test is on the <a href="#claude-md-ignored">next page</a>.</p>
<p>Three commands help you prune:</p>
<ul>
  <li><b><code>/doctor</code></b> suggests cuts for anything Claude can already work out from the code.</li>
  <li><b><code>/doctor prompt-audit</code></b> flags instructions written for older models, paths that no longer exist, and files that contradict each other. It proposes edits and changes nothing until you agree.</li>
  <li><b><code>/skill-doctor</code></b> shows which skills go unused and what they cost in context.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Stop shouting in your instruction files</div>
  <p>"IMPORTANT", "YOU MUST", and ALL CAPS are now on Anthropic's list of advice to stop following. Current models follow a plainly worded line. Extra emphasis mostly makes Claude over-apply the rule.</p>
  <p>If a line keeps getting missed, either the file is too long or the rule can't have exceptions. Shorten the file, or move the rule to a hook.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a>: deterministic vs non-deterministic instructions, what belongs in CLAUDE.md, emphasis as old advice</li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a>: rules and <code>paths</code>, the 200-line target, AGENTS.md, <code>/doctor prompt-audit</code></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Explore the context window</a>: what survives compaction</li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide</a>: enforcing steps with hooks</li>
    <li><a href="https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more">Steering Claude Code</a> (18 Jun 2026): facts vs procedures, owning CLAUDE.md</li>
    <li><a href="https://claude.com/resources/articles/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start">Claude Code in large codebases</a> (14 May 2026): "lean and layered" CLAUDE.md files</li>
    <li><a href="https://code.claude.com/docs/en/changelog">Changelog</a>: <code>/skill-doctor</code></li>
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
<p class="lead">You wrote the rule. It's right there in <code>CLAUDE.md</code>. Claude ignored it anyway, and it will do it again tomorrow.</p>

<p>This is the most repeated complaint about Claude Code. It is not a bug, and you are not bad at writing instructions. There is a mechanism.</p>

<h2>The mechanism</h2>
<p>Anthropic's memory docs now state it plainly: <code>CLAUDE.md</code> content is delivered as a <b>user message after the system prompt</b>, not as part of the system prompt. Claude reads it and tries to follow it. There is no guarantee of strict compliance, especially for vague or conflicting instructions.</p>
<p>The best-practices page puts it more bluntly. <code>CLAUDE.md</code> is for guidelines, and "Claude is allowed to decide a guideline doesn't apply."</p>

<div class="callout tip">
  <div class="c-head">💡 The wrapper, from community research</div>
  <p>In November 2025, HumanLayer ran a logging proxy between Claude Code and the API. They saw CLAUDE.md wrapped in a <span class="jargon" data-term="system-reminder">system reminder</span> that began: <i>"IMPORTANT: this context may or may not be relevant to your tasks."</i></p>
  <p>This is <b>not official documentation</b>, and the exact wording may have changed since. The official docs confirm the effect, not the text.</p>
</div>

<p>That is the whole story. If you need a guarantee, you need a <span class="jargon" data-term="hook">hook</span> or a deny rule.</p>

<h2>What predicts whether a rule sticks</h2>
<p>This taxonomy comes from practitioners. Anthropic's own list of what belongs in CLAUDE.md now matches the first two rows.</p>
<table class="doc">
<thead><tr><th>Kind of instruction</th><th>Does it work?</th></tr></thead>
<tbody>
<tr>
  <td><b>Facts</b><br><small>"Run one test file with <code>pnpm vitest run path</code>"</small></td>
  <td><b>Reliably.</b> Claude can't guess these and has no competing instinct.</td>
</tr>
<tr>
  <td><b>Regression constraints</b><br><small>Tied to a failure you actually saw. One sentence each.</small></td>
  <td><b>Consistently,</b> if short and specific. Anthropic: add "anything you've had to correct twice already."</td>
</tr>
<tr>
  <td><b>Behaviour rules from scratch</b><br><small>Written for a problem you haven't had yet</small></td>
  <td><b>Often not followed.</b></td>
</tr>
</tbody>
</table>

<p>That last row is why the "does CLAUDE.md even work?" argument never ends. People who fill it with commands say it works. People who fill it with style wishes say it's useless. Both are right.</p>

<h2>Why your style rule loses</h2>
<p>Claude reads your code before it acts, and current models are very good at picking up conventions from it. Thousands of lines of existing style outweigh one bullet point. One developer asked Claude why it kept ignoring his formatting rule. Its answer: the surrounding code looked that way, so it followed that.</p>
<p>Anthropic now lists "describe your architecture and file layout in CLAUDE.md" as advice to stop following. Claude reads the repo itself. To change a style, change the code or add a check, not the prose. See <a href="#four-layers">6.1</a>.</p>

<h2>How to write rules that stick</h2>
<ul>
  <li><b>Make it concrete and checkable.</b> "Use 2-space indentation" beats "format code nicely". "Run <code>npm test</code> before committing" beats "test your changes".</li>
  <li><b>Remove contradictions.</b> If two instructions conflict, Claude may pick one arbitrarily. Conflicts hide across user, project, nested, and rule files. <code>/doctor prompt-audit</code> finds them.</li>
  <li><b>Write from observed failures,</b> not imagined ones. If it hasn't gone wrong yet, you're guessing.</li>
  <li><b>Cut what Claude can find itself.</b> Anthropic's test: could Claude find this by reading the code, and would it actually look? If both are yes, leave it out.</li>
  <li><b>Check for built-in competition.</b> Claude Code has its own commit and PR guidance. If your CLAUDE.md sets commit rules, turn the built-in ones off with <code>includeGitInstructions</code>.</li>
  <li><b>Phrase positively.</b> Community practice: "always confirm intent before acting" beats "never act without checking". Naming the unwanted action can prime it.</li>
</ul>

<h2>When to use it</h2>
<ul>
  <li><b>Keep it in CLAUDE.md</b> when Claude can't find it in the repo: "Integration tests need <code>DATABASE_URL</code> set."</li>
  <li><b>Move it to a hook</b> when you keep adding emphasis and Claude still misses it. Anthropic calls that the sign.</li>
  <li><b>Delete the hook</b> when it only enforces a preference with exceptions, such as "prefer named exports". Let Claude decide.</li>
  <li><b>Move it to a skill</b> when it is a multi-step procedure that only some tasks need.</li>
</ul>

<h2>Debug a rule that isn't loading</h2>
<ul>
  <li><b><code>/context</code></b> lists the memory files loaded at launch. If a file is missing there, Claude can't see it.</li>
  <li><b>Subdirectory files load on demand.</b> A nested <code>CLAUDE.md</code> appears only after Claude touches a file in that folder.</li>
  <li><b>An <code>InstructionsLoaded</code> hook</b> logs which files and rules loaded, when, and why.</li>
  <li><b><code>/memory</code></b> opens the files so you can edit them.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ The canary trick doesn't prove what you think</div>
  <p>A popular tip: put "always call me Mr Tinkleberry" in CLAUDE.md. If Claude uses the name, it read the file. <i>The author's view:</i> this proves loading, not compliance. Claude can greet you correctly while ignoring every rule that matters. Use <code>/context</code> to check loading instead.</p>
</div>

<div class="callout tip">
  <div class="c-head">💡 The honest summary</div>
  <p>CLAUDE.md is a <b>reliable place for facts</b> and an <b>unreliable place for behaviour</b>. Put commands and gotchas in it. Put procedures in skills, scoped constraints in rules, and anything that must not fail in a hook or deny rule. Claude treats the file as context, not configuration.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a>: delivered as a user message, conflicting instructions, troubleshooting, <code>/doctor prompt-audit</code></li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a>: guidelines vs enforcement, the "could it find this?" test, what to stop doing</li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide</a>: deterministic control</li>
    <li><a href="https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more">Steering Claude Code</a></li>
  </ul>
  <h3>Community research (labelled, not official)</h3>
  <ul>
    <li><a href="https://www.humanlayer.dev/blog/writing-a-good-claude-md">Writing a good CLAUDE.md</a>: HumanLayer, 25 Nov 2025. The system-reminder wording, found by proxying the API.</li>
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
<p class="lead">Two engineers give Claude the same task. One gets a working fix in ten minutes. The other spends an hour correcting and re-explaining. The difference is rarely the prompt. It is the loop around it.</p>

<h2>1. Give Claude a check to run</h2>
<p>Anthropic's framing: "Claude stops when the work looks done." Without a check, looking done is all it has. In practice that makes <b>you</b> the test suite, and every mistake waits for you to notice it.</p>
<p>Give it something that returns pass or fail, and Claude closes the loop itself. A test file, a build exit code, a linter, a script that diffs against a fixture, or a browser screenshot next to the mockup.</p>

<table class="doc">
<thead><tr><th>Instead of</th><th>Say</th></tr></thead>
<tbody>
<tr><td><i>"add validation to the Account trigger"</i></td><td><i>"add validation to the Account trigger. Write a failing test for a blank BillingCountry first, then make it pass. Run <code>sf apex run test</code> and show me the output."</i></td></tr>
<tr><td><i>"the deploy is failing"</i></td><td><i>"the deploy fails with this error: [paste]. Fix the root cause, don't suppress it, and verify with a <code>--dry-run</code> deploy."</i></td></tr>
</tbody>
</table>

<p>Then decide how hard the check gates. Weakest to strongest:</p>
<ol>
  <li><b>In the prompt.</b> "Run the auth tests and keep going until they pass." No setup.</li>
  <li><b>As a goal.</b> <code>/goal all tests in tests/auth pass</code>. After every turn, a separate small model checks the condition. Claude keeps going until it holds. <code>/goal clear</code> stops it.</li>
  <li><b>As a <code>Stop</code> <span class="jargon" data-term="hook">hook</span>.</b> Your script runs whenever Claude tries to finish. Exit code 2 sends it back to work. After eight blocks in a row with no tool call, Claude Code ends the turn anyway (raise the cap with <code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP</code>).</li>
  <li><b>By a reviewer who didn't write it.</b> <code>/code-review</code> reviews the diff in a fresh <span class="jargon" data-term="subagent">subagent</span> that never saw your conversation.</li>
</ol>
<p>Whichever you use, ask for <b>evidence, not assertion</b>. "Tests pass" is a claim. The pasted output is a fact. After Claude says it's done, <code>/verify</code> has it build, run, and look at the app.</p>

<h2>2. Spec or plan first, when the approach is unclear</h2>
<ul>
  <li><b>Let Claude interview you.</b> "Interview me until you could write the spec, then write it to SPEC.md." Then start a fresh session to build from it.</li>
  <li><b>Use <span class="jargon" data-term="plan-mode">plan mode</span> for complex changes.</b> Press <code>Shift+Tab</code>. Claude explores and proposes an approach before editing. Anthropic recommends it to avoid expensive rework.</li>
  <li><b>Say "be ambitious" when you want the full version.</b> Claude tends to build the smallest thing that satisfies a request. This phrase tells it the scope you want.</li>
</ul>
<p><i>The author's view:</i> skip planning for anything whose diff you could describe in one sentence, such as a typo, a log line, or a rename.</p>

<h2>3. Steer early, and know when to restart</h2>
<table class="doc">
<thead><tr><th>Control</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>Esc</code></td><td>Stops Claude mid-action. Keeps everything so far, so you can redirect.</td></tr>
<tr><td><code>Esc Esc</code> (empty prompt) or <code>/rewind</code></td><td>Opens the rewind menu. Roll back code, conversation, or both. Or summarize part of the conversation.</td></tr>
<tr><td><code>/clear</code></td><td>Starts over. <code>/clear oauth-migration</code> names the session you're leaving, so you can return.</td></tr>
<tr><td><code>/rename</code> + <code>claude --resume name</code></td><td>Picks up multi-day work later, checkpoints included.</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 The two-correction rule</div>
  <p>Straight from Anthropic: if you've corrected the same thing twice and it's still wrong, don't try a third time. The conversation now holds two failed attempts for Claude to keep re-reading. <code>/clear</code>, then write one new prompt that folds in what you learned. Anthropic says this works better almost every time.</p>
  <p>This is the highest-value habit on this page.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ Checkpoints don't cover everything</div>
  <p><code>/rewind</code> restores files Claude edited with its file tools. A file that <b>only</b> a shell command changed is not restored. If Claude ran <code>rm</code> or <code>mv</code> on it, rewind can't help. Most subagent edits aren't restored either. Git is your durable history. <code>/rewind</code> is in-session undo.</p>
</div>

<h2>4. Spend context on purpose</h2>
<p>Most current models have a 1M-token window, and compaction runs on its own. Running out is now rare. But every request re-sends the whole conversation, so stale context still costs money and focus.</p>
<ul>
  <li><b><code>/clear</code> between unrelated tasks.</b> It costs nothing.</li>
  <li><b><code>/compact keep the API changes and the test commands</code>.</b> Steering beats letting it guess. On a long session, compacting is itself a big request.</li>
  <li><b><code>/btw</code></b> for side questions. The answer appears in an overlay and never enters the conversation history.</li>
  <li><b><code>/context</code></b> shows what is filling the window.</li>
  <li><b>Tell compaction what to keep</b> with a "Compact instructions" section in CLAUDE.md, such as "focus on test output and code changes".</li>
  <li><b>Mind the cache.</b> The prompt cache lasts about an hour on a subscription and five minutes on an API key. Coming back after it expires means paying full price for the history.</li>
</ul>

<h2>When to use it</h2>
<ul>
  <li><b>Fixing a bug with a known symptom:</b> ask for a failing test first, then the fix, then the test output.</li>
  <li><b>A long unattended migration:</b> set a <code>/goal</code> with a measurable end state, or add a <code>Stop</code> hook that runs the type check.</li>
  <li><b>A feature you haven't thought through:</b> have Claude interview you into a SPEC.md, then build in a fresh session.</li>
  <li><b>Claude is going in circles:</b> two corrections, then <code>/clear</code> and a better prompt.</li>
</ul>

<h2>What the data says separates people</h2>
<p>Anthropic's study (published 16 June 2026) covered about 400,000 sessions from about 235,000 people, October 2025 to April 2026. Expert sessions averaged about <b>12 Claude actions per prompt versus 5</b> for novices, and about 3,200 words back versus 600. Verified success was about <b>15% for novices and 28–33%</b> for intermediate users and above. When trouble hit, 19% of novice sessions were abandoned, versus 5–7% for everyone else.</p>

<div class="callout tip">
  <div class="c-head">💡 The finding that should encourage you</div>
  <p><b>Domain expertise predicts success.</b> The more a person knows about the domain, the more often the session succeeds. Years of knowing what breaks in a Salesforce org <i>is</i> the differentiator. Claude supplies throughput. You supply the judgement about what "correct" means.</p>
  <p>Also useful: the novice-to-intermediate gap is <b>bigger</b> than the intermediate-to-expert gap. The habits on this page are where the returns are.</p>
</div>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a>: checks to run, gating options, steering, the two-correction rule, cost and context</li>
    <li><a href="https://code.claude.com/docs/en/goal">/goal</a>: how evaluation works</li>
    <li><a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a>: the rewind menu and its limits</li>
    <li><a href="https://code.claude.com/docs/en/interactive-mode">Interactive mode</a>: <code>/btw</code> side questions</li>
    <li><a href="https://code.claude.com/docs/en/costs">Manage costs</a>: plan mode, compact instructions</li>
    <li><a href="https://www.anthropic.com/research/claude-code-expertise">How Claude Code is used in practice</a> (16 Jun 2026): the 400,000-session study</li>
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
<p class="lead">You want five Claude sessions working at once. That sounds like five times the output. In practice, most people who try it settle on fewer.</p>

<p>Parallel work pays off, but only for some shapes of work. The ceiling is lower than the marketing suggests. This page is the honest version.</p>

<h2>The built-in options</h2>
<table class="doc">
<thead><tr><th>Option</th><th>What it is</th><th>Use it when</th></tr></thead>
<tbody>
<tr>
  <td><b><span class="jargon" data-term="subagent">Subagents</span></b></td>
  <td>Workers Claude spawns inside one session. Claude delegates on its own. They run in the background by default.</td>
  <td>A wide search, a noisy test run, or a reviewer that can read but not edit.</td>
</tr>
<tr>
  <td><b><span class="jargon" data-term="worktree">Worktrees</span></b><br><small><code>claude -w name</code></small></td>
  <td>A separate checkout and branch per session, so edits can't collide.</td>
  <td>You run a feature in one terminal and a bug fix in another.</td>
</tr>
<tr>
  <td><b><code>/batch</code></b></td>
  <td>Splits one big mechanical change into 5–30 units. Each runs in its own worktree and opens its own PR.</td>
  <td>"Migrate every handler to the v2 response helpers."</td>
</tr>
<tr>
  <td><b><span class="jargon" data-term="agent-team">Agent teams</span></b><br><small>experimental, off by default</small></td>
  <td>A lead session plus teammates that message each other and share a task list.</td>
  <td>Parallel review with different lenses, or debugging with competing theories.</td>
</tr>
<tr>
  <td><b><span class="jargon" data-term="dynamic-workflow">Dynamic workflows</span></b></td>
  <td>A script Claude writes that runs dozens to hundreds of subagents. Start one with the word <code>ultracode</code> or "use a workflow".</td>
  <td>A codebase-wide audit, a 500-file migration, or <code>/deep-research</code>.</td>
</tr>
<tr>
  <td><b>Projects in Claude Code</b><br><small>public beta, Pro and Max</small></td>
  <td>One ongoing conversation that runs each task as a parallel cloud thread.</td>
  <td>A stream of related tasks you want to hand off and check from your phone.</td>
</tr>
</tbody>
</table>

<h2>Reads parallelise. Writes need owners.</h2>
<p>The most durable insight here: <b>read-heavy work parallelises easily; write-heavy work doesn't.</b> Three agents searching a codebase can't corrupt each other. Three agents editing the same files, each unaware of the others, produce work you must reconcile.</p>

<div class="callout tip">
  <div class="c-head">💡 Anthropic's own design reflects this</div>
  <p>Two of the main built-in subagents, <code>Explore</code> and <code>Plan</code>, are read-only. The agent-teams docs say to start with research and review, and warn that two teammates editing one file leads to overwrites. Workflows that edit many files give each file its own isolated copy.</p>
</div>

<p>So parallel writes work only when each worker owns separate files. Investigation is the safe default: <i>"use subagents to find every place we reference this field."</i></p>

<h2>The number is three to five</h2>
<p>The agent-teams docs say to start with 3–5 teammates for most workflows, and add: <b>"Three focused teammates often outperform five scattered ones."</b> Token cost scales with team size. Anthropic's cost page puts agent teams at about 7× the tokens of a standard session when teammates run in plan mode.</p>
<p>Workflows have a size guideline too. By default Claude aims for fewer than 10 agents (fewer than 5 on Pro). Change it with <code>workflowSizeGuideline</code> in <code>/config</code>.</p>

<h2>Worktrees fix files, not infrastructure</h2>
<p>Worktrees isolate file edits. A worktree is a fresh checkout, so gitignored files like <code>.env</code> are missing. List the ones you need in <code>.worktreeinclude</code> and Claude Code copies them in.</p>

<div class="callout warn">
  <div class="c-head">⚠️ They don't isolate shared services</div>
  <p><i>The author's view, from community failure reports.</i> Ports, databases, migrations, test data, and caches are still shared. If session A runs a migration, session B can break. Worktrees are near-free for <b>stateless</b> work (libraries, pure logic, docs) and painful for <b>stateful</b> app work.</p>
  <p>For Salesforce this matters more than most stacks. Your sandbox is shared state. Two sessions deploying to the same org is not parallelism. It's a race.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>"Find every caller of this method":</b> let Claude send it to Explore. Read-only and safe.</li>
  <li><b>A feature and an unrelated hotfix:</b> two worktree sessions, each with its own branch.</li>
  <li><b>The same change across 200 files:</b> <code>/batch</code> or a workflow, with one file per worker.</li>
  <li><b>A security, performance, and test review of one PR:</b> three reviewers with different lenses, as subagents or a team.</li>
</ul>

<h2>The real bottleneck is you</h2>
<p>The most consistent report from people who push parallelism hard is not that Claude fails. It is that <b>they run out of review capacity</b>. One well-known practitioner describes being wiped out by 11am after running four agents.</p>
<p>Reviewing code you didn't write is harder than reviewing your own. You first reconstruct what the author meant, then judge whether they did it. Four agents produce four of those.</p>

<div class="callout tip">
  <div class="c-head">💡 The honest reframe</div>
  <p><i>The author's view.</i> Parallelism doesn't make you faster at your job. It <b>changes your job</b>, from author to editor. Some people find that a better use of their expertise. Many find it exhausting. Know which you are before you build a workflow around it.</p>
  <p>It is a <b>multiplier on existing discipline</b>, not a substitute. Every credible success story rests on a real test suite, written architecture, and clean task boundaries.</p>
</div>

<h2>The independent review step</h2>
<p>Before calling unattended work done, have a reviewer check the diff in fresh context. It sees the change and your criteria, not the reasoning that produced it. <code>/code-review</code> does this. A custom reviewer with only <code>tools: Read, Grep, Glob</code> can't edit anything, and Claude Code enforces that.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The reviewer trap</div>
  <p>Anthropic's caveat: a reviewer asked to find problems "will always find <i>something</i>." Fix every finding and you get extra abstraction layers and tests for cases that can't happen.</p>
  <p>Tell the reviewer to report only gaps that affect correctness or the spec, and to skip style.</p>
</div>

<h2>Before you reach for a third-party orchestrator</h2>
<p><i>The author's view.</i> Many tools were built to bolt parallelism onto Claude Code. Most of what they offered is now built in: worktrees, background subagents, <code>/batch</code>, agent teams, workflows, and cloud sessions. <b>Try the built-ins first.</b> If you still want a third-party tool, check its last commit date and real download numbers. Star counts in this space say little about use.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://code.claude.com/docs/en/agents">Run agents in parallel</a>: comparing the options</li>
    <li><a href="https://code.claude.com/docs/en/sub-agents">Subagents</a>: built-in read-only Explore and Plan, background default, limits</li>
    <li><a href="https://code.claude.com/docs/en/worktrees">Worktrees</a>: <code>--worktree</code>, <code>.worktreeinclude</code>, what worktrees share</li>
    <li><a href="https://code.claude.com/docs/en/agent-teams">Agent teams</a>: experimental status, 3–5 teammates, file conflicts</li>
    <li><a href="https://code.claude.com/docs/en/workflows">Dynamic workflows</a>: ultracode, size guideline, limits</li>
    <li><a href="https://code.claude.com/docs/en/claude-projects">Projects in Claude Code</a>: public beta</li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a>: <code>/batch</code>, the reviewer caveat, read-only reviewers</li>
    <li><a href="https://code.claude.com/docs/en/costs">Manage costs</a>: agent team token costs</li>
    <li><a href="https://www.anthropic.com/research/building-c-compiler">Building a C compiler with a team of parallel Claudes</a> (5 Feb 2026): 16 agents, and an honest account of what broke</li>
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
<p class="lead">You want Claude Code to build, test, and deploy Apex and LWC in your org without breaking production. Salesforce now ships an official Claude Code plugin for exactly this. Set it up before anything else.</p>

<h2>What exists today</h2>
<table class="doc">
<thead><tr><th>What</th><th>Gives you</th></tr></thead>
<tbody>
<tr>
  <td><b>Salesforce Development plugin</b><br><small>by Salesforce, listed in Anthropic's official plugin marketplace</small></td>
  <td>Auto-detects a Salesforce DX project and adds org context. Uses <span class="jargon" data-term="skill">skills</span> first, the Salesforce CLI second, and Salesforce-hosted <span class="jargon" data-term="mcp">MCP</span> servers last. Its <span class="jargon" data-term="hook">hooks</span> include a production deploy-safety gate and an Apex pre-deploy diagnostics gate on <code>sf project deploy</code>. Also runs local Apex and SOQL language servers.</td>
</tr>
<tr>
  <td><b><code>forcedotcom/sf-skills</code></b><br><small>Salesforce, Apache-2.0</small></td>
  <td>The skills library behind the plugin: more than 250 skills for Apex, LWC, Flow, SOQL, Agentforce, permission sets, and more. Optimised for Agentforce Vibes. Works with any tool that supports skills.</td>
</tr>
<tr>
  <td><b>Salesforce in Claude</b><br><small>beta since 15 Sep 2026</small></td>
  <td>A different product, for sellers in the Claude app. 37 sales skills over accounts, opportunities, and pipeline. Paid plans, for orgs Salesforce approves. Not a development tool.</td>
</tr>
</tbody>
</table>

<h3>Install</h3>
<p>You need the Salesforce CLI and Python 3.8 or later. Authorise your org with the CLI first. Then, in Claude Code:</p>
<pre>/plugin install salesforce-development@claude-plugins-official</pre>
<p>For standalone skills in another tool: <code>npx skills add forcedotcom/sf-skills</code>.</p>
<p>The plugin's MCP servers use <code>SF_TARGET_ORG</code>, or the project's own <code>target-org</code>. They refuse to start when neither names an org. That is a good default. Respect it rather than working around it.</p>

<div class="callout warn">
  <div class="c-head">⚠️ The DX MCP Server reaches end of life on 2 November 2026</div>
  <p>The local Salesforce DX MCP Server (<code>@salesforce/mcp</code>, repo <code>salesforcecli/mcp</code>) is no longer maintained after that date. Its repositories will be archived. The npm package stays installable, so pinned setups keep working, but nothing new ships.</p>
  <p>Salesforce's guidance: <b>use skills instead.</b> If you set up the DX MCP Server from an earlier version of this page, move to the plugin.</p>
</div>

<div class="callout warn">
  <div class="c-head">⚠️ sf-skills has no stability guarantee</div>
  <p>Salesforce's own warning: "Expect frequent changes." Skills and plugins may be renamed, restructured, or removed between releases. They don't follow GA API stability guarantees. Don't hard-code skill names into your own tooling, and re-check after upgrades.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>You work in an SFDX repo in Claude Code:</b> install the plugin. You get skills, org context, and deploy gates together.</li>
  <li><b>You use Cursor, Codex, or another agent:</b> install the standalone skills with <code>npx skills add</code>.</li>
  <li><b>Your sales team wants pipeline help in chat:</b> that's Salesforce in Claude, not the developer plugin.</li>
  <li><b>You still run the DX MCP Server:</b> plan the move now. Keep it pinned only until you've switched.</li>
</ul>

<h2>The honest picture of quality</h2>
<p><i>The author's view.</i> Models already know Apex, LWC, and SOQL as languages. Producing code that respects <i>your</i> org's limits, metadata, and conventions is a different problem. Skills and validators close much of that gap, not all of it. Treat generated metadata, especially Flow XML, as something to validate with a dry-run deploy before you trust it.</p>

<h2>What nobody has measured</h2>
<div class="callout tip">
  <div class="c-head">💡 The most useful thing on this page</div>
  <p>As of this page's verified date, the author found <b>no published independent evaluation</b> of three things you care most about:</p>
  <ul>
    <li><b>LWC Jest test quality.</b> Are the tests meaningful?</li>
    <li><b>Apex test assertion quality.</b> Do they prove behaviour, or pad coverage?</li>
    <li><b>Governor limits in practice.</b> Sources assert Claude respects them. None shows failure cases.</li>
  </ul>
  <p>Treat generated tests as drafts to review, not coverage you've earned.</p>
</div>

<h2>Claims to distrust</h2>
<p><i>The author's assessment.</i> The Salesforce-plus-AI content farm is unusually bad:</p>
<ul>
  <li><b>"85% of Claude's Apex compiles first try vs ChatGPT's 60%."</b> Repeated across vendor blogs with no primary source.</li>
  <li><b>"Automatically achieves 75%+ coverage."</b> 75% is Salesforce's deployment floor, and Salesforce's own guidance says not to focus on the percentage. Quoting it as an achievement is a red flag.</li>
  <li><b>"MCP is read-only for Salesforce."</b> Wrong. Even the DX MCP Server shipped GA tools to deploy metadata and run Apex tests.</li>
  <li><b>"40–60% faster", "2–3× faster Flow builds".</b> Vendor self-benchmarks with no method.</li>
</ul>

<h2>Why it feels like nobody does this</h2>
<p><i>The author's view.</i> Because they don't blog about it. Salesforce practice circulates in Trailblazer groups and consultancy channels, not on Hacker News. There is real use, but no public playbook to copy. The recipes in <a href="#recipe-lwc">Part 5</a> are a starting point. Your own <code>.claude/rules/</code> will be worth more than anything you find online.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://github.com/forcedotcom/sf-skills">forcedotcom/sf-skills</a>: Salesforce's skills and plugins library (Apache-2.0), stability warning</li>
    <li><a href="https://github.com/forcedotcom/sf-skills/tree/main/plugins/builder/salesforce-development">Salesforce Development plugin</a>: install, hooks, MCP servers, target org</li>
    <li><a href="https://github.com/forcedotcom/mcp/issues/46">DX MCP Server end of life</a>: 2 Nov 2026, "use skills instead"</li>
    <li><a href="https://github.com/salesforcecli/mcp">salesforcecli/mcp</a>: the DX MCP Server and its tool list</li>
    <li><a href="https://support.claude.com/en/articles/12138966-release-notes">Claude release notes</a>: Salesforce in Claude (beta), 15 Sep 2026</li>
    <li><a href="https://code.claude.com/docs/en/discover-plugins">Discover plugins</a>: installing from marketplaces</li>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a></li>
  </ul>
  <p><small>Salesforce tooling is cited from Salesforce's own repositories: the first-party source for those products, the same principle as citing Anthropic for Claude.</small></p>
</div>
`
      },

      {
        id: "wastes-time",
        num: "6.6",
        title: "What wastes your time",
        html: `
${VERIFIED}
<p class="lead">You want to stop losing hours to slow sessions, stale tips, and surprise limits. Most of that time goes to a handful of known traps.</p>

<h2>When Claude feels worse, check the harness first</h2>
<p>In April 2026 Anthropic published a postmortem. It confirmed real quality drops in Claude Code, the Agent SDK, and Cowork between 4 March and 20 April 2026. Three separate changes caused them:</p>
<table class="doc">
<thead><tr><th>Cause</th><th>Live</th></tr></thead>
<tbody>
<tr><td>Default <span class="jargon" data-term="effort">effort</span> lowered from <b>high to medium</b> to cut latency. Anthropic: "This was the wrong tradeoff."</td><td>4 Mar – 7 Apr</td></tr>
<tr><td>A <b>caching bug</b> cleared old thinking on every turn instead of once. Claude seemed forgetful and repetitive, and burned usage faster.</td><td>26 Mar – 10 Apr</td></tr>
<tr><td>A system prompt line to cut verbosity caused a measured <b>3% drop</b> on one broad evaluation.</td><td>16 Apr – 20 Apr</td></tr>
</tbody>
</table>

<div class="callout tip">
  <div class="c-head">💡 Why this story is worth knowing</div>
  <p>The community was <b>right about the symptom and wrong about the cause</b>. The theories were "they quantized it" and "they nerfed it". All three problems were in the <b>harness</b>, not the model. Anthropic said the API was not affected.</p>
  <p>The lesson: "it feels worse" is real data worth reporting. Your explanation for it is probably wrong.</p>
</div>

<p>Note what is different today. Medium effort is now the <b>documented default</b> for Opus 5.5, Sonnet 5.5, and Haiku 5.5 in Claude Code. It suits everyday work with a clear scope. Raise it with <code>/effort high</code> or <code>/effort xhigh</code> for tricky bugs, flaky tests, or code you didn't write. For one hard question, put <code>ultrathink</code> in that prompt instead.</p>

<h2>The five time-wasters, and the fix</h2>
<table class="doc">
<thead><tr><th>Pattern</th><th>Fix</th></tr></thead>
<tbody>
<tr><td><b>The kitchen-sink session.</b> One task, then another, then back. Every turn re-sends all of it.</td><td><code>/clear</code> between unrelated tasks</td></tr>
<tr><td><b>Correcting over and over.</b> The conversation fills with failed attempts.</td><td>After two corrections, <code>/clear</code> and write a better prompt</td></tr>
<tr><td><b>The overgrown CLAUDE.md.</b> The rule that matters gets lost.</td><td>Shorten it, or move the rule to a <span class="jargon" data-term="hook">hook</span>. See <a href="#claude-md-ignored">6.2</a></td></tr>
<tr><td><b>Done, but not really.</b> Plausible code that fails edge cases.</td><td>Give Claude a check to run, and ask for the output. See <a href="#session-loop">6.3</a></td></tr>
<tr><td><b>The endless exploration.</b> "Improve this codebase" triggers broad scanning.</td><td>Name the file, the symptom, and what "fixed" looks like</td></tr>
</tbody>
</table>

<h2>The stale-advice tax</h2>
<p>Tips still circulating that do nothing now, or do harm:</p>
<table class="doc">
<thead><tr><th>Still repeated</th><th>Reality</th></tr></thead>
<tbody>
<tr><td><b>"Say <i>think hard</i> / <i>think harder</i>"</b></td><td>Not keywords. Ordinary prompt text. Use <code>/effort</code>, or <code>ultrathink</code> for one turn.</td></tr>
<tr><td><b><code>MAX_THINKING_TOKENS=8000</code></b></td><td>Adaptive-reasoning models ignore it. Use effort levels.</td></tr>
<tr><td><b>"IMPORTANT" and ALL CAPS</b></td><td>Current models over-apply emphasised rules. Write plainly, or use a hook.</td></tr>
<tr><td><b>"Tell it to keep going, don't be lazy"</b></td><td>Current models carry on by themselves. Such lines cause over-work. Give it a check, or a <code>/goal</code>.</td></tr>
<tr><td><b>"<code>@imports</code> save context"</b></td><td>False. Imported files load with the CLAUDE.md that imports them. Use rules with a <code>paths</code> glob.</td></tr>
<tr><td><b>"Exit 1 to block in a hook"</b></td><td><b>Exit 2 blocks.</b> Exit 1 is a non-blocking error, so your guard silently <b>fails open</b>.</td></tr>
<tr><td><b>"Disable MCP servers to save context"</b></td><td>Much less important now. Tool definitions are deferred by default, so only tool names and server instructions load. Still turn off servers you never use.</td></tr>
<tr><td><b>"There are 12 hook events"</b></td><td>The reference lists 33. Any guide saying 12 is far behind.</td></tr>
</tbody>
</table>

<div class="callout warn">
  <div class="c-head">⚠️ The exit-1 mistake can actually hurt you</div>
  <p>A hook meant to block dangerous commands, written with <code>exit 1</code>, does not block. The action goes ahead. Unix habit makes <code>exit 1</code> the natural choice, so this is easy to get wrong. A guard that fails open is worse than no guard, because you stopped watching. Use <code>exit 2</code>, and add <code>onFailure: "block"</code> if a crashed hook should also stop the action.</p>
</div>

<h2>When to use it</h2>
<ul>
  <li><b>Claude suddenly feels worse:</b> check <code>/effort</code>, <code>/model</code>, and the changelog before blaming the model.</li>
  <li><b>You inherited an old CLAUDE.md or hook set:</b> run <code>/doctor prompt-audit</code> and compare against the table above.</li>
  <li><b>Your bill or usage jumped:</b> open <code>/usage</code> and read the attribution and recommendations.</li>
  <li><b>You want a habits review:</b> run <code>/insights</code>. It reports friction points from your recent sessions.</li>
</ul>

<h2>Money and limits</h2>
<ul>
  <li><b>Anthropic publishes no numeric message limits.</b> Usage "will vary based on your Claude plan." Max is 5× or 20× Pro usage, not a fixed number. <i>The author's view:</i> every specific figure in a blog is reverse-engineered or invented.</li>
  <li><b>Paid plans have a 5-hour limit and weekly limits.</b> Claude Code now calls the first one the "5-hour limit", not the "session limit". Fable has its own weekly limit where your plan includes it.</li>
  <li><b>Check <code>/status</code> before you start.</b> If <code>ANTHROPIC_API_KEY</code> is set, Claude Code uses that key once you approve it, and always in <code>-p</code> mode. That bills the API, not your subscription. <code>/status</code> shows which credential is active.</li>
  <li><b><code>/usage-credits</code></b> opens your usage settings. On Pro and Max, that is where you turn usage credits on and set a <b>monthly spend limit</b>.</li>
  <li><b><code>/usage</code></b> attributes usage to skills, subagents, plugins, and individual MCP servers. It also suggests fixes; press <code>f</code> to apply the ones it can.</li>
</ul>

<div class="callout warn">
  <div class="c-head">⚠️ Switching model does not restore a spent limit</div>
  <p>Widely repeated bad advice. The 5-hour and weekly limits are <b>shared across all models</b>. <code>/model sonnet</code> won't buy more room after you hit them. It only helps after a <i>model-specific</i> message such as "You've hit your Opus limit".</p>
</div>

<p>Worth knowing: <span class="jargon" data-term="opusplan">opusplan</span> uses Opus in plan mode and Sonnet for execution. <i>The author's view:</i> it buys most of the judgement for much less cost.</p>

<h2>Develop your intuition</h2>
<p><i>The author's closing view.</i> Everything in Part 6 is a starting point, not a law. Anthropic's own best-practices page ends by saying that advice which starts to feel like busywork has probably expired. When output is great, notice what you did: the prompt, the context, the mode. When it struggles, ask whether the context was noisy, the prompt vague, or the task too big for one pass.</p>
<p>That intuition is the actual skill. <span class="jargon" data-term="agentic-engineering">Agentic engineering</span> is not about knowing the flags.</p>

<div class="sources">
  <h3>Official sources</h3>
  <ul>
    <li><a href="https://www.anthropic.com/research/april-23-postmortem">An update on recent Claude Code quality reports</a> (23 Apr 2026): the three harness problems</li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best practices</a>: default effort, steering, "What you can stop doing"</li>
    <li><a href="https://code.claude.com/docs/en/model-config">Model configuration</a>: <code>ultrathink</code>, <code>opusplan</code></li>
    <li><a href="https://code.claude.com/docs/en/hooks">Hooks reference</a>: exit codes, the 33 events, <code>onFailure</code></li>
    <li><a href="https://code.claude.com/docs/en/memory">Memory</a>: imports load with the importing file</li>
    <li><a href="https://code.claude.com/docs/en/costs">Manage costs</a>: <code>/usage</code>, <code>/usage-credits</code>, shared limits, deferred MCP tools, <code>MAX_THINKING_TOKENS</code>, <code>/insights</code></li>
    <li><a href="https://code.claude.com/docs/en/authentication">Authentication</a>: API key precedence and <code>/status</code></li>
    <li><a href="https://code.claude.com/docs/en/changelog">Changelog</a>: the "5-hour limit" wording</li>
    <li><a href="https://support.claude.com/en/articles/9797557-usage-limit-best-practices">Usage limit best practices</a> · <a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans">Manage usage credits</a></li>
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
