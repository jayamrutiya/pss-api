"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("../../config/express"));
describe("get employee", () => {
    let request;
    beforeAll(async () => {
        request = await (0, supertest_1.default)(express_1.default);
        console.log("Do database connection.");
    });
    afterAll(async () => {
        console.log("disconnect database.");
    });
    describe("get employee", () => {
        test("get employee", async () => {
            const getEmployee = await request.get("/api/v1.0/employee/1");
            expect(getEmployee.status).toBe(200);
        });
    });
});
//# sourceMappingURL=get-employee.test.js.map