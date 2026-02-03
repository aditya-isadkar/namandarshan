import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import PrasadamCard from "./components/PrasadamCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getApiUrl } from "@/utils/api";

import { useAuth } from "@/context/AuthContext";

const PrasadamDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [prasadam, setPrasadam] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [pageLoading, setPageLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        whatsapp: "",
        address: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || ""
            }));
        }
    }, [user]);

    // Fetch Prasadam Details
    useEffect(() => {
        const fetchPrasadam = async () => {
            if (!slug) return;
            try {
                const response = await fetch(getApiUrl(`/api/prasadams/${slug}`));
                if (response.ok) {
                    const data = await response.json();
                    setPrasadam(data);
                } else {
                    setPrasadam(null);
                }
            } catch (error) {
                console.error("Failed to fetch prasadam details:", error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchPrasadam();
    }, [slug]);

    // Fetch related prasadams for "Other Divine Offerings" section
    const [otherPrasadams, setOtherPrasadams] = useState([]);
    useEffect(() => {
        const fetchOthers = async () => {
            try {
                const response = await fetch(getApiUrl("/api/prasadams"));
                if (response.ok) {
                    const data = await response.json();
                    setOtherPrasadams(data);
                }
            } catch (error) {
                console.error("Failed to fetch other prasadams:", error);
            }
        };
        fetchOthers();
    }, []);

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!prasadam) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-stone-900 mb-4">Prasadam Not Found</h2>
                    <Button onClick={() => navigate("/prasadam")}>Back to Prasadam</Button>
                </div>
            </div>
        );
    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const orderData = {
            prasadamId: prasadam.id,
            prasadamTitle: prasadam.title,
            quantity,
            userDetails: {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                whatsapp: formData.whatsapp,
                address: formData.address
            }
        };

        try {
            console.log("Submitting Order Data:", orderData);
            const res = await fetch(getApiUrl("/api/orders"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });
            console.log("Response Status:", res.status);

            if (res.ok) {
                toast.success(`Order for ${quantity} packs of ${prasadam.title} placed successfully!`);
                const message = `Namaste 🙏\n\nI want to order Prasadam.\n\n*Name:* ${formData.name}\n*Prasadam:* ${prasadam.title}\n*Quantity:* ${quantity}\n*Address:* ${formData.address}\n\nPlease process my order.`;
                const whatsappLink = `https://api.whatsapp.com/send/?phone=919311973199&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                window.open(whatsappLink, "_blank");
                setFormData({ name: "", mobile: "", email: "", whatsapp: "", address: "" });
                setQuantity(1);
            } else {
                const errorData = await res.json();
                console.error("Order failed:", errorData);
                toast.error(`Failed to place order: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Order error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title={prasadam.seoTitle || `${prasadam.title} - ${prasadam.templeName}`}
                description={prasadam.seoDescription || `Order ${prasadam.title} from ${prasadam.templeName}. ${prasadam.description}`}
                keywords={prasadam.seoKeywords || ["Prasadam", prasadam.title, prasadam.templeName, "Online Prasadam", "Home Delivery"]}
                image={prasadam.image}
            />
            <Header />
            <main className="flex-grow pt-52 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Image and Details */}
                        <div className="space-y-8">
                            {/* Product Image */}
                            <div className="rounded-3xl overflow-hidden shadow-xl bg-white relative aspect-square md:aspect-auto md:h-[500px] border border-stone-100">
                                <img
                                    src={prasadam.image}
                                    alt={prasadam.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6">
                                    <Badge className="bg-white/90 text-stone-900 hover:bg-white backdrop-blur-md px-4 py-2 text-base shadow-sm">
                                        <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                                        {prasadam.location}
                                    </Badge>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                                <h1 className="font-display text-4xl font-bold text-stone-900 mb-2">{prasadam.title}</h1>
                                <p className="text-lg text-orange-600 font-medium mb-6">{prasadam.templeName}</p>
                                <p className="text-stone-700 text-lg leading-relaxed mb-6">
                                    {prasadam.description}
                                </p>
                            </div>

                            {/* Inclusions / What's Inside */}
                            {prasadam.inclusions && (
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                                        <ShoppingBag className="w-6 h-6 text-orange-600" />
                                        What's Inside?
                                    </h2>
                                    <div className="space-y-6">
                                        {prasadam.inclusions.map((inc: any, idx: number) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="flex-shrink-0 mt-1">
                                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-stone-900 text-lg">{inc.item}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Significance of Offering */}
                            {prasadam.significance && (
                                <div className="bg-orange-50/50 rounded-xl p-8 border-l-4 border-orange-500 shadow-sm">
                                    <h2 className="font-display text-xl font-bold text-orange-700 mb-6 flex items-center gap-3 uppercase tracking-wide">
                                        <span className="text-2xl">🕉️</span>
                                        Significance of the Offering
                                    </h2>
                                    <div className="space-y-4">
                                        {prasadam.significance.map((sig: any, idx: number) => (
                                            <div key={idx}>
                                                <p className="text-stone-700 text-lg leading-relaxed">
                                                    <span className="font-bold text-stone-900">{sig.item}:</span> {sig.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Order Form */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
                                <div className="bg-orange-50 p-6 border-b border-orange-100">
                                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">Confirm Order 🛍️</h2>
                                    <p className="text-stone-600">Get divine blessings delivered home.</p>
                                </div>

                                <div className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Quantity Counter */}
                                        <div className="space-y-2">
                                            <Label className="text-stone-600 uppercase text-xs font-bold tracking-wider">Number of Boxes</Label>
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-12 w-12 rounded-xl border-stone-200"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                >
                                                    -
                                                </Button>
                                                <div className="h-12 flex-1 flex items-center justify-center font-bold text-xl bg-stone-50 rounded-xl border border-stone-200">
                                                    {quantity}
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-12 w-12 rounded-xl border-stone-200"
                                                    onClick={() => setQuantity(quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-stone-600 uppercase text-xs font-bold tracking-wider">Full Name *</Label>
                                            <Input
                                                id="name"
                                                required
                                                className="h-12 rounded-xl bg-stone-50 border-stone-200"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mobile" className="text-stone-600 uppercase text-xs font-bold tracking-wider">Mobile Number *</Label>
                                            <Input
                                                id="mobile"
                                                type="tel"
                                                required
                                                className="h-12 rounded-xl bg-stone-50 border-stone-200"
                                                placeholder="Your Calling Number"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-stone-600 uppercase text-xs font-bold tracking-wider">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                className="h-12 rounded-xl bg-stone-50 border-stone-200"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="whatsapp" className="text-stone-600 uppercase text-xs font-bold tracking-wider">WhatsApp Number *</Label>
                                            <Input
                                                id="whatsapp"
                                                type="tel"
                                                required
                                                className="h-12 rounded-xl bg-stone-50 border-stone-200"
                                                placeholder="For updates & photos"
                                                value={formData.whatsapp}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address" className="text-stone-600 uppercase text-xs font-bold tracking-wider">Delivery Address *</Label>
                                            <textarea
                                                id="address"
                                                required
                                                className="flex min-h-[100px] w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Full address with Pincode"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-7 text-xl rounded-full shadow-lg shadow-orange-200 mt-4 transition-all hover:scale-[1.02]"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Place Order Now"}
                                        </Button>

                                        <p className="text-center text-xs text-stone-500 mt-4 flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check w-4 h-4 text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                            100% Secure & Authentic
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Devotee Experiences */}
                {prasadam.reviews && (
                    <div className="container mx-auto px-4 max-w-6xl mt-24">
                        <h2 className="font-display text-3xl font-bold text-stone-900 mb-8">Devotee Experiences</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {prasadam.reviews.map((review, idx) => (
                                <div key={idx} className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-stone-900 inline-block mr-2">{review.name},</h4>
                                            <span className="text-stone-500 text-sm">{review.location}</span>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-stone-700 text-lg italic leading-relaxed">
                                        “{review.comment}”
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Frequently Asked Questions */}
                {prasadam.faqs && (
                    <div className="container mx-auto px-4 max-w-3xl mt-24">
                        <h2 className="font-display text-3xl font-bold text-stone-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {prasadam.faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-stone-200">
                                    <AccordionTrigger className="text-left font-medium text-stone-900 hover:text-orange-600 text-lg py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-stone-600 leading-relaxed pb-6 text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}

                {/* Other Divine Offerings */}
                <div className="container mx-auto px-4 max-w-6xl mt-24">
                    <div className="flex items-center justify-between mb-12">
                        <div className="h-1 flex-grow mr-6 bg-gradient-to-l from-orange-200 to-transparent rounded-full" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 text-center">Other Divine Offerings</h2>
                        <div className="h-1 flex-grow mx-6 bg-gradient-to-r from-orange-200 to-transparent rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPrasadams
                            .filter((p: any) => p.slug !== slug && p.id !== prasadam.id)
                            .map((item: any) => (
                                <PrasadamCard key={item.id} {...item} />
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrasadamDetails;
