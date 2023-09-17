import { Customer, CustomerMaster, Document } from "@prisma/client";
import { CreateCustomerRepoInput } from "../types/Customer";
export interface ICustomerRepository {
    createCustomer(customerData: CreateCustomerRepoInput): Promise<Customer>;
    updateCustomer(id: number, customerData: CreateCustomerRepoInput): Promise<Customer>;
    getCustomers(userId: number, customerMasterId: number | null): Promise<Customer[]>;
    getCustomer(id: number, userId: number): Promise<Customer | null>;
    deleteCustomer(id: number, userId: number): Promise<Customer | null>;
    createCustomerMaster(name: string, companyName: string | null, userId: number): Promise<CustomerMaster>;
    updateCustomerMaster(id: number, name: string, companyName: string | null, userId: number): Promise<CustomerMaster>;
    getAllMasterCustomers(userId: number): Promise<CustomerMaster[]>;
    deleteCustomerMaster(id: number): Promise<CustomerMaster>;
    createDocument(customerMasterId: number, name: string | null, originalName: string | null, storeDocName: string | null, mimeType: string | null, sizeInBytes: string | null, url: string | null): Promise<Document>;
    getAllDocument(customerMasterId: number): Promise<Document[]>;
    deleteDocument(id: number): Promise<Document>;
}
