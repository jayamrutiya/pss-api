"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../config/types");
const container_1 = require("../config/container");
const TestController_1 = __importDefault(require("../controllers/TestController"));
const get_test_data_validator_1 = __importDefault(require("../validators/get-test-data.validator"));
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const testService = container_1.iocContainer.get(types_1.TYPES.TestService);
const testController = new TestController_1.default(loggerService, testService);
router.post("/", get_test_data_validator_1.default, (req, res) => testController.getTestData(req, res));
exports.default = router;
//# sourceMappingURL=test.route.js.map