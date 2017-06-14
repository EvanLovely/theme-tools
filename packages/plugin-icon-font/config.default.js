module.exports = {
  src: 'images/icons/src/*.svg',
  dest: 'dest/',
  fontPathPrefix: '',
  classNamePrefix: 'icon',
  iconName: 'icons',
  autohint: false,
  normalize: true,
  templates: {
    enabled: false,
    sets: [
      {
        src: 'images/icons/templates/_icons-settings.scss',
        dest: 'source/_patterns/01-atoms/images/_icons-settings.scss',
      },
      {
        src: 'images/icons/templates/icons.twig',
        dest: 'source/_patterns/01-atoms/images/icons.twig',
      },
    ],
  },
  formats: [
    'ttf',
    'eot',
    'woff',
    'svg',
  ],
};
