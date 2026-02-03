import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/common/CommentSection";

const ShirdiPromisesBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "promises", title: "11 Vachans of Sai Baba" },
        { id: "udi", title: "The Power of Udi" }
    ];

    const recentPosts = [
        { title: "Shirdi Sai Baba Yatra Guide", link: "/blog/shirdi-yatra" },
        { title: "Tirupati Balaji Darshan", link: "/blog/tirupati-balaji-darshan-booking-laddu-mystery" },
        { title: "Golden Temple Amritsar", link: "/blog/golden-temple-amritsar-history-langar-guide" }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                        <Link to="/" className="hover:text-primary flex items-center gap-1">
                            <Home className="w-4 h-4" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/blogs" className="hover:text-primary">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary font-medium">Sai Baba's Promises</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Sidebar - Table of Contents */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-slate-100">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-3">Table of Contents</h3>
                                <nav className="space-y-2">
                                    {tableOfContents.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-3 h-3 text-orange-500" />
                                            {item.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-6">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-2 text-orange-600 font-bold tracking-wide uppercase text-sm mb-4">
                                        <span>Spiritual</span>
                                        <span>•</span>
                                        <span>6 min read</span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                        Shirdi Sai Baba’s 11 Promises (11 Vachan)
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>By Naman Darshan</span>
                                        <span>•</span>
                                        <span>31 January 2026</span>
                                    </div>
                                </div>

                                <div className="w-full h-64 md:h-96">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Sri_Sai_Baba_Temple_%2C_Shirdi.jpg"
                                        alt="Shirdi Sai Baba Temple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-8 md:p-10 text-lg leading-relaxed text-slate-700 space-y-8">
                                    <p id="intro" className="font-medium text-xl text-slate-800 border-l-4 border-orange-500 pl-6 italic">
                                        Om Sai Ram! Shirdi Sai Baba is revered by millions across the globe. His teachings of **Shraddha** (Faith) and **Saburi** (Patience) continue to guide devotees. To reassure his children, Baba gave **11 Golden Promises** (Giarah Vachan) before taking Samadhi.
                                    </p>

                                    <section id="promises">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display">The 11 Vachans of Sai Baba</h2>
                                        <p className="mb-6">These promises are a lifeline for devotees in times of distress:</p>

                                        <div className="grid gap-4">
                                            {[
                                                "Whoever puts their feet on Shirdi soil, their sufferings will come to an end.",
                                                "The wretched and miserable will rise to joy and happiness as soon as they climb the steps of the Dwarkamai.",
                                                "I shall be ever active and vigorous even after leaving this earthly body.",
                                                "My tomb shall bless and speak to the needs of my devotees.",
                                                "I shall be active and vigorous even from my tomb.",
                                                "I am ever living to help and guide all who come to me, who surrender to me and who seek refuge in me.",
                                                "If you look to me, I look to you.",
                                                "If you cast your burden on me, I shall surely bear it.",
                                                "If you seek my advice and help, it shall be given to you at once.",
                                                "There shall be no want in the house of my devotee.",
                                                "Why do you fear when I am here?"
                                            ].map((promise, index) => (
                                                <div key={index} className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100 items-start">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <p className="font-medium text-slate-800 italic">"{promise}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="udi">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">The Power of Udi</h2>
                                        <p>
                                            The sacred ash (**Udi**) from the eternal fire (Dhuni) that Baba lit in Dwarkamai has miraculous healing powers. Devotees apply it on their forehead for protection and take it with water for cure. It represents the transient nature of life and Baba's eternal grace.
                                        </p>
                                    </section>

                                    {/* CTA Section */}
                                    <section className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-white shadow-lg text-center transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4">Seek Baba’s Blessings in Shirdi</h3>
                                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                                            Plan a divine trip to Shirdi. We handle Hotel, Travel & Darshan arrangements for a stress-free yatra.
                                        </p>
                                        <Link to="/shirdi-yatra">
                                            <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg h-12 shadow-md">
                                                View Shirdi Packages
                                            </Button>
                                        </Link>
                                    </section>
                                </div>
                            </div>
                            <CommentSection />
                        </article>

                        {/* Right Sidebar - Recent Posts */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-slate-100">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 bg-primary text-white px-4 py-3 -mx-6 -mt-6 rounded-t-xl">Recent Posts</h3>
                                <div className="space-y-4 mt-6">
                                    {recentPosts.map((post, index) => (
                                        <Link
                                            key={index}
                                            to={post.link}
                                            className="block p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0 border-slate-100 group"
                                        >
                                            <p className="text-sm font-medium text-slate-800 group-hover:text-primary line-clamp-2 transition-colors">
                                                {post.title}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShirdiPromisesBlog;
