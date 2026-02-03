import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PujaCardProps {
    id: string;
    title: string;
    image: string;
    description: string;
    imageFit?: "contain" | "cover";
}

const PujaCard = ({ id, title, image, description, imageFit = "cover" }: PujaCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full group">
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-black">
                <img
                    src={image}
                    alt={title}
                    className={`w-full h-full object-${imageFit} transition-transform duration-700 group-hover:scale-110 opacity-90`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">

                    <h3 className="font-display text-2xl font-bold mb-1">{title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                    {description}
                </p>

                {/* Action */}
                <Button
                    onClick={() => navigate(`/puja/${id}`)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md font-semibold text-lg py-6"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default PujaCard;
