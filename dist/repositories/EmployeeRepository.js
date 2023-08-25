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
exports.EmployeeRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const InternalServerError_1 = require("../errors/InternalServerError");
let EmployeeRepository = class EmployeeRepository {
    constructor(loggerService, databaseService) {
        this._loggerService = loggerService;
        this._databaseService = databaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async getEmployee(id) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            // console.log("client", client);
            return await client.user.create({
                data: {
                    firstName: "Hello",
                    lastName: "Hello",
                    salt: "asd",
                    password: "sdas",
                    userName: "as",
                },
            });
            // return {
            //   id: 1,
            //   firstName: "Jhone",
            //   lastName: "Deo",
            //   emailId: "jd@yopmail.com",
            //   phoneNumber: 1234567899,
            //   createdAt: new Date(),
            //   isActive: true,
            //   updatedAt: null,
            // };
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async createEmployee(employee) {
        try {
            // Get the database client
            // const client = this._databaseService.Client();
            return {
                id: 1,
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId,
                phoneNumber: employee.phoneNumber,
                createdAt: new Date(),
                isActive: employee.isActive,
                updatedAt: null,
            };
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateEmployee(id, employee) {
        try {
            // Get the database client
            // const client = this._databaseService.Client();
            return {
                id: id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId,
                phoneNumber: employee.phoneNumber,
                isActive: employee.isActive,
                updatedAt: new Date(),
                createdAt: new Date(),
            };
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
};
EmployeeRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object])
], EmployeeRepository);
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map