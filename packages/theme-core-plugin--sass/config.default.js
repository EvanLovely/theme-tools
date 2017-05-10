module.exports = {
  src: [
    'scss/**/*.scss',
  ],
  dest: 'dest/',
  extraWatches: [],
  flattenDestOutput: true,
  // Stylelint - requires config file setup ~ http://stylelint.io
  lint: {
    enabled: false,
    onWatch: true,
    // in addition to linting `src`, this is added.
    extraSrc: [],
  },
  // enables additional debugging information in the output file as CSS comments
  sourceComments: false,
  sourceMapEmbed: false,
  // tell the compiler whether you want 'expanded' or 'compressed' output code
  outputStyle: 'expanded',
  // https://github.com/ai/browserslist#queries
  autoPrefixerBrowsers: [
    'last 2 versions',
    'IE >= 10',
  ],
  includePaths: [
    './node_modules',
  ],
  // http://sassdoc.com
  sassdoc: {
    enabled: true,
    dest: 'dest/sassdoc',
    verbose: false,
    basePath: '',
    exclude: [],
    theme: 'default',
    // http://sassdoc.com/customising-the-view/#sort
    sort: [
      'file',
      'group',
      'line>',
    ],
  },
};
