"use client";

import GoogleContinueButton from "@/components/Buttons/GoogleContinueButton";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";

export default function LoginPage() {
    return (
        <SlimSection title="Welcome back" subtitle="Great to see you again! Log in to your Snudget account here.">
            <form className="space-y-6">
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
                    Log in
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
                {"Don't have an account? "}
                <a href="/signup" className="text-primary font-medium hover:underline">
                    Sign up
                </a>
            </p>
        </SlimSection>
    );
}
