# AI Context

The project is a monorepo for GMDesigner using Bun workspaces.
- **Package Manager**: Bun
- **Frameworks**: Vue 3 (Composition API), PrimeVue, TailwindCSS (v4), Tauri (Rust).
- **Important Design principles**: Modular code, component-based architecture, conventional commits.

## Component Map
- **Block rendering**: Handled by \GmBlockRenderer.vue\. Maps block types (e.g. \heading\, \paragraph\, \content-grid\) to components (\GmTextHeading\, \GmTextParagraph\, \GmContentGrid\).
- **Property editing**: Handled by \GmBlockProperties.vue\. Maps block types to property panels (\PropsHeading\, \PropsContentGrid\).
- **Styling**: Utilizes CSS variables (e.g., \--font-family\, \--text-transform\) applied via \GmBlockWrapper.vue\ and modified in \PropsStyle.vue\.
