import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestRepository } from "../interfaces/ITestRepository";
import { ITestService } from "../interfaces/ITestService";
export declare class TestService implements ITestService {
    private _loggerService;
    private _testRepository;
    constructor(loggerService: ILoggerService, testRepository: ITestRepository);
    getTestData(test: string): Promise<{
        test: string;
    }>;
}
