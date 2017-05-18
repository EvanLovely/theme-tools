module.exports = {
  src: [
    'js/**/*.js',
  ],
  dest: 'dest/',
  destName: 'all.js',
  sourceMapEmbed: false,
  uglify: true,
  babel: true,
  eslint: {
    enabled: true,
    extraSrc: [],
  },
};
