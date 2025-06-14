"use client";

import Link from "next/link";
import GoogleContinueButton from "@/components/Buttons/GoogleContinueButton";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";

export default function SignupPage() {
    return (
        <SlimSection
            title="Welcome to Snudget"
            subtitle="Start competing with you'r friends today by creating your account here."
        >
            <form className="space-y-6 mt-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username <span className="text-error">*</span>
                    </label>
                    <input
                        id="username"
                        type="text"
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
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button type="submit" className="cta-btn-full w-full">
                    Sign up
                </button>
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
    );
}
