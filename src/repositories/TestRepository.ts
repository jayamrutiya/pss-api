import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestRepository } from "../interfaces/ITestRepository";

@injectable()
export class TestRepository implements ITestRepository {
  private _loggerService: ILoggerService;

  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getTestData(test: string): Promise<{ test: string }> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      console.log("test", test);

      // const user = await client.user.create({
      //   data: {
      //     email: "amrutiyajay98@gmail.com",
      //     name: "jay",
      //   },
      // });

      return { test };
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }
}
