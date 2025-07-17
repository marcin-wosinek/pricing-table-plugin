import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export function Save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { color } = attributes;

	return (
		<div { ...blockProps }>
			<div
				className="pricing-table"
				style={ { '--pricing-table-color': color } }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
