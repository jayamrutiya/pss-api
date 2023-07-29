import { inject, injectable } from "inversify";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import {
  CreateCustomerTemplateInput,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";
import { Customer, CustomerTemplate, Template } from "@prisma/client";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { BadRequest } from "../errors/BadRequest";
import { replaceAll } from "../config/helper";

@injectable()
export class CustomerTemplateService implements ICustomerTemplateService {
  private _loggerService: ILoggerService;
  private _customerTemplateRepository: ICustomerTemplateRepository;
  private _customerRepository: ICustomerRepository;
  private _templateRepository: ITemplateRepository;
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.CustomerTemplateRepository)
    customerTemplateRepository: ICustomerTemplateRepository,
    @inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository,
    @inject(TYPES.TemplateRepository) templateRepository: ITemplateRepository
  ) {
    this._loggerService = loggerService;
    this._customerTemplateRepository = customerTemplateRepository;
    this._customerRepository = customerRepository;
    this._templateRepository = templateRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async replaceTemplateData(
    customerData: Customer,
    template: Template
  ): Promise<string> {
    const customer = {
      ...customerData,
      tableSDT: JSON.parse(customerData.tableSDT!),
      ywdATabelData: JSON.parse(customerData.ywdATabelData!),
      otherLegalHears: JSON.parse(customerData.otherLegalHears!),
    };
    let str, find, replace;

    str = template.details;
    find = "[[companyName]]";
    replace = customer.companyName;
    str = replaceAll(str, find, replace);

    return str;
  }

  async createCustomerTemplate(
    userId: number,
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplate> {
    const getCustomer = await this._customerRepository.getCustomer(
      customerTemplateData.customerId,
      userId
    );

    const getTemplate = await this._templateRepository.getTemplateById(
      customerTemplateData.templateId!,
      userId
    );

    if (!getCustomer || !getTemplate) {
      throw new BadRequest("Please select valid customer or template.");
    }

    const replacedCustomerTemplateData = await this.replaceTemplateData(
      getCustomer,
      getTemplate
    );

    return await this._customerTemplateRepository.createCustomerTemplate({
      ...customerTemplateData,
      templateType: getTemplate.type,
      templateData: replacedCustomerTemplateData,
    });
  }

  async getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<UpdateCustomerTemplate[]> {
    const getCustomerTemplates =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType
      );
    const response: UpdateCustomerTemplate[] = [];

    for (let i = 0; i < getCustomerTemplates.length; i++) {
      const customerTemplateent = getCustomerTemplates[i];

      const replacedCustomerTemplateData = await this.replaceTemplateData(
        customerTemplateent.Customer,
        customerTemplateent.Template!
      );

      const updateCustomerTemplate =
        await this._customerTemplateRepository.updateCustomerTemplate(
          customerTemplateent.id,
          {
            customerId: customerTemplateent.customerId,
            isCustomMainContentTemplate:
              customerTemplateent.isCustomMainContentTemplate,
            order: customerTemplateent.order,
            templateId: customerTemplateent.templateId,
            templateType: customerTemplateent.templateType,
            templateData: replacedCustomerTemplateData,
          }
        );

      response.push(updateCustomerTemplate);
    }

    return response;
  }
}
