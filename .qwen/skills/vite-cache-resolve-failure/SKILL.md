---
name: vite-cache-resolve-failure
description: Vite reports "Failed to resolve import" for files that actually exist — caused by stale cache in node_modules/.vite
source: auto-skill
extracted_at: '2026-05-29T12:41:40.394Z'
---

## Problem

Vite dev server shows error like:

```
[plugin:vite:import-analysis] Failed to resolve import "@/components/Foo.vue" from "src/App.vue". Does the file exist?
```

But the file **does exist** on disk and `npm run build` passes fine.

## Root Cause

Vite caches transformed modules in `node_modules/.vite`. When files are added/renamed/moved externally (e.g. by another tool, agent, or git operation), the dev server's in-memory cache becomes stale and can't resolve the new imports.

## Fix

```bash
# 1. Delete Vite cache
rd /s /q node_modules\.vite    # Windows
rm -rf node_modules/.vite      # macOS/Linux

# 2. Restart dev server
npm run dev
```

## Diagnosis Checklist

Before applying the fix, verify:

1. **File actually exists**: `ls src/components/Foo.vue` or `dir src\components\Foo.vue`
2. **Build passes**: `npm run build` — if build also fails, the issue is real (typo in import, missing file), not a cache problem
3. **Import path is correct**: check for typos, case sensitivity, `@/` alias

If build passes but dev server fails → it's a cache issue.

## Key Insight

`npm run build` uses a fresh transform pipeline (no cache), so it's the authoritative test. If build succeeds but dev server doesn't, the problem is always the cache, never the code.
