import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface LiveDarshanCardProps {
    slug: string;
    name: string;
    location: string;
    videoId: string; // YouTube Video ID
    status: "Live Now" | "Offline";
    customImage?: string;
}

const LiveDarshanCard = ({ slug, name, location, videoId, status, customImage }: LiveDarshanCardProps) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100">
            {/* Image Container */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                    src={customImage || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow text-center">
                <h3 className="font-display text-lg font-bold text-gray-800 mb-1 line-clamp-1">{name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    {location}
                </div>

                <div className="mt-auto">
                    <Link
                        to={`/live-darshan/${slug}`}
                        className="block w-full"
                    >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-md py-5">
                            Explore
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LiveDarshanCard;
