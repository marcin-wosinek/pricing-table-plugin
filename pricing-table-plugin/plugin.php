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
    register_block_type( __DIR__ . '/block' );
}

/**
 * Enqueue block scripts and styles.
 */
function enqueue_block_assets() {
    wp_enqueue_script(
        'pricing-table-block',
        plugin_dir_url( __FILE__ ) . 'block/build/script.js',
        array( 'wp-blocks', 'wp-element' ),
        '1.0.0',
        true
    );
    
    wp_enqueue_style(
        'pricing-table-block',
        plugin_dir_url( __FILE__ ) . 'block/build/style.css',
        array(),
        '1.0.0'
    );
}

// Register hooks
add_action( 'init', __NAMESPACE__ . '\register_pricing_table_block' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_assets' );
