import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Check, ArrowRight, ShieldCheck, Phone, Clock, CheckCircle2 } from "lucide-react";

const AyodhyaYatra = () => {
    const packages = [
        {
            title: "Ayodhya Divine Darshan",
            duration: "1 Night / 2 Days",
            highlights: [
                "Day 1: Shri Ram Janmabhoomi, Hanuman Garhi, and Sarayu Aarti.",
                "Day 2: Kanak Bhawan, Ram Ki Paidi, and local shopping."
            ]
        },
        {
            title: "Ayodhya Heritage Experience",
            duration: "2 Nights / 3 Days",
            highlights: [
                "Detailed Darshan of Ram Lalla and evening Laser Show.",
                "Explore Guptar Ghat, Sita Ki Rasoi, and Dashrath Mahal.",
                "Visit Bharat Kund and the ancient Sun Temple."
            ]
        }
    ];

    const toggleBooking = () => {
        window.location.href = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Ayodhya Yatra Packages - Ram Janmabhoomi Darshan & Tour"
                description="Embark on a divine journey to Ayodhya, the birthplace of Lord Ram. Our Ayodhya Yatra packages include VIP Darshan at Shri Ram Janmabhoomi Mandir, visits to Hanuman Garhi, Kanak Bhawan, and the magical Saryu Aarti. Book your spiritual tour with comfortable stay and guided sightseeing."
                keywords={[
                    "Ayodhya Yatra package from Delhi",
                    "Ram Mandir Darshan booking",
                    "Ayodhya tour package 2 days",
                    "Ram Janmabhoomi VIP Darshan",
                    "Hanuman Garhi Ayodhya visit",
                    "Saryu River Aarti time",
                    "Best hotels in Ayodhya near Ram Mandir",
                    "Ayodhya sightseeing tour by car"
                ]}
            />
            <Header />
            <main className="flex-grow pt-20 lg:pt-32">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <img
                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770115141/ram-murti_hlfmqw.jpg"
                        alt="Ayodhya Ram Mandir"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Ayodhya Yatra</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
                            A spiritual journey to the holy birthplace of Lord Shri Ram.
                        </p>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                        <h2 className="font-display text-3xl font-bold text-orange-900 mb-6">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Ayodhya, the “Saket” of ancient times, is one of the seven most sacred cities (Sapta Puri) in Hinduism. Situated on the serene banks of the Sarayu River, it is revered globally as the birthplace of Lord Shri Ram.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            With the inauguration of the grand Shri Ram Janmabhoomi Mandir, the city has transformed into a modern spiritual hub while retaining its timeless Vedic charm.
                        </p>

                        <div className="bg-orange-50 p-6 rounded-xl mt-8">
                            <h3 className="font-bold text-xl text-orange-800 mb-3">Key Highlights</h3>
                            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Shri Ram Janmabhoomi Mandir:</strong> Marvel at the Nagara-style architecture.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Hanuman Garhi:</strong> A 10th-century fortress-temple.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Sarayu River Aarti:</strong> Witness the magical evening Aarti at the ghats.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span><strong>Kanak Bhawan:</strong> A stunning “Golden Palace” gifted to Mata Sita.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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
                    </div>
                </div>

                {/* History Section */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">History & Significance</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed bg-orange-50/30 p-8 rounded-2xl">
                        <div>
                            <h4 className="font-bold text-orange-900 text-lg">The Ancient & Vedic Era</h4>
                            <p>According to the Ramayana, Ayodhya was founded by Manu and became the capital of the Ikshvaku dynasty. It reached its pinnacle during the reign of Lord Shri Ram, whose “Ram Rajya” is the global benchmark for justice and prosperity.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-900 text-lg">The Modern Era (Ayodhya 2.0)</h4>
                            <p>With the Pran Pratishtha of Ram Lalla on January 22, 2024, Ayodhya has reawakened. Today, it is undergoing a massive infrastructure overhaul to become a world-class spiritual destination, often referred to as the “Vatican of the East.”</p>
                        </div>
                    </div>
                </div>

            </main >
            <Footer />
        </div >
    );
};

export default AyodhyaYatra;
