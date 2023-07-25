export const TYPES = {
  // service
  DatabaseService: Symbol("IDatabaseService"),
  LoggerService: Symbol("ILoggerService"),
  TestService: Symbol("ITestService"),
  EmployeeService: Symbol("IEmployeeService"),
  JwtService: Symbol("IJwtService"),
  AuthenticationService: Symbol("IAuthenticationService"),
  TemplateService: Symbol("ITemplateService"),
  CustomerService: Symbol("ICustomerService"),
  CustomerTemplateService: Symbol("IcustomerTemplateService"),

  // repositories
  TestRepository: Symbol("ITestRepository"),
  EmployeeRepository: Symbol("IEmployeeRepository"),
  UserRepository: Symbol("IUserRepository"),
  TemplateRepository: Symbol("ITemplateRepository"),
  CustomerRepository: Symbol("ICustomerRepository"),
  CustomerTemplateRepository: Symbol("ICustomerTemplateRepository"),
};
