import BotGameModel from "../../models/BotGameModel";
import UserModel from "../../models/UserModel";

const schedule = require('node-schedule');

type PC28LotteryType = {

}

/**
 * PC28游戏实现(类/控制器)
 */
class PC28Controller {

    /**
     * 开始PC28游戏
     */
    public startPCLow = async () => {
        console.log('开始pc28游戏')
        let result = await BotGameModel.find()
        console.log('查询到的正在进行游戏的群组', result)
    }

    /**
     * 获取pc28开奖结果、并处理开奖结果
     */
    public getLottery = async () => {
        let json = await this.mockLottery()
    }









    /**
     * 模拟获取中奖数据
     */
    public mockLottery = () => {
        return Promise.resolve({
            "rows": 5,
            "t": "jisu28",
            "message": "试用接口第一位开奖号码随机错乱,如需查看完整号码，请访www.openjiang.com购买付费接口!",
            "data": [
                {
                    "expect": "73674886",
                    "open_code": "9,7,3",
                    "open_time": "2024-12-13 22:13:00",
                    "next_expect": "73674887",
                    "next_time": "2024-12-13 22:14:15"
                },
                {
                    "expect": "73674885",
                    "open_code": "1,5,7",
                    "open_time": "2024-12-13 22:11:45",
                    "next_expect": "73674886",
                    "next_time": "2024-12-13 22:13:00"
                },
                {
                    "expect": "73674884",
                    "open_code": "6,2,3",
                    "open_time": "2024-12-13 22:10:30",
                    "next_expect": "73674885",
                    "next_time": "2024-12-13 22:11:45"
                },
                {
                    "expect": "73674883",
                    "open_code": "1,2,3",
                    "open_time": "2024-12-13 22:09:15",
                    "next_expect": "73674884",
                    "next_time": "2024-12-13 22:10:30"
                },
                {
                    "expect": "73674882",
                    "open_code": "2,7,1",
                    "open_time": "2024-12-13 22:08:00",
                    "next_expect": "73674883",
                    "next_time": "2024-12-13 22:09:15"
                }
            ]
        })
    }
}



export default PC28Controller
