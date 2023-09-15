import { inject, injectable } from "inversify";
import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { Customer, CustomerMaster, Document } from "@prisma/client";
import {
  CreateCustomerRepoInput,
  CreateCustomerServiceInput,
  CustomerData,
} from "../types/Customer";
import { NotFound } from "../errors/NotFound";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { unlinkSync } from "fs";
import { join } from "path";
import { BadRequest } from "../errors/BadRequest";

@injectable()
export class CustomerService implements ICustomerService {
  private _loggerService: ILoggerService;
  private _customerRepository: ICustomerRepository;
  private _customerTemplateRepository: ICustomerTemplateRepository;
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository,
    @inject(TYPES.CustomerTemplateRepository)
    customerTemplateRepository: ICustomerTemplateRepository
  ) {
    this._loggerService = loggerService;
    this._customerRepository = customerRepository;
    this._customerTemplateRepository = customerTemplateRepository;
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
      totalShares:
        customerData.tableSDT.length > 0
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
      deathOfHolderFirstHolder: customerData.deathOfHolderFirstHolder
        ? new Date(customerData.deathOfHolderFirstHolder)
        : null,
      deathOfHolderSecondHolder: customerData.deathOfHolderSecondHolder
        ? new Date(customerData.deathOfHolderSecondHolder)
        : null,
      referenceLetterdate: customerData.referenceLetterdate
        ? new Date(customerData.referenceLetterdate)
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

  async getCustomers(
    userId: number,
    customerMasterId: number | null
  ): Promise<CustomerData[]> {
    const customersData = await this._customerRepository.getCustomers(
      userId,
      customerMasterId
    );
    const customers = customersData.map((d) => {
      return {
        ...d,
        tableSDT: JSON.parse(d?.tableSDT!),
        ywdATabelData: JSON.parse(d?.ywdATabelData!),
        otherLegalHears: JSON.parse(d?.otherLegalHears!),
      };
    });
    return customers;
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
    const getCustomerTemplateMaster =
      await this._customerTemplateRepository.getCustomerTemplateMasters(id);

    for (let i = 0; i < getCustomerTemplateMaster.length; i++) {
      const data = getCustomerTemplateMaster[i];
      await unlinkSync(join("./src/public", data.storeDocName!));
    }
    return await this._customerRepository.deleteCustomer(id, userId);
  }

  async upsertCustomerMaster(
    id: number | null,
    name: string,
    companyName: string | null,
    userId: number
  ): Promise<CustomerMaster> {
    if (id) {
      return await this._customerRepository.updateCustomerMaster(
        id,
        name,
        companyName,
        userId
      );
    }

    const createCustomerMaster =
      await this._customerRepository.createCustomerMaster(
        name,
        companyName,
        userId
      );
    return createCustomerMaster;
  }

  async getAllMasterCustomers(userId: number): Promise<CustomerMaster[]> {
    return await this._customerRepository.getAllMasterCustomers(userId);
  }

  async deleteCustomerMaster(
    userId: number,
    id: number
  ): Promise<CustomerMaster> {
    const getAllDocs = await this.getAllDocument(id);

    if (getAllDocs.length > 0) {
      throw new BadRequest("Please delete all documents.");
    }
    const getAllCustomers = await this._customerRepository.getCustomers(
      userId,
      id
    );

    for (let i = 0; i < getAllCustomers.length; i++) {
      const data = getAllCustomers[i];
      await this.deleteCustomer(data.id, userId);
    }

    return await this._customerRepository.deleteCustomerMaster(id);
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
    return await this._customerRepository.createDocument(
      customerMasterId,
      name,
      originalName,
      storeDocName,
      mimeType,
      sizeInBytes,
      url
    );
  }

  async getAllDocument(customerMasterId: number): Promise<Document[]> {
    return await this._customerRepository.getAllDocument(customerMasterId);
  }

  async deleteDocument(id: number): Promise<Document> {
    const deleteDoc = await this._customerRepository.deleteDocument(id);

    await unlinkSync(join("./src/public/", deleteDoc.storeDocName!));

    return deleteDoc;
  }
}
