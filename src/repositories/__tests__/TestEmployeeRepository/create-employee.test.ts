import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IDatabaseService } from "../../../interfaces/IDatabaseService";
import { EmployeeRepository } from "../../EmployeeRepository";
import { CreateEmployee, GetEmployeeService } from "../../../types/Employee";

describe("Employee Repository", () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  const databaseService = Container.get<IDatabaseService>(
    TYPES.DatabaseService
  );
  const employeeRepository = new EmployeeRepository(
    loggerService,
    databaseService
  );

  beforeAll(() => {
    console.log("Do database connection.");
  });

  afterAll((done) => {
    console.log("Database disconnect.");
    done();
  });

  describe("create employee", () => {
    test("create employee", async () => {
      const employee: CreateEmployee = {
        firstName: "jay",
        lastName: "a",
        emailId: "jay.amrutiya@dntinfotech.com",
        phoneNumber: 1234567899,
        isActive: true,
      };
      const createEmployee: GetEmployeeService =
        await employeeRepository.createEmployee(employee);
      expect(typeof createEmployee === "object").toBe(true);
      expect(createEmployee.id).toEqual(1);
    });
  });
});
