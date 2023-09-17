import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerService } from "../interfaces/ICustomerService";
import { CustomerController } from "../controllers/CustomerController";
import passport from "../middlewares/passport";
import { uploadDocument } from "../middlewares/multer";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const customerService = Container.get<ICustomerService>(TYPES.CustomerService);
const customerController = new CustomerController(
  loggerService,
  customerService
);

router.get(
  "/master",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.getAllMasterCustomers(req, res)
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

router.post(
  "/master",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.upsertCustomerMaster(req, res)
);

router.delete(
  "/master",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.deleteCustomerMaster(req, res)
);

router.post(
  "/master/document",
  uploadDocument.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.createDocument(req, res)
);

router.get(
  "/master/document",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.getAllDocument(req, res)
);

router.delete(
  "/master/document",
  passport.authenticate("jwt", { session: false }),
  (req, res) => customerController.deleteDocument(req, res)
);

export default router;
