import nodemailer, { Transporter } from "nodemailer";
import { logError } from "../../utils/logging";

const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendVerifyLink(token: string, user_id: string, email: string) {
    const verifyLink = process.env.AUTH_VERIFY_URL + "?token=" + token + "&user_id=" + user_id;
    if (process.env.EMAIL_VERIFY_REDIRECT) {
        email = process.env.EMAIL_VERIFY_REDIRECT;
    }
    try {
        await transporter.sendMail({
            from: `"Comp Social" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your Snudget account",
            html: `
            <h>Welcome to Snudget</h>
            <p>Click <a href="${verifyLink}">here</a> to verify your account</p>
            `,
        });

        return true;
    } catch (e) {
        logError(e);
        return false;
    }
}
