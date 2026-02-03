import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Check, ArrowRight, ShieldCheck, Phone, Clock, CheckCircle2 } from "lucide-react";

const KedarnathYatra = () => {
    const packages = [
        {
            title: "Kedarnath Short Trip",
            duration: "2 Nights / 3 Days",
            highlights: [
                "Quick Darshan package for time-constrained pilgrims.",
                "Includes helicopter or trek assistance options."
            ]
        },
        {
            title: "Kedarnath Standard",
            duration: "4 Nights / 5 Days",
            highlights: [
                "Relaxed itinerary with acclimatization stops.",
                "Visit to Triyuginarayan and Guptkashi."
            ]
        },
        {
            title: "Kedarnath Extended",
            duration: "8 Nights / 9 Days",
            highlights: [
                "Comprehensive tour including surrounding spiritual sites.",
                "Ample time for meditation and rituals."
            ]
        },
        {
            title: "Kedarnath Complete",
            duration: "10 Nights / 11 Days",
            highlights: [
                "Full spiritual immersion with visits to Panch Kedar sites.",
                "Detailed guided tours and premium stay options."
            ]
        }
    ];

    const toggleBooking = () => {
        window.location.href = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Kedarnath Yatra Packages - Helicopter Booking & Trekking Tour"
                description="Plan your Kedarnath Yatra with our specialized tour packages. Options available for helicopter booking from Phata/Guptkashi or guided trekking participation. Includes accommodation near the temple, VIP Darshan assistance of the Jyotirlinga, and meals. Experience the divine aura of Lord Shiva in the Himalayas."
                keywords={[
                    "Kedarnath Yatra package by helicopter",
                    "Kedarnath tour package from Haridwar",
                    "Kedarnath Badrinath Do Dham Yatra",
                    "Kedarnath trek package cost",
                    "Luxury Kedarnath Yatra package",
                    "Shiva pilgrimage tour India"
                ]}
            />
            <Header />
            <main className="flex-grow pt-20 lg:pt-32">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <img
                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770114985/kedarnath-300x300_ftg56k.webp"
                        alt="Kedarnath Yatra"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Kedarnath Yatra</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
                            A sacred journey to the abode of Lord Shiva in the Himalayas.
                        </p>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                        <h2 className="font-display text-3xl font-bold text-orange-900 mb-6">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            The Kedarnath Yatra is one of the most sacred pilgrimages in Hinduism, dedicated to Lord Shiva and located amidst the majestic Garhwal Himalayas of Uttarakhand. Situated near the Mandakini River and surrounded by snow-clad peaks, Kedarnath Dham is one of the twelve Jyotirlingas of Lord Shiva and holds immense spiritual significance for devotees.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Every year, lakhs of pilgrims undertake this challenging yet deeply rewarding journey to seek the blessings of Lord Kedarnath. The yatra is believed to grant forgiveness of sins, inner peace, and spiritual liberation.
                        </p>

                        <div className="bg-orange-50 p-6 rounded-xl mt-8">
                            <h3 className="font-bold text-xl text-orange-800 mb-3">Holy Significance</h3>
                            <p className="text-gray-700 mb-4">
                                Kedarnath Dham represents the highest form of spiritual detachment and surrender. It is believed that a pilgrimage to Kedarnath liberates devotees from the cycle of birth and death.
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Kedarnath:</strong> Lord Shiva – forgiveness of sins and spiritual liberation</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Jyotirlinga:</strong> One of the twelve sacred manifestations of Lord Shiva</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Panch Kedar:</strong> Kedarnath is the most prominent shrine among the five Kedars</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Packages Section */}
                <div className="bg-stone-100 py-16">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Available Packages</h2>
                            <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packages.map((pkg, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                                    <div className="bg-orange-600 p-4 text-white text-center">
                                        <h3 className="font-bold text-lg">{pkg.title}</h3>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-gray-500 mb-4 bg-stone-50 p-2 rounded-lg justify-center">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-medium text-sm">{pkg.duration}</span>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {pkg.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                                                    <div className="flex-shrink-0 mt-0.5"><CheckCircle2 className="w-3 h-3 text-green-600" /></div>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button onClick={toggleBooking} className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 mt-auto">
                                            Inquire
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <a
                                href="tel:+919311973199"
                                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors text-lg"
                            >
                                <Phone className="w-5 h-5" />
                                +91 93119 73199
                            </a>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">History & Legend</h2>
                    <div className="prose prose-lg mx-auto text-gray-700 bg-orange-50/50 p-8 rounded-2xl border border-orange-100">
                        <p>
                            According to ancient Hindu scriptures, the Kedarnath temple was originally built by the Pandavas after the Mahabharata war to seek forgiveness from Lord Shiva for their sins. Lord Shiva, however, avoided them and took the form of a bull. When discovered, he dived into the earth, leaving his hump at Kedarnath.
                        </p>
                        <p className="mt-4">
                            The present temple structure is believed to have been revived and restored by Adi Shankaracharya in the 8th century. The temple has withstood centuries of harsh weather and natural calamities, standing as a powerful symbol of faith and divine protection.
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default KedarnathYatra;
