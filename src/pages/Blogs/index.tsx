import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, UserCheck, Flower2, Gift, HandHeart } from "lucide-react";
import kedarnathImage from "@/assets/blogs/kedarnath.jpg";
import jagannathImage from "@/assets/blogs/jagannath.jpg";

const blogs = [
    {
        title: "Kedarnath Temple: The Eternal Abode of Lord Shiva",
        excerpt: "Standing tall amidst the majestic Garhwal Himalayas, Kedarnath is more than just a temple—it is a testament to faith, resilience, and the eternal power of Lord Shiva.",
        image: kedarnathImage,
        date: "22 January 2026",
        link: "/blog/kedarnath-temple-yatra-history-legend",
        readTime: "15 min read"
    },
    {
        title: "Ram Mandir Ayodhya: The 500-Year Wait Ends",
        excerpt: "The Grand Ram Mandir in Ayodhya is not just a structure of stone; it is a symbol of civilizational resilience, cultural revival, and the unwavering faith of a nation.",
        image: "https://staging1.namandarshan.com/wp-content/uploads/2024/03/ram-mandir.webp",
        date: "22 January 2026",
        link: "/blog/ram-mandir-ayodhya-history-darshan-guide",
        readTime: "20 min read"
    },
    {
        title: "Tirupati Balaji: The Richest Temple & its Mysterious Legends",
        excerpt: "Perched atop the seven hills of Seshachalam, the Tirumala Venkateswara Temple is often called 'Kaliyuga Vaikuntha'. Discover the legends and debt to Kubera.",
        image: "https://staging1.namandarshan.com/wp-content/uploads/2024/03/tirumala.jpg",
        date: "24 January 2026",
        link: "/blog/tirupati-balaji-darshan-booking-laddu-mystery",
        readTime: "18 min read"
    },
    {
        title: "Mysteries of Jagannath Puri: Where Science Bows to Divinity",
        excerpt: "The Jagannath Temple in Puri is a place where physical laws seem to suspend. From the flag flying against the wind to the cooking miracles, explore the divine mysteries.",
        image: jagannathImage,
        date: "20 January 2026",
        link: "/blogs/mysteries-of-jagannath-puri",
        readTime: "12 min read"
    },
    {
        title: "The Legend of Kedarnath: The Divine Hump & the Pandavas' Redemption",
        excerpt: "Explore the ancient legend of how the Pandavas sought redemption from Lord Shiva, leading to the creation of the Panch Kedar and the divine hump at Kedarnath.",
        image: kedarnathImage,
        date: "20 January 2026",
        link: "/blogs/legend-of-kedarnath",
        readTime: "10 min read"
    },
    {
        title: "Golden Temple Yatra: The Shining Jewel of Amritsar",
        excerpt: "Discover the Golden Temple in Amritsar—a serene haven drawing countless visitors seeking peace and spirituality. Explore its history and architectural splendor.",
        image: "https://imgcld.yatra.com/holiday-india/image/upload/t_yt_blog_w_800_c_fill_g_auto_q_auto:good_f_jpg/v1441876623/blog/Golden_Temple_of_the_Darbar_Sahib.jpg",
        date: "31 January 2026",
        link: "/blog/golden-temple-amritsar-history-langar-guide",
        readTime: "10 min read"
    },
    {
        title: "Chardham Yatra: Essential Medical & Travel Tips",
        excerpt: "Traveling to the high Himalayas requires preparation. Learn about medical tips, essential packing, and the best time to visit Yamunotri, Gangotri, Kedarnath, and Badrinath.",
        image: "https://www.shivkhori.in/wp-content/uploads/2025/11/Chardham-Registration--768x432.webp",
        date: "31 January 2026",
        link: "/blog/chardham-yatra-medical-tips-packing-guide",
        readTime: "8 min read"
    },
    {
        title: "Kashi: The City of Light & Moksha",
        excerpt: "Kashi is older than history. Discover the spiritual significance of Varanasi, the Ganga Aarti, and the new Kashi Vishwanath Corridor.",
        image: "https://iskconmumbaipull-21250.kxcdn.com/web/image/2664-430d01b4/rathyatra.webp",
        date: "31 January 2026",
        link: "/blog/kashi-vishwanath-moksha-ganga-aarti-guide",
        readTime: "7 min read"
    },
    {
        title: "Mahakaleshwar Ujjain: The Lord of Time",
        excerpt: "Jai Mahakal! Explore the city of Ujjain, the unique South-facing Jyotirlinga, the mesmerizing Bhasma Aarti, and the grand Mahakal Lok Corridor.",
        image: "https://trainyatra.com/assets/images/bus-yatra/mahakaleshwar.jpg",
        date: "31 January 2026",
        link: "/blog/mahakaleshwar-ujjain-jyotirlinga-bhasma-aarti",
        readTime: "9 min read"
    },
    {
        title: "Shirdi Sai Baba’s 11 Promises (11 Vachan)",
        excerpt: "To reassure his devotees, Sai Baba gave 11 Golden Promises before taking Samadhi. Read these promises that continue to guide millions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Sri_Sai_Baba_Temple_%2C_Shirdi.jpg",
        date: "31 January 2026",
        link: "/blog/shirdi-sai-baba-11-vachan-promises-meaning",
        readTime: "6 min read"
    },
    {
        title: "Shirdi Sai Baba Yatra",
        excerpt: "Embark on a spiritual journey to Shirdi, the abode of Sai Baba. A guide to the temple, darshan timings, and the peaceful atmosphere of Sai's home.",
        image: "https://namandarshan.com/wp-content/uploads/2024/03/sai-baba-4-1.jpeg",
        date: "15 January 2026",
        link: "/blog/shirdi-yatra",
        readTime: "8 min read"
    }
];

