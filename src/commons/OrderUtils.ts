import {customAlphabet} from "nanoid";


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

}

export default OrderUtils
