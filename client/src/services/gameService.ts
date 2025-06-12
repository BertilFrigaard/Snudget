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
