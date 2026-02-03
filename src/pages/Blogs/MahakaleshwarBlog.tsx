import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Flame } from "lucide-react";
import CommentSection from "@/components/common/CommentSection";
import LeadForm from "@/components/common/LeadForm";

const MahakaleshwarBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "dakshin", title: "Dakshin-Mukhi Jyotirlinga" },
        { id: "bhasma", title: "Bhasma Aarti" },
        { id: "corridor", title: "Mahakal Lok Corridor" },
        { id: "kalbhairav", title: "Kal Bhairav Temple" }
    ];

    const recentPosts = [
        { title: "Kashi Vishwanath Guide", link: "/blog/kashi-vishwanath-moksha-ganga-aarti-guide" },
        { title: "Kedarnath Yatra History", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Shirdi Sai Baba Promises", link: "/blog/shirdi-sai-baba-11-vachan-promises-meaning" }
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
                        <span className="text-primary font-medium">Mahakaleshwar Ujjain</span>
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
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-3 h-3 text-stone-500" />
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
                                    <div className="flex items-center gap-2 text-stone-600 font-bold tracking-wide uppercase text-sm mb-4">
                                        <span>Jyotirlinga</span>
                                        <span>•</span>
                                        <span>9 min read</span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                        Mahakaleshwar Ujjain: The Lord of Time (Mahakal)
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>By Naman Darshan</span>
                                        <span>•</span>
                                        <span>31 January 2026</span>
                                    </div>
                                </div>

                                <div className="w-full h-64 md:h-96">
                                    <img
                                        src="https://trainyatra.com/assets/images/bus-yatra/mahakaleshwar.jpg"
                                        alt="Mahakaleshwar Temple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-8 md:p-10 text-lg leading-relaxed text-slate-700 space-y-8">
                                    <p id="intro" className="font-medium text-xl text-slate-800 border-l-4 border-stone-500 pl-6 italic">
                                        Jai Mahakal! Ujjain is the city of temples, and at its heart lies the Mahakaleshwar Jyotirlinga. It is one of the 12 Jyotirlingas and holds immense spiritual significance because Lord Shiva reigns here as the King of Ujjain.
                                    </p>

                                    <section id="dakshin">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">1. The Only Dakshin-Mukhi Jyotirlinga</h2>
                                        <p>
                                            Mahakaleshwar is unique because the idol faces **South (Dakshin)**. In Hinduism, South is the direction of Death (Yama). As **‘Mahakal’** (The Conqueror of Time and Death), Lord Shiva facing south signifies his mastery over death itself. Devotees believe that praying here removes the fear of untimely death.
                                        </p>
                                    </section>

                                    <section id="bhasma">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display flex items-center gap-3">
                                            <Flame className="w-8 h-8 text-stone-600" /> 2. The Bhasma Aarti
                                        </h2>
                                        <p>
                                            The most famous ritual here is the **Bhasma Aarti**, performed daily at 4:00 AM. In ancient times, fresh ash from a funeral pyre was used, signifying that everything eventually turns to ash, and Shiva is the ultimate reality. Today, sacred ash prepared from cow dung (Vibhooti) is used in a mesmerizing ritual where the deity is bathed in ash.
                                        </p>
                                    </section>

                                    <section id="corridor">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">3. Mahakal Lok Corridor</h2>
                                        <p>
                                            The newly constructed **Mahakal Lok** is a grand corridor over 900 meters long, depicting stories from the Shiva Purana through magnificent statues and murals. Walking through it feels like walking through the divine tales of Mahadev. It is best visited in the evening when it is beautifully illuminated.
                                        </p>
                                    </section>

                                    <section id="kalbhairav">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">4. Kal Bhairav Temple</h2>
                                        <p>
                                            No visit to Ujjain is complete without visiting **Kal Bhairav**, the guardian deity of the city. Here, liquor is traditionally offered to the deity as prasad—a ritual that has baffled scientists and devotees alike, as the stone idol seemingly imbibes the offering.
                                        </p>
                                    </section>

                                    {/* CTA Section */}
                                    <section className="bg-stone-900 rounded-2xl p-8 text-white shadow-lg text-center transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4">Plan Your Ujjain Yatra</h3>
                                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                                            Experience the Bhasma Aarti and Mahakal Lok with ease. We handle Hotels, Travel & Darshan arrangements.
                                        </p>
                                        <LeadForm triggerText="Book Mahakal Trip" title="Plan Ujjain Yatra" source="MahakaleshwarBlog" />
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

export default MahakaleshwarBlog;
