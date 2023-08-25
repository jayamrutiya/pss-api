"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const env_1 = __importDefault(require("../config/env"));
const types_1 = require("../config/types");
const container_1 = require("../config/container");
const Unauthorized_1 = require("../errors/Unauthorized");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env_1.default.ACCESS_TOKEN_SECRET,
};
const databaseService = container_1.iocContainer.get(types_1.TYPES.DatabaseService);
passport_1.default.use(new passport_jwt_1.Strategy(options, async (payload, done) => {
    // Get database client
    const client = databaseService.Client();
    const getUser = await client.user.findFirst({
        where: {
            id: payload.id,
        },
    });
    if (!getUser) {
        return done(new Unauthorized_1.Unauthorized("Unauthorized"), null);
    }
    return done(null, payload);
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map