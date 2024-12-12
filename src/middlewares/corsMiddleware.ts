import cors from 'cors';
import { Express } from 'express';
import { getConfig } from '../config/config';

/**
 * cros 跨域配置
 * @param app
 */
export const corsMiddleware = (app: Express) => {
  const corsOptions = getConfig().cors;
  app.use(cors(corsOptions));
};
