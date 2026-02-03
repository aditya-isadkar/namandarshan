import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Clock } from "lucide-react";
import CommentSection from "@/components/common/CommentSection";
import LeadForm from "@/components/common/LeadForm";

const GoldenTempleBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "history", title: "History & Architecture" },
        { id: "significance", title: "Religious Significance" },
        { id: "festivals", title: "Festivals" },
        { id: "visitor-info", title: "Visitor Information" },
        { id: "surrounding", title: "Surrounding Attractions" }
    ];

    const recentPosts = [
        { title: "The Legend of Kedarnath", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Mysteries of Jagannath Puri", link: "/blog/mysteries-of-jagannath-puri" },
        { title: "Ram Mandir Ayodhya Guide", link: "/blog/ram-mandir-ayodhya-history-darshan-guide" }
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
                        <Link to="/blogs" className="hover:text-primary">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary font-medium">Golden Temple Amritsar</span>
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
                                {/* Title Section */}
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-2 text-orange-600 font-bold tracking-wide uppercase text-sm mb-4">
                                        <span>Spiritual</span>
                                        <span>•</span>
                                        <span>10 min read</span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                        Golden Temple Yatra: The Shining Jewel of Amritsar
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>By Naman Darshan</span>
                                        <span>•</span>
                                        <span>31 January 2026</span>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full h-64 md:h-96">
                                    <img
                                        src="https://imgcld.yatra.com/holiday-india/image/upload/t_yt_blog_w_800_c_fill_g_auto_q_auto:good_f_jpg/v1441876623/blog/Golden_Temple_of_the_Darbar_Sahib.jpg"
                                        alt="Golden Temple Amritsar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8 text-lg leading-relaxed text-slate-700">
                                    <p id="intro" className="font-medium text-xl text-slate-800 border-l-4 border-orange-500 pl-6 italic">
                                        The Golden Temple is a very special place in India. It’s also known as Sri Harmandir Sahib or Darbar Sahib. This temple is not just a building; it’s like a shining golden jewel that attracts people from all over the world.
                                    </p>

                                    <p>
                                        Discover the Golden Temple in Amritsar—a serene haven drawing countless visitors seeking peace and spirituality. Beyond its breathtaking beauty, it’s a place where people find solace amid life’s hustle. This sacred sanctuary welcomes everyone, offering a chance to embrace inner peace and a spiritual connection, making each visit meaningful and serene.
                                    </p>

                                    <section id="history">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Historical Background and Architectural Splendor</h2>
                                        <p className="mb-4">
                                            Guru Nanak, the first Sikh guru, is said to meditate at the holy site where Harmandir Sahib was built. The sacred tank **Amrit Sarovar** was founded in 1577 by Guru Ram Das, the fourth Sikh guru. The construction of the gurudwara was initiated by the fifth Sikh guru – Guru Arjan.
                                        </p>
                                        <p className="mb-4">
                                            Guru Arjan designed it to be built in the centre of the tank. The construction started in 1581 and took almost eight years to complete. Then, he installed the **Adi Granth**, the holy scripture of Sikhism, inside the temple. The **Akal Takht** in the complex was constituted by the sixth guru, Guru Hargobind.
                                        </p>
                                        <p className="mb-4">
                                            Guru Arjan was arrested by the Mughals after the construction. And Harmandir Sahib Amritsar fell into the hands of the enemy. Guru Gobind Singh liberated it later, in the 18th century. He was the tenth Sikh guru. After Guru Gobind Singh’s death, Harmandir Sahib had been under attack by Islamic rulers. It was in 1762 when this religious heritage was blown away. Maharaja Ranjit Singh rebuilt it in 1809 and adorned it with gold foil. Thus, Harmandir Sahib came to be called the **Golden Temple**.
                                        </p>
                                        <p>
                                            It’s a blend of Indian and Mughal architectural styles. You’ll find symbolisms of life everywhere in Harmandir Sahib. They’re in paintings, in the form of birds, animals and flowers. While the dome is pure gold, the inner walls also exhibit goldwork. Copper sheets engraved with delicate designs are covered with gold leaves.
                                        </p>
                                    </section>

                                    <section id="significance">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Religious Significance</h2>
                                        <p>
                                            For many people, the Golden Temple is like a spiritual heart. It’s the holiest place for Sikhs. Sikhs believe in treating everyone equally, spreading love, and helping others. The temple represents these ideas, and inside, they keep their special holy book, the **Guru Granth Sahib**.
                                        </p>
                                    </section>

                                    <section id="festivals">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Festivals and Celebration</h2>
                                        <p>
                                            The Golden Temple is always buzzing with excitement, especially during festivals. **Vaisakhi** is a big celebration here, marking the Sikh New Year. During this time, the temple hosts special prayers, music, and free meals (Langar) for everyone. It’s like a happy and united party.
                                        </p>
                                    </section>

                                    <section id="visitor-info" className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                        <h2 className="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
                                            <Clock className="w-6 h-6" /> Visitor Information
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-24 font-bold text-slate-900">Timing:</div>
                                                <div className="text-slate-700">4:00 AM to 10:00 PM (Temple complex is open 24/7)</div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-24 font-bold text-slate-900">Entry Fee:</div>
                                                <div className="text-slate-700">No Entry Fee</div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="min-w-24 font-bold text-slate-900">Address:</div>
                                                <div className="text-slate-700">Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab, 143006, India</div>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-lg text-orange-900 mt-6 mb-3">How to Reach?</h3>
                                        <ul className="space-y-2 list-disc pl-5 text-slate-700">
                                            <li><strong>By Bus:</strong> Golden Temple Trust operates a free bus service from the bus stop and railway station (2 km away).</li>
                                            <li><strong>By Auto:</strong> Auto-rickshaws are readily available throughout Amritsar.</li>
                                            <li><strong>By Taxi:</strong> Comfortable cabs are available from the airport (13 km away).</li>
                                        </ul>
                                    </section>

                                    <section id="surrounding">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Surrounding Attractions</h2>
                                        <ul className="space-y-4 text-slate-700">
                                            <li><strong>1. Jallianwala Bagh:</strong> A poignant memorial of the 1919 massacre, steps away from the temple.</li>
                                            <li><strong>2. Akal Takht:</strong> One of the five seats of authority for Sikhs, located within the complex.</li>
                                            <li><strong>3. Durgiana Temple:</strong> Often called the “Silver Temple,” dedicated to Goddess Durga.</li>
                                            <li><strong>4. Wagah Border:</strong> Experience the vibrant daily military ceremony at the India-Pakistan border (30 km away).</li>
                                            <li><strong>5. Partition Museum:</strong> Learn about the history and human stories of the 1947 partition.</li>
                                            <li><strong>6. Gobindgarh Fort:</strong> A historic fort showcasing Punjab's history through museums and light shows.</li>
                                        </ul>
                                    </section>

                                    {/* CTA Section */}
                                    <section className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 text-white shadow-lg text-center transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4">Want to Visit the Golden Temple?</h3>
                                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                                            Let Naman Darshan arrange your spiritual journey to Amritsar. We handle hotels, local travel, and guided tours for a peaceful experience.
                                        </p>
                                        <LeadForm triggerText="Plan Amritsar Yatra" title="Plan Your Amritsar Trip" source="GoldenTempleBlog" />
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

export default GoldenTempleBlog;
