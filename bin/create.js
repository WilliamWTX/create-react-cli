/**
 * Created by william on 2019/7/25 14:08
 * Develop by william on 2019/7/25 14:08
 */
'use strict';

process.env.NODE_PATH = __dirname + '/../node_modules/';

const add = require('../src/add');

const list = require('../src/list');

const init = require('../src/init');

const del =  require('../src/delete');

const program = require('commander');

program.version(require('../package').version);

program.usage('<command>');

program
  .command('add')
  .description('Add a new template')
  .alias('a')
  .action(() => {
    add()
  });

program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {list()});

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {init()});

program
  .command('delete')
  .description('Delete a template')
  .alias('d')
  .action(() => {del()});

program.parse(process.argv);

if (!program.args.length) {
  program.help()
}




