import helmet from "helmet";
import { Express } from "express";

/**
 * 处理一些基本的安全问题
 * @param app
 */
export const helmetMiddleware = (app: Express) => {
  app.use(helmet());
};
