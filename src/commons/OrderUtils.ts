import {customAlphabet, nanoid} from "nanoid";


/**
 * 订单相关公共类、比如生成订单id之类的
 *      尽量用字符串生成
 */
class OrderUtils {

    /**
     * 生成上押表唯一id
     */
    public createPledgeUpModelId = (): number => {
        return Number(customAlphabet('0123456789', 18)())
    }

    /**
     * 生成订单表唯一id
     */
    public createPaymentModelId = (): string => {
        return 'dd-' + nanoid(20)
    }

    /**
     * 生成订单表唯一id
     */
    public createHbModelId = (): string => {
        return 'hb' + nanoid(20)
    }

}

export default OrderUtils
