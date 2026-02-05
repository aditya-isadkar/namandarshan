import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { newsData } from "@/data/newsData";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, Ticket, ArrowRight, Home, Info, Heart, Share2, Star, ChevronRight, Flower, ShoppingBag } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import BookingModal from "@/components/booking/BookingModal";
import RequestServiceModal from "@/components/booking/RequestServiceModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { offerings } from "@/pages/Chadhava/data";
import { prasadams } from "@/pages/Prasadam/data";
import SEO from "@/components/SEO";
import { getApiUrl } from "@/utils/api";

const TempleDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [temple, setTemple] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Request Modal State
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestServiceType, setRequestServiceType] = useState<"Chadhava" | "Prasadam">("Chadhava");

    const handleChadhavaClick = () => {
        if (!temple) return;

        // Extract meaningful keywords from temple name
        const templeKeywords = temple.name.toLowerCase().split(/\s+/)
            .filter((w: string) => w.length > 3 && !['temple', 'shree', 'mandir', 'seva', 'pooja', 'darshan'].includes(w));

        // Find existing Chadhava offering using keyword matching
        const foundOffering = offerings.find(o => {
            const offeringKeywords = [
                ...o.name.toLowerCase().split(/\s+/),
                ...(o.templeName ? o.templeName.toLowerCase().split(/\s+/) : [])
            ];

            // Check if any significant temple keyword exists in offering keywords
            return templeKeywords.some((dw: string) => offeringKeywords.some(ow => ow.includes(dw) || dw.includes(ow)));
        });

        if (foundOffering) {
            navigate(`/chadhava/${foundOffering.id}`);
        } else {
            setRequestServiceType("Chadhava");
            setIsRequestModalOpen(true);
        }
    };

    const handlePrasadamClick = () => {
        if (!temple) return;

        // Extract meaningful keywords from temple name
        const templeKeywords = temple.name.toLowerCase().split(/\s+/)
            .filter((w: string) => w.length > 3 && !['temple', 'shree', 'mandir', 'seva', 'pooja', 'darshan'].includes(w));

        // Find existing Prasadam using keyword matching
        const foundPrasadam = prasadams.find(p => {
            const prasadamKeywords = [
                ...p.title.toLowerCase().split(/\s+/),
                ...p.templeName.toLowerCase().split(/\s+/),
                ...p.location.toLowerCase().split(/\s+/)
            ];

            // Check if any significant temple keyword exists in prasadam keywords
            return templeKeywords.some((dw: string) => prasadamKeywords.some(pw => pw.includes(dw) || dw.includes(pw)));
        });

        if (foundPrasadam) {
            navigate(`/prasadam/${foundPrasadam.id}`);
        } else {
            setRequestServiceType("Prasadam");
            setIsRequestModalOpen(true);
        }
    };

    useEffect(() => {
        if (!slug) return;
        fetch(getApiUrl(`/api/temples/${slug}`))
            .then(res => res.json())
            .then(data => {
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
                title={`${temple.name} | Namandarshan`}
                description={temple.seoDescription || `Complete guide to ${temple.name}, ${temple.location}. Timings, History, and Online Darshan Booking.`}
                keywords={temple.seoKeywords || [temple.name, "Temple Darshan", "Online Booking", temple.location]}
                image={temple.image}
            />
            <Header />
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                type="temple"
                serviceName={temple ? temple.name : ""}
            />
            <RequestServiceModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                templeName={temple ? temple.name : ""}
                serviceType={requestServiceType}
            />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full mt-20">
                <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white p-4 animate-fade-up">
                        <div className="flex items-center justify-center gap-2 mb-4 text-sm md:text-base bg-white/20 backdrop-blur-sm w-fit mx-auto px-4 py-1 rounded-full border border-white/30">
                            <MapPin className="w-4 h-4" />
                            {temple.location}
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                            {temple.name}
                        </h1>
                        <p className="font-display text-xl md:text-2xl italic opacity-90">
                            Experience the Divine
                        </p>

                        {/* Offering Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            <Button
                                onClick={handleChadhavaClick}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-orange-900/50 transition-all hover:scale-105 flex items-center gap-2 border border-white/10"
                            >
                                <Flower className="w-5 h-5" />
                                Book Chadhava
                            </Button>
                            <Button
                                onClick={handlePrasadamClick}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-amber-900/50 transition-all hover:scale-105 flex items-center gap-2 border border-white/10"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Get Prasadam
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-muted py-4 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/temples" className="hover:text-primary transition-colors">Temples</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{temple.name}</span>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="font-display text-3xl font-bold text-primary mb-6">About {temple.name}</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                                {temple.description}
                            </p>


                            {temple.historyArchitectureDesc && (
                                <div className="mt-12 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                                    <h2 className="font-display text-3xl font-bold text-center mb-8 text-orange-600 italic">
                                        Historical background and Architectural splendor
                                    </h2>
                                    <div className="clearfix">
                                        {temple.historyArchitectureImage && (
                                            <div className="md:w-1/3 w-full md:float-right md:ml-8 mb-6">
                                                <img
                                                    src={temple.historyArchitectureImage}
                                                    alt="Historical Architecture"
                                                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="text-lg leading-relaxed text-muted-foreground text-justify">
                                            {temple.historyArchitectureDesc}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {temple.religiousSignificanceDesc && (
                                <div className="mt-12 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                    <h2 className="font-display text-3xl font-bold text-center mb-8 text-orange-600 italic">
                                        Religious Significance
                                    </h2>
                                    <div className="clearfix">
                                        {temple.religiousSignificanceImage && (
                                            <div className="md:w-1/3 w-full md:float-right md:ml-8 mb-6">
                                                <img
                                                    src={temple.religiousSignificanceImage}
                                                    alt="Religious Significance"
                                                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="text-lg leading-relaxed text-muted-foreground text-justify">
                                            {temple.religiousSignificanceDesc}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {temple.festivalCelebrationsDesc && (
                                <div className="mt-12 bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                    <h2 className="font-display text-3xl font-bold text-center mb-8 text-orange-600 italic">
                                        Festival and Celebrations
                                    </h2>
                                    <div className="clearfix">
                                        {temple.festivalCelebrationsImage && (
                                            <div className="md:w-1/3 w-full md:float-right md:ml-8 mb-6">
                                                <img
                                                    src={temple.festivalCelebrationsImage}
                                                    alt="Festival and Celebrations"
                                                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="text-lg leading-relaxed text-muted-foreground text-justify">
                                            {temple.festivalCelebrationsDesc}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {temple.surroundingsDesc && (
                                <div className="mt-12 mb-12">
                                    <h2 className="font-display text-3xl font-bold text-left mb-8 text-blue-600 uppercase">
                                        Surroundings Area & <br /> <span className="text-orange-500">Attractions</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {temple.surroundingsDesc.split('\n').map((line: string, index: number) => {
                                            const parts = line.split(':');
                                            if (parts.length > 1) {
                                                const title = parts[0];
                                                const content = parts.slice(1).join(':');
                                                return (
                                                    <p key={index} className="text-lg text-muted-foreground">
                                                        <span className="font-bold text-gray-900">{title} :</span>
                                                        {content}
                                                    </p>
                                                );
                                            }
                                            return <p key={index} className="text-lg text-muted-foreground">{line}</p>;
                                        })}
                                    </div>
                                </div>
                            )}

                            {temple.faqs && temple.faqs.length > 0 && (
                                <div className="mt-12 mb-12">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-1.5 h-10 bg-orange-500 rounded-full"></div>
                                        <h2 className="font-display text-3xl font-bold uppercase text-gray-900">
                                            FAQ
                                        </h2>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full">
                                        {temple.faqs.map((faq: any, index: number) => (
                                            <AccordionItem key={index} value={`item-${index}`} className="border-b-0 mb-4 rounded-lg bg-blue-50/50 px-4">
                                                <AccordionTrigger className="text-left font-semibold text-blue-600 hover:text-blue-700 hover:no-underline">
                                                    {index + 1}. {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div
                            className="bg-card border rounded-xl p-6 shadow-sm sticky top-36"
                        >
                            <h3 className="font-display text-2xl font-bold mb-6">Visitor Information</h3>



                            {temple.liveDarshanUrl && (
                                <a
                                    href={temple.liveDarshanUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full mb-6"
                                >
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full text-lg font-bold shadow-lg hover:shadow-xl transition-all border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 animate-pulse"
                                    >
                                        OFFICIAL LIVE DARSHAN PORTAL - Watch Live
                                    </Button>
                                </a>
                            )}

                            <div className="space-y-4 mb-8">
                                {temple.entryFee && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                        <div className="w-5 h-5 mt-1 text-primary font-bold text-center">₹</div>
                                        <div>
                                            <p className="font-semibold">Entry Fee:</p>
                                            <p className="text-sm text-muted-foreground">{temple.entryFee}</p>
                                        </div>
                                    </div>
                                )}

                                {temple.darshanTimings && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                        <Clock className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <p className="font-semibold">Darshan Timings:</p>
                                            <p className="text-sm text-muted-foreground">{temple.darshanTimings}</p>
                                        </div>
                                    </div>
                                )}

                                {temple.address && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                        <MapPin className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <p className="font-semibold">Address:</p>
                                            <p className="text-sm text-muted-foreground">{temple.address}</p>
                                        </div>
                                    </div>
                                )}

                                {temple.notableEvents && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                        <Calendar className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <p className="font-semibold">Notable Events And Incidents:</p>
                                            <p className="text-sm text-muted-foreground">{temple.notableEvents}</p>
                                        </div>
                                    </div>
                                )}

                                {temple.connectivity && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                        <MapPin className="w-5 h-5 text-primary mt-1" />
                                        <div className="w-full">
                                            <p className="font-semibold mb-1">Connectivity:</p>
                                            <div className="text-sm text-muted-foreground space-y-2">
                                                {temple.connectivity.split('\n').filter((l: string) => l.trim()).map((line: string, index: number) => {
                                                    const parts = line.split(':');
                                                    if (parts.length > 1) {
                                                        return (
                                                            <p key={index}>
                                                                <span className="font-bold text-gray-900">{parts[0]}:</span>
                                                                {parts.slice(1).join(':')}
                                                            </p>
                                                        );
                                                    }
                                                    return <p key={index}>{line}</p>;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                size="lg"
                                className="w-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                                onClick={() => setIsBookingOpen(true)}
                            >
                                Book VIP Darshan
                            </Button>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                100% Secure Booking • Instant Confirmation
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TempleDetails;
