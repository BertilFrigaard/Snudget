import { google } from "googleapis";
import crypto from "crypto";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
];

export function getState() {
    return crypto.randomBytes(32).toString("hex");
}

export function getAuthUrl(state: string) {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state: state,
    });
}

export async function getUserData(code: string) {
    try {
        let { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const userinfo = await oauth2.userinfo.get();
        return userinfo.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}
