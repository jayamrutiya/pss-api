import { inject, injectable } from "inversify";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { CustomerTemplate, CustomerTemplateMaster } from "@prisma/client";
import { InternalServerError } from "../errors/InternalServerError";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  CustomerTemplateWithCustomerTemplateRepo,
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
  ): Promise<CustomerTemplateWithCustomerTemplate> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const { id, ...restData } = customerTemplateData;
      const save = await client.customerTemplate.create({
        data: restData,
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
    templateType: string,
    customerTemplateMasterId: number
  ): Promise<CustomerTemplateWithCustomerTemplateRepo[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getCustomerTemplates = await client.customerTemplate.findMany({
        where: {
          customerId,
          templateType,
          customerTemplateMasterId,
        },
        orderBy: {
          order: "asc",
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
    customerTemplateId: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const { id, ...restData } = templateData;
      const updateCustomerTemplates = await client.customerTemplate.update({
        where: {
          id: customerTemplateId,
        },
        data: restData,
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
    customerTemplateMasterId: number
  ): Promise<any> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const getData = await client.customerTemplate.findMany({
        where: {
          customerTemplateMasterId,
        },
      });
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

  async deleteCustomerTemplateById(id: number): Promise<any> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const deletedata = await client.customerTemplate.delete({
        where: {
          id,
        },
      });
      return deletedata;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomerTemplateById(
    id: number
  ): Promise<UpdateCustomerTemplate | null> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();
      const getdata = await client.customerTemplate.findFirst({
        where: {
          id,
        },
      });
      return getdata;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createCustomerTemplateMaster(
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null
  ): Promise<CustomerTemplateMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      return await client.customerTemplateMaster.create({
        data: {
          userId,
          customerId,
          name,
          originalName,
          storeDocName,
          url,
          status,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomerTemplateMasters(
    customerId: number
  ): Promise<CustomerTemplateMaster[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      return await client.customerTemplateMaster.findMany({
        where: {
          customerId,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomerTemplateMasterById(
    id: number
  ): Promise<CustomerTemplateMaster | null> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      return await client.customerTemplateMaster.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateCustomerTemplateMaster(
    id: number,
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null
  ): Promise<CustomerTemplateMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      return await client.customerTemplateMaster.update({
        where: {
          id,
        },
        data: {
          userId,
          customerId,
          name,
          originalName,
          storeDocName,
          url,
          status,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async deleteCustomerTemplateMasterById(
    id: number
  ): Promise<CustomerTemplateMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      await client.customerTemplate.deleteMany({
        where: {
          customerTemplateMasterId: id,
        },
      });

      return await client.customerTemplateMaster.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getLetterCount(companyCount: boolean): Promise<number> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const countData = await client.customerTemplateMaster.count({
        where: companyCount
          ? {
              status: "COMPANY REPLY",
            }
          : {
              status: {
                not: "COMPANY REPLY",
              },
            },
      });
      return countData;
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
