import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface LeadFormProps {
    triggerText?: string;
    title?: string;
    source?: string; // To track which blog the enquiry came from
}

const LeadForm = ({ triggerText = "Plan This Yatra", title = "Plan Your Journey", source = "Blog" }: LeadFormProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Reset after 3 seconds
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
            }, 3000);
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto bg-white text-orange-700 hover:bg-orange-50 font-bold text-lg h-12 shadow-md">
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {!isSuccess ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-display font-bold text-orange-900">{title}</DialogTitle>
                            <DialogDescription>
                                Fill in your details and our travel experts will contact you shortly to plan your custom pilgrimage.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-stone-700">Full Name</label>
                                <Input id="name" required placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-stone-700">Phone Number</label>
                                <Input id="phone" type="tel" required placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-stone-700">Requirements (Optional)</label>
                                <Textarea id="message" placeholder="No. of people, travel dates, etc." />
                            </div>
                            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Request Call Back"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="py-10 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-900">Request Received!</h3>
                        <p className="text-stone-600">
                            Thank you for your interest. Our Naman Darshan experts will reach out to you within 24 hours.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LeadForm;
