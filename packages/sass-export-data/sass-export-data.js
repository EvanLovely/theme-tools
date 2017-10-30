'use strict';

const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');
const fs = require('fs');
const path = require('path');
const jsondiff = require('jsondiffpatch');
const { createStructuredValue } = require('sass-extract/lib/struct');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);
  const args = '($file, $value, $options:())';

  // Format sass data structures to json
  // options is an empty SassList by default
  function exportData(file, value, options) {
    const filename = path.join(config.path, file.getValue());

    // Set a root key, either default or provided by options SassMap
    let root = 'sass-export-data';
    if (options.getLength() > 0) {
      // Set root key with parsed Sass data, using ES6 destructuring against sass-extract format
      const { value: { root: tempRoot } } = createStructuredValue(options);
      if (tempRoot) {
        // More destructuring against sass-extract format
        ({ value: root } = tempRoot);
      }
    }
    const output = { [root]: createStructuredValue(value) };

    // Write to disk. Fat-arrow because we simply want the parent scope vars
    const write = () => {
      fs.writeFile(filename, JSON.stringify(output, null, '  '), (writeerr) => {
        if (writeerr) throw writeerr;
        // console.log(`${filename} saved.`);
      });
    };

    // It is recommended to fs.readFile() and handle error if not exists instead of fs.exists
    fs.readFile(filename, 'utf8', (readerr, existingdata) => {
      // If the file does not exist just write file
      if (readerr && readerr.code === 'ENOENT') {
        write();
      }
      // If there already exists data in the target file
      if (existingdata) {
        // Convert existing string to object, and then compare
        const existingObject = JSON.parse(existingdata);
        // If there is no difference, then simply return and do not write file
        if (!jsondiff.diff(existingObject, output)) {
          return value;
        }
        // Otherwise write out the new, unique-values file
        write();
      }
      return value;
    });

    return value;
  }

  const sassFunctions = {};

  sassFunctions[config.name + args] = exportData;
  return sassFunctions;
};
