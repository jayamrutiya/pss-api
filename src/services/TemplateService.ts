import { inject, injectable } from "inversify";
import { ITemplateService } from "../interfaces/ITemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { Template } from "@prisma/client";
import { CreateTemplateService } from "../types/Template";

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
    const { id, ...withOutId } = templateData;
    if (templateData.id) {
      // update template
      return await this._templateRepository.updateTemplate(id!, withOutId);
    } else {
      // create template
      return await this._templateRepository.createTemplate(withOutId);
    }
  }

  async getTemplatesByType(type: string, userId: number): Promise<Template[]> {
    return await this._templateRepository.getTemplatesByType(type, userId);
  }

  async deleteTemplate(id: number, userId: number): Promise<Template> {
    return await this._templateRepository.deleteTemplate(id, userId);
  }
}
