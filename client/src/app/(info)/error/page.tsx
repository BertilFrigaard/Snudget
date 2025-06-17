"use client";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ErrorPage() {
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
        <Suspense>
            <SlimSection title="Error" subtitle={error}>
                {""}
            </SlimSection>
        </Suspense>
    );
}
