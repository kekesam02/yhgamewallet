import request from "../commons/request/request";
import GameScheduleHandle from "../commons/schedule/GameScheduleHandle";
import {Pc28LotteryJsonType} from "../type/gameEnums/LooteryJsonType";
import moment from "moment";
import ComputeUtils from "../commons/compute/ComputeUtils";


/**
 * 获取开奖结果数据
 */
class LotteryRequest {

    /**
     * 获取开奖 json 数据
     */
    public getLotteryJson = async (): Promise<Pc28LotteryJsonType> => {
        return new Promise<Pc28LotteryJsonType>((resolve, reject) => {
            this.request1().then((val) => {
                console.log('第一个接口返回的数据', val)
                resolve(val)
            })
            this.request2().then((val) => {
                console.log('第二个接口返回的数据', val)
                resolve(val)
            })
        })
    }

    /**
     * 获取第一个接口开奖数据
     */
    public request1 = async (): Promise<Pc28LotteryJsonType> => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
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
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null)
                }, 1000)
            })
        }
        return lotteryJson
    }

    /**
     * 获取第二个接口开奖数据
     */
    public request2 = async (): Promise<Pc28LotteryJsonType> => {
        let roundId = GameScheduleHandle.pc28Config.roundId
        let lotteryJson: Pc28LotteryJsonType = {
            data: []
        }
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

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null)
                }, 1000)
            })
        }
        return lotteryJson
    }
}


export default LotteryRequest
