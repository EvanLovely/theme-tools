module.exports = {
  src: [
    'js/**/*.js',
  ],
  dest: 'dest/',
  destName: 'all.js',
  sourceMapEmbed: false,
  uglify: true,
  babel: true,
  babelConfig: {}, // can contain `presets`, `plugins`, etc.
  eslint: {
    enabled: true,
    extraSrc: [],
  },
};
