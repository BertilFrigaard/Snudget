import { PrivateRoute } from "@/components/Routing/PrivateRoute";

async function DashboardPage() {
    return (
        <PrivateRoute>
            <h1>Dashboard...</h1>
        </PrivateRoute>
    );
}

export default DashboardPage;
