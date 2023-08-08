import { CustomerTemplate } from "@prisma/client";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

export interface ICustomerTemplateService {
  createCustomerTemplate(
    userId: number,
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplateWithCustomerTemplate>;

  getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string,
    userId: number
  ): Promise<UpdateCustomerTemplate[]>;

  createWordFileCustomerTemplate(customerId: number): Promise<any>;
}
