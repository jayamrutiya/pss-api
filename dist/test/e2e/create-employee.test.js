"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("../../config/express"));
describe("create employee", () => {
    let request;
    beforeAll(async () => {
        request = await (0, supertest_1.default)(express_1.default);
        console.log("Do database connection.");
    });
    afterAll(async () => {
        console.log("disconnect database.");
    });
    describe("create employee", () => {
        test("create employee", async () => {
            const createEmployee = await request.post("/api/v1.0/employee").send({
                firstName: "jay",
                lastName: "a",
                emailId: "jay.a@dntinfotech.com",
                phoneNumber: 1234567899,
                isActive: true,
            });
            expect(createEmployee.status).toBe(200);
        });
        test("create employee with duplicate email", async () => {
            try {
                const createEmployee = await request.post("/api/v1.0/employee").send({
                    firstName: "jay",
                    lastName: "a",
                    emailId: "jay.amrutiya@dntinfotech.com",
                    phoneNumber: 1234567899,
                    isActive: true,
                });
                expect(createEmployee.status).toBe(400);
            }
            catch (error) {
                expect(error.message).toBe("This emailid already in use.");
            }
        });
    });
});
//# sourceMappingURL=create-employee.test.js.map