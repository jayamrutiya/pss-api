import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { CreateCustomerTemplateInput, CustomerTemplateWithCustomerTemplate, UpdateCustomerTemplate } from "../types/CustomerTemplate";
import { Customer, Template } from "@prisma/client";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
export declare class CustomerTemplateService implements ICustomerTemplateService {
    private _loggerService;
    private _customerTemplateRepository;
    private _customerRepository;
    private _templateRepository;
    constructor(loggerService: ILoggerService, customerTemplateRepository: ICustomerTemplateRepository, customerRepository: ICustomerRepository, templateRepository: ITemplateRepository);
    replaceTemplateData(customerData: Customer, template: Template): Promise<string>;
    createCustomerTemplate(userId: number, customerTemplateDataa: CreateCustomerTemplateInput[]): Promise<CustomerTemplateWithCustomerTemplate>;
    createWordFileCustomerTemplate(customerId: number): Promise<any>;
    getCustomerTemplateByTypeAndCustomerId(customerId: number, templateType: string, userId: number): Promise<UpdateCustomerTemplate[]>;
    getCustomerTemplateStatus(customerId: number, templateType: string, userId: number): Promise<{
        isAvailable: boolean;
    }>;
    deleteCustomerTemplateById(id: number): Promise<any>;
    getFiltterTemplate(customerId: number, templateType: string, userId: number): Promise<Template[]>;
    getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate>;
}
