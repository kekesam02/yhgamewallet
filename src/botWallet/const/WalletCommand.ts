/**
 * 游戏常用指令类
 */
import WalletBotHtml from "../html/WalletBotHtml";
import {Context} from "telegraf";

class WalletCommand {

    /**
     * 指令命令
     */
    public static command = ['指令']

    /**
     * 注单指令
     */
    public static noteOrder = ['注单', 'zd']

    /**
     * 开奖指令
     */
    public static openWinner = ['开奖', 'kj']

    /**
     * 余额
     */
    public static balance = ['余额', 'ye']

    /**
     * 反水
     */
    public static defect = ['反水', '返水', 'fs']

    /**
     * 取消
     */
    public static cancel = ['取消', 'qx']

    /**
     * 流水
     */
    public static water = ['流水', 'ls']

    /**
     * 盈亏
     */
    public static profitLoss = ['盈亏', 'yk']
}


export default WalletCommand
