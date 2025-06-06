"use client";

import type { AuthContext } from "@/types/authContext";
import { ErrorResponse } from "@/types/errorResponse";
import { RedactedUser } from "@/types/redactedUser";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContext>({
    error: "",
    user: null,
    loading: true,
    login: async () => {},
    updateUser: async () => {},
    logout: async () => {},
});

export function UseAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<null | RedactedUser>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const updateUser = useCallback(async () => {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/users/me", {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();
        if (!json) {
            setError("Something went wrong while decoding json");
            setLoading(false);
            return false;
        }
        if (res.status !== 200) {
            setError((json as ErrorResponse).error);
            setLoading(false);
            return false;
        }

        setError("");
        setUser(json as RedactedUser);
        setLoading(false);
        return true;
    }, []);

    const login = useCallback(async () => {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/status", {
            credentials: "include",
        });
        const json = await res.json();
        if (!json) {
            setError("Something went wrong while decoding json");
            setLoading(false);
            return false;
        }
        if (res.status !== 200) {
            setError((json as ErrorResponse).error);
            setLoading(false);
            return false;
        }
        if ((json as { logged_in: boolean }).logged_in) {
            setError("");
            return updateUser();
        } else {
            setLoading(false);
            return false;
        }
    }, [updateUser]);

    const logout = async () => {
        setLoading(true);
        await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
        setError("");
        setLoading(false);
    };

    useEffect(() => {
        login();
    }, [login]);

    return (
        <AuthContext.Provider value={{ error, user, loading, updateUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
