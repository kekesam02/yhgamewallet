import { getConfig } from "./config"
import {DataSource} from "typeorm";
import UserModel from "../models/UserModel";



const seq = new DataSource({
  type: 'mysql',
  host: getConfig().database.host,
  port: getConfig().database.port,
  username: getConfig().database.user,
  password: getConfig().database.password,
  database: getConfig().database.database,
  synchronize: true,
  connectorPackage: 'mysql2',
  entities: ['src/models/**.ts'],
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],

})

export default seq
