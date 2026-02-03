import React from "react";
import Layout from "../components/layout/Layout";
import { Container } from "../components/ui/container";

const PrivacyPolicy = () => {
    return (
        <Layout>
            <Container className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">Privacy Policy</h1>
                        <p className="text-xl text-stone-600">Your privacy is important to us.</p>
                    </div>

                    <div className="prose prose-stone max-w-none text-stone-700">
                        <p className="leading-relaxed">
                            Naman VIP Darshan understands your concern for privacy and makes sure of protecting the personal information of the customers; including their names, addresses and contact details they share with us. We, being a reliable travel agency of India, take every step to protect your privacy.
                        </p>
                        <p>
                            For visiting Naman VIP Darshan website, you don’t need to reveal your personal information. The individual user exploring our website remains completely anonymous.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-stone-900">Cookies:</h3>
                        <p>
                            It is true that few of our web pages use “cookies” to serve the customers better and to provide them with the personalized information they need from our site. Cookies only identify the websites to smooth the progress of your next visit to our site. Information that we collect through them is used only to analyze and improve our services for you. No individual information related to your identity is collected or used in this process.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-stone-900">What Personal Details Naman VIP Darshan Collects & How These are Used:</h3>
                        <p>
                            If you make any booking/purchasing or sign-up for newsletters of our website, e-commerce transactions, Naman VIP Darshan collects the following personal information from you while transacting:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Name</li>
                            <li>Contact Number</li>
                            <li>Address</li>
                            <li>Credit Card details</li>
                            <li>Age</li>
                            <li>Email I’d</li>
                        </ul>
                        <p className="mt-4">
                            Naman VIP Darshan does not share or deal for any of the above sensitive information without the permission of its users or customers. The above-mentioned information is collected from the users/customers/travelers for the following usage:
                        </p>

                        <h4 className="font-bold mt-6 mb-2">To Book a Service:</h4>
                        <p>Names, addresses, phone numbers and age details are shared with related service providers, including hotels, or bus services to provide reservation and booking to the customers or travelers.</p>

                        <h4 className="font-bold mt-6 mb-2">To Send Promotional Offers:</h4>
                        <p>Naman VIP Darshan uses details like mobile numbers and email Id for sending information about any promotional offers. We often sponsor promotions and lucky draws to give members an opportunity to win discounts on travel or other prizes. This is also optional and the user can unsubscribe for such emails. In such cases, customers remain unaware of ongoing promotional discounts.</p>

                        <h4 className="font-bold mt-6 mb-2">Member Registration:</h4>
                        <p>If you opt to be a registered member of our website, information like name, address, telephone number, e-mail address, a unique login name and password are asked. This information is collected on the registration form for various purposes like</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>User recognition</li>
                            <li>To complete the package services</li>
                            <li>To let us connect with you for customer service purposes, if necessary</li>
                            <li>To contact you in order to meet your specific needs; and</li>
                            <li>To improve our products and services</li>
                            <li>To confirm your new member registration and each booking you do.</li>
                        </ul>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-stone-900">Surveys:</h3>
                        <p>
                            Naman VIP Darshan identifies the importance of its customers’ opinion. It often conducts surveys and uses the personal identification information to invite its regular customers to take part in the surveys. Customers can take part in these surveys completely on their own choice. Typically, we conduct surveys to know about their experiences with Naman VIP Darshan and to make our website, mobile site more user-friendly for its members. Survey contestants remain anonymous.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-stone-900">Safeguard Sensitive Information:</h3>
                        <p>
                            Sensitive information like Credit/Debit Card and Net Banking Details are mainly collected by the payment gateways and banks and not by Naman VIP Darshan. However, if still this information is stored on our site, it remains completely unshared and safe, excluding that if it has been shared with any third party by fault through you while browsing our website. Sometimes, such information is shared with certain third parties to process the Cashback offers & discounts, if applicable.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-stone-900">Automatic Logging of Session Data:</h3>
                        <p>
                            We record session data of the users, which includes IP address, OS, browser software and the activities of the user on his device. We collect session data to evaluate user behavior. It helps us in identifying the problems with our servers and lets us improve our systems. This information does not identify any visitor personally and only examines the user’s rough geographic location.
                        </p>
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
            </Container>
        </Layout>
    );
};

export default PrivacyPolicy;
