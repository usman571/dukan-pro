# /review — Code Review

## Step 1: Find Changes
```bash
git diff HEAD --name-only
```
Show files to user, confirm scope.

## Step 2: Review
@code-reviewer
Review these files: [list]
Project: Next.js 16, TypeScript strict, shadcn/ui
Check all CLAUDE.md rules.

## Step 3: Handle Issues
For each Critical/High issue — ask user:
"Fix this now? (Y/N)"

If yes:
```bash
git add [file]
git commit -m "fix: [issue fixed per review]"
```

## Step 4: Final Check
```bash
bun run build
bun run lint
```
Report: N issues found, N fixed. Ready to push?