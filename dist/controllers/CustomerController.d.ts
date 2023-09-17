import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
export declare class CustomerController extends BaseController {
    private _loggerService;
    private _customerService;
    constructor(loggerService: ILoggerService, customerService: ICustomerService);
    upsertCustomer(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getCustomers(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getCustomer(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    deleteCustomer(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    upsertCustomerMaster(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getAllMasterCustomers(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    deleteCustomerMaster(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    createDocument(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getAllDocument(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    deleteDocument(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
