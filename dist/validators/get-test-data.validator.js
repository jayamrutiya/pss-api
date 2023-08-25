"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const getTestDataValidator = (0, express_validator_1.checkSchema)({
    test: {
        in: "body",
        exists: {
            errorMessage: "Test is required.",
        },
        notEmpty: {
            errorMessage: "Test cannot be empty.",
        },
        isString: {
            errorMessage: "Test must be string.",
        },
    },
});
exports.default = getTestDataValidator;
//# sourceMappingURL=get-test-data.validator.js.map