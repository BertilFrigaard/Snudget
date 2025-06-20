import MainSection from "@/components/Sections/MainSection/MainSection";

export default function PrivacyPage() {
    return (
        <MainSection>
            <div className="flex-nowrap space-y-5 p-10">
                <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>

                <p>
                    This Privacy Policy explains how Snudget (the &quot;App&quot;) collects, uses and stores your
                    information.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>

                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Account details:</strong> When you sign up, we collect your username, email address and
                        a password. If you register with Google, we may also receive your Google profile picture.
                    </li>
                    <li>
                        <strong>Session information:</strong> We maintain a session cookie so that you remain logged in
                        while using the App.
                    </li>
                    <li>
                        <strong>Usage data:</strong> When you create games or entries, that activity is stored on our
                        servers.
                    </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>

                <ul className="list-disc pl-5 space-y-2">
                    <li>To create and manage your account.</li>
                    <li>To authenticate you when you log in and to keep you signed in during your session.</li>
                    <li>To send verification emails and other service related notifications.</li>
                    <li>To operate the App and provide its game tracking features.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800">Sharing of Information</h2>
                <p>
                    Your personal information is used solely for operating the App. We do not sell your information to
                    third parties. We may disclose data if required by law or to protect the App and its users.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Cookies</h2>
                <p>
                    We use a single session cookie from <code>express-session</code> to keep you logged in. The cookie
                    is stored on your device and is not used for advertising or analytics.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
                <p>
                    We take reasonable steps to protect your data, including hashing passwords and restricting database
                    access. However, no system can be completely secure, and you use the App at your own risk.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
                <p>
                    You can request to view or delete your account information by contacting us at the email below.
                    Deleting your account removes your personal data from our servers.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. The updated policy will always be displayed
                    here.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
                <p>For questions about this policy, please contact us via. the details provided in the contact page.</p>
            </div>
        </MainSection>
    );
}
