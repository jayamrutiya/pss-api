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
    templateType: string,
    customerTemplateMasterId: number | null
  ): Promise<CustomerTemplateWithCustomerTemplateRepo[]>;

  updateCustomerTemplate(
    customerTemplateId: number,
    templateData: CreateCustomerTemplateInput
  ): Promise<UpdateCustomerTemplate>;

  createWordFileCustomerTemplate(customerTemplateMasterId: number): any;

  deleteCustomerTemplateById(id: number): Promise<any>;

  getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate | null>;

  createCustomerTemplateMaster(
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null,
    letterNo: string | null
  ): Promise<CustomerTemplateMaster>;

  getCustomerTemplateMasters(
    customerId: number
  ): Promise<CustomerTemplateMaster[]>;

  getCustomerTemplateMasterById(
    id: number
  ): Promise<CustomerTemplateMaster | null>;

  updateCustomerTemplateMaster(
    id: number,
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null
  ): Promise<CustomerTemplateMaster>;

  deleteCustomerTemplateMasterById(id: number): Promise<CustomerTemplateMaster>;

  getLetterCount(companyCount: boolean, customerId: number): Promise<number>;
}
