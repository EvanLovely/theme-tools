'use strict';

/* global describe, it, before */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-theme:app', () => {
  before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ themeName: 'mytheme' }));

  it('creates basic theme', () => {
    assert.file([
      'mytheme/mytheme.info.yml'
    ]);
  });
});
