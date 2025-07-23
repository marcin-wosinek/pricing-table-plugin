import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PlainText, RichText } from '@wordpress/block-editor';

const TEMPLATE = [
	[
		'core/button',
		{
			text: 'Get Started',
			url: '',
			className: 'tier-action',
		},
	],
	[
		'core/heading',
		{
			content: 'Key features:',
			level: 4,
		},
	],
	[
		'core/list',
		{
			values: '',
		},
	],
];

export function Edit( { attributes, setAttributes, context } ) {
	const blockProps = useBlockProps();
	const {
		name,
		description,
		price,
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
		setAttributes( { price: value } );
	};

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
			<InnerBlocks
				allowedBlocks={ [ 'core/button', 'core/heading', 'core/list' ] }
				template={ TEMPLATE }
				templateLock={ true }
			/>
		</div>
	);
}
