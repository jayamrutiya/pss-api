import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IEmployeeRepository } from "../../../interfaces/IEmployeeRepository";
import { Mock } from "ts-mockery";
import { EmployeeService } from "../../EmployeeService";

describe("Employee Service", () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  const employeeMock = {
    id: 2,
    firstName: "Jay",
    lastName: "Amrutiya",
    emailId: "ja@yopmail.com",
    phoneNumber: 9874563211,
    createdAt: new Date(),
    isActive: true,
    updatedAt: null,
  };
  const employeeRepository: IEmployeeRepository = Mock.of<IEmployeeRepository>({
    getEmployee: jest.fn().mockResolvedValue(employeeMock),
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

  describe("get employee", () => {
    test("get employee", async () => {
      const getEmployee = await employeeService.getEmployee(employeeMock.id);
      //   console.log("getEmployee", getEmployee);
      expect(employeeRepository.getEmployee).toBeCalledWith(employeeMock.id);
      expect(getEmployee.id).toEqual(employeeMock.id);
    });
  });
});
