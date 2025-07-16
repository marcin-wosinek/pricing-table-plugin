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
    register_block_type( __DIR__ . '/build' );
}

/**
 * Enqueue block scripts and styles.
 */
function enqueue_block_assets() {
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
    
    wp_enqueue_script(
        'pricing-table-block',
        plugin_dir_url( __FILE__ ) . 'build/index.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
    
    wp_enqueue_style(
        'pricing-table-block',
        plugin_dir_url( __FILE__ ) . 'build/style-index.css',
        array(),
        $asset_file['version']
    );
}

// Register hooks
add_action( 'init', __NAMESPACE__ . '\register_pricing_table_block' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_assets' );
