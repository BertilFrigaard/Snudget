"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function GoogleContinueButton() {
    if (!process.env.NEXT_PUBLIC_BACKEND_GOOGLE_URL) {
        throw new Error("Missing environment varibles");
    }
    return (
        <Link
            className="w-full border border-gray-300 rounded-lg py-2 flex justify-center items-center hover:bg-gray-50 transition"
            href={process.env.NEXT_PUBLIC_BACKEND_GOOGLE_URL}
        >
            <FcGoogle size={22} />
            <span className="text-sm font-medium text-gray-700 ml-2">Continue with Google</span>
        </Link>
    );
}
