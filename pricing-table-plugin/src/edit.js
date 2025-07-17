import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createContext } from '@wordpress/element';
import { PricingTableInspectorControls } from './inspector-controls.js';

// Create context to share data with tier blocks
export const PricingTableContext = createContext();

export function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const { currency, promotedTier, billing, color } = attributes;

	const updateCurrency = ( newCurrency ) => {
		setAttributes( { currency: newCurrency } );
	};

	const updateBilling = ( newBilling ) => {
		setAttributes( { billing: newBilling } );
	};

	const setPromotedTier = ( index ) => {
		setAttributes( { promotedTier: index } );
	};

	const updateColor = ( newColor ) => {
		setAttributes( { color: newColor } );
	};

	// Context value to share with tier blocks
	const contextValue = {
		currency,
		billing,
		promotedTier,
		color,
		setPromotedTier,
		updateCurrency,
		updateBilling,
		updateColor,
	};

	return (
		<PricingTableContext.Provider value={ contextValue }>
			<PricingTableInspectorControls
				currency={ currency }
				billing={ billing }
				promotedTier={ promotedTier }
				color={ color }
				updateCurrency={ updateCurrency }
				updateBilling={ updateBilling }
				setPromotedTier={ setPromotedTier }
				updateColor={ updateColor }
			/>
			<div { ...blockProps }>
				<div
					className="pricing-table"
					style={ { '--pricing-table-color': color } }
				>
					<InnerBlocks
						allowedBlocks={ [
							'pricing-table-plugin/pricing-tier',
						] }
						template={ [
							[
								'pricing-table-plugin/pricing-tier',
								{ name: 'Basic', price: 10 },
							],
							[
								'pricing-table-plugin/pricing-tier',
								{ name: 'Pro', price: 20 },
							],
							[
								'pricing-table-plugin/pricing-tier',
								{ name: 'Enterprise', price: 30 },
							],
						] }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</PricingTableContext.Provider>
	);
}
