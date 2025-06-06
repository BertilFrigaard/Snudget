"use client";

import { UseAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export function PrivateRoute({
    children,
    redirectUrl = "/login",
    userAccess = true,
}: Readonly<{
    children: React.ReactNode;
    redirectUrl?: string;
    userAccess?: boolean;
}>) {
    const { user, loading } = UseAuthContext();
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (user && userAccess) {
        return children;
    }
    if (!user && !userAccess) {
        return children;
    }
    redirect(redirectUrl);
}
