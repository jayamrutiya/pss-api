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
    async getCustomers(userId, customerMasterId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getAllCustomer = await client.customer.findMany({
                where: customerMasterId
                    ? {
                        userId,
                        customerMasterId,
                    }
                    : { userId },
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
            await client.customerTemplateMaster.deleteMany({
                where: {
                    customerId: id,
                },
            });
            await client.customerTemplate.deleteMany({
                where: {
                    customerId: id,
                },
            });
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
    async createCustomerMaster(name, companyName, userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createCusMas = await client.customerMaster.create({
                data: {
                    name,
                    companyName,
                    userId,
                },
            });
            await client.customer.create({
                data: {
                    userId,
                    customerMasterId: createCusMas.id,
                    fhnameInPancardExactSpelling: name,
                    ywdATabelData: JSON.stringify([]),
                    otherLegalHears: JSON.stringify([]),
                    tableSDT: JSON.stringify([]),
                    totalShares: "0",
                },
            });
            return createCusMas;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateCustomerMaster(id, name, companyName, userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createCusMas = await client.customerMaster.update({
                where: {
                    id,
                },
                data: {
                    name,
                    companyName,
                    userId,
                },
            });
            return createCusMas;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getAllMasterCustomers(userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createCusMas = await client.customerMaster.findMany({
                where: {
                    userId,
                },
            });
            return createCusMas;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async deleteCustomerMaster(id) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createCusMas = await client.customerMaster.delete({
                where: {
                    id,
                },
            });
            return createCusMas;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async createDocument(customerMasterId, name, originalName, storeDocName, mimeType, sizeInBytes, url) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const createDoc = await client.document.create({
                data: {
                    customerMasterId,
                    name,
                    originalName,
                    storeDocName,
                    mimeType,
                    sizeInBytes,
                    url,
                },
            });
            return createDoc;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getAllDocument(customerMasterId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getAllDocs = await client.document.findMany({
                where: {
                    customerMasterId,
                },
            });
            return getAllDocs;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async deleteDocument(id) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            return await client.document.delete({
                where: {
                    id,
                },
            });
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