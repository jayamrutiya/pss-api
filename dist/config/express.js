"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./logger");
const env_1 = __importDefault(require("./env"));
const index_1 = __importDefault(require("../routes/index"));
const errorHandler_1 = require("../middlewares/errorHandler");
const events_1 = require("./events");
const subscribers_1 = __importDefault(require("../subscribers"));
const app = (0, express_1.default)();
// Use helmet JS
app.use((0, helmet_1.default)());
// Enable CORS
const whitelist = [
    "http://localhost:3001",
    "http://www.physicalshareindiasolution.in/",
    "http://62.72.30.166/",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            console.log("origin", origin);
            callback(null, true);
        }
        else {
            console.log("Not allowed by CORS");
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)());
// Use body parser to read JSON payloads
app.use(express_1.default.json({ limit: "500mb" }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
    limit: "500mb",
}));
// Use morgan logger
app.use(logger_1.morganLogger);
// Add path to swagger docs
app.use(`${env_1.default.API_ROOT}/docs`, index_1.default.swaggerRouter);
// Register routes
app.use(`${env_1.default.API_ROOT}/test`, index_1.default.testRouter);
app.use(`${env_1.default.API_ROOT}/employee`, index_1.default.employeeRouter);
app.use(`${env_1.default.API_ROOT}/auth`, index_1.default.authRouter);
app.use(`${env_1.default.API_ROOT}/template`, index_1.default.templateRouter);
app.use(`${env_1.default.API_ROOT}/customer`, index_1.default.customerRouter);
app.use(`${env_1.default.API_ROOT}/customer-template`, index_1.default.customerTemplateRouter);
// Use error handling middleware
app.use(errorHandler_1.errorHandler);
app.on(events_1.EventTypes.SET_RESET_PASSWORD, subscribers_1.default.setResetPasswordSubscriber);
exports.default = app;
//# sourceMappingURL=express.js.map