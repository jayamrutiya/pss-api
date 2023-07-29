import { BadRequest } from "../errors/BadRequest";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";

export class CustomerTemplateController extends BaseController {
  private _loggerService: ILoggerService;
  private _customerTemplateService: ICustomerTemplateService;
  constructor(
    loggerService: ILoggerService,
    customerTemplateService: ICustomerTemplateService
  ) {
    super();
    this._loggerService = loggerService;
    this._customerTemplateService = customerTemplateService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createCustomerTemplate(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const {
        customerId,
        templateId,
        templateType,
        templateData,
        order,
        isCustomMainContentTemplate,
      } = req.body;

      if (
        customerId &&
        templateId &&
        templateType &&
        isCustomMainContentTemplate
      ) {
        throw new BadRequest("Invalid argumets.");
      }

      const token = req.user as any;
      const saveCustomerTemplate =
        await this._customerTemplateService.createCustomerTemplate(
          token.id,
          req.body
        );
      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer Template save successfully.",
        {
          size: 1,
        },
        saveCustomerTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getCustomerTemplateByTypeAndCustomerId(
    req: any,
    res: express.Response
  ) {
    try {
      // validate input
      this.validateRequest(req);

      const { customerId, templateType } = req.query;

      if (!customerId || !templateType) {
        throw new BadRequest("Invalid argument.");
      }

      const getCustomerTemplate =
        await this._customerTemplateService.getCustomerTemplateByTypeAndCustomerId(
          Number(customerId),
          templateType
        );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer Template.",
        {
          size: getCustomerTemplate.length,
        },
        getCustomerTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
