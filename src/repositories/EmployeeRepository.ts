import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import {
  CreateEmployee,
  GetEmployeeService,
  UpdateEmployee,
} from "../types/Employee";

@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private _loggerService: ILoggerService;
  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getEmployee(id: number): Promise<any> {
    try {
      // Get the database client
      const client = this._databaseService.Client();
      // console.log("client", client);
      return await client.user.create({
        data: {
          firstName: "Hello",
          lastName: "Hello",
          salt: "asd",
          password: "sdas",
          userName: "as",
        },
      });

      // return {
      //   id: 1,
      //   firstName: "Jhone",
      //   lastName: "Deo",
      //   emailId: "jd@yopmail.com",
      //   phoneNumber: 1234567899,
      //   createdAt: new Date(),
      //   isActive: true,
      //   updatedAt: null,
      // };
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createEmployee(employee: CreateEmployee): Promise<GetEmployeeService> {
    try {
      // Get the database client
      // const client = this._databaseService.Client();

      return {
        id: 1,
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
        phoneNumber: employee.phoneNumber,
        createdAt: new Date(),
        isActive: employee.isActive,
        updatedAt: null,
      };
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateEmployee(
    id: number,
    employee: UpdateEmployee
  ): Promise<GetEmployeeService> {
    try {
      // Get the database client
      // const client = this._databaseService.Client();

      return {
        id: id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
        phoneNumber: employee.phoneNumber,
        isActive: employee.isActive,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }
}
