import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import express from "express";
export declare class AuthenticationController extends BaseController {
    private _loggerService;
    private _authenticationService;
    constructor(loggerService: ILoggerService, authenticationService: IAuthenticationService);
    doLogin(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    changePassword(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
