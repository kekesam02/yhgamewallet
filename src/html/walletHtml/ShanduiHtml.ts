/**
 * 闪兑html
 */
import ComputeUtils from "../../commons/compute/ComputeUtils";


class QuickExchangeHtml {
    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成闪兑 html、内容
     * @param rate: USDT 转 trx 汇率
     *      1 trx = 1 USDT * rate
     *      USDT = trx / rate
     */
    public createQuickExchangeHtml = (rate: string, money = 100) => {
        let trx = new ComputeUtils(rate).multiplied(100).getValue()
        let usdt = new ComputeUtils(1000).dividedBy(rate, 2).getValue()
        return `闪兑${this.N
            }100USDT ≈ ${trx}TRX${this.N
            }1000TRX ≈ ${usdt}USDT
        `
    }

    /**
     * 生成开始兑换的 input 数据
     * @param desc: 描述文字 USDT => trx
     */
    public createStartInput = (desc: string,minStr: string, balance: string) => {
        return `${desc}${this.N
        }请输入要闪兑的金额,最小为 ${minStr}${this.N
        }${this.N}当前余额: ${balance}
        `
    }

}



export default QuickExchangeHtml
