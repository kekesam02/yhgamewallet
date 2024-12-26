/**
 * 游戏指令html 生成器
 */
import BotPledgeUpModel from "../../models/BotPledgeUpModel";

class GameCommandHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生长指令 html
     */
    public createCommandHtml = () => {
        return `
            【余额、ye】：查看个人余额${this.N
            }【注单、zd】：查看个人下注列表${this.N
            }【流水、ls】：查看今日总下注流水${this.N
            }【返水、反水、fs】：领取反水${this.N
            }【取消、qx】：取消本期所有下注${this.N
            }【开奖、kj】：查看近期开奖历史${this.N
            }【大、D】下注大${this.N
            }【小、x】下注小${this.N
            }【单、d】下注单${this.N
            }【双、s】下注双${this.N
            }【大单、dd】下注大单${this.N
            }【大双、ds】下注大双${this.N
            }【小单、xd】下注小单${this.N
            }【小双、xs】下注小双${this.N
            }【对子、dz】下注对子${this.N
            }【顺子、sz】下注顺子${this.N
            }【豹子、bz】下注豹子${this.N
            }【极大、jd】下注极大${this.N
            }【极小、jx】下注极小${this.N
            }【梭哈、sh】梭哈当前所有余额，彩金优先消耗完所有彩金
        `
    }

    /**
     * 生成官方维护html
     */
    public repairHtml = () => {
        return `\uD83D\uDCE3\uD83D\uDCE3尊敬的各位老板：${this.N
        }加拿大PC28官方停盘休息，请耐心等待加拿大PC28官方开奖，请各位老板稍作休息，等待开盘！${this.N
        }加拿大官方封盘时间为：${this.N}
        ${this.N
        }⏱️封盘时间：20:00 - 20:35左右${this.N}
        ${this.N
        }\uD83D\uDCB0具体时间请以官方开奖为准，谢谢各位大佬对一号公馆的支持与理解，祝各位老板们天天提款，荷包满满！
        `
    }

    /**
     * 生成注单 html 带复制功能
     */
    public createNoteOrder = (pledgeUpModels: Array<BotPledgeUpModel>): string => {
        let length1 = 12
        let length2 = 8
        let length3 = 8
        let html = '<pre><code>'
        html +=  `期数`.padEnd(length1, ' ')
        html += `下注`.padEnd(length2, ' ')
        html += `金额`.padEnd(length3, ' ')
        html += `赔付${this.N}`
        pledgeUpModels.forEach(item => {
            html = html + `${item.roundId}`.padEnd(length1, ' ')
                + `${item.content}`.padEnd(length2, ' ')
                + `${item.amountMoney}`.padEnd(length3, ' ')
                + `${item.winningAmount}${this.N}`
        })
        html += '</code></pre>'
        return html
    }
}



export default GameCommandHtml
