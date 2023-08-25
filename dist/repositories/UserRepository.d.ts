import { IUserRepository } from "../interfaces/IUserRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { RefreshToken, User } from "@prisma/client";
import { UpdateUserByIdRepo } from "../types/User";
export declare class UserRepository implements IUserRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    getUserByUserName(userName: string): Promise<User | null>;
    saveRefreshToken(userId: number, token: string): Promise<RefreshToken>;
    getUserById(id: number): Promise<User | null>;
    updateUserById(id: number, userData: UpdateUserByIdRepo): Promise<User>;
}
