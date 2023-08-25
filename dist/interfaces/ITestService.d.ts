export interface ITestService {
    getTestData(test: string): Promise<{
        test: string;
    }>;
}
