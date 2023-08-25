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
exports.CustomerRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const InternalServerError_1 = require("../errors/InternalServerError");
let CustomerRepository = class CustomerRepository {
    constructor(loggerService, databaseService) {
        this._loggerService = loggerService;
        this._databaseService = databaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createCustomer(customerData) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createCustomer = await client.customer.create({
                data: customerData,
            });
            return createCustomer;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateCustomer(id, customerData) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const updateCustomer = await client.customer.update({
                data: customerData,
                where: {
                    id,
                },
            });
            return updateCustomer;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getCustomers(userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getAllCustomer = await client.customer.findMany({
                where: {
                    userId,
                },
            });
            return getAllCustomer;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getCustomer(id, userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getCustomer = await client.customer.findFirst({
                where: {
                    id,
                    userId,
                },
            });
            return getCustomer;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async deleteCustomer(id, userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const deleteCUstomer = await client.customer.delete({
                where: {
                    id,
                },
            });
            return deleteCUstomer;
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
CustomerRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object])
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=CustomerRepository.js.map