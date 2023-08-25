import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { CreateEmployee, GetEmployeeService, UpdateEmployee } from "../types/Employee";
export declare class EmployeeRepository implements IEmployeeRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    getEmployee(id: number): Promise<any>;
    createEmployee(employee: CreateEmployee): Promise<GetEmployeeService>;
    updateEmployee(id: number, employee: UpdateEmployee): Promise<GetEmployeeService>;
}
