"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_route_1 = __importDefault(require("./swagger.route"));
const test_route_1 = __importDefault(require("./test.route"));
const employee_route_1 = __importDefault(require("./employee.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const template_route_1 = __importDefault(require("./template.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const customer_template_route_1 = __importDefault(require("./customer-template.route"));
exports.default = {
    swaggerRouter: swagger_route_1.default,
    testRouter: test_route_1.default,
    employeeRouter: employee_route_1.default,
    authRouter: auth_route_1.default,
    templateRouter: template_route_1.default,
    customerRouter: customer_route_1.default,
    customerTemplateRouter: customer_template_route_1.default,
};
//# sourceMappingURL=index.js.map