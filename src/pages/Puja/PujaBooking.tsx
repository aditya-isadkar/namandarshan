import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone } from "lucide-react";

const PujaBooking = () => {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-8">
                        Book Your Puja
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-orange-100">
                        <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                            Experience divine ease with Naman VIP Darshan. Skip the queues and waiting times for a seamless, privileged spiritual journey. Prioritizing tranquility and reverence, we redefine your temple visits for an exclusive encounter with your deity.
                        </p>

                        <div className="h-px bg-orange-100 w-full" />

                        <div className="space-y-6">
                            <a
                                href="tel:+919311973199"
                                className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                <Phone className="w-6 h-6 md:w-8 md:h-8" />
                                +91 98366 20564
                            </a>

                            <a
                                href="mailto:sayanmullick4@gmail.com"
                                className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-stone-700 hover:text-orange-600 transition-colors"
                            >
                                <Mail className="w-6 h-6 md:w-8 md:h-8" />
                                sayanmullick4@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PujaBooking;
