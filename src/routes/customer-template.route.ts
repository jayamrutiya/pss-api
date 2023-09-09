import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { CustomerTemplateController } from "../controllers/CustomerTemplateController";
import passport from "../middlewares/passport";
import { uploadCompanyReply } from "../middlewares/multer";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const customerTemplateService = Container.get<ICustomerTemplateService>(
  TYPES.CustomerTemplateService
);
const customerTemplateController = new CustomerTemplateController(
  loggerService,
  customerTemplateService
);

router.get("/dbdump", (req, res) => {
  customerTemplateController.dumpMysqlFile(req, res);
});

router.get(
  "/filter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.getFiltterTemplate(req, res);
  }
);

router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.getCustomerTemplateStatus(req, res);
  }
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

router.get("/word", (req, res) => {
  customerTemplateController.createWordFileCustomerTemplate(req, res);
});

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.deleteCustomerTemplateById(req, res);
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.getCustomerTemplateById(req, res);
  }
);

router.post(
  "/master",
  uploadCompanyReply.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    customerTemplateController.createCustomerTemplateMaster(req, res);
  }
);

export default router;
