

/**
 * 娱乐机器人下注控制器
 */
class BettingController {

    // 当前传入的下注相关指令
    private text: string = ''

    constructor(text: string) {
        this.text = text
        this.listenerBettingCommand()
    }

    // 小单
    private XD = ['小单', 'xd']

    // 小双
    private XS = ['小双', 'xs']

    // 大单
    private DD = ['大单', 'dd']

    // 大双
    //private DS = ['大双', 'ds']

    private bigMap = {
        name: '大',
        alias: 'D',
        list: []
    }

    /**
     * 监听下注指令
     */
    private listenerBettingCommand = () => {

    }

}



export default BettingController
