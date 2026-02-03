import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video, CheckCircle2, HandHeart, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Offering } from "./data";
import ChadhavaCard from "./components/ChadhavaCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/utils/api";
import FilterBar from "@/components/common/FilterBar";

const Chadhava = () => {
    const navigate = useNavigate();
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        gotra: "",
        phone: "",
        temple: "Kashi Vishwanath (Default)"
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("all");

    useEffect(() => {
        const fetchOfferings = async () => {
            try {
                const response = await fetch(getApiUrl("/api/chadhava"));
                if (response.ok) {
                    const data = await response.json();
                    setOfferings(data);
                }
            } catch (error) {
                console.error("Failed to fetch chadhava offerings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOfferings();
    }, []);

    // Extract unique temple names for filtering
    const templeNames = Array.from(new Set(offerings.map(o => o.templeName))).sort();

    const filteredOfferings = offerings.filter(offering => {
        const matchesSearch = offering.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offering.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offering.templeName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || offering.templeName === selectedState; // Using templeName as "State" filter
        return matchesSearch && matchesState;
    });

    const handleBook = (offering: Offering) => {
        navigate(`/chadhava/${offering.slug || offering.id}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate booking
        setTimeout(() => {
            setIsModalOpen(false);
            toast({
                title: "Offering Confirmed! 🙏",
                description: `Your chadhava request for ${selectedOffering?.name} has been received.`,
            });
            setFormData({ name: "", gotra: "", phone: "", temple: "Kashi Vishwanath (Default)" });
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                title="Vedic Chadhava Offerings"
                keywords={["Chadhava", "Temple Offerings", "Online Pooja", "Hindu Rituals", "Vedic Chadhava", "Temple Donation"]}
                description="Make Vedic Chadhava offerings to India's most sacred temples from home. Authentic rituals with video proof."
            />
            <Header />

            {/* Hero Section */}
            <div className="container mx-auto px-8 md:px-24 pt-32 pb-24 md:pt-48 md:pb-32 mt-16">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Left Content */}
                    <div className="flex-1 text-left space-y-6">
                        <h1 className="font-display text-5xl md:text-6xl text-orange-500 font-normal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                            Vedic Chadhava Offerings
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                            Experience divine blessings from India's most sacred temples.
                            Perform rituals and offer Chadhava from the comfort of your home
                            with complete Vedic authenticity.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#FF7F50] hover:bg-[#FF6347] text-white rounded-full px-8 py-6 text-sm font-bold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            onClick={() => {
                                const element = document.getElementById('offerings-section');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Offerings
                        </Button>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full max-w-lg">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://res.cloudinary.com/dryickpre/image/upload/v1770115108/chadhawa-banner_ufgxt2.png"
                                alt="Vedic Chadhava Offerings"
                                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* How It Works Section */}
            <div className="container mx-auto px-8 md:px-24 py-12">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-14 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

                        {/* Left Steps */}
                        <div className="flex-1 space-y-10">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a365d]">
                                How does NamanDarshan<br />Chadhava Work?
                            </h2>

                            <div className="space-y-8">
                                {/* Step 1 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-[#FF7F50] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 mt-1">
                                        1
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="font-bold text-xl text-gray-900">Choose the Event</h3>
                                        <p className="text-muted-foreground mt-2 leading-relaxed">
                                            Select your Chadhava seva at your favourite temple from the list below.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-[#FF7F50] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 mt-1">
                                        2
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="font-bold text-xl text-gray-900">Enter Your Name</h3>
                                        <p className="text-muted-foreground mt-2 leading-relaxed">
                                            After clicking "Book Seva", fill in your name and Gotra in the simple popup form.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-[#FF7F50] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 mt-1">
                                        3
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="font-bold text-xl text-gray-900">Receive Video</h3>
                                        <p className="text-muted-foreground mt-2 leading-relaxed">
                                            The video of the Chadhava completed in your name will be shared with you on WhatsApp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://res.cloudinary.com/dryickpre/image/upload/v1770114496/Ayodhya_Ram_Mandir_Inauguration_fhfbun.jpg"
                                    alt="Temple Chadhava Ceremony"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <main id="offerings-section" className="flex-grow container mx-auto px-8 md:px-24 py-16">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Choose Your Offering</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full" />
                </div>

                <FilterBar
                    onSearch={setSearchQuery}
                    onStateChange={setSelectedState}
                    states={templeNames}
                    placeholder="Search offerings..."
                    className="mb-10 max-w-4xl mx-auto"
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredOfferings.length > 0 ? (
                            filteredOfferings.map((offering) => (
                                <div key={offering.id} className="animate-fade-up">
                                    <ChadhavaCard offering={offering} onBook={handleBook} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                No offerings found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Why Choose Us Section */}
            <div className="container mx-auto px-8 md:px-24 pb-12">
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-orange-300 p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 opacity-30"></div>
                    <h2 className="font-display text-2xl md:text-4xl font-bold text-orange-500 mb-4">
                        Why Choose NamanDarshan Chadhava?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 font-medium">
                        We ensure authentic Vedic rituals performed by experienced purohits at India's most sacred temples.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-16">
                        <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                            <Video className="w-5 h-5 text-orange-500 fill-orange-100" />
                            <span className="font-bold text-gray-800 text-sm md:text-base">Video Proof</span>
                        </div>
                        <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                            <CheckCircle2 className="w-5 h-5 text-orange-500 fill-orange-100" />
                            <span className="font-bold text-gray-800 text-sm md:text-base">Trusted by Thousands</span>
                        </div>
                        <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                            <HandHeart className="w-5 h-5 text-orange-500 fill-orange-100" />
                            <span className="font-bold text-gray-800 text-sm md:text-base">Direct Blessings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Complete Your Offering</DialogTitle>
                        <DialogDescription>
                            Enter your details for the Sankalp of {selectedOffering?.name}.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Devotee Name</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gotra">Gotra (Optional)</Label>
                            <Input
                                id="gotra"
                                value={formData.gotra}
                                onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                                placeholder="For Sankalp"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="temple">Select Temple</Label>
                            <select
                                id="temple"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.temple}
                                onChange={(e) => setFormData({ ...formData, temple: e.target.value })}
                            >
                                <option value="Kashi Vishwanath">Kashi Vishwanath</option>
                                <option value="Kedarnath">Kedarnath</option>
                                <option value="Tirupati Balaji">Tirupati Balaji</option>
                                <option value="Vaishno Devi">Vaishno Devi</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 93119 73199"
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                                Confirm Offering
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Chadhava;
