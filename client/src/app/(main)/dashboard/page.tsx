"use client";
import GameCard from "@/components/Cards/GameCard";
import MainSection from "@/components/Sections/MainSection/MainSection";
import { UseAuthContext } from "@/contexts/AuthContext";
import { getGames } from "@/services/userService";
import { RedactedGame } from "@/types/redactedGame";
import { RedactedUser } from "@/types/redactedUser";
import Link from "next/link";
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
        // TODO show error instead
        return <h1>Could not retrieve user information</h1>;
    }
    return (
        <MainSection>
            {/* Welcome & Actions */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.username}</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Ready to dominate your goals? Start a new challenge or continue where you left off.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/games/log-entry" className="cta-btn-full">
                        Log Entry
                    </Link>
                    <Link href="/games/create" className="cta-btn-outline">
                        Create Game
                    </Link>
                </div>
            </div>

            {/* Current Games */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Competitions</h2>
                {games === null ? (
                    // Case 1: Loading state
                    <div className="text-center text-gray-500 py-12">Loading your games...</div>
                ) : games.length === 0 ? (
                    // Case 2: No games
                    <div className="text-gray-400">
                        <p className="text-sm mb-4">
                            You&apos;re not in any competitions at the moment. Join one or create your own to get
                            started.
                        </p>
                    </div>
                ) : (
                    // Case 3: Games loaded
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </MainSection>
    );
}

export default DashboardPage;
