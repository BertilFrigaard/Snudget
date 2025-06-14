import { User } from "../../types/user";
import { pool } from "../../utils/database";
import { logError } from "../../utils/logging";

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const users = await pool.query<User>("SELECT * FROM users WHERE email = $1", [email]);

        if (!users.rowCount) {
            return null;
        }

        if (users.rowCount > 1) {
            console.error("SELECT query returned multiple users. Returned null for safety");
            return null;
        }

        return users.rows[0];
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const users = await pool.query<User>("SELECT * FROM users WHERE id = $1", [id]);

        if (!users.rowCount) {
            return null;
        }

        if (users.rowCount > 1) {
            console.error("SELECT query returned multiple users. Returned null for safety");
            return null;
        }

        return users.rows[0];
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function insertUser(
    username: string,
    email: string,
    profile_picture: string | null,
    password_hash: string | null
): Promise<boolean> {
    try {
        await pool.query(
            "INSERT INTO users (username, email, profile_picture, password_hash) VALUES ($1, $2, $3, $4)",
            [username, email, profile_picture, password_hash]
        );
    } catch (e: unknown) {
        logError(e);
        return false;
    }
    return true;
}
