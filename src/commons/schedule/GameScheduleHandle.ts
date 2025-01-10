import {Context, Telegraf} from "telegraf";
import schedule from "node-schedule";
import moment from "moment-timezone";
import PC28Controller from "../../botGame/gameController/PC28Controller";
import BotGameConfig from "../../botGame/BotGameConfig";
import {Pc28LotteryJsonType} from "../../type/gameEnums/LooteryJsonType";
import ScheduleHandle from "./ScheduleHandle";
import GameUserRedis from "../redis/GameUserRedis";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {clearTimeout} from "timers";


class GameScheduleHandle {

    public static bot: Telegraf<Context>

    public static pc28Config = {
        // 是否是测试
        isTest: false,
        // 当前测试数据下标
        testIndex: 0,
        // testList: [
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1',
        //     '0,0,1'
        // ],
        testList: [
            '0,4,3',
            '0,4,2',
            '0,1,1',
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
            '4,5,9',
            '6,6,1',
            '7,6,0',
            '5,6,3'
        ],

        // 游戏是否是第一次运行
        isFirstStart: false,

        // 是否已发送停盘维护信息
        isSendProtect: false,

        // 当前的开奖时间（每次开奖成功后刷新数据）
        openTime: '',

        // 当前开奖期数
        roundId: '',

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
    public static startPC28 = async (bot: Telegraf<Context>) => {
        this.bot = bot
        // pc28游戏还没有开始、打开计时器开始运行游戏
        if (!ScheduleHandle.isStartPC28) {
            ScheduleHandle.isStartPC28 = true
            try {
                // 封盘提示、每天晚上8点发送
                let rule = new schedule.RecurrenceRule()
                rule.hour = 20
                rule.minute = 0
                let nextJob = schedule.scheduleJob(rule, async () => {
                    await new PC28Controller().sendRepairHtml(bot)
                    nextJob.cancel()
                })
                ScheduleHandle.currJobMap.set('gameSchedule1', nextJob)

                let pc28Controller = new PC28Controller()
                let lotteryJson = await pc28Controller.getLotteryJson()
                if (lotteryJson) {
                    await this.checkNextPC28(lotteryJson)
                }
            } catch (err) {
                console.log('获取开奖信息之类的出错了', err)
            }
        }
    }

    /**
     * pc28 切换到下一期
     */
    private static checkNextPC28 = async (openJson: Pc28LotteryJsonType) => {
        let currJson = openJson.data[0]

        if(!ScheduleHandle.pc28Config.isFirstStart) {
            ScheduleHandle.pc28Config.isFirstStart = true
            // 下次开奖时间、加上封盘提示时间 + 5秒、用来判断用户是否还可以继续下
            let nextTime = moment(currJson.next_time).subtract(new BotGameConfig().FPTipsTime + 5, 'seconds')
            // 当前时间充足可以直接加入到游戏中
            if (moment(nextTime).isAfter(moment())) {
                // 可以继续下注、发送开始下注信息到群组
                await new PC28Controller().startPCLow(this.bot, openJson)
            } else {
                // 每10秒钟尝试加入下一局游戏
                let timer = setTimeout( async () => {
                    // 等待下一期在发送游戏开始信息
                    let pc28Controller = new PC28Controller()
                    let lotteryJson: Pc28LotteryJsonType | null = await pc28Controller.getLotteryJson()
                    ScheduleHandle.clearTimeoutMap.forEach(item => {
                        if (item) {
                            clearTimeout(item)
                        }
                    })
                    if (lotteryJson) {
                        await this.checkNextPC28(lotteryJson)
                    }
                }, 10000)
                ScheduleHandle.clearTimeoutMap.set('game_2', timer)
                return
            }
        }

        let nextTime = moment(currJson.next_time).subtract(new BotGameConfig().FPTipsTime + 5, 'seconds')
        // 当前时间不够加入本局游戏了、需要切换到下一期
        if (!moment(nextTime).isAfter(moment())) {
            // 每10秒钟尝试加入下一局游戏
            let timer = setTimeout( async () => {
                // 等待下一期在发送游戏开始信息
                let pc28Controller = new PC28Controller()
                let lotteryJson = await pc28Controller.getLotteryJson()
                ScheduleHandle.clearTimeoutMap.forEach(item => {
                    if (item) {
                        clearTimeout(item)
                    }
                })
                if (lotteryJson) {
                    await this.checkNextPC28(lotteryJson)
                }
            }, 10000)
            ScheduleHandle.clearTimeoutMap.set('game_1', timer)
            return
        }

        // 发送封盘提示
        let tipsTime = moment(currJson.next_time)
            .subtract(new BotGameConfig().FPTipsTime, 'seconds')
            .format('YYYY-MM-DD HH:mm:ss')
        console.log('封盘提示时间', tipsTime)
        let tipJob = schedule.scheduleJob(new Date(tipsTime), async () => {
            await new PC28Controller().sendCloseTopTips(this.bot, {
                roundId: ScheduleHandle.pc28Config.roundId
            })
            ScheduleHandle.currJobMap.set('gameSchedule4', tipJob)
            tipJob.cancel()
        })

        // 发送停止上注提示
        let stopUpTime = moment(currJson.next_time)
            .subtract(new BotGameConfig().FPTime, 'seconds')
            .format('YYYY-MM-DD HH:mm:ss')
        this.pc28Config.stopUpTime = stopUpTime
        let stopUpJob = schedule.scheduleJob(new Date(stopUpTime), async () => {
            await new PC28Controller().sendStopTop(this.bot, {
                roundId: ScheduleHandle.pc28Config.roundId,
                openTime: ScheduleHandle.pc28Config.openTime
            })
            stopUpJob.cancel()
        })
        ScheduleHandle.currJobMap.set('gameSchedule5', stopUpJob)

        /**
         * 开奖时间
         */
        let openTime = ScheduleHandle.pc28Config.openTime = currJson.next_time
        // 当前开奖期数
        ScheduleHandle.pc28Config.roundId = currJson.next_expect
        let openJob = schedule.scheduleJob(new Date(openTime), async () => {
            let pc28Controller = new PC28Controller()
            let nextJson: Pc28LotteryJsonType | null = await pc28Controller.getLotteryJson()
            if (!nextJson) {
                return
            }

            // 保存开奖结果到数据库
            await pc28Controller.saveLotteryJson(nextJson)
            let pledgeUpMap = await pc28Controller.getWinningUser(nextJson)
            await pc28Controller.getLotteryTextBot(this.bot, nextJson, pledgeUpMap)
            await pc28Controller.getLotteryListBot(this.bot)
            await pc28Controller.startPCLow(this.bot, nextJson)
            await GameUserRedis.clearPlayingUser(GameTypeEnum.PC28DI)
            await GameUserRedis.clearPlayingUser(GameTypeEnum.PC28GAO)
            openJob.cancel()
            await this.checkNextPC28(nextJson!)
        })
        ScheduleHandle.currJobMap.set('gameSchedule6', openJob)
    }
}



export default GameScheduleHandle
