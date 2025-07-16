/**
 * Pricing Table Block Script
 */

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, PlainText } from "@wordpress/block-editor";
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
                <span className="price">{tier.price}</span>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    );
  },
});
