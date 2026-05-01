# /fix-bug — Bug Fix Workflow

## Step 1: Get Info
Ask user:
1. Paste the exact error message
2. Which file or page?
3. When does it happen? (build / page load / button click)
4. What changed recently?

## Step 2: Investigate
@debugger
Error: [paste error]
File: [path]
When: [trigger]
Recent changes: [git log --oneline -5]

## Step 3: Present Diagnosis
Show root cause to user.
Ask: "Yeh fix theek lagti hai? Proceed karein? (Y/N)"

## Step 4: Apply Fix
Minimal change only — fix root cause, nothing else.
```bash
git add [file]
git commit -m "fix([scope]): [what was fixed]"
```

## Step 5: Verify
```bash
bun run build
bun run lint
```