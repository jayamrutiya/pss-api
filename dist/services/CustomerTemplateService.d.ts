import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { CreateCustomerTemplateInput, CustomerTemplateWithCustomerTemplate, UpdateCustomerTemplate } from "../types/CustomerTemplate";
import { Customer, CustomerTemplateMaster, Template } from "@prisma/client";
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
    createWordFileCustomerTemplate(customerTemplateMasterId: number, customerId: number, userId: number): Promise<any>;
    createDynamicWord(customerData: any, docName: any, customerTemplateMasterId: any, templateType: any, hasReffLine?: boolean, subjects?: never[], summary1?: never[]): Promise<string>;
    getCustomerTemplateByTypeAndCustomerId(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<UpdateCustomerTemplate[]>;
    getCustomerTemplateStatus(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<{
        isAvailable: boolean;
    }>;
    deleteCustomerTemplateById(id: number): Promise<any>;
    getFiltterTemplate(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<Template[]>;
    getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate>;
    createCustomerTemplateMaster(userId: number, customerId: number, name: string, originalName: string | null, storeDocName: string | null, url: string | null, status: string | null): Promise<CustomerTemplateMaster>;
    getCustomerTemplateMasters(customerId: number): Promise<CustomerTemplateMaster[]>;
    deleteCustomerTemplateMasterById(id: number): Promise<CustomerTemplateMaster>;
}
