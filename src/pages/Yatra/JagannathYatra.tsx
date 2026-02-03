import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Check, ArrowRight, ShieldCheck, Phone, Clock, CheckCircle2 } from "lucide-react";

const JagannathYatra = () => {
    const packages = [
        {
            title: "Puri Divine Darshan",
            duration: "2 Nights / 3 Days",
            highlights: [
                "Day 1: Arrival, Jagannath Darshan, and Puri Beach.",
                "Day 2: Konark Sun Temple and Chandrabhaga Beach.",
                "Day 3: Gundicha Temple and local shopping."
            ]
        },
        {
            title: "Odisha Coastal Heritage",
            duration: "4 Nights / 5 Days",
            highlights: [
                "Detailed Jagannath Darshan and Mahaprasad experience.",
                "Excursion to Chilika Lake (Dolphin spotting).",
                "Visit Konark Sun Temple and Raghurajpur art village.",
                "Final prayers at Sakshigopal Temple."
            ]
        }
    ];

    const toggleBooking = () => {
        window.location.href = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Jagannath Puri Yatra Packages - Puri, Konark & Chilika Tour"
                description="Book a spiritual Jagannath Puri Yatra. Experience the divine Rath Yatra vibes, have Darshan of Lord Jagannath, and visit the UNESCO World Heritage Konark Sun Temple. Our package includes comfortable accommodation in Puri, guided temple tours, and a visit to the scenic Chilika Lake."
                keywords={[
                    "Jagannath Puri tour package from Kolkata",
                    "Puri Gangasagar tour package",
                    "Jagannath Temple VIP Darshan",
                    "Konark Sun Temple tour",
                    "Odisha Golden Triangle tour",
                    "Puri Rath Yatra package 2026"
                ]}
            />
            <Header />
            <main className="flex-grow pt-20 lg:pt-32">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <img
                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770115226/7.2-1_oy202e.jpg"
                        alt="Jagannath Puri Yatra"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Jagannath Yatra</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
                            Journey to the abode of the Living Lord of the Universe.
                        </p>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                        <h2 className="font-display text-3xl font-bold text-orange-900 mb-6">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Jagannath Puri is one of India’s four sacred Char Dham pilgrimage sites. Located on the golden coast of the Bay of Bengal in Odisha, it is the holy seat of Lord Jagannath (the Lord of the Universe), worshipped alongside his brother Balabhadra and sister Subhadra.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Unlike other temples where deities are made of stone or metal, the idols here are crafted from sacred Neem wood (Daru Devta). The city is world-renowned for its spiritual energy, the massive Rath Yatra, and the mystery of the Mahaprasad.
                        </p>

                        <div className="bg-orange-50 p-6 rounded-xl mt-8">
                            <h3 className="font-bold text-xl text-orange-800 mb-3">Spiritual Significance</h3>
                            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Nilachala Dham:</strong> The temple represents the heart of spiritual consciousness.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>The Living Lord:</strong> The Lord eats 56 varieties of food (Chappan Bhog) daily.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Mahaprasad:</strong> Cooked in earthen pots; said to be supervised by Goddess Lakshmi.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Packages Section */}
                <div className="bg-stone-100 py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Available Packages</h2>
                            <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
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
                        <div className="text-center mt-8">
                            <a
                                href="tel:+919311973199"
                                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                +91 93119 73199
                            </a>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">History & Mysteries</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed bg-orange-50/30 p-8 rounded-2xl">
                        <div>
                            <h4 className="font-bold text-orange-900 text-lg">The Legend of Nilamadhav</h4>
                            <p>Before the grand temple existed, Lord Jagannath was worshipped in secret as Nilamadhav by a tribal chief. King Indradyumna later discovered the deity and was instructed by a divine voice to carve new idols from a sacred log found floating in the sea.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-900 text-lg">Nabakalebara: The Ritual of Rebirth</h4>
                            <p>Every 12 to 19 years, the old idols are buried, and new ones are carved from specific Neem trees. During a secret midnight ceremony, a mysterious “Life Force” (Brahma Padartha) is transferred from the old idol to the new one by a blindfolded priest.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-900 text-lg">The Living Kitchen</h4>
                            <p>The temple kitchen uses a unique cooking method where seven earthen pots are stacked over a single fire, and the top-most pot cooks first—a divine defiance of physics.</p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default JagannathYatra;
