import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from "lucide-react";
import namanLogo from "@/assets/naman.webp";

const Footer = () => {
  const quickLinks = [
    { name: "Kedarnath Yatra", href: "/kedarnath-yatra" },
    { name: "Vrindavan Yatra", href: "/vrindavan-yatra" },
    { name: "Ayodhya Ram Mandir", href: "/ayodhya-yatra" },

    { name: "Live Darshan", href: "/live-darshan" },
  ];

  const services = [
    { name: "Temple Darshan", href: "/temples" },
    { name: "Puja Services", href: "/puja" },
    { name: "Chadhava Seva", href: "/chadhava" },
    { name: "Prasadam Seva", href: "/prasadam" },
    { name: "Astro Services", href: "/astro-naman" },
  ];

  const support = [
    { name: "About Us", href: "/about-us" },
    { name: "News & Events", href: "/news-events" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={namanLogo} alt="Naman" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/70 leading-relaxed">
              Experience divine ease with Naman VIP Darshan. Skip the queues and waiting times for a seamless, privileged spiritual journey. Prioritizing tranquility and reverence, we redefine your temple visits for an exclusive encounter with your deity.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Naman-Darshan/61562897897801/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/namandarshan5/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@Naman.Darshan?themeRefresh=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/naman-darshan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Contact Info / Company Links */}
          <div className="lg:pl-12">
            <h4 className="font-display text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <h4 className="font-display text-xl font-semibold mb-6">Popular Yatras</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:pl-12">
            <h4 className="font-display text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-white/50 text-sm text-center">
              © Copyright 2026 by NAMAN VIP DARSHAN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
