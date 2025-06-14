"use client";

import { createGame } from "@/services/gameService";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";

function CreateGamePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endsAt, setEndsAt] = useState("");

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createGame(title, description ? description : null, null, endsAt);
        redirect("/dashboard");
    };

    return (
        <SlimSection title="Create Game" subtitle="Want to play with your friends? Create a game here.">
            <form className="flex flex-col gap-4" onSubmit={formSubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-error">*</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ends_at" className="block text-sm font-medium text-gray-700 mb-1">
                        End date <span className="text-error">*</span>
                    </label>
                    <input
                        id="ends_at"
                        name="ends_at"
                        type="date"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                    />
                </div>
                <button type="submit" className="cta-btn-full">
                    Create Game
                </button>
            </form>
        </SlimSection>
    );
}

export default CreateGamePage;
