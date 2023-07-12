import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestService } from "../interfaces/ITestService";
import BaseController from "./BaseController";
import * as express from "express";

export default class TestController extends BaseController {
  private _loggerService: ILoggerService;
  private _testService: ITestService;

  constructor(loggerService: ILoggerService, testService: ITestService) {
    super();
    this._loggerService = loggerService;
    this._testService = testService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getTestData(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      // get parameters
      const testParams = req.body.test;

      console.log("req.body.test", req.body.test);

      const test = await this._testService.getTestData(testParams);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Test found.",
        {
          size: 1,
        },
        test
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
