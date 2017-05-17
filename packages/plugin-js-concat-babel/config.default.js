module.exports = {
  src: [
    'js/**/*.js',
  ],
  dest: 'dest/',
  destName: 'all.min.js',
  sourceMapEmbed: false,
  uglify: false,
  babel: false,
  eslint: {
    enabled: true,
    extraSrc: [
      'gulpfile.js',
    ],
  },
};
