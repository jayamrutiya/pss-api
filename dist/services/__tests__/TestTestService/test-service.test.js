"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockery_1 = require("ts-mockery");
const types_1 = require("../../../config/types");
const TestService_1 = require("../../TestService");
const container_1 = require("../../../config/container");
describe("test service", () => {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
    // mock test repository
    const testRepository = ts_mockery_1.Mock.of({
        getTestData: jest.fn().mockResolvedValue({
            test: "Hello",
        }),
    });
    const testService = new TestService_1.TestService(loggerService, testRepository);
    beforeAll(() => { });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe("test serevice", () => {
        test("get test data", async () => {
            const test = "Hello";
            const result = await testService.getTestData(test);
            expect(testRepository.getTestData).toBeCalledWith(test);
            expect(result).toMatchObject({ test });
        });
    });
});
//# sourceMappingURL=test-service.test.js.map