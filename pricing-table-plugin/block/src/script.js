/**
 * Pricing Table Block Script
 */

(function (blocks, element) {
  var el = element.createElement;

  blocks.registerBlockType("pricing-table-plugin/pricing-table", {
    edit: function () {
      return el(
        "div",
        { className: "pricing-table-placeholder" },
        "Pricing Table",
      );
    },
    save: function () {
      return el(
        "div",
        { className: "pricing-table-placeholder" },
        "Pricing Table",
      );
    },
  });
})(window.wp.blocks, window.wp.element);

