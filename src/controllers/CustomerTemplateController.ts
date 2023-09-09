import path from "path";
import { BadRequest } from "../errors/BadRequest";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
import fs, { unlinkSync } from "fs";
import { join } from "path";
import { replaceAll } from "../config/helper";
import mysqldump from "mysqldump";
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

      const [
        {
          customerId,
          templateId,
          templateType,
          templateData,
          order,
          isCustomMainContentTemplate,
        },
      ] = req.body;

      // if (
      //   customerId &&
      //   templateId &&
      //   templateType &&
      //   isCustomMainContentTemplate
      // ) {
      //   throw new BadRequest("Invalid argumets.");
      // }

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
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      // );
      // res.setHeader(
      //   "Content-Disposition",
      //   `attachment; filename=${saveCustomerTemplateData.fileName}`
      // );

      // const fileStream = await fs.createReadStream(
      //   saveCustomerTemplateData.filePath
      // );

      // fileStream.pipe(res);
      // await unlinkSync(saveCustomerTemplateData.filePath);

      res.download(
        saveCustomerTemplateData.filePath,
        saveCustomerTemplateData.fileName,
        (err) => {
          if (err) {
            console.log(err); // Check error if you want
          } else {
            unlinkSync(saveCustomerTemplateData.filePath);
          }
        }
      );
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

  async getCustomerTemplateStatus(req: any, res: express.Response) {
    try {
      const token = req.user as any;
      const { customerId, templateType } = req.query;

      const getCustomerTemplate =
        await this._customerTemplateService.getCustomerTemplateStatus(
          Number(customerId),
          templateType,
          Number(token.id)
        );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer Template Status.",
        {
          size: 1,
        },
        getCustomerTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async deleteCustomerTemplateById(req: any, res: express.Response) {
    try {
      const { id } = req.query;

      const deleteCustomerTemplate =
        await this._customerTemplateService.deleteCustomerTemplateById(
          Number(id)
        );
      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer Template Deleted Successfully.",
        {
          size: 1,
        },
        deleteCustomerTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getFiltterTemplate(req: any, res: express.Response) {
    try {
      const token = req.user as any;
      const { customerId, templateType } = req.query;

      const getFilterTemplate =
        await this._customerTemplateService.getFiltterTemplate(
          Number(customerId),
          templateType,
          Number(token.id)
        );
      // Return the response
      return this.sendJSONResponse(
        res,
        "Filter Customer Template.",
        {
          size: getFilterTemplate.length,
        },
        getFilterTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getCustomerTemplateById(req: any, res: express.Response) {
    try {
      const { id } = req.params;

      const getData =
        await this._customerTemplateService.getCustomerTemplateById(Number(id));
      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer Template.",
        {
          size: 1,
        },
        getData
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async dumpMysqlFile(req: any, res: express.Response) {
    try {
      await mysqldump({
        connection: {
          host: "localhost",
          user: "root",
          password: "",
          database: "pss",
          port: 3306,
        },
        dump: {
          schema: { table: { dropIfExist: true } },
        },
        dumpToFile: `${__dirname}/pss.sql`,
      });

      res.download(`${__dirname}/pss.sql`, "pss.sql", (err) => {
        if (err) {
          console.log(err); // Check error if you want
        } else {
          unlinkSync(`${__dirname}/pss.sql`);
        }
      });
    } catch (error) {
      console.log("Error", error);
      return this.sendErrorResponse(req, res, error);
    }
  }
}
