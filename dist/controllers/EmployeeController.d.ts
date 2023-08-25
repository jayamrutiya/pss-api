import { IEmployeeService } from "../interfaces/IEmployeeService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
export default class EmployeeController extends BaseController {
    private _loggerService;
    private _employeeService;
    constructor(loggerService: ILoggerService, employeeService: IEmployeeService);
    getEmployee(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    createEmployee(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    updateEmployee(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
