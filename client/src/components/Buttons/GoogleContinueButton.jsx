"use client";
import { FcGoogle } from "react-icons/fc";

export default function GoogleContinueButton() {
    const buttonClicked = () => {
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_GOOGLE_URL;
    };
    return (
        <button
            onClick={buttonClicked}
            className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
        >
            <FcGoogle size={22} /> Continue with Google
        </button>
    );
}
