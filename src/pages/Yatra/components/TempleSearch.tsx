import { useState, useEffect } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Interface for Temple Data
interface Temple {
    _id: string;
    name: string;
    location: string;
    slug?: string;
    // Add other properties if needed
}

interface TempleSearchProps {
    temples: Temple[];
}

const TempleSearch = ({ temples }: TempleSearchProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTemples, setFilteredTemples] = useState<Temple[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredTemples([]);
        } else {
            const results = temples.filter((temple) =>
                temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                temple.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTemples(results);
        }
    }, [searchTerm, temples]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Optional: direct navigation if only one match or similar logic
    };

    return (
        <div className="container mx-auto px-4 -mt-8 relative z-20">
            <Card className="shadow-xl bg-white/95 backdrop-blur border-none max-w-4xl mx-auto rounded-2xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <h3 className="text-center font-display text-2xl md:text-3xl text-primary mb-6">Find Your Sacred Destination</h3>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search for a temple (e.g., Kedarnath, Somnath)..."
                                className="pl-12 pr-4 h-14 text-lg rounded-full border-primary/20 focus:border-primary focus:ring-primary shadow-inner bg-stone-50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button type="submit" className="absolute right-2 rounded-full h-10 px-6 bg-primary hover:bg-primary/90">
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Results Grid */}
                    {filteredTemples.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto bg-stone-50 p-4 rounded-xl border border-stone-200 max-h-[300px] overflow-y-auto">
                            {filteredTemples.map((temple) => (
                                <div
                                    key={temple._id}
                                    onClick={() => navigate(temple.slug ? `/temples/${temple.slug}` : `/temples/${temple._id}`)}
                                    className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:border-primary/50 cursor-pointer hover:shadow-md transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-stone-800">{temple.name}</h4>
                                        <p className="text-xs text-muted-foreground">{temple.location}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </div>
                            ))}
                        </div>
                    )}

                    {searchTerm && filteredTemples.length === 0 && (
                        <div className="mt-4 text-center text-muted-foreground p-4">
                            No temples found matching "{searchTerm}"
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TempleSearch;
