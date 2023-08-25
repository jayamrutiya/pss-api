"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
class TestController extends BaseController_1.default {
    constructor(loggerService, testService) {
        super();
        this._loggerService = loggerService;
        this._testService = testService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async getTestData(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            // get parameters
            const testParams = req.body.test;
            console.log("req.body.test", req.body.test);
            const test = await this._testService.getTestData(testParams);
            // Return the response
            return this.sendJSONResponse(res, "Test found.", {
                size: 1,
            }, test);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.default = TestController;
//# sourceMappingURL=TestController.js.map