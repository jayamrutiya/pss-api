"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const types_1 = require("../config/types");
const CustomerController_1 = require("../controllers/CustomerController");
const passport_1 = __importDefault(require("../middlewares/passport"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const customerService = container_1.iocContainer.get(types_1.TYPES.CustomerService);
const customerController = new CustomerController_1.CustomerController(loggerService, customerService);
router.get("/master", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getAllMasterCustomers(req, res));
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getCustomer(req, res));
router.get("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getCustomers(req, res));
router.post("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.upsertCustomer(req, res));
router.delete("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.deleteCustomer(req, res));
router.post("/master", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.upsertCustomerMaster(req, res));
router.delete("/master", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.deleteCustomerMaster(req, res));
router.post("/master/document", multer_1.uploadDocument.single("file"), passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.createDocument(req, res));
router.get("/master/document", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getAllDocument(req, res));
router.delete("/master/document", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.deleteDocument(req, res));
exports.default = router;
//# sourceMappingURL=customer.route.js.map