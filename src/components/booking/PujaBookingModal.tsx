import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pujas } from "@/pages/Puja/data";
import { Loader2 } from "lucide-react";
import { getApiUrl } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface PujaBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "online" | "offline";
    bookingType?: "Individual" | "Family";
}

const PujaBookingModal = ({ isOpen, onClose, mode, bookingType = "Individual" }: PujaBookingModalProps) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        date: "",
        persons: 1,
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

    // Define allowed pujas for each mode
    const onlinePujas = [
        "shodashopachar-puja-kedarnath",
        "bhimashankar-rudrabhishek-puja",
        "panchamrut-abhishek-bhimashankar",
        "mahapuja-bhimashankar"
    ];

    const offlinePujas = [
        "haridwar-navgrah-dosh-nivaran",
        "haridwar-maha-rudrabhishek",
        "mahapuja-bhimashankar"
    ];

    const allowedPujas = mode === "online" ? onlinePujas : offlinePujas;
    const filteredPujas = pujas.filter(p => allowedPujas.includes(p.id));



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const bookingData = {
            type: "puja",
            serviceName: `${bookingType} Puja (${mode})`,
            userDetails: {
                name: formData.name,
                email: formData.email,
                whatsapp: formData.mobile,
            },
            bookingDetails: {
                date: formData.date,
                persons: formData.persons,
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
                toast.success("Puja Booking Submitted Successfully!");
                const message = `Namaste 🙏\n\nI want to book a Puja.\n\n*Name:* ${bookingData.userDetails.name}\n*Puja:* ${bookingData.serviceName}\n*Date:* ${bookingData.bookingDetails.date}\n*Persons:* ${bookingData.bookingDetails.persons}\n*Email:* ${bookingData.userDetails.email}\n*Purpose:* ${bookingData.bookingDetails.message}\n\nPlease guide me further.`;
                const whatsappLink = `https://api.whatsapp.com/send/?phone=919311973199&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                window.open(whatsappLink, "_blank");
                onClose();
            } else {
                toast.error("Failed to submit booking.");
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate time slots (e.g., 6:00 AM to 8:00 PM)
    const timeSlots = Array.from({ length: 15 }, (_, i) => {
        const hour = i + 6;
        return `${hour < 10 ? '0' + hour : hour}:00`;
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-white text-stone-900 border-none shadow-xl px-6 py-6 sm:rounded-3xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-stone-100 data-[state=open]:text-stone-500"
                >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
                <DialogHeader className="mb-4">
                    <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-center text-[#991b1b]">
                        Book {bookingType} Puja Request
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-0">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">Full Name *</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="h-10 border-stone-200 focus:ring-orange-500 rounded-xl bg-gray-50/50"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-10 border-stone-200 focus:ring-orange-500 rounded-xl bg-gray-50/50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* WhatsApp Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="mobile" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">WhatsApp Number *</Label>
                            <Input
                                id="mobile"
                                type="tel"
                                required
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                className="h-10 border-stone-200 focus:ring-orange-500 rounded-xl bg-gray-50/50"
                            />
                        </div>

                        {/* Preferred Date */}
                        <div className="space-y-1.5">
                            <Label htmlFor="date" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">Preferred Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="h-10 border-stone-200 focus:ring-orange-500 rounded-xl bg-gray-50/50 text-stone-500"
                            />
                        </div>
                    </div>

                    {/* No. of Persons */}
                    <div className="space-y-1.5">
                        <Label htmlFor="persons" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">No. of Persons</Label>
                        <Input
                            id="persons"
                            type="number"
                            min="1"
                            value={formData.persons}
                            onChange={(e) => setFormData({ ...formData, persons: parseInt(e.target.value) })}
                            className="h-10 border-stone-200 focus:ring-orange-500 rounded-xl bg-gray-50/50"
                        />
                    </div>

                    {/* Gotra / Specific Prayer Purpose */}
                    <div className="space-y-1.5">
                        <Label htmlFor="purpose" className="text-stone-600 font-bold uppercase text-[10px] tracking-wider">Gotra / Specific Prayer Purpose</Label>
                        <textarea
                            id="purpose"
                            className="flex min-h-[80px] w-full rounded-xl border border-stone-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-white placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Mention Gotra or special wish..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-bold py-6 text-lg rounded-full shadow-lg shadow-orange-200 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Submit Puja Request"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PujaBookingModal;
