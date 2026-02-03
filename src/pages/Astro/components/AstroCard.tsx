import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface AstroCardProps {
    title: string;
    image: string;
    description: string;
}

const AstroCard = ({ title, image, description }: AstroCardProps) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full group">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-sm font-medium mb-1 text-orange-200">
                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                        <span>Vedic Guidance</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold">{title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                    {description}
                </p>

                {/* Action */}
                <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 font-semibold group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all">
                    Get Consultation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default AstroCard;
