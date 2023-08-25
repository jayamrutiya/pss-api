"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../config/types");
const container_1 = require("../../../config/container");
const ts_mockery_1 = require("ts-mockery");
const EmployeeService_1 = require("../../EmployeeService");
describe("Employee Service", () => {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
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
    const employeeRepository = ts_mockery_1.Mock.of({
        getEmployee: jest.fn().mockResolvedValue(employeeMock),
    });
    const employeeService = new EmployeeService_1.EmployeeService(loggerService, employeeRepository);
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
//# sourceMappingURL=get-employee-service.test.js.map