const chai = require('chai');
chai.use(require('chai-fs'));
const assert = chai.assert;
const join = require('path').join;
const execSync = require('child_process').execSync;

describe('Sass Basics', function() {
  before(function() {
    try {
      const output = execSync('gulp css', {
        cwd: join(__dirname, 'basics'),
        encoding: 'utf8',
      });
      console.log(output);
    } catch(e) {
      console.error('Could not run gulp command beforehand.', e);
    }
  });
  it('Compiles Sass to CSS', function() {
    assert.directoryDeepEqual(join(__dirname, './basics/dest'), join(__dirname, './basics/expected'), 'Directories do not match.');
  });
});
