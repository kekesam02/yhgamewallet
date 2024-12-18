/**
 * 游戏机器人 - 生成用户相关的html信息
 */
import UserModel from "../../models/UserModel";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import AESUtils from "../../commons/AESUtils";

class GameUserHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成用户余额
     */
    public getUserBalanceHtml = (user: UserModel) => {
        return `昵称：${user.userName}${this.N
            }ID: ${AESUtils.decodeUserId(user.tgId)}${this.N
            }USDT: ${user.USDT}${this.N
            }TRX: ${user.TRX}${this.N
            }彩U: ${user.CUSDT}${this.N
            }彩T: ${user.CTRX}
        `
    }

    /**
     * 获取投注记录列表html
     */
    public getPledgeHtml = (list: Array<BotPledgeUpModel>): string => {
        let length1 = 10
        let length2 = 7
        let length3 = 7
        let html =  `期数`.padEnd(length1, ' ')
        html += `下注`.padEnd(length2, ' ')
        html += `金额`.padEnd(length3, ' ')
        html += `赔付${this.N}`
        list.forEach(item => {
            html = html + `${item.roundId}`.padEnd(length1, ' ')
                + `${item.content}`.padEnd(length2, ' ')
                + `${item.amountMoney}`.padEnd(length3, ' ')
                + `${item.winningAmount}${this.N}`
        })
        return html
    }
}



export default GameUserHtml
