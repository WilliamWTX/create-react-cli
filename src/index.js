/**
 * Created by william on 2019/7/24 18:30
 * Develop by william on 2019/7/24 18:30
 */
const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");

program
  .version(require('../package').version, "-v, --version")
  .command("init <name>", 'init projects')
  .action(name => {
    if (fs.existsSync(name)) {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red("项目已存在"));
      return;
    }
    inquirer
      .prompt([
        {
          name: "description",
          message: "请输入项目描述"
        },
        {
          name: "author",
          message: "请输入作者名称"
        }
      ])
      .then(answers => {
        download(
          "https://github.com/facebook/create-react-app.git#master",
          name,
          { clone: true },
          err => {
            const spinner = ora("正在下载模板...");
            spinner.start();
            if (!err) {
              spinner.succeed();
              const meta = {
                name,
                description: answers.description,
                author: answers.author
              };
              const fileName = `${name}/package.json`;
              if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString();
                const result = handlebars.compile(content)(meta);
                fs.writeFileSync(fileName, result);
              }
              console.log(symbols.success, chalk.green("项目初始化完成"));
            } else {
              spinner.fail();
              console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
            }
          }
        );
      });
  });
//解析命令行
program.parse(process.argv);
