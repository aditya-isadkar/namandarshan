import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Video, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ayodhyaImg from "@/assets/ayodhya.jpg";
import kedarnathImg from "@/assets/kedarnath.jpg";
import vrindavanImg from "@/assets/vrindavan.jpg";
import badrinathImg from "@/assets/badrinath.jpg";

const LiveDarshan = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const liveStreams = [
    {
      id: "ram-mandir",
      title: "Ram Mandir",
      location: "Ayodhya",
      viewers: 1234,
      isLive: true,
      image: ayodhyaImg,
      videoUrl: "https://www.youtube.com/embed/GW0jaNIjEiY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      externalUrl: "https://www.youtube.com/watch?v=GW0jaNIjEiY"
    },
    {
      id: "kedarnath",
      title: "Kedarnath Temple",
      location: "Uttarakhand",
      viewers: 856,
      isLive: true,
      image: kedarnathImg,
      videoUrl: "https://www.youtube.com/embed/H1OJ9l3x1EE?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      externalUrl: "https://www.youtube.com/watch?v=H1OJ9l3x1EE"
    },
    {
      id: "banke-bihari",
      title: "Banke Bihari",
      location: "Vrindavan",
      viewers: 2156,
      isLive: true,
      image: vrindavanImg,
      videoUrl: "https://www.youtube.com/embed/ZCXCu9_K0lY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      externalUrl: "https://www.youtube.com/watch?v=ZCXCu9_K0lY"
    },
    {
      id: "badrinath",
      title: "Badrinath Temple",
      location: "Uttarakhand",
      viewers: 543,
      isLive: true,
      image: badrinathImg,
      videoUrl: "https://www.youtube.com/embed/lNCn60Re1kk?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      externalUrl: "https://www.youtube.com/watch?v=lNCn60Re1kk"
    },
  ];

  const renderCardContent = (stream: any) => (
    <>
      {/* Image/Video Container */}
      <div className="aspect-[4/3] overflow-hidden relative bg-black">
        {/* Video Player */}
        {hoveredId === stream.id && stream.videoUrl ? (
          <iframe
            src={stream.videoUrl}
            title={stream.title}
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={stream.image}
              alt={stream.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        )}
      </div>

      {/* Live Badge - Hide when video is playing */}
      {hoveredId !== stream.id && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          LIVE
        </div>
      )}

      {/* Viewers Count */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm z-20">
        <Users className="w-3 h-3" />
        {stream.viewers.toLocaleString()}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
        <h3 className="font-display text-lg font-bold text-white mb-1">
          {stream.title}
        </h3>
        <p className="text-white/70 text-sm">{stream.location}</p>
      </div>

      {/* Play Button Overlay - Show only when not hovering/playing */}
      {hoveredId !== stream.id && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </>
  );

  return (
    <section className="py-16 md:py-24 bg-foreground text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-semibold">LIVE NOW</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Live Darshan
            </h2>
            <p className="text-white/70 mt-2 max-w-xl">
              Experience divine moments from sacred temples across India, streaming live 24/7
            </p>
          </div>
          <Link to="/live-darshan">
            <Button variant="heroOutline" className="gap-2 border-white/30 text-white">
              View All Streams
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Live Stream Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveStreams.map((stream: any) => (
            <div
              key={stream.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(stream.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {stream.externalUrl ? (
                <a
                  href={stream.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {renderCardContent(stream)}
                </a>
              ) : (
                <Link to={`/live-darshan/${stream.id}`} className="block h-full">
                  {renderCardContent(stream)}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</p>
            <p className="text-white/70 text-sm">Live Temples</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</p>
            <p className="text-white/70 text-sm">Streaming</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">5L+</p>
            <p className="text-white/70 text-sm">Daily Viewers</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">HD</p>
            <p className="text-white/70 text-sm">Quality Streams</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDarshan;
