import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import pujaImg from "@/assets/puja-items.jpg";

const PujaServices = () => {
  const pujaCategories = [
    {
      id: "abhishek",
      title: "Abhishek",
      description: "Sacred bathing ritual for deities",
      icon: "🪔",
    },
    {
      id: "archana",
      title: "Archana",
      description: "Offerings and prayers with mantras",
      icon: "🌸",
    },
    {
      id: "havan",
      title: "Havan/Homam",
      description: "Sacred fire ceremony for blessings",
      icon: "🔥",
    },
    {
      id: "special-puja",
      title: "Special Puja",
      description: "Customized elaborate ceremonies",
      icon: "✨",
    },
  ];

  const benefits = [
    "Performed by verified Pandits",
    "Live video of your Puja",
    "Prasad delivery to your home",
    "Digital Puja certificate",
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-primary font-semibold mb-2">ONLINE PUJA SERVICES</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Puja & Rituals at <br />
              <span className="text-gradient-sacred">Sacred Temples</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book authentic puja services at India's most revered temples. Our verified pandits
              perform traditional ceremonies on your behalf while you watch live.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Link to="/puja">
              <Button variant="hero" size="lg" className="gap-2">
                Explore All Pujas
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Puja Cards */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img
                src={pujaImg}
                alt="Puja Items"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/80 text-sm mb-1">Most Popular</p>
                <h3 className="font-display text-2xl font-bold text-white">
                  Rudrabhishek Puja
                </h3>
              </div>
            </div>

            {/* Puja Categories Grid */}
            <div className="grid grid-cols-2 gap-4">
              {pujaCategories.map((puja) => (
                <div
                  key={puja.id}
                  className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all card-hover cursor-default"
                >
                  <div className="text-3xl mb-2">{puja.icon}</div>
                  <h4 className="font-semibold text-foreground mb-1">{puja.title}</h4>
                  <p className="text-muted-foreground text-xs mb-2 line-clamp-1">{puja.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PujaServices;
