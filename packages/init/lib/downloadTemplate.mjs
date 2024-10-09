import {printErrorLog, log} from '@leon_test_group/utils'
import ora from 'ora'
import path from 'node:path';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import { execa } from 'execa';



function getCacheDir(targetPath){
    return path.resolve(targetPath, 'node_modules')
}

function makeCacheDir(targetPath){
    const cacheDir = getCacheDir(targetPath)
    if(!pathExistsSync(cacheDir)){
        fse.mkdirpSync(cacheDir)
    }
}


async function downloadAddTemplate(targetPath, selectedTemplate){
    const { npmName, version }  = selectedTemplate;
    const installCommand = `npm`;
    const installArgs = ['install', `${npmName}@${version}`]
    const cwd = targetPath;
    log.verbose('installArgs', installArgs)
    log.verbose('cwd', cwd)
    await execa(installCommand, installArgs, {cwd})
}
export default async function downloadTemplate(selectedTemplate) {
    const { targetPath, template } = selectedTemplate
    makeCacheDir(targetPath)
    const spinner = ora('正在下载模版...').start();
    console.log('1111111')
    try{
    console.log('22222222')
        
        await downloadAddTemplate(targetPath, template)
    console.log('333333')
        
        spinner.stop();
        log.success('模板下载成功')
    }catch(e){
        spinner.stop();
        printErrorLog(e)
    }
    
}