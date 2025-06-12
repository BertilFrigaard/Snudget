export type Game = {
    id: string;
    owner_id: string;
    title: string;
    description?: string | null;
    password_hash?: string | null;
    created_at: Date;
    ends_at: Date;
};

export type PartialGame<T extends keyof Game> = Pick<Game, T>;
