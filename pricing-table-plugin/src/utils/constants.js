import { __ } from '@wordpress/i18n';

export const DEFAULT_TIER = {
	name: __( 'New Tier', 'pricing-table-plugin' ),
	description: __( 'Description for this tier', 'pricing-table-plugin' ),
	price: 0,
	features: [],
	buttonLabel: __( 'Get Started', 'pricing-table-plugin' ),
	buttonUrl: '',
};

export const BILLING_OPTIONS = [
	{ label: __( 'Monthly', 'pricing-table-plugin' ), value: 'monthly' },
	{ label: __( 'Yearly', 'pricing-table-plugin' ), value: 'yearly' },
];
