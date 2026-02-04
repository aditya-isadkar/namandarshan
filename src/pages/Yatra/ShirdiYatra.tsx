import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Car, Hotel, Users, Plane, Phone, Sparkles, MapPin, Calendar, Camera, Clock, CheckCircle2 } from "lucide-react";

const ShirdiYatra = () => {
    const packages = [
        {
            title: "Shirdi & Shani Darshan",
            duration: "3 Nights / 4 Days",
            highlights: [
                "Day 1: Arrival and evening Samadhi Mandir Darshan.",
                "Day 2: Morning Kakad Aarti and excursion to Shani Shingnapur.",
                "Day 3: Visit Dwarkamai, Chavadi, and Sai Heritage Village.",
                "Day 4: Morning Holy Bath and local shopping before departure."
            ]
        },
        {
            title: "Shirdi & Trimbakeshwar",
            duration: "4 Nights / 5 Days",
            highlights: [
                "Day 1-2: Detailed Sai Baba Darshan, Gurusthan, and Lendi Baug.",
                "Day 3: Full-day trip to Trimbakeshwar Jyotirlinga and Nashik.",
                "Day 4: Explore Panchvati and Kalaram Temple; return to Shirdi.",
                "Day 5: Final Morning Aarti and departure."
            ]
        },
        {
            title: "Maharashtra Spiritual Grand Tour",
            duration: "6 Nights / 7 Days",
            highlights: [
                "Day 1-2: Shirdi Sai Darshan and local exploration.",
                "Day 3-4: Visit Grishneshwar Jyotirlinga and Ellora Caves.",
                "Day 5-6: Holy rituals at Trimbakeshwar and Nashik Ghats.",
                "Day 7: Closing prayers and transfer for departure."
            ]
        }
    ];

    const toggleBooking = () => {
        // Placeholder for booking logic or modal
        window.location.href = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Shirdi Yatra Packages - Sai Baba VIP Darshan & Shani Shingnapur"
                description="Book your Shirdi Sai Baba pilgrimage with Naman Darshan. Our packages include VIP Darshan passes, accommodation near the temple, and a side trip to Shani Shingnapur. Experience peace and blessings at the Samadhi Mandir, Dwarkamai, and Gurusthan."
                keywords={[
                    "Shirdi tour package from Mumbai by car",
                    "Shirdi Sai Baba VIP Darshan booking",
                    "Shirdi Shani Shingnapur tour package",
                    "Nasik Shirdi tour package",
                    "Shirdi flight package",
                    "Sai Baba temple accommodation"
                ]}
            />
            <Header />
            <main className="flex-grow pt-20 lg:pt-32">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <img
                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770198267/WhatsApp_Image_2026-02-04_at_15.05.09_o78rkp.jpg"
                        alt="Shirdi Sai Baba"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Shirdi Yatra</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
                            Experience the diverse presence of Sai Baba with our exclusive guided tours.
                        </p>
                    </div>
                </div>

                {/* Introduction / Overview */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                        <h2 className="font-display text-3xl font-bold text-orange-900 mb-6">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Shirdi is a small town in Maharashtra that serves as the final resting place of the 19th-century saint, Shirdi Sai Baba. Known for his philosophy of “Sabka Malik Ek” (One God Governs All), Shirdi attracts millions of devotees from every religion and walk of life. It is not just a pilgrimage but a place for spiritual renewal and inner peace.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div>
                                <h3 className="font-bold text-xl text-orange-800 mb-3">Key Highlights</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3">
                                        <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                                        <p className="text-gray-600"><span className="font-semibold text-gray-800">Shree Saibaba Samadhi Mandir:</span> The heart of Shirdi housing the sacred tomb.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                                        <p className="text-gray-600"><span className="font-semibold text-gray-800">Dwarkamai:</span> The mosque where Baba lived for over 60 years. The Dhuni still burns here.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                                        <p className="text-gray-600"><span className="font-semibold text-gray-800">Chavadi:</span> Place where Baba stayed on alternate nights.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-xl">
                                <h3 className="font-bold text-xl text-orange-800 mb-3">Why Choose Naman?</h3>
                                <p className="text-gray-700 mb-4">
                                    Experience divine ease with Naman VIP Darshan. Skip the queues and waiting times for a seamless, privileged spiritual journey.
                                </p>
                                <Button onClick={toggleBooking} className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                                    Inquire Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages Section */}
                <div className="bg-stone-100 py-16">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Our Shirdi Packages</h2>
                            <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {packages.map((pkg, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="bg-orange-600 p-4 text-white text-center">
                                        <h3 className="font-bold text-xl">{pkg.title}</h3>
                                        <a
                                            href="tel:+919311973199"
                                            className="inline-flex items-center gap-2 text-orange-100 font-bold hover:text-orange-200 transition-colors text-sm mt-1"
                                        >
                                            <Phone className="w-4 h-4" />
                                            +91 93119 73199
                                        </a>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-gray-500 mb-6 bg-stone-50 p-2 rounded-lg justify-center">
                                            <Clock className="w-5 h-5" />
                                            <span className="font-medium">{pkg.duration}</span>
                                        </div>
                                        <ul className="space-y-4 mb-8">
                                            {pkg.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                                                    <div className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button onClick={toggleBooking} className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-6">
                                            Book This Package
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-10">History of Shirdi</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            The history of Shirdi is the story of a nameless wandering monk who transformed a tiny village into a global spiritual hub.
                        </p>
                        <div className="pl-6 border-l-4 border-orange-200 space-y-4">
                            <div>
                                <h4 className="font-bold text-gray-900">The Arrival (1854)</h4>
                                <p>A young, unnamed boy first appeared sitting in meditation under a Neem tree. He left and returned in 1858 with a wedding party, staying for the next 60 years.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Life at Dwarkamai</h4>
                                <p>Sai Baba lived in a dilapidated mosque he called Dwarkamai. He practiced the philosophy of “Sabka Malik Ek” (One God for All), blending Hindu and Muslim traditions.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Mahasamadhi (1918)</h4>
                                <p>Sai Baba passed away on October 15, 1918. He was entombed in the Buty Wada, which is now the world-famous Samadhi Mandir.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ShirdiYatra;
