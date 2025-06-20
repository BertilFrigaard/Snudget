import MainSection from "@/components/Sections/MainSection/MainSection";

export default function ContactPage() {
    return (
        <MainSection>
            <div className="flex-nowrap space-y-5 p-10">
                <h1 className="text-4xl font-bold text-gray-900">Contact Snudget</h1>

                <p>
                    If you&apos;ve encountered any issues or would like to get in touch with me – Bertil Frigaard – for
                    any other reason, feel free to contact me using the information below.
                </p>

                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Email:</strong> bertilfrigaard@gmail.com
                    </li>
                </ul>
            </div>
        </MainSection>
    );
}
