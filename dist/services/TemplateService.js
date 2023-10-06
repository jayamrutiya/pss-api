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
exports.TemplateService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const NotFound_1 = require("../errors/NotFound");
const fs_1 = require("fs");
const path_1 = require("path");
let TemplateService = class TemplateService {
    constructor(loggerService, templateRepository) {
        this._loggerService = loggerService;
        this._templateRepository = templateRepository;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async upsertTemplate(templateData) {
        if (templateData.id) {
            const getTemplate = await this._templateRepository.getTemplateById(templateData.id, templateData.userId);
            if (!getTemplate) {
                throw new NotFound_1.NotFound("No such record found");
            }
            if (templateData.originalName) {
                getTemplate.storeDocName
                    ? await (0, fs_1.unlinkSync)((0, path_1.join)("./src/public/Template", getTemplate.storeDocName))
                    : "";
                // update template
                return await this._templateRepository.updateTemplate(templateData.id, templateData);
            }
            else {
                const payload = {
                    ...templateData,
                    originalName: getTemplate.originalName,
                    storeDocName: getTemplate.storeDocName,
                    mimeType: getTemplate.mimeType,
                    sizeInBytes: getTemplate.sizeInBytes,
                    url: getTemplate.url,
                    path: getTemplate.path,
                };
                // update template
                return await this._templateRepository.updateTemplate(templateData.id, payload);
            }
        }
        else {
            // create template
            const { id, ...restData } = templateData;
            return await this._templateRepository.createTemplate(restData);
        }
    }
    async getTemplatesByType(type, userId) {
        return await this._templateRepository.getTemplatesByType(type, userId);
    }
    async getTemplateById(id, userId) {
        const gettemplateById = await this._templateRepository.getTemplateById(id, userId);
        if (!gettemplateById) {
            throw new NotFound_1.NotFound("Template Not Found");
        }
        return gettemplateById;
    }
    async deleteTemplate(id, userId) {
        const getTemplate = await this._templateRepository.getTemplateById(id, userId);
        if (!getTemplate) {
            throw new NotFound_1.NotFound("No such record found");
        }
        const deletedTemplate = await this._templateRepository.deleteTemplate(id, userId);
        getTemplate.storeDocName
            ? await (0, fs_1.unlinkSync)((0, path_1.join)("./src/public/Template", getTemplate.storeDocName))
            : "";
        return deletedTemplate;
    }
};
TemplateService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TemplateRepository)),
    __metadata("design:paramtypes", [Object, Object])
], TemplateService);
exports.TemplateService = TemplateService;
//# sourceMappingURL=TemplateService.js.map