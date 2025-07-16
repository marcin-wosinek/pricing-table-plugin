/**
 * Pricing Table Block Script
 */

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, PlainText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import "./style.scss";

registerBlockType("pricing-table-plugin/pricing-table", {
  edit: function ({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { tiers, currency } = attributes;

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
      updatedTiers[index] = { ...updatedTiers[index], price: numericPrice };
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
      const updatedFeatures = [...(updatedTiers[tierIndex].features || []), ""];
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: updatedFeatures,
      };
      setAttributes({ tiers: updatedTiers });
    };

    const removeTierFeature = (tierIndex, featureIndex) => {
      const updatedTiers = [...tiers];
      const updatedFeatures = updatedTiers[tierIndex].features.filter(
        (_, index) => index !== featureIndex,
      );
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: updatedFeatures,
      };
      setAttributes({ tiers: updatedTiers });
    };

    return (
      <div {...blockProps}>
        <div className="pricing-table">
          {tiers.map((tier, index) => (
            <div key={index} className="pricing-tier">
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
                <PlainText
                  className="currency"
                  value={currency}
                  onChange={updateCurrency}
                  placeholder="$"
                />
                <PlainText
                  className="price"
                  value={tier.price.toString()}
                  onChange={(value) => updateTierPrice(index, value)}
                  placeholder="0.00"
                />
              </div>
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
                      onClick={() => removeTierFeature(index, featureIndex)}
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
                {__("Add Feature", "pricing-table-plugin")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
  save: function ({ attributes }) {
    const blockProps = useBlockProps.save();
    const { tiers, currency } = attributes;

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
              </div>
              {tier.features && tier.features.length > 0 && (
                <ul className="tier-features">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
