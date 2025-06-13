"use client";
import { FaPaperPlane } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { getEntriesOfGame } from "@/services/entryService";
import { deleteGame, getGameById, getPlayersInGame } from "@/services/gameService";
import { Entry } from "@/types/entry";
import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UseAuthContext } from "@/contexts/AuthContext";

function ViewGamePage() {
    const params = useParams<{ id: string }>();
    const { user } = UseAuthContext();
    const [error, setError] = useState<string | null>(null);
    const [game, setGame] = useState<RedactedGame | undefined>(undefined);
    const [players, setPlayers] = useState<RedactedUser[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        getGameById(params.id).then((game) => {
            if (game !== null) {
                setGame(game);
            } else {
                setError("Couldn't fetch game");
            }
        });

        getPlayersInGame(params.id).then((players) => {
            if (players !== null) {
                setPlayers(players);
            } else {
                setError("Couldn't fetch playesr");
            }
        });

        getEntriesOfGame(params.id).then((entries) => {
            if (entries !== null) {
                setEntries(entries);
            } else {
                setError("Couldn't fetch entries");
            }
        });
    }, [params]);

    const inviteClick = () => {
        const link = "http://localhost:3001/games/" + game?.id + "/join";
        navigator.clipboard.writeText(link);
    };

    const deleteClick = async () => {
        await deleteGame(params.id);
        redirect("/dashboard");
    };

    const scoreboard = players
        .map((player) => {
            const total = entries.filter((e) => e.user_id === player.id).reduce((sum, e) => sum + e.score_change, 0);
            return { player, total };
        })
        .sort((a, b) => b.total - a.total);

    return (
        <div className="px-4 py-8 space-y-8 max-w-3xl mx-auto">
            {error !== null && (
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">An error occured</h1>
                    <h2 className="text-red-600">{error}</h2>
                </div>
            )}
            {error === null && game === undefined && (
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Fetching game</h1>
                    <h2 className="text-gray-600">{params.id}</h2>
                </div>
            )}
            {error === null && game !== undefined && (
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                            <h2 className="text-primary font-bold">
                                Ends {new Date(game.ends_at).getMonth()}/{new Date(game.ends_at).getDate()}
                            </h2>
                            <p className="text-gray-700">{game.description || "No description"}</p>
                        </div>
                        <div className="grid gap-2">
                            <button
                                onClick={inviteClick}
                                className="text-white bg-primary font-extrabold tracking-wide rounded px-5 py-1 cursor-pointer hover:scale-105 duration-100"
                            >
                                Invite <FaPaperPlane className="inline" />
                            </button>
                            {game.owner_id === user?.id && (
                                <button
                                    onClick={deleteClick}
                                    className="text-white bg-error font-extrabold tracking-wide rounded px-5 py-1 cursor-pointer hover:scale-105 duration-100"
                                >
                                    Delete <MdDelete className="inline" />
                                </button>
                            )}
                        </div>
                    </div>

                    <section className="bg-primary rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
                        {scoreboard.length === 0 ? (
                            <p>No players</p>
                        ) : (
                            <ol className="space-y-2">
                                {scoreboard.map(({ player, total }, idx) => (
                                    <li key={player.id} className="flex justify-between bg-white rounded px-4 py-2">
                                        <span>
                                            {idx + 1}. {player.username}
                                        </span>
                                        <span className="font-bold">{total}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </section>

                    <section className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Entries</h2>
                        {entries.length === 0 ? (
                            <p>No entries</p>
                        ) : (
                            <ul className="space-y-2">
                                {entries.map((entry) => (
                                    <li key={entry.id} className="flex justify-between border-b last:border-b-0 pb-2">
                                        <span>
                                            {players.find((p) => p.id === entry.user_id)?.username || entry.user_id}
                                        </span>
                                        <span className="font-medium">
                                            {entry.score_change > 0 ? "+" : ""}
                                            {entry.score_change}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(entry.created_at).toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}

export default ViewGamePage;
