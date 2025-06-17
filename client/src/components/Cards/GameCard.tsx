"use client";
import { UseAuthContext } from "@/contexts/AuthContext";
import { getEntriesOfGame } from "@/services/entryService";
import { RedactedGame } from "@/types/redactedGame";
import { formatDate, getNumberEnd } from "@/utils/formatUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GameCard({ game }: { game: RedactedGame }) {
    const { user } = UseAuthContext();
    const [rank, setRank] = useState<number | null>(null);

    useEffect(() => {
        getEntriesOfGame(game.id).then((entries) => {
            if (entries && user) {
                const players = [...new Set(entries.map((entry) => entry.user_id))];

                if (!players.includes(user.id)) {
                    setRank(0);
                    return;
                }

                const scoreboard = players
                    .map((player_id) => {
                        const total = entries
                            .filter((entry) => entry.user_id == player_id)
                            .reduce((sum, entry) => sum + entry.score_change, 0);
                        return { player_id, total };
                    })
                    .sort((a, b) => b.total - a.total);

                scoreboard.map((value, index) => {
                    if (value.player_id == user.id) {
                        setRank(index + 1);
                    }
                });
            }
        });
    }, [user, game]);
    return (
        <div key={game.id} className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{game.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
                {rank === null
                    ? "Loading Rank"
                    : rank === 0
                    ? "Awaiting entries"
                    : "You're " + rank + getNumberEnd(rank)}
            </p>
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">{"Ends " + formatDate(new Date(game.ends_at))}</div>
                <Link href={`/games/view/${game.id}`} className="text-primary font-medium hover:underline text-sm">
                    View ➤
                </Link>
            </div>
        </div>
    );
}
