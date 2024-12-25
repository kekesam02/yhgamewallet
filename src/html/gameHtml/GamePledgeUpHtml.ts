import CommonEnumsIndex from "../../type/CommonEnumsIndex";
import AESUtils from "../../commons/AESUtils";
import UserModel from "../../models/UserModel";
import BotPledgeUpModel, {PledgeUpInfoType} from "../../models/BotPledgeUpModel";
import WalletType from "../../type/WalletType";

/**
 * 娱乐机器人 - 上注相关
 */
class GamePledgeUpHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 取消上注
     */
    public cancelUp = (
        user: UserModel,
        pledgeUpList: Array<BotPledgeUpModel>,
        roundId: string
    ) => {
        let content = ''
        pledgeUpList.forEach(item => {
            let wallTypeStr = new CommonEnumsIndex().getWalletTypeStr(item.walletType)
            content = `${content}${item.content}${wallTypeStr}${this.N}`
        })
        if (content == '') {
            content = '无'
        }
        let userId = AESUtils.decodeUserId(user.tgId)
        return `
            ${user.userName} 【${userId}】${this.N
            }当前期号：<code>${roundId}</code>${this.N
            }取消下注内容${this.N
            }${content}${this.N
            }---------------${this.N
            }余额: ${this.N
            }USDT: ${user.USDT}${this.N
            }TRX: ${user.TRX}${this.N
            }彩U: ${user.CUSDT}${this.N
            }彩t: ${user.CTRX}
        `
    }
}



export default GamePledgeUpHtml
