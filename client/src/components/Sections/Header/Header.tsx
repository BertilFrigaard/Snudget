"use client";
import { UseAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

function Header() {
    const { user, loading } = UseAuthContext();
    return (
        <>
            <div className="h-7 md:h-15"></div>
            <header className="fixed top-0 left-0 w-full z-20">
                <div className="flex items-center justify-between bg-black p-2 md:p-4 text-white">
                    <Link
                        href={user ? "/dashboard" : ""}
                        className={
                            "text-xl font-martian-mono font-extralight cursor-pointer" +
                            (loading ? " pointer-events-none" : "")
                        }
                    >
                        Competition
                    </Link>
                    <ul className="flex gap-4 md:gap-10 pr-5 text-xl font-extralight">
                        {(!user && (
                            <>
                                <Link
                                    href={"/login"}
                                    className={
                                        "cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200" +
                                        (loading ? " pointer-events-none" : "")
                                    }
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={"/signup"}
                                    className={
                                        "cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200" +
                                        (loading ? " pointer-events-none" : "")
                                    }
                                >
                                    Sign Up
                                </Link>
                            </>
                        )) || (
                            <>
                                <Link
                                    href={"/dashboard"}
                                    className={
                                        "cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200" +
                                        (loading ? " pointer-events-none" : "")
                                    }
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={"/logout"}
                                    className={
                                        "cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200" +
                                        (loading ? " pointer-events-none" : "")
                                    }
                                >
                                    Log Out
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
                <div className="bg-gray-800 h-0.5"></div>
            </header>
        </>
    );
}

export default Header;
