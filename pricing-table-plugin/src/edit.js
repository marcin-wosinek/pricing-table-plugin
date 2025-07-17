import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { PricingTableInspectorControls } from './inspector-controls.js';
import { TierComponent } from './tier-component.js';
import { useTierActions } from './hooks/use-tier-actions.js';

export function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const { tiers, currency, promotedTier, billing, color } = attributes;

	const tierActions = useTierActions( tiers, setAttributes );

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
					{ tiers.map( ( tier, index ) => (
						<TierComponent
							key={ index }
							tier={ tier }
							index={ index }
							tiers={ tiers }
							currency={ currency }
							billing={ billing }
							tierActions={ tierActions }
						/>
					) ) }
					{ tiers.length < 3 && (
						<Button
							variant="secondary"
							onClick={ tierActions.addNewTier }
							className="add-tier-button"
						>
							{ __( 'Add New Tier', 'pricing-table-plugin' ) }
						</Button>
					) }
				</div>
			</div>
		</>
	);
}
