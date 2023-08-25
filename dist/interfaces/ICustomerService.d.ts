import { Customer } from "@prisma/client";
import { CreateCustomerServiceInput, CustomerData } from "../types/Customer";
export interface ICustomerService {
    upsertCustomer(id: number | null, customerData: CreateCustomerServiceInput): Promise<Customer>;
    getCustomers(userId: number): Promise<CustomerData[]>;
    getCustomer(id: number, userId: number): Promise<CustomerData>;
    deleteCustomer(id: number, userId: number): Promise<Customer | null>;
}
