# /refactor — Safe Library Removal & Code Migration Workflow

**Usage**: `/refactor` then describe what to remove/replace.

---

## Step 1: Gather Requirements

Ask the user:
1. **What to remove?** (e.g., a library, a feature, a pattern, a block of logic)
2. **What replaces it?** (e.g., a different library, custom code, nothing)
3. **Any specific constraints?** (e.g., keep the UI the same, preserve certain APIs)

---

## Step 2: Route — Cleanup Script or Full Pipeline?

Check if what is being removed is one of the built-in starter features:

| Feature key   | What it covers                                      |
|---------------|-----------------------------------------------------|
| `clerk`       | Auth, Organizations, Billing, profile pages         |
| `kanban`      | Drag & drop task board, @dnd-kit packages           |
| `chat`        | Messaging UI                                        |
| `notifications` | Notification center & page                        |
| `examples`    | Forms, React Query demo, Icons demo pages           |
| `themes`      | Extra themes (keep only one)                        |
| `sentry`      | Error tracking, instrumentation files               |

**If YES → go to Path A (cleanup script)**
**If NO → go to Path B (full pipeline)**

---

## PATH A — Built-in Feature Removal via cleanup.js

This script knows exactly what files, folders, dependencies, env vars, and nav items
belong to each feature. It is faster and more reliable than the AI pipeline for these cases.

### A1: Preview first (dry run)
```bash
node scripts/cleanup.js --dry-run <feature>
```
Show the output to the user. Confirm they want to proceed.

### A2: Human Approval Gate ✋
Present the dry-run output.
Ask: "Does this look correct? Shall I run the actual cleanup? (Y/N)"
**Do NOT proceed without explicit approval.**

### A3: Run cleanup
```bash
node scripts/cleanup.js <feature>
```

### A4: Sync dependencies
```bash
bun install
```

### A5: Verify
```bash
bun run build
bun run lint
```
If build fails — stop and report. Do not proceed.

### A6: Commit
```bash
git add -A
git commit -m "refactor(<feature>): Remove <feature> via cleanup script"
```

### A7: Final Report
```
Removal Complete ✅
Removed:        [feature]
Method:         cleanup.js (built-in)
Build status:   ✅ Passing
Lint status:    ✅ Passing

Manual steps remaining:
 - Remove from .env.local: [list env vars cleanup.js printed]
 - Test affected flows manually
```

---

## PATH B — Arbitrary Removal via Multi-Agent Pipeline

Use this when removing a library, pattern, or logic that is NOT in the cleanup.js feature list.

### B1: Research Phase (skip if no replacement)

Invoke @researcher agent:
```
@researcher
Research:
- [Replacement] setup for Next.js 16 App Router
- Migration guide from [old] to [new]
- Breaking changes and gotchas
- Bun compatibility

Output: Structured report with exact steps.
```

Wait for research report before proceeding.

### B2: Audit Phase

Invoke @refactoring-agent for audit ONLY:
```
@refactoring-agent
AUDIT ONLY — touch nothing yet.

Find all usages of [what is being removed] in this project:
- All import statements
- All hooks, components, or functions used
- All config files affected
- All environment variables
- Total file count

Present a complete impact report.
```

### B3: Planning Phase

Invoke @planner with research + audit results:
```
@planner
Research report: [paste]
Audit report: [paste]

Create a step-by-step migration plan:
- Exact file order (replacements before removals)
- What replaces what (table format)
- Commit message for each file
- Build verification checkpoints
- Final cleanup steps (packages, env vars, config)
```

### B4: Human Approval Gate ✋

Present complete plan to user.
Ask: "Does this plan look correct? Shall I proceed? (Y/N)"
**Do NOT proceed without explicit approval.**

### B5: Execution Phase

Invoke @refactoring-agent with approved plan:
```
@refactoring-agent
Approved plan:
[paste complete plan]

Rules:
- One file per commit
- bun run build after every 3 files
- Stop and report if build fails
- No traces of [removed thing] should remain
```

### B6: Verification Phase

Invoke @code-reviewer:
```
@code-reviewer
Verify refactoring is complete:
- grep -r "<removed-package-or-term>" src/ — should return nothing
- bun run build — must pass
- bun run lint — must pass
- Check all replaced patterns are consistent across files
```

### B7: Final Report
```
Refactoring Complete ✅
Removed:        [what]
Replaced with:  [what, or "nothing"]
Files changed:  [N]
Commits made:   [N]
Build status:   ✅ Passing
Lint status:    ✅ Passing

Remaining manual steps:
 - Remove from .env.local: [relevant env vars]
 - Update README if needed
 - Test affected flows manually
```
