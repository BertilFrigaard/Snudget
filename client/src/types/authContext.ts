import { RedactedUser } from "./redactedUser";

export type AuthContext = {
    error: string;
    user: RedactedUser | null;
    loading: boolean;
    login: () => Promise<boolean | void>;
    updateUser: () => Promise<boolean | void>;
    logout: () => Promise<void>;
};
