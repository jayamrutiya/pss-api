import { iocContainer as Container } from "../config/container";
import ENV from "../config/env";
import { TYPES } from "../config/types";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { sendEmail } from "../utils/send-grid-email";

export async function setResetPasswordSubscriber(args: any) {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  const databaseService = Container.get<IDatabaseService>(
    TYPES.DatabaseService
  );

  // Connecting to database

  const client = databaseService.Client();

  const subject = "Reset Password";
  const html1 = "";

  // const html = `Please <a href="${ENV.NRG_FRONTED_URL}${ENV.RESET_PASSWORD_URL}?userId=${args.userId}&nonce=${args.nonce}">Click</a> here to reset your password.`;

  try {
    // Sending email for reset password
    const email = await sendEmail(
      "info@gmail.com",
      args.emailId,
      subject,
      html1
    );

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
  } catch (error) {
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
