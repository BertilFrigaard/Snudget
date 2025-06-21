"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const logging_1 = require("../../utils/logging");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function sendVerifyLink(token, user_id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifyLink = process.env.AUTH_VERIFY_URL + "?token=" + token + "&user_id=" + user_id;
        if (process.env.EMAIL_VERIFY_REDIRECT) {
            email = process.env.EMAIL_VERIFY_REDIRECT;
        }
        try {
            yield transporter.sendMail({
                from: `"Comp Social" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Verify your Snudget account",
                html: `
            <h>Welcome to Snudget</h>
            <p>Click <a href="${verifyLink}">here</a> to verify your account</p>
            `,
            });
            return true;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.sendVerifyLink = sendVerifyLink;
