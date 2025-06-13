import { pool } from "../../utils/database";

export async function createEntry(user_id: string, game_id: string, score_change: number) {
    const res = await pool.query("INSERT INTO entries (user_id, game_id, score_change) VALUES ($1, $2, $3)", [
        user_id,
        game_id,
        score_change,
    ]);
    console.log(res);
}
