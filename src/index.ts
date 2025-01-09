import process from "node:process";
import ScheduleHandle from "./commons/schedule/ScheduleHandle";
import InitUpdateHuilv from "./botPay/PayWalletSchedule";
require('./commons/expand/ExpandIndex')
const moment = require('moment-timezone')
require('./commons/expand/ExpandSelectQueryBuilder')
require('./botGame/GameServe')
require('./botWallet/WalletServe')
moment.tz?.setDefault('Asia/Shanghai')
const job = InitUpdateHuilv()


process.once('SIGINT', () => {
    console.log('关闭任务')
    if(job)job.cancel()
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    if(job)job.cancel()
    ScheduleHandle.closeJobs()
})
