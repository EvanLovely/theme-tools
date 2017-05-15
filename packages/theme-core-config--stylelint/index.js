module.exports = {
  extends: 'stylelint-config-standard',
  defaultSeverity: 'error',
  rules: {
    'max-empty-lines': 2,
    'max-line-length': 80,
    'at-rule-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'selector-no-id': true,
  },
};
