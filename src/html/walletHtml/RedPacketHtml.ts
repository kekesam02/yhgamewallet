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
        return `🧧 ${userModel.userName} 发送了一个红包${this.N
        }🕔 时间：${moment(botHb.createTime).format('YYYY-MM-DD: HH:mm:ss')}${this.N
        }💵 总金额: ${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}${this.N
        }状态: ${botHb.status == 0? '进行中': '已结束'}${this.N
        }红包类型: 随机${this.N
        }数量: ${botHb.num}/${botHb.num}${this.N
        }${this.N
        }备注：${botHb.remark ?? ''}
        `
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
        if (payment.length > 0) {
            let html = `🧧 ${user.userName} 发送了一个红包${this.N
            }💵 总金额: ${botHb.money} ${walletStr}${this.N
            }💰 剩余: ${botHb.receiveNum}/${botHb.num}${this.N
            }
             `
            payment.forEach(item => {
                html += `${this.N}-- ${item.username} 已领取 ${item.paymentAmount} ${walletStr}`
            })
        }
        return `🧧 ${user.userName} 发送了一个红包${this.N
            }💵 总金额: ${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}${this.N
            }💰 剩余: ${botHb.num}/${botHb.num}`
    }
}


export default RedPacketHtml
