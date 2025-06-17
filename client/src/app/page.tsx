import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import CustomPieChart from "@/components/Charts/CustomPieChart";
import Link from "next/link";

export default function Home() {
    return (
        <PrivateRoute userAccess={false} redirectUrl="/dashboard">
            <div className="bg-white shadow-lg rounded-2xl px-6 sm:px-8 md:px-12 py-20 sm:py-14 lg:mt-20 mb-20 max-w-6xl mx-auto">
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <div className="w-3 h-7 bg-primary rounded mr-2 sm:mr-3"></div>
                        <h2 className="text-primary font-bold text-2xl sm:text-3xl">Snudget</h2>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex gap-3 sm:gap-4">
                        <Link className="cta-btn-none text-sm sm:text-base" href="/login">
                            Log in
                        </Link>
                        <Link className="cta-btn-full text-sm sm:text-base" href="/signup">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-10">
                    {/* Text Section */}
                    <div className="max-w-xl text-center lg:text-left">
                        <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl md:text-6xl leading-tight">
                            Social <br />
                            Competitions
                        </h1>
                        <h2 className="text-gray-600 text-lg sm:text-xl md:text-2xl mt-6 mb-12">
                            Compete with your friends and track your progress in everything from fitness to spending.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                            <Link className="cta-btn-full" href="/signup">
                                Get Started
                            </Link>
                            <Link className="cta-btn-outline" href="/about">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-[250px] sm:h-[300px]">
                        <CustomPieChart />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white shadow-lg rounded-2xl px-6 sm:px-12 py-10 mt-12 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    {/* Tagline */}
                    <p className="text-gray-500 text-sm">
                        A playful way to compete on what matters. Save smarter. Live better.
                    </p>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-600">
                        <a href="/about" className="hover:text-primary transition">
                            About
                        </a>
                        <a href="/privacy" className="hover:text-primary transition">
                            Privacy
                        </a>
                        <a href="/contact" className="hover:text-primary transition">
                            Contact
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t mt-8 pt-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Bertil Frigaard. All rights reserved.
                </div>
            </div>
        </PrivateRoute>
    );
}
