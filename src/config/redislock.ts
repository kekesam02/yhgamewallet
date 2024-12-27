import redis from "./redis";
const Redlock = require('redlock');
// 创建Redlock实例，需要传入Redis客户端和重试次数
const redisLock = new Redlock([redis], {
  driftFactor: 0.01, // 默认值
  retryCount: 10, // 默认值
  retryDelay: 200 // 默认值
});



export  default redisLock