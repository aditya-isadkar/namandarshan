import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import kedarnathImg from "@/assets/blogs/kedarnath.jpg";
import jagannathImg from "@/assets/blogs/jagannath.jpg";

const SpiritualReads = () => {
    const blogs = [
        {
            id: "legend-of-kedarnath",
            title: "Discover how the Pandavas built this temple to seek Lord Shiva's forgiveness.",
            summary: "Burdened by the guilt of the Great War, the Pandavas searched for Lord Shiva to seek redemption for their sins. To evade them, Shiva disguised himself as a bull and tried to disappear into the earth, but the brothers' devotion held him back. In their quest for divine forgiveness, the Pandavas constructed this sacred temple at the very spot where the Lord manifested.",
            image: kedarnathImg,
            link: "/blogs/legend-of-kedarnath"
        },
        {
            id: "mysteries-of-jagannath-puri",
            title: "Flag flying opposite to wind and other divine miracles of Puri.",
            summary: "Step into the mystical world of the Jagannath Temple, where ancient divine will openly defies the laws of science. Witness the baffling phenomenon of the holy flag, Patita Pavana, always fluttering in the exact opposite direction of the wind. Here, the roar of the ocean falls silent the moment you cross the Lion's Gate, and no bird ever dares to fly above the main dome.",
            image: jagannathImg,
            link: "/blogs/mysteries-of-jagannath-puri"
        }
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">SPIRITUAL <span className="text-orange-400 font-handwriting italic">Reads</span></h2>
                </div>

                <div className="space-y-12 max-w-5xl mx-auto">
                    {blogs.map((blog, index) => (
                        <div key={blog.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center group`}>
                            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg relative">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    {blog.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {blog.summary}
                                </p>
                                <Link
                                    to={blog.link}
                                    className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors gap-1 group-hover:gap-2"
                                >
                                    Read More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpiritualReads;
