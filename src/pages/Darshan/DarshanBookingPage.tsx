import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApiUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, ChevronRight, Star, HandHeart, Car, Landmark, BookOpen, Users, Heart, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/testimonialsData";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import BookingModal from "@/components/booking/BookingModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const DarshanBookingPage = () => {
    const { slug } = useParams();
    const [temple, setTemple] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("About");

    const scrollToSection = (sectionId: string) => {
        setActiveTab(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -140; // Adjust for sticky header + nav
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (!slug) return;
        fetch(getApiUrl(`/api/darshan/${slug}`))
            .then(res => res.json())
            .then(data => {
                if (data.message || !data.name) {
                    console.error("Temple not found:", data);
                    setTemple(null);
                    setLoading(false);
                    return;
                }
                setTemple(data);
                setLoading(false);

                // SEO Updates
                if (data.seoTitle) document.title = data.seoTitle;
                if (data.seoDescription) {
                    let metaDescription = document.querySelector('meta[name="description"]');
                    if (!metaDescription) {
                        metaDescription = document.createElement('meta');
                        metaDescription.setAttribute('name', 'description');
                        document.head.appendChild(metaDescription);
                    }
                    metaDescription.setAttribute('content', data.seoDescription);
                }
                if (data.seoKeywords) {
                    let metaKeywords = document.querySelector('meta[name="keywords"]');
                    if (!metaKeywords) {
                        metaKeywords = document.createElement('meta');
                        metaKeywords.setAttribute('name', 'keywords');
                        document.head.appendChild(metaKeywords);
                    }
                    metaKeywords.setAttribute('content', data.seoKeywords);
                }
            })
            .catch(err => {
                console.error("Failed to fetch temple:", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!temple) return <div className="min-h-screen flex items-center justify-center">Temple not found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                title={`${temple?.name || "Temple"} | Namandarshan`}
                description={temple?.seoDescription || `${(temple?.description || "").substring(0, 150)}...`}
                keywords={temple?.seoKeywords || ["Darshan Booking", temple?.name || "Temple", temple?.location || "India", "Temple Darshan", "Online Booking"]}
                image={temple?.image || ""}
            />
            <Header />
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                type="darshan"
                serviceName={temple ? temple.name : ""}
            />

            {/* New Hero Section */}
            <div className="container mx-auto px-6 md:px-16 pt-40 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Image */}
                    <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={temple.image}
                            alt={temple.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-orange-600 font-medium">
                            <MapPin className="w-5 h-5" />
                            <span>{temple.location}</span>
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            {temple.name}
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {temple.description}
                        </p>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 py-2">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                        <img
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-orange-500 font-bold text-lg">
                                <Star className="w-5 h-5 fill-current" />
                                <span>4.7</span>
                                <span className="text-muted-foreground font-normal text-base ml-1">(14K+ ratings)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 italic">
                            Experience the peace of Divine Grace with Temple Whisperer.
                        </p>

                        <Button
                            className="w-full md:w-auto px-8 py-6 text-xl font-bold bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all rounded-xl"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="flex items-center justify-center gap-8 overflow-x-auto py-4">
                        {["About", "Timings", "What We Provide", "Why Us", "Reviews", "Info & FAQs"].map((tab) => (
                            <button
                                key={tab}
                                className={`text-sm md:text-base font-bold whitespace-nowrap pb-1 border-b-2 transition-all ${activeTab === tab
                                    ? "text-orange-500 border-orange-500"
                                    : "text-gray-600 border-transparent hover:text-orange-500"
                                    }`}
                                onClick={() => scrollToSection(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <main className="flex-grow container mx-auto px-6 md:px-16 py-16 space-y-24">

                {/* About Section */}
                <section id="About" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-6 flex items-center gap-3">
                        <span className="text-3xl">🕉</span>
                        About {temple.name}
                    </h2>
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p className="whitespace-pre-line">{temple.description}</p>
                        {temple.historyArchitectureDesc && (
                            <p className="whitespace-pre-line">{temple.historyArchitectureDesc}</p>
                        )}

                    </div>
                </section>

                {/* Timings Section */}
                {/* Timings Section */}
                <section id="Timings" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-2">
                        <Clock className="w-8 h-8" />
                        Darshan & Seva Timings
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Schedule */}
                        <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-6">Temple Schedule</h3>
                            <div className="space-y-4 text-gray-700">
                                {temple.schedule && temple.schedule.length > 0 ? (
                                    temple.schedule.map((slot: any, index: number) => (
                                        <div key={index} className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                            <span className="font-medium">{slot.label}:</span>
                                            <span>{slot.time}</span>
                                        </div>
                                    ))
                                ) : (
                                    // Fallback if no dynamic schedule (Backward Compatibility)
                                    <>
                                        <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                            <span className="font-medium">Temple Opens:</span>
                                            <span>5:15 AM</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                            <span className="font-medium">Suprabhatha Seva:</span>
                                            <span>5:30 AM – 6:00 AM</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                            <span className="font-medium">Modati Aradhana (Break):</span>
                                            <span>7:00 AM – 7:30 AM</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                            <span className="font-medium">Temple Closes:</span>
                                            <span>8:45 PM</span>
                                        </div>
                                        <div className="mt-4 p-4 bg-yellow-50 text-amber-800 text-sm rounded-lg">
                                            Note: This is default schedule. Please update in Admin Panel.
                                        </div>
                                    </>
                                )}
                            </div>

                            <p className="text-red-500 text-sm mt-6 font-medium">
                                Note: <span className="text-gray-600 font-normal">Timings might change on festival days.</span>
                            </p>
                        </div>

                        {/* Right Column - Map/Image */}
                        <div className="flex flex-col items-center">
                            <div className="w-full aspect-video bg-amber-50 rounded-xl border-4 border-double border-amber-200 overflow-hidden shadow-inner flex items-center justify-center relative">
                                <img
                                    src={temple.mapImage || "https://t4.ftcdn.net/jpg/04/14/66/60/360_F_414666045_L7y5u0b1h1d3b0b1h1d3b0b1h1d3b0b1.jpg"} // Use dynamic or placeholder
                                    alt="Temple Map"
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="bg-white/80 px-3 py-1 rounded text-xs font-bold text-amber-900 shadow-sm border border-amber-200">Map View</span>
                                </div>
                            </div>
                            <a
                                href={temple.googleMapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.name + " " + temple.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 text-orange-500 font-bold hover:underline"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                </section>

                {/* What We Provide Section */}
                <section id="What We Provide" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
                        <HandHeart className="w-8 h-8" />
                        What Naman Darshan Provides
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Personal Pickup Assistance",
                                desc: "Pickup from nearby temple points or pre-decided locations.",
                                icon: <Car className="w-8 h-8 text-orange-500" />
                            },
                            {
                                title: "Temple Darshan Guidance",
                                desc: "Complete step-by-step assistance from entry to exit.",
                                icon: <Landmark className="w-8 h-8 text-orange-500" />
                            },
                            {
                                title: "Spiritual Orientation",
                                desc: "Brief explanation of temple history, Ramayana connection, and ritual importance.",
                                icon: <BookOpen className="w-8 h-8 text-orange-500" />
                            },
                            {
                                title: "Crowd Navigation Support",
                                desc: "Smooth queue management and assistance during peak hours.",
                                icon: <Users className="w-8 h-8 text-orange-500" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-orange-50/50 p-8 rounded-xl border border-orange-100/50">
                                <div className="mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Button
                            size="lg"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            Book {(temple?.name || "").split(' ')[0]} Darshan
                        </Button>
                    </div>
                </section>

                {/* Why Us Section */}
                <section id="Why Us" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
                        <Heart className="w-8 h-8 fill-current" />
                        Why Choose Naman Darshan
                    </h2>
                    <ul className="space-y-4">
                        {[
                            "Trusted local temple assistance",
                            "Experienced spiritual coordinators",
                            "Transparent pricing",
                            "Devotee-first service approach",
                            "Respectful and professional guidance"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-lg font-bold text-gray-800">
                                <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Reviews Section */}
                <section id="Reviews" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-2">
                        <span className="w-1.5 h-8 bg-orange-500 rounded-full"></span>
                        Pilgrim Reviews
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.slice(0, 3).map((testimonial) => (
                            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic flex-grow">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{testimonial.name}</p>
                                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Info & FAQs Section */}
                <section id="Info & FAQs" className="scroll-mt-32">
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <span className="w-1.5 h-8 bg-orange-500 rounded-full"></span>
                        Info & FAQs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {temple.faqs && temple.faqs.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {temple.faqs.map((faq: any, index: number) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-b-0 mb-4 rounded-xl bg-gray-50 px-4">
                                            <AccordionTrigger className="text-left font-semibold hover:text-orange-600 hover:no-underline">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <p className="text-muted-foreground">No FAQs available.</p>
                            )}
                        </div>
                        <div className="space-y-6">
                            {/* Location Sidebar removed */}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default DarshanBookingPage;
