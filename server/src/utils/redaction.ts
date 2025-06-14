import { RedactedUser } from "../types/redactedUser";
import { User } from "../types/user";

export function redactUser(user: User): RedactedUser {
    const { password_hash, email, ...redactedUser } = user;
    return redactedUser as RedactedUser;
}
