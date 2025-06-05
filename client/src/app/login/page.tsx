import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function Login() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-primary">
            <div className="flex flex-1 flex-col justify-center items-center bg-white px-8 py-12">
                <h2 className="text-3xl font-bold mb-6 font-martian-mono">Log in</h2>
                <form className="w-full max-w-xs flex flex-col gap-4">
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
                    <button
                        type="submit"
                        className="cursor-pointer bg-primary text-black font-bold py-2 rounded hover:bg-green-400 transition"
                    >
                        Log In
                    </button>
                </form>
                <div className="flex items-center my-4 w-full max-w-xs">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition">
                        <FcGoogle size={22} /> Continue with Google
                    </button>
                    <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition">
                        <AiFillGithub size={22} /> Continue with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
