import { CustomerTemplateMaster, Template } from "@prisma/client";
import { CreateCustomerTemplateInput, CustomerTemplateWithCustomerTemplate, UpdateCustomerTemplate } from "../types/CustomerTemplate";
export interface ICustomerTemplateService {
    createCustomerTemplate(userId: number, customerTemplateDataa: CreateCustomerTemplateInput[]): Promise<CustomerTemplateWithCustomerTemplate>;
    getCustomerTemplateByTypeAndCustomerId(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<UpdateCustomerTemplate[]>;
    createWordFileCustomerTemplate(customerTemplateMasterId: number, customerId: number, userId: number): Promise<any>;
    getCustomerTemplateStatus(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<{
        isAvailable: boolean;
    }>;
    deleteCustomerTemplateById(id: number): Promise<any>;
    getFiltterTemplate(customerId: number, templateType: string, userId: number, customerTemplateMasterId: number): Promise<Template[]>;
    getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate | null>;
    createCustomerTemplateMaster(userId: number, customerId: number, name: string, originalName: string | null, storeDocName: string | null, url: string | null, status: string | null): Promise<CustomerTemplateMaster>;
    getCustomerTemplateMasters(customerId: number): Promise<CustomerTemplateMaster[]>;
    deleteCustomerTemplateMasterById(id: number): Promise<CustomerTemplateMaster>;
}
