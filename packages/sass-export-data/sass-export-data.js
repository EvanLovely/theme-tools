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

    if (fs.existsSync(filename)) {
      const oldFileString = fs.readFileSync(filename);
      try {
        const oldFile = JSON.parse(oldFileString);
        const diff = jsondiff.diff(oldFile, output);
        if (!diff) {
          return value;
        }
      } catch (error) {} // eslint-disable-line no-empty
    }

    // console.log('Writing: ', path.basename(filename));
    fs.writeFileSync(filename, JSON.stringify(output, null, '  '));
    return value;
  }

  const sassFunctions = {};

  sassFunctions[config.name + args] = exportData;
  return sassFunctions;
};
