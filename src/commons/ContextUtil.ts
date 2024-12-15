/**
 * 获取 telegraf 中常用数据的一些公共方法
 */
import {Context} from "telegraf";

class ContextUtil {

    /**
     * 获取群组id
     */
    public static getGroupId = (ctx: Context) => {
        return ctx.callbackQuery?.message?.chat.id
    }
}


export default ContextUtil
