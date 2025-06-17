export async function login(email: string, password: string): Promise<boolean> {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
        return true;
    } else if (res.status !== 401) {
        console.warn("Login failed: " + res.status);
        console.log(await res.json());
    }
    return false;
}

export async function signup(username: string, email: string, password: string): Promise<boolean> {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (res.status === 200) {
        return true;
    } else {
        console.warn("Signup failed: " + res.status);
        console.log(await res.json());
    }
    return false;
}
