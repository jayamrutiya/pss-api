import { inject, injectable } from "inversify";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";

@injectable()
export class CustomerTemplateRepository implements ICustomerTemplateRepository {
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
}
