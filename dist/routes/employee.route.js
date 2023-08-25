"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const types_1 = require("../config/types");
const EmployeeController_1 = __importDefault(require("../controllers/EmployeeController"));
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const employeeService = container_1.iocContainer.get(types_1.TYPES.EmployeeService);
const employeeController = new EmployeeController_1.default(loggerService, employeeService);
router.get("/:id", (req, res) => employeeController.getEmployee(req, res));
router.post("/", (req, res) => employeeController.createEmployee(req, res));
router.put("/:id", (req, res) => employeeController.updateEmployee(req, res));
exports.default = router;
//# sourceMappingURL=employee.route.js.map