const sidebarLinks = [
    {
        title: "Book a Darshan",
        description: "VIP & Special Entry",
        icon: <UserCheck className="w-5 h-5" />,
        link: "/darshan",
        color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
    },
    {
        title: "Book a Puja",
        description: "Perform rituals online",
        icon: <Flower2 className="w-5 h-5" />,
        link: "/puja",
        color: "bg-orange-50 text-orange-600 hover:bg-orange-100"
    },
    {
        title: "Exclusive Packages",
        description: "Complete Yatra planning",
        icon: <Gift className="w-5 h-5" />,
        link: "/exclusive-temple-darshan-packeges",
        color: "bg-purple-50 text-purple-600 hover:bg-purple-100"
    },
    {
        title: "Get Prasad",
        description: "Delivered to your home",
        icon: <Gift className="w-5 h-5" />,
        link: "/prasadam",
        color: "bg-Amber-50 text-amber-600 hover:bg-amber-100"
    },
    {
        title: "Offer Chadhava",
        description: "offerings to deity",
        icon: <HandHeart className="w-5 h-5" />,
        link: "/chadhava",
        color: "bg-rose-50 text-rose-600 hover:bg-rose-100"
    }
];

const Blogs = () => {
    return (
        <Layout>
            <Container className="py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                        Our Blogs
                    </h1>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        Explore the divine history, legends, and mysteries of India's most sacred temples.
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content - Blog List */}
                    <div className="lg:col-span-8 space-y-8">
                        {blogs.map((blog, index) => (
                            <Link
                                to={blog.link}
                                key={index}
                                className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-stone-100"
                            >
                                <div className="grid md:grid-cols-3 gap-0">
                                    <div className="h-48 md:h-full w-full overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:col-span-2 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 text-xs md:text-sm text-stone-500 mb-3">
                                            <span>{blog.date}</span>
                                            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                        <h2 className="font-display text-2xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-stone-600 mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                            {blog.excerpt}
                                        </p>
                                        <div className="mt-auto pt-4 flex items-center text-orange-600 font-medium">
                                            Read Full Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-100">
                                <h3 className="font-display text-xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100">
                                    Quick Services
                                </h3>
                                <div className="space-y-3">
                                    {sidebarLinks.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.link}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group hover:shadow-md ${item.color}`}
                                        >
                                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-stone-900 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-stone-500 font-medium">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter/Promo Box can go here */}
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="relative z-10">
                                    <h3 className="font-display text-2xl font-bold mb-3">Custom Yatra?</h3>
                                    <p className="text-orange-100 mb-6 text-sm">
                                        Let us plan your perfect spiritual journey customized to your needs.
                                    </p>
                                    <Link to="/contact">
                                        <Button className="bg-white text-orange-600 hover:bg-orange-50 w-full font-bold">
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </Container>
        </Layout>
    );
};

export default Blogs;
