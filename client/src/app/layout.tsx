import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Sections/Footer/Footer";
import Header from "@/components/Sections/Header/Header";

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
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
