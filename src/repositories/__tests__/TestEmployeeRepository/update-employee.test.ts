import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IDatabaseService } from "../../../interfaces/IDatabaseService";
import { EmployeeRepository } from "../../EmployeeRepository";
import { GetEmployeeService, UpdateEmployee } from "../../../types/Employee";

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

  describe("update employee", () => {
    test("update employee", async () => {
      const id = 1;
      const employee: UpdateEmployee = {
        firstName: "jay",
        lastName: "a",
        emailId: "jay.a@dntinfotech.com",
        phoneNumber: 1234567899,
        isActive: true,
      };
      const updateEmployee: GetEmployeeService =
        await employeeRepository.updateEmployee(id, employee);
      expect(typeof updateEmployee === "object").toBe(true);
      expect(updateEmployee.id).toEqual(1);
    });
  });
});
