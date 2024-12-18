/**
 * 游戏机器人 - 生成用户相关的html信息
 */
import UserModel from "../../models/UserModel";

class GameUserHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成用户余额
     */
    public getUserBalanceHtml = (user: UserModel) => {
        return `昵称：${user.userName}${this.N
            }ID: ${user.tgId}${this.N
            }USDT: ${user.USDT}${this.N
            }TRX: ${user.TRX}${this.N
            }彩U: ${user.CUSDT}${this.N
            }彩T: ${user.CTRX}
        `
    }
}



export default GameUserHtml
