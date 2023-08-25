import { Template } from "@prisma/client";
import { CreateCustomerTemplateInput, CustomerTemplateWithCustomerTemplate, UpdateCustomerTemplate } from "../types/CustomerTemplate";
export interface ICustomerTemplateService {
    createCustomerTemplate(userId: number, customerTemplateDataa: CreateCustomerTemplateInput[]): Promise<CustomerTemplateWithCustomerTemplate>;
    getCustomerTemplateByTypeAndCustomerId(customerId: number, templateType: string, userId: number): Promise<UpdateCustomerTemplate[]>;
    createWordFileCustomerTemplate(customerId: number): Promise<any>;
    getCustomerTemplateStatus(customerId: number, templateType: string, userId: number): Promise<{
        isAvailable: boolean;
    }>;
    deleteCustomerTemplateById(id: number): Promise<any>;
    getFiltterTemplate(customerId: number, templateType: string, userId: number): Promise<Template[]>;
    getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate | null>;
}
