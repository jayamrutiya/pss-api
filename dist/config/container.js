"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const EmployeeRepository_1 = require("../repositories/EmployeeRepository");
const TestRepository_1 = require("../repositories/TestRepository");
const EmployeeService_1 = require("../services/EmployeeService");
const TestService_1 = require("../services/TestService");
const db_1 = require("./db");
const logger_1 = require("./logger");
const types_1 = require("./types");
const AuthenticationService_1 = require("../services/AuthenticationService");
const JwtService_1 = require("../services/JwtService");
const UserRepository_1 = require("../repositories/UserRepository");
const TemplateService_1 = require("../services/TemplateService");
const TemplateRepository_1 = require("../repositories/TemplateRepository");
const CustomerService_1 = require("../services/CustomerService");
const CustomerRepository_1 = require("../repositories/CustomerRepository");
const CustomerTemplateService_1 = require("../services/CustomerTemplateService");
const CustomerTemplateRepository_1 = require("../repositories/CustomerTemplateRepository");
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
// make inversify aware of inversify-binding-decorat    ors
iocContainer.load((0, inversify_binding_decorators_1.buildProviderModule)());
// services
iocContainer.bind(types_1.TYPES.DatabaseService).to(db_1.DatabaseService);
iocContainer.bind(types_1.TYPES.LoggerService).to(logger_1.LoggerService);
iocContainer.bind(types_1.TYPES.TestService).to(TestService_1.TestService);
iocContainer.bind(types_1.TYPES.EmployeeService).to(EmployeeService_1.EmployeeService);
iocContainer.bind(types_1.TYPES.JwtService).to(JwtService_1.JwtService);
iocContainer
    .bind(types_1.TYPES.AuthenticationService)
    .to(AuthenticationService_1.AuthenticationService);
iocContainer.bind(types_1.TYPES.TemplateService).to(TemplateService_1.TemplateService);
iocContainer.bind(types_1.TYPES.CustomerService).to(CustomerService_1.CustomerService);
iocContainer
    .bind(types_1.TYPES.CustomerTemplateService)
    .to(CustomerTemplateService_1.CustomerTemplateService);
// Repository
iocContainer.bind(types_1.TYPES.TestRepository).to(TestRepository_1.TestRepository);
iocContainer
    .bind(types_1.TYPES.EmployeeRepository)
    .to(EmployeeRepository_1.EmployeeRepository);
iocContainer.bind(types_1.TYPES.UserRepository).to(UserRepository_1.UserRepository);
iocContainer
    .bind(types_1.TYPES.TemplateRepository)
    .to(TemplateRepository_1.TemplateRepository);
iocContainer
    .bind(types_1.TYPES.CustomerRepository)
    .to(CustomerRepository_1.CustomerRepository);
iocContainer
    .bind(types_1.TYPES.CustomerTemplateRepository)
    .to(CustomerTemplateRepository_1.CustomerTemplateRepository);
//# sourceMappingURL=container.js.map