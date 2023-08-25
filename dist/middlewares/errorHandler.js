"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const GeneralError_1 = require("../errors/GeneralError");
function errorHandler(err, req, res, next) {
    // eslint-disable-next-line no-console
    console.warn(`Caught Error for ${req.path}:`, err.message);
    if (err instanceof GeneralError_1.GeneralError) {
        return res.status(err.getCode()).json(err.toJSON());
    }
    return next(err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map