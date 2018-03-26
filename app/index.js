var Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;

module.exports = class extends Generator {


    constructor(args, opts) {
        super(args, opts);
    }

    install () {
        const hasYarn = commandExists('yarn');
        const yarn = hasYarn && this.installTool === 'yarn';

        this.installDependencies({
          npm: !yarn,
          yarn,
          bower: false
        });
      }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : '组件名称'
        }, {
            type    : 'input',
            name    : 'description',
            message : '描述信息'
        }, {
          type    : 'list',
          name    : 'installTool',
          message : '安装工具',
          choices: ['yarn', 'npm'],
          default : 0
        }, {
          type    : 'confirm',
          name    : 'storybook',
          message : '需要storybook集成环境?'
        }]).then((answers) => {
            this.name = answers.name
            this.installTool = answers.installTool
            this.description = answers.description
        });
    }

    _convertNameToClass(name) {
        return name.split('-').map((part) => {
            return part.charAt(0).toUpperCase() + part.slice(1)
        }).join('')
    }

    writing() {

        this.destinationRoot(this.name)

        this.fs.copyTpl(
          this.templatePath('package.json'),
          this.destinationPath(`package.json`),
          { name: this.name,
            description: this.description
            }
        );

        const Class = this._convertNameToClass(this.name)

        this.fs.copyTpl(
            this.templatePath('src/index.js'),
            this.destinationPath(`src/${this.name}.js`),
            { name: this.name,
            Class }
          );

        this.fs.copyTpl(
            this.templatePath('stories.js'),
            this.destinationPath(`${this.name}.stories.js`),
            { name: this.name,
                Class }
          );


        this.fs.copyTpl(
            this.templatePath('readme.hbs'),
            this.destinationPath(`readme.hbs`),
            { name: this.name,
            description: this.description }
          );
      }
};