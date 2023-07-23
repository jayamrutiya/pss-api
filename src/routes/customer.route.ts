import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerService } from "../interfaces/ICustomerService";
import { CustomerController } from "../controllers/CustomerController";
import passport from "../middlewares/passport";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const customerService = Container.get<ICustomerService>(TYPES.CustomerService);
const customerController = new CustomerController(
  loggerService,
  customerService
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.getCustomer(req, res)
);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  customerController.getCustomers(req, res)
);

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  customerController.upsertCustomer(req, res)
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.deleteCustomer(req, res)
);

export default router;
