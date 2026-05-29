---
name: vue-vite-manual-setup
description: Manually set up Vue 3 + Vite + TypeScript project when npm create vite times out
source: auto-skill
extracted_at: '2026-05-29T11:05:18.481Z'
---

## When to use

When `npm create vite` or `npx create-vite` hangs/times out (common in automated environments), manually create the project structure.

## Procedure

### 1. Create directory structure
```
src/
  components/
  styles/
  data/
  types/
  utils/
  assets/
public/
```

### 2. Create package.json
```json
{
  "name": "project-name",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vue-tsc": "^2.0.0",
    "sass": "^1.69.0"
  }
}
```

### 3. Create vite.config.ts
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/variables" as *;'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### 4. Create tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 5. Create tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 6. Create index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App Title</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 7. Create src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### 8. Create src/main.ts
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.scss'

createApp(App).mount('#app')
```

### 9. Run npm install
```bash
npm install
```

## Key points

- The `@` alias requires both vite.config.ts `resolve.alias` AND tsconfig.json `paths`
- For SCSS variables, use `additionalData` in vite.config.ts to inject globally
- `noUnusedLocals` and `noUnusedParameters` in tsconfig will catch unused imports
- Always include `src/vite-env.d.ts` for Vue SFC type support