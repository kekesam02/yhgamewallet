import process from "node:process";
import InitUpdateHuilv from "./botPay/PayWalletSchedule";
require('./commons/expand/ExpandIndex')
const moment = require('moment-timezone')
require('./commons/expand/ExpandSelectQueryBuilder')
moment.tz?.setDefault('Asia/Shanghai')
require('./botWallet/WalletServe')
// 启动定时任务 -- 定时更新更新闪兑兑换比列
const job = InitUpdateHuilv()

process.once('SIGINT', () => {
    if(job)job.cancel()
})
process.once('SIGTERM', () =>{
    if(job)job.cancel()
})
