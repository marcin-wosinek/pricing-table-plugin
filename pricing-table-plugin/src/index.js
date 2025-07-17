/**
 * Pricing Table Block Script
 */

import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit.js';
import { Save } from './save.js';
import './style.scss';

registerBlockType( 'pricing-table-plugin/pricing-table', {
	edit: Edit,
	save: Save,
} );
