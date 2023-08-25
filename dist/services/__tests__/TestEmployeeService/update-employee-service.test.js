"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../config/types");
const container_1 = require("../../../config/container");
const ts_mockery_1 = require("ts-mockery");
const EmployeeService_1 = require("../../EmployeeService");
const BadRequest_1 = require("../../../errors/BadRequest");
const NotFound_1 = require("../../../errors/NotFound");
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
        updatedAt: new Date(),
    };
    const employeeRepository = ts_mockery_1.Mock.of({
        getEmployee: jest.fn().mockResolvedValue(employeeMock),
        updateEmployee: jest.fn().mockResolvedValue(employeeMock),
    });
    const employeeService = new EmployeeService_1.EmployeeService(loggerService, employeeRepository);
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
            const updateEmployee = await employeeService.updateEmployee(id, employeeMock);
            expect(employeeRepository.getEmployee).toBeCalledWith(id);
            expect(employeeRepository.updateEmployee).toBeCalledWith(id, employeeMock);
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
                const updateEmployee = await employeeService.updateEmployee(id, employee);
                expect(employeeRepository.getEmployee).toBeCalledWith(id);
                expect(employeeRepository.updateEmployee).toBeCalledWith(id, employee);
                expect(updateEmployee).toThrowError(BadRequest_1.BadRequest);
            }
            catch (error) {
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
                const updateEmployee = await employeeService.updateEmployee(id, employee);
                expect(employeeRepository.getEmployee).toBeCalledWith(id);
                expect(employeeRepository.updateEmployee).toBeCalledWith(id, employee);
                expect(updateEmployee).toThrowError(NotFound_1.NotFound);
            }
            catch (error) {
                expect(error.message).toBe("Employee not found.");
            }
        });
    });
});
//# sourceMappingURL=update-employee-service.test.js.map