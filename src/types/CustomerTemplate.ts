import { Customer, Template } from "@prisma/client";

export declare type CreateCustomerTemplateInput = {
  id: number | null;
  customerId: number;
  templateId: number | null;
  templateType: string;
  templateData: string | null;
  order: number | null;
  isCustomMainContentTemplate: boolean;
  //   createdAt: Date;
  //   updatedAt: Date | null;
};

export declare type CustomerTemplateWithCustomerTemplate = {
  id: number;
  customerId: number;
  templateId: number | null;
  templateType: string;
  templateData: string | null;
  order: number | null;
  isCustomMainContentTemplate: boolean;
  Customer: Customer;
  Template: Template | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export declare type UpdateCustomerTemplate = {
  id: number;
  customerId: number;
  templateId: number | null;
  templateType: string;
  templateData: string | null;
  order: number | null;
  isCustomMainContentTemplate: boolean;
  Template: Template | null;
  Customer: Customer;
  createdAt: Date;
  updatedAt: Date | null;
};
