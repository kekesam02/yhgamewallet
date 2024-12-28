import process from "node:process";
import ScheduleHandle from "./commons/ScheduleHandle";
import LocalCache from "./commons/cache/LocalCache";
const moment = require('moment-timezone')

require('./commons/expand/ExpandSelectQueryBuilder')
require('./botGame/GameServe')
// require('./botWallet/WalletServe')

moment.tz?.setDefault('Asia/Shanghai')

process.once('SIGINT', () => {
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
