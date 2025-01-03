import schedule, {Job} from "node-schedule";
import PC28Controller from "../../botGame/gameController/PC28Controller";
import {Context, Telegraf} from "telegraf";
import moment from "moment-timezone";
import BotGameConfig from "../../botGame/BotGameConfig";
import {Pc28LotteryJsonType} from "../../type/gameEnums/LooteryJsonType";
import TimeUtils from "../date/TimeUtils";
import GameScheduleHandle from "./GameScheduleHandle";

/**
 * 定时任务控制器
 */
class ScheduleHandle {

    /**
     * 正在工作的定时器列表、运行结束需要关闭
     */
    public static currJobList: Array<Job> = []

    /**
     * 游戏是否已经开始
     *      true: 已经开始游戏、定时器正在执行
     *      false: 游戏还没有开始运行
     */
    public static isStartPC28 = false

    public static pc28Config = GameScheduleHandle.pc28Config

    /**
     * 开启pc28调度器
     * @param bot
     */
    public static startPC28 = (bot: Telegraf<Context>) => {
        GameScheduleHandle.startPC28(bot)
    }

    /**
     * 进程结束需要关闭正在工作的定时器
     */
    public static closeJobs = () => {
        this.currJobList.forEach(item => {
            item.cancel()
        })
    }
}



export default ScheduleHandle
