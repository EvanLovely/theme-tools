'use strict';

const core = require('@theme-tools/core');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const del = require('del');
const template = require('lodash.template');
const fs = require('fs');
const path = require('path');
const defaultConfig = require('./config.default');

/**
 * Get timestamp
 * @returns {number} - Seconds.
 */
function getTimestamp() {
  return Math.round(Date.now() / 1000);
}

/**
 * Process Icon Templates
 * @param {string} srcFile - Path to lodash template file.
 * @param {string} destFile - Path to write processed file to.
 * @param {object} data - Data to pass to template.
 * @param {function} cb - Callback for when done.
 */
function processIconTemplate(srcFile, destFile, data, cb) {
  fs.readFile(srcFile, 'utf8', (err, srcFileContents) => {
    if (err) throw err;
    const result = template(srcFileContents, {
      // Use custom template delimiters of `{{` and `}}`.
      interpolate: /{{([\s\S]+?)}}/g,
      // Use custom evaluate delimiters of `{%` and `%}`.
      evaluate: /{%([\s\S]+?)%}/g,
    })(data);
    fs.writeFile(destFile, result, cb);
  });
}

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  /**
   * Build font icons from SVG files and optionally make scss and demo templates.
   * @param done {function} - Callback when all done.
   */
  function icons(done) {
    const stream = gulp.src(config.src)
      .pipe(iconfont({
        fontName: config.iconName,
        appendUniconde: true,
        formats: config.formats,
        timestamp: config.useTimestamp ? getTimestamp() : 0,
        autohint: config.autohint,
        normalize: config.normalize,
      }));
    // write icons to disk
    stream.pipe(gulp.dest(config.dest));

    // reload browser
    core.events.emit('reload');

    if (config.templates.enabled && config.templates.sets.length) {
      stream.on('glyphs', (glyphs) => {
        // console.log(glyphs);
        const iconData = {
          glyphs: glyphs.map(glyph => ({ // returns the object
            name: glyph.name,
            content: glyph.unicode[0].toString(16).toUpperCase(),
          })),
          fontName: config.iconName,
          fontPath: config.fontPathPrefix,
          classNamePrefix: config.classNamePrefix,
        };

        Promise.all(config.templates.sets.map(set => new Promise((resolve, reject) => {
          processIconTemplate(set.src, set.dest, iconData, (err) => {
            if (err) reject();
            resolve();
          });
        }))).then(() => done());
      });
    } else {
      done();
    }
  }

  icons.description = 'Build font icons from SVG files';

  function watchIcons() {
    const src = [config.src];
    if (config.templates.enabled && config.templates.sets.length) {
      config.templates.sets.forEach(set => src.push(set.src));
    }
    return gulp.watch(src, icons);
  }

  watchIcons.description = 'Watch icons';

  function cleanIcons(done) {
    const toClean = [path.join(config.dest, `${config.iconName}.*`)];

    if (config.templates.enabled && config.templates.sets.length) {
      config.templates.sets.forEach(set => toClean.push(set.dest));
    }

    del(toClean, { force: true }).then(() => done());
  }

  cleanIcons.description = 'Delete compiled icon files and template files';

  return {
    compile: icons,
    watch: watchIcons,
    clean: cleanIcons,
  };
};
