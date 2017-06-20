'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');

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
        filter: answer => answer.toLowerCase(),
        validate: (answer) => {
          if (answer.length === 0) return false;
          return true;
        },
      },
      {
        name: 'themeType',
        type: 'list',
        message: 'What kind of a theme is this?',
        choices: [
          {
            name: 'Drupal 8',
            value: 'drupal8',
            default: true,
          },
          {
            name: 'None',
            value: false,
          },
        ],
      },
      {
        name: 'useGulp',
        message: 'Would you like to use Gulp?',
        type: 'confirm',
      },
      {
        name: 'css',
        message: 'How do you want to handle CSS?',
        type: 'list',
        when: answers => answers.useGulp,
        choices: [
          {
            name: 'Sass',
            value: '@theme-tools/plugin-sass',
            default: true,
          },
          {
            name: 'None',
            value: false,
          },
        ],
      },
      {
        name: 'browserSync',
        message: 'Would you like to use Browser Sync?',
        type: 'confirm',
        when: answers => answers.useGulp,
      },
      {
        name: 'usePatternLab',
        message: 'Would you like to use Pattern Lab?',
        type: 'confirm',
      },
      {
        name: 'useYarn',
        message: 'Would you like to use yarn instead of npm?',
        type: 'confirm',
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
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
      private: true, // prevents `npm publish`
      scripts: {
        start: 'gulp',
        compile: 'NODE_ENV=production gulp compile',
        test: 'gulp validate',
      },
      dependencies: {},
      devDependencies: {},
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
          `${this.props.themeName}/core`,
        ],
        regions: {
          content: 'Content',
        },
      };

      // theme.libraries.yml
      const themeLibraries = {
        core: {
          css: {
            theme: {
              'dest/style.css': {
                preprocess: true,
              },
            },
          },
        },
      };

      this.fs.write(this.destinationPath(`${this.props.themeName}.info.yml`), yaml.safeDump(themeInfo));
      this.fs.write(this.destinationPath(`${this.props.themeName}.libraries.yml`), yaml.safeDump(themeLibraries));
    }

    if (this.props.useGulp) {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js.ejs'),
        this.destinationPath('gulpfile.js'),
        this.props
      );
    }

    this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  }

  install() {
    // Pattern Lab
    if (this.props.usePatternLab) {
      console.log('Installing Pattern Lab; please be patient...');
      this.spawnCommand('composer', [
        'create-project',
        'drupal-pattern-lab/edition-twig-standard',
        'pattern-lab',
      ]);
    }

    // npm dependencies
    const deps = [];

    if (this.props.useGulp) deps.push('gulpjs/gulp#4.0');
    if (this.props.css) deps.push(this.props.css);
    if (this.props.browserSync) deps.push('@theme-tools/plugin-browser-sync');
    if (this.props.usePatternLab) deps.push('@theme-tools/plugin-pattern-lab-php');

    if (deps) {
      if (this.props.useYarn) {
        this.yarnInstall(deps);
      } else {
        this.npmInstall(deps, { save: true, loglevel: 'silent' });
      }
    }
  }
};
