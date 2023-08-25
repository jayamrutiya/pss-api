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
exports.TemplateRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const InternalServerError_1 = require("../errors/InternalServerError");
let TemplateRepository = class TemplateRepository {
    constructor(loggerService, databaseService) {
        this._loggerService = loggerService;
        this._databaseService = databaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createTemplate(templateData) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            const createTemplate = await client.template.create({
                data: templateData,
            });
            return createTemplate;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateTemplate(id, templateData) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            const updateTemplate = await client.template.update({
                where: {
                    id,
                },
                data: templateData,
            });
            await client.customerTemplate.updateMany({
                where: {
                    templateId: id,
                },
                data: {
                    templateTitle: templateData.title,
                },
            });
            return updateTemplate;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getTemplatesByType(type, userId) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            console.log("type", type);
            const getTemplates = await client.template.findMany({
                where: type
                    ? {
                        type,
                        userId,
                    }
                    : { userId },
            });
            return getTemplates;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async deleteTemplate(id, userId) {
        try {
            // Get the database clinte
            const client = this._databaseService.Client();
            const deleteTemplates = await client.template.delete({
                where: {
                    id,
                },
            });
            return deleteTemplates;
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getTemplateById(id, userId) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            const getTemplate = await client.template.findFirst({
                where: {
                    id,
                    userId,
                },
            });
            return getTemplate;
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
TemplateRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object])
], TemplateRepository);
exports.TemplateRepository = TemplateRepository;
//# sourceMappingURL=TemplateRepository.js.map