"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const BadRequest_1 = require("../errors/BadRequest");
const NotFound_1 = require("../errors/NotFound");
let EmployeeService = class EmployeeService {
    constructor(loggerService, employeeRepository) {
        this._employeeRepository = employeeRepository;
        this._loggerService = loggerService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async getEmployee(id) {
        return this._employeeRepository.getEmployee(id);
    }
    async createEmployee(employee) {
        const takenEmailId = "jay.amrutiya@dntinfotech.com";
        if (takenEmailId === employee.emailId) {
            throw new BadRequest_1.BadRequest("This emailid already in use.");
        }
        return this._employeeRepository.createEmployee(employee);
    }
    async updateEmployee(id, employee) {
        const getEmployee = await this._employeeRepository.getEmployee(id);
        if (getEmployee.id !== id) {
            throw new NotFound_1.NotFound("Employee not found.");
        }
        const takenEmailId = "jay.amrutiya@dntinfotech.com";
        if (takenEmailId === employee.emailId) {
            throw new BadRequest_1.BadRequest("This emailid already in use.");
        }
        return this._employeeRepository.updateEmployee(id, employee);
    }
};
EmployeeService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.EmployeeRepository)),
    __metadata("design:paramtypes", [Object, Object])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map