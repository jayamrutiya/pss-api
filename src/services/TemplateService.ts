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
import { unlinkSync } from "fs";
import { join } from "path";

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
    if (templateData.id) {
      const getTemplate = await this._templateRepository.getTemplateById(
        templateData.id!,
        templateData.userId
      );

      if (!getTemplate) {
        throw new NotFound("No such record found");
      }

      if (templateData.originalName) {
        getTemplate.storeDocName
          ? await unlinkSync(
              join("./src/public/Template", getTemplate.storeDocName)
            )
          : "";

        // update template
        return await this._templateRepository.updateTemplate(
          templateData.id!,
          templateData
        );
      } else {
        const payload = {
          ...templateData,
          originalName: getTemplate.originalName,
          storeDocName: getTemplate.storeDocName,
          mimeType: getTemplate.mimeType,
          sizeInBytes: getTemplate.sizeInBytes,
          url: getTemplate.url,
          path: getTemplate.path,
        };

        // update template
        return await this._templateRepository.updateTemplate(
          templateData.id!,
          payload
        );
      }
    } else {
      // create template
      const { id, ...restData } = templateData;
      return await this._templateRepository.createTemplate(restData);
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
    const getTemplate = await this._templateRepository.getTemplateById(
      id,
      userId
    );

    if (!getTemplate) {
      throw new NotFound("No such record found");
    }

    getTemplate.storeDocName
      ? await unlinkSync(
          join("./src/public/Template", getTemplate.storeDocName)
        )
      : "";

    return await this._templateRepository.deleteTemplate(id, userId);
  }
}
