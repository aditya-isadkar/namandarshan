import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import CommentSection from "@/components/common/CommentSection";

// Using the image URL directly as provided in the previous simple version
const tirupatiImage = "https://staging1.namandarshan.com/wp-content/uploads/2024/03/tirumala.jpg";

const TirupatiBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "legend", title: "Legend of Srinivasa" },
        { id: "kubera-debt", title: "The Debt to Kubera" },
        { id: "tonsure", title: "Secrets of Hair Tonsure" },
        { id: "laddu", title: "The World-Famous Laddu" },
        { id: "darshan-guide", title: "Darshan Types & Guide" },
        { id: "walking", title: "Walking Routes" },
        { id: "plan-visit", title: "Plan Your Visit" }
    ];

    const recentPosts = [
        { title: "Kedarnath: The Abode of Shiva", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Ram Mandir Ayodhya: A Historic Victory", link: "/blog/ram-mandir-ayodhya-history-darshan-guide" },
        { title: "Mysteries of Jagannath Puri", link: "/blogs/mysteries-of-jagannath-puri" }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-amber-50">
            <SEO
                title="Tirupati Balaji Darshan Guide - Tickets, Timings & Tips"
                keywords={[
                    "How to book Tirupati Balaji darshan tickets online",
                    "Tirupati Balaji darshan timings and dress code",
                    "Different types of Tirupati darshan",
                    "Best time to visit Tirupati Balaji temple",
                    "Tirupati Balaji travel tips for pilgrims",
                    "Tirumala Venkateswara Temple guide",
                    "Tirupati Balaji accommodation and food options"
                ]}
                description="Plan your spiritual journey to Tirupati Balaji with this comprehensive darshan guide. Learn about online ticket booking, different types of darshan, essential dress code requirements, and the best time to visit for a hassle-free experience. Get practical tips on accommodation and local cuisine."
            />
            <Header />
            <main className="pt-32 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-amber-900/60 mb-6">
                        <Link to="/" className="hover:text-amber-700 flex items-center gap-1">
                            <Home className="w-4 h-4" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/#spiritual-reads" className="hover:text-amber-700">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-amber-700 font-medium">Tirupati: The Kaliyuga Vaikuntha</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Sidebar - Table of Contents */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-amber-100">
                                <h3 className="font-bold text-lg mb-4 text-amber-900 border-b border-amber-100 pb-3">Table of Contents</h3>
                                <nav className="space-y-2">
                                    {tableOfContents.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-3 h-3 text-amber-500" />
                                            {item.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-6">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
                                {/* Title Section */}
                                <div className="p-8 md:p-10">
                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-tight">
                                        Tirupati Balaji: The Richest Temple & its Mysterious Legends
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <span>📅 24 January 2026</span>
                                        <span>•</span>
                                        <span>18 min read</span>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full h-64 md:h-96">
                                    <img src={tirupatiImage} alt="Tirupati Balaji" className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8 text-lg leading-relaxed text-slate-700">
                                    <p id="intro" className="text-xl font-medium text-slate-800 border-l-4 border-amber-500 pl-6 italic">
                                        Perched atop the seven hills of Seshachalam in Andhra Pradesh, the Tirumala Venkateswara Temple is often called "Kaliyuga Vaikuntha"—the earthly abode of Lord Vishnu in this age. It is the most visited holy place in the world, receiving 50,000 to 100,000 pilgrims daily.
                                    </p>

                                    <section id="legend">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The Legend of Srinivasa & Padmavathi</h2>
                                        <p className="mb-4">
                                            The story begins with Sage Bhrigu kicking Lord Vishnu on the chest. Goddess Lakshmi, residing in Vishnu's chest, felt insulted and left Vaikuntha to meditate on Earth. Vishnu, unable to bear the separation, descended to Earth as Srinivasa.
                                        </p>
                                        <p className="mb-4">
                                            He lived in an anthill and was fed by a cow (which was Brahma in disguise). Eventually, he met Padmavathi, the daughter of Akasha Raja, and fell in love. Their celestial wedding is the foundation of the Tirumala temple's glory.
                                        </p>
                                    </section>

                                    <section id="kubera-debt" className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                        <h2 className="text-3xl font-bold text-amber-900 mb-4 font-display">The Debt to Kubera: Why Devotees Donate?</h2>
                                        <p className="mb-4">
                                            For his grand wedding to Padmavathi, Srinivasa had no wealth. He approached **Kubera**, the God of Wealth, for a loan. Kubera agreed, but on a condition that the loan would be repaid with interest until the end of the Kali Yuga.
                                        </p>
                                        <p>
                                            This is why millions of devotees donate money and gold into the Hundi (donation box) at Tirupati. They believe they are helping the Lord repay his debt. In return, the Lord grants them prosperity multifold.
                                        </p>
                                    </section>

                                    <section id="tonsure">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Secrets of Hair Tonsure (Mokku)</h2>
                                        <p className="mb-4">
                                            A unique custom at Tirupati is tonsuring—shaving one's head. The legend says that when Srinivasa was hit by a shepherd on his head, a portion of his hair was cut. **Neela Devi**, a Gandharva princess, witnessed this and immediately cut her own lustrous hair to implant it on the Lord's head.
                                        </p>
                                        <p>
                                            Touched by her sacrifice, Lord Srinivasa blessed her saying that hair is the most beautiful asset of a human. Anyone who sacrifices their hair at his feet will be blessed, and the hair will reach Neela Devi.
                                        </p>
                                    </section>

                                    <section id="laddu">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The World-Famous Srivari Laddu</h2>
                                        <p className="mb-4">
                                            The pilgrimage is incomplete without the **Tirupati Laddu**. This divine sweet has a Geographical Indication (GI) tag, meaning it cannot be legally made or sold under this name anywhere else in the world.
                                        </p>
                                        <p className="mb-4">
                                            It is prepared in the temple kitchen known as ‘Potu’ by special priests called 'Potuas'. The recipe involves pure ghee, cashew nuts, raisins, cardamom, and sugar candy, strictly followed for centuries. The taste is said to be unreplicable throughout the world.
                                        </p>
                                    </section>

                                    <section id="darshan-guide">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Darshan Types & Guide</h2>
                                        <p className="mb-4">
                                            Getting a glimpse of the Lord can be challenging due to the massive crowds.
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-4">
                                            <li><strong>Special Entry Darshan (SED):</strong> Costs ₹300. Must be booked online 2-3 months in advance. It is the fastest way (2-4 hours).</li>
                                            <li><strong>Sarva Darshan (Free):</strong> Can take 10 to 24 hours. Tokens are issued at counters in Tirupati.</li>
                                            <li><strong>Divya Darshan (Pedestrian):</strong> For those who walk up the hills. Currently merged with Sarva Darshan or given special slots depending on the rush.</li>
                                        </ul>
                                    </section>

                                    <section id="walking" className="bg-stone-100 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Walking Routes</h2>
                                        <p className="mb-4">
                                            For the devout, walking up the hills is an act of penance.
                                        </p>
                                        <p>
                                            <strong>Alipiri Mettu:</strong> The main and longer route (9 km, ~3550 steps). Takes 4-6 hours.
                                            <br />
                                            <strong>Srivari Mettu:</strong> The shorter, steeper route (2.1 km, ~2388 steps). Takes 1.5-2 hours.
                                        </p>
                                    </section>

                                    <section id="plan-visit" className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-8 text-white shadow-lg transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                                            <span>🙏</span> Govinda! Govinda!
                                        </h3>
                                        <p className="text-lg mb-6 opacity-90 text-white font-medium">
                                            The spiritual vibration at Tirumala is potent. Let Naman Darshan handle your SED tickets, accommodation, and travel comfort so you can focus entirely on the Lord.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link to="/yatra">
                                                <Button size="lg" className="w-full sm:w-auto bg-amber-900/80 text-white hover:bg-amber-900 font-bold text-lg h-12">
                                                    View Tirupati Packages
                                                </Button>
                                            </Link>
                                            <Link to="/darshan">
                                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/20 font-bold text-lg h-12">
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
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-amber-100">
                                <h3 className="font-bold text-lg mb-4 text-amber-900 bg-amber-300 text-amber-900 px-4 py-3 -mx-6 -mt-6 rounded-t-xl">Recent Posts</h3>
                                <div className="space-y-4 mt-6">
                                    {recentPosts.map((post, index) => (
                                        <Link
                                            key={index}
                                            to={post.link}
                                            className="block p-3 hover:bg-amber-50 rounded-lg transition-colors border-b last:border-0 border-amber-100 group"
                                        >
                                            <p className="text-sm font-medium text-amber-900 group-hover:text-amber-600 line-clamp-2 transition-colors">
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

export default TirupatiBlog;
