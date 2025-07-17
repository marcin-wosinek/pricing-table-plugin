import { __ } from '@wordpress/i18n';
import { PlainText, RichText, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export function TierComponent({
	tier,
	index,
	tiers,
	currency,
	billing,
	tierActions,
}) {
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
				value={tier.name}
				onChange={(value) => updateTierName(index, value)}
				placeholder="Enter tier name..."
			/>
			<RichText
				tagName="p"
				className="tier-description"
				value={tier.description}
				onChange={(value) => updateTierDescription(index, value)}
				placeholder="Enter tier description..."
			/>
			<div className="tier-price">
				<span className="currency">{currency}</span>
				<PlainText
					className="price"
					value={tier.price.toString()}
					onChange={(value) => updateTierPrice(index, value)}
					placeholder="0.00"
				/>
				<span className="billing-period">
					per {billing === 'monthly' ? 'month' : 'year'}
				</span>
			</div>
			<h4 className="features-header">
				{index === 0
					? 'Key Features:'
					: `Everything in ${tiers[index - 1].name} and:`}
			</h4>
			<ul className="tier-features">
				{(tier.features || []).map((feature, featureIndex) => (
					<li key={featureIndex} className="feature-item">
						<PlainText
							value={feature}
							onChange={(value) =>
								updateTierFeature(index, featureIndex, value)
							}
							placeholder="Enter feature..."
						/>
						<Button
							onClick={() =>
								removeTierFeature(index, featureIndex)
							}
							className="remove-feature"
							isSmall
							variant="secondary"
						>
							×
						</Button>
					</li>
				))}
			</ul>
			<Button
				variant="secondary"
				onClick={() => addTierFeature(index)}
				className="add-feature"
			>
				{__('Add Feature', 'pricing-table-plugin')}
			</Button>
			<div className="tier-action">
				<PlainText
					className="button-label"
					value={tier.buttonLabel || 'Get Started'}
					onChange={(value) => updateTierButtonLabel(index, value)}
					placeholder="Button text..."
				/>
				<URLInputButton
					url={tier.buttonUrl || ''}
					onChange={(url) => updateTierButtonUrl(index, url)}
					text={tier.buttonLabel || 'Get Started'}
					className="action-button-input"
				/>
			</div>
		</div>
	);
}
