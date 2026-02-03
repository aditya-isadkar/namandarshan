import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DarshanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    booking?: any | null;
}

const DarshanFormModal = ({ isOpen, onClose, onSuccess, booking }: DarshanFormModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        temple: "",
        darshanType: "",
        preferredDate: "",
        devoteeCount: "1",
        assignedTo: "",
        status: "new lead",
        notes: "",
        nextActionDate: "",
        nextActionType: "",
        nextActionNotes: "",
    });

    useEffect(() => {
        if (booking) {
            setFormData({
                name: booking.leadInformation?.name || "",
                email: booking.leadInformation?.email || "",
                mobile: booking.contactDetails?.mobile || "",
                temple: booking.templeAndDate?.temple || "",
                darshanType: booking.templeAndDate?.serviceType || "",
                preferredDate: booking.templeAndDate?.preferredDate?.split("T")[0] || "",
                devoteeCount: booking.notes?.devoteeCount || "1",
                assignedTo: booking.assignedTo || "",
                status: booking.currentStage || "new lead",
                notes: booking.notes || "",
                nextActionDate: booking.nextAction?.actionDate?.split("T")[0] || "",
                nextActionType: booking.nextAction?.actionType || "",
                nextActionNotes: booking.nextAction?.notes || "",
            });
        }
    }, [booking]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Use bookings schema format to match existing MongoDB data
        const payload = {
            type: "darshan",
            serviceName: formData.temple,
            serviceId: formData.darshanType || "",
            userDetails: {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                whatsapp: formData.mobile,
            },
            bookingDetails: {
                date: formData.preferredDate,
                numberOfDevotees: parseInt(formData.devoteeCount) || 1,
                darshanType: formData.darshanType,
                message: formData.notes || ""
            },
            nextAction: formData.nextActionDate ? {
                actionDate: formData.nextActionDate,
                actionType: formData.nextActionType,
                notes: formData.nextActionNotes
            } : undefined,
            status: formData.status || "pending",
        };

        try {
            const url = booking
                ? `/api/crm/bookings/${booking._id}`
                : "/api/crm/bookings";
            const method = booking ? "PUT" : "POST";

            const response = await fetch(getApiUrl(url), {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: booking
                        ? "Darshan booking updated successfully"
                        : "Darshan booking created successfully",
                });
                onSuccess();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to save booking",
                });
            }
        } catch (error) {
            console.error("Error saving booking:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save booking",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {booking ? "Edit Darshan Booking" : "New Darshan Booking"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Devotee Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-gray-700">Devotee Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="mobile">Mobile *</Label>
                                <Input
                                    id="mobile"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Temple & Darshan Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-gray-700">Temple & Darshan Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="temple">Temple *</Label>
                                <Select value={formData.temple} onValueChange={(val) => setFormData({ ...formData, temple: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select temple" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kedarnath Dham">Kedarnath Dham</SelectItem>
                                        <SelectItem value="Badrinath Dham">Badrinath Dham</SelectItem>
                                        <SelectItem value="Tirupati Balaji">Tirupati Balaji</SelectItem>
                                        <SelectItem value="Golden Temple">Golden Temple</SelectItem>
                                        <SelectItem value="Shirdi Sai Baba">Shirdi Sai Baba</SelectItem>
                                        <SelectItem value="Vaishno Devi">Vaishno Devi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="darshanType">Darshan Type *</Label>
                                <Select value={formData.darshanType} onValueChange={(val) => setFormData({ ...formData, darshanType: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="General Darshan">General Darshan</SelectItem>
                                        <SelectItem value="VIP Darshan">VIP Darshan</SelectItem>
                                        <SelectItem value="Special Puja">Special Puja</SelectItem>
                                        <SelectItem value="Abhishek">Abhishek</SelectItem>
                                        <SelectItem value="Aarti">Aarti</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="preferredDate">Preferred Date *</Label>
                                <Input
                                    id="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="devoteeCount">Number of Devotees</Label>
                                <Input
                                    id="devoteeCount"
                                    type="number"
                                    min="1"
                                    value={formData.devoteeCount}
                                    onChange={(e) => setFormData({ ...formData, devoteeCount: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Assignment & Status */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-gray-700">Assignment & Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="assignedTo">Assigned To</Label>
                                <Input
                                    id="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                                    placeholder="Agent name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new lead">New Lead</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="not reachable">Not Reachable</SelectItem>
                                        <SelectItem value="interested">Interested</SelectItem>
                                        <SelectItem value="follow-up schedule">Follow-up Schedule</SelectItem>
                                        <SelectItem value="proposal shared">Proposal Shared</SelectItem>
                                        <SelectItem value="negotiation">Negotiation</SelectItem>
                                        <SelectItem value="converted/won">Converted/Won</SelectItem>
                                        <SelectItem value="not interested">Not Interested</SelectItem>
                                        <SelectItem value="lost">Lost</SelectItem>
                                        <SelectItem value="duplicate/invalid">Duplicate/Invalid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Next Action */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-gray-700">Next Action</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="nextActionDate">Action Date</Label>
                                <Input
                                    id="nextActionDate"
                                    type="date"
                                    value={formData.nextActionDate}
                                    onChange={(e) => setFormData({ ...formData, nextActionDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="nextActionType">Action Type</Label>
                                <Select value={formData.nextActionType} onValueChange={(val) => setFormData({ ...formData, nextActionType: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select action type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="call">📞 Call</SelectItem>
                                        <SelectItem value="email">✉️ Email</SelectItem>
                                        <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                                        <SelectItem value="follow-up">🔄 Follow-up</SelectItem>
                                        <SelectItem value="send-proposal">📋 Send Proposal</SelectItem>
                                        <SelectItem value="meeting">🤝 Meeting</SelectItem>
                                        <SelectItem value="other">⚙️ Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="nextActionNotes">Action Notes</Label>
                                <Textarea
                                    id="nextActionNotes"
                                    value={formData.nextActionNotes}
                                    onChange={(e) => setFormData({ ...formData, nextActionNotes: e.target.value })}
                                    placeholder="Details about the next action..."
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any special requests or requirements..."
                            rows={3}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            {isSubmitting ? "Saving..." : booking ? "Update Booking" : "Create Booking"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DarshanFormModal;
