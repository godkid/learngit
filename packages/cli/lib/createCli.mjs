import { program } from 'commander'
import { log } from '@leon_test_group/utils'
import path from 'node:path'
import { dirname } from 'dirname-filename-esm';
import fse from 'fs-extra';

// 获取cli的packages.json文件
const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJsonSync(pkgPath);

const LOWEST_NODE_VERSION = 14


function checkNodeVersion(){
    log.verbose('node版本', process.version)
    const version = process.version;
    const major = Number(version.slice(1).split('.')[0])
    if(major < LOWEST_NODE_VERSION){
      log.error('node版本过低，请升级到14以上')
      process.exit(1)
    }
  }
  
  function preAction(){
    // 检查node版本
    checkNodeVersion()
  }

export default function createCli(){
    log.success('version', pkg.version)
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]>')
        .version('1.0.1')
        .option('-d, --debug', '是否开启调试模式', false)
        .hook('preAction', preAction);
    
    //  program.opts()是全局定义的
    program.on('option:debug', function(){
        console.log('program.opts()', program.opts())
        if(program.opts().debug){
            log.verbose('debug', '开启调试模式')
        }

        if(program.opts().force){
            log.verbose('debug', '强制更新1')
        }
    })

    program.on('option:force', function(){
        if(program.opts().force){
            log.verbose('debug', '强制更新2')
        }
    })

    // 监听未知命令
    program.on('command:*', (operands) => {
        console.log(operands)
        log.error('未知命令：', operands.join(' '))
    })
    
    return program;
}

