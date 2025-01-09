import process from "node:process";
import ScheduleHandle from "./commons/schedule/ScheduleHandle";
require('./commons/expand/ExpandIndex')
const moment = require('moment-timezone')
require('./commons/expand/ExpandSelectQueryBuilder')
moment.tz?.setDefault('Asia/Shanghai')
// require('./botGame/GameServe')
require('./botWallet/WalletServe')

process.once('SIGINT', () => {
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
