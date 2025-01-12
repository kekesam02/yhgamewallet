import schedule, {Job} from "node-schedule";
import {Context, Telegraf} from "telegraf";
import {clearTimeout} from "timers";
import WalletScheduleHandle from "./WalletScheduleHandle";

/**
 * 定时任务控制器
 */
class ScheduleHandle {

    /**
     * 正在工作的定时器列表、运行结束需要关闭
     */
    public static currJobList: Array<Job> = []

    /**
     * key value 形式的job
     */
    public static currJobMap: Map<string, Job> = new Map()

    public static clearTimeoutMap: Map<string, any> = new Map()

    /**
     * 游戏是否已经开始
     *      true: 已经开始游戏、定时器正在执行
     *      false: 游戏还没有开始运行
     */
    public static isStartPC28 = false


    /**
     * 开启pc28调度器
     * @param bot
     */
    public static startPC28 = async (bot: Telegraf<Context>) => {
    }

    public static bot: Telegraf<Context>

    /**
     * 钱包调度器
     * @param bot
     */
    public static initWallet = (bot: Telegraf<Context>) => {
        this.bot = bot
        // 测试每30秒执行一次定时器
        // let job = schedule.scheduleJob('10 * * * * *',()=>{
        //     console.log('scheduleCronstyle:' + new Date())
        //     WalletScheduleHandle.init(bot).then(r => {})
        // })
        WalletScheduleHandle.init(bot).then(r => {})
        // 每天凌晨执行一次定时器
        let job = schedule.scheduleJob('0 0 * * *',()=>{
            WalletScheduleHandle.init(bot).then(r => {})
        })
        this.currJobList.push(job)
    }

    /**
     * 进程结束需要关闭正在工作的定时器
     */
    public static closeJobs = () => {
        this.currJobList.forEach(item => {
            if(item) item.cancel()
        })
        this.currJobMap.forEach(item => {
            if(item) item.cancel()
        })
        this.clearTimeoutMap.forEach(item => {
            if (item) {
                clearTimeout(item)
            }
        })
    }
}

export default ScheduleHandle
