module.exports = {
  src: [
    'scss/**/*.scss',
  ],
  dest: 'dest/',
  extraWatches: [],
  flattenDestOutput: true,
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
  // Stylelint - requires config file setup ~ http://stylelint.io
  lint: {
    enabled: false,
    onWatch: true,
  },
  // http://sassdoc.com
  sassdoc: {
    enabled: false,
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
  // https://www.npmjs.com/package/node-sass#functions--v300---experimental
  functions: {},
  // https://www.npmjs.com/package/node-sass#importer--v200---experimental
  importers: [],
  exportData: {
    enabled: false,
    path: '',
    name: '',
  },
};
