import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface OpsFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    item?: any | null;
}

const OpsFormModal = ({ isOpen, onClose, onSuccess, item }: OpsFormModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Lead Info
        name: "",
        email: "",
        mobile: "",
        // Payment
        paymentDate: "",
        amountReceived: "",
        // Service Details
        serviceDetails: "",
        // Hotel & Taxi
        hotel: "",
        taxi: "",
        // Extra Services
        extraServices: "",
        // Pandit
        panditAssigned: "",
        panditContact: "",
        panditPayment: "",
        // Status & Rating
        status: "pending",
        rating: 0,
    });

    useEffect(() => {
        if (item) {
            let parsedNotes: any = {};
            try {
                parsedNotes = typeof item.notes === 'string' ? JSON.parse(item.notes) : item.notes || {};
            } catch (e) {
                parsedNotes = {};
            }

            setFormData({
                name: item.leadInformation?.name || "",
                email: item.leadInformation?.email || "",
                mobile: item.contactDetails?.mobile || "",
                paymentDate: parsedNotes.paymentDate?.split("T")[0] || "",
                amountReceived: parsedNotes.amountReceived || "",
                serviceDetails: parsedNotes.serviceDetails || item.templeAndDate?.serviceType || "",
                hotel: parsedNotes.hotelTaxi?.hotel || "",
                taxi: parsedNotes.hotelTaxi?.taxi || "",
                extraServices: parsedNotes.extraServices || "",
                panditAssigned: parsedNotes.panditAssigned || item.assignedTo || "",
                panditContact: parsedNotes.panditContact || "",
                panditPayment: parsedNotes.panditPayment || "",
                status: item.currentStage || "pending",
                rating: parsedNotes.rating || 0,
            });
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            serviceType: "ops",
            leadInformation: {
                name: formData.name,
                email: formData.email,
                source: "crm",
            },
            contactDetails: {
                mobile: formData.mobile,
                whatsapp: formData.mobile,
            },
            templeAndDate: {
                temple: "Fulfilment",
                preferredDate: formData.paymentDate || new Date().toISOString(),
                serviceType: formData.serviceDetails,
            },
            currentStage: formData.status,
            assignedTo: formData.panditAssigned,
            notes: JSON.stringify({
                paymentDate: formData.paymentDate,
                amountReceived: formData.amountReceived,
                serviceDetails: formData.serviceDetails,
                hotelTaxi: {
                    hotel: formData.hotel,
                    taxi: formData.taxi,
                },
                extraServices: formData.extraServices,
                panditAssigned: formData.panditAssigned,
                panditContact: formData.panditContact,
                panditPayment: formData.panditPayment,
                rating: formData.rating,
            }),
        };

        try {
            const url = item ? `/api/crm/leads/${item.leadId}` : "/api/crm/leads";
            const method = item ? "PUT" : "POST";
            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: item ? "Fulfilment updated successfully" : "Fulfilment created successfully",
                });
                onSuccess();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save fulfilment" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{item ? "Edit" : "New"} Fulfilment Record</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Lead Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Lead Information</h3>
                        <div className="grid grid-cols-3 gap-4">
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
                            <div>
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

                    {/* Payment Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Payment Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="paymentDate">Payment Date</Label>
                                <Input
                                    id="paymentDate"
                                    type="date"
                                    value={formData.paymentDate}
                                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="amountReceived">Amount Received (₹)</Label>
                                <Input
                                    id="amountReceived"
                                    type="number"
                                    value={formData.amountReceived}
                                    onChange={(e) => setFormData({ ...formData, amountReceived: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Service Details</h3>
                        <div>
                            <Label htmlFor="serviceDetails">Service Description</Label>
                            <Textarea
                                id="serviceDetails"
                                value={formData.serviceDetails}
                                onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
                                placeholder="Describe the services provided..."
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Hotel & Taxi */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Hotel & Taxi</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="hotel">Hotel Details</Label>
                                <Input
                                    id="hotel"
                                    value={formData.hotel}
                                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                    placeholder="Hotel name or N/A"
                                />
                            </div>
                            <div>
                                <Label htmlFor="taxi">Taxi Details</Label>
                                <Input
                                    id="taxi"
                                    value={formData.taxi}
                                    onChange={(e) => setFormData({ ...formData, taxi: e.target.value })}
                                    placeholder="Taxi/transport details or N/A"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Extra Services */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Extra Services</h3>
                        <div>
                            <Label htmlFor="extraServices">Additional Services</Label>
                            <Textarea
                                id="extraServices"
                                value={formData.extraServices}
                                onChange={(e) => setFormData({ ...formData, extraServices: e.target.value })}
                                placeholder="Any additional services provided..."
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Pandit Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Pandit Details</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="panditAssigned">Pandit Assigned</Label>
                                <Input
                                    id="panditAssigned"
                                    value={formData.panditAssigned}
                                    onChange={(e) => setFormData({ ...formData, panditAssigned: e.target.value })}
                                    placeholder="Pandit name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="panditContact">Pandit Contact</Label>
                                <Input
                                    id="panditContact"
                                    value={formData.panditContact}
                                    onChange={(e) => setFormData({ ...formData, panditContact: e.target.value })}
                                    placeholder="Mobile number"
                                />
                            </div>
                            <div>
                                <Label htmlFor="panditPayment">Pandit Payment (₹)</Label>
                                <Input
                                    id="panditPayment"
                                    type="number"
                                    value={formData.panditPayment}
                                    onChange={(e) => setFormData({ ...formData, panditPayment: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status & Rating */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm border-b pb-2">Status & Rating</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Rating</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-6 h-6 cursor-pointer ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                }`}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setFormData({ ...formData, rating: 0 })}
                                        className="text-xs"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {isSubmitting ? "Saving..." : item ? "Update Fulfilment" : "Create Fulfilment"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OpsFormModal;
