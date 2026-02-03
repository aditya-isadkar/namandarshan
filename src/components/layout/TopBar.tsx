import { Phone, Mail, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

const TopBar = () => {
    return (
        <div className="bg-primary text-primary-foreground py-1 border-b border-primary-foreground/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs md:text-sm font-medium">

                    {/* Contact Info */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <a href="tel:+919311973199" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <Phone className="w-3 h-3 md:w-4 md:h-4" />
                            <span>+91 93119 73199</span>
                        </a>
                        <a href="mailto:sales@namandarshan.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <Mail className="w-3 h-3 md:w-4 md:h-4" />
                            <span>sales@namandarshan.com</span>
                        </a>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/company/naman-darshan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/namandarshan5/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-3 h-3 md:w-4 md:h-4" />
                        </a>
                        <a
                            href="https://www.facebook.com/people/Naman-Darshan/61562897897801/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-3 h-3 md:w-4 md:h-4" />
                        </a>
                        <a
                            href="https://www.youtube.com/@Naman.Darshan?themeRefresh=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors"
                            aria-label="YouTube"
                        >
                            <Youtube className="w-3 h-3 md:w-4 md:h-4" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopBar;
