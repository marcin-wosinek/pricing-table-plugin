import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { PricingTableInspectorControls } from './inspector-controls.js';

const TEMPLATE = [
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Basic',
			description: 'Perfect for getting started',
			price: 9.99,
			features: [ '1 User', '10GB Storage', 'Email Support' ],
			buttonLabel: 'Get Started',
			tierIndex: 0,
		},
	],
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Pro',
			description: 'For growing businesses',
			price: 19.99,
			features: [
				'5 Users',
				'100GB Storage',
				'Priority Support',
				'Advanced Analytics',
			],
			buttonLabel: 'Choose Pro',
			tierIndex: 1,
			isPromoted: true,
		},
	],
	[
		'pricing-table-plugin/pricing-tier',
		{
			name: 'Enterprise',
			description: 'For large organizations',
			price: 49.99,
			features: [
				'Unlimited Users',
				'1TB Storage',
				'24/7 Phone Support',
				'Advanced Analytics',
				'Custom Integrations',
			],
			buttonLabel: 'Contact Sales',
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
		// Update tierIndex if it doesn't match the current position
		if ( block.attributes?.tierIndex !== index ) {
			// This will update the block's tierIndex to match its position
			updateBlockAttributes( block.clientId, { tierIndex: index } );
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
