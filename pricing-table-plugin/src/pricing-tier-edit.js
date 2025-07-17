import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	PlainText,
	RichText,
	URLInputButton,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PricingTableContext } from './edit.js';

export function PricingTierEdit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { name, description, price, features, buttonLabel, buttonUrl } =
		attributes;

	// Get context from parent pricing table
	const tableContext = useContext( PricingTableContext );
	const { currency, billing, promotedTier, setPromotedTier } =
		tableContext || {
			currency: '$',
			billing: 'monthly',
			promotedTier: -1,
			setPromotedTier: () => {},
		};

	// Calculate tier index based on position in parent block
	const tierIndex = useSelect(
		( select ) => {
			const { getBlockIndex, getBlockRootClientId } =
				select( 'core/block-editor' );
			const rootClientId = getBlockRootClientId( clientId );
			return getBlockIndex( clientId, rootClientId );
		},
		[ clientId ]
	);

	const isPromoted = tierIndex === promotedTier;

	const updateName = ( value ) => setAttributes( { name: value } );
	const updateDescription = ( value ) =>
		setAttributes( { description: value } );
	const updatePrice = ( value ) =>
		setAttributes( { price: parseFloat( value ) || 0 } );
	const updateButtonLabel = ( value ) =>
		setAttributes( { buttonLabel: value } );
	const updateButtonUrl = ( value ) => setAttributes( { buttonUrl: value } );

	const updateFeature = ( featureIndex, value ) => {
		const newFeatures = [ ...features ];
		newFeatures[ featureIndex ] = value;
		setAttributes( { features: newFeatures } );
	};

	const addFeature = () => {
		setAttributes( { features: [ ...features, '' ] } );
	};

	const removeFeature = ( featureIndex ) => {
		const newFeatures = features.filter(
			( _, index ) => index !== featureIndex
		);
		setAttributes( { features: newFeatures } );
	};

	const togglePromotion = () => {
		setPromotedTier( isPromoted ? -1 : tierIndex );
	};

	// Get previous tier name for features header
	const previousTierName = useSelect(
		( select ) => {
			if ( tierIndex === 0 ) return null;
			const { getBlocks, getBlockRootClientId } =
				select( 'core/block-editor' );
			const rootClientId = getBlockRootClientId( clientId );
			const siblingBlocks = getBlocks( rootClientId );
			const previousBlock = siblingBlocks[ tierIndex - 1 ];
			return previousBlock?.attributes?.name || 'Previous Tier';
		},
		[ tierIndex, clientId ]
	);

	return (
		<div { ...blockProps }>
			<div className={ `pricing-tier ${ isPromoted ? 'promoted' : '' }` }>
				<div className="tier-header">
					<PlainText
						tagName="h3"
						className="tier-name"
						value={ name }
						onChange={ updateName }
						placeholder={ __(
							'Enter tier name...',
							'pricing-table-plugin'
						) }
					/>
					<Button
						variant={ isPromoted ? 'primary' : 'secondary' }
						onClick={ togglePromotion }
						size="small"
					>
						{ isPromoted
							? __( 'Remove Promotion', 'pricing-table-plugin' )
							: __( 'Promote Tier', 'pricing-table-plugin' ) }
					</Button>
				</div>
				<RichText
					tagName="p"
					className="tier-description"
					value={ description }
					onChange={ updateDescription }
					placeholder={ __(
						'Enter tier description...',
						'pricing-table-plugin'
					) }
				/>
				<div className="tier-price">
					<span className="currency">{ currency }</span>
					<PlainText
						className="price"
						value={ price.toString() }
						onChange={ updatePrice }
						placeholder={ __( '0.00', 'pricing-table-plugin' ) }
					/>
					<span className="billing-period">
						{ __( 'per', 'pricing-table-plugin' ) }{ ' ' }
						{ billing === 'monthly'
							? __( 'month', 'pricing-table-plugin' )
							: __( 'year', 'pricing-table-plugin' ) }
					</span>
				</div>
				<h4 className="features-header">
					{ tierIndex === 0
						? __( 'Key Features:', 'pricing-table-plugin' )
						: __(
								'Everything in %s and:',
								'pricing-table-plugin'
						  ).replace( '%s', previousTierName ) }
				</h4>
				<ul className="tier-features">
					{ ( features || [] ).map( ( feature, featureIndex ) => (
						<li key={ featureIndex } className="feature-item">
							<PlainText
								value={ feature }
								onChange={ ( value ) =>
									updateFeature( featureIndex, value )
								}
								placeholder={ __(
									'Enter feature...',
									'pricing-table-plugin'
								) }
							/>
							<Button
								onClick={ () => removeFeature( featureIndex ) }
								className="remove-feature"
								isSmall
								variant="secondary"
							>
								×
							</Button>
						</li>
					) ) }
				</ul>
				<Button
					variant="secondary"
					onClick={ addFeature }
					className="add-feature"
				>
					{ __( 'Add Feature', 'pricing-table-plugin' ) }
				</Button>
				<div className="tier-action">
					<PlainText
						className="button-label"
						value={
							buttonLabel ||
							__( 'Get Started', 'pricing-table-plugin' )
						}
						onChange={ updateButtonLabel }
						placeholder={ __(
							'Button text...',
							'pricing-table-plugin'
						) }
					/>
					<URLInputButton
						url={ buttonUrl || '' }
						onChange={ updateButtonUrl }
						text={
							buttonLabel ||
							__( 'Get Started', 'pricing-table-plugin' )
						}
						className="action-button-input"
					/>
				</div>
			</div>
		</div>
	);
}
