import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import YatraPackageCard from "./Yatra/components/YatraPackageCard";
import FilterBar from "@/components/common/FilterBar";

const yatraPackages = [
    {
        title: "Char Dham Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114982/badrinath-2-300x225_kqgg5s.jpg",
        duration: "11 Days / 10 Nights",
        location: "Uttarakhand",
        description: "One of the most sacred Hindu pilgrimages covering four divine abodes.",
        slug: "/char-dham-yatra"
    },
    {
        title: "Ayodhya Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115141/ram-murti_hlfmqw.jpg",
        duration: "3 Days / 2 Nights",
        location: "Ayodhya, UP",
        description: "The birthplace of Lord Ram and spiritual capital of devotion.",
        slug: "/ayodhya-yatra"
    },
    {
        title: "Kedarnath Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114985/kedarnath-300x300_ftg56k.webp",
        duration: "5 Days / 4 Nights",
        location: "Uttarakhand",
        description: "A holy journey to the abode of Lord Shiva in the Himalayas.",
        slug: "/kedarnath-yatra"
    },
    {
        title: "Jagannath Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115226/7.2-1_oy202e.jpg",
        duration: "4 Days / 3 Nights",
        location: "Puri, Odisha",
        description: "Visit the sacred land of Mahaprabhu Jagannath.",
        slug: "/jagannath-yatra"
    },
    {
        title: "Vrindavan Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114989/Mathura-Vrindavan-Spiritual-haven-for-devotees-Prem-Mandir-Image-3-300x200_epa3t3.webp",
        duration: "3 Days / 2 Nights",
        location: "Uttar Pradesh",
        description: "Experience the divine love of Radha and Krishna in Vrindavan.",
        slug: "/vrindavan-yatra"
    },
    {
        title: "Shirdi Yatra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770198267/WhatsApp_Image_2026-02-04_at_15.05.09_o78rkp.jpg",
        duration: "3 Days / 2 Nights",
        location: "Maharashtra",
        description: "Experience the divine presence of Sai Baba in Shirdi.",
        slug: "/shirdi-yatra"
    }
];

const ExclusivePackages = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedState, setSelectedState] = React.useState("all");

    // Extract unique states from packages
    const states = Array.from(new Set(yatraPackages.map(pkg => pkg.location.split(',')[0].trim()))); // Simple extraction assuming "City, State" or just "State"

    const filteredPackages = yatraPackages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || pkg.location.includes(selectedState);

        return matchesSearch && matchesState;
    });

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-48 pb-16">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                            Exclusive Yatra Packages
                        </h1>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            Experience the divine with our premium, all-inclusive spiritual journeys.
                            From VIP Darshan to luxury accommodation, we handle every detail.
                        </p>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-8 rounded-full" />
                    </div>

                    {/* Filter Bar */}
                    <FilterBar
                        onSearch={setSearchQuery}
                        onStateChange={setSelectedState}
                        states={states}
                        placeholder="Search packages..."
                    />

                    {/* Packages Grid */}
                    {filteredPackages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPackages.map((pkg, index) => (
                                <div key={index} className="h-full">
                                    <YatraPackageCard {...pkg} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-stone-500">
                            No packages found matching your criteria.
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                                need a Custom Itinerary?
                            </h2>
                            <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-8">
                                Our spiritual travel experts can help design a yatra that fits your schedule and preferences perfectly.
                            </p>
                            <a
                                href="tel:+919311973199"
                                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all transform hover:-translate-y-1"
                            >
                                <span className="text-xl">📞 +91 93119 73199</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ExclusivePackages;
