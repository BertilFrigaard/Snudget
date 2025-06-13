"use client";
import { UseAuthContext } from "@/contexts/AuthContext";
import { createEntry } from "@/services/entryService";
import { getGames } from "@/services/userService";
import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function DashboardPage() {
    const { user } = UseAuthContext();
    const [games, setGames] = useState<null | RedactedGame[]>(null);

    const [scoreChange, setScoreChange] = useState(0);
    const [selectGameId, setSelectGameId] = useState("");

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

    const entryFormSubmitted = async (e: FormEvent) => {
        e.preventDefault();
        if (scoreChange <= 0) {
            console.log("Score change must be larger than 0");
            return;
        }
        if (selectGameId.length == 0) {
            console.log("Please select a game");
            return;
        }

        setScoreChange(0);
        setSelectGameId("");

        createEntry(selectGameId, scoreChange);
    };

    if (!user) {
        return <h1>Could not retrieve user information</h1>;
    }
    return (
        <>
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
                    <form className="mt-10 grid space-y-2" onSubmit={entryFormSubmitted}>
                        <h2 className="text-center font-bold">Make entry</h2>
                        <input
                            type="number"
                            value={scoreChange}
                            onChange={(e) => {
                                setScoreChange(Number(e.target.value));
                            }}
                            className="bg-white rounded"
                        />
                        <select
                            name=""
                            id=""
                            value={selectGameId}
                            onChange={(e) => {
                                setSelectGameId(e.target.value);
                            }}
                            className="bg-white rounded"
                        >
                            <option value="" disabled>
                                Select Game
                            </option>
                            {games &&
                                games.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                        </select>
                        <button type="submit" className="bg-white rounded mx-10 cursor-pointer">
                            Submit
                        </button>
                    </form>
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
                    ) : games.length === 0 ? (
                        <div className="py-10 bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow transition">
                            <h2 className="text-lg font-semibold text-gray-900">No games</h2>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {games.map((game) => (
                                <li
                                    key={game.id}
                                    className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow transition cursor-pointer hover:scale-103"
                                    onClick={() => {
                                        redirect("/games/view/" + game.id);
                                    }}
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
        </>
    );
}

export default DashboardPage;
