import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getApiUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import BookingModal from "@/components/booking/BookingModal";
import TempleCard from "./components/TempleCard";
import SEO from "@/components/SEO";
import FilterBar from "@/components/common/FilterBar";


const Temples = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        fetch(getApiUrl('/api/temples'))
            .then(res => {
                if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setTemples(data);
                } else {
                    console.error("API returned non-array:", data);
                    setError("Invalid data received from server");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch temples:", err);
                setError(err.message || "Failed to load temples");
                setLoading(false);
            });
    }, []);



    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("all");

    // Extract unique states from temples (assuming temple.location or similar property exists)
    // We'll need to check the API response structure, but typically filtering by client-side if data is small is okay.
    // If we don't know the exact structure, we can try to infer it. The TempleCard uses `temple.location`.
    const states = Array.from(new Set(temples.map((temple: any) => temple.location?.split(',').pop()?.trim() || "Unknown"))).filter(s => s !== "Unknown").sort();

    const filteredTemples = temples.filter((temple: any) => {
        const matchesSearch = temple.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            temple.location?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || temple.location?.includes(selectedState);

        return matchesSearch && matchesState;
    });

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                title="All Temples"
                keywords={["Temples in India", "Hindu Temples", "Pilgrimage Sites", "Temple List", "Sacred Sites"]}
                description="Explore the most sacred temples in India. Book darshan, puja, and offerings at verified holy sites."
            />
            <Header />
            <main className="flex-grow pt-48 pb-16">
                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    type="temple"
                />
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 italic">
                            Temples in India
                        </h1>
                        <p className="max-w-4xl mx-auto mt-6" style={{
                            fontFamily: '"Tangerine", Sans-serif',
                            fontSize: '75px',
                            fontWeight: 800,
                            color: 'var(--e-global-color-0467c4d)',
                            lineHeight: '1.2'
                        }}>
                            Discover and book divine experiences at the most sacred sites across the country.
                        </p>
                    </div>

                    <FilterBar
                        onSearch={setSearchQuery}
                        onStateChange={setSelectedState}
                        states={states}
                        placeholder="Search temples..."
                        className="max-w-4xl mx-auto mb-12"
                    />

                    {/* Temples Grid */}
                    {loading && <div className="text-center py-12">Loading temples...</div>}

                    {error && (
                        <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg max-w-2xl mx-auto mb-8">
                            <h3 className="text-lg font-bold mb-2">Something went wrong</h3>
                            <p>{error}</p>
                            <p className="text-sm mt-2 text-muted-foreground">Check console for details.</p>
                        </div>
                    )}

                    {!loading && !error && filteredTemples.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No temples found matching your criteria.
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemples.map((temple: any) => (
                            <div key={temple.id}>
                                <TempleCard temple={temple} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Temples;
