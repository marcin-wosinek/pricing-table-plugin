/**
 * Pricing Table Plugin - Block Registration
 */

import { registerBlockType } from '@wordpress/blocks';

// Import pricing-table block components
import { Edit as PricingTableEdit } from './blocks/pricing-table/edit.js';
import { Save as PricingTableSave } from './blocks/pricing-table/save.js';

// Import pricing-tier block components
import { Edit as PricingTierEdit } from './blocks/pricing-tier/edit.js';
import { Save as PricingTierSave } from './blocks/pricing-tier/save.js';

// Import styles
import './blocks/pricing-table/style.scss';

// Register pricing-table block
registerBlockType( 'pricing-table-plugin/pricing-table', {
	edit: PricingTableEdit,
	save: PricingTableSave,
} );

// Register pricing-tier block
registerBlockType( 'pricing-table-plugin/pricing-tier', {
	edit: PricingTierEdit,
	save: PricingTierSave,
} );
