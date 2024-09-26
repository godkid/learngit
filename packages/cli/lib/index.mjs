import { program } from 'commander'

import createInitCommand from '@leon_test_group/init'
// src/index.js
// 这个还没解决
// import pkg from '../package.json' assert { type: 'json' };

// console.log(pkg.version); // 输出 package.json 中的版本号

function cli(args) {
  program
    .name('good-cli')
    .usage('<command> [options]>')
    .version('1.0.1')
    .option('-d, --debug', '是否开启调试模式', false)
    
  createInitCommand(program);


  program.parse(process.argv)
}

export default cli;


