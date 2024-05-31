"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const sendEmail = async (options) => {
    const { to, subject, html } = options;
    const transporter = (0, nodemailer_1.createTransport)({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const mailOptions = {
        from: `${process.env.FROM_EMAIL} <${process.env.FROM_NAME}>`,
        to,
        subject,
        html,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map