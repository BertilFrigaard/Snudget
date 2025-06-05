import { Client } from "pg";

const client: Client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
});

async function openClient() {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

async function closeClient() {
    try {
        await client.end();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

export { openClient, closeClient };
