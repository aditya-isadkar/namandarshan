import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Image as ImageIcon } from "lucide-react";

// Importing images
import heroImage from "@/assets/hero-aarti.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";
import vrindavanImage from "@/assets/vrindavan.jpg";
import ayodhyaImage from "@/assets/ayodhya.jpg";
import pujaImage from "@/assets/puja image.jpg";
import chadhavaImage from "@/assets/chadhava image.jpg";
import astrologyImage from "@/assets/astrology.avif";

const Gallery = () => {
    const images = [
        { src: heroImage, title: "Divine Aarti", category: "Rituals" },
        { src: kedarnathImage, title: "Kedarnath Dham", category: "Yatra" },
        { src: badrinathImage, title: "Badrinath Temple", category: "Yatra" },
        { src: vrindavanImage, title: "Vrindavan Vibes", category: "Spiritual" },
        { src: ayodhyaImage, title: "Ram Mandir, Ayodhya", category: "Temple" },
        { src: pujaImage, title: "Sacred Puja", category: "Rituals" },
        { src: chadhavaImage, title: "Chadhava Offering", category: "Seva" },
        { src: astrologyImage, title: "Vedic Astrology", category: "Wisdom" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 lg:pt-60 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
                            <ImageIcon className="w-6 h-6 text-orange-600" />
                        </div>
                        <h1 className="font-display text-4xl font-bold text-primary mb-4">Spiritual Gallery</h1>
                        <p className="text-stone-600">Glimpses of divinity, devotion, and the sacred journeys of Naman.</p>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((img, index) => (
                            <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-orange-300 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                                    <h3 className="text-white font-display text-xl font-bold">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Gallery;
