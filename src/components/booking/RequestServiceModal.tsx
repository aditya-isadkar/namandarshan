import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { X, Lock, Loader2 } from "lucide-react";
import { getApiUrl } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface RequestServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    templeName: string;
    serviceType: "Chadhava" | "Prasadam";
}

const RequestServiceModal = ({ isOpen, onClose, templeName, serviceType }: RequestServiceModalProps) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || ""
                // We don't have phone in user object usually, but if we did, we'd set it here
            }));
        }
    }, [isOpen, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Open window immediately to avoid popup blocker
        const newWindow = window.open('', '_blank');

        const bookingData = {
            type: serviceType.toLowerCase(),
            serviceName: `Request for ${serviceType} at ${templeName}`,
            userDetails: {
                name: formData.name,
                mobile: formData.phone,
                email: formData.email // Use form (which matches user.email if auto-filled)
            },
            status: "pending"
        };

        try {
            const res = await fetch(getApiUrl("/api/bookings"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                toast({
                    title: "Request Received! 🙏",
                    description: `We have noted your interest for ${serviceType} at ${templeName}. We will notify you soon.`,
                });
                const message = `Namaste 🙏\n\nI am interested in a service.\n\n*Name:* ${formData.name}\n*Request:* ${serviceType} at ${templeName}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\nPlease notify me when available.`;
                const whatsappLink = `https://api.whatsapp.com/send/?phone=919311973199&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

                if (newWindow) {
                    newWindow.location.href = whatsappLink;
                } else {
                    // Fallback if window.open returned null
                    window.location.href = whatsappLink;
                }

                setFormData({ name: "", phone: "", email: "" });
                onClose();
            } else {
                if (newWindow) newWindow.close(); // Close unused window
                toast({
                    title: "Submission Failed",
                    description: "Please try again later.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            if (newWindow) newWindow.close(); // Close unused window
            console.error("Request error:", error);
            toast({
                title: "Error",
                description: "Something went wrong. Please check your connection.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white gap-0 border-none shadow-2xl rounded-2xl [&>button]:hidden">
                {/* Custom Header */}
                <div className="bg-orange-500 p-5 text-center relative">
                    <DialogTitle className="text-white text-xl font-bold flex items-center justify-center gap-2">
                        Request {serviceType} <span className="text-xl">🙏</span>
                    </DialogTitle>
                    <p className="text-orange-50 text-xs mt-1">For {templeName}</p>
                    <DialogClose className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                <div className="p-5 space-y-5">
                    <p className="text-gray-600 text-sm text-center">
                        This service is currently not available for this temple. Leave your details, and we will arrange it for you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="req-name" className="text-gray-700 font-bold text-xs">Your Name*</Label>
                            <Input
                                id="req-name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Full Name"
                                className="h-10 text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-lg"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="req-email" className="text-gray-700 font-bold text-xs">Email Address*</Label>
                            <Input
                                id="req-email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                                className="h-10 text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-lg"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="req-phone" className="text-gray-700 font-bold text-xs">Phone Number*</Label>
                            <Input
                                id="req-phone"
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Mobile Number"
                                className="h-10 text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-lg"
                            />
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold h-10 text-base rounded-full shadow-lg transform active:scale-95 transition-all"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {isLoading ? "SENDING..." : "NOTIFY ME"}
                            </Button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center gap-2 text-gray-400 pb-1">
                        <Lock className="w-3 h-3" />
                        <span className="text-xs">Your request is safe with us.</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RequestServiceModal;
