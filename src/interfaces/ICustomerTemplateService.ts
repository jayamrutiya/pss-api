import { CustomerTemplate } from "@prisma/client";
import {
  CreateCustomerTemplateInput,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";

export interface ICustomerTemplateService {
  createCustomerTemplate(
    userId: number,
    customerTemplateData: CreateCustomerTemplateInput
  ): Promise<CustomerTemplate>;

  getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string
  ): Promise<UpdateCustomerTemplate[]>;
  createWordFileCustomerTemplate(
    customerId: number,
  ): Promise<any>
}
