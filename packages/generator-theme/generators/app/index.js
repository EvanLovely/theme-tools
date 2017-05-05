'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');
const pkg = require('../../package.json');

const repoVer = pkg.version;

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the transcendent ${chalk.red('generator-theme')} generator!`
    ));

    const prompts = [
      {
        name: 'themeName',
        message: 'What theme name would you like?',
        filter: answer => answer.toLowerCase()
      },
      {
        name: 'themeType',
        type: 'list',
        message: 'What kind of a theme is this?',
        choices: [
          {
            name: 'Drupal 8',
            value: 'drupal8',
            default: true
          },
          {
            name: 'None',
            value: false
          }
        ]
      },
      {
        name: 'useGulp',
        message: 'Would you like to use Gulp?',
        type: 'confirm'
      },
      {
        name: 'css',
        message: 'How do you want to handle CSS?',
        type: 'list',
        when: answers => answers.useGulp,
        choices: [
          {
            name: 'Sass',
            value: 'theme-core-plugin--sass',
            default: true
          },
          {
            name: 'None',
            value: false
          }
        ]
      },
      {
        name: 'browserSync',
        message: 'Would you like to use Browser Sync?',
        type: 'confirm',
        when: answers => answers.useGulp
      }
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.repoVer = repoVer;
    });
  }

  writing() {
    // console.log(this.props);

    this.destinationRoot(this.props.themeName);

    // package.json
    const packageJson = {
      name: this.props.themeName,
      description: `${this.props.themeName} theme`,
      version: '0.1.0',
      scripts: {},
      dependencies: {},
      devDependencies: {}
    };

    if (this.props.themeType === 'drupal8') {
      // theme.info.yml
      const themeInfo = {
        name: this.props.themeName,
        type: 'theme',
        description: 'A theme',
        'base theme': 'stable',
        core: '8.x',
        libraries: [
          `${this.props.themeName}/core`
        ],
        regions: {
          content: 'Content'
        }
      };

      // theme.libraries.yml
      const themeLibraries = {
        core: {
          css: {
            theme: {
              'dest/style.css': {
                preprocess: true
              }
            }
          }
        }
      };

      this.fs.write(this.destinationPath(`${this.props.themeName}.info.yml`), yaml.safeDump(themeInfo));
      this.fs.write(this.destinationPath(`${this.props.themeName}.libraries.yml`), yaml.safeDump(themeLibraries));
    }

    if (this.props.useGulp) {
      packageJson.dependencies.gulp = 'gulpjs/gulp#4.0';
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this.props
      );
    }

    if (this.props.css) {
      packageJson.dependencies[this.props.css] = `^${this.props.repoVer}`;
    }

    if (this.props.browserSync) {
      packageJson.dependencies['theme-core-plugin--browser-sync'] = `^${this.props.repoVer}`;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  }

  // install() {
  //   this.npmInstall();
  // }
};
