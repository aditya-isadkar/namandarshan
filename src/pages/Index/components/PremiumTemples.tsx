import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DarshanCard from "../../Darshan/components/DarshanCard";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/utils/api";

const PremiumTemples = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl('/api/darshan'))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTemples(data.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch premium temples:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-primary font-semibold mb-2">PREMIUM EXPERIENCE</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Our Premium Darshan
            </h2>
          </div>
          <Link to="/darshan">
            <Button variant="outline" className="gap-2">
              View All Temples
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Temple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading premium experiences...</div>
          ) : (
            temples.map((temple: any) => (
              <div key={temple.id} className="h-full">
                <DarshanCard
                  id={temple.id}
                  name={temple.name}
                  location={temple.location}
                  image={temple.image}
                  slug={temple.slug || temple.id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PremiumTemples;
