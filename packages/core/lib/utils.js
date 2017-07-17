'use strict';

const exec = require('child_process').exec;
const merge = require('merge').recursive;
const notifier = require('node-notifier');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 * @param cb {function} - Callback to fire when done.
 */
function sh(cmd, exitOnError, cb) {
  const child = exec(cmd, {
    encoding: 'utf8',
    timeout: 1000 * 60 * 2, // 2 min; just want to make sure nothing gets detached forever.
  });
  let stdout = '';
  child.stdout.on('data', (data) => {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', (data) => {
    process.stdout.write(data);
  });
  child.on('close', (code) => {
    if (code > 0) {
      if (exitOnError) {
        if (typeof cb === 'function') {
          cb(new Error(`Error with code ${code} after running: ${cmd}`));
        } else {
          process.stdout.write(`Error with code ${code} after running: ${cmd} \n`);
          process.exit(code);
        }
      } else {
        notifier.notify({
          title: cmd,
          message: stdout,
          sound: true,
        });
      }
    }
    if (typeof cb === 'function') cb();
  });
}

/**
 * Flatten Array
 * @param arrayOfArrays {Array[]}
 * @returns {Array}
 */
function flattenArray(arrayOfArrays) {
  return [].concat.apply([], arrayOfArrays);
}

/**
 * Concat Arrays together
 * @param {Array} a - First Array
 * @param {Array} b - Second Array
 * @returns {Array} - The two arrays together.
 */
function concatArrays(a, b) {
  return [].concat(a, b);
}

/**
 * Make an array unique by removing duplicate entries.
 * @param item {Array}
 * @returns {Array}
 */
function uniqueArray(item) {
  const u = {};
  const newArray = [];
  for (let i = 0, l = item.length; i < l; ++i) {
    if (!{}.hasOwnProperty.call(u, item[i])) {
      newArray.push(item[i]);
      u[item[i]] = 1;
    }
  }
  return newArray;
}

/**
 * Prepare Error message for `done()` Gulp Task callbacks that do not contain Stack Traces.
 * @param {string} message
 * @returns {Error}
 * @see http://stackoverflow.com/a/39093327/1033782
 */
function error(message) {
  const err = new Error(message);
  err.showStack = false;
  return err;
}

/**
 * Object to Yaml
 * @param {object} object
 * @returns {string} - Yaml
 */
function toYaml(object) {
  return yaml.safeDump(object);
}

/**
 * Yaml to Object
 * @param {string} string - Yaml
 * @returns {object}
 */
function fromYaml(string) {
  return yaml.safeLoad(string);
}

/**
 * Read Yaml File into Object
 * @param {string} file - File path
 * @param {function} cb - Callback with data
 * @see readYamlFileSync
 */
function readYamlFile(file, cb) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    cb(yaml.safeLoad(data));
  });
}

/**
 * Read Yaml File into Object, synchronously
 * @param {string} file - File path
 * @see readYamlFile
 * @returns {object}
 */
function readYamlFileSync(file) {
  return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
}

/**
 * Write Yaml string to File
 * @param {string} file - File path
 * @param {object} data - Object to turn into Yaml
 * @param {function} cb - Optional callback when done
 * @see writeYamlFileSync
 */
function writeYamlFile(file, data, cb) {
  fs.writeFile(file, yaml.safeDump(data), () => {
    if (cb) cb();
  });
}

/**
 * Write Yaml string to File, synchronously
 * @param {string} file - File path
 * @param {object} data - Object to turn into Yaml
 */
function writeYamlFileSync(file, data) {
  fs.writeFileSync(file, yaml.safeDump(data));
}

module.exports = {
  sh,
  flattenArray,
  concatArrays,
  uniqueArray,
  error,
  merge,
  fromYaml,
  toYaml,
  readYamlFile,
  readYamlFileSync,
  writeYamlFile,
  writeYamlFileSync,
};
