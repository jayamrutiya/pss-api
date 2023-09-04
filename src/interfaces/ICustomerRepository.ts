import { Customer, CustomerMaster } from "@prisma/client";
import { CreateCustomerRepoInput } from "../types/Customer";

export interface ICustomerRepository {
  createCustomer(customerData: CreateCustomerRepoInput): Promise<Customer>;

  updateCustomer(
    id: number,
    customerData: CreateCustomerRepoInput
  ): Promise<Customer>;

  getCustomers(userId: number): Promise<Customer[]>;

  getCustomer(id: number, userId: number): Promise<Customer | null>;

  deleteCustomer(id: number, userId: number): Promise<Customer | null>;

  createCustomerMaster(
    name: string,
    companyName: string | null,
    userId: number
  ): Promise<CustomerMaster>;

  updateCustomerMaster(
    id: number,
    name: string,
    companyName: string | null,
    userId: number
  ): Promise<CustomerMaster>;

  getAllMasterCustomers(userId: number): Promise<CustomerMaster[]>;
}
