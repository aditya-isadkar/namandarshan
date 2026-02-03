import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PackageFormModal = ({ isOpen, onClose, onSuccess, package: pkg }: any) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "", email: "", mobile: "", packageName: "", travelDate: "", travelers: "1",
        adults: "1", children: "0", assignedTo: "", status: "new", notes: "",
        nextActionDate: "", nextActionType: "", nextActionNotes: ""
    });

    useEffect(() => {
        if (pkg) {
            setFormData({
                name: pkg.leadInformation?.name || pkg.userDetails?.name || "",
                email: pkg.leadInformation?.email || pkg.userDetails?.email || "",
                mobile: pkg.contactDetails?.mobile || pkg.userDetails?.mobile || pkg.userDetails?.whatsapp || "",
                packageName: pkg.templeAndDate?.temple || pkg.templeAndDate?.serviceType || pkg.serviceName || "",
                travelDate: pkg.templeAndDate?.preferredDate?.split("T")[0] || (pkg.bookingDetails?.date ? new Date(pkg.bookingDetails.date).toISOString().split("T")[0] : ""),
                travelers: pkg.notes?.travelers || pkg.bookingDetails?.numberOfPeople?.toString() || "1",
                adults: pkg.notes?.adults || "1",
                children: pkg.notes?.children || "0",
                assignedTo: pkg.assignedTo || "",
                status: pkg.currentStage || pkg.status || "new",
                notes: pkg.notes?.notes || (typeof pkg.notes === 'string' ? pkg.notes : "") || "",
                nextActionDate: pkg.nextAction?.actionDate?.split("T")[0] || "",
                nextActionType: pkg.nextAction?.actionType || "",
                nextActionNotes: pkg.nextAction?.notes || ""
            });
        }

    }, [pkg]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            serviceType: "package",
            leadInformation: { name: formData.name, email: formData.email, source: "crm" },
            contactDetails: { mobile: formData.mobile, whatsapp: formData.mobile },
            templeAndDate: { temple: formData.packageName, preferredDate: formData.travelDate, serviceType: "Package Tour" },
            currentStage: formData.status,
            assignedTo: formData.assignedTo,
            notes: JSON.stringify({ travelers: formData.travelers, adults: formData.adults, children: formData.children, notes: formData.notes }),
            nextAction: formData.nextActionDate ? {
                actionDate: formData.nextActionDate,
                actionType: formData.nextActionType,
                notes: formData.nextActionNotes
            } : undefined
        };

        try {
            const url = pkg ? `/api/crm/leads/${pkg.leadId}` : "/api/crm/leads";
            const response = await fetch(getApiUrl(url), { method: pkg ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            const data = await response.json();
            if (data.success) {
                toast({ title: "Success", description: pkg ? "Package updated" : "Package created" });
                onSuccess();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{pkg ? "Edit" : "New"} Package Booking</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Customer Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Name *</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                            <div><Label>Mobile *</Label><Input value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required /></div>
                            <div className="col-span-2"><Label>Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Package Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Package *</Label>
                                <Select value={formData.packageName} onValueChange={(val) => setFormData({ ...formData, packageName: val })}>
                                    <SelectTrigger><SelectValue placeholder="Select package" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Char Dham Yatra">Char Dham Yatra</SelectItem>
                                        <SelectItem value="Shirdi Darshan">Shirdi Darshan</SelectItem>
                                        <SelectItem value="Kedarnath Trek">Kedarnath Trek</SelectItem>
                                        <SelectItem value="Vaishno Devi">Vaishno Devi</SelectItem>
                                        <SelectItem value="South India Temples">South India Temples</SelectItem>
                                        <SelectItem value="Ayodhya-Varanasi-Prayagraj">Ayodhya-Varanasi-Prayagraj</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div><Label>Travel Date *</Label><Input type="date" value={formData.travelDate} onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })} required /></div>
                            <div><Label>Adults</Label><Input type="number" min="1" value={formData.adults} onChange={(e) => setFormData({ ...formData, adults: e.target.value, travelers: (parseInt(e.target.value) + parseInt(formData.children)).toString() })} /></div>
                            <div><Label>Children</Label><Input type="number" min="0" value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value, travelers: (parseInt(formData.adults) + parseInt(e.target.value)).toString() })} /></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Assignment & Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Assigned To</Label><Input value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} /></div>
                            <div>
                                <Label>Status</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Next Action</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Action Date</Label><Input type="date" value={formData.nextActionDate} onChange={(e) => setFormData({ ...formData, nextActionDate: e.target.value })} /></div>
                            <div>
                                <Label>Action Type</Label>
                                <Select value={formData.nextActionType} onValueChange={(val) => setFormData({ ...formData, nextActionType: val })}>
                                    <SelectTrigger><SelectValue placeholder="Select action type" /></SelectTrigger>
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
                            <div className="col-span-2"><Label>Action Notes</Label><Textarea value={formData.nextActionNotes} onChange={(e) => setFormData({ ...formData, nextActionNotes: e.target.value })} placeholder="Details about the next action..." rows={2} /></div>
                        </div>
                    </div>

                    <div><Label>Notes</Label><Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} /></div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                            {isSubmitting ? "Saving..." : pkg ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PackageFormModal;
