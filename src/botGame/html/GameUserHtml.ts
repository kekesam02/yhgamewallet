/**
 * 游戏机器人 - 生成用户相关的html信息
 */
import UserModel from "../../models/UserModel";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import AESUtils from "../../commons/AESUtils";
import {Context} from "telegraf";
import ContextUtil from "../../commons/ContextUtil";

class GameUserHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成用户余额
     */
    public getUserBalanceHtml = (user: UserModel) => {
        let userId = AESUtils.decodeUserId(user.tgId)
        return `昵称：<a href="tg://user?id=${userId}">${user.userName}</a>${this.N
            }ID: <code>${userId}</code>${this.N
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

    /**
     * 获取用户流水html数据
     */
    public getUserPaymentHtml = (ctx: Context, {
        gameType,
        dayWater,
        weekWater,
        totalWater
    }: {
        gameType: string,
        dayWater: string,
        weekWater: string,
        totalWater : string
    }) => {
        let userId = ContextUtil.getUserId(ctx)
        let firstName = ctx?.from?.first_name ?? ''
        return `当前游戏类型：${gameType}${this.N
        }昵称: ${firstName}${this.N
        }ID: ${userId}${this.N
        }总流水: ${totalWater}${this.N
        }周流水: ${weekWater}${this.N
        }今日流水: ${dayWater}
        `
    }

    /**
     * 获取用户盈亏数据
     */
    public getUserProfitLossHtml = (ctx: Context, {
        gameType,
        dayWater,
        weekWater,
        totalWater
    }: {
        gameType: string,
        dayWater: string,
        weekWater: string,
        totalWater : string
    }) => {
        let userId = ContextUtil.getUserId(ctx)
        let firstName = ctx?.from?.first_name ?? ''
        return `当前游戏类型：${gameType}${this.N
        }昵称: ${firstName}${this.N
        }ID: ${userId}${this.N
        }总盈亏: ${totalWater}${this.N
        }周盈亏: ${weekWater}${this.N
        }今日盈亏: ${dayWater}
        `
    }
}



export default GameUserHtml
