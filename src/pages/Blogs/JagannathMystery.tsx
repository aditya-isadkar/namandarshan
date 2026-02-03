import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import blogImage from "@/assets/blogs/jagannath.jpg";
import CommentSection from "@/components/common/CommentSection";

const JagannathMystery = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "flag", title: "The Flag Defies Nature" },
        { id: "chakra", title: "Sudarshan Chakra Mystery" },
        { id: "shadow", title: "No Shadow & No Birds" },
        { id: "prasadam", title: "Miraculous Mahaprasad" },
        { id: "plan-visit", title: "Plan Your Visit" }
    ];

    const recentPosts = [
        { title: "The Legend of Kedarnath: The Bull Form", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Jagannath Puri Yatra Packages", link: "/jagannath-yatra" },
        { title: "Book VIP Darshan Online", link: "/darshan" }
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
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                        <Link to="/" className="hover:text-primary flex items-center gap-1">
                            <Home className="w-4 h-4" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/#spiritual-reads" className="hover:text-primary">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary font-medium">Mysteries of Jagannath Puri</span>
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
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-3 h-3 text-purple-500" />
                                            {item.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-6">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                                {/* Title Section */}
                                <div className="p-8 md:p-10">
                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-tight">
                                        Mysteries of Jagannath Puri: Where Science Bows to Divinity
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <span>📅 20 January 2026</span>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full h-64 md:h-96">
                                    <img src={blogImage} alt="Jagannath Puri Temple" className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8 text-lg leading-relaxed text-slate-700">
                                    <p id="intro" className="text-xl font-medium text-slate-800 border-l-4 border-purple-500 pl-6 italic">
                                        Jai Jagannath! The Jagannath Temple in Puri, Odisha, is not just a holy shrine but a place where the physical laws of our universe seem to suspend.
                                    </p>

                                    <section id="flag">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">1. The Flag that Defies Nature</h2>
                                        <p className="mb-4">
                                            One of the most visible miracles is the **Patita Pavana flag** atop the temple's peak. In any other place on Earth, a flag flies in the direction of the wind. But at Puri, the flag always flies in the **opposite direction** to the wind.
                                        </p>
                                        <p>
                                            Every single day, for over 1.8 millennia, a priest climbs the 214-foot high dome with bare hands to change the flag. If this ritual is missed for even one day, the temple will remain closed for the next 18 years.
                                        </p>
                                    </section>

                                    <section id="chakra" className="bg-slate-50 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">2. The Sudarshan Chakra Mystery</h2>
                                        <p className="mb-4">
                                            Atop the temple sits the **Neel Chakra**, a massive Sudarshan Chakra made of eight different metals. It weighs about a ton and stands 11 feet high.
                                        </p>
                                        <p>
                                            The mystery: How was such a heavy object lifted 1,200 years ago without modern cranes? And more baffling—no matter where you stand in Puri, the Chakra always appears to be facing you squarely.
                                        </p>
                                    </section>

                                    <section id="shadow">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">3. No Shadow & No Birds</h2>
                                        <p className="mb-4">
                                            The architectural perfection is such that the main dome **casts no shadow** on the ground at any time of the day.
                                        </p>
                                        <p>
                                            Furthermore, no bird is ever seen sitting on the dome, nor does any aircraft fly directly over it. This phenomenon, called **Anasuya**, creates a silent, sacred air space.
                                        </p>
                                    </section>

                                    <section id="prasadam" className="bg-slate-50 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">4. The Miraculous Mahaprasad</h2>
                                        <p className="mb-4">
                                            The kitchen is the largest in the world. Food is cooked in seven earthen pots placed one on top of the other. In defiance of thermodynamics, the food in the **topmost pot** always cooks first.
                                        </p>
                                        <p>
                                            The amount cooked remains the same daily, serving anywhere from 2,000 to over 200,000 people. Yet, the Mahaprasad never falls short, and not a single morsel is wasted.
                                        </p>
                                    </section>

                                    <section id="plan-visit" className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
                                        <h3 className="text-3xl font-bold mb-4">🙏 Witness the Miracles of Puri</h3>
                                        <p className="text-lg mb-6 opacity-90">Experience the divine energy of the Char Dham of the East. Let us handle your travel and VIP Darshan.</p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link to="/yatra">
                                                <Button size="lg" className="w-full sm:w-auto bg-white text-purple-600 hover:bg-slate-100 font-bold">
                                                    View Puri Packages
                                                </Button>
                                            </Link>
                                            <Link to="/darshan">
                                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-bold">
                                                    Book VIP Darshan
                                                </Button>
                                            </Link>
                                        </div>
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
                                            className="block p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0 border-slate-100"
                                        >
                                            <p className="text-sm font-medium text-slate-800 hover:text-primary line-clamp-2">
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

export default JagannathMystery;
