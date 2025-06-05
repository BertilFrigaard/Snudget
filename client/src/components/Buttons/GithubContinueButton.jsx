"use client";
import { AiFillGithub } from "react-icons/ai";

export default function GithubContinueButton() {
    const buttonClicked = () => {
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_GITHUB_URL;
    };
    return (
        <button
            onClick={buttonClicked}
            className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
        >
            <AiFillGithub size={22} /> Continue with Github
        </button>
    );
}
