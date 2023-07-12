import { Mock } from "ts-mockery";
import { TYPES } from "../../../config/types";
import { TestService } from "../../TestService";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { ITestRepository } from "../../../interfaces/ITestRepository";

describe("test service", () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);

  // mock test repository
  const testRepository: ITestRepository = Mock.of<ITestRepository>({
    getTestData: jest.fn().mockResolvedValue({
      test: "Hello",
    }),
  });

  const testService: TestService = new TestService(
    loggerService,
    testRepository
  );

  beforeAll(() => {});

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
