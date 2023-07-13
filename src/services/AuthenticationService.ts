import { inject, injectable } from "inversify";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { IJwtService } from "../interfaces/IJwtService";
import { TYPES } from "../config/types";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequest } from "../errors/BadRequest";
import env from "../config/env";
import { DoLoginService } from "../types/Auth";
import { NotFound } from "../errors/NotFound";
import { User } from "@prisma/client";

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

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    const getUser = await this._userRepository.getUserById(userId);

    if (!getUser) {
      throw new NotFound("User not found.");
    }

    if (getUser.password !== oldPassword) {
      throw new BadRequest("Old Password is not valid.");
    }

    const data = {
      userName: getUser.userName,
      salt: getUser.salt,
      password: newPassword,
      firstName: getUser.firstName,
      lastName: getUser.lastName,
    };

    return await this._userRepository.updateUserById(userId, data);
  }
}
