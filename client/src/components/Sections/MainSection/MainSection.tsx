"use client";
import { UseAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";

const linksLoggedIn = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Log Out", link: "/logout" },
];
const linksLoggedOut = [
    { title: "Log in", link: "/login" },
    { title: "Sign Up", link: "/signup" },
];

function Links(logged_in: boolean, classes: string, click: () => void) {
    if (logged_in) {
        return linksLoggedIn.map((link, key) => (
            <Link className={classes} onClick={click} href={link.link} key={key}>
                {link.title}
            </Link>
        ));
    } else {
        return linksLoggedOut.map((link, key) => (
            <Link className={classes} onClick={click} href={link.link} key={key}>
                {link.title}
            </Link>
        ));
    }
}

export default function MainSection({ children }: { children: React.ReactNode }) {
    const { user } = UseAuthContext();
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
                    {Links(user !== null, "cta-btn-none", () => {})}
                </div>

                {/* Mobile Menu Button */}
                <button className="sm:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <TiThMenu />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="sm:hidden absolute top-24 right-12 bg-white border shadow-lg rounded-xl z-50 flex flex-col w-40">
                    {Links(user !== null, "px-4 py-3 hover:bg-gray-100", () => setMenuOpen(false))}
                </div>
            )}

            {children}
        </div>
    );
}
