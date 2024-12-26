import process from "node:process";
import ScheduleHandle from "./commons/ScheduleHandle";

require('./commons/expand/ExpandSelectQueryBuilder')
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
