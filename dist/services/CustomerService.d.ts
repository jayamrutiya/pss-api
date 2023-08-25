import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { Customer } from "@prisma/client";
import { CreateCustomerServiceInput, CustomerData } from "../types/Customer";
export declare class CustomerService implements ICustomerService {
    private _loggerService;
    private _customerRepository;
    constructor(loggerService: ILoggerService, customerRepository: ICustomerRepository);
    upsertCustomer(id: number | null, customerData: CreateCustomerServiceInput): Promise<Customer>;
    getCustomers(userId: number): Promise<CustomerData[]>;
    getCustomer(id: number, userId: number): Promise<CustomerData>;
    deleteCustomer(id: number, userId: number): Promise<Customer | null>;
}
