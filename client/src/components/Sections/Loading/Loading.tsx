export default function Loading() {
    return (
        <div className="min-h-screen flex gap-20 items-center justify-center ">
            <div className="bg-white shadow-lg rounded-2xl p-10 flex gap-2">
                <div className="animate-bounce rounded-full bg-primary h-5 w-5" style={{ animationDelay: "0ms" }}></div>
                <div
                    className="animate-bounce rounded-full bg-primary h-5 w-5"
                    style={{ animationDelay: "150ms" }}
                ></div>
                <div
                    className="animate-bounce rounded-full bg-primary h-5 w-5"
                    style={{ animationDelay: "300ms" }}
                ></div>
                <div
                    className="animate-bounce rounded-full bg-primary h-5 w-5"
                    style={{ animationDelay: "450ms" }}
                ></div>
            </div>
        </div>
    );
}
