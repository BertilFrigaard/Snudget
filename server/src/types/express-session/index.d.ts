import "express-session";

declare module "express-session" {
    interface SessionData {
        state?: string;
        user_id?: string | null;
        redirect?: string;
    }
}
