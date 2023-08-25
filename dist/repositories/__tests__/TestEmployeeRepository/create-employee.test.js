"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../config/types");
const container_1 = require("../../../config/container");
const EmployeeRepository_1 = require("../../EmployeeRepository");
describe("Employee Repository", () => {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
    const databaseService = container_1.iocContainer.get(types_1.TYPES.DatabaseService);
    const employeeRepository = new EmployeeRepository_1.EmployeeRepository(loggerService, databaseService);
    beforeAll(() => {
        console.log("Do database connection.");
    });
    afterAll((done) => {
        console.log("Database disconnect.");
        done();
    });
    describe("create employee", () => {
        test("create employee", async () => {
            const employee = {
                firstName: "jay",
                lastName: "a",
                emailId: "jay.amrutiya@dntinfotech.com",
                phoneNumber: 1234567899,
                isActive: true,
            };
            const createEmployee = await employeeRepository.createEmployee(employee);
            expect(typeof createEmployee === "object").toBe(true);
            expect(createEmployee.id).toEqual(1);
        });
    });
});
//# sourceMappingURL=create-employee.test.js.map