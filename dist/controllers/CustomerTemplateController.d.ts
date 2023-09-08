import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
export declare class CustomerTemplateController extends BaseController {
    private _loggerService;
    private _customerTemplateService;
    constructor(loggerService: ILoggerService, customerTemplateService: ICustomerTemplateService);
    createCustomerTemplate(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getCustomerTemplateByTypeAndCustomerId(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    createWordFileCustomerTemplate(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getCustomerTemplateStatus(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    deleteCustomerTemplateById(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getFiltterTemplate(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getCustomerTemplateById(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    dumpMysqlFile(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>> | undefined>;
}
