import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { pujas } from "./data";
import { Clock, MapPin, CheckCircle2, ChevronDown, PlayCircle, Star, ShieldCheck, Sparkles, Calendar, Users, ArrowLeft } from "lucide-react";
import SacredRitualProcess from "./components/SacredRitualProcess";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PujaBookingModal from "@/components/booking/PujaBookingModal";

const PujaDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const puja = pujas.find((p) => {
        if (p.id === slug) return true;
        // Try with/without suffix
        if (slug && slug.endsWith("-puja") && p.id === slug.replace(/-puja$/, "")) return true;
        if (slug && !slug.endsWith("-puja") && p.id === `${slug}-puja`) return true;
        return false;
    });
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingMode, setBookingMode] = useState<"online" | "offline">("online");
    const [bookingType, setBookingType] = useState<"Individual" | "Family">("Individual");

    const handleBooking = (mode: "online" | "offline", type: "Individual" | "Family") => {
        setBookingMode(mode);
        setBookingType(type);
        setIsBookingModalOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!puja) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-stone-600 mb-4">Puja Not Found</h1>
                    <Button onClick={() => navigate("/puja")}>Back to Pujas</Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title={puja.seoTitle || `${puja.title} - Online Puja Booking`}
                description={puja.seoDescription || puja.description}
                keywords={puja.seoKeywords || ["Online Puja", puja.title, "Vedic Rituals", "Hindu Puja", puja.location]}
                image={puja.image}
            />
            <Header />
            <main className="flex-grow pt-24 md:pt-32">
                {/* 1. Hero Section (Split Layout) */}
                <section className="container mx-auto px-4 mb-16">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/puja")}
                        className="flex items-center text-stone-500 font-medium hover:text-orange-600 gap-2 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to All Pujas
                    </button>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                                <Star className="w-3 h-3 fill-current" />
                                Premium Vedic Ritual
                            </div>
                            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900 leading-tight">
                                {puja.title}
                            </h1>
                            <p className="text-lg text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {puja.description}
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                                <Button
                                    onClick={() => handleBooking("online", "Individual")}
                                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-6 px-8 text-lg rounded-full shadow-lg shadow-orange-200"
                                >
                                    Book Puja Request
                                </Button>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-stone-100">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-stone-700">Certified Pandits</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-stone-100">
                                    <PlayCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-sm font-medium text-stone-700">Live Proof</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-stone-500 text-sm font-medium pt-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {puja.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {puja.duration}
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="flex-1 w-full max-w-xl lg:max-w-none">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-stone-900/5">
                                <img
                                    src={puja.image}
                                    alt={puja.title}
                                    className={`w-full h-full object-${puja.imageFit || 'cover'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Booking Cards Section */}
                <section className="bg-orange-50/50 py-16 border-y border-orange-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="font-display text-3xl font-bold text-stone-800">
                                Register for Next Shubh Muhurat
                            </h2>
                            <p className="text-stone-600 mt-2">Choose your preferred way to connect with the divine</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Individual Card */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                                <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">Individual Sewa</h3>
                                <p className="text-stone-600 mb-6 text-sm">
                                    Sankalp for Single Person
                                </p>
                                <Button
                                    onClick={() => handleBooking("online", "Individual")}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-bold rounded-full"
                                >
                                    Book Request
                                </Button>
                            </div>

                            {/* Family Card */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-stone-900" />
                                <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">Family Sewa</h3>
                                <p className="text-stone-600 mb-6 text-sm">
                                    Sankalp for entire Household
                                </p>
                                <Button
                                    onClick={() => handleBooking("online", "Family")}
                                    variant="outline"
                                    className="w-full border-2 border-stone-900 text-stone-900 hover:bg-stone-50 py-6 text-lg font-bold rounded-full"
                                >
                                    Book Request
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Sticky Nav Anchors */}
                <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 py-3 hidden md:block">
                    <div className="container mx-auto px-4 flex justify-center gap-8 text-sm font-semibold text-stone-600">
                        <a href="#significance" className="hover:text-orange-600 transition-colors">Significance</a>
                        <a href="#process" className="hover:text-orange-600 transition-colors">Ritual Process</a>
                        <a href="#benefits" className="hover:text-orange-600 transition-colors">Benefits</a>
                        <a href="#faq" className="hover:text-orange-600 transition-colors">FAQs</a>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16 space-y-24 max-w-5xl">

                    {/* 4. Significance / Glory */}
                    <section id="significance" className="scroll-mt-32">
                        <h2 className="font-display text-3xl font-bold text-center text-stone-900 mb-10">
                            The Glory of {puja.gloryTitle || puja.title}
                        </h2>
                        {puja.importance ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {puja.importance.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm text-center hover:border-orange-200 transition-colors">
                                        <h3 className="font-bold text-lg text-stone-900 mb-2">{item.title}</h3>
                                        <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                                <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line text-center">{puja.about}</p>
                            </div>
                        )}
                    </section>

                    {/* 5. Ritual Process */}
                    <section id="process" className="scroll-mt-32">
                        <SacredRitualProcess steps={puja.process} />
                    </section>

                    {/* 6. Benefits */}
                    <section id="benefits" className="scroll-mt-32">
                        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 md:p-12 text-white text-center md:text-left relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <h2 className="font-display text-3xl font-bold mb-4">Divine Benefits</h2>
                                    <p className="text-stone-300 text-lg leading-relaxed mb-6">
                                        {puja.benefits}
                                    </p>
                                    <div className="border-t border-white/10 pt-6 mt-6">
                                        <h3 className="font-bold text-orange-400 mb-2 uppercase text-xs tracking-wider">Puja Samagri Included</h3>
                                        <p className="text-stone-400 text-sm opacity-80">{puja.samagri}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                        <Sparkles className="w-12 h-12 text-orange-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. FAQs */}
                    {puja.faqs && (
                        <section id="faq" className="scroll-mt-32">
                            <h2 className="font-display text-3xl font-bold text-center text-stone-900 mb-10">
                                Common Questions
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {puja.faqs.map((faq, idx) => (
                                        <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border text-stone-900 px-6 rounded-xl shadow-sm">
                                            <AccordionTrigger className="text-left font-semibold text-stone-900 hover:text-orange-600">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-stone-600 leading-relaxed pb-6">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </section>
                    )}

                </div>
            </main>

            <PujaBookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                mode={bookingMode}
                bookingType={bookingType}
            />
            <Footer />
        </div>
    );
};

export default PujaDetails;
