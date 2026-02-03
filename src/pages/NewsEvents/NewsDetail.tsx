import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { newsData } from "@/data/newsData";
import { Helmet } from "react-helmet-async";

const NewsDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const newsItem = newsData.find((item) => item.slug === slug);

    if (!newsItem) {
        return (
            <Layout>
                <Container className="py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">News not found</h1>
                    <Link to="/news-events">
                        <Button>Back to News</Button>
                    </Link>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Helmet>
                <title>{newsItem.title} | Temple Whisperer</title>
                <meta name="description" content={newsItem.summary} />
            </Helmet>
            <article className="min-h-screen bg-stone-50 pt-24 pb-16">
                <Container className="max-w-4xl">
                    <Link to="/news-events" className="inline-flex items-center text-stone-600 hover:text-orange-600 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to News
                    </Link>

                    <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                        {newsItem.title}
                    </h1>

                    <div className="flex items-center gap-6 text-stone-500 mb-8 text-sm border-b border-stone-200 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {newsItem.date}
                        </div>
                        {/* Placeholder for Share functionality */}
                        <button className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>

                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-10">
                        <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div
                        className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:text-stone-900 prose-p:text-stone-700 prose-a:text-orange-600"
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                    />


                </Container>
            </article>
        </Layout>
    );
};

export default NewsDetail;
