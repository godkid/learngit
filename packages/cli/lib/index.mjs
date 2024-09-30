
import createInitCommand from '@leon_test_group/init'
// import { isDebug, log } from '@leon_test_group/utils'
import createCli from './createCli.mjs'
// import './exception.mjs'

// import chalk from 'chalk'


// src/index.js
// 这个还没解决
// import pkg from '../package.json' assert { type: 'json' };

// console.log(pkg.version); // 输出 package.json 中的版本号

function cli() {
  const program =  createCli()
  createInitCommand(program)
  program.parse(process.argv)
}




export default cli;


