import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import BookingModal from "@/components/booking/BookingModal";

interface TempleCardProps {
    temple: {
        id: number | string;
        slug?: string;
        name: string;
        location: string;
        image: string;
        description: string;
    };
}

import { generateSlug } from "@/utils/slugUtils";

const TempleCard = ({ temple }: TempleCardProps) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                type="temple"
                serviceName={temple.name}
            />
            <div className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={temple.image}
                        alt={temple.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="p-6 pt-8 flex-grow flex flex-col">
                    <div className="mb-4">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2 uppercase tracking-wide">
                            <MapPin className="w-4 h-4" />
                            {temple.location}
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {temple.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {temple.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 flex gap-2">
                        <Link to={`/temples/${temple.slug || generateSlug(temple.name, "temple")}`} className="flex-1">
                            <Button variant="outline" className="w-full font-medium">
                                View More
                            </Button>
                        </Link>
                        <Button
                            className="flex-1 font-medium"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            Book Darshan
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TempleCard;
