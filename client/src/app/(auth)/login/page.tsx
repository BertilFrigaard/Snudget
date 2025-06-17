"use client";

import GoogleContinueButton from "@/components/Buttons/GoogleContinueButton";
import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";
import { UseAuthContext } from "@/contexts/AuthContext";
import { login as loginSerivce } from "@/services/authService";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { login } = UseAuthContext();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitted = async (event: FormEvent) => {
        event.preventDefault();
        setPassword("");
        setLoading(true);
        const result = await loginSerivce(email, password);
        if (result) {
            if (await login()) {
                redirect("/dashboard");
            }
        }
        setLoading(false);
        setError("Wrong email or password");
    };
    return (
        <PrivateRoute redirectUrl="/dashboard" userAccess={false}>
            <SlimSection title="Welcome back" subtitle="Great to see you again! Log in to your Snudget account here.">
                <form className="space-y-6" onSubmit={formSubmitted}>
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
                            Log in
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
                    {"Don't have an account? "}
                    <a href="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </SlimSection>
        </PrivateRoute>
    );
}
