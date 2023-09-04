import { inject, injectable } from "inversify";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { TYPES } from "../config/types";
import { Customer, CustomerMaster } from "@prisma/client";
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

  async getCustomers(userId: number): Promise<Customer[]> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getAllCustomer = await client.customer.findMany({
        where: {
          userId,
        },
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

  async getCustomer(id: number, userId: number): Promise<Customer | null> {
    try {
      // Get the database clinte
      const client = this._databaseService.Client();

      const getCustomer = await client.customer.findFirst({
        where: {
          id,
          userId,
        },
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
}
