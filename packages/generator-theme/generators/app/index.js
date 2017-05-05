'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
      }
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('theme.info.yml'),
      this.destinationPath(`${this.props.themeName}/${this.props.themeName}.info.yml`),
      this.props
    );
  }

  // install() {
  //   this.installDependencies();
  // }
};
