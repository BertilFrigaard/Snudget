import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <PrivateRoute userAccess={false} redirectUrl="/dashboard">
            <div className="bg-black py-15 xl:h-lvh">
                <div className="p-6 sm:p-10 sm:py-20 sm:px-30 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">
                    <div className="flex flex-col items-start justify-center gap-6 sm:gap-10 w-full lg:w-auto">
                        <h1 className="font-extrabold text-4xl sm:text-6xl font-martian-mono text-white">
                            Compete Today
                        </h1>
                        <div>
                            <h2 className="font-extralight text-2xl sm:text-3xl font-martian-mono text-gray-100">
                                Challenge your friends
                            </h2>
                            <h2 className="font-extralight text-xl sm:text-2xl font-martian-mono text-gray-200">
                                And press your limits
                            </h2>
                        </div>
                        <Link href={"/signup"}>
                            <button className="bg-primary font-medium px-5 sm:px-7 py-2 rounded-4xl cursor-pointer transition ease-in-out hover:duration-300 hover:scale-110 active:duration-100 active:scale-90">
                                Try for free
                            </button>
                        </Link>
                    </div>
                    <div className="w-full max-w-md lg:max-w-none lg:w-auto hidden lg:block shadow-gray-800 shadow-2xl rounded-4xl">
                        <Image
                            className="rounded-4xl w-full h-auto"
                            alt="Graphs"
                            src="/analytic.jpg"
                            width={700}
                            height={400}
                            sizes="(max-width: 1024px) 100vw, 700px"
                        />
                    </div>
                </div>
            </div>
            <div className="py-10">
                <div className="p-6 sm:p-10 sm:py-20 sm:px-30 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">
                    <div className="flex flex-col items-start justify-center gap-6 sm:gap-10 w-full max-w-full lg:max-w-[60%]">
                        <h1 className="font-extrabold text-3xl sm:text-6xl font-martian-mono text-black leading-tight">
                            Track your progress, <span className="text-primary">everywhere</span> and{" "}
                            <span className="text-primary">anytime</span>
                        </h1>
                        <div>
                            <h3 className="font-light text-base sm:text-xl font-martian-mono text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa pariatur ex, adipisci
                                et autem aliquam veritatis vel nisi qui explicabo facilis nostrum deserunt aspernatur
                                officiis ratione recusandae illo sit!
                            </h3>
                        </div>
                    </div>
                    <div className="w-full max-w-md lg:max-w-none lg:w-auto hidden lg:flex items-center justify-center">
                        <Image
                            className="shadow-gray-800 shadow-2xl rounded-4xl w-full h-auto"
                            alt="Graphs"
                            src="/analytic.jpg"
                            width={700}
                            height={400}
                            sizes="(max-width: 1024px) 100vw, 700px"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-primary py-10">
                <div className="p-6 sm:p-10 sm:py-20 sm:px-30 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">
                    <div className="w-full max-w-md lg:max-w-none lg:w-auto hidden lg:flex items-center justify-center">
                        <Image
                            className="shadow-gray-800 shadow-2xl rounded-4xl w-full h-auto"
                            alt="Graphs"
                            src="/athletes.png"
                            width={700}
                            height={400}
                            sizes="(max-width: 1024px) 100vw, 700px"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-6 sm:gap-10 w-full max-w-full lg:max-w-[60%]">
                        <h1 className="font-extrabold text-3xl sm:text-6xl font-martian-mono text-black leading-tight">
                            Invite your friends
                        </h1>
                        <div>
                            <h3 className="font-light text-base sm:text-xl font-martian-mono text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa pariatur ex, adipisci
                                et autem aliquam veritatis vel nisi qui explicabo facilis nostrum deserunt aspernatur
                                officiis ratione recusandae illo sit!
                            </h3>
                            <h3 className="font-light text-base sm:text-xl font-martian-mono text-gray-900 mt-4">
                                Voluptas fugit eius porro, eos qui eveniet! Harum, illum repellat libero, delectus
                                tenetur facere ipsum reprehenderit tempora perspiciatis autem recusandae! Eum, illo?
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}
