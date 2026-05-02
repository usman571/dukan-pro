# /feature-dev — New Feature Development

Develops a complete Dukaan Pro feature following the agentic engineering workflow.

## Step 1: Ask User
1. Feature name? (e.g. "inventory", "udhaar", "sales", "reports")
2. Which screens from the design? (e.g. M4+D4 for inventory)
3. What does it do for the shop owner?
4. Mock data or real backend?
5. Needs table? Form? Both? Chart?
6. Mobile layout: list cards or data table?

## Step 2: Research (if needed)
If new library or unfamiliar pattern involved:
```
@researcher Research: [topic] for Next.js 16, React 19, TypeScript strict, Bun
Focus on: mobile-first, Pakistani locale, TanStack patterns
```

## Step 3: Plan
```
@planner
Feature: [name]
Screens: [e.g. M4 Inventory list + M5 Add product + D4 Desktop table]
Description: [what it does for kirana shop owner]
Reference pattern: src/features/inventory/
Read CLAUDE.md first — especially data models and design system.
```
Present plan to user. Wait for approval. Do NOT proceed without it.

## Step 4: Implement (only after approval)
```
@implementer
Approved plan: [paste plan here]
Reference: src/features/inventory/ as canonical pattern
Mobile-first: 320px must work
Currency: Rs format throughout
One file per commit. bun run lint after each file.
```

## Step 5: Review
```
@code-reviewer
Review: src/features/[name]/
Check CLAUDE.md rules.
Extra checks: Rs currency format, 320px mobile layout, green/red/amber color usage.
```

## Step 6: Verify
```bash
bun run build
bun run lint
```

Report: files created, commits made, build status, screens implemented (M? / D?).
