import process from "node:process";
import ScheduleHandle from "./commons/schedule/ScheduleHandle";
require('./commons/expand/ExpandIndex')
const moment = require('moment-timezone')
require('./commons/expand/ExpandSelectQueryBuilder')
if (process.env.RUNNING_ENV == 'dev' || process.env.RUNNING_ENV == 'zs') {
    require('./botGame/GameServe')
}
if (process.env.RUNNING_ENV == 'fg' ) {
    require('./botWallet/WalletServe')
}


moment.tz?.setDefault('Asia/Shanghai')

process.once('SIGINT', () => {
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
