import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, CreditCard, LogOut } from "lucide-react";
import namanLogo from "@/assets/naman.webp";
import { useAuth } from "@/context/AuthContext";

import TopBar from "./TopBar";
import GlobalSearch from "@/components/common/GlobalSearch";

const Header = () => {
  const { isUserAuthenticated, logoutUser, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Yatra Packages", href: "/yatra" },
    { name: "Temples", href: "/temples" },
    { name: "Darshan", href: "/darshan" },
    { name: "Puja", href: "/puja" },
    { name: "Prasadam", href: "/prasadam" },
    { name: "Chadhava", href: "/chadhava" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <TopBar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={namanLogo} alt="Naman" className="h-12 w-auto object-contain" />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <div className="w-full max-w-2xl">
              <GlobalSearch placeholder="Search city, package, panditji, and pooja..." />
            </div>
          </div>


          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Links */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://chat.whatsapp.com/D0jvm94aVqU9rnj0EgVSVI"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mr-4 transition-all shadow-md hover:shadow-lg animate-pulse"
              >
                Join Naman Parivaar
              </a>

              {isUserAuthenticated ? (
                <>
                  <Link to="/my-trips">
                    <Button variant="outline" size="sm" className="rounded-full gap-2">
                      <User className="w-4 h-4" />
                      My Trips
                    </Button>
                  </Link>
                  <Button
                    onClick={logoutUser}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-red-100 hover:text-red-600"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <GlobalSearch placeholder="Search city, package, panditji..." />
          </div>
        )}
      </div>

      {/* Secondary Navigation Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/astro-naman"
              className="text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors"
            >
              Astro
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Gateway Banner */}
      <div className="hidden lg:block bg-accent/10 border-t border-accent/20">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="flex items-center h-8 text-accent animate-marquee-continuous w-max">
            {/* Set 1 */}
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">Trusted by 40 million+ people</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">100% Darshan Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">India’s Largest Community for Devotees</span>
            </div>

            {/* Set 2 */}
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">Trusted by 40 million+ people</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">100% Darshan Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">India’s Largest Community for Devotees</span>
            </div>

            {/* Set 3 */}
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">Trusted by 40 million+ people</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">100% Darshan Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">India’s Largest Community for Devotees</span>
            </div>

            {/* Set 4 */}
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">Trusted by 40 million+ people</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">100% Darshan Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 pr-12">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">India’s Largest Community for Devotees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="my-2 border-border" />
              {isUserAuthenticated ? (
                <>
                  <Link
                    to="/my-trips"
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Trips
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-left flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-3 rounded-lg border border-border text-center font-medium hover:bg-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
