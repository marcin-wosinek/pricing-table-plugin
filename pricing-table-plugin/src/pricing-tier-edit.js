import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	PlainText,
	RichText,
	URLInputButton,
	InnerBlocks,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
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

	// Get inner blocks for features
	const featureBlocks = useSelect(
		( select ) => {
			const { getBlocks } = select( 'core/block-editor' );
			return getBlocks( clientId );
		},
		[ clientId ]
	);

	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	// Helper function to extract text content from different block types
	const extractBlockContent = ( block ) => {
		switch ( block.name ) {
			case 'core/list-item':
				return block.attributes.content || '';
			case 'core/paragraph':
				return block.attributes.content || '';
			case 'core/heading':
				return block.attributes.content || '';
			case 'core/quote':
				return block.attributes.value || '';
			case 'core/image':
				return (
					block.attributes.alt ||
					block.attributes.caption ||
					'[Image]'
				);
			case 'core/separator':
				return '[Separator]';
			case 'core/spacer':
				return '[Spacer]';
			case 'core/buttons':
				return '[Buttons]';
			case 'core/list':
				return '[List]';
			default:
				return block.attributes.content || '[Block]';
		}
	};

	// Sync features array with InnerBlocks (initial load)
	useEffect( () => {
		if ( features && features.length > 0 && featureBlocks.length === 0 ) {
			const newBlocks = features.map( ( feature ) =>
				wp.blocks.createBlock( 'core/list-item', { content: feature } )
			);
			replaceInnerBlocks( clientId, newBlocks );
		}
	}, [ features, featureBlocks.length ] );

	// Sync InnerBlocks back to features array
	useEffect( () => {
		const blockFeatures = featureBlocks.map( extractBlockContent );

		// Only update if content actually changed
		if ( JSON.stringify( blockFeatures ) !== JSON.stringify( features ) ) {
			setAttributes( { features: blockFeatures } );
		}
	}, [ featureBlocks ] );

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
				<div className="tier-features">
					<InnerBlocks
						allowedBlocks={ [ 'core/list-item', 'core/list' ] }
						template={ ( features || [] ).map( ( feature ) => [
							'core/list-item',
							{ content: feature },
						] ) }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
						placeholder={ __(
							'Add features for this tier...',
							'pricing-table-plugin'
						) }
						__experimentalCaptureToolbars={ true }
						__experimentalPassSelection={ true }
						orientation="vertical"
					/>
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
			</div>
		</div>
	);
}
