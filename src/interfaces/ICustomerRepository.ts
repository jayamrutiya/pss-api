import { Customer } from "@prisma/client";
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
}
