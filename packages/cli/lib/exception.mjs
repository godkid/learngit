import { isDebug, log } from '@leon_test_group/utils'


function printErrorLog(e, type){
    if(isDebug()){
        log.error(type, e)
    }else{
        log.error(type, e.message)
    }
}

process.on('uncaughtException', (e)=> printErrorLog(e, 'error'))

// 未处理的promise错误
process.on('unhandledRejection', (e)=> printErrorLog(e, 'Promise error'))



