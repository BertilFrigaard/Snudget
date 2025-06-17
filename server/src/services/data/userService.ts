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
    password_hash: string | null,
    verified: boolean
): Promise<string | null> {
    try {
        const res = await pool.query<User>(
            "INSERT INTO users (username, email, profile_picture, password_hash, verified) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [username, email, profile_picture, password_hash, verified]
        );
        if (res.rowCount !== 1) {
            console.error("Rowcount == " + res.rowCount);
            return null;
        }
        return res.rows[0].id;
    } catch (e: unknown) {
        logError(e);
        return null;
    }
}

export async function verifyUser(user_id: string): Promise<boolean> {
    try {
        await pool.query("UPDATE users SET verified = TRUE WHERE id = $1", [user_id]);
    } catch (e: unknown) {
        logError(e);
        return false;
    }
    return true;
}
