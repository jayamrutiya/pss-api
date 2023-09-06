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
const helper_1 = require("../config/helper");
let TemplateService = class TemplateService {
    constructor(loggerService, templateRepository) {
        this._loggerService = loggerService;
        this._templateRepository = templateRepository;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async upsertTemplate(templateData) {
        let { id, ...withOutId } = templateData;
        console.log("withOutId", withOutId);
        let str, find, replace;
        str = withOutId.details;
        find = "<table>";
        replace = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px">`;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // find = "<td>";
        // replace = `<td style="text-align:center" >`;
        // str = replaceAll(str, find, replace);
        const data = {
            userId: withOutId.userId,
            type: withOutId.type,
            title: withOutId.title,
            details: str,
        };
        if (templateData.id) {
            // update template
            return await this._templateRepository.updateTemplate(id, data);
        }
        else {
            // create template
            return await this._templateRepository.createTemplate(data);
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
        return await this._templateRepository.deleteTemplate(id, userId);
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