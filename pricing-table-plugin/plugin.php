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
 * Register the pricing table block.
 */
function register_pricing_table_block() {
    register_block_type( __DIR__ . '/block.json' );
}

// Register hooks
add_action( 'init', __NAMESPACE__ . '\register_pricing_table_block' );
