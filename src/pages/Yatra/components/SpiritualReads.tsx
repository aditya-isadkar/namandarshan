import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
    {
        id: 1,
        title: "History of Kedarnath",
        excerpt: "Legends behind the sacred shrine.",
        image: "/assets/kedarnath.jpg",
        link: "/blog/kedarnath-temple-yatra-history-legend"
    },
    {
        id: 2,
        title: "Ayodhya Darshan Guide",
        excerpt: "Tips for visiting Ram Mandir.",
        image: "https://staging1.namandarshan.com/wp-content/uploads/2024/03/ram-mandir.webp",
        link: "/blog/ram-mandir-ayodhya-history-darshan-guide"
    },
    {
        id: 3,
        title: "Tirupati Booking Tips",
        excerpt: "How to book special darshan.",
        image: "https://staging1.namandarshan.com/wp-content/uploads/2024/03/tirumala.jpg", // Using placeholder or tirupati if available
        link: "/blog/tirupati-balaji-darshan-booking-laddu-mystery"
    }
];

const SpiritualReads = () => {
    return (
        <div className="container mx-auto px-4 mb-24">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold text-orange-600 mb-3">Spiritual Reads</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                        <div className="h-56 overflow-hidden m-4 rounded-2xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
                            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                                {article.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 font-medium">
                                {article.excerpt}
                            </p>

                            <div className="mt-auto">
                                <Link to={article.link} className="inline-flex items-center text-orange-500 font-bold text-sm tracking-wider hover:text-orange-600 transition-colors uppercase group-hover:gap-2 gap-1 transition-all duration-300">
                                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpiritualReads;
