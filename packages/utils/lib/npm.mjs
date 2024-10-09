import urlJoin from 'url-join';
import axios from 'axios'
import log from './log.mjs'


function getNameInfo(npmName){
    const register = 'https://registry.npmjs.org/';
    const url = urlJoin(register,npmName);
    return axios.get(url).then(res=>{
        try{
            return res.data
        }catch(e){
            return Promise.reject(e)
        }
    })
}


export function getLatestVersion(npmName){
    return getNameInfo(npmName).then(data=>{
        if(!data['dist-tags'] || !data['dist-tags'].latest){
            log.error('没有找到最新版本')
            return Promise.reject(new Error('没有找到最新版本'))
        }
        return data['dist-tags'].latest;
    })
}