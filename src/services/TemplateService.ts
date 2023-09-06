import { inject, injectable } from "inversify";
import { ITemplateService } from "../interfaces/ITemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { Template } from "@prisma/client";
import { CreateTemplateService } from "../types/Template";
import { BadRequest } from "../errors/BadRequest";
import { NotFound } from "../errors/NotFound";
import { replaceAll } from "../config/helper";

@injectable()
export class TemplateService implements ITemplateService {
  private _loggerService: ILoggerService;
  private _templateRepository: ITemplateRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.TemplateRepository) templateRepository: ITemplateRepository
  ) {
    this._loggerService = loggerService;
    this._templateRepository = templateRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async upsertTemplate(templateData: CreateTemplateService): Promise<Template> {
    let { id, ...withOutId } = templateData;
    console.log("withOutId", withOutId);

    let str, find, replace;
    str = withOutId.details;

    find = "<table>";
    replace = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px">`;
    str = replaceAll(str, find, replace);

    find = "<td>";
    replace = `<td style="text-align:center" >`;
    str = replaceAll(str, find, replace);
    const data = {
      userId: withOutId.userId,
      type: withOutId.type,
      title: withOutId.title,
      details: str,
    };
    if (templateData.id) {
      // update template
      return await this._templateRepository.updateTemplate(id!, data);
    } else {
      // create template
      return await this._templateRepository.createTemplate(data);
    }
  }

  async getTemplatesByType(type: string, userId: number): Promise<Template[]> {
    return await this._templateRepository.getTemplatesByType(type, userId);
  }
  async getTemplateById(id: number, userId: number): Promise<Template | null> {
    const gettemplateById = await this._templateRepository.getTemplateById(
      id,
      userId
    );
    if (!gettemplateById) {
      throw new NotFound("Template Not Found");
    }
    return gettemplateById;
  }
  async deleteTemplate(id: number, userId: number): Promise<Template> {
    return await this._templateRepository.deleteTemplate(id, userId);
  }
}
