export async function createEntry(game_id: string, score_change: number) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games/" + game_id + "/entries", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score_change: score_change }),
        });

        console.log(await res.json());
    } catch (e) {
        console.warn(e);
    }
}
