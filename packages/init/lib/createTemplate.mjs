import { makeList, makeInput, log, getLatestVersion } from '@leon_test_group/utils'
import path from 'node:path';
import { homedir } from 'node:os';


const ADD_TYPE_PROJECT = 'project';
const ADD_TYPE_PAGE = 'page';
const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT,
  },
  {
    name: '页面',
    value: ADD_TYPE_PAGE,
  },
];

const ADD_TEMPLATE = [
    {
        name:'vue3项目模板',
        value: 'template-vue3',
        npmName: '@leon_test_group/template-vue3',
        version: '1.0.0',
    },
    {
        name:'react18项目模板',
        value: 'template-react18',
        npmName: '@leon_test_group/template-react18',
        version:'1.0.0',
    }
]

const TEMP_HOME = '.good-cli';


async function getAddType(){
    return await makeList({
        message: '请选择项目类型',
        choices: ADD_TYPE,
        default: ADD_TYPE_PROJECT,
    })
}
async function getAddName(){
    log.verbose('getAddName')
    return await makeInput({
        message: '请输入项目名称',
        default: 'good-cli-project',
    })
}

async function getAddTemplate(){
    return await makeList({
        message: '请选择项目模板',
        choices: ADD_TEMPLATE,
        default: 'template-vue3'
    })
}

function makeTargetPath(){
    return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

export default async function createTemplate(name, opts) {
   const { type = null, template = null } = opts;
    
   let addType; // 项目类型
   let addName; // 项目名称
   let addTemplate;  // 项目模板
   if(type){
       addType = type;
   }else{
        addType =  await getAddType()
   }
   log.verbose('addType', addType)
   
   if(addType === ADD_TYPE_PROJECT){
       // 创建项目
       if(name){
          addName = name;
       }else{
        addName = await getAddName();
       }
     log.verbose('addName', addName)
     if(template){
        addTemplate = template;
     }else{
        addTemplate = await getAddTemplate();  
     }
     log.verbose('addTemplate', addTemplate)
     const selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate)
     if (!selectedTemplate) {
        throw new Error(`项目模板 ${template} 不存在！`);
      }
     log.verbose('selectTemplate', selectedTemplate)
     // 获取最新的版本
    const latestVersion = await getLatestVersion(selectedTemplate.npmName);
    log.verbose('latestVersion', latestVersion);
    selectedTemplate.version = latestVersion;
     const targetPath = makeTargetPath();
     return {
        type: addType,
        name: addName,
        template: selectedTemplate,
        targetPath
     }
   }else if(addType === ADD_TYPE_PAGE){
       // 创建页面
   }
}