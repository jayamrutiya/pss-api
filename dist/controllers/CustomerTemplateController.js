"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTemplateController = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const BaseController_1 = __importDefault(require("./BaseController"));
const fs_1 = require("fs");
class CustomerTemplateController extends BaseController_1.default {
    constructor(loggerService, customerTemplateService) {
        super();
        this._loggerService = loggerService;
        this._customerTemplateService = customerTemplateService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createCustomerTemplate(req, res) {
        try {
            console.log("createCustomerTemplate");
            // validate input
            this.validateRequest(req);
            const [{ customerId, templateId, templateType, templateData, order, isCustomMainContentTemplate, },] = req.body;
            // if (
            //   customerId &&
            //   templateId &&
            //   templateType &&
            //   isCustomMainContentTemplate
            // ) {
            //   throw new BadRequest("Invalid argumets.");
            // }
            const token = req.user;
            const saveCustomerTemplate = await this._customerTemplateService.createCustomerTemplate(token.id, req.body);
            // Return the response
            return this.sendJSONResponse(res, "Customer Template save successfully.", {
                size: 1,
            }, saveCustomerTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomerTemplateByTypeAndCustomerId(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const token = req.user;
            const { customerId, templateType } = req.query;
            if (!customerId || !templateType) {
                throw new BadRequest_1.BadRequest("Invalid argument.");
            }
            const getCustomerTemplate = await this._customerTemplateService.getCustomerTemplateByTypeAndCustomerId(Number(customerId), templateType, Number(token.id));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template.", {
                size: getCustomerTemplate.length,
            }, getCustomerTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async createWordFileCustomerTemplate(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const customerId = Number(req.query.customerId);
            const token = req.user;
            const saveCustomerTemplateData = await this._customerTemplateService.createWordFileCustomerTemplate(customerId);
            // res.setHeader(
            //   "Content-Type",
            //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            // );
            // res.setHeader(
            //   "Content-Disposition",
            //   `attachment; filename=${saveCustomerTemplateData.fileName}`
            // );
            // const fileStream = await fs.createReadStream(
            //   saveCustomerTemplateData.filePath
            // );
            // fileStream.pipe(res);
            // await unlinkSync(saveCustomerTemplateData.filePath);
            res.download(saveCustomerTemplateData.filePath, saveCustomerTemplateData.fileName, (err) => {
                if (err) {
                    console.log(err); // Check error if you want
                }
                else {
                    (0, fs_1.unlinkSync)(saveCustomerTemplateData.filePath);
                }
            });
            return res;
            // this.sendJSONResponse(
            //   res,
            //   "Customer Template Data Download as word successfully.",
            //   {
            //     size: 1,
            //   },
            //   saveCustomerTemplateData
            // );
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomerTemplateStatus(req, res) {
        try {
            const token = req.user;
            const { customerId, templateType } = req.query;
            const getCustomerTemplate = await this._customerTemplateService.getCustomerTemplateStatus(Number(customerId), templateType, Number(token.id));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template Status.", {
                size: 1,
            }, getCustomerTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteCustomerTemplateById(req, res) {
        try {
            const { id } = req.query;
            const deleteCustomerTemplate = await this._customerTemplateService.deleteCustomerTemplateById(Number(id));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template Deleted Successfully.", {
                size: 1,
            }, deleteCustomerTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getFiltterTemplate(req, res) {
        try {
            const token = req.user;
            const { customerId, templateType } = req.query;
            const getFilterTemplate = await this._customerTemplateService.getFiltterTemplate(Number(customerId), templateType, Number(token.id));
            // Return the response
            return this.sendJSONResponse(res, "Filter Customer Template.", {
                size: getFilterTemplate.length,
            }, getFilterTemplate);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomerTemplateById(req, res) {
        try {
            const { id } = req.params;
            const getData = await this._customerTemplateService.getCustomerTemplateById(Number(id));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template.", {
                size: 1,
            }, getData);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.CustomerTemplateController = CustomerTemplateController;
//# sourceMappingURL=CustomerTemplateController.js.map