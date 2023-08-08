import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { CustomerTemplateController } from "../controllers/CustomerTemplateController";
import passport from "../middlewares/passport";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const customerTemplateService = Container.get<ICustomerTemplateService>(
  TYPES.CustomerTemplateService
);
const customerTemplateController = new CustomerTemplateController(
  loggerService,
  customerTemplateService
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.getCustomerTemplateByTypeAndCustomerId(req, res);
  }
);

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  customerTemplateController.createCustomerTemplate(req, res)
);

router.post(
  "/word",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.createWordFileCustomerTemplate(req, res);
  }
);

export default router;
