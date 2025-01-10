import schedule from 'node-schedule'
import PayUpdateHuiLv from "./service/PayUpdateHuiLv";
function InitUpdateHuilv() {
    const rule = '0 0/30 * * * ?'; // 每隔30分钟
    //const rule = '*/10 * * * * ?'; // 每隔10秒钟
    // 默认执行一次.
    PayUpdateHuiLv.updateHuiLv()
    const job = schedule.scheduleJob(rule,()=>{
        // 取消job。会被监听
        PayUpdateHuiLv.updateHuiLv()
    })
    return job;


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

export default InitUpdateHuilv;
