"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequest_1 = require("../errors/BadRequest");
const BaseController_1 = __importDefault(require("./BaseController"));
class TemplateController extends BaseController_1.default {
    constructor(loggerService, templateService) {
        super();
        this._loggerService = loggerService;
        this._templateService = templateService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async upsertTemplate(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const { id, type, title, details } = req.body;
            const types = [
                "COMMON_CONTENT",
                "REFE_LINE",
                "SUBJECT",
                "MAIN_CONTENT",
                "SUMMARY",
                "AGREEMENT",
            ];
            if (!type || !types.includes(type)) {
                throw new BadRequest_1.BadRequest("Please select valid type.");
            }
            if (!title && !details) {
                throw new BadRequest_1.BadRequest("Title or Details is required.");
            }
            const token = req.user;
            const upsertTemplate = await this._templateService.upsertTemplate({
                userId: token.id,
                ...req.body,
            });
            // Return the response
            return this.sendJSONResponse(res, "Template save successfully.", {
                size: 1,
            }, upsertTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getTemplatesByType(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const { type } = req.query;
            const types = [
                "COMMON_CONTENT",
                "REFE_LINE",
                "SUBJECT",
                "MAIN_CONTENT",
                "SUMMARY",
                "AGREEMENT",
            ];
            if (type.trim() && !types.includes(type.trim())) {
                throw new BadRequest_1.BadRequest("Please select valid type.");
            }
            const token = req.user;
            const getTemplates = await this._templateService.getTemplatesByType(type.trim(), token.id);
            // type not get then provide all template with user id
            // Return the response
            return this.sendJSONResponse(res, "Get Templates.", {
                size: getTemplates.length,
            }, getTemplates);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getTemplatesById(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const id = Number(req.params.id);
            if (!id || id === null) {
                throw new BadRequest_1.BadRequest("Please provide template id.");
            }
            const token = req.user;
            const getTemplates = await this._templateService.getTemplateById(id, token.id);
            // Return the response
            return this.sendJSONResponse(res, "Get Template.", {
                size: 1,
            }, getTemplates);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteTemplate(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const { id } = req.params;
            if (!id) {
                throw new BadRequest_1.BadRequest("Invaild id provided.");
            }
            const token = req.user;
            const deleteTemplate = await this._templateService.deleteTemplate(Number(id), token.id);
            // Return the response
            return this.sendJSONResponse(res, "Delete Templates.", {
                size: 1,
            }, deleteTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.default = TemplateController;
//# sourceMappingURL=TemplateController.js.map