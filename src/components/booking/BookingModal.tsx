import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getApiUrl } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    type?: string; // 'general', 'yatra', 'darshan', 'temple', etc.
    serviceName?: string;
}

const BookingModal = ({ isOpen, onClose, title, type = "general", serviceName }: BookingModalProps) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        date: "",
        request: ""
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const bookingData = {
            type,
            serviceName: serviceName || title || "General Inquiry",
            userDetails: {
                name: formData.name,
                whatsapp: formData.whatsapp,
                email: formData.email
            },
            bookingDetails: {
                date: formData.date,
                message: formData.request
            }
        };

        try {
            const res = await fetch(getApiUrl("/api/bookings"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                toast.success("Booking submitted successfully!", { description: "We will contact you shortly." });
                const message = `Namaste 🙏\n\nI just booked a service using the form.\n\n*Name:* ${formData.name}\n*Service:* ${serviceName || title || "General Inquiry"}\n*Date:* ${formData.date}\n*Email:* ${formData.email}\n*Request:* ${formData.request}\n\nPlease confirm my booking.`;
                const whatsappLink = `https://api.whatsapp.com/send/?phone=919311973199&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                window.open(whatsappLink, "_blank");
                onClose();
                setFormData({ name: "", whatsapp: "", email: "", date: "", request: "" });
            } else {
                toast.error("Failed to submit booking.", { description: "Please try again." });
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("An error occurred.", { description: "Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] p-0 border-none bg-transparent shadow-none [&>button]:hidden">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-[#FF8C00] p-6 text-center relative">
                        <DialogTitle className="text-3xl font-display font-bold text-white mb-1 tracking-wide">
                            Namaste 🙏 नमस्ते
                        </DialogTitle>
                        <DialogDescription className="text-white/90 font-medium text-sm tracking-wide">
                            Secure your visit • अपनी यात्रा सुरक्षित करें
                        </DialogDescription>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        <Input
                            id="name"
                            placeholder="Full Name / पूरा नाम*"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 text-base"
                            required
                        />
                        <Input
                            id="whatsapp"
                            type="tel"
                            placeholder="Whatsapp Number / व्हाट्सएप नंबर*"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className="h-12 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 text-base"
                            required
                        />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email / ईमेल*"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 text-base"
                            required
                        />
                        <div className="relative">
                            <Input
                                id="date"
                                type="text"
                                placeholder="dd/mm/yyyy"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="h-12 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 text-base"
                                required
                            />
                        </div>
                        <Textarea
                            id="request"
                            placeholder="Special Request / विशेष अनुरोध (Optional)"
                            value={formData.request}
                            onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                            className="min-h-[100px] border-orange-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 text-base resize-none"
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#B45309] hover:bg-[#92400e] text-white font-bold text-lg h-12 rounded-xl mt-2 transition-colors duration-300 shadow-md"
                        >
                            {isLoading ? "Submitting..." : "Confirm Booking / बुकिंग की पुष्टि करें"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
