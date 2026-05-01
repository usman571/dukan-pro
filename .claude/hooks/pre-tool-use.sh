#!/bin/bash
# Runs BEFORE every tool use — security gate

TOOL_NAME="${CLAUDE_TOOL_NAME:-unknown}"
TOOL_INPUT="${CLAUDE_TOOL_INPUT:-}"

# Block dangerous commands
DANGEROUS=(
  "rm -rf /"
  "rm -rf ~"
  "chmod 777 /"
  "dd if=/dev/zero"
  "mkfs"
)

for pattern in "${DANGEROUS[@]}"; do
  if echo "$TOOL_INPUT" | grep -qF "$pattern"; then
    echo "🚨 BLOCKED: $pattern"
    exit 2
  fi
done

# Block production DB destruction
if echo "$TOOL_INPUT" | grep -qE "(DROP DATABASE|TRUNCATE|DELETE FROM .+ WHERE 1=1)"; then
  echo "🚨 BLOCKED: Destructive database operation"
  exit 2
fi

# Warn on sensitive files
if [ "$TOOL_NAME" = "write_file" ]; then
  for f in ".env.local" ".env.production" "next.config.ts"; do
    if echo "$TOOL_INPUT" | grep -q "$f"; then
      echo "⚠️ Writing to sensitive file: $f"
    fi
  done
fi

exit 0