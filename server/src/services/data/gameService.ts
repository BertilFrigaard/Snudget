import { Game } from "../../types/game";
import { RedactedGame } from "../../types/redactedGame";
import { RedactedUser } from "../../types/redactedUser";
import { pool } from "../../utils/database";
import { logError } from "../../utils/logging";

export async function getRedactedUsersInGame(id: string): Promise<RedactedUser[] | null> {
    try {
        const res = await pool.query<RedactedUser>(
            "SELECT id, username, profile_picture, created_at, last_login FROM users WHERE id IN (SELECT user_id FROM players WHERE game_id = $1)",
            [id]
        );
        return res.rows;
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function getRedactedGamesByUserId(id: string): Promise<RedactedGame[] | null> {
    try {
        const res = await pool.query<RedactedGame>(
            "SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id IN (SELECT game_id FROM players WHERE user_id = $1)",
            [id]
        );
        return res.rows;
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function getRedactedGameById(id: string): Promise<RedactedGame | null> {
    try {
        const res = await pool.query<RedactedGame>(
            "SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id = $1",
            [id]
        );

        if (!res.rowCount) {
            return null;
        }

        if (res.rowCount > 1) {
            console.error("SELECT query returned multiple games. Returned null for safety");
            return null;
        }

        return res.rows[0];
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function getGameById(id: string): Promise<Game | null> {
    try {
        const res = await pool.query<Game>("SELECT * FROM games WHERE id = $1", [id]);

        if (!res.rowCount) {
            return null;
        }

        if (res.rowCount > 1) {
            console.error("SELECT query returned multiple games. Returned null for safety");
            return null;
        }

        return res.rows[0];
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function isGame(id: string): Promise<boolean> {
    try {
        const res = await pool.query("SELECT 1 FROM games WHERE id = $1", [id]);
        return res.rowCount === 1;
    } catch (e: unknown) {
        logError(e);
        return false;
    }
}

export async function isUserInGame(user_id: string, game_id: string): Promise<boolean> {
    try {
        const res = await pool.query("SELECT 1 FROM PLAYERS WHERE user_id = $1 AND game_id = $2", [user_id, game_id]);
        return res.rowCount === 1;
    } catch (e: unknown) {
        logError(e);
        return false;
    }
}

export async function createGame(
    title: string,
    description: string | null,
    owner_id: string,
    password_hash: string | null,
    ends_at: Date
): Promise<string | null> {
    try {
        const res = await pool.query<{ id: string }>(
            "INSERT INTO games (title, description, owner_id, password_hash, ends_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [title, description, owner_id, password_hash, ends_at]
        );
        return res.rows[0].id;
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function deleteGame(id: string): Promise<boolean> {
    try {
        const res = await pool.query("DELETE FROM games WHERE id = $1", [id]);
        return res.rowCount === 1;
    } catch (e: unknown) {
        logError(e);
        return false;
    }
}

export async function linkGameToUser(game_id: string, user_id: string): Promise<boolean> {
    try {
        await pool.query("INSERT INTO players (game_id, user_id) VALUES ($1, $2)", [game_id, user_id]);
        return true;
    } catch (e: unknown) {
        logError(e);
        return false;
    }
}
