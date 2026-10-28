/* ===========================================================
   Jargon Decoder — every term is keyed by a lowercase slug.
   In content, wrap a word like:  <span class="jargon" data-term="agent">agent</span>
   The slug (data-term) must match a key below.
   Verified against official docs 2026-10-28.
   =========================================================== */

const GLOSSARY = {
  "context-window": {
    term: "Context window",
    def: "The whiteboard. Everything Claude can see right now — your prompt, the conversation so far, files it has read, tool results. Every current model holds 1M tokens; older ones such as Haiku 4.5 hold 200K. It is finite, and when it fills, something must be dropped or summarised."
  },
  "context-rot": {
    term: "Context rot",
    def: "As the context grows, Claude's accuracy and recall drop. A full context window is not the same as a useful one — which is why more context is not automatically better."
  },
  "token": {
    term: "Token",
    def: "The unit the context window is measured in — Claude 4.7 and later models produce about 30% more tokens for the same text than older ones, so 1,000 tokens is roughly 550 words of English. Both what you send and what Claude writes cost tokens, and output costs about 5× input."
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
    def: "Working out the answer on scrap paper before speaking. On current models this is adaptive — Claude decides when and how much to think rather than you setting a budget. It is on by default, and on Opus 5.5 and Fable 5.1 it cannot be turned off. Thinking tokens are billed as output."
  },
  "effort": {
    term: "Effort",
    def: "How hard to work. A dial — low, medium, high, xhigh, max — controlling thinking depth and token spend. Opus 5.5 and Haiku 5.5 default to medium, as does Sonnet 5.5 in Claude Code and the apps; most others default to high. xhigh is meant for long agentic runs. Try tuning effort before switching to a bigger model."
  },
  "compaction": {
    term: "Compaction",
    def: "Rewriting the whiteboard smaller. When a conversation approaches the context limit, older turns are summarised so work can continue. Something is always lost — a fresh session with a good prompt often beats a thrice-compacted one."
  },
  "memory": {
    term: "Memory",
    def: "What survives the whiteboard being wiped. An ambiguous term: claude.ai memory (editable topics Claude saves as you chat), Claude Code auto memory (machine-local notes per project), and the memory tool (an API feature writing to a directory you control)."
  },
  "artifact": {
    term: "Artifact",
    def: "The document beside the conversation. Standalone content — a doc, deck, design, dashboard, or small app — rendered in its own pane rather than inline. Everything saves to the Artifacts tab, on every plan including Free. Artifacts can be interactive, shared by link, and edited in place."
  },
  "project": {
    term: "Project",
    def: "A folder with a memory. On claude.ai, a workspace bundling documents, custom instructions, and its own memory space. On paid plans, large knowledge bases automatically switch to a retrieval mode."
  },
  "permission-mode": {
    term: "Permission mode",
    def: "How much rope Claude gets in Claude Code. There are six, from Manual (asks before edits and commands) through accept-edits and plan to auto (a classifier checks each action) and bypass (containers only). Shift+Tab cycles them in the CLI."
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
    def: "Handing Claude a whole task instead of a question. You describe an outcome; Claude plans it, splits it into subtasks, runs them (often in parallel), and returns finished files. Since 16 September 2026 it is no longer a separate mode: chat and Cowork are one conversation, and Claude decides when a request needs the longer treatment."
  },
  "prompt-caching": {
    term: "Prompt caching",
    def: "Reusing an already-processed prefix of a prompt so you don't pay full price to re-send it. Cache reads cost 0.1× the base input price on most models, 0.05× on Opus 5.5 and Sonnet 5.5, and 0.025× on Fable 5.1. Any byte change in the prefix invalidates everything after it."
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
  },
  "mcpb": {
    term: "Desktop extension (.mcpb)",
    def: "A local MCP server bundled into a single installable file — a zip with a manifest. Renamed from .dxt (old .dxt files still work). Claude Desktop ships a Node runtime, so most extensions install with one click and no toolchain."
  },
  "computer-use": {
    term: "Computer use",
    def: "Claude driving your actual screen — taking screenshots, clicking, typing, opening apps. In beta on Pro and Max only, off by default, and it needs Claude Desktop running. It is the last resort: Claude tries a connector, a shell command, or the browser first, and uses your screen only when none fits."
  },
  "plugin": {
    term: "Plugin",
    def: "A starter kit installed as one unit: skills, subagents, hooks, and MCP servers or connectors packaged together. The same format works in Claude Code and in the Claude app, though each app loads a different set of parts. What a plugin runs, it runs as you."
  },
  "sandbox": {
    term: "Sandbox",
    def: "A walled-off space where Claude runs code, so a mistake can't reach the rest of your system. Long tasks in the Claude app and Claude Code cloud sessions run in one on Anthropic's servers. On your own machine, Claude Code can sandbox its shell commands on macOS, Linux, and WSL 2."
  },
  "usage-credits": {
    term: "Usage credits",
    def: "Extra capacity you can buy on Pro, Max, Team, and seat-based Enterprise. With credits on, hitting a 5-hour or weekly limit no longer stops your work; it continues on credits."
  },
  "system-reminder": {
    term: "System reminder",
    def: "Per community research, not official docs: the wrapper Claude Code puts around your CLAUDE.md before showing it to the model. It tells Claude the content may or may not be relevant and not to respond to it unless it is. This is why CLAUDE.md is advisory rather than enforced — and why hooks exist."
  },
  "agentic-engineering": {
    term: "Agentic engineering",
    def: "The 2026 successor to \"vibe coding\". Vibe coding raises the floor — anyone can produce something. Agentic engineering preserves the quality bar: you supply the tests, the architecture, and the review, and the agent supplies the throughput."
  },
  "opusplan": {
    term: "opusplan",
    def: "A model setting where Opus does the planning and Sonnet does the implementing. Buys Opus-quality decisions at closer to Sonnet cost, because planning is the part that needs the judgement."
  },
  "cloud-session": {
    term: "Cloud session",
    def: "A Claude Code session that runs on Anthropic's machines, not yours. Start one from claude.ai/code, the Claude app, the desktop app, or with claude --cloud. It keeps working after you close your laptop. Use it for long tasks, or when the repo isn't on your machine."
  },
  "agents-md": {
    term: "AGENTS.md",
    def: "An instruction file that several coding agents read, not only Claude. If your project has no CLAUDE.md, Claude Code reads AGENTS.md in its place."
  },
  "dynamic-workflow": {
    term: "Dynamic workflow",
    def: "A short script Claude writes that runs many subagents at once — dozens to hundreds — in the background. The script holds the plan and the partial results, so Claude's conversation keeps only the final answer. Use it for a codebase-wide audit or a large migration."
  },
  "agent-team": {
    term: "Agent team",
    def: "Several Claude Code sessions working together. A lead session hands out tasks from a shared list, and teammates message each other directly. Experimental, off by default, and it uses far more tokens than one session."
  },
  "mod": {
    term: "Mod",
    def: "A Claude Code plugin made of JavaScript or TypeScript that runs inside Claude Code. It can add panes, change how tool calls behave, or add instant commands. It is not sandboxed, so install only mods you trust."
  },
  "prompt-injection": {
    term: "Prompt injection",
    def: "Hidden instructions planted in something Claude reads — a web page, a file, a tool result. The goal is to make Claude do something you did not ask for."
  },
  "rag": {
    term: "RAG (retrieval-augmented generation)",
    def: "Searching instead of reading everything. Claude looks through your files and pulls in only the parts that match your question. This lets a project hold far more material than fits in one context window."
  }
};
