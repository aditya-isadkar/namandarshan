import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MissionSection = () => {
    return (
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 section-title-center">
                        Bridging the Gap Between You and the Divine
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Video Column */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                        <video
                            className="w-full h-full object-cover aspect-video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src="/assets/mission_video.mp4"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Content Column */}
                    <div className="space-y-6">
                        <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                            At Namandarshan, we bridge the gap between devotion and destination. We are dedicated to simplifying India’s spiritual journeys by offering seamless Priority Darshan, authentic Prasadam delivery, and detailed temple insights. We handle the logistics so you can focus entirely on your faith. Whether it is overcoming the barriers of distance or ensuring comfort for the elderly, we make sure the divine is always within your reach. Join our growing family of devotees and experience a pilgrimage that is as peaceful as the destination itself.
                        </p>

                        <div className="pt-4">
                            <a
                                href="https://chat.whatsapp.com/D0jvm94aVqU9rnj0EgVSVI"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 text-lg px-8 rounded-full btn-glow">
                                    Join Naman Parivar
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
