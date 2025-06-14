"use client";

import { UseAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import Loading from "../Sections/Loading/Loading";

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
        return <Loading />;
    }
    if (user && userAccess) {
        return children;
    }
    if (!user && !userAccess) {
        return children;
    }
    redirect(redirectUrl);
}
