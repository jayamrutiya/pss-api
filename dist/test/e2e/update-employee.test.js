"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("../../config/express"));
describe("update employee", () => {
    let request;
    beforeAll(async () => {
        request = await (0, supertest_1.default)(express_1.default);
        console.log("Do database connection.");
    });
    afterAll(async () => {
        console.log("disconnect database.");
    });
    describe("update employee", () => {
        test("update employee", async () => {
            const updateEmployee = await request.put("/api/v1.0/employee/1").send({
                firstName: "jay",
                lastName: "a",
                emailId: "jay.a@dntinfotech.com",
                phoneNumber: 1234567899,
                isActive: true,
            });
            expect(updateEmployee.status).toBe(200);
        });
        test("update employee with duplicate email", async () => {
            try {
                const updateEmployee = await request.put("/api/v1.0/employee/1").send({
                    firstName: "jay",
                    lastName: "a",
                    emailId: "jay.amrutiya@dntinfotech.com",
                    phoneNumber: 1234567899,
                    isActive: true,
                });
                expect(updateEmployee.status).toBe(400);
            }
            catch (error) {
                expect(error.message).toBe("This emailid already in use.");
            }
        });
        test("update employee with invalid employee id", async () => {
            try {
                const updateEmployee = await request.put("/api/v1.0/employee/2").send({
                    firstName: "jay",
                    lastName: "a",
                    emailId: "jay.amrutiya@dntinfotech.com",
                    phoneNumber: 1234567899,
                    isActive: true,
                });
                expect(updateEmployee.status).toBe(404);
            }
            catch (error) {
                expect(error.message).toBe("Employee not found.");
            }
        });
    });
});
//# sourceMappingURL=update-employee.test.js.map