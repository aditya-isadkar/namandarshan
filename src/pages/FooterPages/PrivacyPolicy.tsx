import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 lg:pt-60 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
                        <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 prose prose-lg max-w-none text-stone-700">
                        <h3 className="text-orange-900">Surveys</h3>
                        <p>
                            Naman VIP Darshan identifies the importance of its customers’ opinion. It often conducts surveys and uses the personal identification information to invite its regular customers to take part in the surveys. Customers can take part in these surveys completely on their own choice. Typically, we conduct surveys to know about their experiences with Naman VIP Darshan and to make our website, mobile site more user-friendly for its members. Survey contestants remain anonymous.
                        </p>

                        <h3 className="text-orange-900">Safeguard Sensitive Information</h3>
                        <p>
                            Sensitive information like Credit/Debit Card and Net Banking Details are mainly collected by the payment gateways and banks and not by Naman VIP Darshan. However, if still this information is stored on our site, it remains completely unshared and safe, excluding that if it has been shared with any third party by fault through you while browsing our website. Sometimes, such information is shared with certain third parties to process the Cashback offers & discounts, if applicable.
                        </p>

                        <h3 className="text-orange-900">Automatic Logging of Session Data</h3>
                        <p>
                            We record session data of the users, which includes IP address, OS, browser software and the activities of the user on his device. We collect session data to evaluate user behavior. It helps us in identifying the problems with our servers and lets us improve our systems. This information does not identify any visitor personally and only examines the user’s rough geographic location.
                        </p>

                        <h3 className="text-orange-900">Our Commitment</h3>
                        <p>
                            Naman VIP Darshan takes maximum initiatives possible to protect the information you share with us. We have taken advanced technology and security measures along with strict policy guidelines to secure the privacy of our customers and save their information from any unwanted access. We are constantly enhancing our security measures using more advanced technology.
                        </p>
                        <p>
                            Our privacy policy may change due to any unforeseen circumstances and enhancement of technologies. To get access to our new privacy policy, keep checking the websites regularly and identify our latest policies.
                        </p>
                        <p className="font-bold text-center mt-8">
                            Thank you for using Naman VIP Darshan! We assure you a safe transaction.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
