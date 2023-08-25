"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
class EmployeeController extends BaseController_1.default {
    constructor(loggerService, employeeService) {
        super();
        this._loggerService = loggerService;
        this._employeeService = employeeService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async getEmployee(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const id = Number(req.params.id);
            const employee = await this._employeeService.getEmployee(id);
            // Return the response
            return this.sendJSONResponse(res, "Get Employee.", {
                size: 1,
            }, employee);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async createEmployee(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const employee = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                phoneNumber: req.body.phoneNumber,
                isActive: req.body.isActive,
            };
            const createEmployee = await this._employeeService.createEmployee(employee);
            // Return the response
            return this.sendJSONResponse(res, "Create Employee.", {
                size: 1,
            }, createEmployee);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async updateEmployee(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const id = Number(req.params.id);
            const employee = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                phoneNumber: req.body.phoneNumber,
                isActive: req.body.isActive,
            };
            const updateEmployee = await this._employeeService.updateEmployee(id, employee);
            // Return the response
            return this.sendJSONResponse(res, "Update Employee.", {
                size: 1,
            }, updateEmployee);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map