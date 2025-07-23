import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export function Save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const {
		name,
		description,
		price,
		tierIndex,
		currency = '$',
		billing = 'monthly',
		color = '#009344',
		promotedTier = -1,
	} = attributes;
	const isCurrentlyPromoted = promotedTier === tierIndex;

	return (
		<div
			{ ...blockProps }
			className={ `wp-block-pricing-table-plugin-pricing-tier ${
				isCurrentlyPromoted ? 'promoted' : ''
			}` }
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
			<InnerBlocks.Content />
		</div>
	);
}
