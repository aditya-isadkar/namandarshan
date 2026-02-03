import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Offering } from "../data";
import { X, Lock } from "lucide-react";
import { getApiUrl } from "@/utils/api";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedOffering: Offering | null;
}

const BookingModal = ({ isOpen, onClose, selectedOffering }: BookingModalProps) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        gotra: "",
        message: ""
    });

    useEffect(() => {
        if (isOpen && user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || ""
            }));
        }
    }, [isOpen, user]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const bookingData = {
            type: "chadhava",
            serviceId: selectedOffering?.id,
            serviceName: selectedOffering?.name,
            userDetails: {
                name: formData.name,
                whatsapp: formData.whatsapp,
                email: formData.email
            },
            bookingDetails: {
                gotra: formData.gotra,
                message: formData.message
            }
        };

        try {
            const res = await fetch(getApiUrl("/api/bookings"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                toast({
                    title: "Offering Confirmed! 🙏",
                    description: `Your chadhava request for ${selectedOffering?.name} has been received.`,
                });
                const message = `Namaste 🙏\n\nI want to offer Chadhava.\n\n*Name:* ${formData.name}\n*Seva:* ${selectedOffering?.name}\n*Gotra:* ${formData.gotra}\n*Message:* ${formData.message}\n\nPlease confirm.`;
                const whatsappLink = `https://api.whatsapp.com/send/?phone=919311973199&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                window.open(whatsappLink, "_blank");
                onClose();
                setFormData({ name: "", whatsapp: "", email: "", gotra: "", message: "" });
            } else {
                toast({ title: "Booking Failed", description: "Please try again.", variant: "destructive" });
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white gap-0 border-none shadow-2xl rounded-2xl [&>button]:hidden flex flex-col">
                {/* Custom Header */}
                <div className="bg-orange-500 p-3 text-center relative flex-shrink-0">
                    <DialogTitle className="text-white text-lg font-bold flex items-center justify-center gap-2">
                        Book Seva <span className="text-lg">🙏</span>
                    </DialogTitle>
                    <p className="text-orange-50 text-[10px] mt-0.5">Sankalp will be taken in your name.</p>
                    <DialogClose className="absolute right-3 top-3 text-white/80 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                <div className="p-4 space-y-3">
                    {/* Seva Display */}
                    <div className="bg-orange-50 border border-dashed border-orange-300 rounded-lg p-2 text-center">
                        <p className="text-gray-700 font-medium text-xs">
                            <span className="font-bold text-gray-900">Seva:</span> {selectedOffering?.name}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-gray-700 font-bold text-[10px] uppercase tracking-wide">Yajman Name (Devotee Name)*</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Full Name / पूरा नाम *"
                                className="h-8 text-xs border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="whatsapp" className="text-gray-700 font-bold text-[10px] uppercase tracking-wide">WhatsApp Number*</Label>
                            <Input
                                id="whatsapp"
                                required
                                type="tel"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                placeholder="WhatsApp Number / व्हाट्सएप नंबर *"
                                className="h-8 text-xs border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-700 font-bold text-[10px] uppercase tracking-wide">Email Address*</Label>
                            <Input
                                id="email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email Address / ईमेल *"
                                className="h-8 text-xs border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="gotra" className="text-gray-700 font-bold text-[10px] uppercase tracking-wide">Gotra (Optional)</Label>
                            <Input
                                id="gotra"
                                value={formData.gotra}
                                onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                                placeholder="Gotra / गोत्र (If known)"
                                className="h-8 text-xs border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="message" className="text-gray-700 font-bold text-[10px] uppercase tracking-wide">Special Prayer / Message</Label>
                            <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Any specific wish or family names..."
                                className="min-h-[40px] text-xs border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-md resize-none py-1.5"
                            />
                        </div>

                        <div className="pt-1">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold h-9 text-sm rounded-full shadow-md transform active:scale-95 transition-all"
                            >
                                {isLoading ? "CONFIRMING..." : "CONFIRM BOOKING"}
                            </Button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center gap-1.5 text-gray-400 pb-0">
                        <Lock className="w-2.5 h-2.5" />
                        <span className="text-[10px]">Your information is kept sacred.</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
