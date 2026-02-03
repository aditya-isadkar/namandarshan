import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Heart, Shield, Users } from "lucide-react";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-grow pt-32 lg:pt-60 pb-16">
                {/* Hero Section */}
                <div className="container mx-auto px-4 mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">About Naman</h1>
                        <p className="text-xl text-stone-600 leading-relaxed">
                            Welcome to Naman, where your spiritual journey becomes simple, serene, and truly special.
                            Naman isn’t just a service, it’s here to make your spiritual adventure easy and filled with meaningful moments.
                        </p>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="bg-white py-16 mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: CheckCircle2,
                                    title: "Easy Temple Visits",
                                    desc: "With Naman VIP Darshan, temples become easier to visit. No more struggles, just a smooth and peaceful journey."
                                },
                                {
                                    icon: Heart, // Focus
                                    title: "Focus on Your Journey",
                                    desc: "Naman lets you focus on what truly matters your spiritual journey. We handle the details, so you can fully enjoy the experience."
                                },
                                {
                                    icon: Shield, // Reliable
                                    title: "No More Hassles",
                                    desc: "Forget about long lines and worry about where to stay. Naman takes away the stress, making your journey simple."
                                },
                                {
                                    icon: Users, // Friend
                                    title: "Your Reliable Friend",
                                    desc: "Think of Naman as a friend on your spiritual journey More than a service, we’re here to make every moment peaceful and full of respect."
                                },
                                {
                                    icon: Heart,
                                    title: "Complete Care",
                                    desc: "We take care of your mind, body, and soul."
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-stone-50 p-8 rounded-2xl hover:shadow-lg transition-all border border-stone-100">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-stone-800 mb-3">{item.title}</h3>
                                    <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="container mx-auto px-4 mb-16">
                    <div className="max-w-4xl mx-auto bg-orange-50 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="font-display text-3xl font-bold text-primary mb-8">We Focus on these simple values</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div>
                                <h4 className="font-bold text-lg text-stone-800 mb-2">Keep It Simple</h4>
                                <p className="text-stone-600">We believe in making the spiritual journey easy for everyone</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-stone-800 mb-2">Peaceful Vibes</h4>
                                <p className="text-stone-600">Naman is a place of calm, bringing inner peace and harmony.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-stone-800 mb-2">Moments That Matter</h4>
                                <p className="text-stone-600">Every moment with Naman is made to be special, leaving a lasting impact.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lg text-stone-500 max-w-2xl mx-auto italic">
                        "Experience divine ease with Naman VIP Darshan. Skip the queues and waiting times for a seamless, privileged spiritual journey."
                    </p>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
