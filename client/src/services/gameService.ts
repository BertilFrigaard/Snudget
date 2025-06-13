import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";

export async function createGame(title: string, description: string | null, password: string | null, date: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, description: description, password: password, date: date }),
        });

        console.log(await res.json());
    } catch (e) {
        console.warn(e);
    }
}

export async function getGameById(id: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games/" + id, {
            credentials: "include",
        });
        const game: RedactedGame = await res.json();

        return game;
    } catch (e) {
        console.warn(e);
        return null;
    }
}

export async function getPlayersInGame(id: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games/" + id + "/players", {
            credentials: "include",
        });
        const players: RedactedUser[] = await res.json();

        return players;
    } catch (e) {
        console.warn(e);
        return null;
    }
}

export async function deleteGame(id: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/games/" + id, {
            method: "DELETE",
            credentials: "include",
        });

        return res.status == 200;
    } catch (e) {
        console.warn(e);
        return false;
    }
}
