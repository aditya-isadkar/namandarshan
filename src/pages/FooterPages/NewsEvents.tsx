import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsEvents = () => {
    const events = [
        {
            title: "Padmanabhaswamy Temple Yatra",
            date: "Feb 14, 2024",
            desc: "Experience the divine splendor of the richest temple in the world with Naman's exclusive yatra package.",
            link: "#" // No actual link from source, just title
        },
        {
            title: "Golden Temple Yatra",
            date: "Feb 14, 2024",
            desc: "Immerse yourself in the spiritual serenity of Amritsar with our guided Golden Temple tour.",
            link: "#"
        },
        {
            title: "Vaishno Devi Yatra",
            date: "Feb 14, 2024",
            desc: "Embark on the holy trek to Mata Vaishno Devi shrine with complete assistance and VIP darshan options.",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 lg:pt-60 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <h1 className="font-display text-4xl font-bold text-primary mb-4">News & Events</h1>
                        <p className="text-stone-600">Stay updated with the latest spiritual journeys and upcoming yatras.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {events.map((event, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-100 flex flex-col">
                                <div className="h-48 bg-orange-100 flex items-center justify-center text-orange-300">
                                    {/* Placeholder Illustration */}
                                    <Calendar className="w-16 h-16 opacity-50" />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
                                        <Calendar className="w-3 h-3" />
                                        {event.date}
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-stone-800 mb-3">{event.title}</h3>
                                    <p className="text-stone-600 text-sm mb-6 flex-grow">{event.desc}</p>
                                    <Link to={event.link} className="inline-flex items-center text-primary font-medium hover:underline mt-auto">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
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

export default NewsEvents;
