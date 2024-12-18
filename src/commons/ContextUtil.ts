/**
 * 获取 telegraf 中常用数据的一些公共方法
 */
import {Context} from "telegraf";
import AESUtils from "./AESUtils";


class ContextUtil{

    /**
     * 获取用户id(加密后的)
     */
    public static getUserId = (ctx: Context): string => {
        return AESUtils.encodeUserId(`${ctx.callbackQuery?.from.id}`)
    }

    /**
     * 获取用户名称
     */
    // public static getUserName = (ctx: Context): string => {
    //     return {
    //         ctx.callbackQuery?.from.id
    //     }
    // }

    /**
     * 获取群组id
     */
    public static getGroupId = (ctx: Context) => {
        if (ctx.callbackQuery) {
            return `${ctx.callbackQuery?.message?.chat.id}`
        } else {
            return `${ctx.message?.chat.id}`
        }
    }
}


export default ContextUtil
