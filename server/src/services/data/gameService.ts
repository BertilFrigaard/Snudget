import { Game } from "../../types/game";
import { RedactedGame } from "../../types/redactedGame";
import { RedactedUser } from "../../types/redactedUser";
import { pool } from "../../utils/database";

export async function getRedactedUsersInGame(id: string) {
    const res = await pool.query<RedactedUser>(
        "SELECT id, username, profile_picture, created_at, last_login FROM users WHERE id IN (SELECT user_id FROM players WHERE game_id = $1)",
        [id]
    );
    return res.rows;
}

export async function getRedactedGamesByUserId(id: string) {
    const res = await pool.query<RedactedGame>(
        "SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id IN (SELECT game_id FROM players WHERE user_id = $1)",
        [id]
    );
    return res.rows;
}

export async function getRedactedGameById(id: string) {
    const res = await pool.query<RedactedGame>(
        "SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id = $1",
        [id]
    );
    return res.rowCount === 1 ? res.rows[0] : null;
}

export async function getGameById(id: string) {
    const res = await pool.query<Game>("SELECT * FROM games WHERE id = $1", [id]);
    return res.rowCount === 1 ? res.rows[0] : null;
}

export async function isGame(id: string) {
    const res = await pool.query("SELECT 1 FROM games WHERE id = $1", [id]);
    return res.rowCount === 1;
}

export async function isUserInGame(user_id: string, game_id: string) {
    const res = await pool.query("SELECT 1 FROM PLAYERS WHERE user_id = $1 AND game_id = $2", [user_id, game_id]);
    return res.rowCount == 1;
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

export async function deleteGame(id: string) {
    const res = await pool.query("DELETE FROM games WHERE id = $1", [id]);
    return true;
}

export async function linkGameToUser(game_id: string, user_id: string) {
    const res = await pool.query("INSERT INTO players (game_id, user_id) VALUES ($1, $2)", [game_id, user_id]);
    return true;
}
