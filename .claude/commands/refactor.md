# /refactor — Safe Library Removal & Code Migration Workflow

**Usage**: `/refactor` then describe what to remove/replace.

---

## Step 1: Gather Requirements

Ask the user:
1. **Kya remove karna hai?** (e.g., Clerk, Sentry, both)
2. **Kya replace karega?** (e.g., NextAuth, nothing)
3. **Koi specific requirements?** (e.g., email/password only, no OAuth)

---

## Step 2: Research Phase

Invoke @researcher agent:
@researcher
Research karo:

[Replacement library] v5 setup for Next.js 16 App Router
Migration guide from [old library] to [new library]
Breaking changes and gotchas
Bun compatibility

Output: Structured research report with exact steps

Wait for research report before proceeding.

---

## Step 3: Audit Phase

Invoke @refactoring-agent for audit ONLY:
@refactoring-agent
AUDIT ONLY — touch nothing yet.
Find all usages of [library] in this project:

All import statements
All hooks/components used
All config files affected
All environment variables
Total file count

Present complete impact report.

---

## Step 4: Planning Phase

Invoke @planner with research + audit results:
@planner
Research report: [paste]
Audit report: [paste]
Create step-by-step migration plan:

Exact file order (replacements before removals)
What replaces what (table format)
Commit message for each file
Build verification checkpoints
Final cleanup steps


---

## Step 5: Human Approval Gate ✋

Present complete plan to user.
Ask: "Yeh plan theek hai? Proceed karoon? (Y/N)"

**Do NOT proceed without explicit approval.**

---

## Step 6: Execution Phase

Invoke @refactoring-agent with approved plan:
@refactoring-agent
Approved plan:
[paste complete plan]
Rules:

One file per commit
bun run build after every 3 files
Stop and report if build fails
No Clerk/Sentry traces should remain


---

## Step 7: Verification Phase

Invoke @code-reviewer:
@code-reviewer
Verify refactoring is complete:

grep -r "clerk|Clerk" src/ — should return nothing
grep -r "sentry|Sentry" src/ — should return nothing
bun run build — must pass
bun run lint — must pass
Check all replaced patterns are consistent


---

## Step 8: Final Report
Refactoring Complete ✅
Removed: [library name]
Replaced with: [replacement]
Files changed: [N]
Commits made: [N]
Build status: ✅ Passing
Lint status: ✅ Passing
Remaining manual steps:

 Remove from .env.local: [env vars]
 Update README if needed
 Test sign-in flow manually