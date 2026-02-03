import React from "react";
import Layout from "../components/layout/Layout";
import { Container } from "../components/ui/container";
import templeLineArt from "@/assets/about/temple-line-art.gif";
import prayerHands from "@/assets/about/prayer-hands.png";
import templeBg from "@/assets/about/temple-bg.jpg";
import missionIllustration from "@/assets/about/mission-illustration.png";
import { Phone, Mail, Banknote } from "lucide-react";

const AboutUs = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="bg-stone-50 py-16 md:py-24 text-center">
                <Container>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-blue-900 mb-4 tracking-tight animate-fade-in-up">
                        ABOUT NAMAN
                    </h1>
                    <p className="font-display text-3xl md:text-5xl text-orange-500 italic animate-fade-in-up delay-100">
                        Your Gateway To Inner Peace
                    </p>
                </Container>
            </div>

            {/* Intro Section */}
            <Container className="py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-light animate-fade-in-up">
                            Welcome to Naman, where your spiritual journey becomes simple, serene, and truly special. Naman isn’t just a service, it’s here to make your spiritual adventure easy and filled with meaningful moments.
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed animate-fade-in-up delay-200">
                            With Naman, spiritual journeys are no longer complicated. Forget about long lines and distractions. Now, your path is simpler and enjoyable with Naman as your friend.
                        </p>
                    </div>
                    <div className="flex justify-center animate-fade-in-up delay-300">
                        <img src={templeLineArt} alt="Temple Art" className="max-w-xs md:max-w-md w-full object-contain mix-blend-multiply" />
                    </div>
                </div>
            </Container>

            {/* Why Naman Section */}
            <div className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${templeBg})` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <Container className="relative z-10">
                    <h2 className="text-4xl font-display font-bold text-white text-center mb-16 animate-fade-in-up">WHY Naman</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Easy Temple Visits", desc: "With Naman VIP Darshan, temples become easier to visit. No more struggles, just a smooth and peaceful journey." },
                            { title: "Focus on Your Journey", desc: "Naman lets you focus on what truly matters your spiritual journey. We handle the details, so you can fully enjoy the experience." },
                            { title: "No More Hassles", desc: "Forget about long lines and worry about where to stay. Naman takes away the stress, making your journey simple." },
                            { title: "Your Reliable Friend", desc: "Think of Naman as a friend on your spiritual journey More than a service, we’re here to make every moment peaceful and full of respect." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <h3 className="text-xl font-bold text-orange-600 mb-3">{item.title}</h3>
                                <p className="text-stone-700 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* What Makes Us Special */}
            <Container className="py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 flex justify-center animate-fade-in-up">
                        <img src={prayerHands} alt="Prayer Hands" className="max-w-sm w-full object-contain drop-shadow-2xl" />
                    </div>
                    <div className="order-1 md:order-2 space-y-8">
                        <h2 className="text-4xl font-display font-bold text-stone-900 mb-8 animate-fade-in-up">WHAT MAKES US SPECIAL</h2>
                        <ul className="space-y-6">
                            {[
                                { title: "Complete Care", desc: "We take care of your mind, body, and soul." },
                                { title: "Meaningful Moments", desc: "Discover rituals that make your devotional journey more meaningful." },
                                { title: "Guidance", desc: "Our experienced guides are here to help you every step of the way." }
                            ].map((item, index) => (
                                <li key={index} className="flex gap-4 items-start animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                                    <div className="w-2 h-2 mt-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-xl text-stone-900">{item.title}</h4>
                                        <p className="text-stone-600">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>

            {/* Promises & Values */}
            <div className="bg-orange-50 py-20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-display font-bold text-stone-900 animate-fade-in-up">Our Values</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-up delay-100">
                                    <h4 className="font-bold text-orange-600 mb-2">Keep It Simple</h4>
                                    <p className="text-sm text-stone-600">Making the spiritual journey easy for everyone</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-up delay-200">
                                    <h4 className="font-bold text-orange-600 mb-2">Peaceful Vibes</h4>
                                    <p className="text-sm text-stone-600">Finding inner peace and harmony</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-up delay-300">
                                    <h4 className="font-bold text-orange-600 mb-2">Moments That Matter</h4>
                                    <p className="text-sm text-stone-600">Creating lasting impact</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-orange-200 animate-fade-in-up text-left md:text-center">
                            <h2 className="text-3xl font-display font-bold text-stone-900 mb-6">OUR PROMISE</h2>
                            <p className="text-lg text-stone-700 leading-relaxed italic">
                                "Experience divine ease with Naman VIP Darshan. Skip the queues and waiting times for a seamless, privileged spiritual journey. Prioritizing tranquility and reverence, we redefine your temple visits for an exclusive encounter with your deity."
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Mission Section */}
            <Container className="py-20">
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl animate-fade-in-up">
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-display font-bold text-orange-400">OUR MISSION</h2>
                            <p className="text-xl text-blue-100 leading-relaxed font-light">
                                Our mission at Naman is to help people on their devotional journey. We want to provide a safe place where you can find simplicity, peace, and moments that matter.
                            </p>
                            <div className="flex gap-6 pt-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Phone className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <span className="text-xs text-blue-200">Support</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Mail className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <span className="text-xs text-blue-200">Contact</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Banknote className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <span className="text-xs text-blue-200">Value</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img src={missionIllustration} alt="Mission" className="max-w-xs md:max-w-sm w-full object-contain" />
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </Container>
        </Layout>
    );
};

export default AboutUs;
