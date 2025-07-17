import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createContext } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { PricingTableInspectorControls } from './inspector-controls.js';

// Create context to share data with tier blocks
export const PricingTableContext = createContext();

export function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { currency, promotedTier, billing, color } = attributes;

	// Get current inner blocks count
	const innerBlocks = useSelect(
		( select ) => {
			const { getBlocks } = select( 'core/block-editor' );
			return getBlocks( clientId );
		},
		[ clientId ]
	);

	const { insertBlock } = useDispatch( 'core/block-editor' );

	// Custom block appender component
	const CustomBlockAppender = () => {
		const maxTiers = 3;
		const canAddTier = innerBlocks.length < maxTiers;

		const addTierBlock = () => {
			const newTierBlock = wp.blocks.createBlock(
				'pricing-table-plugin/pricing-tier',
				{
					name: `Tier ${ innerBlocks.length + 1 }`,
					price: ( innerBlocks.length + 1 ) * 10,
				}
			);
			insertBlock( newTierBlock, innerBlocks.length, clientId );
		};

		if ( ! canAddTier ) {
			return null;
		}

		return (
			<div className="add-tier-appender">
				<Button
					variant="secondary"
					onClick={ addTierBlock }
					className="add-tier-button"
					icon="plus"
				>
					{ __( 'Add Tier', 'pricing-table-plugin' ) } (
					{ innerBlocks.length }/{ maxTiers })
				</Button>
			</div>
		);
	};

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
						renderAppender={ CustomBlockAppender }
						templateLock={ false }
					/>
				</div>
			</div>
		</PricingTableContext.Provider>
	);
}
