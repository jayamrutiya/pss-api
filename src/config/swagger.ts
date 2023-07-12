// Require Swagger UI Express and Swagger JS Docs
import swaggerJsdoc from "swagger-jsdoc";

// Load ENV variables into app
import ENV from "./env";

// Options for Swagger JS Docs
const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: `node-setup API`,
      version: "1.0",
      description: "A document sharing platform.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: `http://localhost:${ENV.PORT}${ENV.API_ROOT}`,
      },
      {
        url: `http://3.142.173.113:80${ENV.API_ROOT}`,
      },
    ],
    schemes: ["http"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          name: "Authorization",
          scheme: "bearer",
          bearerFormat: "Bearer",
        },
      },
    },
  },
  apis: [`${ENV.APP_ROOT}/src/routes/**/*.ts`],
};

// create swagger specification
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
