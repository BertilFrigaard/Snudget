import { Entry } from "@/types/entryTypes";

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

export async function getEntriesOfGame(id: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games/" + id + "/entries", {
            credentials: "include",
        });
        const entries: Entry[] = await res.json();

        return entries;
    } catch (e) {
        console.warn(e);
        return null;
    }
}
