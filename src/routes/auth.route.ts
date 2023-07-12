import express from "express";
import { TYPES } from "../config/types";
import { iocContainer as Container } from "../config/container";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { AuthenticationController } from "../controllers/AuthenticationController";

const router = express.Router();

// Get service instance and create a new User controller
const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const authenticationService = Container.get<IAuthenticationService>(
  TYPES.AuthenticationService
);
const authenticationController = new AuthenticationController(
  loggerService,
  authenticationService
);

router.post("/login", (req, res) => authenticationController.doLogin(req, res));

export default router;
