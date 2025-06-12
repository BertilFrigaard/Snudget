export type User = {
    id: string;
    username: string;
    email: string;
    password_hash?: string | null;
    profile_picture?: string | null;
    created_at: Date;
    last_login?: Date | null;
};

export type PartialUser<T extends keyof User> = Pick<User, T>;
