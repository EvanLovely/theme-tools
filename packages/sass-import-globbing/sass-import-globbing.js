'use strict';

const glob = require('glob');
const debug = require('debug')('@theme-tools/sass-import-globbing');
const path = require('path');

/**
 * @param url {string} - the path in import as-is, which LibSass encountered
 * @param prev {string} - the previously resolved path
 * @param importerDone {function} - a callback function to invoke on async completion
 * @returns {*}
 */
function sassImportGlobbing(url, prev, importerDone) { // eslint-disable-line consistent-return
  // console.log('url: ', url);
  // console.log('prev: ', prev);
  if (!glob.hasMagic(url)) {
    // console.log('---');
    return url;
  }
  // console.log('this: ', this);
  glob(url, {
    cwd: path.dirname(prev),
    ignore: path.basename(prev), // don't import self basically
  }, (err, matches) => {
    // Building an in-memory file that contains all fleshed out @import statements
    const inMemImportFile = matches
      .map(match => `@import "${path.resolve(path.dirname(prev), match)}";`)
      .join('\n');
    debug(`Globs found in @import statements (${url}) in ${prev}, expanding to:`);
    debug(inMemImportFile);
    importerDone({
      contents: inMemImportFile,
    });
    debug('----------------');
  });
}

module.exports = sassImportGlobbing;
