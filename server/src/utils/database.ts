import { Pool } from "pg";

if (
    !process.env.PGUSER ||
    !process.env.PGPASSWORD ||
    !process.env.PGHOST ||
    !process.env.PGPORT ||
    !process.env.PGDATABASE
) {
    throw new Error("PostgreSQL enviroment variables not set");
}

export const pool: Pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 5000,
    //TODO look into ssl
});
