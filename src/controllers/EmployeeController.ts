import { IEmployeeService } from "../interfaces/IEmployeeService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
import { CreateEmployee, UpdateEmployee } from "../types/Employee";

export default class EmployeeController extends BaseController {
  private _loggerService: ILoggerService;
  private _employeeService: IEmployeeService;

  constructor(
    loggerService: ILoggerService,
    employeeService: IEmployeeService
  ) {
    super();
    this._loggerService = loggerService;
    this._employeeService = employeeService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getEmployee(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.params.id);

      const employee = await this._employeeService.getEmployee(id);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get Employee.",
        {
          size: 1,
        },
        employee
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async createEmployee(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const employee: CreateEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        isActive: req.body.isActive,
      };

      const createEmployee = await this._employeeService.createEmployee(
        employee
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Create Employee.",
        {
          size: 1,
        },
        createEmployee
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async updateEmployee(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.params.id);
      const employee: UpdateEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        isActive: req.body.isActive,
      };

      const updateEmployee = await this._employeeService.updateEmployee(
        id,
        employee
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Update Employee.",
        {
          size: 1,
        },
        updateEmployee
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
