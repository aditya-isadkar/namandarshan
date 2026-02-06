import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApiUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, ChevronRight, Star, HandHeart, Car, Landmark, BookOpen, Users, Heart, CheckCircle2, AlarmClock } from "lucide-react";
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
            <div className="container mx-auto px-6 md:px-16 pt-48 pb-8">
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
                            Divine Darshan at {temple.name}
                        </h1>

                        {temple.subtitle && (
                            <p className="text-xl text-orange-600 font-medium">{temple.subtitle}</p>
                        )}

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
                            Experience the peace of Divine Grace with Namandarshan.
                        </p>

                        <Button
                            className="w-full md:w-auto px-8 py-6 text-xl font-bold bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all rounded-xl"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            {temple.ctaText || "Book Now"}
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


                {/* Trust Points Section (New) */}
                {temple.trustPoints && temple.trustPoints.length > 0 && (
                    <section className="mt-8 px-4 py-6 bg-orange-50/50 rounded-2xl border border-orange-100">
                        <ul className="space-y-3">
                            {temple.trustPoints.map((point: string, idx: number) => {
                                const isBookCta = point.toLowerCase().includes("book");
                                let icon = <CheckCircle2 className="w-5 h-5 text-gray-700" />;
                                let className = "text-gray-700 font-medium flex items-start gap-3 text-lg";

                                if (point.toLowerCase().includes("trusted")) {
                                    icon = <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
                                    className = "text-gray-800 font-bold flex items-start gap-3 text-xl";
                                } else if (isBookCta) {
                                    icon = <span className="text-2xl">👉</span>;
                                    className = "text-orange-600 font-bold flex items-center gap-3 text-xl mt-2 cursor-pointer hover:bg-orange-100 p-2 rounded-lg transition-colors -ml-2";
                                } else {
                                    icon = <span className="text-xl font-bold text-gray-700">✓</span>;
                                }

                                return (
                                    <li
                                        key={idx}
                                        className={className}
                                        onClick={isBookCta ? () => setIsBookingOpen(true) : undefined}
                                    >
                                        <span className="mt-1 flex-shrink-0">{icon}</span>
                                        <span>{point}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                {/* Significance Section (New) */}
                {temple.significance && (temple.significance.title || temple.significance.description || (temple.significance.points && temple.significance.points.length > 0)) && (
                    <section>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-6 flex items-center gap-3">
                            <span className="text-3xl">✨</span>
                            {temple.significance.title || `Significance of ${temple.name}`}
                        </h2>
                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                            {temple.significance.description && <p>{temple.significance.description}</p>}
                            {temple.significance.points && temple.significance.points.length > 0 && (
                                <ul className="list-disc pl-6 space-y-2">
                                    {temple.significance.points.map((point: string, idx: number) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                )}


                {/* Timings Section */}
                <section id="Timings" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-2">
                        <Clock className="w-8 h-8" />
                        {temple.scheduleSectionTitle || "Darshan & Seva Timings"}
                    </h2>

                    {temple.scheduleDescription && (
                        <p className="text-lg text-gray-700 mb-8 max-w-4xl leading-relaxed">
                            {temple.scheduleDescription}
                        </p>
                    )}

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
                                    <div className="text-gray-500 italic py-4">
                                        Timings will be updated soon.
                                    </div>
                                )}
                            </div>

                            {/* Summer Schedule */}
                            {temple.scheduleSummer && temple.scheduleSummer.length > 0 && (
                                <div className="mt-6 border-t pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Summer Schedule</h4>
                                    <div className="space-y-4 text-gray-700">
                                        {temple.scheduleSummer.map((slot: any, index: number) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                                <span className="font-medium">{slot.label}:</span>
                                                <span>{slot.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Winter Schedule */}
                            {temple.scheduleWinter && temple.scheduleWinter.length > 0 && (
                                <div className="mt-6 border-t pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Winter Schedule</h4>
                                    <div className="space-y-4 text-gray-700">
                                        {temple.scheduleWinter.map((slot: any, index: number) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-dashed border-gray-200">
                                                <span className="font-medium">{slot.label}:</span>
                                                <span>{slot.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {temple.scheduleNote && (
                                <div className="flex items-start gap-2 mt-6 text-gray-700 text-lg italic">
                                    <AlarmClock className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                                    <p>{temple.scheduleNote}</p>
                                </div>
                            )}
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

                {/* Darshan Options Section (New) */}
                {temple.darshanOptions && temple.darshanOptions.length > 0 && (
                    <section id="Options" className="scroll-mt-32">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
                            <Star className="w-8 h-8" />
                            {temple.darshanOptionsTitle || "Available Darshan Options"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {temple.darshanOptions.map((option: any, idx: number) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-xl text-gray-900 mb-3">{option.title}</h3>
                                    <p className="text-gray-600 mb-4">{option.description}</p>
                                    {option.price && (
                                        <div className="inline-block bg-orange-100/50 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {option.price}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* What We Provide Section */}
                <section id="What We Provide" className="scroll-mt-32">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-4 flex items-center gap-3">
                        <HandHeart className="w-8 h-8" />
                        {temple.services?.title || "What Naman Darshan Provides"}
                    </h2>
                    {temple.services?.description && (
                        <p className="text-lg text-gray-700 mb-8 w-full">
                            {temple.services.description}
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dynamic Services Rendering */}
                        {(temple.services?.items || []).map((item: any, idx: number) => (
                            <div key={idx} className="bg-orange-50/50 p-8 rounded-xl border border-orange-100/50">
                                <div className="mb-4">
                                    {/* Placeholder Icon */}
                                    <HandHeart className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                            </div>
                        ))}



                        {/* Fallback for legacy data if new services are empty */}
                        {(!temple.services?.items || temple.services.items.length === 0) && [
                            {
                                title: "Personal Pickup Assistance",
                                desc: "Pickup from nearby temple points or pre-decided locations.",
                                icon: <Car className="w-8 h-8 text-orange-500" />
                            },
                            // ... keep other items if really needed, or just rely on manual data entry
                        ].map((item, idx) => (
                            <div key={idx} className="bg-orange-50/50 p-8 rounded-xl border border-orange-100/50">
                                <div className="mb-4">{item.icon}</div>
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

                {/* Booking Process Section */}
                {temple.bookingProcess && temple.bookingProcess.length > 0 && (
                    <section id="BookingProcess" className="scroll-mt-32">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
                            <BookOpen className="w-8 h-8" />
                            {temple.bookingProcessTitle || "How to Book"}
                        </h2>
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-px before:h-full before:bg-gradient-to-b before:from-transparent before:via-orange-200 before:to-transparent">
                                {temple.bookingProcess.map((step: any, idx: number) => (
                                    <div key={idx} className="relative flex items-start gap-6 group">
                                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-colors z-10 shadow-sm font-bold text-orange-600 relative">
                                            {idx + 1}
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="font-bold text-xl text-gray-900 mb-2">{step.step}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Guidelines Section */}
                {temple.guidelines && temple.guidelines.length > 0 && (
                    <section id="Guidelines" className="scroll-mt-32">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
                            <CheckCircle2 className="w-8 h-8" />
                            {temple.guidelinesTitle || "Important Guidelines"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {temple.guidelines.map((guide: any, idx: number) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                                        <span className="text-orange-500 mt-1">✓</span>
                                        {guide.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed pl-6">
                                        {guide.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

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
        </div >
    );
};

export default DarshanBookingPage;
