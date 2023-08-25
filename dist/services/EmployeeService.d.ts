import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { IEmployeeService } from "../interfaces/IEmployeeService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { CreateEmployee, GetEmployeeService, UpdateEmployee } from "../types/Employee";
export declare class EmployeeService implements IEmployeeService {
    private _loggerService;
    private _employeeRepository;
    constructor(loggerService: ILoggerService, employeeRepository: IEmployeeRepository);
    getEmployee(id: number): Promise<any>;
    createEmployee(employee: CreateEmployee): Promise<GetEmployeeService>;
    updateEmployee(id: number, employee: UpdateEmployee): Promise<GetEmployeeService>;
}
