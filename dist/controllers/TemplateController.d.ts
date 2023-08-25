import { ILoggerService } from "../interfaces/ILoggerService";
import { ITemplateService } from "../interfaces/ITemplateService";
import BaseController from "./BaseController";
import * as express from "express";
export default class TemplateController extends BaseController {
    private _loggerService;
    private _templateService;
    constructor(loggerService: ILoggerService, templateService: ITemplateService);
    upsertTemplate(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getTemplatesByType(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getTemplatesById(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    deleteTemplate(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
