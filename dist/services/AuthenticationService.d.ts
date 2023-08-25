import { ILoggerService } from "../interfaces/ILoggerService";
import { IAuthenticationService } from "../interfaces/IAuthenticationService";
import { IJwtService } from "../interfaces/IJwtService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { DoLoginService } from "../types/Auth";
import { User } from "@prisma/client";
export declare class AuthenticationService implements IAuthenticationService {
    private _loggerService;
    private _jwtService;
    private _userRepository;
    constructor(loggerService: ILoggerService, jwtService: IJwtService, userRepository: IUserRepository);
    doLogin(userName: string, password: string): Promise<DoLoginService>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<User>;
}
