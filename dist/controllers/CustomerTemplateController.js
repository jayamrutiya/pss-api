"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTemplateController = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const BaseController_1 = __importDefault(require("./BaseController"));
const fs_1 = require("fs");
const mysqldump_1 = __importDefault(require("mysqldump"));
const env_1 = __importDefault(require("../config/env"));
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
            const { customerId, templateType, customerTemplateMasterId } = req.query;
            if (!customerId || !templateType) {
                throw new BadRequest_1.BadRequest("Invalid argument.");
            }
            const getCustomerTemplate = await this._customerTemplateService.getCustomerTemplateByTypeAndCustomerId(Number(customerId), templateType, Number(token.id), Number(customerTemplateMasterId));
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
            const customerTemplateMasterId = Number(req.query.customerTemplateMasterId);
            const customerId = Number(req.query.customerId);
            const token = req.user;
            const saveCustomerTemplateData = await this._customerTemplateService.createWordFileCustomerTemplate(customerTemplateMasterId, customerId);
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
                    // unlinkSync(saveCustomerTemplateData.filePath);
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
            const { customerId, templateType, customerTemplateMasterId } = req.query;
            const getCustomerTemplate = await this._customerTemplateService.getCustomerTemplateStatus(Number(customerId), templateType, Number(token.id), Number(customerTemplateMasterId));
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
            const { customerId, templateType, customerTemplateMasterId } = req.query;
            const getFilterTemplate = await this._customerTemplateService.getFiltterTemplate(Number(customerId), templateType, Number(token.id), Number(customerTemplateMasterId));
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
    async dumpMysqlFile(req, res) {
        try {
            await (0, mysqldump_1.default)({
                connection: {
                    host: "localhost",
                    user: "root",
                    password: "",
                    database: "pss",
                    port: 3306,
                },
                dump: {
                    schema: { table: { dropIfExist: true } },
                },
                dumpToFile: `${__dirname}/pss.sql`,
            });
            res.download(`${__dirname}/pss.sql`, "pss.sql", (err) => {
                if (err) {
                    console.log(err); // Check error if you want
                }
                else {
                    (0, fs_1.unlinkSync)(`${__dirname}/pss.sql`);
                }
            });
        }
        catch (error) {
            console.log("Error", error);
            return this.sendErrorResponse(req, res, error);
        }
    }
    async createCustomerTemplateMaster(req, res) {
        try {
            const token = req.user;
            console.log("File", req.file);
            const userId = Number(token.id);
            const customerId = Number(req.body.customerId);
            let originalName = null;
            let storeDocName = null;
            let status = "PENDING";
            let url;
            const name = req.body.name;
            if (req.file) {
                status = "COMPANY REPLY";
                originalName = req.file.originalname;
                storeDocName = req.file.filename;
                url = `${env_1.default.API_BASEURL}/doc/${storeDocName}`;
            }
            console.log("url", url);
            // const name = req.body.
            const createCustomerTemplateMaster = await this._customerTemplateService.createCustomerTemplateMaster(userId, customerId, name, originalName, storeDocName, url, status);
            // Return the response
            return this.sendJSONResponse(res, "Customer Template.", {
                size: 1,
            }, createCustomerTemplateMaster);
        }
        catch (error) {
            console.log("Error", error);
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getCustomerTemplateMasters(req, res) {
        try {
            const { customerId } = req.query;
            const getCustomerTemplateMasters = await this._customerTemplateService.getCustomerTemplateMasters(Number(customerId));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template Master.", {
                size: getCustomerTemplateMasters.length,
            }, getCustomerTemplateMasters);
        }
        catch (error) {
            console.log("Error", error);
            return this.sendErrorResponse(req, res, error);
        }
    }
    async deleteCustomerTemplateMasterById(req, res) {
        try {
            const { id } = req.query;
            const deleteData = await this._customerTemplateService.deleteCustomerTemplateMasterById(Number(id));
            // Return the response
            return this.sendJSONResponse(res, "Customer Template Master deleted successfully.", {
                size: 1,
            }, deleteData);
        }
        catch (error) {
            console.log("Error", error);
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.CustomerTemplateController = CustomerTemplateController;
//# sourceMappingURL=CustomerTemplateController.js.map