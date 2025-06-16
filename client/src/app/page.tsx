import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import CustomPieChart from "@/components/Charts/CustomPieChart";
import Link from "next/link";

export default function Home() {
    // TODO fix the footer
    return (
        <PrivateRoute userAccess={false} redirectUrl="/dashboard">
            <div className="bg-white shadow-lg rounded-2xl p-12 pb-20 mb-30 lg:my-30 max-w-6xl mx-auto">
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-12">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <div className="w-4 h-8 bg-primary rounded mr-3"></div>
                        <h2 className="text-primary font-bold text-3xl">Snudget</h2>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex gap-4 items-center">
                        <Link className="cta-btn-none" href="/login">
                            Log in
                        </Link>
                        <Link className="cta-btn-full" href="/signup">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-18">
                    {/* Text Section */}
                    <div className="max-w-xl text-center lg:text-left">
                        <h1 className="font-extrabold text-gray-900 text-6xl leading-tight">
                            Social <br />
                            Competitions
                        </h1>
                        <h2 className="text-gray-600 text-2xl mt-8 mb-18">
                            Compete with your friends and track your progress in everything from fitness to spending.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center lg:justify-start">
                            <Link className="cta-btn-full" href="/signup">
                                Get Started
                            </Link>
                            <Link className="cta-btn-outline" href="/about">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="w-full max-w-md h-[300px]">
                        <CustomPieChart />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-12 mt-20 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo and tagline */}
                    <div className="text-center md:text-left">
                        <p className="text-gray-500 text-sm">
                            A playful way to compete on what matters. Save smarter. Live better.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-10 text-sm text-gray-600">
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
