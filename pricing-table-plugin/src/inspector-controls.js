import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ColorPicker,
} from '@wordpress/components';
import { BILLING_OPTIONS } from './utils/constants.js';

export function PricingTableInspectorControls({
	currency,
	billing,
	promotedTier,
	color,
	tiers,
	updateCurrency,
	updateBilling,
	setPromotedTier,
	updateColor,
}) {
	return (
		<InspectorControls>
			<PanelBody
				title={__('Pricing Table Settings', 'pricing-table-plugin')}
			>
				<TextControl
					label={__('Currency Symbol', 'pricing-table-plugin')}
					value={currency}
					onChange={updateCurrency}
					placeholder="$"
				/>
				<SelectControl
					label={__('Billing Period', 'pricing-table-plugin')}
					value={billing}
					options={BILLING_OPTIONS.map((option) => ({
						...option,
						label: __(option.label, 'pricing-table-plugin'),
					}))}
					onChange={updateBilling}
				/>
				<SelectControl
					label={__('Promoted Tier', 'pricing-table-plugin')}
					value={promotedTier.toString()}
					options={tiers.map((tier, index) => ({
						label: tier.name || `Tier ${index + 1}`,
						value: index.toString(),
					}))}
					onChange={(value) => setPromotedTier(parseInt(value))}
				/>
				<div style={{ marginTop: '16px' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '8px',
							fontWeight: '500',
						}}
					>
						{__('Accent Color', 'pricing-table-plugin')}
					</label>
					<ColorPicker
						color={color}
						onChange={updateColor}
						enableAlpha={false}
					/>
				</div>
			</PanelBody>
		</InspectorControls>
	);
}
