import { inject, injectable } from "inversify";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { IJwtService } from "../interfaces/IJwtService";
import { TYPES } from "../config/types";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequest } from "../errors/BadRequest";
import env from "../config/env";
import { DoLoginService } from "../types/Auth";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private _loggerService: ILoggerService;

  private _jwtService: IJwtService;

  private _userRepository: IUserRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.JwtService) jwtService: IJwtService,
    @inject(TYPES.UserRepository) userRepository: IUserRepository
  ) {
    this._loggerService = loggerService;
    this._jwtService = jwtService;
    this._userRepository = userRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async doLogin(userName: string, password: string): Promise<DoLoginService> {
    const getUser = await this._userRepository.getUserByUserName(userName);

    if (!getUser || getUser.password !== password) {
      throw new BadRequest("UserName or Password not valid.");
    }

    const data = {
      id: getUser.id,
      firstName: getUser.firstName,
      lastName: getUser.lastName,
    };

    const accessToken = await this._jwtService.generateToken(
      data,
      env.ACCESS_TOKEN_SECRET!,
      env.ACCESS_TOKEN_EXPIRES_IN!
    );

    const refreshToken = await this._jwtService.generateToken(
      data,
      env.ACCESS_TOKEN_SECRET!,
      env.ACCESS_TOKEN_EXPIRES_IN!
    );

    await this._userRepository.saveRefreshToken(getUser.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
