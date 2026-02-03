import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { getApiUrl } from "@/utils/api";

interface SearchResult {
    title: string;
    url: string;
    category: string;
}

const STATIC_PAGES: SearchResult[] = [
    { title: "Home", url: "/", category: "Page" },
    { title: "About Us", url: "/about-us", category: "Page" },
    { title: "Contact Us", url: "/contact", category: "Page" },
    { title: "Gallery", url: "/gallery", category: "Page" },
    { title: "Referral Program", url: "/referral", category: "Page" },
    { title: "AI Yatra Planner", url: "/ai-yatra-planner", category: "Tool" },
    { title: "Exclusive Packages", url: "/exclusive-temple-darshan-packeges", category: "Service" },

    // Yatras
    { title: "Yatra Packages", url: "/yatra", category: "Service" },
    { title: "Shirdi Yatra", url: "/shirdi-yatra", category: "Yatra" },
    { title: "Char Dham Yatra", url: "/char-dham-yatra", category: "Yatra" },
    { title: "Kedarnath Yatra", url: "/kedarnath-yatra", category: "Yatra" },
    { title: "Ayodhya Yatra", url: "/ayodhya-yatra", category: "Yatra" },
    { title: "Vrindavan Yatra", url: "/vrindavan-yatra", category: "Yatra" },
    { title: "Jagannath Yatra", url: "/jagannath-yatra", category: "Yatra" },

    // Main Services
    { title: "Temples", url: "/temples", category: "Service" },
    { title: "Darshan Booking", url: "/darshan", category: "Service" },
    { title: "Puja Services", url: "/puja", category: "Service" },
    { title: "Prasadam", url: "/prasadam", category: "Service" },
    { title: "Online Chadhava", url: "/chadhava", category: "Service" },
    { title: "Astro Services", url: "/astro-naman", category: "Service" },
    { title: "Live Darshan", url: "/live-darshan", category: "Service" },

    // Blogs
    { title: "Blog Home", url: "/blogs", category: "Blog" },
    { title: "Legend of Kedarnath", url: "/blogs/legend-of-kedarnath", category: "Blog" },
    { title: "Mysteries of Jagannath Puri", url: "/blogs/mysteries-of-jagannath-puri", category: "Blog" },
    { title: "Kedarnath History & Legend", url: "/blog/kedarnath-temple-yatra-history-legend", category: "Blog" },
    { title: "Ram Mandir History", url: "/blog/ram-mandir-ayodhya-history-darshan-guide", category: "Blog" },
    { title: "Tirupati Balaji Mystery", url: "/blog/tirupati-balaji-darshan-booking-laddu-mystery", category: "Blog" },
    { title: "Golden Temple Guide", url: "/blog/golden-temple-amritsar-history-langar-guide", category: "Blog" },
    { title: "Chardham Medical Tips", url: "/blog/chardham-yatra-medical-tips-packing-guide", category: "Blog" },
    { title: "Kashi Vishwanath Guide", url: "/blog/kashi-vishwanath-moksha-ganga-aarti-guide", category: "Blog" },
    { title: "Mahakaleshwar Bhasma Aarti", url: "/blog/mahakaleshwar-ujjain-jyotirlinga-bhasma-aarti", category: "Blog" },
    { title: "Shirdi Sai Baba Promises", url: "/blog/shirdi-sai-baba-11-vachan-promises-meaning", category: "Blog" },

    // Legal
    { title: "Terms & Conditions", url: "/terms-conditions", category: "Page" },
    { title: "Privacy Policy", url: "/privacy-policy", category: "Page" },
    { title: "News & Events", url: "/news-events", category: "Page" },
];

const GlobalSearch = ({ className, placeholder = "Search city, package, panditji..." }: { className?: string, placeholder?: string }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);

            try {
                // 1. Filter Static Pages
                const staticResults = STATIC_PAGES.filter(page =>
                    page.title.toLowerCase().includes(query.toLowerCase())
                );

                // 2. Fetch Dynamic Data in Parallel
                // We use Promise.allSettled so one failure doesn't break everything
                const [darshanRes, templeRes, prasadamRes, chadhavaRes] = await Promise.allSettled([
                    fetch(getApiUrl('/api/darshan')).then(res => res.json()),
                    fetch(getApiUrl('/api/temples')).then(res => res.json()),
                    fetch(getApiUrl('/api/prasadam')).then(res => res.json()),
                    fetch(getApiUrl('/api/chadhava')).then(res => res.json())
                ]);

                const dynamicResults: SearchResult[] = [];

                // Helper to process results
                const processItems = (result: PromiseSettledResult<any>, category: string, urlPrefix: string) => {
                    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
                        result.value.forEach((item: any) => {
                            if (item.name?.toLowerCase().includes(query.toLowerCase()) ||
                                item.location?.toLowerCase().includes(query.toLowerCase())) {
                                dynamicResults.push({
                                    title: item.name,
                                    url: `${urlPrefix}/${item.slug || item.id}`,
                                    category: category
                                });
                            }
                        });
                    }
                };

                processItems(darshanRes, "Darshan", "/darshan");
                processItems(templeRes, "Temple", "/temples");
                processItems(prasadamRes, "Prasadam", "/prasadam");
                processItems(chadhavaRes, "Chadhava", "/chadhava");

                // Combine results
                setResults([...staticResults, ...dynamicResults]);
            } catch (error) {
                console.error("Search error:", error);
                // Fallback to just static results on error
                setResults(STATIC_PAGES.filter(page =>
                    page.title.toLowerCase().includes(query.toLowerCase())
                ));
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchResults, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (url: string) => {
        navigate(url);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.length >= 2) setIsOpen(true);
                    }}
                    placeholder={placeholder}
                    className="w-full h-11 pl-4 pr-12 rounded-full border border-border bg-secondary/50 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors pointer-events-none">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border max-h-96 overflow-y-auto z-50">
                    <div className="py-2">
                        {results.map((result, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(result.url)}
                                className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors flex items-center justify-between group border-b border-border/50 last:border-0"
                            >
                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {result.title}
                                </span>
                                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full uppercase tracking-wider">
                                    {result.category}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border p-4 text-center text-muted-foreground z-50">
                    No results found for "{query}"
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
