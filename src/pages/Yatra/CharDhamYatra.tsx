import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Check, ArrowRight, ShieldCheck, Phone, Clock, CheckCircle2 } from "lucide-react";

const CharDhamYatra = () => {
    const packages = [
        {
            title: "Char Dham Essential",
            duration: "9 Nights / 10 Days",
            route: "Haridwar → Barkot → Uttarkashi → Guptkashi → Kedarnath → Badrinath → Rishikesh",
            highlights: [
                "Focused Darshan at all four Dhams with optimized travel time.",
                "Includes Ganga Aarti at Haridwar and sightseeing in Rishikesh."
            ]
        },
        {
            title: "Char Dham Standard",
            duration: "10 Nights / 11 Days",
            route: "Complete circuit starting and ending in Haridwar/Dehradun",
            highlights: [
                "Extra night at Kedarnath or Badrinath for early morning Abhishek.",
                "Visit to Mana Village (The last village of India) and Vasudhara Falls."
            ]
        },
        {
            title: "Char Dham Deluxe",
            duration: "11 Nights / 12 Days",
            route: "Comprehensive tour including buffer days for weather or rest",
            highlights: [
                "Covers all 4 Dhams plus Triyuginarayan Temple (the wedding site of Shiva-Parvati).",
                "Stay in premium cottages and dedicated time for meditation at the Dhams."
            ]
        }
    ];

    const toggleBooking = () => {
        window.location.href = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Char Dham Yatra Packages 2026 - Kedarnath, Badrinath, Gangotri, Yamunotri"
                description="Book the best Char Dham Yatra packages for 2026. Choose from 10-12 day road trips or quick luxury helicopter tours. Includes VIP Darshan at Kedarnath and Badrinath, comfortable stays, and biometric registration assistance. Safe and customized tours for senior citizens and families."
                keywords={[
                    "Char Dham Yatra package from Haridwar",
                    "Kedarnath Badrinath helicopter package cost",
                    "Luxury Char Dham Yatra by helicopter 2026",
                    "Do Dham Yatra package Kedarnath Badrinath",
                    "Char Dham Yatra package for senior citizens",
                    "Best time to visit Char Dham",
                    "Uttarakhand pilgrimage tour package"
                ]}
            />
            <Header />
            <main className="flex-grow pt-20 lg:pt-32">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <img
                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770114982/badrinath-2-300x225_kqgg5s.jpg"
                        alt="Char Dham Yatra"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Char Dham Yatra</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
                            A divine journey to Yamunotri, Gangotri, Kedarnath, and Badrinath.
                        </p>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                        <h2 className="font-display text-3xl font-bold text-orange-900 mb-6">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            The Chardham Yatra is one of the most sacred pilgrimages in Hinduism, covering four holy shrines located in the Himalayas of Uttarakhand — Yamunotri, Gangotri, Kedarnath, and Badrinath. This divine journey is believed to purify the soul and lead devotees toward moksha (liberation).
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Every year, millions of pilgrims undertake this spiritually enriching yatra to seek the blessings of Goddess Yamuna, Goddess Ganga, Lord Shiva, and Lord Vishnu. More than a journey, the Chardham Yatra is a path of faith, devotion, and inner transformation.
                        </p>

                        <div className="bg-orange-50 p-6 rounded-xl mt-8">
                            <h3 className="font-bold text-xl text-orange-800 mb-3">Holy Significance</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex gap-2">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                        <span><strong>Yamunotri:</strong> Protection from untimely death</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                        <span><strong>Gangotri:</strong> Purification of mind and soul</span>
                                    </li>
                                </ul>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex gap-2">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                        <span><strong>Kedarnath:</strong> Forgiveness, detachment, and liberation</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                        <span><strong>Badrinath:</strong> Eternal peace and salvation</span>
                                    </li>
                                </ul>
                            </div>
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

                        <div className="grid md:grid-cols-3 gap-8">
                            {packages.map((pkg, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                                    <div className="bg-orange-600 p-4 text-white text-center">
                                        <h3 className="font-bold text-xl">{pkg.title}</h3>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-gray-500 mb-4 bg-stone-50 p-2 rounded-lg justify-center">
                                            <Clock className="w-5 h-5" />
                                            <span className="font-medium">{pkg.duration}</span>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex gap-2 mb-2">
                                                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-gray-800">Route:</span>
                                            </div>
                                            <p className="text-sm text-gray-600 pl-7">{pkg.route}</p>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {pkg.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                                                    <div className="flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href="tel:+919311973199"
                                            className="inline-flex items-center justify-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors mb-4"
                                        >
                                            <Phone className="w-5 h-5" />
                                            +91 93119 73199
                                        </a>
                                        <Button onClick={toggleBooking} className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 mt-auto">
                                            Inquire Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">History & Legend</h2>
                    <div className="prose prose-lg mx-auto text-gray-700 bg-orange-50/50 p-8 rounded-2xl border border-orange-100">
                        <p>
                            The Chardham Yatra was formally organized in the 8th century by the great Hindu philosopher and saint Adi Shankaracharya, who revived these sacred sites to unify Hindu spiritual practices across India.
                        </p>
                        <p className="mt-4">
                            Kedarnath is believed to have been established by the Pandavas during the Mahabharata period, while Badrinath finds mention in ancient Vedas and Puranas. Gangotri marks the sacred place where Goddess Ganga descended to Earth, and Yamunotri is dedicated to Goddess Yamuna, the sister of Yama, the god of death.
                        </p>
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="font-display text-2xl font-bold text-gray-800 mb-4">Experience divine ease with Naman VIP Darshan</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Skip the queues and waiting times for a seamless, privileged spiritual journey. Prioritizing tranquility and reverence, we redefine your temple visits for an exclusive encounter with your deity.
                        </p>
                        <Button onClick={toggleBooking} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                            Start Your Yatra
                        </Button>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default CharDhamYatra;
