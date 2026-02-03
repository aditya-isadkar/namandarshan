import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string | string[];
    image?: string;
    url?: string;
}

const SEO = ({
    title,
    description,
    keywords,
    image = '/og-image.png', // You might want to ensure this file exists or update it
    url = window.location.href
}: SEOProps) => {
    const siteTitle = "Namandarshan - Your Gateway to Divine India";
    const defaultDescription = "Book verified online darshan, puja, and offerings at India's most sacred temples. Experience spiritual journeys with ease and trust.";
    const defaultKeywords = "temple darshan booking, online puja booking, india pilgrimage, namandarshan, chadhava, prasadam";

    const fullTitle = title ? `${title} | Namandarshan` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = Array.isArray(keywords) ? keywords.join(', ') : (keywords || defaultKeywords);

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
