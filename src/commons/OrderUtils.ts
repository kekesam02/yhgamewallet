import {customAlphabet, nanoid} from "nanoid";


/**
 * 订单相关公共类、比如生成订单id之类的
 *      尽量用字符串生成
 */
class OrderUtils {

    // 默认使用的字符
    private charStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    /**
     * 生成上押唯一id
     */
    public createPledgeUpModelId = (): number => {
        return Number(customAlphabet('0123456789', 18)())
    }

    /**
     * 生成订单唯一id
     */
    public createPaymentModelId = (): string => {
        return 'dd-' + customAlphabet(this.charStr, 21)()
    }

    /**
     * 生成红包的唯一
     */
    public createHbModelId = (): string => {
        return 'hb-' + customAlphabet(this.charStr, 21)()
    }

}

export default OrderUtils
