import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Offering } from "../data";

interface ChadhavaCardProps {
    offering: Offering;
    onBook: (offering: Offering) => void;
}

const ChadhavaCard = ({ offering, onBook }: ChadhavaCardProps) => {
    return (
        <Card className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-none group">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={offering.image}
                    alt={offering.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1605646199342-a6344d5a9b70?q=80&w=600&auto=format&fit=crop";
                    }}
                />
                <div className="absolute top-4 right-4 bg-[#FF7F50] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md">
                    {offering.tag}
                </div>
            </div>

            <CardContent className="flex-col items-center text-center pt-6 pb-2 px-6 flex-grow">
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#1a365d] mb-2 underline decoration-gray-400 underline-offset-4 decoration-2">
                    {offering.name}
                </h3>

                <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-[#FF7F50]" />
                    <span className="text-sm font-semibold text-gray-600">{offering.templeName}</span>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                    {offering.description}
                </p>
            </CardContent>

            <CardFooter className="pb-8 pt-4 flex justify-center bg-transparent border-none">
                <Button
                    onClick={() => onBook(offering)}
                    className="bg-[#FF7F50] hover:bg-[#FF6347] text-white rounded-full px-8 py-5 text-xs font-bold tracking-widest uppercase shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ChadhavaCard;
