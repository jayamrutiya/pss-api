import express from "express";
import { TYPES } from "../config/types";
import { iocContainer as Container } from "../config/container";
import { ILoggerService } from "../interfaces/ILoggerService";
import passport from "../middlewares/passport";
import { ITemplateService } from "../interfaces/ITemplateService";
import TemplateController from "../controllers/TemplateController";

const router = express.Router();

// Get service instance and create a new User controller
const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const templateService = Container.get<ITemplateService>(TYPES.TemplateService);
const templateController = new TemplateController(
  loggerService,
  templateService
);

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  templateController.upsertTemplate(req, res)
);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  templateController.getTemplatesByType(req, res)
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => templateController.deleteTemplate(req, res)
);

export default router;
