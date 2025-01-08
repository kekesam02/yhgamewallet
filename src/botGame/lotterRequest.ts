import request from "../commons/request/request";
import GameScheduleHandle from "../commons/schedule/GameScheduleHandle";
import {Pc28LotteryJsonType} from "../type/gameEnums/LooteryJsonType";
import moment from "moment";
import ComputeUtils from "../commons/compute/ComputeUtils";
import {add} from "winston";
import BotRoundModel from "../models/BotRoundModel";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import MockLottery from "./MockLottery";


/**
 * 获取开奖结果数据
 */
class LotteryRequest {

    /**
     * 获取开奖 json 数据
     */
    public getLotteryJson = async (): Promise<Pc28LotteryJsonType> => {
        try {
            return new Promise<Pc28LotteryJsonType>((resolve, reject) => {
                // 正常开奖结果处理
                this.normalHandle().then((val) => {
                    resolve(val)
                }).catch(err => {
                    console.log('开奖接口1出现错误了', err)
                })

                /**
                 * 这个接口只有在前俩个接口卡奖后(超过20秒获取不到开奖结果)才会去调用
                 *      因为他没有返回下一期开奖期数和下期开奖时间
                 */
                setTimeout(() => {
                    this.request11().then((val) => {
                        console.log('卡奖接口返回的数据', val)
                        resolve(val)
                    }).catch(err => {
                        console.log('卡奖处理出错了', err)
                    })
                }, 1000 * 20)
            })
        } catch (err) {
            console.log('开奖请求出错了', err)
        }
    }

    /**
     * 正常开奖情况处理
     */
    public normalHandle = (): Promise<Pc28LotteryJsonType> => {
        return new Promise((resolve, reject) => {
            this.request1().then((val) => {
                console.log('第一个接口返回的数据', val)
                if (val != null) {
                    resolve(val)
                }
            }).catch(err => {
                console.log('第一个接口出错了', err)
            })
            this.request2().then((val) => {
                console.log('第二个接口返回的数据', val)
                if (val != null) {
                    resolve(val)
                }
            }).catch(err => {
                console.log('第二个接口出错了', err)
            })
            this.request3().then((val) => {
                console.log('第三个接口返回的数据', val)
                if (val != null) {
                    resolve(val)
                }
            }).catch(err => {
                console.log('第三个接口出错了', err)
            })
        })
    }

