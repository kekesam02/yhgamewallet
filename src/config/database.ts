import { getConfig } from "./config"
import {DataSource} from "typeorm";

const dataSource = new DataSource({
  type: 'mysql',
  host: getConfig().database.host,
  port: getConfig().database.port,
  username: getConfig().database.user,
  password: getConfig().database.password,
  database: getConfig().database.database,
  synchronize: false,
  logging: true,
  // logging: ["error"]
  connectorPackage: 'mysql2',
  dropSchema:false, // 设置为false关闭表覆盖
  entities: ['src/models/**.ts'],
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
})

/**
 * 添加事务处理
 */
export let startTransaction = () => {

}

export default dataSource
