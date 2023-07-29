import { BadRequest } from "../errors/BadRequest";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITemplateService } from "../interfaces/ITemplateService";
import BaseController from "./BaseController";
import * as express from "express";

export default class TemplateController extends BaseController {
  private _loggerService: ILoggerService;
  private _templateService: ITemplateService;

  constructor(
    loggerService: ILoggerService,
    templateService: ITemplateService
  ) {
    super();
    this._loggerService = loggerService;
    this._templateService = templateService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async upsertTemplate(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const { id, type, title, details } = req.body;

      const types = [
        "COMMON_CONTENT",
        "REFE_LINE",
        "SUBJECT",
        "MAIN_CONTENT",
        "SUMMARY",
      ];

      if (!type || !types.includes(type)) {
        throw new BadRequest("Please select valid type.");
      }
      if (!title && !details) {
        throw new BadRequest("Title or Details is required.");
      }
      const token = req.user as any;

      const upsertTemplate = await this._templateService.upsertTemplate({
        userId: token.id,
        ...req.body,
      });

      // Return the response
      return this.sendJSONResponse(
        res,
        "Template save successfully.",
        {
          size: 1,
        },
        upsertTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getTemplatesByType(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const { type } = req.query;

      const types = [
        "COMMON_CONTENT",
        "REFE_LINE",
        "SUBJECT",
        "MAIN_CONTENT",
        "SUMMARY",
      ];

      if (!type || !types.includes(type)) {
        throw new BadRequest("Please select valid type.");
      }
      const token = req.user as any;

      const getTemplates = await this._templateService.getTemplatesByType(
        type,
        token.id
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get Templates.",
        {
          size: getTemplates.length,
        },
        getTemplates
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async deleteTemplate(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const { id } = req.params;
      if (!id) {
        throw new BadRequest("Invaild id provided.");
      }
      const token = req.user as any;

      const deleteTemplate = await this._templateService.deleteTemplate(
        Number(id),
        token.id
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Delete Templates.",
        {
          size: 1,
        },
        deleteTemplate
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
