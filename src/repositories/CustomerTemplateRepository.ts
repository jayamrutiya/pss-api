import { inject, injectable } from "inversify";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { CustomerTemplate } from "@prisma/client";
import { InternalServerError } from "../errors/InternalServerError";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

@injectable()
export class CustomerTemplateRepository implements ICustomerTemplateRepository {
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

  async createCustomerTemplate(
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplate> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const save = await client.customerTemplate.create({
        data: customerTemplateData,
      });

      return save;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<CustomerTemplateWithCustomerTemplate[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getCustomerTemplates = await client.customerTemplate.findMany({
        where: {
          customerId,
          templateType,
        },
        include: {
          Template: true,
          Customer: true,
        },
      });

      return getCustomerTemplates;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateCustomerTemplate(
    id: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const updateCustomerTemplates = await client.customerTemplate.update({
        where: {
          id,
        },
        data: templateData,
        include: {
          Template: true,
          Customer: true,
        },
      });

      return updateCustomerTemplates;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createWordFileCustomerTemplate(
    customerId: number,
  ): Promise<any> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const getData = await client.customerTemplate.findMany({
        where: {
          customerId
        }
      })
      // console.log('body:- \n', getData);
      return getData;
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