"use client";
import Link from "next/link";

export default function MainSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-12 md:mt-20 max-w-7xl mx-auto">
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-12">
                {/* Logo and Title */}
                <Link className="flex items-center" href={"/"}>
                    <div className="w-4 h-8 bg-primary rounded mr-3"></div>
                    <h2 className="text-primary font-bold text-3xl">Snudget</h2>
                </Link>

                {/* TODO On mobile make dropdown instead */}
                <div className="flex gap-8 items-center">
                    <Link className="cta-btn-none" href="/dashboard">
                        Dashboard
                    </Link>
                    {/* <Link className="cta-btn-none" href="/profile">
                        Profile
                    </Link> */}
                    <Link className="cta-btn-none" href="/logout">
                        Log out
                    </Link>
                </div>
            </div>

            {children}
        </div>
    );
}
