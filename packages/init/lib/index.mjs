import Command from "@leon_test_group/command";
import { log } from '@leon_test_group/utils'
import creteTemplate from './createTemplate.mjs'
import downloadTemplate from './downloadTemplate.mjs'
import installTemplate from './installTemplate.mjs';


class InitCommand extends Command {
  get command(){
    return 'init [name]';
  }
  get description(){
    return 'Initialize a new project';
  }
  get options(){
    return [
      ['-f, --force', '是否强制更新', false],
      ['-t, --type <type>', '项目类型（值： project/page）'],
      ['-tp, --template <template>', '模板名称']
    ]
  }

 async action([name, opts]){
    log.verbose('init', name, opts);
    // new Promise(resolve => {
    //   resolve()
    // }).then(() => {
    //   throw new Error('error from promise')
    // })
    // 1. 选择项目模版，生成项目信息
    const selectedTemplate = await  creteTemplate(name, opts)
    log.verbose('selectedTemplate -----', selectedTemplate);
    // 2. 下载项目模至缓存目录
    await downloadTemplate(selectedTemplate)
    // 3. 安装项目模板到项目目录
    await installTemplate(selectedTemplate, opts);
    
  }
  
  preAction(){
    console.log('preAction');
  }
  postAction(){
    console.log('postAction');
  }
}

function Init(instance){
  return new InitCommand(instance);
}

export default Init;
