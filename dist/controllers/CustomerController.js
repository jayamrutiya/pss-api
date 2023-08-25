"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const BaseController_1 = __importDefault(require("./BaseController"));
class CustomerController extends BaseController_1.default {
    constructor(loggerService, customerService) {
        super();
        this._loggerService = loggerService;
        this._customerService = customerService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async upsertCustomer(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const token = req.user;
            const { id, ...resetBody } = req.body;
            const customerdata = {
                ...resetBody,
                userId: token.id,
            };
            const createCustomer = await this._customerService.upsertCustomer(id, customerdata);
            // Return the response
            return this.sendJSONResponse(res, "Customer save successfully.", {
                size: 1,
            }, createCustomer);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomers(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const token = req.user;
            const getAllCustomer = await this._customerService.getCustomers(token.id);
            // Return the response
            return this.sendJSONResponse(res, "Customers.", {
                size: getAllCustomer.length,
            }, getAllCustomer);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomer(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const token = req.user;
            const { id } = req.params;
            const getCustomer = await this._customerService.getCustomer(Number(id), token.id);
            // Return the response
            return this.sendJSONResponse(res, "Customer.", {
                size: 1,
            }, getCustomer);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteCustomer(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const token = req.user;
            const { id } = req.query;
            const deleteCustomer = await this._customerService.deleteCustomer(Number(id), token.id);
            // Return the response
            return this.sendJSONResponse(res, "Customer deleted successfully.", {
                size: 1,
            }, deleteCustomer);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map