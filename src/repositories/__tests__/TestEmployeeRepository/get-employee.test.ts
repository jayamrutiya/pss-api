import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IDatabaseService } from "../../../interfaces/IDatabaseService";
import { EmployeeRepository } from "../../EmployeeRepository";
import { GetEmployeeService } from "../../../types/Employee";

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

  describe("get employee", () => {
    test("get employee", async () => {
      const getEmployee: GetEmployeeService =
        await employeeRepository.getEmployee(1);
      expect(typeof getEmployee === "object").toBe(true);
      expect(getEmployee.id).toEqual(1);
    });
  });
});
