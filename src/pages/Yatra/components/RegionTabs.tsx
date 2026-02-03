import { useState, useMemo } from "react";
import TempleCard from "@/pages/Temples/components/TempleCard";

const regions = [
    { id: "north", label: "North India" },
    { id: "south", label: "South India" },
    { id: "east", label: "East India" },
    { id: "west", label: "West India" },
];

interface RegionTabsProps {
    temples: any[];
}

const RegionTabs = ({ temples }: RegionTabsProps) => {
    const [activeRegion, setActiveRegion] = useState("north");

    const categorizedTemples = useMemo(() => {
        const cats: Record<string, any[]> = { north: [], south: [], east: [], west: [] };

        // Helper to guess region from location string
        const getRegion = (loc: string) => {
            const l = loc.toLowerCase();
            if (l.includes("uttarakhand") || l.includes("jammu") || l.includes("katra") || l.includes("delhi") || l.includes("himachal") || l.includes("punjab")) return "north";
            if (l.includes("tamil") || l.includes("kerala") || l.includes("andhra") || l.includes("karnataka") || l.includes("telangana") || l.includes("tirupati") || l.includes("madurai")) return "south";
            if (l.includes("odisha") || l.includes("bengal") || l.includes("assam") || l.includes("bihar") || l.includes("jharkhand")) return "east";
            if (l.includes("gujarat") || l.includes("maharashtra") || l.includes("goa") || l.includes("rajasthan")) return "west";
            if (l.includes("chhattisgarh") || l.includes("u.p") || l.includes("uttar pradesh") || l.includes("varanasi") || l.includes("ayodhya") || l.includes("vrindavan")) return "north"; // UP often considered North/Central, putting in North for now or splitting
            // UP is tricky, often grouped in North. Let's keep in North.
            if (l.includes("mp") || l.includes("ujjain")) return "west"; // Moving MP/Ujjain to West as Central lies between
            return "north"; // Default fallback
        };

        temples.forEach(t => {
            const region = getRegion(t.location || "");
            cats[region].push(t);
        });
        return cats;
    }, [temples]);

    // Get up to 4 temples for active region
    const displayTemples = categorizedTemples[activeRegion]?.slice(0, 4) || [];

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-gray-900">Explore by Region</h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setActiveRegion(region.id)}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${activeRegion === region.id
                                    ? "bg-[#F0601A] text-white shadow-lg"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>

                {displayTemples.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                        {displayTemples.map((temple) => (
                            <div key={temple.id}>
                                <TempleCard temple={temple} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        No temples found for {regions.find(r => r.id === activeRegion)?.label} yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegionTabs;
