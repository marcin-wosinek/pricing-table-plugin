# Pricing Table Plugin

A modern WordPress block plugin for creating customizable pricing tables using a nested block architecture with WordPress Block API v3.

## Features

- **Nested block structure** - Container (pricing-table) + Individual tiers (pricing-tier)
- **Up to 3 tiers** with flexible add/remove functionality
- **Context-based communication** - Global settings flow to child blocks
- **Unified pricing** - Single price with monthly/yearly billing display
- **Promoted tier** highlighting with customizable accent colors
- **Feature management** - Add/remove features per tier with inheritance
- **Action buttons** positioned below prices with URL controls
- **Full internationalization** and responsive design

## Architecture

**Two-Block System:**

- `pricing-table-plugin/pricing-table` - Container with global settings
- `pricing-table-plugin/pricing-tier` - Individual tier blocks

**Key Technologies:**

- WordPress Block API v3 with `providesContext`/`usesContext`
- React/JSX with `InnerBlocks` for nesting
- Dual attribute/context system for editor + save persistence
- CSS custom properties for dynamic theming

## Development

```bash
docker compose up    # WordPress on localhost:8080
npm install         # Install dependencies
npm start          # Development mode
npm run build      # Production build
npm test          # E2E tests with Playwright
```

## Installation

Upload via WordPress Dashboard → Plugins → Add New, or extract to `wp-content/plugins/` and activate.
