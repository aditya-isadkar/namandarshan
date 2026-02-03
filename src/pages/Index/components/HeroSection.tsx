import { Search, Users, Video, Star, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-aarti.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";
import vrindavanImage from "@/assets/vrindavan.jpg";
import ayodhyaImage from "@/assets/ayodhya.jpg";
import pujaImage from "@/assets/puja-items.jpg";
import puja from "@/assets/puja image.jpg";
import chadhava from "@/assets/chadhava image.jpg";
import astrology from "@/assets/astrology.avif";

import { useNavigate } from "react-router-dom";

const heroSlides = [
  // New: Mahashivratri Banner
  {
    image: "/image1.jpg",
    tagline: "Celebrate the Grand Night of Lord Shiva. Experience Divine Blessings.",
    heading: "Mahashivratri Special",
    cta: "View Details",
    path: "/mahashivratari",
    style: { backgroundPosition: "center 5%" }
  },
  // New: Prasadam Banner
  {
    image: "/assets/Home_page_banner/prasadam_banner_hq.png",
    tagline: "Authentic Prasadam from India's sacred shrines at your doorstep",
    heading: "Divine Blessings , Delivered",
    cta: "Order Now",
    path: "/prasadam"
  },
  // New: Yatra Packages Banner
  {
    image: "/assets/Home_page_banner/yatra_banner_hq.png",
    tagline: "Don't just travel pilgrimage. Walk the sacred paths that millions have walked before you",
    heading: "Answer the Divine Call",
    cta: "Start your Journey",
    path: "/yatra"
  },
  // New: Temples Banner
  {
    image: "/assets/Home_page_banner/temples_banner_hq.png",
    tagline: "Explore the rich history, sacred legends, and architectural marvels of India’s timeless temples.",
    heading: "Unveil the Stories of the Divine",
    cta: "Explore Temples",
    path: "/temples"
  },
  // Modified: Soulful Escapes (Replaces old Darshan/Travel slot)
  {
    image: kedarnathImage, // Using imported Kedarnath image for Travel
    tagline: "We handle the logistics; you focus on the devotion. Seamless travel packages for the modern seeker.",
    heading: "Soulful Escapes",
    cta: "Plan Your Trip",
    path: "/yatra"
  },
  // Modified: Unlock Your Destiny (Replaces old Astro slot)
  {
    image: astrology,
    tagline: "The stars have a plan for you. Illuminate your life path with precise ancient Vedic wisdom.",
    heading: "Unlock Your Destiny",
    cta: "Reveal Your Path",
    path: "/astro-naman"
  },
  // Modified: Invite Blessings (Replaces old Puja slot)
  {
    image: puja,
    tagline: "Bridge the gap between you and the divine. Authentic rituals for your family's prosperity.",
    heading: "Invite Blessings",
    cta: "Schedule a Puja",
    path: "/puja"
  },
  // Existing: Chadhava
  {
    image: chadhava,
    tagline: "Support Temple Development",
    heading: "Make a Donation",
    cta: "Book Chadhava",
    path: "/puja"
  },
];
const useCountUp = (
  end: number,
  duration: number = 2000,
  suffix: string = ""
) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.3,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);
  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);
  return {
    count,
    ref,
    suffix,
  };
};
const bookingNotifications = [
  {
    name: "Mayank",
    service: "Darshan",
    temple: "Kedarnath",
  },
  {
    name: "Priya",
    service: "Puja",
    temple: "Vaishno Devi",
  },

  {
    name: "Anita",
    service: "Live Darshan",
    temple: "Tirupati",
  },
  {
    name: "Vikram",
    service: "Special Aarti",
    temple: "Kashi Vishwanath",
  },
  {
    name: "Sneha",
    service: "VIP Darshan",
    temple: "Badrinath",
  },
  {
    name: "Amit",
    service: "Puja Booking",
    temple: "Somnath",
  },
  {
    name: "Kavita",
    service: "Darshan",
    temple: "Dwarka",
  },
];
const HeroSection = () => {
  const navigate = useNavigate();
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  // Background image rotation
  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const changeSlide = (newIndex: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setTextVisible(true);
    }, 500);
  };

  const handleNext = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    changeSlide(next);
  };

  const handlePrev = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    changeSlide(prev);
  };

  // Notification rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification(
          (prev) => (prev + 1) % bookingNotifications.length
        );
        setIsVisible(true);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  const stats = [
    {
      icon: Users,
      value: "2.45L+",
      numValue: 245,
      suffix: "L+",
      label: "DARSHANS",
    },
    {
      icon: Video,
      value: "538",
      numValue: 538,
      suffix: "",
      label: "WATCHING LIVE",
    },
    {
      icon: Star,
      value: "5.12L+",
      numValue: 512,
      suffix: "L+",
      label: "DEVOTEES",
    },
    {
      icon: MapPin,
      value: "1.85L+",
      numValue: 185,
      suffix: "L+",
      label: "PUJA DONE",
    },
  ];
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center overflow-hidden pt-20">
      {/* Security Banner */}
      <div className="relative w-full z-20 bg-primary/90 backdrop-blur-sm h-10 overflow-hidden shrink-0">
        <div className="absolute top-0 h-full flex items-center text-primary-foreground animate-marquee-continuous px-4 w-max">
          {/* Set 1 */}
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Trusted by 40 million+ people
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              100% Darshan Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              India’s Largest Community for Devotees
            </span>
          </div>

          {/* Set 2 */}
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Trusted by 40 million+ people
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              100% Darshan Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              India’s Largest Community for Devotees
            </span>
          </div>

          {/* Set 3 */}
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Trusted by 40 million+ people
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              100% Darshan Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              India’s Largest Community for Devotees
            </span>
          </div>

          {/* Set 4 */}
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Trusted by 40 million+ people
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              100% Darshan Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-2 pr-12">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              India’s Largest Community for Devotees
            </span>
          </div>
        </div>
      </div>

      {/* Background Images with Rotation */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 right-0 bottom-0 hero-bg-custom transition-opacity duration-1000 -z-10 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            ...(slide.style || {})
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Official Partner Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
            <span className="text-xs font-bold tracking-widest uppercase text-white">Official Partner</span>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="bg-black/80 rounded-sm p-1">
              <img src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png" alt="MakeMyTrip" className="h-6 w-auto object-contain" />
            </div>
          </div>

          {/* Tagline */}
          <p
            className={`text-lg md:text-xl font-medium text-white/90 mb-4 transition-all duration-500 ${textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            {heroSlides[currentSlide].tagline}
          </p>

          {/* Main Heading */}
          <h1
            className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-8 transition-all duration-500 delay-100 ${textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            {heroSlides[currentSlide].heading} <br />
            <span className="text-gradient-sacred">by Naman</span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
            <div className="relative"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <Button
              variant="hero"
              size="lg"
              className="min-w-[160px] hover:scale-105 transition-transform"
              onClick={() => navigate(heroSlides[currentSlide].path)}
            >
              {heroSlides[currentSlide].cta}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-400 w-full">
          {stats.map((stat, index) => {
            const { count, ref, suffix } = useCountUp(
              stat.numValue,
              2000,
              stat.suffix
            );
            return (
              <div
                key={stat.label}
                ref={ref}
                className="stat-card bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-4 shadow-xl hover:scale-105 transition-transform cursor-pointer"
                style={{
                  animationDelay: `${400 + index * 100}ms`,
                }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    {stat.suffix.includes("L")
                      ? (count / 100).toFixed(2)
                      : count}
                    {stat.suffix}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Booking Notification */}
        <div
          className={`fixed bottom-4 left-4 md:left-8 z-50 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <span className="text-xl">🚩</span>
            <span className="text-sm font-medium text-foreground">
              <strong>{bookingNotifications[currentNotification].name}</strong>{" "}
              just booked {bookingNotifications[currentNotification].service} at{" "}
              {bookingNotifications[currentNotification].temple}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
