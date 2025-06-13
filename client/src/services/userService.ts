import { RedactedGame } from "@/types/redactedGame";

export async function getGames(userId: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/users/" + userId + "/games", {
            credentials: "include",
        });
        if (res.status == 200) {
            const games: RedactedGame[] = await res.json();
            return games;
        } else {
            return [];
        }
    } catch (e) {
        console.warn(e);
        return [];
    }
}
