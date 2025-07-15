<?php
/**
 * Pricing Table Plugin
 *
 * TODO: The description for the plugin scaffolded by this file.
 *
 * PHP version 8.2
 *
 * @category WordPress_Plugin
 * @package  TODO
 * @author   Marcin Wosinek <marcin.wosinek@gmail.com>
 * @license  GPLv3 <https://www.gnu.org/licenses/gpl-3.0.en.html>
 * @link     https://github.com/marcin-wosinek/pricing-table-plugin
 * @since    TODO: Date
 *
 * @wordpress-plugin
 * Plugin Name: Pricing Table Plugin
 * Plugin URI:  https://github.com/marcin-wosinek/pricing-table-plugin
 * Description: The description for the plugin scaffolded by this file.
 * Author:      Marcin Wosinek <marcin.wosinek@gmail.com>
 * Version:     1.0.0
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
        plugin_dir_url( __FILE__ ) . 'block/script.js',
        array( 'wp-blocks', 'wp-element' ),
        '1.0.0',
        true
    );
    
    wp_enqueue_style(
        'pricing-table-block',
        plugin_dir_url( __FILE__ ) . 'block/style.css',
        array(),
        '1.0.0'
    );
}

// Register hooks
add_action( 'init', __NAMESPACE__ . '\register_pricing_table_block' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_assets' );
