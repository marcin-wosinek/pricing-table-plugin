import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export function PricingTierSave( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { name, description, price, features, buttonLabel, buttonUrl } =
		attributes;

	return (
		<div { ...blockProps }>
			<div className="pricing-tier">
				<h3 className="tier-name">{ name }</h3>
				<RichText.Content
					tagName="p"
					className="tier-description"
					value={ description }
				/>
				<div className="tier-price">
					<span className="price">{ price }</span>
				</div>
				<h4 className="features-header">
					{ __( 'Features:', 'pricing-table-plugin' ) }
				</h4>
				<div className="tier-features">
					<InnerBlocks.Content />
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
			</div>
		</div>
	);
}
