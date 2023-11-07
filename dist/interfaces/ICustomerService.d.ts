import { Customer, CustomerMaster, Document } from "@prisma/client";
import { CreateCustomerServiceInput } from "../types/Customer";
export interface ICustomerService {
    upsertCustomer(id: number | null, customerData: CreateCustomerServiceInput): Promise<Customer>;
    getCustomers(userId: number, customerMasterId: number | null): Promise<any>;
    getCustomer(id: number, userId: number): Promise<any>;
    deleteCustomer(id: number, userId: number): Promise<Customer | null>;
    upsertCustomerMaster(id: number | null, name: string, companyName: string | null, userId: number): Promise<CustomerMaster>;
    getAllMasterCustomers(userId: number): Promise<CustomerMaster[]>;
    deleteCustomerMaster(userId: number, id: number): Promise<CustomerMaster>;
    createDocument(customerMasterId: number, name: string | null, originalName: string | null, storeDocName: string | null, mimeType: string | null, sizeInBytes: string | null, url: string | null): Promise<Document>;
    getAllDocument(customerMasterId: number): Promise<Document[]>;
    deleteDocument(id: number): Promise<Document>;
}
