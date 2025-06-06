import Link from "next/link";

function Header({ floating, loggedIn }: { floating: boolean; loggedIn: boolean }) {
    return (
        <header className={floating ? "fixed top-0 left-0 w-full z-20" : ""}>
            <div className="flex items-center justify-between bg-black p-2 md:p-4 shadow-lg shadow-gray-800 text-white">
                <Link href={"/"} className="text-xl font-martian-mono font-extralight cursor-pointer">
                    Competition
                </Link>
                <ul className="flex gap-4 md:gap-10 pr-5 text-xl font-extralight">
                    {(!loggedIn && (
                        <>
                            <Link
                                href={"/login"}
                                className="cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200"
                            >
                                Log In
                            </Link>
                            <Link
                                href={"/signup"}
                                className="cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200"
                            >
                                Sign Up
                            </Link>
                        </>
                    )) || (
                        <>
                            <Link
                                href={"/profile"}
                                className="cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200"
                            >
                                Profile
                            </Link>
                            <Link
                                href={"/logout"}
                                className="cursor-pointer hover:-translate-y-0.5 active:scale-110 duration-200"
                            >
                                Log Out
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
