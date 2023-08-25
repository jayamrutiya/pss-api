"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require Swagger UI Express and Swagger JS Docs
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Load ENV variables into app
const env_1 = __importDefault(require("./env"));
// Options for Swagger JS Docs
const options = {
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
                url: `http://localhost:${env_1.default.PORT}${env_1.default.API_ROOT}`,
            },
            {
                url: `http://3.142.173.113:80${env_1.default.API_ROOT}`,
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
    apis: [`${env_1.default.APP_ROOT}/src/routes/**/*.ts`],
};
// create swagger specification
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map