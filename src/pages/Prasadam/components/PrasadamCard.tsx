import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PrasadamData } from "../data";
import { useNavigate } from "react-router-dom";

interface PrasadamCardProps extends PrasadamData { }

const PrasadamCard = ({ id, slug, title, image, description, templeName, location }: PrasadamCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full group">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                {/* Temple/Location Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-white/90 text-stone-900 hover:bg-white backdrop-blur-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {location}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-stone-900 mb-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-orange-600 mb-3">
                        {templeName}
                    </p>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="mt-auto pt-4">
                    <Button
                        onClick={() => navigate(`/prasadam/${slug || id}`)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                        Order Prasadam
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PrasadamCard;
