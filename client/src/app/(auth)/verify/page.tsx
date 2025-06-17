import { PrivateRoute } from "@/components/Routing/PrivateRoute";
import SlimSection from "@/components/Sections/SlimSection/SlimSection";

function VerifyPage() {
    return (
        <PrivateRoute redirectUrl="/dashboard" userAccess={false}>
            <SlimSection title="Verify" subtitle="Verify your email to start competing with you're friends!">
                {""}
            </SlimSection>
        </PrivateRoute>
    );
}

export default VerifyPage;
