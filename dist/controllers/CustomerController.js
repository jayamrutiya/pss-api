"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const env_1 = __importDefault(require("../config/env"));
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
            const customerMasterId = req.query.customerMasterId
                ? Number(req.query.customerMasterId)
                : null;
            const getAllCustomer = await this._customerService.getCustomers(token.id, customerMasterId);
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
    async upsertCustomerMaster(req, res) {
        try {
            const token = req.user;
            const { id, name, companyName } = req.body;
            const createCusMas = await this._customerService.upsertCustomerMaster(id, name, companyName, Number(token.id));
            // Return the response
            return this.sendJSONResponse(res, "Customer created successfully.", {
                size: 1,
            }, createCusMas);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getAllMasterCustomers(req, res) {
        try {
            const token = req.user;
            const createCusMas = await this._customerService.getAllMasterCustomers(Number(token.id));
            // Return the response
            return this.sendJSONResponse(res, "Customer get successfully.", {
                size: createCusMas.length,
            }, createCusMas);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteCustomerMaster(req, res) {
        try {
            const token = req.user;
            const { id } = req.query;
            const data = await this._customerService.deleteCustomerMaster(Number(token.id), Number(id));
            // Return the response
            return this.sendJSONResponse(res, "Customer deleted successfully.", {
                size: 1,
            }, data);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async createDocument(req, res) {
        try {
            const { name, customerMasterId } = req.body;
            const originalName = req.file.originalname;
            const storeDocName = req.file.filename;
            const mimeType = req.file.mimetype;
            const sizeInBytes = req.file.size.toString();
            const url = `${env_1.default.API_BASEURL}/doc/${storeDocName}`;
            const uploadDoc = await this._customerService.createDocument(Number(customerMasterId), name, originalName, storeDocName, mimeType, sizeInBytes, url);
            // Return the response
            return this.sendJSONResponse(res, "Document uploaded successfully.", {
                size: 1,
            }, uploadDoc);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getAllDocument(req, res) {
        try {
            const { customerMasterId } = req.query;
            const getAllDocs = await this._customerService.getAllDocument(Number(customerMasterId));
            // Return the response
            return this.sendJSONResponse(res, "Documents.", {
                size: getAllDocs.length,
            }, getAllDocs);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteDocument(req, res) {
        try {
            const { id } = req.query;
            const deleteDoc = await this._customerService.deleteDocument(Number(id));
            // Return the response
            return this.sendJSONResponse(res, "Document deleted successfully.", {
                size: 1,
            }, deleteDoc);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map