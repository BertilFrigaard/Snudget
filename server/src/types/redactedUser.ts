import { User } from "./user";

export type RedactedUser = Omit<User, "password_hash" | "email">;

export type PartialRedactedUser<T extends keyof RedactedUser> = Pick<RedactedUser, T>;
