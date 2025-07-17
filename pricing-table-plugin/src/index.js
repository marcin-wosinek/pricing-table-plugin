/**
 * Pricing Table Block Script
 */

import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit.js';
import { Save } from './save.js';
import { PricingTierEdit } from './pricing-tier-edit.js';
import { PricingTierSave } from './pricing-tier-save.js';
import './style.scss';

// Register main pricing table block
registerBlockType( 'pricing-table-plugin/pricing-table', {
	edit: Edit,
	save: Save,
} );

// Register pricing tier block
registerBlockType( 'pricing-table-plugin/pricing-tier', {
	edit: PricingTierEdit,
	save: PricingTierSave,
} );
