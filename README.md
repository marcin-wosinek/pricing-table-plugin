# Pricing Table Plugin

A WordPress plugin for creating pricing tables with the following key components:

## Project Structure
- `plugin.php` - Main plugin file registering the block
- `block/` - Contains the block implementation (script.js, style.css, block.json)
- `tests/` - Playwright e2e tests
- `compose.yml` - Docker setup for development

## Current State
- Basic block placeholder showing "Pricing Table" 
- Uses WordPress Block API v3
- Configured for e2e testing with Playwright
- Development environment via Docker (localhost:8080)

## Key Files
- `plugin.php:20` - Block registration
- `block/script.js:8` - Block definition with placeholder
- `block/style.css:5` - Basic placeholder styling
- `playwright.config.js:22` - Test configuration targeting localhost:8080

The plugin is in early development with just a basic placeholder block.

## Development

Use docker compose with:

* `docker compose up`. It spins up:
  * localhost:8080 with the WordPress,
  * localhost:8081 with phpMyAdmin

## Installation

### Using The WordPress Dashboard

1. Navigate to the 'Add New' Plugin Dashboard.
2. Select `pricing-table-plugin.zip` from your computer.
3. Upload.
4. Activate the plugin on the WordPress Plugin Dashboard.

### Using lTP

1. Extract `pricing-table-plugin.zip` to your computer.
2. Upload the `pricing-table-plugin` directory to your `wp-content/plugins` directory.
3. Activate the plugin on the WordPress Plugins Dashboard.

### Git

1. Navigate to the `plugins` directory of your WordPress installation.
2. From the terminal, run `$ git clone git@github.com:marcin-wosinek/pricing-table-plugin.git`

## Credits

Started form Tom McFarlin's work at
https://github.com/tommcfarlin/pricing-table-plugin.
