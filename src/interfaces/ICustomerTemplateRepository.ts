import { CustomerTemplate } from "@prisma/client";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

export interface ICustomerTemplateRepository {
  createCustomerTemplate(
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplate>;

  getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<CustomerTemplateWithCustomerTemplate[]>;

  updateCustomerTemplate(
    id: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate>;

  createWordFileCustomerTemplate(customerId: number): any;
}
