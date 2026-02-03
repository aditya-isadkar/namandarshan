import React, { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { liveChannels } from "@/data/liveDarshanData";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

const LiveDarshanDetail = () => {
    const { slug } = useParams();
    const channel = liveChannels.find(c => c.slug === slug);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!channel) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Channel Not Found</h1>
                        <Link to="/live-darshan">
                            <Button>Back to Live Darshan</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-roboto">
            <SEO
                title={channel.seoTitle || `Live: ${channel.name} Darshan`}
                description={channel.seoDescription || `Watch live darshan of ${channel.name}. ${channel.devotionalMessage || "Experience the divine from home."}`}
                keywords={channel.seoKeywords || ["Live Darshan", channel.name, "Temple Live", "Online Aarti"]}
                image={channel.customImage || `https://img.youtube.com/vi/${channel.videoId}/hqdefault.jpg`}
            />
            <Header />
            <main className="flex-grow pt-32 pb-16">

                {/* Hero Section */}
                <div className="relative h-[50vh] w-full bg-orange-50 flex flex-col items-center justify-center">
                    <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
                        <Link to="/darshan" className="mb-6">
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg">
                                🛕 BOOK A REAL DARSHAN
                            </Button>
                        </Link>

                        <h1
                            className="font-display tracking-tight"
                            style={{
                                color: '#5d1414',
                                fontSize: 'clamp(30px, 6vw, 52px)',
                                fontWeight: 900,
                                margin: 0,
                                lineHeight: 1.1,
                                textShadow: '0 2px 4px rgba(255,255,255,0.2)'
                            }}
                        >
                            {channel.name}
                        </h1>
                        <p
                            className="uppercase tracking-widest mb-8"
                            style={{
                                color: '#b87333',
                                fontSize: '22px',
                                fontWeight: 500,
                                marginTop: '10px'
                            }}
                        >
                            Official Live Darshan Portal
                        </p>
                    </div>
                </div>

                {/* Image Section (Formerly Video Section) */}
                <div id="video-section" className="container mx-auto px-4 -mt-20 relative z-20 mb-20">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-500/20 max-w-5xl mx-auto relative group">
                        <div className="aspect-video relative bg-gray-100">
                            {isPlaying ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${channel.videoId}?autoplay=1&mute=0`}
                                    title={channel.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            ) : (
                                <>
                                    <img
                                        src={channel.customImage}
                                        alt={channel.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                                        <Button
                                            size="lg"
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
                                            onClick={() => setIsPlaying(true)}
                                        >
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                            </span>
                                            Watch Live Now
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Cards Section */}
                <div className="container mx-auto px-4 mb-20 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Witness the Divine Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#8B0000] mb-6 flex items-center gap-3">
                                <span className="text-3xl">🌸</span> Witness the Divine
                            </h3>
                            <ul className="space-y-4">
                                {(channel.witnessPoints || [
                                    "Daily Rituals & Aarti",
                                    "Divine Darshan",
                                    "Spiritual Ambiance",
                                    "Sacred Chants",
                                    "Live Events"
                                ]).map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-red-500 text-xl mt-1">🚩</span>
                                        <span className="text-gray-700 text-lg font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Why Namandarshan Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#8B0000] mb-6 flex items-center gap-3">
                                <span className="text-3xl">🕉️</span> Why Namandarshan?
                            </h3>
                            <ul className="space-y-4">
                                {(channel.whyPoints || [
                                    "Real-time spiritual connection",
                                    "Ideal for prayers and meditation",
                                    "Perfect for senior citizens",
                                    "Smooth, distraction-free experience"
                                ]).map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-green-500 text-xl mt-1">✅</span>
                                        <span className="text-gray-700 text-lg font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Blessing Section */}
                <div
                    className="w-full py-16 mt-20"
                    style={{ backgroundColor: '#FFFDF9' }}
                >
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h2
                            className="font-serif mb-3"
                            style={{
                                color: '#FF4500',
                                fontSize: '36px',
                                fontWeight: 600,
                                fontFamily: 'Palatino, "Book Antiqua", serif'
                            }}
                        >
                            {channel.devotionalTitle || "Jai Shri Ram"}
                        </h2>
                        <p
                            className="font-serif mb-12 leading-relaxed"
                            style={{
                                color: '#777777',
                                fontSize: '18px',
                                fontFamily: 'Palatino, "Book Antiqua", serif'
                            }}
                        >
                            {channel.devotionalMessage || "May the divine blessings bring peace and prosperity to your life."}
                        </p>
                        <p
                            className="tracking-wide mb-8"
                            style={{
                                color: '#5d1414',
                                fontSize: '19px',
                                fontWeight: 700
                            }}
                        >
                            Stay connected through Namandarshan – Your Spiritual Companion.
                        </p>

                        <Link to="/darshan" className="inline-flex items-center gap-2 group transition-transform hover:scale-105">
                            <span className="text-4xl filter drop-shadow-sm">🛕</span>
                            <span
                                className="font-serif text-2xl md:text-3xl font-bold group-hover:underline decoration-2 underline-offset-4"
                                style={{ color: '#1a73e8' }}
                            >
                                Book a Real Darshan Now →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Info Content - Removed as per previous request, ensuring clean bottom */}
            </main>
            <Footer />
        </div>
    );
};

export default LiveDarshanDetail;
