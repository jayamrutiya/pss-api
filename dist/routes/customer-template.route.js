"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const types_1 = require("../config/types");
const CustomerTemplateController_1 = require("../controllers/CustomerTemplateController");
const passport_1 = __importDefault(require("../middlewares/passport"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const customerTemplateService = container_1.iocContainer.get(types_1.TYPES.CustomerTemplateService);
const customerTemplateController = new CustomerTemplateController_1.CustomerTemplateController(loggerService, customerTemplateService);
router.get("/master", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.getCustomerTemplateMasters(req, res);
});
router.get("/dbdump", (req, res) => {
    customerTemplateController.dumpMysqlFile(req, res);
});
router.get("/filter", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.getFiltterTemplate(req, res);
});
router.get("/status", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.getCustomerTemplateStatus(req, res);
});
router.get("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.getCustomerTemplateByTypeAndCustomerId(req, res);
});
router.post("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerTemplateController.createCustomerTemplate(req, res));
router.get("/word", (req, res) => {
    customerTemplateController.createWordFileCustomerTemplate(req, res);
});
router.delete("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.deleteCustomerTemplateById(req, res);
});
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.getCustomerTemplateById(req, res);
});
router.post("/master", multer_1.uploadCompanyReply.single("file"), passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.createCustomerTemplateMaster(req, res);
});
router.delete("/master", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    customerTemplateController.deleteCustomerTemplateMasterById(req, res);
});
exports.default = router;
//# sourceMappingURL=customer-template.route.js.map