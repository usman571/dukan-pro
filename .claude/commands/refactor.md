# /refactor — Safe Library Removal & Code Migration Workflow

**Usage**: `/refactor` then describe what to remove/replace.

---

## Step 1: Gather Requirements

Ask the user:
1. **What to remove?** (e.g., a library, a feature, a pattern, a block of logic)
2. **What replaces it?** (e.g., a different library, custom code, nothing)
3. **Any specific constraints?** (e.g., keep the UI the same, preserve certain APIs)

---

## Step 2: Research Phase (skip if no replacement)

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

---

## Step 3: Audit Phase

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

---

## Step 4: Planning Phase

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

---

## Step 5: Human Approval Gate ✋

Present complete plan to user.
Ask: "Does this plan look correct? Shall I proceed? (Y/N)"

**Do NOT proceed without explicit approval.**

---

## Step 6: Execution Phase

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

---

## Step 7: Verification Phase

Invoke @code-reviewer:
```
@code-reviewer
Verify refactoring is complete:
- grep -r "<removed-package-or-term>" src/ — should return nothing
- bun run build — must pass
- bun run lint — must pass
- Check all replaced patterns are consistent across files
```

Substitute `<removed-package-or-term>` with the actual library name, import path, or pattern that was removed.

---

## Step 8: Final Report
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
