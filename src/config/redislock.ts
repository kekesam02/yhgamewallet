// @TS-NOCHECK
import Redlock from 'redlock'
import redis from "./redis";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";

/**
 * 互斥锁
 */
const redlock = new Redlock([redis as Redlock.CompatibleRedisClient])


/**
 * 添加分布式锁根据 tgid 锁定
 * @param tgList
 * @param fn
 * @param efn
 * @param lockTTL
 */
const addLockByTgId = async (tgList: Array<string>, fn: () => Promise<any>, efn: () => Promise<any>, lockTTL = 1000 * 30) => {
    return addLock(tgList, fn, efn, lockTTL)
}

/**
 * 添加分布式锁根据 ctx.tgId 锁定
 */
const addLockByCtx = async (ctx: Context, fn: () => Promise<any>, efn: () => Promise<any>, lockTTL = 1000 * 30) => {
    // 分布式锁的key
    let lockKey = ContextUtil.getUserId(ctx)
    return addLock(lockKey, fn, efn, lockTTL)
}

const addLock = async (
    lockKeyList: Array<string> | string,
    fn: () => Promise<any>,
    efn: () => Promise<any>,
    lockTTL = 1000  * 30
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lock = await redlock.lock(lockKeyList, lockTTL)
            let result = await fn()
            resolve(result)
            await redlock.unlock(lock)
        } catch (err) {
            await efn()
            reject(err)
        }
    })
}

export {
    addLockByCtx,
    addLockByTgId,
    addLock
}
