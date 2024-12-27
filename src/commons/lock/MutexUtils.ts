/**
 * 互斥锁
 */
import Redlock from 'redlock'
import redis from "../../config/redis";
import {Context, Telegraf} from "telegraf";
import ContextUtil from "../ContextUtil";

const redlock = new Redlock([redis])


/**
 * 添加分布式锁根据 tgid 锁定
 * @param tgList
 * @param fn
 */
const addLockByTgId = async (tgList: Array<string>, fn: () => Promise<void>) => {
    return addLock(tgList, fn)
}

/**
 * 添加分布式锁根据 ctx.tgId 锁定
 */
const addLockByCtx = async (ctx: Context, fn: () => Promise<void>) => {
    // 分布式锁的key
    let lockKey = [ContextUtil.getUserId(ctx)]
    return addLock(lockKey, fn)
}

const addLock = async (lockKeyList: Array<string>, fn: () => Promise<void>) => {
    // 锁持续时间
    let lockTTL = 10000
    console.log('加锁====================')
    let lock = await redlock.acquire(lockKeyList, lockTTL)
    try {
        // 执行异步操作
        console.log('执行====================')
        await fn()
        console.log('完毕====================')
    } finally {
        // 释放锁
        await redlock.release(lock)
        console.log('解锁====================')
    }
}

export {
    addLockByCtx,
    addLockByTgId
}
