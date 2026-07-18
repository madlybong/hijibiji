# Architecture Overview

## Monorepo
We use Bun workspaces to manage multiple packages in a single repository.

## Desktop App (`apps/desktop`)
- Frontend: Vue 3 (Composition API), Vite, TailwindCSS, PrimeVue.
- Core editor: Tiptap.
- Backend/System Access: Tauri (Rust).
