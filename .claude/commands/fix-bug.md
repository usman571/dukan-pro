# /fix-bug — Bug Fix Workflow

## Step 1: Get Info
Ask user:
1. Paste the exact error message
2. Which file or page?
3. When does it happen? (build / page load / button click / mobile layout)
4. What changed recently?

## Step 2: Investigate
```
@debugger
Error: [paste error]
File: [path]
When: [trigger]
Recent changes: [git log --oneline -5]
```

## Step 3: Present Diagnosis
Show root cause to user.
Ask: "Yeh fix theek lagti hai? Proceed karein? (Y/N)"

## Step 4: Apply Fix
Minimal change only — fix root cause, nothing else.
```bash
git add [file]
git commit -m "fix([scope]): [what was fixed]"
```
Scopes: `auth` · `inventory` · `sales` · `udhaar` · `reports` · `layout` · `nav`

## Step 5: Verify
```bash
bun run build
bun run lint
```

## Common Dukaan Pro Quick Fixes
```bash
# Stale .next cache (instrumentation errors)
rm -rf .next

# Check for broken imports after feature removal
grep -r "from '@/features/kanban\|from '@/features/chat\|from '@/features/notifications" src/

# Check currency format violations
grep -r "₨\|PKR" src/ --include="*.tsx" --include="*.ts"

# Check for direct tabler icon imports
grep -r "from '@tabler/icons-react'" src/ --include="*.tsx"
```
