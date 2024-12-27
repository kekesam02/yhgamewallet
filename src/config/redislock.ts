import {getConfig} from "./config";
const redis = require('redis');
const Redlock = require('redlock');
const redisClient = redis.createClient(getConfig().redis);
// 创建Redlock实例，需要传入Redis客户端和重试次数
const redisLock = new Redlock([redisClient], {
  driftFactor: 0.01, // 默认值
  retryCount: 10, // 默认值
  retryDelay: 200 // 默认值
});

export  default redisLock