import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { PlainText, RichText, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export function Edit( { attributes, setAttributes, context } ) {
	const blockProps = useBlockProps();
	const {
		name,
		description,
		price,
		features,
		buttonLabel,
		buttonUrl,
		tierIndex,
		currency: savedCurrency,
		billing: savedBilling,
		color: savedColor,
		promotedTier: savedPromotedTier,
	} = attributes;

	const {
		'pricing-table-plugin/currency': contextCurrency,
		'pricing-table-plugin/billing': contextBilling,
		'pricing-table-plugin/color': contextColor,
		'pricing-table-plugin/promotedTier': contextPromotedTier,
	} = context || {};

	// Use context values if available, otherwise fall back to saved attributes
	const currency = contextCurrency || savedCurrency || '$';
	const billing = contextBilling || savedBilling || 'monthly';
	const color = contextColor || savedColor || '#009344';
	const promotedTier =
		contextPromotedTier !== undefined
			? contextPromotedTier
			: savedPromotedTier !== undefined
			? savedPromotedTier
			: -1;

	const isCurrentlyPromoted = promotedTier === tierIndex;

	const updateName = ( value ) => setAttributes( { name: value } );
	const updateDescription = ( value ) =>
		setAttributes( { description: value } );
	const updatePrice = ( value ) => {
		const numValue = parseFloat( value ) || 0;
		setAttributes( { price: numValue } );
	};
	const updateFeature = ( featureIndex, value ) => {
		const newFeatures = [ ...( features || [] ) ];
		newFeatures[ featureIndex ] = value;
		setAttributes( { features: newFeatures } );
	};
	const addFeature = () => {
		setAttributes( { features: [ ...( features || [] ), '' ] } );
	};
	const removeFeature = ( featureIndex ) => {
		const newFeatures = ( features || [] ).filter(
			( _, index ) => index !== featureIndex
		);
		setAttributes( { features: newFeatures } );
	};
	const updateButtonLabel = ( value ) =>
		setAttributes( { buttonLabel: value } );
	const updateButtonUrl = ( value ) => setAttributes( { buttonUrl: value } );

	return (
		<div { ...blockProps }>
			<div
				className={ `pricing-tier ${
					isCurrentlyPromoted ? 'promoted' : ''
				}` }
				style={ { '--pricing-table-color': color } }
			>
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
				<h4 className="features-header">
					{ tierIndex === 0
						? __( 'Key Features:', 'pricing-table-plugin' )
						: __( 'Additional Features:', 'pricing-table-plugin' ) }
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
			</div>
		</div>
	);
}
