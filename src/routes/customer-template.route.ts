import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { CustomerTemplateController } from "../controllers/CustomerTemplateController";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const customerTemplateService = Container.get<ICustomerTemplateService>(
  TYPES.CustomerTemplateService
);
const customerTemplateController = new CustomerTemplateController(
  loggerService,
  customerTemplateService
);

export default router;
