import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Thermometer, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/common/CommentSection";

const ChardhamBlog = () => {
    const tableOfContents = [
        { id: "intro", title: "Introduction" },
        { id: "medical", title: "Medical Preparation" },
        { id: "packing", title: "Packing List" },
        { id: "registration", title: "Biometric Registration" },
        { id: "best-time", title: "Best Time to Visit" }
    ];

    const recentPosts = [
        { title: "Kedarnath Temple Guide", link: "/blog/kedarnath-temple-yatra-history-legend" },
        { title: "Shirdi Sai Baba Yatra", link: "/blog/shirdi-yatra" },
        { title: "Mysteries of Jagannath Puri", link: "/blog/mysteries-of-jagannath-puri" }
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
                        <span className="text-primary font-medium">Chardham Tips</span>
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
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-3 h-3 text-indigo-500" />
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
                                        <span>Yatra Guide</span>
                                        <span>•</span>
                                        <span>8 min read</span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                        Chardham Yatra: Essential Medical & Travel Tips
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>By Naman Darshan</span>
                                        <span>•</span>
                                        <span>31 January 2026</span>
                                    </div>
                                </div>

                                <div className="w-full h-64 md:h-96">
                                    <img
                                        src="https://www.shivkhori.in/wp-content/uploads/2025/11/Chardham-Registration--768x432.webp"
                                        alt="Chardham Yatra Registration"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-8 md:p-10 text-lg leading-relaxed text-slate-700 space-y-8">
                                    <p id="intro" className="font-medium text-xl text-slate-800">
                                        Jai Badri Vishal! The Chardham Yatra (Yamunotri, Gangotri, Kedarnath, Badrinath) is the ultimate pilgrimage in Hinduism. However, traveling to the high Himalayas requires physical and mental preparation.
                                    </p>

                                    <section id="medical">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display flex items-center gap-3">
                                            <Thermometer className="w-8 h-8 text-red-500" /> 1. Medical Preparation (Most Important)
                                        </h2>
                                        <p className="mb-4">
                                            The trek to Kedarnath reaches an altitude of nearly 12,000 feet. Oxygen levels drop significantly.
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Cardio Exercise:</strong> Start walking 4-5 km daily at least one month before the trip to build calmness and stamina.</li>
                                            <li><strong>Breathing Exercises:</strong> Practice Pranayam (Anulom Vilom) to increase lung capacity.</li>
                                            <li><strong>Health Checkup:</strong> A full medical checkup is mandatory for senior citizens. Carry your medical fitness certificate.</li>
                                        </ul>
                                    </section>

                                    <section id="packing">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display flex items-center gap-3">
                                            <Mountain className="w-8 h-8 text-blue-500" /> 2. Essential Packing List
                                        </h2>
                                        <p className="mb-4">The weather in the mountains is unpredictable. It can rain or snow anytime.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Warm Clothes:</strong> Thermals, down jackets, and woolen caps are a must even in summer (May/June nights are cold).</li>
                                            <li><strong>Rain Gear:</strong> Carry a good quality raincoat or poncho. Umbrellas are often useless in high winds.</li>
                                            <li><strong>Footwear:</strong> Use comfortable trekking shoes with good grip. Avoid slippers or new shoes that bite.</li>
                                            <li><strong>Medicine Kit:</strong> Carry Diamox (ask your doctor for altitude sickness), painkillers, band-aids, and personal medication.</li>
                                        </ul>
                                    </section>

                                    <section id="registration">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">3. Biometric Registration</h2>
                                        <p>
                                            Registration is **mandatory** for all pilgrims. Without the Yatra Pass, you will not be allowed to proceed beyond Rishikesh.
                                            <br /><br />
                                            <strong>Good News:</strong> Naman Darshan handles this registration for all our package guests, so you don't have to worry about long queues.
                                        </p>
                                    </section>

                                    <section id="best-time">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">4. Best Time to Visit</h2>
                                        <p>
                                            The temples open on **Akshaya Tritiya** (April/May) and close on Diwali (Oct/Nov).
                                        </p>
                                        <ul className="list-disc pl-6 mt-4">
                                            <li><strong>May-June:</strong> Pleasant weather, but crowded.</li>
                                            <li><strong>September-October:</strong> Best views, less crowd, but colder.</li>
                                            <li><strong>July-August:</strong> NOT RECOMMENDED due to heavy monsoon landslides.</li>
                                        </ul>
                                    </section>

                                    {/* CTA Section */}
                                    <section className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl p-8 text-white shadow-lg text-center transform hover:scale-[1.01] transition-transform">
                                        <h3 className="text-3xl font-bold mb-4">Plan a Safe Chardham Yatra</h3>
                                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                                            We provide Medical Support, Oxygen Cylinders, Comfortable Hotels, and VIP Darshan assistance.
                                        </p>
                                        <Link to="/char-dham-yatra">
                                            <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-lg h-12 shadow-md">
                                                View Chardham Packages
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

export default ChardhamBlog;
