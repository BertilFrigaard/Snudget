import { PrivateRoute } from "@/components/Routing/PrivateRoute";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PrivateRoute>{children}</PrivateRoute>;
}
