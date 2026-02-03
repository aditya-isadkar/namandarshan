import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import blogImage from "@/assets/blogs/kedarnath.jpg";
import CommentSection from "@/components/common/CommentSection";

const KedarnathBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "legend", title: "The Legend of Pandavas" },
        { id: "panch-kedar", title: "The Panch Kedar Mystery" },
        { id: "history", title: "Adi Shankaracharya & History" },
        { id: "architecture", title: "Architectural Marvel" },
        { id: "miracle-2013", title: "The Miracle of 2013" },
        { id: "spiritual-significance", title: "Spiritual Significance" },
        { id: "best-time", title: "Best Time to Visit" },
        { id: "plan-yatra", title: "Plan Your Yatra" }
    ];

    const recentPosts = [
        { title: "Ram Mandir Ayodhya: A Historic Victory", link: "/blog/ram-mandir-ayodhya-history-darshan-guide" },
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
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Legend of Kedarnath - History, Mythology & Pandavas Story"
                keywords={[
                    "Kedarnath temple history and myths",
                    "Pandavas story Kedarnath pilgrimage",
                    "Lord Shiva bull legend Kedarnath",
                    "Panch Kedar temples origin story",
                    "Spiritual significance of Kedarnath Jyotirlinga",
                    "Adi Shankaracharya Kedarnath revival",
                    "Ancient legends of Kedarnath Dham"
                ]}
                description="Unravel the ancient and mystical legends surrounding Kedarnath Temple, from the Pandavas' quest for absolution and Lord Shiva's intrigue disguise as a bull, to the temple's revival by Adi Shankaracharya. Discover the spiritual significance of this sacred Jyotirlinga."
            />
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
                        <span className="text-primary font-medium">Kedarnath: The Adobe of Shiva</span>
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
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-primary hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
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
                                {/* Title Section */}
                                <div className="p-8 md:p-10">
                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-tight">
                                        Kedarnath Temple: The Eternal Abode of Lord Shiva
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <span>📅 22 January 2026</span>
                                        <span>•</span>
                                        <span>15 min read</span>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full h-64 md:h-96">
                                    <img src={blogImage} alt="Kedarnath Temple" className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8 text-lg leading-relaxed text-slate-700">
                                    <p id="intro" className="text-xl font-medium text-slate-800 border-l-4 border-orange-500 pl-6 italic">
                                        Standing tall amidst the majestic Garhwal Himalayas, Kedarnath is more than just a temple—it is a testament to faith, resilience, and the eternal power of Lord Shiva. As one of the Char Dhams and the most revered of the twelve Jyotirlingas, it commands a silence that speaks to the soul.
                                    </p>

                                    <section id="legend">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The Legend of Pandavas: A Quest for Redemption</h2>
                                        <p className="mb-4">
                                            The origins of Kedarnath are deeply entwined with the epic Mahabharata. The story goes that after the Great War at Kurukshetra, the Pandavas were victorious but devastated. They had won the kingdom but lost their kin. The guilt of "Gotra Hatya" (killing of kinsmen) and "Brahmana Hatya" (killing of Brahmins/Gurus like Drona) weighed heavily on their souls.
                                        </p>
                                        <p className="mb-4">
                                            Seeking atonement, they approached Sage Vyasa, who advised them that only Lord Shiva could absolve them of such grave sins. The brothers, along with Draupadi, set out on a journey to find Mahadev. However, Shiva was not easy to find. In fact, he was avoiding them, annoyed by the bloodshed of the war.
                                        </p>
                                        <p>
                                            Knowing the Pandavas were approaching Kashi (Varanasi), Shiva fled to the Himalayas and disguised himself as a bull, hiding among a herd of cattle in the valley of Kedarnath.
                                        </p>
                                    </section>

                                    <section id="panch-kedar" className="bg-slate-50 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">The Panch Kedar Mystery</h2>
                                        <p className="mb-4">
                                            The Pandavas, determined in their pursuit, reached the valley. Bhima, the mightiest of them, recognized the divine presence. He stood astride two mountains and looked for the unique bull. As the cattle passed under his legs, one bull refused to do so. Bhima realized this was Shiva.
                                        </p>
                                        <p className="mb-4">
                                            He lunged to catch the bull, but Shiva began to dive into the earth. Bhima only managed to grab the hump. It is this conical rock structure—the hump—that is worshipped as the Shiva Lingam at Kedarnath today.
                                        </p>
                                        <p>
                                            The other parts of Shiva's body reappeared at four different locations, creating the holy circuit of **Panch Kedar**:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-4">
                                            <li><strong>Kedarnath:</strong> The Hump.</li>
                                            <li><strong>Tungnath:</strong> The Arms (Bahu).</li>
                                            <li><strong>Rudranath:</strong> The Face (Mukh).</li>
                                            <li><strong>Madhyamaheshwar:</strong> The Navel (Nabhi).</li>
                                            <li><strong>Kalpeshwar:</strong> The Hair (Jata).</li>
                                        </ul>
                                    </section>

                                    <section id="history">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Adi Shankaracharya & The Temple's Revival</h2>
                                        <p className="mb-4">
                                            While the Pandavas are said to have built the original temple, the current structure is a marvel credited to the great philosopher and reformer, Adi Shankaracharya, in the 8th century AD.
                                        </p>
                                        <p className="mb-4">
                                            It is believed that Shankaracharya, after establishing the four Mathas across India, took his Mahasamadhi at Kedarnath at the young age of 32. His Samadhi is located just behind the main temple, a spot of intense spiritual energy where devotees pay their respects.
                                        </p>
                                    </section>

                                    <section id="architecture">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Architectural Marvel defying Time</h2>
                                        <p className="mb-4">
                                            The temple is a masterpiece of stone architecture. Built on a large rectangular platform, it is constructed from massive grey slabs of stone interlocked with iron clamps. No mortar or cement was used.
                                        </p>
                                        <p>
                                            Considering its location at an altitude of 3,583 meters, where the weather is harsh and unpredictable, the construction of such a massive edifice over a thousand years ago is nothing short of a miracle. The temple walls are adorned with figures of deities and scenes from mythology, standing as a silent witness to centuries of snowstorms and avalanches.
                                        </p>
                                    </section>

                                    <section id="miracle-2013" className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                        <h2 className="text-3xl font-bold text-orange-900 mb-4 font-display">The Miracle of 2013</h2>
                                        <p className="mb-4">
                                            In June 2013, Uttarakhand witnessed a catastrophic flash flood. The town of Kedarnath was obliterated. Buildings collapsed like houses of cards, and rocks and debris washed away everything in their path.
                                        </p>
                                        <p className="mb-4">
                                            However, the temple stood unharmed.
                                        </p>
                                        <p>
                                            Eyewitnesses and video footage revealed a massive boulder—now revered as the **Shiva Shila** or **Bhim Shila**—rolled down with the floodwaters and stopped just a few feet behind the temple. This rock split the gushing water into two streams that flowed around the temple, leaving it untouched. It was a divine intervention that reinforced the faith of millions.
                                        </p>
                                    </section>

                                    <section id="spiritual-significance">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Spiritual Significance</h2>
                                        <p className="mb-4">
                                            Kedarnath is more than a destination; it is a journey inward. The air here vibrates with the mantra "Om Namah Shivay". It is believed that a visit to Kedarnath, combined with a dip in the holy Mandakini river, washes away lifetimes of karma.
                                        </p>
                                        <p>
                                            The temple opens its doors to devotees only for six months a year, from **Akshaya Tritiya** (April/May) to **Kartik Purnima** (October/November). During the winter, the deity is carried down to Ukhimath, where worship continues.
                                        </p>
                                    </section>

                                    <section id="best-time">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Best Time to Visit</h2>
                                        <p className="mb-4">
                                            The best time to visit is during the summer months of **May to June** and the post-monsoon months of **September to October**. Monsoon (July-August) can be risky due to landslides.
                                        </p>
                                        <p>
                                            The trek to Kedarnath is about 16-18 km from Gaurikund. It is a test of physical and mental endurance, but the first glimpse of the temple dome shining against the backdrop of the snowy Kedar Dome peak makes every step worth it.
                                        </p>
                                    </section>

                                    <section id="plan-yatra" className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 text-white shadow-lg transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                                            <span>🕉️</span> Plan Your Divine Yatra
                                        </h3>
                                        <p className="text-lg mb-6 opacity-90">
                                            Don't let logistics hinder your devotion. At Naman Darshan, we ensure your journey to the abode of Shiva is comfortable and memorable. From Helicopter tickets to VIP Darshan assistance, we handle it all.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link to="/kedarnath-yatra">
                                                <Button size="lg" className="w-full sm:w-auto bg-white text-orange-700 hover:bg-orange-50 font-bold text-lg h-12">
                                                    View Kedarnath Packages
                                                </Button>
                                            </Link>
                                            <Link to="/darshan">
                                                <Button size="lg" className="w-full sm:w-auto bg-stone-900 text-white hover:bg-stone-800 font-bold text-lg h-12">
                                                    Book Helicopter / VIP
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

export default KedarnathBlog;
