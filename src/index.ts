<<<<<<< HEAD
require('./botPay/PayWalletServe')
require('./botWallet/WalletServe')
require('./botGame/GameServe')
require('./botPay/PayWalletBot')
=======
import process from "node:process";
import ScheduleHandle from "./commons/ScheduleHandle";

require('./botWallet/walletServe')
require('./botGame/GameServe')



process.once('SIGINT', () => {
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
process.once('SIGTERM', () =>{
    console.log('关闭任务')
    ScheduleHandle.closeJobs()
})
>>>>>>> 6b087c776da14bbfdfc1a3d3695c133d6aea3fb4
