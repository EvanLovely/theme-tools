module.exports = {
  // src: [
  //   'scss/**/*.scss',
  // ],
  // dest: 'dest/',
  enabled: true,
  // Source html files. If using Twig.js, these will be .twig files
  sources: [
    'src/index.html',
  ],
  dest: 'build/',
  // Html Validator
  lint: true,
  // Twig.js, Javascript implementation of Twig
  twig: {
    enabled: true,
    // Directory of pratials
    baseDir: 'src/templates/',
  },
};
