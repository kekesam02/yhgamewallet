/**
 * 娱乐机器人下注控制器
 */
import BotOddsModel from "../../models/BotOddsModel";
import BotOddsStorage from "../../storage/BotOddsStorage";
import {Context} from "telegraf";
import BotGameModel from "../../models/BotGameModel";


class BettingController {

    // 当前传入的下注相关指令
    private text: string = ''
    private ctx: Context

    constructor(ctx: Context, text: string) {
        this.text = text
        this.ctx = ctx
    }

    // private XD = ['小单', 'xd']
    //
    // // 小双
    // private XS = ['小双', 'xs']
    //
    // // 大单
    // private DD = ['大单', 'dd']
    //
    // // 大双
    // private DS = ['大双', 'ds']
    //
    // private bigMap = {
    //     name: '大',
    //     alias: 'D',
    //     list: []
    // }

    /**
     * 监听下注指令
     */
    public listenerBettingCommand = async () => {
        let group = await new BotGameModel().getCurrGroup(this.ctx)
        console.log('当前群组', group)
        let oddsList = await BotOddsStorage.getOddsListGame(group.gameType)
        console.log('获取到的数据=============', oddsList)
    }

}



export default BettingController
