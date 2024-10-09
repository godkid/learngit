import log from './log.mjs'
import isDebug from './isDebug.mjs'
import { makeList, makeInput, makePassword } from './inquirer.mjs';
import {getLatestVersion} from './npm.mjs'

export function printErrorLog(e, type){
    if(isDebug()){
        log.error(type, e)
    }else{
        log.error(type, e.message)
    }
}

export {
    log,
    isDebug,
    makeList, 
    makeInput, 
    makePassword,
    getLatestVersion
}