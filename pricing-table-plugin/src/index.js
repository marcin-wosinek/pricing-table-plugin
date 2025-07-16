/**
 * Pricing Table Block Script
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

registerBlockType("pricing-table-plugin/pricing-table", {
  edit: function () {
    const blockProps = useBlockProps();
    
    return (
      <div {...blockProps}>
        <div className="pricing-table-placeholder">
          {__('Pricing Table', 'pricing-table-plugin')}
        </div>
      </div>
    );
  },
  save: function () {
    const blockProps = useBlockProps.save();
    
    return (
      <div {...blockProps}>
        <div className="pricing-table-placeholder">
          {__('Pricing Table', 'pricing-table-plugin')}
        </div>
      </div>
    );
  },
});

