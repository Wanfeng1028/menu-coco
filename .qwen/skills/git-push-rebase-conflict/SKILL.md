---
name: git-push-rebase-conflict
description: Resolve git push rejection when remote has existing commits (e.g., GitHub auto-generated README)
source: auto-skill
extracted_at: '2026-05-29T11:22:27.950Z'
---

## When to use

When `git push` is rejected because the remote repository already has commits (common when GitHub creates a default README.md during repo creation).

## Procedure

### 1. Stash any unstaged changes
```bash
git stash
```

### 2. Pull with rebase
```bash
git pull origin main --rebase
```

### 3. Resolve conflicts (usually README.md)

Read the conflicted file, keep the more complete version, write it back.

### 4. Continue rebase with non-interactive editor
```bash
git add <conflicted-file>
set "GIT_EDITOR=true" && git rebase --continue
```

**Important:** On Windows cmd.exe, use `set "VAR=value" &&` syntax (not `VAR=value`).

### 5. Restore stashed changes
```bash
git stash pop
```

### 6. Push
```bash
git push -u origin main
```

## Key points

- GitHub repos created with "Add README" option will have an initial commit
- `--rebase` keeps history linear instead of creating merge commits
- `GIT_EDITOR=true` prevents the interactive editor from blocking automation
- On Windows cmd.exe: `set "GIT_EDITOR=true" && git rebase --continue`
- On Unix/bash: `GIT_EDITOR=true git rebase --continue`
- Always check `git status` after rebase to ensure no remaining unstaged changes