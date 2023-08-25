import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestService } from "../interfaces/ITestService";
import BaseController from "./BaseController";
import * as express from "express";
export default class TestController extends BaseController {
    private _loggerService;
    private _testService;
    constructor(loggerService: ILoggerService, testService: ITestService);
    getTestData(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
