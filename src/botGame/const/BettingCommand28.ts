/**
 * 下注指令相关
 */
import {Content} from "node-html-to-image/dist/types";
import BotGameModel from "../../models/BotGameModel";


class BettingCommand28 {

    /**
     * 大
     */
    public D = ['大', 'D']

    /**
     * 小
     */
    public X = ['小', 'x']

    /**
     * 单
     */
    public d = ['单', 'd']

    /**
     * 双
     */
    public s = ['双', 's']

    /**
     * 大单
     */
    public dd = ['大单', 'dd']

    /**
     * 小单
     */
    public xd = ['小单', 'xd']


    /**
     * 大双
     */
    public ds = ['大双', 'ds']

    /**
     * 小双
     */
    public xs = ['小双', 'xs']

    /**
     * 对子
     */
    public dz = ['对子', 'dz']

    /**
     * 顺子
     */
    public sz = ['顺子', 'sz']

    /**
     * 豹子
     */
    public bz = ['豹子', 'bz']

    /**
     * 极大
     */
    public jd = ['极大', 'jd']

    /**
     * 极小
     */
    public jx = ['极小', 'jx']

    /**
     * 梭哈
     */
    public sh = ['梭哈', 'sh']

    /**
     * 监听用户 pc28 下注指令
     * @param ctx
     * @param group 当前所在群组信息
     */
    public listenerCommand = (ctx: Content, group: BotGameModel) => {

    }
}


export default BettingCommand28
