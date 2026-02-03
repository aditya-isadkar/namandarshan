import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface TempleNetworkCardProps {
    id: number;
    name: string;
    image: string;
    location: string;
    description: string;
}

const TempleNetworkCard = ({ id, name, image, location, description }: TempleNetworkCardProps) => {
    return (
        <div className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-6 pt-8 flex-grow flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                    <Link to={`/temples/${id}`} className="block w-full">
                        <Button variant="outline" className="w-full font-medium">
                            View More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TempleNetworkCard;
