import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-primary to-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl font-display">ॐ</div>
        <div className="absolute bottom-10 right-10 text-9xl font-display">🙏</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-display opacity-10">ॐ</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Begin Your <br />Spiritual Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Book your divine darshan, puja services, or yatra package today and experience
            seamless spiritual experiences across India's sacred destinations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/darshan">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold gap-2"
              >
                Book Darshan Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+919311973199">
              <Button
                variant="heroOutline"
                size="lg"
                className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Us: +91 93119 73199
              </Button>
            </a>
          </div>

          <p className="text-white/70 text-sm">
            🛡️ 100% Secure Booking • ✨ Instant Confirmation • 📞 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
