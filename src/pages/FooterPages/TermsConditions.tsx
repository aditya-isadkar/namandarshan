import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsConditions = () => {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 lg:pt-60 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl font-bold text-primary mb-4">Terms & Conditions</h1>
                        <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 prose prose-lg max-w-none text-stone-700">
                        <p className="lead">
                            The travel site Naman VIP Darshan, is offering pilgrimages packages for hassle free VIP darshan, you can opt for with accommodation and without accommodations. By accessing or using this site or using any of its services, you are agreed on the terms and conditions mentioned below.
                        </p>

                        <h3 className="text-orange-900">1. Agreement between the Clients & Naman VIP Darshan</h3>
                        <p>
                            While accessing, using, browsing or making a booking through Naman VIP Darshan, users have to accept that they have agreed to the terms and conditions of our portal. In case of any violation, Naman VIP Darshan reserves all the rights for taking any legal actions against them.
                        </p>

                        <h3 className="text-orange-900">2. Prices on the Website</h3>
                        <p>
                            The price, which we offer on Naman VIP Darshan, generally includes accommodation charges if you have not chosen accommodation then accommodation charges will not be applicable, taxes (unless specified otherwise) and some meals (Breakfast /Lunch / Dinner). It never comprises any personal expense or other additional charges like telephone calls, personal-man services, entrance fees of any monuments and bar charges, etc.
                        </p>

                        <h3 className="text-orange-900">3. Mode of Payments & the Policies</h3>
                        <p>
                            Our payment gateway is completely secure and customers can make the online payments through a safe transaction process that ensures their personal security codes will not be revealed in any circumstances.
                        </p>
                        <p>Modes of payment available at Naman VIP Darshan for online bookings are:</p>
                        <ul>
                            <li>Credit/Debit Cards: Visa, Master, Amex, Maestro & RuPay</li>
                            <li>Net Banking: All Major Banks Supported</li>
                            <li>Wallet: MobiKwik, PhonePe, AmazonPay & Others</li>
                            <li>UPI & GooglePay</li>
                            <li>EMI: HSBC, RBL, ICICI and another bank for EMI</li>
                            <li>PayPal & ePayLater</li>
                        </ul>

                        <h3 className="text-orange-900">4. Use of Website</h3>
                        <p>In case of your use of this website, you agree that:</p>
                        <ul>
                            <li>You have the legal authority to create an obligatory legal requirement and enter into these Terms of Use.</li>
                            <li>You will use this site as per its Terms of Use.</li>
                            <li>You will use the website only to make lawful bookings for you or another person for whom you are officially approved to do these kinds of bookings.</li>
                            <li>You will provide accurate information about every official document and other important details like name and DOB to the site in case you are planning a trip with it.</li>
                            <li>All information provided by you to this site should be accurate, updated and complete.</li>
                            <li>Naman VIP Darshan reserves the right to deny access to its Website to anyone, at any time without any notice and for any reason.</li>
                        </ul>

                        <h3 className="text-orange-900">5. Communication policy of the site</h3>
                        <ul>
                            <li>On transacting with this site, you will receive an email from Naman VIP Darshan for the status of your transaction. The email will be sent to the e-mail address provided by you.</li>
                            <li>The customer acknowledges that the SMS sent by Naman VIP Darshan is an added facility for the convenience of the customers. It is not compulsory as per the law to provide SMS service alerts to the customers.</li>
                        </ul>

                        <h3 className="text-orange-900">6. Booking Policy</h3>
                        <p>
                            The total price displayed on the site includes all applicable government taxes.
                            You are required to pay the entire amount prior to the confirmation of your booking.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsConditions;
