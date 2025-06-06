import Header from "@/components/Sections/Header/Header";
import Footer from "@/components/Sections/Footer/Footer";
import { PrivateRoute } from "@/components/Routing/PrivateRoute";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header loggedIn={true} floating={false} />
            <PrivateRoute>{children}</PrivateRoute>
            <Footer />
        </>
    );
}
