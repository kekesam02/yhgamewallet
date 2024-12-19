import schedule from 'node-schedule'
import logger from "../logger";
import PayMessageHandle from "./PayMessageHandle";
import bot from "./PayWalletBot";
function initWallet( ) {
    const rule = '*/10 * * * * *';
    const job = schedule.scheduleJob(rule,()=>{
        logger.info('2、每次计划执行中的事件。');
        new PayMessageHandle().sendMessage(bot)
        // 取消job。会被监听
        //job.cancel()
    });

    // 取消任务
    // schedule.cancelJob(job)

    // job.on("scheduled", () => {
    //     console.log("1、每次计划执行前的事件。");
    // });
    //
    //
    // job.on("run", () => {
    //     console.log("3、每次计划执行后的事件。");
    // });
    //
    //
    // job.on("success", () => {
    //     console.log(`4、每次计划执行成功事件。`);
    // });
    //
    //
    // job.on("error", (err) => {
    //     console.log(`[error][${new Date().toLocaleString()}]${err.message}`);
    // });
    //
    //
    job.on("canceled", () => {
        console.log("计划取消!");
    })
}

export default initWallet;
