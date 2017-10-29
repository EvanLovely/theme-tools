'use strict';

const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');
const fs = require('fs');
const path = require('path');
const jsondiff = require('jsondiffpatch');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);
  const args = '($file, $value, $options:())';

  function getValue(a) {
    let value;
    let i;
    switch (a.constructor.name) {
      case 'SassList':
        value = [];
        for (i = 0; i < a.getLength(); i++) {
          value.push(getValue(a.getValue(i)));
        }
        break;
      case 'SassMap':
        value = {};
        for (i = 0; i < a.getLength(); i++) {
          value[a.getKey(i).getValue()] = getValue(a.getValue(i));
        }
        break;
      case 'SassColor':
        if (a.getA() === 1) {
          value = `rgb(${a.getR()}, ${a.getG()}, ${a.getB()})`;
        } else {
          value = `rgba(${a.getR()}, ${a.getG()}, ${a.getB()}, ${a.getA()})`;
        }
        break;
      case 'SassNumber':
        value = a.getValue();
        if (a.getUnit()) {
          value += a.getUnit();
        }
        break;
      default:
        value = a.getValue();
    }
    return value;
  }

  function exportData(file, value) {
    const filename = path.join(config.path, file.getValue());
    const output = getValue(value);

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
