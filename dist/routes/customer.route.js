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
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const customerService = container_1.iocContainer.get(types_1.TYPES.CustomerService);
const customerController = new CustomerController_1.CustomerController(loggerService, customerService);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getCustomer(req, res));
router.get("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.getCustomers(req, res));
router.post("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.upsertCustomer(req, res));
router.delete("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => customerController.deleteCustomer(req, res));
exports.default = router;
//# sourceMappingURL=customer.route.js.map