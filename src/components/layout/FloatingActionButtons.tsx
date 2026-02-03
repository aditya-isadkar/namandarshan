import { MessageCircle, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingActionButtons = () => {
    const whatsappUrl = "https://api.whatsapp.com/send/?phone=919311973199&text=Namaste+%EF%BF%BD++%0D%0AI+want+to+know+more+about+your+NamanDarshan+service.+Please+guide+me.&type=phone_number&app_absent=0";

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">

            {/* Referral Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link to="/referral">
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full bg-gradient-sacred hover:shadow-glow hover:scale-110 transition-all duration-300 shadow-xl"
                        >
                            <Gift className="h-7 w-7 text-white animate-pulse" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white text-primary border-primary/20">
                    <p className="font-semibold">Refer & Earn ₹101</p>
                </TooltipContent>
            </Tooltip>

            {/* WhatsApp Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] hover:shadow-xl hover:scale-110 transition-all duration-300 shadow-xl"
                        >
                            <MessageCircle className="h-7 w-7 text-white" />
                        </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white text-[#25D366] border-[#25D366]/20">
                    <p className="font-semibold">Chat with us</p>
                </TooltipContent>
            </Tooltip>

        </div>
    );
};

export default FloatingActionButtons;
