import { inject, injectable } from "inversify";
import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { Customer } from "@prisma/client";
import {
  CreateCustomerRepoInput,
  CreateCustomerServiceInput,
} from "../types/Customer";
import { NotFound } from "../errors/NotFound";

@injectable()
export class CustomerService implements ICustomerService {
  private _loggerService: ILoggerService;
  private _customerRepository: ICustomerRepository;
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository
  ) {
    this._loggerService = loggerService;
    this._customerRepository = customerRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async upsertCustomer(
    id: number | null,
    customerData: CreateCustomerServiceInput
  ): Promise<Customer> {
    const customerRepoData: CreateCustomerRepoInput = {
      ...customerData,
      date: new Date(customerData.date!),
      nomineeBirthdate: new Date(customerData.nomineeBirthdate!),
      ywdATabelData: JSON.stringify(customerData.ywdATabelData),
      otherLegalHears: JSON.stringify(customerData.otherLegalHears),
      tableSDT: JSON.stringify(
        customerData.tableSDT.map((d) => {
          return {
            ledgerFolio: customerData.ledgerFolio,
            startDistinctiveNumber: d.distinctiveNumber?.split("-")[0],
            endDistinctiveNumber: d.distinctiveNumber?.split("-")[1],
            ...d,
          };
        })
      ),
      totalShares: customerData.tableSDT
        .map((d) => Number(d.totalShareQuantity))
        .reduce((prev, next) => prev + next)
        .toString(),
    };

    if (!id) {
      return await this._customerRepository.createCustomer(customerRepoData);
    } else {
      return await this._customerRepository.updateCustomer(
        id,
        customerRepoData
      );
    }
  }

  async getCustomers(userId: number): Promise<Customer[]> {
    return await this._customerRepository.getCustomers(userId);
  }

  async getCustomer(id: number, userId: number): Promise<Customer | null> {
    return await this._customerRepository.getCustomer(id, userId);
  }

  async deleteCustomer(id: number, userId: number): Promise<Customer | null> {
    const getCustomer = await this._customerRepository.getCustomer(id, userId);
    if (!getCustomer) {
      throw new NotFound("Customer Not found.");
    }
    return await this._customerRepository.deleteCustomer(id, userId);
  }
}
