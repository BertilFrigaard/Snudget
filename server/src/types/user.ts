export type User = {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    profile_picture?: string | null;
    created_at: Date;
    last_login?: Date | null;
};
