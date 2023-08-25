import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestRepository } from "../interfaces/ITestRepository";
export declare class TestRepository implements ITestRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    getTestData(test: string): Promise<{
        test: string;
    }>;
}
