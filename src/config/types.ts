export const TYPES = {
  // service
  DatabaseService: Symbol("IDatabaseService"),
  LoggerService: Symbol("ILoggerService"),
  TestService: Symbol("ITestService"),
  EmployeeService: Symbol("IEmployeeService"),
  JwtService: Symbol("IJwtService"),
  AuthenticationService: Symbol("IAuthenticationService"),

  // repositories
  TestRepository: Symbol("ITestRepository"),
  EmployeeRepository: Symbol("IEmployeeRepository"),
  UserRepository: Symbol("IUserRepository"),
};
