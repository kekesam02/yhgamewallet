import process from "node:process";
import ScheduleHandle from "./commons/ScheduleHandle";

require('./botGame/GameServe')
require('./botWallet/WalletServe')
require('./botGame/GameServe')

process.once('SIGINT', () => {
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
