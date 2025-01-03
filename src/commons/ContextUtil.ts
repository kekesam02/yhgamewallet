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
    public static getUserName = (ctx: Context): string => {
        if (ctx.callbackQuery?.from && ctx.callbackQuery.from?.username) {
            return `${ctx.callbackQuery.from.username}`
        }
        return `${ctx?.from?.username}`
    }

    /**
     * 获取用户别名
     * @param ctx
     */
    public static getNickName = (ctx: Context): string => {
        if (ctx.callbackQuery?.from && ctx.callbackQuery.from.first_name) {
            return `${ctx.callbackQuery.from.first_name}${ctx.callbackQuery.from.last_name}`
        }
        return `${ctx.from?.first_name}${ctx.from?.last_name}`
    }

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
