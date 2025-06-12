import { Game } from "../../types/game";
import { pool } from "../../utils/database";

export async function getGamesByUserId(id: string) {
    const res = await pool.query<Game>(
        "SELECT * FROM games WHERE id IN (SELECT game_id FROM players WHERE user_id = $1)",
        [id]
    );
    return res.rows;
}

export async function createGame(
    title: string,
    description: string | null,
    owner_id: string,
    password_hash: string | null,
    ends_at: Date
) {
    const res = await pool.query<{ id: string }>(
        "INSERT INTO games (title, description, owner_id, password_hash, ends_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [title, description, owner_id, password_hash, ends_at]
    );
    return res.rows[0].id;
}

export async function linkGameToUser(game_id: string, user_id: string) {
    const res = await pool.query("INSERT INTO players (game_id, user_id) VALUES ($1, $2)", [game_id, user_id]);
    return true;
}
