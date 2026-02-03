import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { getApiUrl } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface AstroBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AstroBookingModal = ({ isOpen, onClose }: AstroBookingModalProps) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        gender: "",
        topic: "",
        birthDate: "",
        birthTime: "",
        birthPlace: "",
        appointmentDate: "",
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
            type: "astro",
            serviceName: `Astro Consultation - ${formData.topic}`,
            userDetails: {
                name: formData.name,
                mobile: formData.phone,
                email: formData.email
            },
            bookingDetails: {
                gender: formData.gender,
                topic: formData.topic,
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                birthPlace: formData.birthPlace,
                appointmentDate: formData.appointmentDate
            }
        };

        try {
            const res = await fetch(getApiUrl("/api/bookings"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                alert("Consultation request submitted!");
                onClose();
                setFormData({
                    name: "", phone: "", email: "", gender: "", topic: "",
                    birthDate: "", birthTime: "", birthPlace: "", appointmentDate: ""
                });
            } else {
                alert("Failed to submit request.");
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent shadow-none [&>button]:hidden">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-white px-6 pt-6 pb-2 text-center relative border-b border-gray-100">
                        <DialogTitle className="text-xl font-bold text-gray-800 mb-1">
                            Fill form to consult Pandit Ji
                        </DialogTitle>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Name - Full Width */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                                <User className="w-5 h-5" />
                            </div>
                            <Input
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="pl-10 h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                required
                            />
                        </div>

                        {/* Phone & Email - Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <Input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className="pl-10 h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="pl-10 h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Gender & Topic - Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select onValueChange={(val) => handleChange("gender", val)}>
                                <SelectTrigger className="h-11 bg-orange-50/50 border-orange-100 focus:ring-orange-500 rounded-lg">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(val) => handleChange("topic", val)}>
                                <SelectTrigger className="h-11 bg-orange-50/50 border-orange-100 focus:ring-orange-500 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                        <SelectValue placeholder="Select Topic" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="love">Love & Relationships</SelectItem>
                                    <SelectItem value="career">Career & Business</SelectItem>
                                    <SelectItem value="health">Health & Wellness</SelectItem>
                                    <SelectItem value="finance">Finance & Wealth</SelectItem>
                                    <SelectItem value="marriage">Marriage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Birth Date & Time - Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Birth Date</label>
                                <Input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => handleChange("birthDate", e.target.value)}
                                    className="h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Birth Time</label>
                                <Input
                                    type="time"
                                    value={formData.birthTime}
                                    onChange={(e) => handleChange("birthTime", e.target.value)}
                                    className="h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Birth Place - Full Width */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <Input
                                placeholder="Birth Place (City, State)"
                                value={formData.birthPlace}
                                onChange={(e) => handleChange("birthPlace", e.target.value)}
                                className="pl-10 h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                required
                            />
                        </div>

                        {/* Appointment Date - Full Width */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Preferred Appointment Date</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <Input
                                    type="date"
                                    value={formData.appointmentDate}
                                    onChange={(e) => handleChange("appointmentDate", e.target.value)}
                                    className="pl-10 h-11 bg-orange-50/50 border-orange-100 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg h-12 rounded-lg mt-4 transition-all shadow-md hover:shadow-lg"
                        >
                            {isLoading ? "Submitting..." : "Confirm Booking"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AstroBookingModal;
