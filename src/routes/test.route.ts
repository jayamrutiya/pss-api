import express from "express";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { iocContainer as Container } from "../config/container";
import { ITestService } from "../interfaces/ITestService";
import TestController from "../controllers/TestController";
import getTestDataValidator from "../validators/get-test-data.validator";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const testService = Container.get<ITestService>(TYPES.TestService);
const testController = new TestController(loggerService, testService);

router.post("/", getTestDataValidator, (req, res) =>
  testController.getTestData(req, res)
);

export default router;
