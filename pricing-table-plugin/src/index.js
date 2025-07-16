/**
 * Pricing Table Block Script
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

registerBlockType("pricing-table-plugin/pricing-table", {
  edit: function ({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { tiers, currency } = attributes;
    
    const updateTierName = (index, newName) => {
      const updatedTiers = [...tiers];
      updatedTiers[index] = { ...updatedTiers[index], name: newName };
      setAttributes({ tiers: updatedTiers });
    };
    
    return (
      <div {...blockProps}>
        <div className="pricing-table">
          {tiers.map((tier, index) => (
            <div key={index} className="pricing-tier">
              <h3 
                className="tier-name"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onBlur={(e) => updateTierName(index, e.target.textContent)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                  }
                }}
              >
                {tier.name}
              </h3>
              <p className="tier-description">{tier.description}</p>
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
  save: function ({ attributes }) {
    const blockProps = useBlockProps.save();
    const { tiers, currency } = attributes;
    
    return (
      <div {...blockProps}>
        <div className="pricing-table">
          {tiers.map((tier, index) => (
            <div key={index} className="pricing-tier">
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-description">{tier.description}</p>
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

