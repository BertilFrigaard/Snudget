"use client";

import Link from "next/link";
import GoogleContinueButton from "@/components/Buttons/GoogleContinueButton";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { FaSpinner } from "react-icons/fa6";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import { signup } from "@/services/authService";
import { PrivateRoute } from "@/components/Routing/PrivateRoute";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitted = async (event: FormEvent) => {
        event.preventDefault();
        setPassword("");
        setLoading(true);
        const result = await signup(username, email, password);
        if (result) {
            redirect("/verify");
        } else {
            setLoading(false);
            setError("Something went wrong");
        }
    };

    return (
        <PrivateRoute redirectUrl="/dashboard" userAccess={false}>
            <SlimSection
                title="Welcome to Snudget"
                subtitle="Start competing with you'r friends today by creating your account here."
            >
                <form className="space-y-6 mt-4" onSubmit={formSubmitted}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username <span className="text-error">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-error">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password <span className="text-error">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {loading ? (
                        <button type="submit" className="cta-btn-full w-full flex items-center justify-center" disabled>
                            <FaSpinner className="animate-spin text-white" />
                        </button>
                    ) : (
                        <button type="submit" className="cta-btn-full w-full">
                            Sign up
                        </button>
                    )}

                    {error && <p className="text-error text-center font-bold">{error}</p>}
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="mx-4 text-sm text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* Google login */}
                <GoogleContinueButton />

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </SlimSection>
        </PrivateRoute>
    );
}
