# /feature-dev — New Feature Development

## Step 1: Ask User
1. Feature name? (e.g. "invoices", "reports")
2. What should it do?
3. Mock data or real backend?
4. Needs table? Form? Both?
5. Show in sidebar nav?

## Step 2: Research (if needed)
If new library or unfamiliar pattern involved:
@researcher Research: [topic] for Next.js 16, React 19, TypeScript strict, Bun

## Step 3: Plan
@planner
Feature: [name]
Description: [what it does]
Reference pattern: src/features/products/
Read CLAUDE.md first.
Present plan to user. Wait for approval. Do NOT proceed without it.

## Step 4: Implement (only after approval)
@implementer
Approved plan: [paste plan]
Follow src/features/products/ as reference.
One file per commit. bun run lint after each file.

## Step 5: Review
@code-reviewer
Review: src/features/[name]/
Check all CLAUDE.md rules.

## Step 6: Verify
```bash
bun run build
bun run lint
```

Report: files created, commits made, build status.