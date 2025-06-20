"use client";

import BackButton from "@/components/Buttons/BackButton";
import { useRouter } from "next/navigation";

export default function SlimSection({
    children,
    title,
    subtitle,
    link,
}: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    link?: string;
}) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
                {/* Header */}
                <div className="flex gap-2 items-center justify-center mb-8">
                    <button
                        onClick={() => {
                            if (link) {
                                router.replace(link);
                            } else {
                                router.back();
                            }
                        }}
                        className="mr-3 text-gray-500 hover:text-primary transition"
                        aria-label="Go back"
                    >
                        <BackButton />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 text-center">{title}</h1>
                </div>
                <p className="text-gray-500 text-center mb-8">{subtitle}</p>

                {children}
            </div>
        </div>
    );
}
