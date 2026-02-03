import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/booking/BookingModal";

interface DarshanCardProps {
    name: string;
    image: string;
    location: string;
    id: number | string;
    slug?: string;
}

import { generateSlug } from "@/utils/slugUtils";

const DarshanCard = ({ name, image, location, id, slug }: DarshanCardProps) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                type="darshan"
                serviceName={name}
            />
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full group">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-1 text-sm font-medium mb-1 opacity-90">
                            <MapPin className="w-4 h-4 text-orange-400" />
                            {location}
                        </div>
                        <h3 className="font-display text-2xl font-bold">{name}</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-6 flex-grow">
                        {/* Features removed as per request */}
                        <p className="text-gray-600 italic text-sm">Experience divine grace with our premium darshan services.</p>
                    </div>

                    {/* Action */}
                    <div className="space-y-3">
                        <Link to={`/darshan/${slug || generateSlug(name, "darshan")}`} className="block">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 font-bold" size="lg">
                                View Details
                            </Button>
                        </Link>
                        <Button
                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md font-semibold text-lg py-6"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            Book VIP Darshan
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DarshanCard;
