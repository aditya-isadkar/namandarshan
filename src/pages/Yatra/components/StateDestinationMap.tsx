import { useState, useMemo } from "react";
import { MapPin, Navigation, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Temple {
    _id: string;
    name: string;
    location: string;
    image?: string;
    slug?: string;
}

interface StateDestinationMapProps {
    temples: Temple[];
}

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
];

const StateDestinationMap = ({ temples }: StateDestinationMapProps) => {
    const [selectedState, setSelectedState] = useState<string>("Uttarakhand");
    const [stateSearch, setStateSearch] = useState("");
    const navigate = useNavigate();

    // Filter temples based on selected state
    const filteredTemples = useMemo(() => {
        return temples.filter(temple =>
            temple.location.toLowerCase().includes(selectedState.toLowerCase())
        );
    }, [selectedState, temples]);

    // Filter states based on search input
    const filteredStates = useMemo(() => {
        return INDIAN_STATES.filter(state =>
            state.toLowerCase().includes(stateSearch.toLowerCase())
        );
    }, [stateSearch]);

    return (
        <div className="container mx-auto px-4 mt-20 mb-20">
            <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Check Destination By State</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 flex flex-col md:flex-row min-h-[500px]">
                {/* Left Column: State List */}
                <div className="w-full md:w-1/3 lg:w-1/4 border-r border-stone-100 bg-stone-50/50 flex flex-col">
                    <div className="p-4 bg-white border-b border-stone-100 font-semibold text-lg text-primary">
                        Select State/UT
                        <div className="relative mt-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search State..."
                                className="pl-8 h-9 text-sm bg-stone-50"
                                value={stateSearch}
                                onChange={(e) => setStateSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <ScrollArea className="h-[400px] md:h-[500px] flex-grow">
                        <div className="p-3 space-y-2">
                            {filteredStates.length > 0 ? (
                                filteredStates.map((state) => (
                                    <button
                                        key={state}
                                        onClick={() => setSelectedState(state)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm flex items-center justify-between ${selectedState === state
                                                ? "bg-primary text-white shadow-md transform scale-[1.02]"
                                                : "bg-white text-stone-600 hover:bg-stone-100 border border-transparent hover:border-stone-200"
                                            }`}
                                    >
                                        {state}
                                        {selectedState === state && <ArrowRight className="w-4 h-4 ml-2" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No state found
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Column: Visual Map Area (Placeholder) & Results */}
                <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-8 relative bg-stone-50 bg-opacity-30">
                    {/* Background Map Graphic (Placeholder) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <img src="/assets/india_map_placeholder.svg" className="w-3/4 h-3/4 object-contain" alt="India Map" onError={(e) => e.currentTarget.style.display = 'none'} />
                        {/* Fallback if image doesn't exist */}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-red-100 rounded-full text-red-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-stone-800">{selectedState}</h3>
                                <p className="text-stone-500">{filteredTemples.length} Sacred Destinations found</p>
                            </div>
                        </div>

                        {filteredTemples.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemples.map((temple) => (
                                    <div
                                        key={temple._id}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 cursor-pointer transform hover:-translate-y-1"
                                        onClick={() => navigate(temple.slug ? `/temples/${temple.slug}` : `/temples/${temple._id}`)}
                                    >
                                        <div className="h-40 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                            <img
                                                src={temple.image || "/assets/trimbakeshwar.jpeg"} // Fallback image
                                                alt={temple.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <span className="absolute bottom-3 left-3 text-white font-semibold z-20 text-sm flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {temple.location}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-lg text-primary mb-1 line-clamp-1">{temple.name}</h4>
                                            <Button variant="link" className="p-0 h-auto text-stone-500 hover:text-primary text-xs flex items-center gap-1">
                                                View Details <ArrowRight className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center rounded-2xl bg-white/50 border border-dashed border-stone-300">
                                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                                    <Navigation className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-semibold text-stone-600">No destinations found</h4>
                                <p className="text-stone-500 max-w-md mt-2">
                                    We haven't listed any temples in {selectedState} yet.
                                    Please check back later or explore other spiritual destinations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StateDestinationMap;
