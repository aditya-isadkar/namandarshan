import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import CommentSection from "@/components/common/CommentSection";

// Using the image URL directly as provided in the previous simple version
const ramMandirImage = "https://staging1.namandarshan.com/wp-content/uploads/2024/03/ram-mandir.webp";

const RamMandirBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "struggle", title: "500-Year Struggle" },
        { id: "pran-pratishtha", title: "The Grand Consecration" },
        { id: "idol", title: "The Divine Idol of Ram Lalla" },
        { id: "architecture", title: "Nagara Architecture" },
        { id: "surya-tilak", title: "The Surya Tilak Miracle" },
        { id: "ayodhya-boom", title: "Ayodhya's Transformation" },
        { id: "plan-visit", title: "Plan Your Visit" }
    ];

    const recentPosts = [
        { title: "Kedarnath: The Abode of Shiva", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Tirupati Balaji: Complete Darshan Guide", link: "/blog/tirupati-balaji-darshan-booking-laddu-mystery" },
        { title: "Mysteries of Jagannath Puri", link: "/blogs/mysteries-of-jagannath-puri" }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <SEO
                title="Ram Mandir Ayodhya History - Dispute to Consecration"
                keywords={[
                    "Ram Mandir Ayodhya historical timeline",
                    "History of Ram Janmabhoomi dispute",
                    "Supreme Court verdict Ayodhya temple",
                    "Construction details of Ayodhya Ram Temple",
                    "Ram Mandir inauguration ceremony 2024",
                    "Ayodhya temple architecture Nagara style",
                    "Birthplace of Lord Rama Ayodhya"
                ]}
                description="Explore the intricate history of Ram Mandir in Ayodhya, tracing its journey from ancient beliefs about Lord Rama's birthplace through centuries of dispute, legal battles, and the landmark Supreme Court verdict. Delve into the architectural marvel of the new temple and its profound cultural significance."
            />
            <Header />
            <main className="pt-32 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-stone-600 mb-6">
                        <Link to="/" className="hover:text-orange-600 flex items-center gap-1">
                            <Home className="w-4 h-4" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/#spiritual-reads" className="hover:text-orange-600">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-orange-600 font-medium">Ram Mandir: A Victory of Faith</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Sidebar - Table of Contents */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-stone-100">
                                <h3 className="font-bold text-lg mb-4 text-stone-900 border-b pb-3">Table of Contents</h3>
                                <nav className="space-y-2">
                                    {tableOfContents.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
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
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100">
                                {/* Title Section */}
                                <div className="p-8 md:p-10">
                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-4 leading-tight">
                                        Ram Mandir Ayodhya: The 500-Year Wait Ends
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-stone-600">
                                        <span>📅 22 January 2026</span>
                                        <span>•</span>
                                        <span>20 min read</span>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full h-64 md:h-96">
                                    <img src={ramMandirImage} alt="Ram Mandir Ayodhya" className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8 text-lg leading-relaxed text-stone-700">
                                    <p id="intro" className="text-xl font-medium text-stone-800 border-l-4 border-orange-500 pl-6 italic">
                                        "Ram Aayenge" — a chant that echoed in the hearts of millions for centuries, finally became a reality on January 22, 2024. The Grand Ram Mandir in Ayodhya is not just a structure of stone; it is a symbol of civilizational resilience, cultural revival, and the unwavering faith of a nation.
                                    </p>

                                    <section id="struggle">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The 500-Year Struggle</h2>
                                        <p className="mb-4">
                                            The history of the Ram Janmabhoomi movement is etched in sacrifice. It dates back to the 16th century when the original temple, believed to mark the exact birthplace of Lord Ram, was demolished. For centuries, devotees continued to worship at the site, often facing severe restrictions and conflicts.
                                        </p>
                                        <p className="mb-4">
                                            The legal battle for the land was one of the longest in Indian history. From district courts to the High Court and finally the Supreme Court, the case spanned decades.
                                        </p>
                                        <p>
                                            The turning point came on **November 9, 2019**, when the Supreme Court of India delivered a unanimous and historic verdict, handing over the disputed land for the construction of the Ram Temple. It was a victory not just for a community, but for the principle of truth and justice.
                                        </p>
                                    </section>

                                    <section id="pran-pratishtha" className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                        <h2 className="text-3xl font-bold text-orange-900 mb-4 font-display">The Grand Consecration (Pran Pratishtha)</h2>
                                        <p className="mb-4">
                                            On **January 22, 2024**, the world watched in awe as Prime Minister Narendra Modi, serving as the Mukhya Yajman, performed the rules of the Pran Pratishtha ceremony.
                                        </p>
                                        <p className="mb-4">
                                            Ayodhya was decked up like a bride. Millions of lamps were lit, creating a Diwali-like atmosphere. Helicopters showered flower petals on the temple as the new idol of Ram Lalla was unveiled. The atmosphere was charged with tears of joy and chants of "Jai Shri Ram".
                                        </p>
                                    </section>

                                    <section id="idol">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The Divine Idol of Ram Lalla</h2>
                                        <p className="mb-4">
                                            The central deity, **Ram Lalla Virajman**, depicts Lord Ram as a five-year-old child. The idol was sculpted by the renowned artist **Arun Yogiraj** from Mysore, Karnataka.
                                        </p>
                                        <p className="mb-4">
                                            Carved from a single block of **Krishna Shila** (black stone), the idol’s face holds a divine serenity—a mix of childish innocence and divine divinity. The eyes are said to be captivating, drawing the devotee into a trance. The idol is adorned with gold and precious gems, holding a golden bow and arrow.
                                        </p>
                                    </section>

                                    <section id="architecture">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Architectural Marvel: The Nagara Style</h2>
                                        <p className="mb-4">
                                            Designed by the celebrated **Sompura family** (who also designed the Somnath Temple), the Ram Mandir is a masterpiece of the **Nagara style** of temple architecture.
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-4">
                                            <li><strong>No Iron or Steel:</strong> To ensure the temple lasts for over 1,000 years, no iron or steel has been used, as they are prone to rusting. Instead, copper, white cement, and wood have been used.</li>
                                            <li><strong>Pink Sandstone:</strong> The main structure uses Pink Sandstone from Bansi Paharpur in Rajasthan.</li>
                                            <li><strong>Dimensions:</strong> The temple is 380 feet long, 250 feet wide, and 161 feet high. It has 392 pillars and 44 doors.</li>
                                        </ul>
                                    </section>

                                    <section id="surya-tilak" className="bg-stone-100 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The Surya Tilak Miracle</h2>
                                        <p className="mb-4">
                                            Blending ancient wisdom with modern science, the temple features a unique mechanism designed by scientists from CBRI Roorkee and IIA Bengaluru.
                                        </p>
                                        <p>
                                            Every year on **Ram Navami**, at noon, a system of lenses and mirrors directs the sun's rays to fall precisely on the forehead of the Ram Lalla idol for about 4 minutes. This "Surya Tilak" is a symbolic anointing of the Lord by the Sun God himself.
                                        </p>
                                    </section>

                                    <section id="ayodhya-boom">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Ayodhya's Transformation</h2>
                                        <p className="mb-4">
                                            With the temple's arrival, the sleepy town of Ayodhya has transformed into a global spiritual capital.
                                        </p>
                                        <p>
                                            The new **Maharishi Valmiki International Airport** and the redeveloped **Ayodhya Dham Junction** railway station have made connectivity seamless. Luxury hotels, tent cities, and modern amenities have sprung up, welcoming millions of pilgrims from across the globe.
                                        </p>
                                    </section>

                                    <section id="plan-visit" className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl p-8 text-white shadow-lg transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                                            <span>🚩</span> Plan Your Ayodhya Yatra
                                        </h3>
                                        <p className="text-lg mb-6 opacity-90 text-stone-900 font-medium">
                                            Witness history with your own eyes. Naman Darshan makes your pilgrimage seamless with premium accommodation and guided darshan tours.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link to="/ayodhya-yatra">
                                                <Button size="lg" className="w-full sm:w-auto bg-stone-900 text-white hover:bg-stone-800 font-bold text-lg h-12">
                                                    View Ayodhya Packages
                                                </Button>
                                            </Link>
                                            <Link to="/darshan">
                                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-stone-900 text-stone-900 hover:bg-white/20 font-bold text-lg h-12">
                                                    Book VIP Services
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
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36 border border-stone-100">
                                <h3 className="font-bold text-lg mb-4 text-stone-900 bg-orange-500 text-white px-4 py-3 -mx-6 -mt-6 rounded-t-xl">Recent Posts</h3>
                                <div className="space-y-4 mt-6">
                                    {recentPosts.map((post, index) => (
                                        <Link
                                            key={index}
                                            to={post.link}
                                            className="block p-3 hover:bg-stone-50 rounded-lg transition-colors border-b last:border-0 border-stone-100 group"
                                        >
                                            <p className="text-sm font-medium text-stone-800 group-hover:text-orange-600 line-clamp-2 transition-colors">
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

export default RamMandirBlog;
