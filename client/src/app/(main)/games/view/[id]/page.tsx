"use client";
import { FaPaperPlane } from "react-icons/fa6";
import { MdDelete, MdDoorFront } from "react-icons/md";
import { getEntriesOfGame } from "@/services/entryService";
import { deleteGame, getGameById, getPlayersInGame } from "@/services/gameService";
import CustomLineChart from "@/components/Charts/CustomLineChart";
import { Entry } from "@/types/entry";
import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UseAuthContext } from "@/contexts/AuthContext";
import MainSection from "@/components/Sections/MainSection/MainSection";
import Loading from "@/components/Sections/Loading/Loading";
import { formatDate } from "@/utils/formatUtils";

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

    const leaveClick = async () => {
        throw new Error("Not implemented");
    };

    const scoreboard = players
        .map((player) => {
            const total = entries.filter((e) => e.user_id === player.id).reduce((sum, e) => sum + e.score_change, 0);
            return { player, total };
        })
        .sort((a, b) => b.total - a.total);

    if (error) {
        // TODO handle error
        return <h1>error</h1>;
    }

    if (!game) {
        return <Loading />;
    }

    return (
        <MainSection>
            {/* Header: Game Title + Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                    <h2 className="text-primary font-semibold text-lg mb-1">
                        Ends {formatDate(new Date(game.ends_at))}
                    </h2>
                    <p className="text-gray-700">{game.description || "No description provided."}</p>
                </div>

                <div className="flex md:flex-col gap-2 items-start md:items-end">
                    <button onClick={inviteClick} className="cta-btn-full">
                        Invite <FaPaperPlane className="inline ml-1" />
                    </button>

                    {game.owner_id === user?.id ? (
                        <button onClick={deleteClick} className="text-white bg-error cta-btn-colorless">
                            Delete <MdDelete className="inline ml-1" />
                        </button>
                    ) : (
                        <button onClick={leaveClick} className="text-white bg-error cta-btn-colorless">
                            Leave <MdDoorFront className="inline ml-1" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content: Chart + Scoreboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
                    <CustomLineChart players={players} entries={entries} />
                </div>

                {/* Scoreboard */}
                <section className="bg-primary rounded-2xl shadow p-6 text-white">
                    <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
                    {scoreboard.length === 0 ? (
                        <p className="text-sm">No players yet</p>
                    ) : (
                        <ol className="space-y-2">
                            {scoreboard.map(({ player, total }, idx) => (
                                <li
                                    key={player.id}
                                    className="flex justify-between bg-white text-gray-800 rounded px-4 py-2"
                                >
                                    <span>
                                        {idx + 1}. {player.username}
                                    </span>
                                    <span className="font-bold">{total}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </section>
            </div>
        </MainSection>
    );
}

export default ViewGamePage;
