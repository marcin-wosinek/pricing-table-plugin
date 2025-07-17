/**
 * Pricing Table Block Script
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	PlainText,
	URLInputButton,
	InspectorControls,
} from '@wordpress/block-editor';
import { Button, SelectControl, PanelBody, TextControl } from '@wordpress/components';
import './style.scss';

registerBlockType('pricing-table-plugin/pricing-table', {
	edit: function ({ attributes, setAttributes }) {
		const blockProps = useBlockProps();
		const { tiers, currency, promotedTier, billing } = attributes;

		const updateTierName = (index, newName) => {
			const updatedTiers = [...tiers];
			updatedTiers[index] = { ...updatedTiers[index], name: newName };
			setAttributes({ tiers: updatedTiers });
		};

		const updateCurrency = (newCurrency) => {
			setAttributes({ currency: newCurrency });
		};

		const updateTierDescription = (index, newDescription) => {
			const updatedTiers = [...tiers];
			updatedTiers[index] = {
				...updatedTiers[index],
				description: newDescription,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const updateTierPrice = (index, newPrice) => {
			const updatedTiers = [...tiers];
			const numericPrice = parseFloat(newPrice) || 0;
			updatedTiers[index] = {
				...updatedTiers[index],
				price: numericPrice,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const updateTierFeature = (tierIndex, featureIndex, newFeature) => {
			const updatedTiers = [...tiers];
			const updatedFeatures = [...updatedTiers[tierIndex].features];
			updatedFeatures[featureIndex] = newFeature;
			updatedTiers[tierIndex] = {
				...updatedTiers[tierIndex],
				features: updatedFeatures,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const addTierFeature = (tierIndex) => {
			const updatedTiers = [...tiers];
			const updatedFeatures = [
				...(updatedTiers[tierIndex].features || []),
				'',
			];
			updatedTiers[tierIndex] = {
				...updatedTiers[tierIndex],
				features: updatedFeatures,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const removeTierFeature = (tierIndex, featureIndex) => {
			const updatedTiers = [...tiers];
			const updatedFeatures = updatedTiers[tierIndex].features.filter(
				(_, index) => index !== featureIndex
			);
			updatedTiers[tierIndex] = {
				...updatedTiers[tierIndex],
				features: updatedFeatures,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const updateTierButtonLabel = (index, newLabel) => {
			const updatedTiers = [...tiers];
			updatedTiers[index] = {
				...updatedTiers[index],
				buttonLabel: newLabel,
			};
			setAttributes({ tiers: updatedTiers });
		};

		const updateTierButtonUrl = (index, newUrl) => {
			const updatedTiers = [...tiers];
			updatedTiers[index] = { ...updatedTiers[index], buttonUrl: newUrl };
			setAttributes({ tiers: updatedTiers });
		};

		const addNewTier = () => {
			const newTier = {
				name: 'New Tier',
				description: 'Description for this tier',
				price: 0,
				features: [],
				buttonLabel: 'Get Started',
				buttonUrl: '',
			};
			setAttributes({ tiers: [...tiers, newTier] });
		};

		const setPromotedTier = (index) => {
			setAttributes({ promotedTier: index });
		};

		const updateBilling = (newBilling) => {
			setAttributes({ billing: newBilling });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Pricing Table Settings', 'pricing-table-plugin')}>
						<TextControl
							label={__('Currency Symbol', 'pricing-table-plugin')}
							value={currency}
							onChange={updateCurrency}
							placeholder="$"
						/>
						<SelectControl
							label={__('Billing Period', 'pricing-table-plugin')}
							value={billing}
							options={[
								{
									label: __('Monthly', 'pricing-table-plugin'),
									value: 'monthly',
								},
								{
									label: __('Yearly', 'pricing-table-plugin'),
									value: 'yearly',
								},
							]}
							onChange={updateBilling}
						/>
						<SelectControl
							label={__('Promoted Tier', 'pricing-table-plugin')}
							value={promotedTier.toString()}
							options={tiers.map((tier, index) => ({
								label: tier.name || `Tier ${index + 1}`,
								value: index.toString(),
							}))}
							onChange={(value) => setPromotedTier(parseInt(value))}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="pricing-table">
					{tiers.map((tier, index) => (
						<div key={index} className="pricing-tier">
							<PlainText
								tagName="h3"
								className="tier-name"
								value={tier.name}
								onChange={(value) =>
									updateTierName(index, value)
								}
								placeholder="Enter tier name..."
							/>
							<RichText
								tagName="p"
								className="tier-description"
								value={tier.description}
								onChange={(value) =>
									updateTierDescription(index, value)
								}
								placeholder="Enter tier description..."
							/>
							<div className="tier-price">
								<span className="currency">{currency}</span>
								<PlainText
									className="price"
									value={tier.price.toString()}
									onChange={(value) =>
										updateTierPrice(index, value)
									}
									placeholder="0.00"
								/>
								<span className="billing-period">
									per{' '}
									{billing === 'monthly' ? 'month' : 'year'}
								</span>
							</div>
							<h4 className="features-header">
								{index === 0
									? 'Key Features:'
									: `Everything in ${tiers[index - 1].name} and:`}
							</h4>
							<ul className="tier-features">
								{(tier.features || []).map(
									(feature, featureIndex) => (
										<li
											key={featureIndex}
											className="feature-item"
										>
											<PlainText
												value={feature}
												onChange={(value) =>
													updateTierFeature(
														index,
														featureIndex,
														value
													)
												}
												placeholder="Enter feature..."
											/>
											<Button
												onClick={() =>
													removeTierFeature(
														index,
														featureIndex
													)
												}
												className="remove-feature"
												isSmall
												variant="secondary"
											>
												×
											</Button>
										</li>
									)
								)}
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
									onChange={(value) =>
										updateTierButtonLabel(index, value)
									}
									placeholder="Button text..."
								/>
								<URLInputButton
									url={tier.buttonUrl || ''}
									onChange={(url) =>
										updateTierButtonUrl(index, url)
									}
									text={tier.buttonLabel || 'Get Started'}
									className="action-button-input"
								/>
							</div>
						</div>
					))}
					{tiers.length < 3 && (
						<Button
							variant="secondary"
							onClick={addNewTier}
							className="add-tier-button"
						>
							{__('Add New Tier', 'pricing-table-plugin')}
						</Button>
					)}
				</div>
			</div>
		</>
		);
	},
	save: function ({ attributes }) {
		const blockProps = useBlockProps.save();
		const { tiers, currency, billing, promotedTier } = attributes;

		return (
			<div {...blockProps}>
				<div className="pricing-table">
					{tiers.map((tier, index) => (
						<div key={index} className="pricing-tier">
							<h3 className="tier-name">{tier.name}</h3>
							<RichText.Content
								tagName="p"
								className="tier-description"
								value={tier.description}
							/>
							<div className="tier-price">
								<span className="currency">{currency}</span>
								<span className="price">{tier.price}</span>
								<span className="billing-period">
									per{' '}
									{billing === 'monthly' ? 'month' : 'year'}
								</span>
							</div>
							{tier.features && tier.features.length > 0 && (
								<>
									<h4 className="features-header">
										{index === 0
											? 'Key Features:'
											: `Everything in ${tiers[index - 1].name} and:`}
									</h4>
									<ul className="tier-features">
										{tier.features.map(
											(feature, featureIndex) => (
												<li
													key={featureIndex}
													className="feature-item"
												>
													{feature}
												</li>
											)
										)}
									</ul>
								</>
							)}
							{tier.buttonLabel && (
								<div className="tier-action">
									<a
										href={tier.buttonUrl || '#'}
										className="action-button"
										target={
											tier.buttonUrl
												? '_blank'
												: undefined
										}
										rel={
											tier.buttonUrl
												? 'noopener noreferrer'
												: undefined
										}
									>
										{tier.buttonLabel}
									</a>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		);
	},
});
