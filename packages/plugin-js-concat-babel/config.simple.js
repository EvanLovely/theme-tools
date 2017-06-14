module.exports = {
  src: [
    'js/**/*.js',
  ],
  dest: 'dest/',
  destName: 'all.js',
  uglify: true,
  babel: true,
  babelConfig: {
    presets: ['babel-preset-es2015'].map(require.resolve),
  },
};
