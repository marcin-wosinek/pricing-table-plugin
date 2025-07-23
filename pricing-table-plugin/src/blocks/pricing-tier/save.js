import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export function Save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const {
		name,
		description,
		price,
		features,
		buttonLabel,
		buttonUrl,
		tierIndex,
		currency = '$',
		billing = 'monthly',
		color = '#009344',
		promotedTier = -1,
	} = attributes;
	const isCurrentlyPromoted = promotedTier === tierIndex;

	return (
		<div { ...blockProps }>
			<div
				className={ `pricing-tier ${
					isCurrentlyPromoted ? 'promoted' : ''
				}` }
				style={ { '--pricing-table-color': color } }
			>
				{ isCurrentlyPromoted && (
					<div className="best-value-badge">
						{ __( 'Best value', 'pricing-table-plugin' ) }
					</div>
				) }
				<h3 className="tier-name">{ name }</h3>
				<RichText.Content
					tagName="p"
					className="tier-description"
					value={ description }
				/>
				<div className="tier-price">
					<span className="currency">{ currency }</span>
					<span className="price">{ price }</span>
					<span className="billing-period">
						{ __( 'per', 'pricing-table-plugin' ) }{ ' ' }
						{ billing === 'monthly'
							? __( 'month', 'pricing-table-plugin' )
							: __( 'year', 'pricing-table-plugin' ) }
					</span>
				</div>
				{ buttonLabel && (
					<div className="tier-action">
						<a
							href={ buttonUrl || '#' }
							className="action-button"
							target={ buttonUrl ? '_blank' : undefined }
							rel={
								buttonUrl ? 'noopener noreferrer' : undefined
							}
						>
							{ buttonLabel }
						</a>
					</div>
				) }
				{ features && features.length > 0 && (
					<>
						<h4 className="features-header">
							{ tierIndex === 0
								? __( 'Key Features:', 'pricing-table-plugin' )
								: __(
										'Additional Features:',
										'pricing-table-plugin'
								  ) }
						</h4>
						<ul className="tier-features">
							{ ( features || [] ).map(
								( feature, featureIndex ) => (
									<li
										key={ featureIndex }
										className="feature-item"
									>
										{ feature }
									</li>
								)
							) }
						</ul>
					</>
				) }
			</div>
		</div>
	);
}
