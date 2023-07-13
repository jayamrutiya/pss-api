import { BadRequest } from "../errors/BadRequest";
import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import express from "express";

export class AuthenticationController extends BaseController {
  private _loggerService: ILoggerService;

  private _authenticationService: IAuthenticationService;

  constructor(
    loggerService: ILoggerService,
    authenticationService: IAuthenticationService
  ) {
    super();
    this._loggerService = loggerService;
    this._authenticationService = authenticationService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async doLogin(req: express.Request, res: express.Response) {
    try {
      const { userName, password } = req.body;

      if (!userName || !password) {
        throw new BadRequest("Invalid argument passed.");
      }

      const verifiedLogin = await this._authenticationService.doLogin(
        userName,
        password
      );

      // send response
      return this.sendJSONResponse(
        res,
        "Logged in successfully!",
        { size: 1 },
        verifiedLogin
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async changePassword(req: any, res: express.Response) {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        throw new BadRequest("Invalid argument passed.");
      }

      const token = req.user as any;

      const changePassword = await this._authenticationService.changePassword(
        token.id,
        oldPassword,
        newPassword
      );

      // send response
      return this.sendJSONResponse(
        res,
        "Password changed successfully!",
        { size: 1 },
        changePassword
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
