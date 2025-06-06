"use client";
import { UseAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function LogoutPage() {
    const { logout } = UseAuthContext();
    useEffect(() => {
        logout().then(redirect("/"));
    }, [logout]);
    return (
        <div className="min-h-screen justify-items-center">
            <h1>Logging out</h1>
        </div>
    );
}

export default LogoutPage;
