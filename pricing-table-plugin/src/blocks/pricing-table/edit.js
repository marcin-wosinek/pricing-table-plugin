import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { PricingTableInspectorControls } from './inspector-controls.js';

const TEMPLATE = [
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Starter',
			description: 'Perfect for individuals and small projects',
			price: 15,
			tierIndex: 0,
		},
	],
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Professional',
			description: 'Best for growing teams and businesses',
			price: 35,
			tierIndex: 1,
			isPromoted: true,
		},
	],
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Enterprise',
			description: 'Advanced features for large organizations',
			price: 75,
			tierIndex: 2,
		},
	],
];

export function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { currency, billing, color, promotedTier } = attributes;

	// Get inner blocks (pricing-tier blocks) to populate promoted tier dropdown
	const innerBlocks = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlocks( clientId );
		},
		[ clientId ]
	);

	// Get dispatch function for updating block attributes
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// Extract tier information from inner blocks and update tier indices
	const tiers = innerBlocks.map( ( block, index ) => {
		const oldTierIndex = block.attributes?.tierIndex;
		const isPromoted = block.attributes?.isPromoted;

		// Update tierIndex if it doesn't match the current position
		if ( oldTierIndex !== index ) {
			// This will update the block's tierIndex to match its position
			updateBlockAttributes( block.clientId, { tierIndex: index } );
		}

		// If this tier was promoted (isPromoted: true), update parent's promotedTier to new index
		if ( isPromoted && promotedTier !== index ) {
			setAttributes( { promotedTier: index } );
		}

		return {
			name: block.attributes?.name || `Tier ${ index + 1 }`,
			index,
		};
	} );

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

	// Sync table-level properties to all child tier blocks
	useEffect( () => {
		innerBlocks.forEach( ( block ) => {
			updateBlockAttributes( block.clientId, {
				currency,
				billing,
				color,
				promotedTier,
			} );
		} );
	}, [
		currency,
		billing,
		color,
		promotedTier,
		innerBlocks,
		updateBlockAttributes,
	] );

	return (
		<>
			<PricingTableInspectorControls
				currency={ currency }
				billing={ billing }
				promotedTier={ promotedTier }
				color={ color }
				tiers={ tiers }
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
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={
							innerBlocks.length < 3
								? InnerBlocks.DefaultBlockAppender
								: false
						}
					/>
				</div>
			</div>
		</>
	);
}
