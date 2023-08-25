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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const BadRequest_1 = require("../errors/BadRequest");
const env_1 = __importDefault(require("../config/env"));
const NotFound_1 = require("../errors/NotFound");
let AuthenticationService = class AuthenticationService {
    constructor(loggerService, jwtService, userRepository) {
        this._loggerService = loggerService;
        this._jwtService = jwtService;
        this._userRepository = userRepository;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async doLogin(userName, password) {
        const getUser = await this._userRepository.getUserByUserName(userName);
        if (!getUser || getUser.password !== password) {
            throw new BadRequest_1.BadRequest("UserName or Password not valid.");
        }
        const data = {
            id: getUser.id,
            firstName: getUser.firstName,
            lastName: getUser.lastName,
        };
        const accessToken = await this._jwtService.generateToken(data, env_1.default.ACCESS_TOKEN_SECRET, env_1.default.ACCESS_TOKEN_EXPIRES_IN);
        const refreshToken = await this._jwtService.generateToken(data, env_1.default.ACCESS_TOKEN_SECRET, env_1.default.ACCESS_TOKEN_EXPIRES_IN);
        await this._userRepository.saveRefreshToken(getUser.id, refreshToken);
        return { accessToken, refreshToken };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const getUser = await this._userRepository.getUserById(userId);
        if (!getUser) {
            throw new NotFound_1.NotFound("User not found.");
        }
        if (getUser.password !== oldPassword) {
            throw new BadRequest_1.BadRequest("Old Password is not valid.");
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
};
AuthenticationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.JwtService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map