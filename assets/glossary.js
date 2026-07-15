/* ===========================================================
   Jargon Decoder — every term is keyed by a lowercase slug.
   In content, wrap a word like:  <span class="jargon" data-term="agent">agent</span>
   The slug (data-term) must match a key below.
   Verified against official docs 2026-07-15.
   =========================================================== */

const GLOSSARY = {
  "context-window": {
    term: "Context window",
    def: "The whiteboard. Everything Claude can see right now — your prompt, the conversation so far, files it has read, tool results. Current models hold 1M tokens (Haiku 4.5 holds 200K). It is finite, and when it fills, something must be dropped or summarised."
  },
  "context-rot": {
    term: "Context rot",
    def: "Information in the middle of a very long context gets less attention than information at the start or end. A full context window is not the same as a useful one — which is why more context is not automatically better."
  },
  "token": {
    term: "Token",
    def: "The unit the context window is measured in — roughly 3.5 characters of English, so ~750 words per 1,000 tokens. Both what you send and what Claude writes cost tokens, and output costs about 5× input."
  },
  "tool-use": {
    term: "Tool use",
    def: "Giving Claude a phone. By itself a model only produces text. Tool use lets it say \"call this function with these arguments\"; you or Anthropic run it and the result returns to the conversation. Reading a file, running a test, searching the web — all tool use."
  },
  "agent": {
    term: "Agent",
    def: "A contractor, not a script. A workflow follows a path you drew in advance; an agent decides its own next step in a loop until the job is done. Anthropic's own guidance is conservative: most tasks do not need one."
  },
  "workflow": {
    term: "Workflow",
    def: "Systems where models and tools are orchestrated through predefined code paths. Cheaper, faster, and easier to debug than an agent — reach for an agent only when you genuinely cannot draw the path in advance."
  },
  "claude-md": {
    term: "CLAUDE.md",
    def: "The sticky note on the monitor. A Markdown file Claude reads at the start of every session in a project — your conventions, commands, and preferences. It costs context on every single request, which is the argument for keeping it short."
  },
  "skill": {
    term: "Skill",
    def: "The laminated recipe card the chef grabs when needed. A folder with a SKILL.md of instructions (plus optional scripts) that Claude loads only when relevant. The description sits in context; the body loads on demand — progressive disclosure."
  },
  "progressive-disclosure": {
    term: "Progressive disclosure",
    def: "Loading detail only when it is needed. A skill's one-line description stays in context permanently; its full contents load only when Claude judges the skill relevant. This is what keeps a large skill library affordable."
  },
  "mcp": {
    term: "MCP (Model Context Protocol)",
    def: "USB-C for AI tools. An open standard for connecting a model to an external system — your database, Jira, Salesforce — without a bespoke integration each time. Write an MCP server once; any MCP-speaking client can use it."
  },
  "connector": {
    term: "Connector",
    def: "What claude.ai calls a hosted MCP server you toggle on. Worth knowing: custom connectors run from Anthropic's cloud, not your machine — even in the Desktop app — so your server must be reachable from Anthropic's infrastructure."
  },
  "hook": {
    term: "Hook",
    def: "A tripwire on the workshop door. A command that fires automatically at a lifecycle point — before a tool runs, after a file is edited, when a session starts. Deterministic: it is your code, not Claude's judgement."
  },
  "subagent": {
    term: "Subagent",
    def: "An intern with a clean desk who reports back a summary. A separate Claude with its own context window and tools. The point is context economy: it burns 100K tokens on dead ends and hands you back only the answer."
  },
  "thinking": {
    term: "Thinking (adaptive)",
    def: "Working out the answer on scrap paper before speaking. On current models this is adaptive — Claude decides when and how much to think rather than you setting a budget. Thinking tokens are billed as output."
  },
  "effort": {
    term: "Effort",
    def: "How hard to work. A dial — low, medium, high, xhigh, max — controlling thinking depth and token spend. Default is high; xhigh is recommended for coding and agentic work. Try tuning effort before switching to a bigger model."
  },
  "compaction": {
    term: "Compaction",
    def: "Rewriting the whiteboard smaller. When a conversation approaches the context limit, older turns are summarised so work can continue. Something is always lost — a fresh session with a good prompt often beats a thrice-compacted one."
  },
  "memory": {
    term: "Memory",
    def: "What survives the whiteboard being wiped. An ambiguous term: claude.ai memory (summaries of your chats), Claude Code auto memory (machine-local notes per project), and the memory tool (an API feature writing to a directory you control)."
  },
  "artifact": {
    term: "Artifact",
    def: "The document beside the conversation. Standalone content — a chart, an app, a doc — rendered in its own pane rather than inline. Artifacts can be interactive, published to a link, and edited in place."
  },
  "project": {
    term: "Project",
    def: "A folder with a memory. On claude.ai, a workspace bundling documents, custom instructions, and its own memory space. On paid plans, large knowledge bases automatically switch to a retrieval mode."
  },
  "permission-mode": {
    term: "Permission mode",
    def: "How much rope Claude gets in Claude Code: read-only by default, through auto-accepting edits, up to a classifier-screened auto mode. Modes are cycled with Shift+Tab."
  },
  "plan-mode": {
    term: "Plan mode",
    def: "Measure twice, cut once. Claude explores and proposes a plan without touching anything; you approve before it edits. The highest-leverage habit for any change bigger than a one-liner."
  },
  "headless": {
    term: "Headless",
    def: "Claude without the conversation. Running claude -p \"prompt\" non-interactively — one prompt, one answer, structured output if you ask. This is how Claude runs in CI."
  },
  "agent-sdk": {
    term: "Claude Agent SDK",
    def: "Claude Code as a library — the harness (agent loop, tools, context management) packaged for your own applications. Renamed from \"Claude Code SDK\"; if you see the old name, the doc is stale."
  },
  "cowork": {
    term: "Cowork",
    def: "Anthropic's delegated-work surface. You describe an outcome, Claude plans it, splits it into subtasks, runs them (often in parallel) and returns finished documents. Over 90% of Cowork usage is not software development."
  },
  "prompt-caching": {
    term: "Prompt caching",
    def: "Reusing an already-processed prefix of a prompt so you don't pay full price to re-send it. Cache reads cost ~0.1× base input price. Any byte change in the prefix invalidates everything after it."
  },
  "worktree": {
    term: "Git worktree",
    def: "A second checkout of the same repository in a different folder, sharing one git history. Claude Code uses them so two sessions can work on two branches at once without fighting over the same files."
  },
  "checkpoint": {
    term: "Checkpoint",
    def: "A save point Claude Code takes as it edits. /rewind rolls the code back to an earlier message — and lets you choose whether to roll the conversation back with it, or keep what you both learned."
  },
  "slash-command": {
    term: "Slash command",
    def: "A command you type in Claude Code starting with / — like /plan, /compact, or /model. Custom ones come from your own skills, so /deploy-check can be something you wrote."
  },
  "auto-mode": {
    term: "Auto mode",
    def: "A permission mode where Claude acts without asking, but every action is screened by a safety classifier that blocks destructive things (force pushes, mass deletion, secrets leaving the machine). Not the same as bypassing permissions."
  },
  "tool-search": {
    term: "Tool search",
    def: "Loading MCP tool schemas only when needed. Tool names sit in context at startup; the full JSON schemas stay deferred until Claude actually reaches for one. It is why 20 MCP servers don't drown your context window."
  }
};
