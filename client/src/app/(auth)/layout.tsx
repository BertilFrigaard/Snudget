import Header from "@/components/Sections/Header/Header";
import Footer from "@/components/Sections/Footer/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header loggedIn={false} floating={true} />
            {children}
            <Footer />
        </>
    );
}
