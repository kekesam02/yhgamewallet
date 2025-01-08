import process from "node:process";
require('./service/bot/WalletBot')
import express from "express";
import errorHandler from "../middlewares/errorHandler";
import logger from "../logger";
import database from "../config/database";
import initRoutes from "./router";
import { initMiddleware } from "../middlewares";
import {getConfig} from "../config/config";
const config = getConfig()
// 创建 Express 应用
const app = express()

database.initialize().then()

// 初始化中间件
initMiddleware(app)

// 初始化路由
initRoutes(app)

// 使用错误处理中间件记录错误日志
app.use(errorHandler)

// 服务器配置
const serverConfig = {
    port: config.APP.walletPort || 3000, // 从配置文件读取端口，默认3000
    hostname: config.APP.host || "localhost", // 从配置文件读取主机名，默认localhost
}
// 启动服务器并监听指定端口
let server = app.listen(serverConfig, () => {
    logger.info(
        `钱包机器人服务 Server is running on http://${serverConfig.hostname}:${serverConfig.port}`
    )
})

process.once('SIGINT', () => server.close())
process.once('SIGTERM', () => server.close())
