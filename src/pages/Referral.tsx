import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Gift, ArrowRight, Share2, Wallet } from "lucide-react";

const Referral = () => {
    const [formData, setFormData] = useState({
        referrerName: "",
        referrerPhone: "",
        referrerUpi: "",
        refereeName: "",
        refereePhone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate basic details
        if (!formData.referrerName || !formData.referrerPhone || !formData.refereeName || !formData.refereePhone) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Mock secure submission
        console.log("Referral Submitted", formData);
        toast.success("Referral Submitted Successfully! You will receive your reward once they complete a booking.");

        // Reset form
        setFormData({
            referrerName: "",
            referrerPhone: "",
            referrerUpi: "",
            refereeName: "",
            refereePhone: "",
        });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-20 md:pt-24 pb-16">
                {/* Hero Section */}
                <div className="bg-secondary/30 py-12 mb-12">
                    <div className="container mx-auto px-4 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
                            Naman Parivar Rewards
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            Refer & Earn Divine Blessings
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                            Invite your friends and family to experience spiritual journeys with Namandarshan.
                            Get <span className="font-bold text-primary">₹101 Cashback</span>, Chadhava, or Prasadam
                            when they verify their first Darshan.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mt-12">
                            <div className="flex flex-col items-center gap-3 p-4">
                                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary">
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <p className="font-medium">1. Refer a Friend</p>
                            </div>
                            <div className="hidden md:block w-24 border-t-2 border-dashed border-primary/30 mt-8"></div>
                            <div className="flex flex-col items-center gap-3 p-4">
                                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary">
                                    <Gift className="w-8 h-8" />
                                </div>
                                <p className="font-medium">2. They Book Darshan</p>
                            </div>
                            <div className="hidden md:block w-24 border-t-2 border-dashed border-primary/30 mt-8"></div>
                            <div className="flex flex-col items-center gap-3 p-4">
                                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary">
                                    <Wallet className="w-8 h-8" />
                                </div>
                                <p className="font-medium">3. Earn ₹101 Reward</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-primary/10 overflow-hidden">
                        <div className="bg-primary p-6 text-white text-center">
                            <h2 className="font-display text-2xl font-semibold">Start Referring Now</h2>
                            <p className="text-white/80">Fill in the details below to claim your link</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                            {/* Referrer Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary flex items-center gap-2 border-b pb-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                                    Your Details (Referrer)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="referrerName">Full Name *</Label>
                                        <Input
                                            id="referrerName"
                                            name="referrerName"
                                            placeholder="Enter your name"
                                            value={formData.referrerName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="referrerPhone">Phone Number *</Label>
                                        <Input
                                            id="referrerPhone"
                                            name="referrerPhone"
                                            type="tel"
                                            placeholder="+91 9311973199"
                                            value={formData.referrerPhone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="referrerUpi">UPI ID (For Cashback) *</Label>
                                    <Input
                                        id="referrerUpi"
                                        name="referrerUpi"
                                        placeholder="example@upi"
                                        value={formData.referrerUpi}
                                        onChange={handleChange}
                                        className="bg-secondary/20"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Required to process your ₹101 reward instantly.</p>
                                </div>
                            </div>

                            {/* Referee Section */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-lg font-semibold text-primary flex items-center gap-2 border-b pb-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                                    Friend's Details (Referee)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="refereeName">Friend's Name *</Label>
                                        <Input
                                            id="refereeName"
                                            name="refereeName"
                                            placeholder="Enter friend's name"
                                            value={formData.refereeName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="refereePhone">Friend's Phone *</Label>
                                        <Input
                                            id="refereePhone"
                                            name="refereePhone"
                                            type="tel"
                                            placeholder="+91 93119 73199"
                                            value={formData.refereePhone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg h-12 btn-glow">
                                    Submit Referral
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    By submitting, you agree to our Referral Program Terms & Conditions.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Referral;
