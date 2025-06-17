"use client";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ErrorPageContent() {
    const searchParams = useSearchParams();
    const [error, setError] = useState("");

    useEffect(() => {
        const error = searchParams.get("error");
        if (!error) {
            redirect("/");
        } else {
            setError(error);
        }
    }, [searchParams]);
    return (
        <SlimSection title="Error" subtitle={error}>
            {""}
        </SlimSection>
    );
}

export default function ErrorPage() {
    return (
        <Suspense>
            <ErrorPageContent />
        </Suspense>
    );
}
