"use client";

import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { UseAuthContext } from "@/contexts/AuthContext";
import { createEntry } from "@/services/entryService";
import { getGames } from "@/services/userService";
import { RedactedGame } from "@/types/redactedGame";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function LogEntryPage() {
    const { user } = UseAuthContext();
    const [selectedGameId, setSelectedGameId] = useState("");
    const [amount, setAmount] = useState("");
    const [games, setGames] = useState<RedactedGame[]>([]);

    useEffect(() => {
        getGames(user!.id).then((games) => {
            setGames(games);
        });
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGameId) {
            alert("Please select a game.");
            return;
        }
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        createEntry(selectedGameId, Number(amount));
        redirect("/dashboard");
    };

    return (
        <SlimSection title="Log Entry" subtitle="Nice going! Log a new entry to one of your games below.">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Game dropdown */}
                <div>
                    <label htmlFor="game" className="block text-sm font-medium text-gray-700">
                        Game <span className="text-error">*</span>
                    </label>
                    <select
                        id="game"
                        value={selectedGameId}
                        onChange={(e) => setSelectedGameId(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="" disabled>
                            Select a game
                        </option>
                        {games.map((game) => (
                            <option key={game.id} value={game.id}>
                                {game.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount input */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount <span className="text-error">*</span>
                    </label>
                    <input
                        id="amount"
                        type="number"
                        min="1"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button type="submit" className="cta-btn-full w-full">
                    Submit
                </button>
            </form>
        </SlimSection>
    );
}
