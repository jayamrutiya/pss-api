"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResetPasswordSubscriber = void 0;
const container_1 = require("../config/container");
const types_1 = require("../config/types");
const send_grid_email_1 = require("../utils/send-grid-email");
async function setResetPasswordSubscriber(args) {
    const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
    const databaseService = container_1.iocContainer.get(types_1.TYPES.DatabaseService);
    // Connecting to database
    const client = databaseService.Client();
    const subject = "Reset Password";
    const html1 = "";
    // const html = `Please <a href="${ENV.NRG_FRONTED_URL}${ENV.RESET_PASSWORD_URL}?userId=${args.userId}&nonce=${args.nonce}">Click</a> here to reset your password.`;
    try {
        // Sending email for reset password
        const email = await (0, send_grid_email_1.sendEmail)("info@gmail.com", args.emailId, subject, html1);
        // add email logs in db
        // await client.email.create({
        //   data: {
        //     address: args.emailId,
        //     content: html1,
        //     status: "SUCCESS",
        //     subject,
        //     createdAt: "",
        //   },
        // });
    }
    catch (error) {
        // add email logs in db
        // await client.email.create({
        //   data: {
        //     address: args.emailId,
        //     content: html1,
        //     subject,
        //     error: error.message,
        //     status: "FAILED",
        //     createdAt: "",
        //   },
        // });
        await databaseService.disconnect();
        loggerService
            .getLogger()
            .error(`Sending blood report appointment status email failed. ${error}`);
    }
}
exports.setResetPasswordSubscriber = setResetPasswordSubscriber;
//# sourceMappingURL=set-reset-password.subscriber.js.map