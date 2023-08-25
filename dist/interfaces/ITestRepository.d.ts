export interface ITestRepository {
    getTestData(test: string): Promise<{
        test: string;
    }>;
}
