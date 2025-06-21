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
const googleapis_1 = require("googleapis");
const crypto_1 = __importDefault(require("crypto"));
const logging_1 = require("../../utils/logging");
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URL) {
    throw new Error("Google authentication enviroment variables not set");
}
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
];
function getState() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
exports.getState = getState;
function getAuthUrl(state) {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state: state,
    });
}
exports.getAuthUrl = getAuthUrl;
function getUserData(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { tokens } = yield oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            const oauth2 = googleapis_1.google.oauth2({ version: "v2", auth: oauth2Client });
            const userinfo = yield oauth2.userinfo.get();
            return userinfo.data;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getUserData = getUserData;
