import { __ } from '@wordpress/i18n';
import { PlainText, RichText, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export function TierComponent( {
	tier,
	index,
	tiers,
	currency,
	billing,
	tierActions,
} ) {
	const {
		updateTierName,
		updateTierDescription,
		updateTierPrice,
		updateTierFeature,
		addTierFeature,
		removeTierFeature,
		updateTierButtonLabel,
		updateTierButtonUrl,
	} = tierActions;

	return (
		<div className="pricing-tier">
			<PlainText
				tagName="h3"
				className="tier-name"
				value={ tier.name }
				onChange={ ( value ) => updateTierName( index, value ) }
				placeholder={ __(
					'Enter tier name...',
					'pricing-table-plugin'
				) }
			/>
			<RichText
				tagName="p"
				className="tier-description"
				value={ tier.description }
				onChange={ ( value ) => updateTierDescription( index, value ) }
				placeholder={ __(
					'Enter tier description...',
					'pricing-table-plugin'
				) }
			/>
			<div className="tier-price">
				<span className="currency">{ currency }</span>
				<PlainText
					className="price"
					value={ tier.price.toString() }
					onChange={ ( value ) => updateTierPrice( index, value ) }
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
				{ index === 0
					? __( 'Key Features:', 'pricing-table-plugin' )
					: __(
							'Everything in %s and:',
							'pricing-table-plugin'
					  ).replace( '%s', tiers[ index - 1 ].name ) }
			</h4>
			<ul className="tier-features">
				{ ( tier.features || [] ).map( ( feature, featureIndex ) => (
					<li key={ featureIndex } className="feature-item">
						<PlainText
							value={ feature }
							onChange={ ( value ) =>
								updateTierFeature( index, featureIndex, value )
							}
							placeholder={ __(
								'Enter feature...',
								'pricing-table-plugin'
							) }
						/>
						<Button
							onClick={ () =>
								removeTierFeature( index, featureIndex )
							}
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
				onClick={ () => addTierFeature( index ) }
				className="add-feature"
			>
				{ __( 'Add Feature', 'pricing-table-plugin' ) }
			</Button>
			<div className="tier-action">
				<PlainText
					className="button-label"
					value={
						tier.buttonLabel ||
						__( 'Get Started', 'pricing-table-plugin' )
					}
					onChange={ ( value ) =>
						updateTierButtonLabel( index, value )
					}
					placeholder={ __(
						'Button text...',
						'pricing-table-plugin'
					) }
				/>
				<URLInputButton
					url={ tier.buttonUrl || '' }
					onChange={ ( url ) => updateTierButtonUrl( index, url ) }
					text={
						tier.buttonLabel ||
						__( 'Get Started', 'pricing-table-plugin' )
					}
					className="action-button-input"
				/>
			</div>
		</div>
	);
}
