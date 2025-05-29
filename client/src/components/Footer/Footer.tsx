function Footer() {
    return (
        <footer className="bg-black text-white p-5">
            <div className="h-0.5 bg-gray-500" />
            <div className="flex flex-wrap justify-start justify-self-center gap-x-40 text-lg m-10">
                <div className="p-4">
                    <h6 className="text-xl font-bold text-gray-200 mb-5">Contact</h6>
                    <ul className="space-y-2">
                        <li>Report Bug</li>
                        <li>Submit Complaint</li>
                        <li>View Jobs</li>
                        <li>Other Inquiries</li>
                    </ul>
                </div>
                <div className="p-4">
                    <h6 className="text-xl font-bold text-gray-200 mb-5">About</h6>
                    <ul className="space-y-2">
                        <li>Who are we?</li>
                        <li>The Creator</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <div className="h-0.5 bg-gray-500" />
            <p className="flex mt-10 justify-center">&copy; Bertil Frigaard</p>
        </footer>
    );
}

export default Footer;
