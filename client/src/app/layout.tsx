import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
    title: "Competition",
    description: "Competition app by Bertil Frigaard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={"antialiased bg-card-background"}>
                <div className="">
                    <AuthProvider>
                        <main className="min-h-screen font-poppins">{children}</main>
                    </AuthProvider>
                </div>
            </body>
        </html>
    );
}
