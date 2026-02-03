import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Offering } from "./data";
import BookingModal from "./components/BookingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Sparkles, UserCheck, Video, ShieldCheck, Star, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getApiUrl } from "@/utils/api";

const ChadhavaDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [offering, setOffering] = useState<Offering | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [allOfferings, setAllOfferings] = useState<Offering[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOffering = async () => {
            if (!slug) return;
            try {
                const response = await fetch(getApiUrl(`/api/chadhava/${slug}`));
                if (response.ok) {
                    const data = await response.json();
                    setOffering(data);
                } else {
                    navigate("/chadhava");
                }
            } catch (error) {
                console.error("Failed to fetch chadhava details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAllOfferings = async () => {
            try {
                const response = await fetch(getApiUrl("/api/chadhava"));
                if (response.ok) {
                    const data = await response.json();
                    setAllOfferings(data);
                }
            } catch (error) {
                console.error("Failed to fetch all chadhava offerings:", error);
            }
        };

        fetchOffering();
        fetchAllOfferings();
    }, [slug, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!offering) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                title={offering.seoTitle || `${offering.name} - ${offering.templeName}`}
                keywords={offering.seoKeywords || ["Chadhava", "Temple Offering", "Online Donation", "Hindu Rituals", offering.name, offering.templeName]}
                description={offering.seoDescription || `Offer ${offering.name} at ${offering.templeName}. ${offering.description}`}
                image={offering.image}
            />
            <Header />

            <div className="flex-grow container mx-auto px-4 md:px-8 py-8 mt-20 md:mt-24">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-muted-foreground hover:text-orange-600 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">

                    {/* Left Column: Image */}
                    <div className="space-y-8 animate-fade-in">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                            <img
                                src={offering.image}
                                alt={offering.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                {offering.tag}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line mt-8">
                                {offering.longDescription || offering.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Title, Features, CTA */}
                    <div className="space-y-8 animate-slide-up">
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1a365d] mb-6 leading-tight">
                                {offering.name}
                            </h1>
                        </div>

                        {/* Seva Inclusions */}
                        {offering.features && (
                            <div className="space-y-4">
                                <h3 className="font-display text-xl font-bold text-gray-900">Seva Inclusions</h3>
                                <div className="border border-dashed border-gray-300 rounded-xl p-6">
                                    <div className="space-y-4">
                                        {offering.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="bg-[#22C55E] rounded-full p-1 flex-shrink-0">
                                                    <Check className="w-3 h-3 text-white stroke-[3]" />
                                                </div>
                                                <span className="text-gray-700 font-medium text-base">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="mt-8">
                            <div className="flex flex-col items-start gap-6">
                                <Button
                                    size="lg"
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-[#FF7F50] hover:bg-[#FF6347] text-white rounded-full px-10 py-7 text-lg font-bold shadow-lg hover:shadow-orange-200"
                                >
                                    Book Seva Now <Sparkles className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Power/Significance Box */}
                        {offering.significance && (
                            <div className="bg-[#FFF5F1] border-l-4 border-[#EA580C] rounded-r-xl p-6 mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[#EA580C] font-bold text-2xl">ॐ</span>
                                    <h3 className="font-display text-lg font-bold text-[#9A3412] uppercase tracking-wide">
                                        POWER OF {offering.name.split(' ')[0].toUpperCase()}
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {offering.significance.map((item, idx) => (
                                        <div key={idx}>
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                <span className="font-bold text-gray-900">{item.title}:</span> {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trust Indicators */}
                        <div className="border border-dashed border-gray-200 rounded-xl p-6 mt-8">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <UserCheck className="w-8 h-8 text-orange-500" />
                                    <span className="text-xs md:text-sm font-bold text-gray-600">Verified Pandits</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Video className="w-8 h-8 text-orange-500" />
                                    <span className="text-xs md:text-sm font-bold text-gray-600">Live Sankalp Proof</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <ShieldCheck className="w-8 h-8 text-orange-500" />
                                    <span className="text-xs md:text-sm font-bold text-gray-600">100% Authentic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Significance (Full Width Below) */}


                {/* Other Offerings / Related */}
                <div className="mt-24 pt-16 border-t border-gray-100">
                    <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-12">Other Sacred Offerings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {allOfferings
                            .filter(o => o.id !== offering.id)
                            .map(item => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/chadhava/${item.id}`)}
                                >
                                    <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                                    <span className="text-sm font-bold text-orange-500 mt-1 inline-block">{item.tag}</span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Devotee Experiences */}
                {offering.reviews && offering.reviews.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-gray-100">
                        <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-12">Devotee Experiences</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {offering.reviews.map((review, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                                            <p className="text-sm text-gray-500">{review.location}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                                            <span className="text-green-700 font-bold text-sm">{review.rating}</span>
                                            <Star className="w-3 h-3 text-green-700 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Frequently Asked Questions */}
                {offering.faqs && offering.faqs.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-gray-100 max-w-3xl mx-auto">
                        <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {offering.faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-orange-600 text-lg">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}

            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedOffering={offering}
            />

            <Footer />
        </div>
    );
};

export default ChadhavaDetails;
