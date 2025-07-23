# Pricing Table Plugin

A modern WordPress block plugin for creating customizable pricing tables using nested block architecture with WordPress core blocks.

## Features

- **Nested block structure** - Container (pricing-table) + Individual tiers (pricing-tier)
- **Up to 3 tiers** with flexible add/remove functionality
- **WordPress core blocks** - Uses core/button, core/heading, and core/list
- **Context-based communication** - Global settings flow to child blocks
- **Unified pricing** - Single price with monthly/yearly billing display
- **Promoted tier** with "Best value" badge and customizable accent colors
- **Action buttons** positioned below prices with URL controls
- **Full internationalization** and responsive design

## Architecture

Uses WordPress Block API v3 with `providesContext`/`usesContext` pattern. Container block manages global settings (currency, billing, colors, promoted tier) while individual tier blocks handle content through WordPress core blocks.

**Blocks:**
- `pricing-table-plugin/pricing-table` - Container with global settings
- `pricing-table-plugin/pricing-tier` - Individual tier with core/button, core/heading, core/list

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
