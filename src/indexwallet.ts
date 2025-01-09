import process from "node:process";
import ScheduleHandle from "./commons/schedule/ScheduleHandle";
import InitUpdateHuilv from "./botPay/PayWalletSchedule";
require('./commons/expand/ExpandIndex')
const moment = require('moment-timezone')
require('./commons/expand/ExpandSelectQueryBuilder')
moment.tz?.setDefault('Asia/Shanghai')
require('./botWallet/WalletServe')
// 启动定时任务 -- 定时更新更新闪兑兑换比列
const job = InitUpdateHuilv()

process.once('SIGINT', () => {
    ScheduleHandle.closeJobs()
    if(job)job.cancel()
})
process.once('SIGTERM', () =>{
    ScheduleHandle.closeJobs()
    if(job)job.cancel()
})
