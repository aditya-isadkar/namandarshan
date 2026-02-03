import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import PujaCard from "./components/PujaCard";


import { pujas } from "./data";



import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterBar from "@/components/common/FilterBar";

const Puja = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("all");

    // Extract unique locations/states
    // Since location can be "Online / Temple" or "Kashi / Kedarnath / Home", we might want to just list them as is or split.
    // For simplicity and consistency with UI, let's list distinct strings first.
    const states = Array.from(new Set(pujas.map(p => p.location))).sort();

    const filteredPujas = pujas.filter(puja => {
        const matchesSearch = puja.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            puja.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || puja.location === selectedState; // Exact match for dropdown or partial? FilterBar uses exact value.
        // If we want partial match in location (e.g. choose "Kashi" finding "Kashi / Kedarnath"), we need to change logic.
        // Let's stick to simple logic or improve if needed. given "Kashi / Kedarnath / Home", user might want to filter by "Kashi".
        // State extraction above just takes full string.

        return matchesSearch && matchesState;
    });

    const heroSlides = [
        {
            id: "shiv-rudrabhishek-puja",
            image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115078/Gemini_Generated_Image_y6utrty6utrty6ut_x8hlhj.png",
            subtitle: "MAHADEV ARADHANA",
            title: "Shiv Rudrabhishek",
            buttonText: "SEEK DIVINE BLESSINGS"
        },
        {
            id: "sunderkand-path-puja",
            image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115072/Gemini_Generated_Image_obzwdrobzwdrobzw_xff0xs.png",
            subtitle: "BAJRANG BALI KRIPA",
            title: "Shri Sunderkand Path",
            buttonText: "ENTER FOR SHUBH SANKALP"
        },
        {
            id: "maha-shakti-tridevi-puja",
            image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115090/Gemini_Generated_Image_2kqx2p2kqx2p2kqx_mz29pb.png",
            subtitle: "SHAKTI INVOCATION",
            title: "Maha Shakti Tridevi Puja",
            buttonText: "RECEIVE DIVINE PROTECTION"
        },
        {
            id: "maha-laxmi-mata-puja",
            image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115084/Gemini_Generated_Image_vtrtn1vtrtn1vtrt_scwv8g.png", // Using placeholder, can be updated if specific laxmi image exists
            subtitle: "SHRI-ABUNDANCE",
            title: "Maha Laxmi Mata Puja",
            buttonText: "INVOKE PROSPERITY"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Online Puja Booking"
                keywords={["Online Puja", "Vedic Rituals", "E-Puja", "Rudrabhishek Online", "Hindu Ceremonies"]}
                description="Book authentic online puja rituals performed by qualified pandits. Get video recording and prasad delivered to your home."
            />
            <Header />
            <main className="flex-grow pt-28 lg:pt-36 pb-16"> {/* Adjusted padding to match fixed header height (10rem on desktop) */}

                {/* Hero Carousel Section */}
                <div className="relative w-full h-[80vh] mb-16 bg-black">
                    <Carousel
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        className="w-full h-full"
                    >
                        <CarouselContent className="-ml-0 h-full">
                            {heroSlides.map((slide, index) => (
                                <CarouselItem key={index} className="pl-0 h-full basis-full">
                                    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden group">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}

                                        {/* Content Overlay */}
                                        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 space-y-4">
                                            <span className="text-orange-500 font-bold tracking-[0.15em] text-sm md:text-lg uppercase drop-shadow-md">
                                                {slide.subtitle}
                                            </span>

                                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-tight leading-tight">
                                                {slide.title}
                                            </h1>

                                            <button
                                                onClick={() => navigate(`/puja/${slide.id}`)}
                                                className="bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-500/20 transition-all transform hover:-translate-y-1 tracking-widest uppercase mt-4"
                                            >
                                                {slide.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>


                {/* Puja Grid */}
                <div className="container mx-auto px-4 mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-1 flex-grow mr-6 bg-gradient-to-l from-orange-200 to-transparent rounded-full" />
                        <h2 className="font-display text-3xl font-bold text-primary">🕉️ Sacred Offerings 🕉️</h2>
                        <div className="h-1 flex-grow mx-6 bg-gradient-to-r from-orange-200 to-transparent rounded-full" />
                    </div>

                    <FilterBar
                        onSearch={setSearchQuery}
                        onStateChange={setSelectedState}
                        states={states}
                        placeholder="Search pujas..."
                        className="mb-10 max-w-4xl mx-auto"
                    />

                    {filteredPujas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPujas.map((puja, index) => (
                                <PujaCard key={index} {...puja} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-stone-500">
                            No pujas found matching your criteria.
                        </div>
                    )}
                </div>

                {/* How Booking Works */}
                <div className="bg-orange-50/50 py-16 mb-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="font-display text-3xl font-bold text-primary mb-10">How Booking Works</h2>

                        <div className="space-y-6 text-gray-700">
                            <p className="leading-relaxed"><span className="font-bold text-gray-900">1. Choose a Puja — </span> Click Details & Sankalp on the puja card and fill the Sankalp form (devotee name, gotra, names to be chanted, date preference, and any special requests).</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">2. Submit Request — </span> Submit the form to create a provisional booking request. You will receive an automated acknowledgement email or SMS with a reference number.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">3. Sewa Team Contact — </span> Our Sewa team contacts you to confirm Sankalp details, clarify gotra and name pronunciations, confirm the puja date/time, and explain payment options. They also confirm whether you want a real-time video, recorded video, or both.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">4. Order Booking — </span> After confirmation and payment, your booking is finalized. You receive a booking confirmation with a unique order ID and expected puja schedule.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">5. Real Video and Gotra Names — </span> On completion, we provide a high-quality recorded video of the puja. The recording includes the priest chanting the Sankalp and the gotra/names you provided. For live-streamed pujas, a link or private viewing window is shared at the scheduled time.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">6. Ticket Bookings — </span> For special temple events or limited darshan slots, we issue digital tickets linked to your booking ID. Tickets are delivered via email and can be shown on arrival or used for priority access where applicable.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">7. Shraddha Box Delivery — </span> If you opt for a Shraddha Box, it is prepared with prasad and ritual items blessed during the puja and dispatched to the address you provided. Tracking details are shared after dispatch.</p>

                            <p className="leading-relaxed"><span className="font-bold text-gray-900">8. Follow-up — </span> After the puja, our Sewa team confirms delivery of the video and Shraddha Box, and records any feedback or additional requests for future services.</p>

                            <div className="leading-relaxed mt-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">Sewa Team Contact</h1>
                                Our Sewa team will reach out from an official NAMANDARSHAN number or email. Typical contact steps: confirmation call or WhatsApp message, payment guidance, and final puja schedule confirmation. If you prefer a specific contact method, mention it in the Sankalp form.
                            </div>

                            <div className="leading-relaxed mt-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">Notes on Gotra and Names</h1>
                                Please provide correct spellings and, if possible, phonetic hints for names and gotra to ensure accurate chanting. If you have a family priest or specific tradition, mention it in the Sankalp form and we will accommodate where possible.
                            </div>

                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="container mx-auto px-4 mb-24 max-w-4xl">
                    <h2 className="font-display text-4xl font-bold text-center text-amber-900 mb-12">
                        <span className="text-red-600 mr-2">?</span> Frequently Asked Questions <span className="text-red-600 ml-2">?</span>
                    </h2>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">How do I book a Puja?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                Choose the puja, click Details & Sankalp, fill the Sankalp form with names, gotra, date preference and submit. Our Sewa team will confirm and guide payment.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">What happens after I submit the Sankalp form?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                You receive an acknowledgement. The Sewa team calls or messages to confirm details, finalize the date/time, and provide payment instructions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">Will I receive a real video of the puja?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                Yes. We provide a recorded video of the puja that includes the Sankalp and chanting of the names and gotra. Live-stream options are available for select pujas.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">What is included in the Shraddha Box?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                The Shraddha Box contains prasad, blessed items used in the puja, and a small guide on how to complete any home rituals. Contents vary by puja and are listed on the puja details page.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">How are Gotra names handled in chanting?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                Priests chant the gotra and names exactly as provided. For clarity, include phonetic spelling if the name is uncommon. We confirm pronunciations during the Sewa team call.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-orange-600">How do ticket bookings work for special events?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed bg-[#FFFBEB] p-4 rounded-md">
                                For special events, digital tickets are issued after payment. Tickets include event time, entry instructions, and your booking ID. Present the ticket on arrival or use it for priority access.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>


            </main>
            <Footer />
        </div>
    );
};

export default Puja;
