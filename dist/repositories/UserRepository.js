"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const InternalServerError_1 = require("../errors/InternalServerError");
let UserRepository = class UserRepository {
    constructor(loggerService, databaseService) {
        this._loggerService = loggerService;
        this._databaseService = databaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async getUserByUserName(userName) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            return await client.user.findFirst({
                where: {
                    userName,
                },
            });
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async saveRefreshToken(userId, token) {
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
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async getUserById(id) {
        try {
            // Get the database client
            const client = this._databaseService.Client();
            return await client.user.findFirst({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
    async updateUserById(id, userData) {
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
        }
        catch (error) {
            this._loggerService.getLogger().error(`Error ${error}`);
            throw new InternalServerError_1.InternalServerError("An error occurred while interacting with the database.");
        }
        finally {
            // await this._databaseService.disconnect();
        }
    }
};
UserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map