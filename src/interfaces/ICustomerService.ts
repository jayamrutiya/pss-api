import { Customer } from "@prisma/client";
import { CreateCustomerServiceInput } from "../types/Customer";

export interface ICustomerService {
  upsertCustomer(
    id: number | null,
    customerData: CreateCustomerServiceInput
  ): Promise<Customer>;

  getCustomers(userId: number): Promise<Customer[]>;

  getCustomer(id: number, userId: number): Promise<Customer | null>;

  deleteCustomer(id: number, userId: number): Promise<Customer | null>;
}
