import { inject, injectable } from "inversify";
import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { Customer } from "@prisma/client";
import {
  CreateCustomerRepoInput,
  CreateCustomerServiceInput,
  CustomerData,
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
      date: customerData.date ? new Date(customerData.date) : null,
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
      totalShares: customerData.tableSDT.length > 0
        ? customerData.tableSDT
          .map((d) => Number(d.totalShareQuantity))
          .reduce((prev, next) => prev + next)
          .toString()
        : "0",
      nomineeBirthdate: customerData.nomineeBirthdate
        ? new Date(customerData.nomineeBirthdate)
        : null,
      bonusDate: customerData.bonusDate
        ? new Date(customerData.bonusDate)
        : null,
      splitDate: customerData.splitDate
        ? new Date(customerData.splitDate)
        : null,
      notaryDate: customerData.notaryDate
        ? new Date(customerData.notaryDate)
        : null,
      currentYear: customerData.currentYear || null,
      dpId: customerData.dematNumber?.slice(0, 8) || null,
      clientId: customerData.dematNumber?.slice(8, 16) || null,
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

  async getCustomer(id: number, userId: number): Promise<CustomerData> {
    const getCustomer = await this._customerRepository.getCustomer(id, userId);

    if (!getCustomer) {
      throw new NotFound("Customer not found.");
    }

    const customer = {
      ...getCustomer,
      tableSDT: JSON.parse(getCustomer?.tableSDT!),
      ywdATabelData: JSON.parse(getCustomer?.ywdATabelData!),
      otherLegalHears: JSON.parse(getCustomer?.otherLegalHears!),
    };
    return customer;
  }

  async deleteCustomer(id: number, userId: number): Promise<Customer | null> {
    const getCustomer = await this._customerRepository.getCustomer(id, userId);
    if (!getCustomer) {
      throw new NotFound("Customer Not found.");
    }
    return await this._customerRepository.deleteCustomer(id, userId);
  }
}
