import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Flame } from "lucide-react";
import CommentSection from "@/components/common/CommentSection";
import LeadForm from "@/components/common/LeadForm";

const KashiBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "moksha", title: "Concept of Moksha" },
        { id: "aarti", title: "Ganga Aarti" },
        { id: "corridor", title: "Kashi Vishwanath Corridor" },
        { id: "lanes", title: "City of Gallis" }
    ];

    const recentPosts = [
        { title: "Mahakaleshwar Ujjain Guide", link: "/blog/mahakaleshwar-ujjain-jyotirlinga-bhasma-aarti" },
        { title: "Ram Mandir Ayodhya", link: "/blog/ram-mandir-ayodhya-history-darshan-guide" },
        { title: "Chardham Yatra Tips", link: "/blog/chardham-yatra-medical-tips-packing-guide" }
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
                        <span className="text-primary font-medium">Kashi: City of Light</span>
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
                                        <span>Moksha & Spiritual</span>
                                        <span>•</span>
                                        <span>7 min read</span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                        Kashi: The City of Light & Moksha
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>By Naman Darshan</span>
                                        <span>•</span>
                                        <span>31 January 2026</span>
                                    </div>
                                </div>

                                <div className="w-full h-64 md:h-96">
                                    <img
                                        src="https://iskconmumbaipull-21250.kxcdn.com/web/image/2664-430d01b4/rathyatra.webp"
                                        alt="Kashi Varanasi"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-8 md:p-10 text-lg leading-relaxed text-slate-700 space-y-8">
                                    <p id="intro" className="font-medium text-xl text-slate-800 border-l-4 border-orange-500 pl-6 italic">
                                        Har Har Mahadev! Kashi (Varanasi) is older than history, older than tradition, and older even than legend. It is believed to be the city founded by Lord Shiva himself. A trip to Kashi is not just a journey; it is a liberation of the soul.
                                    </p>

                                    <section id="moksha">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">1. The Concept of Moksha</h2>
                                        <p>
                                            It is believed that anyone who breathes their last in Kashi attains **Moksha** (liberation from the cycle of birth and death). Lord Shiva himself is said to whisper the **Tarak Mantra** into the ears of the dying here, granting them eternal peace.
                                        </p>
                                    </section>

                                    <section id="aarti">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display flex items-center gap-3">
                                            <Flame className="w-8 h-8 text-orange-500" /> 2. The Ganga Aarti at Dashashwamedh Ghat
                                        </h2>
                                        <p>
                                            Every evening, the Dashashwamedh Ghat comes alive with the divine Ganga Aarti. Priests holding large brass lamps perform a synchronized ritual to honor River Ganga, accompanied by chants, bells, and conch shells. It is a mesmerizing spiritual spectacle that must be witnessed from a boat for the best view.
                                        </p>
                                    </section>

                                    <section id="corridor">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">3. Kashi Vishwanath Corridor</h2>
                                        <p>
                                            The newly built **Kashi Vishwanath Dham** has transformed the pilgrimage experience. It now directly connects the Ganga Ghats to the temple, allowing devotees to take a holy dip in the river and walk straight to the sanctum sanctorum carrying Ganga Jal to offer to Baba Vishwanath.
                                        </p>
                                    </section>

                                    <section id="lanes">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">4. The City of Gallis (Lanes)</h2>
                                        <p>
                                            Varanasi is famous for its narrow labyrinthine lanes (galis) filled with the aroma of incense, frying kachoris, sweets, and the famous Banarasi Paan. Exploring these lanes is like walking through time, where ancient havelis stand beside modern life.
                                        </p>
                                    </section>

                                    {/* CTA Section */}
                                    <section className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white shadow-lg text-center transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4">Experience Divinity in Kashi</h3>
                                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                                            Witness the Ganga Aarti and have a hassle-free VIP Darshan. We handle Hotels, Boat Rides & Local Guidance.
                                        </p>
                                        <LeadForm triggerText="Plan Kashi Yatra" title="Plan Your Varanasi Trip" source="KashiBlog" />
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

export default KashiBlog;
