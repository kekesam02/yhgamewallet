import {Context} from "telegraf";

/**
 * redis 控制器
 */
class RedisHandle {

    /**
     * 红包在 redis 中存储的 key 值
     *      RedPacket_ + tgId
     */
    public static RedPacketRedisKey = 'RedPacket_'

}

export default RedisHandle
