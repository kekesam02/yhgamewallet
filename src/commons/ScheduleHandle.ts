import schedule, {Job} from "node-schedule";
import PC28Controller from "../botGame/gameController/PC28Controller";
import {Context, Telegraf} from "telegraf";
import moment from "moment";
import BotGameConfig from "../botGame/BotGameConfig";

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

    public static pc28Config = {
        // 当前的开奖时间（每次开奖成功后刷新数据）
        openTime: '',

        // 当前开奖期数
        roundId: '',

        // 本次是否已经开奖
        isOpenLottery: false,

        // 当前开奖停止上注时间
        stopUpTime: '',

        // 当前是否已经发送停止上注消息
        isClose: false,

        // 当前停止上注提示时间
        closeTipsTime: '',

        // 当前是否已经发送停止上注提示
        isCloseTips: false
    }


    /**
     * 开启PC28定时任务控制器
     */
    public static startPC28 = (bot: Telegraf<Context>) => {
        // pc28游戏还没有开始、打开计时器开始运行游戏
        if (!this.isStartPC28) {
            this.isStartPC28 = true
            // let pc28Controller = new PC28Controller()
            // pc28Controller.startPCLow(bot).then((val) => {})
            console.log('进来222任务调度了')
            let rule = new schedule.RecurrenceRule()
            rule.second = [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
            ]
            let job = schedule.scheduleJob(rule, async () => {
                console.log('停止上注时间', ScheduleHandle.pc28Config.stopUpTime)
                console.log('开奖时间', ScheduleHandle.pc28Config.openTime)
                console.log('停止上注提示时间', ScheduleHandle.pc28Config.closeTipsTime)
                console.log('停止上注提示时间是否成功', moment().isAfter(moment(ScheduleHandle.pc28Config.closeTipsTime)))
                console.log('是否已经提示', ScheduleHandle.pc28Config.isCloseTips)
                // 服务器第一次运行数据处理
                if (!ScheduleHandle.pc28Config.stopUpTime && !ScheduleHandle.pc28Config.openTime) {
                    try {
                        console.log('服务器第一次运行', ScheduleHandle.pc28Config.stopUpTime)
                        let json = await new PC28Controller().getLotteryJson()
                        let currJson = json.data[0]
                        // 下次开奖时间、加上封盘时间 + 5秒、用来判断用户是否还可以继续下
                        let nextTime = moment(json.data[0].next_time).subtract(new BotGameConfig().FPTime + 4, 'seconds')
                        if (moment(nextTime).isAfter(moment())) {
                            // 可以继续下注、发送开始下注信息到群组
                            await new PC28Controller().startPCLow(bot, json)
                        }
                        console.log('运行结束了--------------')
                        ScheduleHandle.pc28Config.openTime = currJson.next_time
                        ScheduleHandle.pc28Config.roundId = currJson.next_expect
                        ScheduleHandle.pc28Config.stopUpTime =
                            moment(json.data[0].next_time).subtract(new BotGameConfig().FPTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
                        ScheduleHandle.pc28Config.closeTipsTime =
                            moment(json.data[0].next_time).subtract(new BotGameConfig().FPTipsTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
                    } catch (err) {
                        console.log('记录日志', err)
                    }
                    return
                }

                // 判断是否发送停止上注提示到群组
                if (
                    ScheduleHandle.pc28Config.stopUpTime &&
                    ScheduleHandle.pc28Config.openTime &&
                    moment().isAfter(moment(ScheduleHandle.pc28Config.closeTipsTime)) &&
                    !ScheduleHandle.pc28Config.isCloseTips
                ) {
                    try {
                        console.log('判断是否发送停止上注提示到群组')
                        ScheduleHandle.pc28Config.isCloseTips = true
                        let closeTipsTime = moment(ScheduleHandle.pc28Config.closeTipsTime)
                        let stopUpTime = moment(ScheduleHandle.pc28Config.stopUpTime)
                        let duration = moment.duration(closeTipsTime.diff(stopUpTime))
                        if (duration.seconds() < 0) {
                            // 已经过了停止上注提示时间了
                            return
                        }
                        // 如果已经超出停止上注提示时间、并且没有发送停止上注提示消息、发送提示到群组
                        await new PC28Controller().sendCloseTopTips(bot, {
                            roundId: ScheduleHandle.pc28Config.roundId
                        })
                    } catch (err) {
                        ScheduleHandle.pc28Config.isCloseTips = false
                    }
                    return
                }

                // 是否已经发送停止上注信息到群组
                if (
                    ScheduleHandle.pc28Config.stopUpTime &&
                    ScheduleHandle.pc28Config.openTime &&
                    moment().isBefore(moment(ScheduleHandle.pc28Config.stopUpTime)) &&
                    !ScheduleHandle.pc28Config.isClose
                ) {
                    try {
                        console.log('是否已经发送停止上注信息到群组')
                        ScheduleHandle.pc28Config.isClose = true
                        // 如果已经超出停止上注时间、并且没有停止上注发送停止上注消息到群组中
                        await new PC28Controller().sendStopTop(bot, {
                            roundId: ScheduleHandle.pc28Config.roundId,
                            openTime: ScheduleHandle.pc28Config.openTime
                        })
                    } catch (err) {
                        ScheduleHandle.pc28Config.isClose = false
                    }
                    return
                }

                if(
                    ScheduleHandle.pc28Config.stopUpTime &&
                    ScheduleHandle.pc28Config.openTime &&
                    moment().isBefore(moment(ScheduleHandle.pc28Config.stopUpTime))
                    && !ScheduleHandle.pc28Config.isOpenLottery
                ) {
                    try {
                        console.log('获取开奖数据')
                        ScheduleHandle.pc28Config.isOpenLottery = true
                        let pc28Controller = new PC28Controller()
                        let openJson = await pc28Controller.getLotteryJson()
                        await pc28Controller.getLotteryTextBot(bot, openJson)
                        await pc28Controller.getLotteryListBot(bot)
                        await pc28Controller.startPCLow(bot, openJson)
                        ScheduleHandle.checkNextPC28()
                    } catch (err) {
                        ScheduleHandle.pc28Config.isOpenLottery = false
                    }
                    return
                }
            })
            this.currJobList.push(job)
            // setTimeout(() => {
            //     let pc28Controller = new PC28Controller()
            //     pc28Controller.startPCLow(bot).then((val) => {})
            // }, 2000)
        }
    }

    /**
     * pc28 切换到下一期
     */
    private static checkNextPC28 = () => {
        ScheduleHandle.pc28Config.isOpenLottery = false
        ScheduleHandle.pc28Config.isClose = false
        ScheduleHandle.pc28Config.isCloseTips = false
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
