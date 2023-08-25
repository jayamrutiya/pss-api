"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("../../config/express"));
const env_1 = __importDefault(require("../../config/env"));
describe("get test data", () => {
    let request;
    let prisma;
    beforeAll(async () => {
        request = await (0, supertest_1.default)(express_1.default);
        prisma = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: `${env_1.default.DATABASE_URL}`,
                },
            },
        });
    });
    describe("get test data", () => {
        test("get test data 200", async () => {
            const res = await request.post("/api/v1.0/test").send({
                test: "Hello",
            });
            console.log(res.body);
            expect(res.status).toBe(200);
        });
    });
    afterAll((done) => {
        prisma.$disconnect();
        done();
    });
});
//# sourceMappingURL=get-test-data.test.js.map