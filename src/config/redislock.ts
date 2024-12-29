// @ts-nocheck
import Redlock from 'redlock'
import redis from "./redis";
import {Context, Telegraf} from "telegraf";
import ContextUtil from "../commons/ContextUtil";

/**
 * 互斥锁
 */
const redlock = new Redlock([redis as Redlock.CompatibleRedisClient])


/**
 * 添加分布式锁根据 tgid 锁定
 * @param tgList
 * @param fn
 * @param lockTTL
 */
const addLockByTgId = async (tgList: Array<string>, fn: () => Promise<any>, efn: () => Promise<any>, lockTTL = 1000 * 30) => {
    return addLock(tgList, fn, lockTTL,efn)
}

/**
 * 添加分布式锁根据 ctx.tgId 锁定
 */
const addLockByCtx = async (ctx: Context, fn: () => Promise<any>, efn: () => Promise<any>, lockTTL = 1000 * 30) => {
    // 分布式锁的key
    let lockKey = [ContextUtil.getUserId(ctx)]
    return addLock(lockKey, fn, lockTTL,efn)
}

const addLock = async (lockKeyList: Array<string>, fn: () => Promise<any>, lockTTL = 1000  * 30, efn: () => Promise<any>) => {
    try {
        let lock = await redlock.lock(lockKeyList, lockTTL)
        try {
            // 执行异步操作
            await fn()
        }finally {
            // 释放锁
            await redlock.unlock(lock)
        }
    } catch (e){
        await efn()
    }
}

export {
    addLockByCtx,
    addLockByTgId
}
