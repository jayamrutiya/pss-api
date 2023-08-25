import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { morganLogger } from "./logger";
import ENV from "./env";
import routers from "../routes/index";
import { errorHandler } from "../middlewares/errorHandler";
import { EventTypes } from "./events";
import subscribers from "../subscribers";

const app = express();

// Use helmet JS
app.use(helmet());

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
    } else {
      console.log("Not allowed by CORS");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors());
// Use body parser to read JSON payloads
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);

// Use morgan logger
app.use(morganLogger);

// Add path to swagger docs
app.use(`${ENV.API_ROOT}/docs`, routers.swaggerRouter);

// Register routes
app.use(`${ENV.API_ROOT}/test`, routers.testRouter);
app.use(`${ENV.API_ROOT}/employee`, routers.employeeRouter);
app.use(`${ENV.API_ROOT}/auth`, routers.authRouter);
app.use(`${ENV.API_ROOT}/template`, routers.templateRouter);
app.use(`${ENV.API_ROOT}/customer`, routers.customerRouter);
app.use(`${ENV.API_ROOT}/customer-template`, routers.customerTemplateRouter);

// Use error handling middleware
app.use(errorHandler);

app.on(EventTypes.SET_RESET_PASSWORD, subscribers.setResetPasswordSubscriber);

export default app;
