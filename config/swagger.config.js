// config/swagger.config.js
import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DSWU Mini Project API",
      version: "1.0.0",
      description: "덕성여대 미니프로젝트 Web 1팀 API",
    },
    servers: [
      {
        url: "http://52.79.186.244:3000",
        description: "개발 서버",
      }
    ],
  },
  apis: ["./src/routes/*.js", "./swagger/*"], // 경로를 맞추어주세요.
};

export const specs = SwaggerJsdoc(options);
