import path from "path";
import { BadRequest } from "../errors/BadRequest";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
import fs from "fs";
import { join } from "path";
import { replaceAll } from "../config/helper";
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
      console.log("createCustomerTemplate");
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

      const token = req.user as any;
      const { customerId, templateType } = req.query;

      if (!customerId || !templateType) {
        throw new BadRequest("Invalid argument.");
      }

      const getCustomerTemplate =
        await this._customerTemplateService.getCustomerTemplateByTypeAndCustomerId(
          Number(customerId),
          templateType,
          Number(token.id)
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
  async createWordFileCustomerTemplate(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);
      const customerId = Number(req.query.customerId);
      const token = req.user as any;
      const saveCustomerTemplateData =
        await this._customerTemplateService.createWordFileCustomerTemplate(
          customerId
        );
      console.log("saveCustomerTemplateData:- ", saveCustomerTemplateData);

      // Return the response
      // const saveFile = await fs.writeFileSync(`/htmltoword/wordsof${customerId}/FinalForwardingLetter.docx`, converted);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      res.setHeader("Content-Disposition", "attachment; filename=output.docx");

      // Read the file and send it as the response
      __dirname = replaceAll(__dirname, "controllers", "document");
      console.log("c:- " + __dirname);

      const fileStream = fs.createReadStream(__dirname + "/output.docx");

      console.log("con", __dirname);
      fileStream.pipe(res);
      return res;
      // this.sendJSONResponse(
      //   res,
      //   "Customer Template Data Download as word successfully.",
      //   {
      //     size: 1,
      //   },
      //   saveCustomerTemplateData
      // );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
