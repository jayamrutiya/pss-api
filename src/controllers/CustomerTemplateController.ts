import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";

export class CustomerTemplateController extends BaseController {
  private _loggerService: ILoggerService;
  private _customerTemplateService: ICustomerTemplateService;
  constructor(
    loggerService: ILoggerService,
    customerTemplateService: ICustomerTemplateService
  ) {
    super();
    this._loggerService = loggerService;
    this._customerTemplateService = customerTemplateService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }
}
