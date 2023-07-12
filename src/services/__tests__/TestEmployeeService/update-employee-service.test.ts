import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IEmployeeRepository } from "../../../interfaces/IEmployeeRepository";
import { Mock } from "ts-mockery";
import { EmployeeService } from "../../EmployeeService";
import { BadRequest } from "../../../errors/BadRequest";
import { NotFound } from "../../../errors/NotFound";

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
    updatedAt: new Date(),
  };
  const employeeRepository: IEmployeeRepository = Mock.of<IEmployeeRepository>({
    getEmployee: jest.fn().mockResolvedValue(employeeMock),
    updateEmployee: jest.fn().mockResolvedValue(employeeMock),
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

  describe("update employee", () => {
    test("update employee", async () => {
      const id = 1;
      const updateEmployee = await employeeService.updateEmployee(
        id,
        employeeMock
      );
      expect(employeeRepository.getEmployee).toBeCalledWith(id);
      expect(employeeRepository.updateEmployee).toBeCalledWith(
        id,
        employeeMock
      );
      expect(updateEmployee.id).toEqual(employeeMock.id);
    });

    test("update employee with duplicate email", async () => {
      try {
        const id = 1;
        const employee = {
          firstName: "Jay",
          lastName: "Amrutiya",
          emailId: "jay.amrutiya@dntinfotech.com",
          phoneNumber: 9874563211,
          createdAt: new Date(),
          isActive: true,
          updatedAt: null,
        };
        const updateEmployee = await employeeService.updateEmployee(
          id,
          employee
        );
        expect(employeeRepository.getEmployee).toBeCalledWith(id);
        expect(employeeRepository.updateEmployee).toBeCalledWith(id, employee);
        expect(updateEmployee).toThrowError(BadRequest);
      } catch (error) {
        expect(error.message).toBe("This emailid already in use.");
      }
    });

    test("update employee with invalid employee id", async () => {
      try {
        const id = 2;
        const employee = {
          firstName: "Jay",
          lastName: "Amrutiya",
          emailId: "jay.a@dntinfotech.com",
          phoneNumber: 9874563211,
          createdAt: new Date(),
          isActive: true,
          updatedAt: null,
        };
        const updateEmployee = await employeeService.updateEmployee(
          id,
          employee
        );
        expect(employeeRepository.getEmployee).toBeCalledWith(id);
        expect(employeeRepository.updateEmployee).toBeCalledWith(id, employee);
        expect(updateEmployee).toThrowError(NotFound);
      } catch (error) {
        expect(error.message).toBe("Employee not found.");
      }
    });
  });
});
