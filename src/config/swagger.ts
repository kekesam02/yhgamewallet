import swaggerJsdoc from "swagger-jsdoc";
import { getConfig } from "./config";

const config = getConfig();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: config.app.name,
      version: "1.0.0",
      description: "API documentation for the application",
    },
    servers: [
      {
        url: `http://${config.app.host}:${config.app.gamePort}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"], // 指定 API 文档的路径
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
