import BotHb from "../../models/BotHb";
import UserModel from "../../models/UserModel";
import moment from "moment";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";
import BotPaymentModel from "../../models/BotPaymentModel";


/**
 * 红包相关的html
 */
class RedPacketHtml {
    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 成功生成红包的html
     */
    public getSuccessHtml = (userModel: UserModel, botHb: BotHb) =>{
        console.log('用户数据', userModel)
        let html = `🧧 ${userModel.userName} 发送了一个红包${this.N
        }🕔 时间：${moment(botHb.createTime).format('YYYY-MM-DD: HH:mm:ss')}${this.N
        }💵 总金额: ${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}${this.N
        }状态: ${botHb.status == 0? '进行中': '已结束'}${this.N
        }红包类型: 随机${this.N
        }数量: ${botHb.num}/${botHb.num}`
        html += this.createReceiveConditionHtml(botHb)
        if (botHb.remark && botHb.remark != '' &&  botHb.remark.trim() != '') {
            html += `${this.N}${this.N}备注: ${botHb.remark}`
        }
        return html
    }

    /**
     * 获取发送红包成功的html
     */
    public getSendHtml = (
        user: UserModel,
        botHb: BotHb,
        payment: Array<BotPaymentModel>
    ) => {
        let walletStr = new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)
        let html = ''
        if (payment.length > 0) {
            html = `🧧 ${user.userName} 发送了一个红包${this.N
            }💵 总金额: ${botHb.lqMoney}/${botHb.money} ${walletStr}${this.N
            }💰 剩余: ${botHb.num - botHb.receiveNum}/${botHb.num}${this.N}`
            payment.forEach(item => {
                html += `${this.N}-- ${item.username} 已领取 ${item.paymentAmount} ${walletStr}`
            })
        } else {
            html = `🧧 ${user.userName} 发送了一个红包${this.N
            }💵 总金额: ${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}${this.N
            }💰 剩余: ${botHb.num}/${botHb.num}`
        }

        html += this.createReceiveConditionHtml(botHb)
        if (botHb.remark && botHb.remark != '' &&  botHb.remark.trim() != '') {
            html += `${this.N}${this.N}备注: ${botHb.remark}`
        }
        return html
    }

    /**
     * 设置红包领取条件html
     */
    public getConditionHtml = (user: UserModel, botHb: BotHb) => {
        let html = `🧧 ${user.userName} 发送了一个红包${this.N
        }💵 总金额: ${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}${this.N
        }💰 剩余: ${botHb.num}/${botHb.num}`

        html += this.createReceiveConditionHtml(botHb)
        if (botHb.remark && botHb.remark != '' &&  botHb.remark.trim() != '') {
            html += `${this.N}${this.N}备注: ${botHb.remark}`
        }
        return html
    }

    /**
     * 生成红包流水金额
     */
    public createRedWaterMoney = () => {
        return `\uD83D\uDCA6 请输入流水红包金额(u)${this.N
            }${this.N}\uD83D\uDCA1 trx的流水会按汇率换成u来计算`
    }





    /**
     * 生成领取条件html
     */
    private createReceiveConditionHtml = (botHb: BotHb) => {
        let html = ``
        // 会员红包
        if (botHb.conditonshy == 1) {
            html = `${this.N}\uD83D\uDCB0 仅限 Premium会员领取`
        }
        // 流水红包
        if (botHb.conditonsls == 1 && botHb.getConditionJson()) {
            html = `${this.N}\uD83D\uDCA6 流水要求${this.N
            }流水时间: ${this.getWaterTime(botHb)}${this.N
            }流水金额: ${botHb.getConditionJson()?.money}`
        }
        return html
    }

    /**
     * 获取红包流水时间
     */
    public getWaterTime = (botHb: BotHb) => {
        switch (botHb.getConditionJson()!.time) {
            case 0:
                return '日流水'
            case 1:
                return '近七天'
            case 2:
                return '近30天'
            case 3:
                return '本月'
            case 4:
                return '总流水'
            default:
                return '日流水'
        }
    }
}


export default RedPacketHtml
