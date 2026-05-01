#!/bin/bash
# Runs AFTER every session — summary

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Session ended: $TIMESTAMP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Recent commits
echo ""
echo "📝 Recent commits:"
git log --oneline --since="3 hours ago" 2>/dev/null || echo "  None"

# Uncommitted changes
UNCOMMITTED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNCOMMITTED" -gt "0" ]; then
  echo ""
  echo "⚠️  $UNCOMMITTED uncommitted file(s):"
  git status --short 2>/dev/null
  echo ""
  echo "  Run: bun run lint && git add [file] && git commit"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit 0