"use client";
import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import { UseAuthContext } from "@/contexts/AuthContext";
import { getGames } from "@/services/userService";
import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardPage() {
    const { user } = UseAuthContext();
    const [games, setGames] = useState<null | RedactedGame[]>(null);

    useEffect(() => {
        const updateGames = async (user: RedactedUser) => {
            setGames(await getGames(user.id));
        };
        if (user) {
            updateGames(user);
        } else {
            setGames([]);
        }
    }, [user]);

    if (!user) {
        return (
            <PrivateRoute>
                <h1>Could not retrieve user information</h1>
            </PrivateRoute>
        );
    }
    return (
        <PrivateRoute>
            <div className="flex flex-col md:flex-row gap-8 px-4 py-8 md:px-10 md:py-12 min-h-[60vh]">
                {/* Profile Section */}
                <aside className="bg-primary flex flex-col items-center rounded-2xl shadow-lg p-6 w-full md:w-1/3 max-w-xs mx-auto md:mx-0">
                    <div className="relative w-[120px] h-[120px]">
                        <Image
                            className="rounded-full border-4 border-white shadow-md object-cover aspect-square"
                            alt={"profile picture"}
                            src={user.profile_picture || "https://lh3.googleusercontent.com/a/"}
                            width={120}
                            height={120}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.style.display = "none";
                                const fallback = document.getElementById("profile-fallback");
                                if (fallback) fallback.style.display = "flex";
                            }}
                            style={{ objectFit: "cover", width: "100%", height: "100%", aspectRatio: "1 / 1" }}
                        />
                        <div
                            id="profile-fallback"
                            className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-white shadow-md bg-gray-200 text-4xl font-bold text-gray-600"
                            style={{ display: "none" }}
                        >
                            {user.username.slice(0, 1).toUpperCase()}
                        </div>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">{user.username}</h2>
                    {/* Add more profile info here if needed */}
                </aside>

                {/* Games Section */}
                <section className="flex-1 bg-white rounded-2xl shadow-lg p-6">
                    <div className="gap-5 space-x-5">
                        <h1 className="inline-block text-2xl font-bold mb-6 text-gray-800">Mine Spil</h1>
                        <button
                            onClick={() => {
                                redirect("/games/create");
                            }}
                            className="bg-primary rounded-full px-5 py-1 hover:scale-105 duration-200 cursor-pointer"
                        >
                            Opret
                        </button>
                        <button
                            onClick={() => {
                                redirect("/games/join");
                            }}
                            className="border-primary border-2 rounded-full px-5 py-1 hover:scale-105 duration-200 cursor-pointer"
                        >
                            Tilslut
                        </button>
                    </div>
                    {games === null ? (
                        <div className="space-y-4">
                            <h2>Loading</h2>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {games.map((game) => (
                                <li
                                    key={game.id}
                                    className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow transition"
                                >
                                    <h2 className="text-lg font-semibold text-gray-900">{game.title}</h2>
                                    <h3 className="text-sm text-primary font-bold">2. plads</h3>
                                    <p className="text-gray-700">
                                        {game.description ? game.description : "No description"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </PrivateRoute>
    );
}

export default DashboardPage;
