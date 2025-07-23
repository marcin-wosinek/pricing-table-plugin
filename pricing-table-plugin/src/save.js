import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { tiers, currency, billing, promotedTier, color } = attributes;

  return (
    <div {...blockProps}>
      <div className="pricing-table" style={{ "--pricing-table-color": color }}>
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`pricing-tier ${
              index === promotedTier ? "promoted" : ""
            }`}
          >
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
                {__("per", "pricing-table-plugin")}{" "}
                {billing === "monthly"
                  ? __("month", "pricing-table-plugin")
                  : __("year", "pricing-table-plugin")}
              </span>
            </div>
            {tier.buttonLabel && (
              <div className="tier-action">
                <a
                  href={tier.buttonUrl || "#"}
                  className="action-button"
                  target={tier.buttonUrl ? "_blank" : undefined}
                  rel={tier.buttonUrl ? "noopener noreferrer" : undefined}
                >
                  {tier.buttonLabel}
                </a>
              </div>
            )}
            {tier.features && tier.features.length > 0 && (
              <>
                <h4 className="features-header">
                  {index === 0
                    ? __("Key Features:", "pricing-table-plugin")
                    : __(
                        "Everything in %s and:",
                        "pricing-table-plugin",
                      ).replace("%s", tiers[index - 1].name)}
                </h4>
                <ul className="tier-features">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
