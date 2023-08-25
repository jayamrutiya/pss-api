import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { CreateCustomerTemplateInput, CustomerTemplateWithCustomerTemplate, CustomerTemplateWithCustomerTemplateRepo, UpdateCustomerTemplate } from "../types/CustomerTemplate";
export declare class CustomerTemplateRepository implements ICustomerTemplateRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    createCustomerTemplate(customerTemplateData: CreateCustomerTemplateInput): Promise<CustomerTemplateWithCustomerTemplate>;
    getCustomerTemplateByTypeAndCustomerId(customerId: number, templateType: string): Promise<CustomerTemplateWithCustomerTemplateRepo[]>;
    updateCustomerTemplate(customerTemplateId: number, templateData: CreateCustomerTemplateInput): Promise<UpdateCustomerTemplate>;
    createWordFileCustomerTemplate(customerId: number): Promise<any>;
    deleteCustomerTemplateById(id: number): Promise<any>;
    getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate | null>;
}
