"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../config/types");
const container_1 = require("../../../config/container");
const ts_mockery_1 = require("ts-mockery");
const EmployeeService_1 = require("../../EmployeeService");
const BadRequest_1 = require("../../../errors/BadRequest");
describe("Employee Service", () => {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
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
    const employeeRepository = ts_mockery_1.Mock.of({
        createEmployee: jest.fn().mockResolvedValue(employeeMock),
    });
    const employeeService = new EmployeeService_1.EmployeeService(loggerService, employeeRepository);
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
                expect(createEmployee).toThrowError(BadRequest_1.BadRequest);
            }
            catch (error) {
                expect(error.message).toBe("This emailid already in use.");
            }
        });
    });
});
//# sourceMappingURL=create-employee-service.test.js.map