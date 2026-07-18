# Architecture Overview

## Monorepo
We use Bun workspaces to manage multiple packages in a single repository.

## Desktop App (\pps/desktop\)
- **Frontend**: Vue 3 (Composition API), Vite, TailwindCSS (v4), PrimeVue.
- **Rich Text**: Tiptap editor integration.
- **Backend/System Access**: Tauri (Rust).

### Key Systems
- **Block System**: Component-based layout engine. Blocks are defined in \src/types/document.ts\. Types include layout components (\content-grid\, \lex-row\, \lex-col\) and leaf components (\heading\, \paragraph\, \market-card\, etc.).
- **Store**: \useDocumentStore.ts\ manages the document tree (recursive blocks) and selection state.
- **Layout Hierarchy**: \GmEditorShell\ -> \GmCanvas\ -> \GmDocPage\/\GmDocCover\ -> \GmBlockRenderer\.
- **Property Panel**: Maps block types to specific \Props*\ components in \GmBlockProperties.vue\.

