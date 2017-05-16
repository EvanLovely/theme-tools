module.exports = {
  src: [
    'scss/**/*.scss',
  ],
  dest: 'dest/',
  lint: {
    onWatch: true,
  },
  // https://github.com/ai/browserslist#queries
  autoPrefixerBrowsers: [
    'last 2 versions',
    'IE >= 10',
  ],
  // http://sassdoc.com
  sassdoc: {
    enabled: true,
    dest: 'dest/sassdoc',
  },
};
