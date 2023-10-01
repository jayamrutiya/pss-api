import { inject, injectable } from "inversify";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { TYPES } from "../config/types";
import { Customer, CustomerMaster, Document } from "@prisma/client";
import { CreateCustomerRepoInput } from "../types/Customer";
import { InternalServerError } from "../errors/InternalServerError";

@injectable()
export class CustomerRepository implements ICustomerRepository {
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

  async createCustomer(
    customerData: CreateCustomerRepoInput
  ): Promise<Customer> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createCustomer = await client.customer.create({
        data: customerData,
      });

      return createCustomer;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateCustomer(
    id: number,
    customerData: CreateCustomerRepoInput
  ): Promise<Customer> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const updateCustomer = await client.customer.update({
        data: customerData,
        where: {
          id,
        },
      });

      return updateCustomer;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomers(
    userId: number,
    customerMasterId: number | null
  ): Promise<Customer[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getAllCustomer = await client.customer.findMany({
        where: customerMasterId
          ? {
              userId,
              customerMasterId,
            }
          : { userId },
      });

      return getAllCustomer;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getCustomer(
    id: number,
    userId: number | null
  ): Promise<Customer | null> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getCustomer = await client.customer.findFirst({
        where: userId
          ? {
              id,
              userId,
            }
          : { id },
      });

      return getCustomer;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async deleteCustomer(id: number, userId: number): Promise<Customer | null> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      await client.customerTemplateMaster.deleteMany({
        where: {
          customerId: id,
        },
      });

      await client.customerTemplate.deleteMany({
        where: {
          customerId: id,
        },
      });

      const deleteCUstomer = await client.customer.delete({
        where: {
          id,
        },
      });

      return deleteCUstomer;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createCustomerMaster(
    name: string,
    companyName: string | null,
    userId: number
  ): Promise<CustomerMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createCusMas = await client.customerMaster.create({
        data: {
          name,
          companyName,
          userId,
        },
      });

      await client.customer.create({
        data: {
          userId,
          customerMasterId: createCusMas.id,
          fhnameInPancardExactSpelling: name,
          ywdATabelData: JSON.stringify([]),
          otherLegalHears: JSON.stringify([]),
          tableSDT: JSON.stringify([]),
          totalShares: "0",
        },
      });

      return createCusMas;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateCustomerMaster(
    id: number,
    name: string,
    companyName: string | null,
    userId: number
  ): Promise<CustomerMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createCusMas = await client.customerMaster.update({
        where: {
          id,
        },
        data: {
          name,
          companyName,
          userId,
        },
      });

      return createCusMas;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getAllMasterCustomers(userId: number): Promise<CustomerMaster[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createCusMas = await client.customerMaster.findMany({
        where: {
          userId,
        },
      });

      return createCusMas;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async deleteCustomerMaster(id: number): Promise<CustomerMaster> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createCusMas = await client.customerMaster.delete({
        where: {
          id,
        },
      });

      return createCusMas;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createDocument(
    customerMasterId: number,
    name: string | null,
    originalName: string | null,
    storeDocName: string | null,
    mimeType: string | null,
    sizeInBytes: string | null,
    url: string | null
  ): Promise<Document> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const createDoc = await client.document.create({
        data: {
          customerMasterId,
          name,
          originalName,
          storeDocName,
          mimeType,
          sizeInBytes,
          url,
        },
      });

      return createDoc;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getAllDocument(customerMasterId: number): Promise<Document[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getAllDocs = await client.document.findMany({
        where: {
          customerMasterId,
        },
      });

      return getAllDocs;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async deleteDocument(id: number): Promise<Document> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      return await client.document.delete({
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
}
