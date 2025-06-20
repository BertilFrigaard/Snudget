import MainSection from "@/components/Sections/MainSection/MainSection";

export default function AboutPage() {
    return (
        <MainSection>
            <div className="flex-nowrap space-y-5 p-10">
                <h1 className="text-4xl font-bold text-gray-900">About Us</h1>

                <p>
                    Snudget transforms budgeting into a game. Create challenges, invite friends, and compete to see who
                    stays on track. Earn bragging rights as you conquer each milestone and watch your progress rise on
                    the leaderboard.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Tracking</h2>
                <p>
                    Log your spending or saving entries with just a few taps. Snudget automatically updates your totals,
                    so you always know how close you are to your goal. Visual charts help you see trends, making it
                    simple to adjust your strategy.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Social Aspect</h2>
                <p>
                    Challenge friends to friendly competitions or join public leagues. Comment on each other’s progress,
                    celebrate wins, and encourage one another to stay focused. The leaderboard keeps everyone motivated
                    and adds a fun sense of rivalry.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Benefits</h2>
                <p>
                    Gamifying your goals keeps motivation high. Snudget helps you build better habits while enjoying the
                    satisfaction of beating personal bests—and maybe even your friends. The community aspect makes it
                    easier to stay accountable and stick with your plans.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Technology</h2>
                <p>
                    Snudget runs on a secure, modern platform that ensures smooth performance on both desktop and mobile
                    devices. It’s designed to be reliable and easy to use, so you can focus on your goals instead of
                    worrying about the underlying tech.
                </p>
            </div>
        </MainSection>
    );
}
