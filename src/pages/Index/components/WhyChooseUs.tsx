import { Shield, Clock, Heart, Award, Headphones, CreditCard } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "All pandits and services are thoroughly verified for authenticity",
    },
    {
      icon: Clock,
      title: "VIP Queue Skip",
      description: "Skip long queues with our priority darshan booking system",
    },
    {
      icon: Heart,
      title: "Spiritual Care",
      description: "Dedicated team ensuring your spiritual journey is seamless",
    },
    {
      icon: Award,
      title: "Best Experience Guarantee",
      description: "Premium spiritual experiences curated for your comfort",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options with 100% secure transactions",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient-sacred">Naman</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by lakhs of devotees for their spiritual journeys across India
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Trusted by devotees across India</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient-sacred">2.45L+</p>
              <p className="text-muted-foreground">Darshans Booked</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient-sacred">5.12L+</p>
              <p className="text-muted-foreground">Happy Devotees</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient-sacred">1.85L+</p>
              <p className="text-muted-foreground">Pujas Done</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient-sacred">4.8★</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
