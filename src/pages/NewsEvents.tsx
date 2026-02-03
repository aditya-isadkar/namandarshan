import { newsData } from "@/data/newsData";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Container } from "../components/ui/container";

const NewsEvents = () => {
    return (
        <Layout>
            <Container className="py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="font-handwriting text-5xl md:text-6xl font-normal text-orange-500 mb-4 animate-fade-in-up">
                        News & Events
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newsData.map((item, index) => (
                        <Link
                            to={`/news-events/${item.slug}`}
                            key={item.id}
                            className="group bg-white rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="bg-stone-100 p-6 text-center space-y-3">
                                <h3 className="font-bold text-lg text-stone-800 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="w-10 h-0.5 bg-stone-300 mx-auto"></div>
                                <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                                    {item.date}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </Layout>
    );
};

export default NewsEvents;
