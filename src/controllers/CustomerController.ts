import { ICustomerService } from "../interfaces/ICustomerService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { CreateCustomerServiceInput } from "../types/Customer";
import BaseController from "./BaseController";
import * as express from "express";

export class CustomerController extends BaseController {
  private _loggerService: ILoggerService;
  private _customerService: ICustomerService;
  constructor(
    loggerService: ILoggerService,
    customerService: ICustomerService
  ) {
    super();
    this._loggerService = loggerService;
    this._customerService = customerService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async upsertCustomer(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const token = req.user as any;
      const { id, ...resetBody } = req.body;

      const customerdata: CreateCustomerServiceInput = {
        ...resetBody,
        userId: token.id,
      };

      const createCustomer = await this._customerService.upsertCustomer(
        id,
        customerdata
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer save successfully.",
        {
          size: 1,
        },
        createCustomer
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getCustomers(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const token = req.user as any;
      const customerMasterId = req.query.customerMasterId
        ? Number(req.query.customerMasterId)
        : null;

      const getAllCustomer = await this._customerService.getCustomers(
        token.id,
        customerMasterId
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customers.",
        {
          size: getAllCustomer.length,
        },
        getAllCustomer
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getCustomer(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const token = req.user as any;
      const { id } = req.params;

      const getCustomer = await this._customerService.getCustomer(
        Number(id),
        token.id
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer.",
        {
          size: 1,
        },
        getCustomer
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async deleteCustomer(req: any, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const token = req.user as any;
      const { id } = req.query;

      const deleteCustomer = await this._customerService.deleteCustomer(
        Number(id),
        token.id
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer deleted successfully.",
        {
          size: 1,
        },
        deleteCustomer
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async upsertCustomerMaster(req: any, res: express.Response) {
    try {
      const token = req.user as any;
      const { id, name, companyName } = req.body;

      const createCusMas = await this._customerService.upsertCustomerMaster(
        id,
        name,
        companyName,
        Number(token.id)
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer created successfully.",
        {
          size: 1,
        },
        createCusMas
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getAllMasterCustomers(req: any, res: express.Response) {
    try {
      const token = req.user as any;

      const createCusMas = await this._customerService.getAllMasterCustomers(
        Number(token.id)
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer get successfully.",
        {
          size: createCusMas.length,
        },
        createCusMas
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async deleteCustomerMaster(req: any, res: express.Response) {
    try {
      const token = req.user as any;

      const { id } = req.query;

      const data = await this._customerService.deleteCustomerMaster(
        Number(token.id),
        Number(id)
      );
      // Return the response
      return this.sendJSONResponse(
        res,
        "Customer deleted successfully.",
        {
          size: 1,
        },
        data
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
