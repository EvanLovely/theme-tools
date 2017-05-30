/* global describe, it, before */
/* eslint-disable import/no-extraneous-dependencies, func-names */
const chai = require('chai');
const join = require('path').join;
const iconTasks = require('./icon-tasks');

const assert = chai.assert;
chai.use(require('chai-fs'));

const dest = join(__dirname, './dest');
const expected = join(__dirname, './expected');

describe('Icon Basics', function () {
  this.timeout(5000);
  before((done) => {
    iconTasks.clean(() => {
      iconTasks.compile(() => {
        // done callback is called before all disk writes are done.
        setTimeout(() => {
          done();
        }, 1000);
      });
    });
  });

  describe('Icon compiles files', () => {
    it('Compiles and makes all files', () => {
      assert.directoryDeepEqual(dest, expected, 'Directories do not match.');
      assert.fileEqual(join(dest, '_icons-settings.scss'), join(expected, '_icons-settings.scss'));
      assert.fileEqual(join(dest, 'icons.twig'), join(expected, 'icons.twig'));
    });
  });
});
