import { User } from "../../types/user";
import { pool } from "../../utils/database";

export async function getUserByEmail(email: string) {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!users.rowCount) {
        return null;
    } else if (users.rowCount !== 1) {
        console.warn(`getUserByEmail returned ${users.rowCount} rows. The first user was returned`);
    }
    return users.rows[0] as User;
}

export async function getUserById(id: string) {
    const users = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!users.rowCount) {
        return null;
    } else if (users.rowCount !== 1) {
        console.warn(`getUserById returned ${users.rowCount} rows. The first user was returned`);
    }
    return users.rows[0] as User;
}

export async function insertUser(
    username: string,
    email: string,
    profile_picture: string | null,
    password_hash: string | null
) {
    try {
        await pool.query(
            "INSERT INTO users (username, email, profile_picture, password_hash) VALUES ($1, $2, $3, $4)",
            [username, email, profile_picture, password_hash]
        );
    } catch (e) {
        console.warn(e);
        return false;
    }
    return true;
}
