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
     * @param user: 用户对象
     * @param isHtml: 是否返回 html 字符串对象
     *      true: 返回html 字符串对象
     *      false: 返回 poop 弹窗字符串(里面不能包含 html 标签)
     */
    public getUserBalanceHtml = (user: UserModel, isHtml = false) => {
        let userId = AESUtils.decodeUserId(user.tgId)
        return `${this.createName(userId, user.userName, isHtml)}${this.N
            }USDT: ${user.USDT}${this.N
            }TRX: ${user.TRX}${this.N
            }彩U: ${user.CUSDT}${this.N
            }彩T: ${user.CTRX}
        `
    }

    /**
     * 获取投注记录列表html
     * @param list: 用户上押列表
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
     * @param ctx
     * @param {
     *     gameType: 游戏类型描述字段
     *     dayWater: 用户当日流水金额
     *     weekWater: 用户周流水金额
     *     totalWater: 用户总流水金额
     * }
     * @param isHtml
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
    }, isHtml: boolean = false) => {
        let userId = ContextUtil.getUserId(ctx, false)
        let firstName = ctx?.from?.first_name ?? ''
        return `当前游戏类型: ${gameType}${this.N
        }${this.createName(userId, firstName, isHtml)}${this.N
        }总流水: ${totalWater}${this.N
        }周流水: ${weekWater}${this.N
        }今日流水: ${dayWater}
        `
    }

    /**
     * 获取用户盈亏数据
     * @param ctx
     * @param {
     *     gameType: 游戏类型描述字段
     *     dayWater: 用户当日流水金额
     *     weekWater: 用户周流水金额
     *     totalWater: 用户总流水金额
     * }
     * @param isHtml: 返回格式是否为 html
     *      true: 格式为 html (带标签的字符串)
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
    }, isHtml: boolean = false) => {
        let userId = ContextUtil.getUserId(ctx, false)
        let firstName = ctx?.from?.first_name ?? ''
        return `当前游戏类型: ${gameType}${this.N
        }${this.createName(userId, firstName, isHtml)}${this.N
        }总盈亏: ${totalWater}${this.N
        }周盈亏: ${weekWater}${this.N
        }今日盈亏: ${dayWater}
        `
    }

    /**
     * 生成用户昵称和id string
     * @param userId: 用户id
     * @param name: 用户名称
     * @param isHtml: 是否是 html 格式
     */
    public createName = (
        userId: string,
        name: string,
        isHtml: boolean = false
    ) => {
        if (isHtml) {
            return `昵称: <a href="tg://user?id=${userId}">${name}</a>${this.N
            }ID: <code>${userId}</code>`
        }
        return `昵称: ${name}${this.N
            }ID: ${userId}`
    }
}



export default GameUserHtml
