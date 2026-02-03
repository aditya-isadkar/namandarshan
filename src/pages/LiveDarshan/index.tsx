import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import LiveDarshanCard from "./components/LiveDarshanCard";
import { Clock, Bell } from "lucide-react";

import { liveChannels } from "@/data/liveDarshanData";

const aartiSchedule = [
    { temple: "Kashi Vishwanath", event: "Mangala Aarti", time: "3:00 AM - 4:00 AM" },
    { temple: "Kashi Vishwanath", event: "Saptarishi Aarti", time: "7:00 PM - 8:15 PM" },
    { temple: "Mahakaleshwar", event: "Bhasma Aarti", time: "4:00 AM - 6:00 AM" },
    { temple: "Mahakaleshwar", event: "Sandhya Aarti", time: "6:30 PM - 7:15 PM" },
    { temple: "Somnath Temple", event: "Morning Aarti", time: "7:00 AM" },
    { temple: "Somnath Temple", event: "Evening Aarti", time: "7:00 PM" },
];

const LiveDarshan = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <SEO
                title="Live Darshan"
                keywords={["Live Darshan", "Temple Live Stream", "Aarti Live", "Kashi Vishwanath Live", "Mahakaleshwar Live"]}
                description="Watch live darshan and aarti from famous temples across India. Connect with the divine from the comfort of your home."
            />
            <Header />
            <main className="flex-grow pt-48 pb-16">

                {/* Hero / Title Section */}
                <div className="container mx-auto px-4 text-center mb-12">
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-red-900 mb-2 drop-shadow-sm">
                        🔴 Live Darshan – Choose Your Temple
                    </h1>
                </div>

                {/* Live Grid */}
                <div className="container mx-auto px-4 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {liveChannels.map((channel, index) => (
                            <LiveDarshanCard key={index} {...channel} />
                        ))}
                    </div>
                </div>

                {/* Aarti Schedule */}
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Clock className="w-8 h-8 text-orange-600" />
                            <h2 className="font-display text-2xl font-bold text-gray-800">Daily Aarti Schedule</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {aartiSchedule.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
                                    <div className="mt-1 p-2 rounded-full bg-orange-100 text-orange-600">
                                        <Bell className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{item.event}</h4>
                                        <p className="text-sm text-orange-600 font-medium">{item.temple}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default LiveDarshan;
