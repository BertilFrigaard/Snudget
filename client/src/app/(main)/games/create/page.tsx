"use client";

import { createGame } from "@/services/gameService";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";

function CreateGamePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [password, setPassword] = useState("");

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createGame(title, description ? description : null, password ? password : null, endsAt);
        redirect("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-primary">Opret nyt spil</h1>
                <form className="flex flex-col gap-4" onSubmit={formSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titel <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                            placeholder="F.eks. Sommerturnering"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Beskrivelse
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary resize-none"
                            placeholder="Skriv en kort beskrivelse af spillet"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="ends_at" className="block text-sm font-medium text-gray-700 mb-1">
                            Slutdato <span className="text-red-500">*</span>
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
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Adgangskode (valgfri)
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                            placeholder="Indtast adgangskode hvis nødvendigt"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-primary text-black font-bold py-2 rounded-lg hover:bg-green-400 transition cursor-pointer"
                    >
                        Opret spil
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateGamePage;
