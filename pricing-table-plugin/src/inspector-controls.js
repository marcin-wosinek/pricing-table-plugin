import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ColorPicker,
} from '@wordpress/components';
import { BILLING_OPTIONS } from './utils/constants.js';

export function PricingTableInspectorControls( {
	currency,
	billing,
	promotedTier,
	color,
	updateCurrency,
	updateBilling,
	setPromotedTier,
	updateColor,
} ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Pricing Table Settings', 'pricing-table-plugin' ) }
			>
				<TextControl
					label={ __( 'Currency Symbol', 'pricing-table-plugin' ) }
					value={ currency }
					onChange={ updateCurrency }
					placeholder="$"
				/>
				<SelectControl
					label={ __( 'Billing Period', 'pricing-table-plugin' ) }
					value={ billing }
					options={ BILLING_OPTIONS.map( ( option ) => ( {
						...option,
						label: __( option.label, 'pricing-table-plugin' ),
					} ) ) }
					onChange={ updateBilling }
				/>
				<SelectControl
					label={ __( 'Promoted Tier', 'pricing-table-plugin' ) }
					value={ promotedTier.toString() }
					options={ [
						{
							label: __( 'None', 'pricing-table-plugin' ),
							value: '-1',
						},
						{
							label: __( 'First Tier', 'pricing-table-plugin' ),
							value: '0',
						},
						{
							label: __( 'Second Tier', 'pricing-table-plugin' ),
							value: '1',
						},
						{
							label: __( 'Third Tier', 'pricing-table-plugin' ),
							value: '2',
						},
					] }
					onChange={ ( value ) =>
						setPromotedTier( parseInt( value ) )
					}
				/>
				<div style={ { marginTop: '16px' } }>
					<label
						style={ {
							display: 'block',
							marginBottom: '8px',
							fontWeight: '500',
						} }
					>
						{ __( 'Accent Color', 'pricing-table-plugin' ) }
					</label>
					<ColorPicker
						color={ color }
						onChange={ updateColor }
						enableAlpha={ false }
					/>
				</div>
			</PanelBody>
		</InspectorControls>
	);
}
