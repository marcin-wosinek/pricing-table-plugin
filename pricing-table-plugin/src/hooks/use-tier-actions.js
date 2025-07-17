import { DEFAULT_TIER } from '../utils/constants.js';

export function useTierActions(tiers, setAttributes) {
	const updateTierName = (index, newName) => {
		const updatedTiers = [...tiers];
		updatedTiers[index] = { ...updatedTiers[index], name: newName };
		setAttributes({ tiers: updatedTiers });
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
		setAttributes({ tiers: [...tiers, DEFAULT_TIER] });
	};

	return {
		updateTierName,
		updateTierDescription,
		updateTierPrice,
		updateTierFeature,
		addTierFeature,
		removeTierFeature,
		updateTierButtonLabel,
		updateTierButtonUrl,
		addNewTier,
	};
}
