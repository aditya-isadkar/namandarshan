import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import PopularYatras from "./components/PopularYatras";
import PremiumTemples from "./components/PremiumTemples";
import LiveDarshan from "./components/LiveDarshan";
import PujaServices from "./components/PujaServices";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import SpiritualReads from "./components/SpiritualReads";
import FAQSection from "./components/FAQSection";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Temple Booking & VIP Darshan Services"
        description="Experience the divine with Naman Darshan - India's most trusted platform for VIP Temple Darshan, Online Puja, and Priority Entry Passes. Book certified services for Kashi Vishwanath, Mahakaleshwar Ujjain, Tirupati Balaji, Shirdi Sai Baba, and Ayodhya Ram Mandir. Avoid long queues with our special entry tickets, book authentic Vedic Pujas performed by verified Pandits, and get sacred Prasad delivered to your doorstep. Plan your spiritual Yatra to Char Dham, Vaishno Devi, and Vrindavan with our comprehensive travel packages. Your gateway to hassle-free and blessed pilgrimage starts here."
        keywords={[
          "darshan", "vip darshan", "priority darshan", "temple booking", "online puja",
          "fast darshan", "temple entry pass", "special darshan ticket", "chadhava",
          "temple tourism india", "online darshan booking", "kashi vishwanath vip darshan"
        ]}
      />
      <Header />
      <main>
        <HeroSection />

        <RevealOnScroll>
          <MissionSection />
        </RevealOnScroll>

        <RevealOnScroll>
          <PopularYatras />
        </RevealOnScroll>

        <RevealOnScroll>
          <PremiumTemples />
        </RevealOnScroll>

        <RevealOnScroll>
          <LiveDarshan />
        </RevealOnScroll>

        <RevealOnScroll>
          <PujaServices />
        </RevealOnScroll>

        <RevealOnScroll>
          <WhyChooseUs />
        </RevealOnScroll>

        <RevealOnScroll>
          <Testimonials />
        </RevealOnScroll>

        <RevealOnScroll>
          <SpiritualReads />
        </RevealOnScroll>

        <RevealOnScroll>
          <CTASection />
        </RevealOnScroll>

        <RevealOnScroll>
          <FAQSection />
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
