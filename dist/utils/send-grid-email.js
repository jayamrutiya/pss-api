"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithAttachment = exports.sendEmail = void 0;
const fs_1 = __importDefault(require("fs"));
function sendEmail(fromAddress, toAddress, subject, htmlBody) {
    const msg = {
        to: toAddress,
        from: fromAddress,
        subject,
        // text: "and easy to do anywhere, even with Node.js",
        html: htmlBody,
    };
    // Sending email
    // return sgMail.send(msg);
    return true;
}
exports.sendEmail = sendEmail;
function sendEmailWithAttachment(fromAddress, toAddress, subject, htmlBody, pathToAttachment, filename) {
    console.log("pathToAttachment", pathToAttachment);
    const attachment = fs_1.default.readFileSync(pathToAttachment).toString("base64");
    const msg = {
        to: toAddress,
        from: fromAddress,
        subject,
        text: "and easy to do anywhere, even with Node.js",
        attachments: [
            {
                content: attachment,
                filename,
                type: "application/pdf",
                disposition: "attachment",
            },
        ],
    };
    return true;
    // return sgMail.send(msg).catch((error) => {
    //   console.log("ErrorLog", error);
    // });
}
exports.sendEmailWithAttachment = sendEmailWithAttachment;
//# sourceMappingURL=send-grid-email.js.map