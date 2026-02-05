import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

import AstroBookingModal from "@/components/booking/AstroBookingModal";
import { ShieldCheck, UserCheck, FileText, Lock, ScrollText, Briefcase, Heart, Star, ChevronDown, ChevronUp } from "lucide-react";
import panditjiImage from "../../assets/panditji.jpg";



const features = [
    {
        icon: <UserCheck className="w-10 h-10 text-orange-600" />,
        title: "Certified Astrologers",
        description: "Consult with verified experts having 10+ years of experience."
    },
    {
        icon: <FileText className="w-10 h-10 text-orange-600" />,
        title: "Detailed Reports",
        description: "Receive in-depth analysis reports in PDF format."
    },
    {
        icon: <Lock className="w-10 h-10 text-orange-600" />,
        title: "100% Privacy",
        description: "Your personal details and consultation data are kept strictly confidential."
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-orange-600" />,
        title: "Accurate Predictions",
        description: "Guidance based on precise Vedic calculations and planetary positions."
    }
];

const Astro = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Is my information confidential?",
            answer: "Yes, 100%. We value your privacy. Your birth details and problems are never shared with anyone."
        },
        {
            question: "What language is the consultation in?",
            answer: "Consultations are available in both Hindi and English, as per your comfort."
        },
        {
            question: "How long is the session?",
            answer: "A standard session lasts for 20-30 minutes, allowing detailed discussion and remedies."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Online Astrology Consultation"
                keywords={["Online Astrology", "Kundli Matching", "Horoscope", "Vedic Astrology", "Astrologer India", "Pandit Ji"]}
                description="Get accurate daily horoscope and personalized Vedic astrology consultations. Talk to verified astrologers for career, marriage, and life guidance."
            />
            <Header />
            <main className="flex-grow pt-44 pb-16">
                <AstroBookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                />

                {/* Hero Section */}
                <div className="container mx-auto px-4 mb-16">
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
                                        onClick={() => setIsBookingOpen(true)}
                                        className="px-8 py-3.5 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                                    >
                                        Book Consultation
                                    </button>
                                    <button
                                        onClick={() => setIsBookingOpen(true)}
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
                                        src="https://res.cloudinary.com/dryickpre/image/upload/v1770286890/WhatsApp_Image_2026-02-05_at_15.50.29_hog5dq.jpg"
                                        alt="Temple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Astro Naman Banner */}
                <div className="container mx-auto px-4 mb-16">
                    <div className="relative rounded-3xl overflow-hidden h-[500px] md:h-[650px] shadow-xl max-w-6xl mx-auto">
                        {/* Background Image */}
                        <img
                            src={panditjiImage}
                            alt="Astro Naman Sage"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-6">
                            <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-wide">
                                ASTRO NAMAN
                            </h2>

                            <div className="w-24 h-1 bg-orange-500 rounded-full" />

                            <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider opacity-90">
                                Navigate Your Life with the Stars
                            </p>

                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="mt-4 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-lg tracking-wider uppercase"
                            >
                                Book Consultation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divine Guidance Section */}
                <div className="bg-[#FFFBF5] py-20 mb-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wider">
                                Why Choose Us
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#3D2D22]">
                                Divine Guidance for Life
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                We don't just predict the future; we guide you to <span className="font-bold text-[#3D2D22]">shape it better</span>. A unique blend of Vedic Wisdom and Modern Analysis.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500 group">
                                <div className="w-14 h-14 mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                                    <ScrollText className="w-full h-full" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3D2D22] mb-3">
                                    Birth Chart Analysis
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    In-depth analysis of your birth chart and planetary influences on your life path.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500 group">
                                <div className="w-14 h-14 mb-6 text-amber-800 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-full h-full" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3D2D22] mb-3">
                                    Career & Wealth
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Guidance for job, business, and financial growth. Find the right timing for success.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500 group">
                                <div className="w-14 h-14 mb-6 text-red-500 group-hover:scale-110 transition-transform">
                                    <Heart className="w-full h-full" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3D2D22] mb-3">
                                    Love & Marriage
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Solutions for marriage delay, compatibility matching, and relationship harmony.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Know Your Astrologer Section */}
                <div className="container mx-auto px-4 mb-20">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                        {/* Image */}
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src={panditjiImage}
                                    alt="Acharya Naman Darshan"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="space-y-2">
                                <p className="text-orange-600 font-bold tracking-wider text-xs uppercase">
                                    Know Your Astrologer
                                </p>
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-[#3D2D22]">
                                    Acharya Naman Darshan
                                </h2>
                            </div>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    With over <span className="font-bold text-[#3D2D22]">10+ years of experience</span> in Vedic Astrology, Naman Ji has guided thousands of individuals through life's toughest challenges. He specializes in <span className="italic">Parashari Jyotish</span> and <span className="italic">Vastu Shastra</span>.
                                </p>
                                <p>
                                    His remedies are simple, effective, and rooted in ancient wisdom, designed to bring peace, prosperity, and clarity to your life.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                                <div>
                                    <div className="text-3xl font-bold text-orange-500 mb-1">5k+</div>
                                    <div className="text-sm text-gray-500 font-medium">Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-500 mb-1">10+</div>
                                    <div className="text-sm text-gray-500 font-medium">Years Exp.</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-500 mb-1">4.9</div>
                                    <div className="text-sm text-gray-500 font-medium">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-[#1a1a1a] py-20 mb-16 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-orange-400 mb-12">
                            What People Say
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Review 1 */}
                            <div className="bg-[#262626] p-8 rounded-2xl border border-white/10">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-6 text-lg leading-relaxed">
                                    "I was struggling with my career for 2 years. Naman Ji's guidance helped me choose the right path. His remedies are very simple."
                                </p>
                                <div>
                                    <div className="font-bold text-[#3b82f6] text-lg">Rahul Sharma</div>
                                    <div className="text-gray-500 text-sm">Mumbai</div>
                                </div>
                            </div>

                            {/* Review 2 */}
                            <div className="bg-[#262626] p-8 rounded-2xl border border-white/10">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-6 text-lg leading-relaxed">
                                    "Very accurate prediction about my marriage. He is very polite and listens to problems patiently. Highly recommended!"
                                </p>
                                <div>
                                    <div className="font-bold text-[#3b82f6] text-lg">Priya Verma</div>
                                    <div className="text-gray-500 text-sm">Delhi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="container mx-auto px-4 mb-20">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#3D2D22] mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-stone-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-bold text-orange-600 flex items-center gap-3">
                                        <span className="transform transition-transform duration-300">
                                            {openIndex === index ? '▼' : '▼'}
                                        </span>
                                        {faq.question}
                                    </span>
                                </button>

                                <div
                                    className={`
                                        overflow-hidden transition-all duration-300 ease-in-out
                                        ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                                    `}
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Bar */}
                <div className="bg-white py-12 mb-16 border-y border-stone-200">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </main>
            <Footer />
        </div>
    );
};

export default Astro;
