const path = require('path');

const iconTasks = require('../')({
  src: path.join(__dirname, 'src/*.svg'),
  dest: path.join(__dirname, 'dest/'),
  templates: {
    enabled: true,
    sets: [
      {
        src: path.join(__dirname, 'src/_icons-settings.scss'),
        dest: path.join(__dirname, 'dest/_icons-settings.scss'),
      },
      {
        src: path.join(__dirname, 'src/icons.twig'),
        dest: path.join(__dirname, 'dest/icons.twig'),
      },
    ],
  },
});

module.exports = iconTasks;