    /**
     * 获取第一个接口开奖数据
     */
    public request1 = async (): Promise<Pc28LotteryJsonType | null> => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
        try {
            while (1 < 2) {
                let json: {
                    data: {
                        data: {
                            result: Array<{
                                // 当前期数
                                period: string,
                                // 开奖结果
                                result: Array<number>,
                                // 开奖时间
                                kj_time: string,
                            }>,
                            next: {
                                // 下期期数
                                period: string,
                                // 开奖时间
                                kj_time: string
                            }
                        }
                    }
                } = await request({
                    url: 'https://api.xgram.me/api/pc28/get_history_by_website',
                    method: 'get'
                })
                console.log('请求到的数据', json.data.data)
                if (json.data
                    && json.data.data
                    && json.data.data.result
                ) {
                    let list: Array<{
                        // 当前期数
                        period: string,
                        // 开奖结果
                        result: Array<number>,
                        // 开奖时间
                        kj_time: string,
                    }> = json.data.data.result
                    let isExit = false
                    let currIndex = 0
                    if (!roundId || roundId == '') {
                        isExit = true
                    } else {
                        list.findIndex(item => {
                            if (item.period == roundId) {
                                isExit = true
                                return true
                            }
                        })
                    }
                    let currItem = {...list[currIndex]}
                    let nextItem = json.data.data.next
                    let openSeconds: number = moment(currItem.kj_time).seconds()
                    if (openSeconds > 30 && openSeconds < 40) {
                        openSeconds = 30
                    }
                    if (openSeconds < 1 || openSeconds > 50) {
                        openSeconds = 0
                    }
                    let nextSeconds: number = moment(nextItem.kj_time).seconds()
                    if (nextSeconds > 30 && nextSeconds < 40) {
                        nextSeconds = 30
                    }
                    if (nextSeconds < 1 || nextSeconds > 50) {
                        nextSeconds = 0
                    }
                    let openTime = moment(currItem.kj_time).seconds(openSeconds)
                    let nextTime = moment(nextItem.kj_time).seconds(nextSeconds)
                    if (isExit) {
                        lotteryJson.data = [
                            {
                                expect: currItem.period,
                                open_code: currItem.result.join(','),
                                open_time: openTime.format('YYYY-MM-DD HH:mm:ss'),
                                next_expect: nextItem.period,
                                next_time: nextTime.format('YYYY-MM-DD HH:mm:ss'),
                            }
                        ]
                        break
                    }
                }
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null)
                    }, 1000)
                })
            }
        } catch (err) {
            console.log('接口地址1出错了', err)
            return null
        }
        return lotteryJson
    }

    /**
     * 获取第二个接口开奖数据
     */
    public request2 = async (): Promise<Pc28LotteryJsonType | null> => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
        try {
            while (1 < 2) {
                let json: {
                    data: {
                        data: {
                            now: {
                                // 当前期数
                                expect: string,
                                // 开奖结果
                                opencode: string,
                                // 开奖时间 / 时间戳
                                opentime: string
                            },
                            next: {
                                // 下期期数
                                expect: string
                            }
                        }
                    }
                } = await request({
                    url: 'https://super.pc28660.com/nextdraw/JND28',
                    method: 'get'
                })
                if (
                    json.data
                    && json.data.data
                    && json.data.data.now
                    && (
                        json.data.data.now.expect == GameScheduleHandle.pc28Config.roundId
                        || (!roundId || roundId == '')
                    )
                ) {
                    // 获取到当前期数的开奖数据了
                    let curr = json.data.data.now
                    let next = json.data.data.next
                    lotteryJson.data[0] = {
                        expect: curr.expect,
                        open_code: curr.opencode,
                        open_time: moment(new ComputeUtils(curr.opentime).multiplied(1000).getNumber()).format('YYYY-MM-DD HH:mm:ss'),
                        next_expect: next.expect,
                        next_time: moment(new ComputeUtils(curr.opentime).multiplied(1000).getNumber())
                            .add(3, 'minutes')
                            .add(30, 'seconds')
                            .format('YYYY-MM-DD HH:mm:ss')
                    }
                    break
                }

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null)
                    }, 1000)
                })
            }
        } catch (err) {
            console.log('接口地址2出错了', err)
            return null
        }
        return lotteryJson
    }

    /**
     * 获取第三个开奖接口数据
     */
    public request3 = async () => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
        try {
            while (1 < 2) {
                let json: {
                    data: {
                        data: {
                            list: Array<{
                                // 当前期数
                                drawIssue: string,
                                // 开奖结果
                                drawCode: string,
                                // 开奖时间
                                drawTime: string,
                            }>
                        }
                    }
                } = await request({
                    url: 'https://pc28061.com/api/v1/trend/getHistoryList?lotCode=10029&date=&pageSize=20',
                    method: 'get'
                })
                console.log('请求到的数据', json.data.data)
                if (json.data
                    && json.data.data
                    && json.data.data.list
                ) {
                    let list: Array<{
                        // 当前期数
                        drawIssue: string,
                        // 开奖结果
                        drawCode: string,
                        // 开奖时间
                        drawTime: string,
                    }> = json.data.data.list
                    let isExit = false
                    let currIndex = 0
                    if (!roundId || roundId == '') {
                        isExit = true
                    } else {
                        list.findIndex(item => {
                            if (item.drawIssue == roundId) {
                                isExit = true
                                return true
                            }
                        })
                    }
                    let currItem = {...list[currIndex]}
                    let openTime = moment(currItem.drawTime)
                    let nextTime = moment(currItem.drawTime)
                        .add(3, 'minutes')
                        .add(30, 'seconds')
                    if (isExit) {
                        lotteryJson.data = [
                            {
                                expect: currItem.drawIssue,
                                open_code: currItem.drawCode,
                                open_time: openTime.format('YYYY-MM-DD HH:mm:ss'),
                                next_expect: new ComputeUtils(currItem.drawIssue).add(1).toString(),
                                next_time: nextTime.format('YYYY-MM-DD HH:mm:ss'),
                            }
                        ]
                        break
                    }
                }
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null)
                    }, 1000)
                })
            }
        } catch (err) {
            console.log('接口地址3出错了')
            return null
        }
        return lotteryJson
    }




    // ------------- 下面是卡奖情况处理 -----------

    /**
     * 这个接口返回的开奖时间不对、
     * 但是他卡将之后不会把当前这期数据跳过去
     * 所以只在卡奖之后调用
     */
    public request11 = async (): Promise<Pc28LotteryJsonType | null> => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
        // setTimeout(() => {
        //     MockLottery.index = 1
        // }, 1000)
        try {
            while (1 < 2) {
                let json: {
                    data: {
                        data: {
                            result: Array<{
                                // 当前期数
                                issue: string,
                                // 开奖结果
                                code: string,
                                // 开奖时间
                                gmtCreateStr: string,
                            }>
                        }
                    }
                } = await request({
                    url: 'https://www.kk2888.com/lotto/query-trend?code=jndpcdd&screen=30&mode=times',
                    method: 'get'
                })
                // let json: {
                //     data: {
                //         data: {
                //             result: Array<{
                //                 // 当前期数
                //                 issue: string,
                //                 // 开奖结果
                //                 code: string,
                //                 // 开奖时间
                //                 gmtCreateStr: string,
                //             }>
                //         }
                //     }
                // } = await new MockLottery().getData()
                console.log('卡奖接口请求到的数据', json.data.data.result)
                if (json.data
                    && json.data.data
                    && json.data.data.result
                ) {
                    let list: Array<{
                        // 当前期数
                        issue: string,
                        // 开奖结果
                        code: string,
                        // 开奖时间
                        gmtCreateStr: string,
                    }> = json.data.data.result
                    let isExit = false
                    let currIndex = 0
                    if (!roundId || roundId == '') {
                        isExit = true
                    } else {
                        list.findIndex((item, index) => {
                            if (item.issue == roundId) {
                                isExit = true
                                currIndex = index
                                return true
                            }
                        })
                    }
                    if (isExit) {
                        let currItem = {...list[currIndex]}
                        let {nextRoundId, nextTime} = await this.getNextJson()
                        // 中奖需要补奖的期数
                        let addList: Array<any> = []
                        list.filter(item => {
                            if (
                                new ComputeUtils(nextRoundId).comparedTo(item.issue) >= 0
                                && new ComputeUtils(currItem.issue).comparedTo(item.issue) < 0
                            ) {
                                addList.push(item)
                            }
                        })
                        for (let i = 0; i < addList.length; i++) {
                            let pc28Json: Pc28LotteryJsonType = {
                                data: [
                                    {
                                        expect: addList[i].issue,
                                        open_code: addList[i].code,
                                        open_time: addList[i].gmtCreateStr,
                                        next_expect: addList[i].issue,
                                        next_time: addList[i].gmtCreateStr,
                                    }
                                ]
                            }
                            await new BotRoundModel().saveRound(pc28Json, GameTypeEnum.PC28DI, 1)
                        }
                        lotteryJson.data = [
                            {
                                expect: currItem.issue,
                                open_code: currItem.code,
                                open_time: currItem.gmtCreateStr,
                                next_expect: nextRoundId,
                                next_time: nextTime,
                            }
                        ]
                        break
                    }
                }
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null)
                    }, 1000)
                })
            }
        } catch (err) {
            console.log('卡奖处理出错了', err)
            return null
        }
        return lotteryJson
    }

    /**
     * 获取最新的下期开奖数据
     */
    private getNextJson = async () => {
        // 延迟10秒获取防止其他网站期数不是最新一期的
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(null)
            }, 1000 * 10)
        })
        // 下期结果需要请求其他接口才能获取到
        let nextJson: {
            data: {
                data: {
                    result: Array<{
                        // 当前期数
                        period: string,
                        // 开奖结果
                        result: Array<number>,
                        // 开奖时间
                        kj_time: string,
                    }>,
                    next: {
                        // 下期期数
                        period: string,
                        // 开奖时间
                        kj_time: string
                    }
                }
            }
        } = await request({
            url: 'https://api.xgram.me/api/pc28/get_history_by_website',
            method: 'get'
        })
        return {
            nextRoundId: nextJson.data.data.next.period,
            nextTime: moment(nextJson.data.data.next.kj_time).format('YYYY-MM-DD HH:mm:ss')
        }
        // return {
        //     nextRoundId: '116',
        //     nextTime: moment(nextJson.data.data.next.kj_time).format('YYYY-MM-DD HH:mm:ss')
        // }
    }
}


export default LotteryRequest
