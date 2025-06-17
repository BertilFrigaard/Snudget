import { pool } from "../../utils/database";
import { logError } from "../../utils/logging";

export async function insertToken(token_hash: string, user_id: string): Promise<boolean> {
    try {
        const res = await pool.query("INSERT INTO email_verification_tokens (token_hash, user_id) VALUES ($1, $2)", [
            token_hash,
            user_id,
        ]);
        return true;
    } catch (e) {
        logError(e);
        return false;
    }
}

export async function deleteToken(user_id: string): Promise<boolean> {
    try {
        const res = await pool.query("DELETE FROM email_verification_tokens WHERE user_id = $1", [user_id]);
        return true;
    } catch (e) {
        logError(e);
        return false;
    }
}

export async function getTokenHashByUserId(user_id: string): Promise<string | null> {
    try {
        const res = await pool.query<{ token_hash: string }>(
            "SELECT token_hash FROM email_verification_tokens WHERE user_id = $1",
            [user_id]
        );
        if (res.rowCount === 1) {
            return res.rows[0].token_hash;
        }
        return null;
    } catch (e) {
        logError(e);
        return null;
    }
}
