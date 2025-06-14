export type Entry = {
    id: string;
    game_id: string;
    user_id: string;
    created_at: Date;
    score_change: number;
};

export type SemiFormattedEntry = { id: string; name: string; amount: number; date: string };

export type EntryLinePoint = { [key: string]: number | string };
