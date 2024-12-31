import schedule, {Job} from "node-schedule";
import PC28Controller from "../botGame/gameController/PC28Controller";
import {Context, Telegraf} from "telegraf";
import moment from "moment-timezone";
import BotGameConfig from "../botGame/BotGameConfig";
import {Pc28LotteryJsonType} from "../type/gameEnums/LooteryJsonType";
import TimeUtils from "./date/TimeUtils";

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
        // 是否是测试
        isTest: true,
        // 当前测试数据下标
        testIndex: 0,
        testList: [
            '0,4,3',
            '0,4,2',
            '0,4,1',
            '0,1,3',
            '0,1,2',
            '0,1,1',
            '0,0,1',
            '0,0,0',
            '1,0,9',
            '8,0,9',
            '9,9,9',
            '8,9,9',
            '7,9,9',
            '7,8,9',
            '5,9,9',
            '4,9,9',
            '4,8,9',
            '4,7,9',
            '4,6,9',
            '4,5,9'
        ],

        // 游戏是否是第一次运行
        isFirstStart: false,

        // 是否已发送停盘维护信息
        isSendProtect: false,

        // 当前的开奖时间（每次开奖成功后刷新数据）
        openTime: '',

        // 当前开奖期数
        roundId: '500025',

        // 本次是否已经开奖
        isOpenLottery: false,

        // 当前封盘时间、开奖停止上注时间
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
                1
            ]
            // let text = async () => {
            //     let pc28Controller = new PC28Controller()
            //     let openJson = await pc28Controller.getLotteryJson()
            //     openJson.data[0].expect = '3229165'
            //     openJson.data[0].open_code = '2,2,2'
            //     openJson.data[0].next_expect = '3229165'
            //     let pledgeUpMap = await pc28Controller.getWinningUser(openJson)
            //     await pc28Controller.getLotteryTextBot(bot, openJson, pledgeUpMap)
            // }
            // text().then(r => {})
            // return

            rule.second = new Array(60).fill(0, 0, 60).map((item, index) => index)
            console.log('数组', rule.second)
            let job = schedule.scheduleJob(rule, async () => {

                console.log('开奖期期数', ScheduleHandle.pc28Config.roundId)
                console.log('当前时间', moment().format('YYYY-MM-DD HH:mm:ss'))
                console.log('停止上注时间', ScheduleHandle.pc28Config.stopUpTime)
                console.log('开奖时间', ScheduleHandle.pc28Config.openTime)
                console.log('停止上注提示时间', ScheduleHandle.pc28Config.closeTipsTime)
                console.log('停止上注提示时间是否成功', moment().isAfter(moment(ScheduleHandle.pc28Config.closeTipsTime)))
                console.log('是否已经提示', ScheduleHandle.pc28Config.isCloseTips)

                if (new TimeUtils().isTimeBetween('20:30', '20.35')) {
                    console.log('当前应该维护了')
                    if (!ScheduleHandle.pc28Config.isSendProtect) {
                        ScheduleHandle.pc28Config.isSendProtect = true
                        await new PC28Controller().sendRepairHtml(bot)
                    }
                    return
                }
                if (ScheduleHandle.pc28Config.isSendProtect) {
                    ScheduleHandle.pc28Config.isSendProtect = false
                }


                // 服务器第一次运行数据处理
                if (!ScheduleHandle.pc28Config.isFirstStart && !ScheduleHandle.pc28Config.stopUpTime && !ScheduleHandle.pc28Config.openTime) {
                    ScheduleHandle.pc28Config.isFirstStart = true
                    try {
                        console.log('服务器第一次运行-----', ScheduleHandle.pc28Config.stopUpTime)
                        let json = await new PC28Controller().getLotteryJson()
                        // 下次开奖时间、加上封盘时间 + 5秒、用来判断用户是否还可以继续下
                        let nextTime = moment(json.data[0].next_time).subtract(new BotGameConfig().FPTime + 4, 'seconds')

                        // 当前时间充足可以直接加入到游戏中
                        if (moment(nextTime).isAfter(moment())) {
                            // 可以继续下注、发送开始下注信息到群组
                            await new PC28Controller().startPCLow(bot, json)
                            ScheduleHandle.checkNextPC28(json)
                        } else {
                            let next_time = moment(json.data[0].next_time).subtract(210, 'seconds').format('YYYY-MM-DD HH:mm:ss')
                            let next_roundId = json.data[0].next_expect + 1
                            json.data[0].next_time = next_time
                            json.data[0].next_expect = next_roundId
                            // 等到下一期在加入游戏中
                            ScheduleHandle.checkNextPC28(json)
                        }
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
                    !ScheduleHandle.pc28Config.isCloseTips &&
                    moment.duration(moment().diff(ScheduleHandle.pc28Config.closeTipsTime)).seconds() < 2
                ) {
                    try {
                        console.log('判断是否发送停止上注提示到群组----')
                        ScheduleHandle.pc28Config.isCloseTips = true
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
                    moment().isAfter(moment(ScheduleHandle.pc28Config.stopUpTime)) &&
                    !ScheduleHandle.pc28Config.isClose &&
                    moment.duration(moment().diff(ScheduleHandle.pc28Config.stopUpTime)).seconds() < 2
                ) {
                    try {
                        console.log('是否已经发送停止上注信息到群组----')
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

                // 获取最新的开奖结果
                if(
                    ScheduleHandle.pc28Config.stopUpTime &&
                    ScheduleHandle.pc28Config.openTime &&
                    moment().isAfter(moment(ScheduleHandle.pc28Config.openTime))
                    && !ScheduleHandle.pc28Config.isOpenLottery
                ) {
                    try {
                        console.log('获取开奖数据------')
                        ScheduleHandle.pc28Config.isOpenLottery = true
                        let pc28Controller = new PC28Controller()
                        let openJson = await pc28Controller.getLotteryJson()

                        // 开奖结果判定
                        if (openJson.data.length > 0 && openJson.data[0].expect != ScheduleHandle.pc28Config.roundId) {
                            console.log('开奖结果错误或者卡奖了、需要重新获取开奖结果')
                            /**
                             * 从取到的结果中取判定是否有当前奖、有的话去修正json数据
                             * 将当前期数的数据放到 data 第一位、下期开奖期数取data[0]的中的数据
                             */
                            let isExit = false
                            let currIndex = 0
                            openJson.data.forEach((item, index) => {
                                if (item.expect == ScheduleHandle.pc28Config.roundId) {
                                    isExit = true
                                    currIndex = index
                                }
                            })
                            if (isExit) {
                                // 获取到本期的开奖数据了进行数据修正
                                openJson.data = [
                                    {
                                        expect: openJson.data[currIndex]!.expect,
                                        open_code: openJson.data[currIndex]!.open_code,
                                        open_time: openJson.data[currIndex]!.open_time,
                                        next_expect: openJson.data[0]!.next_expect,
                                        next_time: openJson.data[0]!.next_time
                                    },
                                    ...openJson.data
                                ]
                                console.log('修正后的数据', openJson)
                            } else {
                                ScheduleHandle.pc28Config.isOpenLottery = false
                                return
                            }
                        }


                        // 保存开奖结果到数据库
                        console.log('保存11结果')
                        await pc28Controller.saveLotteryJson(openJson)
                        console.log('保存122结果')
                        let pledgeUpMap = await pc28Controller.getWinningUser(openJson)
                        console.log('保存33结果')
                        await pc28Controller.getLotteryTextBot(bot, openJson, pledgeUpMap)
                        console.log('保存44结果')
                        await pc28Controller.getLotteryListBot(bot)
                        console.log('保存55结果')
                        await pc28Controller.startPCLow(bot, openJson)
                        console.log('保存66结果')
                        ScheduleHandle.checkNextPC28(openJson)
                    } catch (err) {
                        console.log('设置开奖信息保存了', err)
                        ScheduleHandle.pc28Config.isOpenLottery = false
                    }
                    return
                }
            })
            this.currJobList.push(job)
        }
    }

    /**
     * pc28 切换到下一期
     */
    private static checkNextPC28 = (openJson: Pc28LotteryJsonType) => {
        ScheduleHandle.pc28Config.testIndex = ScheduleHandle.pc28Config.testIndex+1
        if (!ScheduleHandle.pc28Config.testList[ScheduleHandle.pc28Config.testIndex+1]) {
            ScheduleHandle.pc28Config.testIndex = 0
        }
        let currJson = openJson.data[0]
        ScheduleHandle.pc28Config.isOpenLottery = false
        ScheduleHandle.pc28Config.isClose = false
        ScheduleHandle.pc28Config.isCloseTips = false
        ScheduleHandle.pc28Config.openTime = currJson.next_time
        ScheduleHandle.pc28Config.roundId = currJson.next_expect
        ScheduleHandle.pc28Config.stopUpTime =
            moment(currJson.next_time).subtract(new BotGameConfig().FPTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
        ScheduleHandle.pc28Config.closeTipsTime =
            moment(currJson.next_time).subtract(new BotGameConfig().FPTipsTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
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
