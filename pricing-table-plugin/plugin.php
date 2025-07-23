<?php
/**
 * Plugin Name: Pricing Table Plugin
 * Plugin URI:  https://github.com/marcin-wosinek/pricing-table-plugin
 * Description: A customizable pricing table block for WordPress
 * Author:      Marcin Wosinek
 * Version:     1.0.0
 * License:     GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
 */

namespace PricingTablePlugin;

defined('WPINC') || die;
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Register the pricing table blocks.
 */
function register_pricing_table_blocks() {
    // Register the container block (pricing-table)
    register_block_type( __DIR__ . '/build/blocks/pricing-table/block.json' );

    // Register the child block (pricing-tier)
    register_block_type( __DIR__ . '/build/blocks/pricing-tier/block.json' );
}

// Register hooks
add_action( 'init', __NAMESPACE__ . '\register_pricing_table_blocks' );
