import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Sections/Header/Header";
import Footer from "@/components/Sections/Footer/Footer";

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
            <body className={"antialiased"}>
                <div className="">
                    <AuthProvider>
                        <Header />
                        <main className="min-h-screen">{children}</main>
                        <Footer />
                    </AuthProvider>
                </div>
            </body>
        </html>
    );
}
