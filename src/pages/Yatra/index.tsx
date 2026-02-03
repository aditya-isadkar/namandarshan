import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import YatraPackageCard from "./components/YatraPackageCard";
import RegionTabs from "./components/RegionTabs";
import SpiritualReads from "./components/SpiritualReads";
import AstroBookingModal from "@/components/booking/AstroBookingModal";
import Autoplay from "embla-carousel-autoplay";
import { getApiUrl } from "@/utils/api";
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck, Star, Car, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import TempleNetworkCard from "./components/TempleNetworkCard";
import TempleSearch from "./components/TempleSearch";
import StateDestinationMap from "./components/StateDestinationMap";

const yatraPackages = [
    {
        title: "Char Dham Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114982/badrinath-2-300x225_kqgg5s.jpg",
        duration: "11 Days / 10 Nights",
        location: "Uttarakhand",
        description: "One of the most sacred Hindu pilgrimages covering four divine abodes.",
        slug: "/char-dham-yatra"
    },
    {
        title: "Ayodhya Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115141/ram-murti_hlfmqw.jpg",
        duration: "3 Days / 2 Nights",
        location: "Ayodhya, UP",
        description: "The birthplace of Lord Ram and spiritual capital of devotion.",
        slug: "/ayodhya-yatra"
    },
    {
        title: "Kedarnath Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114985/kedarnath-300x300_ftg56k.webp",
        duration: "5 Days / 4 Nights",
        location: "Uttarakhand",
        description: "A holy journey to the abode of Lord Shiva in the Himalayas.",
        slug: "/kedarnath-yatra"
    },
    {
        title: "Jagannath Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115226/7.2-1_oy202e.jpg",
        duration: "4 Days / 3 Nights",
        location: "Puri, Odisha",
        description: "Visit the sacred land of Mahaprabhu Jagannath.",
        slug: "/jagannath-yatra"
    },
    {
        title: "Vrindavan Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114989/Mathura-Vrindavan-Spiritual-haven-for-devotees-Prem-Mandir-Image-3-300x200_epa3t3.webp",
        duration: "3 Days / 2 Nights",
        location: "Uttar Pradesh",
        description: "Experience the divine love of Radha and Krishna in Vrindavan.",
        slug: "/vrindavan-yatra"
    },
    {
        title: "Shirdi Yatra",
        image: "https://namandarshan.com/wp-content/uploads/2024/03/sai-baba-4-1.jpeg",
        duration: "3 Days / 2 Nights",
        location: "Maharashtra",
        description: "Experience the divine presence of Sai Baba in Shirdi.",
        slug: "/shirdi-yatra"
    }
];

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-orange-600" />,
        title: "VIP Darshan",
        description: "Skip the long queues with our exclusive priority passes."
    },
    {
        icon: <Star className="w-8 h-8 text-orange-600" />,
        title: "Premium Stays",
        description: "Comfortable 3-5 star accommodation with modern amenities."
    },
    {
        icon: <Car className="w-8 h-8 text-orange-600" />,
        title: "Luxury Transport",
        description: "Sanitized AC vehicles for a smooth and safe journey."
    },
    {
        icon: <Users className="w-8 h-8 text-orange-600" />,
        title: "Expert Guides",
        description: "Knowledgeable tour managers to assist you 24/7."
    }
];

