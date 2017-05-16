/* global describe, it */
/* eslint-disable import/no-extraneous-dependencies, func-names */
const chai = require('chai');
const utils = require('../lib/utils');
const path = require('path');
const os = require('os');

const assert = chai.assert;
chai.use(require('chai-fs'));

describe('Utils', () => {
  const a = {
    title: 'Hi',
    tags: ['a', 'b']
  };
  const b = `
title: Hi
tags:
  - a
  - b
    `;

  it('fromYaml', () => {
    assert.deepEqual(a, utils.fromYaml(b));
  });

  it('toYaml', () => {
    assert.equal(b.trim(), utils.toYaml(a).trim());
  });

  it('readYamlFileSync', () => {
    assert.deepEqual(a, utils.readYamlFileSync(path.join(__dirname, './samples/sample1.yml')));
  });

  it('readYamlFile', () => {
    utils.readYamlFile(path.join(__dirname, './samples/sample1.yml'), (data) => {
      assert.deepEqual(a, data);
    });
  });

  it('writeYamlFileSync', () => {
    const tempFile = path.join(os.tmpdir(), 'sample1.yml');
    utils.writeYamlFileSync(tempFile, a);
    assert.fileEqual(tempFile, path.join(__dirname, './samples/sample1.yml'));
  });

  it('writeYamlFile', () => {
    const tempFile = path.join(os.tmpdir(), 'sample1.yml');
    utils.writeYamlFile(tempFile, a, () => {
      assert.fileEqual(tempFile, path.join(__dirname, './samples/sample1.yml'));
    });
  });
});
