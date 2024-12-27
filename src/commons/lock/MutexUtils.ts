/**
 * 互斥锁
 */
import {Mutex} from "async-mutex";


const MutexUtils = new Mutex()


/**
 * 使用异步锁
 */
const accessResource = async (fn: () => Promise<void>) => {
    let release: any
    try {
        console.log('进入异步锁=====================')
        release = await MutexUtils.acquire()
        await fn()
    } finally {
        // 释放锁
        if (release) {
            await release()
        }
    }
}

export {
    accessResource
}

export default MutexUtils
