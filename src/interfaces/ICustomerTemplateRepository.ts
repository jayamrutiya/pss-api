import { CustomerTemplate } from "@prisma/client";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

export interface ICustomerTemplateRepository {
  createCustomerTemplate(
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplateWithCustomerTemplate>;

  getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<CustomerTemplateWithCustomerTemplate[]>;

  updateCustomerTemplate(
    customerTemplateId: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate>;

  createWordFileCustomerTemplate(customerId: number): any;
}
