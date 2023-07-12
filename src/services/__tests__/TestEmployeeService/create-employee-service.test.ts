import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IEmployeeRepository } from "../../../interfaces/IEmployeeRepository";
import { Mock } from "ts-mockery";
import { EmployeeService } from "../../EmployeeService";
import { BadRequest } from "../../../errors/BadRequest";

describe("Employee Service", () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  const employeeMock = {
    id: 1,
    firstName: "Jay",
    lastName: "Amrutiya",
    emailId: "ja@yopmail.com",
    phoneNumber: 9874563211,
    createdAt: new Date(),
    isActive: true,
    updatedAt: null,
  };
  const employeeRepository: IEmployeeRepository = Mock.of<IEmployeeRepository>({
    createEmployee: jest.fn().mockResolvedValue(employeeMock),
  });

  const employeeService = new EmployeeService(
    loggerService,
    employeeRepository
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
      const createEmployee = await employeeService.createEmployee(employeeMock);
      expect(employeeRepository.createEmployee).toBeCalledWith(employeeMock);
      expect(createEmployee.id).toEqual(employeeMock.id);
    });

    test("create employee with duplicate email", async () => {
      try {
        const employee = {
          firstName: "Jay",
          lastName: "Amrutiya",
          emailId: "jay.amrutiya@dntinfotech.com",
          phoneNumber: 9874563211,
          createdAt: new Date(),
          isActive: true,
          updatedAt: null,
        };
        const createEmployee = await employeeService.createEmployee(employee);
        expect(employeeRepository.createEmployee).toBeCalledWith(employee);
        expect(createEmployee).toThrowError(BadRequest);
      } catch (error) {
        expect(error.message).toBe("This emailid already in use.");
      }
    });
  });
});
