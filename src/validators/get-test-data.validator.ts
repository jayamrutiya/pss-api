import { checkSchema } from "express-validator";

const getTestDataValidator = checkSchema({
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
export default getTestDataValidator;
