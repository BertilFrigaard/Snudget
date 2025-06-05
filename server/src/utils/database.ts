import { Pool } from "pg";
import { User } from "../types/user";

const pool: Pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 5000,
});

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
