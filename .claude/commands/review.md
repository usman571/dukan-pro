# /review — Code Review

## Step 1: Find Changes
```bash
git diff HEAD --name-only
# or for a specific range:
git diff main..HEAD --name-only
```
Show files to user, confirm scope.

## Step 2: Review
```
@code-reviewer
Review these files: [list]
Project: Dukaan Pro — PWA for Pakistani kirana store owners
Stack: Next.js 16, TypeScript strict, shadcn/ui, TanStack Query/Form/Table
Check all CLAUDE.md rules.
Extra: Rs currency format, 320px mobile layout, green/red/amber color semantics.
```

## Step 3: Handle Issues
For each Critical/High issue — ask user:
"Fix this now? (Y/N)"

If yes:
```bash
git add [file]
git commit -m "fix([scope]): [issue fixed per review]"
```

## Step 4: Final Check
```bash
bun run build
bun run lint
```
Report: N issues found, N fixed. Ready to push?