const Yatra = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAstroBookingOpen, setIsAstroBookingOpen] = useState(false);

    useEffect(() => {
        fetch(getApiUrl('/api/temples'))
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTemples(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch temples:", err);
                setLoading(false);
            });
    }, []);
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Pilgrimage Yatra Packages - Char Dham, Ayodhya, Shirdi & More"
                keywords={[
                    "Hindu pilgrimage tour packages India",
                    "Char Dham Yatra packages from Delhi",
                    "Char Dham Yatra by helicopter price 2026",
                    "Ayodhya Ram Mandir tour package",
                    "Shirdi Sai Baba darshan package from Mumbai",
                    "Varanasi Ayodhya Prayagraj tour",
                    "Kedarnath Badrinath helicopter booking",
                    "South India temple tour packages",
                    "Senior citizen pilgrimage tours India",
                    "Luxury Hindu pilgrimage tours",
                    "Jagannath Puri Rath Yatra package",
                    "Vrindavan Mathura tour package 3 days"
                ]}
                description="Book comprehensive Hindu pilgrimage Yatra packages for Char Dham, Ayodhya Ram Mandir, Shirdi Sai Baba, Jagannath Puri, and Vrindavan. Our all-inclusive spiritual tours include VIP Darshan, comfortable accommodation, luxury transport, and guided assistance. Whether you are looking for a Kedarnath helicopter booking or a senior-citizen-friendly tour, Naman Darshan ensures a seamless and divine journey. Explore our verified packages and start your spiritual odyssey today."
            />
            <Header />
            <AstroBookingModal
                isOpen={isAstroBookingOpen}
                onClose={() => setIsAstroBookingOpen(false)}
            />
            <main className="flex-grow pt-48 pb-16">

                {/* New Hero Section */}
                <div className="relative h-[450px] w-full mt-20 md:mt-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/hero-aarti.jpg"
                            alt="Yatra Specials"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <div className="relative z-10 text-center text-white px-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="text-yellow-400 text-xl">✨</span>
                            <span className="font-medium tracking-wide uppercase text-sm md:text-base">Spiritual Journeys Await</span>
                        </div>
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide drop-shadow-lg leading-tight">
                            Simplify Your <br /> <span className="text-orange-400">Darshan Booking</span> With Naman
                        </h1>
                        <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            Personalized tours, comfortable transportation, and sacred rituals tailored for your peace of mind.
                        </p>
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
                        >
                            Explore Packages
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <TempleSearch temples={temples} />

                {/* AI Planner CTA */}
                <div className="container mx-auto px-4 mt-12 mb-12">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white border-2 border-white/20">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> New Feature
                                </span>
                            </div>
                            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Plan Your Custom Yatra with AI</h3>
                            <p className="text-indigo-100 max-w-xl">
                                Chat with our intelligent assistant to design a personalized spiritual itinerary tailored to your schedule and preferences.
                            </p>
                        </div>
                        <Link to="/ai-yatra-planner">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-lg border-0 gap-2 h-12 px-8">
                                Try AI Planner <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* State Destination Map */}
                <StateDestinationMap temples={temples} />

                {/* Horoscope Section (From Astro) */}
                <div className="container mx-auto px-4 my-16">
                    <div className="bg-orange-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
                        {/* Decorative Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="2" fill="currentColor" className="text-white" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#pattern)" />
                            </svg>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10">
                            {/* Text Content */}
                            <div className="flex-1 text-left space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold tracking-wide uppercase">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                    Daily Update
                                </div>

                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                                    Daily Horoscope & Panchang
                                </h1>

                                <p className="text-orange-50 text-[16px] opacity-95 leading-[1.6] mb-[25px] font-medium max-w-2xl">
                                    Today brings a wave of positive cosmic energy. The Moon enters a favorable position, making it an auspicious day for spiritual activities and travel planning. The Shubh Muhurat for new beginnings is between 10:15 AM and 01:30 PM. Focus on mental clarity and connect with the divine. For a personalized Kundli reading, consult Acharya Naman today.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    <button
                                        onClick={() => setIsAstroBookingOpen(true)}
                                        className="px-8 py-3.5 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                                    >
                                        Book Consultation
                                    </button>
                                    <button
                                        onClick={() => setIsAstroBookingOpen(true)}
                                        className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        Get Kundli
                                    </button>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="w-full md:w-auto flex justify-center md:justify-end">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl shrink-0">
                                    <img
                                        src="/assets/kedarnath.jpg"
                                        alt="Temple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div id="packages" className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl font-bold text-primary">Trending Yatra Packages</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full mb-6" />
                        <Link to="/exclusive-temple-darshan-packeges">
                            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                                View All Packages <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent>
                            {yatraPackages.map((pkg, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="h-full p-2">
                                        <YatraPackageCard {...pkg} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Explore by Region */}
                <div className="bg-stone-100 mt-20 pb-20">
                    <RegionTabs temples={temples} />
                </div>

                {/* Sacred Temple Network */}
                <div className="container mx-auto px-4 mt-20 mb-20">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl font-bold text-primary">Sacred Temple Network</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full" />
                    </div>

                    {loading ? (
                        <div className="text-center py-12">Loading sacred network...</div>
                    ) : (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                }),
                            ]}
                            className="w-full max-w-6xl mx-auto"
                        >
                            <CarouselContent>
                                {temples.map((temple: any, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="h-full p-2">
                                            <TempleNetworkCard {...temple} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )}
                </div>

                {/* Masked Text Naman Darshan */}
                <div className="container mx-auto px-4 mb-32 flex justify-center">
                    <h1
                        className="text-[80px] md:text-[150px] font-black tracking-tighter uppercase leading-none bg-center bg-cover bg-clip-text text-transparent select-none drop-shadow-sm"
                        style={{ backgroundImage: "url('/assets/kedarnath.jpg')" }}
                    >
                        नमन<span className="font-sans">DARSHAN</span>
                    </h1>
                </div>

                {/* Spiritual Reads */}
                <div className="bg-stone-50 border-t border-stone-100 py-10">
                    <SpiritualReads />
                </div>

                {/* Mantra Banner */}
                <div className="container mx-auto px-4 mb-12">
                    <div className="bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 py-4 rounded-full border border-orange-200 shadow-sm mx-auto max-w-4xl">
                        <h2 className="text-orange-600 flex items-center justify-center gap-4 drop-shadow-sm leading-none pt-2" style={{ fontFamily: '"Tangerine", cursive', fontSize: '56px', fontWeight: 'bold' }}>
                            <span className="text-yellow-500 text-3xl">✨</span>
                            "Dharam Ki Yatra, Naman Ke Saath"
                            <span className="text-yellow-500 text-3xl">✨</span>
                        </h2>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Yatra;
