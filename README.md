# Pricing Table Plugin

A modern WordPress block plugin for creating customizable pricing tables with multiple tiers, built with WordPress Block API v3.

## Features

- **Multi-tier pricing tables** with up to 3 customizable tiers
- **Dynamic pricing** with editable prices and currency selection  
- **Feature management** - add/remove features per tier
- **Customizable styling** with color picker and promoted tier highlighting
- **Billing options** - monthly/yearly toggle
- **Responsive design** with CSS Grid layout
- **Full internationalization** support

## Technologies

- **WordPress Block API v3** with comprehensive attribute schema
- **React/JSX** component-based architecture
- **@wordpress/scripts** build tooling
- **Custom hooks** for tier state management
- **Playwright** e2e testing with modular helpers
- **SCSS** with CSS custom properties for theming

## Development

**Scripts:**
- `npm start` - Development with hot reloading
- `npm run build` - Production build
- `npm test` - Run e2e tests
- `npm run lint:js` - JavaScript linting

**Local Development:**
```bash
docker compose up    # WordPress on localhost:8080
npm install         # Install dependencies
npm start          # Start development
```

## Architecture

- **Component structure:** Separate Edit/Save with reusable TierComponent
- **State management:** Custom `useTierActions` hook for tier operations
- **Inspector controls:** Global settings (currency, billing, colors)
- **Real-time preview** in block editor
- **Production-ready** with comprehensive testing

## Installation

**WordPress Dashboard:** Upload `pricing-table-plugin.zip` via Plugins → Add New

**Manual:** Extract to `wp-content/plugins/` and activate

**Git:** `git clone` into plugins directory
