import { makeList, makeInput, log } from '@leon_test_group/utils'


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

export default async function createTemplate(name, opts) {
   const addType =  await getAddType()
   log.verbose('addType', addType)
   if(addType === ADD_TYPE_PROJECT){
       // 创建项目
     const addName = await getAddName();
     log.verbose('addName', addName)
     const addTemplate = await getAddTemplate();
     log.verbose('addTemplate', addTemplate)
     const selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate)
     log.verbose('selectTemplate', selectedTemplate)
     // 获取最新的版本
     return {
        type: addType,
        name: addName,
        template: selectedTemplate,

     }
   }else if(addType === ADD_TYPE_PAGE){
       // 创建页面
   }
}