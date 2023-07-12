import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestRepository } from "../interfaces/ITestRepository";
import { ITestService } from "../interfaces/ITestService";

@injectable()
export class TestService implements ITestService {
  private _loggerService: ILoggerService;
  private _testRepository: ITestRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.TestRepository) testRepository: ITestRepository
  ) {
    this._testRepository = testRepository;
    this._loggerService = loggerService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getTestData(test: string): Promise<{ test: string }> {
    console.log("test", test);

    return this._testRepository.getTestData(test);
  }
}
