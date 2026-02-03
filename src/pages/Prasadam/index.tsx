import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import PrasadamCard from "./components/PrasadamCard";
import { getApiUrl } from "@/utils/api";
import { Loader2 } from "lucide-react";
import FilterBar from "@/components/common/FilterBar";

const Prasadam = () => {
    const [prasadams, setPrasadams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("all");

    useEffect(() => {
        const fetchPrasadams = async () => {
            try {
                const response = await fetch(getApiUrl("/api/prasadams"));
                if (response.ok) {
                    const data = await response.json();
                    setPrasadams(data);
                }
            } catch (error) {
                console.error("Failed to fetch prasadams:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrasadams();
    }, []);

    // Extract unique locations/states
    const states = Array.from(new Set(prasadams.map((p: any) => p.location?.split(',').pop()?.trim() || "Unknown"))).filter(s => s !== "Unknown").sort();

    const filteredPrasadams = prasadams.filter((item: any) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.templeName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || item.location?.includes(selectedState);
        return matchesSearch && matchesState;
    });

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <SEO
                title="Divine Prasadam Home Delivery"
                keywords={["Prasadam Online", "Temple Prasad", "Home Delivery Prasad", "Sacred Offerings", "Tirupati Laddu"]}
                description="Get sacred prasadam from India's holiest temples delivered to your doorstep. Authentic and hygienic."
            />
            <Header />
            <main className="flex-grow pt-32 pb-16">
                {/* Hero Section */}
                <div className="bg-orange-50 py-16 mb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6 text-center">
                            Divine Prasadam Home Delivery
                        </h1>
                        <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                            Sacred offerings from India’s holiest temples delivered to your doorstep. Experience the blessing of divine purity in every package.
                        </p>
                    </div>
                </div>

                {/* Prasadam Grid */}
                <div className="container mx-auto px-4 mb-24">
                    <FilterBar
                        onSearch={setSearchQuery}
                        onStateChange={setSelectedState}
                        states={states}
                        placeholder="Search prasadam..."
                        className="mb-10 max-w-4xl mx-auto"
                    />

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPrasadams.length > 0 ? (
                                filteredPrasadams.map((item: any) => (
                                    <PrasadamCard key={item.id} {...item} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-stone-500">
                                    No prasadam found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Why Choose Section (Optional but good for completeness) */}
                <div className="bg-white py-24 border-t border-stone-100">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-display text-3xl font-bold text-stone-900 mb-12">Why Choose Naman Prasadam?</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600 text-3xl">🌿</div>
                                <h3 className="font-bold text-xl text-stone-900">100% Authentic</h3>
                                <p className="text-stone-600">Sourced directly from the temple premises after offering.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600 text-3xl">📦</div>
                                <h3 className="font-bold text-xl text-stone-900">Hygienic Packaging</h3>
                                <p className="text-stone-600">Packed with care to maintain freshness and sanctity during transit.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600 text-3xl">🚚</div>
                                <h3 className="font-bold text-xl text-stone-900">Pan-India Delivery</h3>
                                <p className="text-stone-600">Reaching every corner of the country with divine blessings.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Prasadam;
