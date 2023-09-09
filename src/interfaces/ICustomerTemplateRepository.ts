import { CustomerTemplate, CustomerTemplateMaster } from "@prisma/client";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  CustomerTemplateWithCustomerTemplateRepo,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

export interface ICustomerTemplateRepository {
  createCustomerTemplate(
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplateWithCustomerTemplate>;

  getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<CustomerTemplateWithCustomerTemplateRepo[]>;

  updateCustomerTemplate(
    customerTemplateId: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate>;

  createWordFileCustomerTemplate(customerId: number): any;

  deleteCustomerTemplateById(id: number): Promise<any>;

  getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate | null>;

  createCustomerTemplateMaster(
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null
  ): Promise<CustomerTemplateMaster>;
}
