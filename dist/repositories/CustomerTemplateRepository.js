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
exports.CustomerTemplateRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const InternalServerError_1 = require("../errors/InternalServerError");
let CustomerTemplateRepository = class CustomerTemplateRepository {
    constructor(loggerService, databaseService) {
        this._loggerService = loggerService;
        this._databaseService = databaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createCustomerTemplate(customerTemplateData) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const { id, ...restData } = customerTemplateData;
            const save = await client.customerTemplate.create({
                data: restData,
            });
            return save;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getCustomerTemplateByTypeAndCustomerId(customerId, templateType) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getCustomerTemplates = await client.customerTemplate.findMany({
                where: {
                    customerId,
                    templateType,
                },
                orderBy: {
                    order: 'asc'
                },
                include: {
                    Template: true,
                    Customer: true,
                },
            });
            return getCustomerTemplates;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateCustomerTemplate(customerTemplateId, templateData) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const { id, ...restData } = templateData;
            const updateCustomerTemplates = await client.customerTemplate.update({
                where: {
                    id: customerTemplateId,
                },
                data: restData,
            });
            return updateCustomerTemplates;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async createWordFileCustomerTemplate(customerId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getData = await client.customerTemplate.findMany({
                where: {
                    customerId,
                },
            });
            return getData;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async deleteCustomerTemplateById(id) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const deletedata = await client.customerTemplate.delete({
                where: {
                    id,
                },
            });
            return deletedata;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getCustomerTemplateById(id) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const getdata = await client.customerTemplate.findFirst({
                where: {
                    id,
                },
            });
            return getdata;
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
CustomerTemplateRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object])
], CustomerTemplateRepository);
exports.CustomerTemplateRepository = CustomerTemplateRepository;
//# sourceMappingURL=CustomerTemplateRepository.js.map