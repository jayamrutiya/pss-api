import { inject, injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { TYPES } from "../config/types";
import { RefreshToken, User } from "@prisma/client";
import { InternalServerError } from "../errors/InternalServerError";
import { UpdateUserByIdRepo } from "../types/User";

@injectable()
export class UserRepository implements IUserRepository {
  private _loggerService: ILoggerService;
  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      return await client.user.findFirst({
        where: {
          userName,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async saveRefreshToken(userId: number, token: string): Promise<RefreshToken> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      return await client.refreshToken.upsert({
        where: {
          userId,
        },
        update: {
          token,
        },
        create: {
          userId,
          token,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      return await client.user.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateUserById(
    id: number,
    userData: UpdateUserByIdRepo
  ): Promise<User> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const updateUser = await client.user.update({
        where: {
          id,
        },
        data: {
          ...userData,
          updatedAt: new Date(),
        },
      });

      return updateUser;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }
}
