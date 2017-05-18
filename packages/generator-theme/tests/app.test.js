'use strict';

/* global describe, it, before */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-theme:app', () => {
  describe('basic files', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        themeName: 'mytheme',
        usePatternLab: false,
        useGulp: false,
        themeType: false,
      }));

    it('creates basic theme', () => {
      assert.file([
        'package.json',
      ]);
      assert.noFile([
        'gulpfile.js',
        'mytheme.info.yml',
      ]);
    });
  });

  describe('basic Drupal files', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        themeName: 'myothertheme',
        usePatternLab: false,
        useGulp: false,
        themeType: 'drupal8',
      }));

    it('creates basic theme', () => {
      assert.file([
        'myothertheme.info.yml',
        'myothertheme.libraries.yml',
        'package.json',
      ]);
      assert.noFile([
        'gulpfile.js',
      ]);
    });
  });

  describe('gulp file', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        themeName: 'mytheme',
        usePatternLab: false,
        useGulp: true,
        themeType: false,
      }));

    it('creates basic theme with gulpfile.js', () => {
      assert.file([
        'package.json',
        'gulpfile.js',
      ]);
      assert.noFile([
        'mytheme.info.yml',
        'mytheme.libraries.yml',
      ]);
    });
  });


  describe('Full Theme Options', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        themeName: 'mytheme',
        usePatternLab: false,
        useGulp: true,
        themeType: 'drupal8',
      }));

    it('creates lots of tiles', () => {
      assert.file([
        'package.json',
        'mytheme.info.yml',
        'mytheme.libraries.yml',
        'gulpfile.js',
      ]);
      assert.noFile([
      ]);
    });
  });
});
