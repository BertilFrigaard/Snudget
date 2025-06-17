"use client";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { UseAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function LogoutPage() {
    const { logout } = UseAuthContext();
    useEffect(() => {
        logout().then(redirect("/"));
    }, [logout]);
    return (
        <SlimSection title="Logging out..." subtitle="Please wait for the logout process to finish">
            {""}
        </SlimSection>
    );
}

export default LogoutPage;
