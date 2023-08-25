"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const BaseController_1 = __importDefault(require("./BaseController"));
class AuthenticationController extends BaseController_1.default {
    constructor(loggerService, authenticationService) {
        super();
        this._loggerService = loggerService;
        this._authenticationService = authenticationService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async doLogin(req, res) {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) {
                throw new BadRequest_1.BadRequest("Invalid argument passed.");
            }
            const verifiedLogin = await this._authenticationService.doLogin(userName, password);
            // send response
            return this.sendJSONResponse(res, "Logged in successfully!", { size: 1 }, verifiedLogin);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                throw new BadRequest_1.BadRequest("Invalid argument passed.");
            }
            const token = req.user;
            const changePassword = await this._authenticationService.changePassword(token.id, oldPassword, newPassword);
            // send response
            return this.sendJSONResponse(res, "Password changed successfully!", { size: 1 }, changePassword);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map