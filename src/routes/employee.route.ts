import express from "express";
import { iocContainer as Container } from "../config/container";
import { TYPES } from "../config/types";
import EmployeeController from "../controllers/EmployeeController";
import { IEmployeeService } from "../interfaces/IEmployeeService";
import { ILoggerService } from "../interfaces/ILoggerService";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const employeeService = Container.get<IEmployeeService>(TYPES.EmployeeService);
const employeeController = new EmployeeController(
  loggerService,
  employeeService
);

router.get("/:id", (req, res) => employeeController.getEmployee(req, res));

router.post("/", (req, res) => employeeController.createEmployee(req, res));

router.put("/:id", (req, res) => employeeController.updateEmployee(req, res));

export default router;
