import GoogleContinueButton from "@/components/Buttons/GoogleContinueButton";
import GithubContinueButton from "@/components/Buttons/GithubContinueButton";

function Signup() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col justify-center items-center bg-white px-8 py-12">
                <h2 className="text-3xl font-bold mb-6 font-martian-mono">Sign up</h2>
                <form className="w-full max-w-xs flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-primary"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-primary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-primary"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-primary"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-primary text-black font-bold py-2 rounded hover:bg-green-400 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center my-4 w-full max-w-xs">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <GoogleContinueButton />
                    <GithubContinueButton />
                </div>
            </div>
        </div>
    );
}

export default Signup;
