"use client";
import Link from "next/link";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";

export default function MainSection({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-2xl p-12 md:mt-20 max-w-7xl mx-auto relative">
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-12">
                {/* Logo and Title */}
                <Link className="flex items-center" href="/">
                    <div className="w-4 h-8 bg-primary rounded mr-3"></div>
                    <h2 className="text-primary font-bold text-3xl">Snudget</h2>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex gap-8 items-center">
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

                {/* Mobile Menu Button */}
                <button className="sm:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <TiThMenu />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="sm:hidden absolute top-24 right-12 bg-white border shadow-lg rounded-xl z-50 flex flex-col w-40">
                    <Link
                        href="/dashboard"
                        className="px-4 py-3 border-b hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    {/* <Link
                        href="/profile"
                        className="px-4 py-3 border-b hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                    >
                        Profile
                    </Link> */}
                    <Link href="/logout" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                        Log out
                    </Link>
                </div>
            )}

            {children}
        </div>
    );
}
