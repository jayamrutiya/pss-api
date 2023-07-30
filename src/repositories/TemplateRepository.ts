import { inject, injectable } from "inversify";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { TYPES } from "../config/types";
import { Template } from "@prisma/client";
import { UpsertTemplate } from "../types/Template";
import { InternalServerError } from "../errors/InternalServerError";

@injectable()
export class TemplateRepository implements ITemplateRepository {
  private _loggerService: ILoggerService;
  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createTemplate(templateData: UpsertTemplate): Promise<Template> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const createTemplate = await client.template.create({
        data: templateData,
      });

      return createTemplate;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateTemplate(
    id: number,
    templateData: UpsertTemplate
  ): Promise<Template> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const updateTemplate = await client.template.update({
        where: {
          id,
        },
        data: templateData,
      });

      return updateTemplate;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getTemplatesByType(type: string, userId: number): Promise<Template[]> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const getTemplates = await client.template.findMany({
        where: {
          OR: [
            {
              type,
              userId,
            },
          ],
        },
      });

      return getTemplates;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async deleteTemplate(id: number, userId: number): Promise<Template> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const deleteTemplates = await client.template.delete({
        where: {
          id,
        },
      });

      return deleteTemplates;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getTemplateById(id: number, userId: number): Promise<Template | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();
      const getTemplate = await client.template.findFirst({
        where: {
          id,
          userId,
        },
      });

      return getTemplate;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }
}