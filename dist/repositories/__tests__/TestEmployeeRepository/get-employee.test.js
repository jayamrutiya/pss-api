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
    describe("get employee", () => {
        test("get employee", async () => {
            const getEmployee = await employeeRepository.getEmployee(1);
            expect(typeof getEmployee === "object").toBe(true);
            expect(getEmployee.id).toEqual(1);
        });
    });
});
//# sourceMappingURL=get-employee.test.js.map