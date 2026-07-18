# GMDesigner

GMDesigner is a modern document and newsletter design application. It allows you to visually design beautiful documents and automatically export them to HTML and PDF formats.

## Architecture
This project is structured as a Monorepo using Bun Workspaces. It includes:
- `apps/desktop`: The main Tauri + Vue.js desktop application.
- `packages/`: Reusable logic and UI components (future expansion).
- `resources/`: Seed resources (branding, source files, etc.)

## Quick Start
```bash
# Install dependencies
bun install

# Start the desktop app in development mode
bun run dev

# Build the desktop app
bun run build
```
