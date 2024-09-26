import log from 'npmlog'
import isDebug from './isDebug.mjs'

if (isDebug()) {
    log.level = 'verbose'
}else{
    log.level = 'info'
}

log.heading = 'good-cli';
log.addLevel('success', 2000, {fg: 'green', blod: true})

export default log