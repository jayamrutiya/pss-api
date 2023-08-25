"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const types_1 = require("../../../config/types");
const container_1 = require("../../../config/container");
describe("authentication and authorization", () => {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
    const databaseService = container_1.iocContainer.get(types_1.TYPES.DatabaseService);
    let prisma;
    // connection db before starting the test
    beforeAll(() => {
        prisma = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: "postgresql://postgres:fenil2301@localhost:5432/thelink",
                },
            },
        });
    });
    // disconnect db after testing is over
    afterAll((done) => {
        prisma.$disconnect();
        done();
    });
    describe("test", () => {
        test("test", async () => {
            try {
                const result = true;
                expect(result).toBe(true);
            }
            catch (error) {
                // Left empty
            }
        });
    });
});
//# sourceMappingURL=test-repository.test.js.map