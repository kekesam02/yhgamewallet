/**
 * 获取 telegraf 中常用数据的一些公共方法
 */
import {Context} from "telegraf";
import AESUtils from "./AESUtils";


class ContextUtil{

    /**
     * 获取用户id
     * @param ctx
     * @param isPwd: 是否加密
     *     true: 加密后的数据
     *     false: 未加密的数据
     */
    public static getUserId = (ctx: Context, isPwd: boolean = true): string => {
        if (!isPwd) {
            if (ctx.callbackQuery?.from.id) {
                return `${ctx.callbackQuery?.from.id}`
            }
            return `${ctx?.from?.id}`
        }
        if (ctx.callbackQuery?.from.id) {
            return AESUtils.encodeUserId(`${ctx.callbackQuery?.from.id}`)
        }
        return AESUtils.encodeUserId(`${ctx?.from?.id}`)
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
