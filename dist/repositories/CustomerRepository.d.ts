import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { Customer } from "@prisma/client";
import { CreateCustomerRepoInput } from "../types/Customer";
export declare class CustomerRepository implements ICustomerRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    createCustomer(customerData: CreateCustomerRepoInput): Promise<Customer>;
    updateCustomer(id: number, customerData: CreateCustomerRepoInput): Promise<Customer>;
    getCustomers(userId: number): Promise<Customer[]>;
    getCustomer(id: number, userId: number): Promise<Customer | null>;
    deleteCustomer(id: number, userId: number): Promise<Customer | null>;
}
