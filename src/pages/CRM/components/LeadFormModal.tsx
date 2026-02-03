import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    lead?: any;
}

const LeadFormModal = ({ isOpen, onClose, onSuccess, lead }: LeadFormModalProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        leadInformation: {
            name: "",
            email: "",
            source: "website",
        },
        contactDetails: {
            mobile: "",
            whatsapp: "",
            alternatePhone: "",
        },
        templeAndDate: {
            temple: "",
            preferredDate: "",
            serviceType: "darshan",
        },
        currentStage: "new lead",
        assignedTo: "",
        nextAction: {
            actionDate: "",
            actionType: "",
            notes: "",
        },
    });

    useEffect(() => {
        if (lead) {
            setFormData({
                leadInformation: {
                    name: lead.leadInformation?.name || "",
                    email: lead.leadInformation?.email || "",
                    source: lead.leadInformation?.source || "website",
                },
                contactDetails: {
                    mobile: lead.contactDetails?.mobile || "",
                    whatsapp: lead.contactDetails?.whatsapp || "",
                    alternatePhone: lead.contactDetails?.alternatePhone || "",
                },
                templeAndDate: {
                    temple: lead.templeAndDate?.temple || "",
                    preferredDate: lead.templeAndDate?.preferredDate || "",
                    serviceType: lead.templeAndDate?.serviceType || "darshan",
                },
                currentStage: lead.currentStage || "new lead",
                assignedTo: lead.assignedTo || "",
                nextAction: {
                    actionDate: lead.nextAction?.actionDate?.split("T")[0] || "",
                    actionType: lead.nextAction?.actionType || "",
                    notes: lead.nextAction?.notes || "",
                },
            });
        } else {
            // Reset form for new lead
            setFormData({
                leadInformation: {
                    name: "",
                    email: "",
                    source: "website",
                },
                contactDetails: {
                    mobile: "",
                    whatsapp: "",
                    alternatePhone: "",
                },
                templeAndDate: {
                    temple: "",
                    preferredDate: "",
                    serviceType: "darshan",
                },
                currentStage: "new lead",
                assignedTo: "",
                nextAction: {
                    actionDate: "",
                    actionType: "",
                    notes: "",
                },
            });
        }
    }, [lead, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get user for RBAC
        const user = JSON.parse(localStorage.getItem('crmUser') || '{}');

        // Block creation for 'team' role
        if (!lead && user.role === 'team') {
            toast({
                variant: "destructive",
                title: "Permission Denied",
                description: "Team members cannot create new leads. Please ask an Admin.",
            });
            return;
        }

        setIsLoading(true);

        try {
            const url = lead
                ? `/api/crm/leads/${lead.leadId}`
                : "/api/crm/leads";
            const method = lead ? "PUT" : "POST";

            const response = await fetch(getApiUrl(url), {
                method,
                headers: {
                    "Content-Type": "application/json",
                    'x-user-id': user.userId // Add auth header
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: lead ? "Lead updated successfully" : "Lead created successfully",
                });
                onSuccess();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to save lead",
                });
            }
        } catch (error) {
            console.error("Error saving lead:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save lead",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{lead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Lead Information */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-700">Lead Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.leadInformation.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            leadInformation: {
                                                ...formData.leadInformation,
                                                name: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.leadInformation.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            leadInformation: {
                                                ...formData.leadInformation,
                                                email: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="source">Source</Label>
                                <Select
                                    value={formData.leadInformation.source}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            leadInformation: {
                                                ...formData.leadInformation,
                                                source: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="website">Website</SelectItem>
                                        <SelectItem value="referral">Referral</SelectItem>
                                        <SelectItem value="social_media">Social Media</SelectItem>
                                        <SelectItem value="direct">Direct</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-700">Contact Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="mobile">Mobile *</Label>
                                <Input
                                    id="mobile"
                                    value={formData.contactDetails.mobile}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contactDetails: {
                                                ...formData.contactDetails,
                                                mobile: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                <Input
                                    id="whatsapp"
                                    value={formData.contactDetails.whatsapp}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contactDetails: {
                                                ...formData.contactDetails,
                                                whatsapp: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                                <Input
                                    id="alternatePhone"
                                    value={formData.contactDetails.alternatePhone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contactDetails: {
                                                ...formData.contactDetails,
                                                alternatePhone: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Temple & Date */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-700">Temple & Service</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="temple">Temple</Label>
                                <Input
                                    id="temple"
                                    value={formData.templeAndDate.temple}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            templeAndDate: {
                                                ...formData.templeAndDate,
                                                temple: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="preferredDate">Preferred Date</Label>
                                <Input
                                    id="preferredDate"
                                    type="date"
                                    value={formData.templeAndDate.preferredDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            templeAndDate: {
                                                ...formData.templeAndDate,
                                                preferredDate: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="serviceType">Service Type</Label>
                                <Select
                                    value={formData.templeAndDate.serviceType}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            templeAndDate: {
                                                ...formData.templeAndDate,
                                                serviceType: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="darshan">Darshan</SelectItem>
                                        <SelectItem value="puja">Puja</SelectItem>
                                        <SelectItem value="prasadam">Prasadam</SelectItem>
                                        <SelectItem value="chadhava">Chadhava</SelectItem>
                                        <SelectItem value="yatra">Yatra</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Assignment & Stage */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-700">Stage & Assignment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="currentStage">Current Stage</Label>
                                <Select
                                    value={formData.currentStage}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, currentStage: value })
                                    }
                                >
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
                            <div>
                                <Label htmlFor="assignedTo">Assigned To</Label>
                                <Input
                                    id="assignedTo"
                                    placeholder="Agent User ID"
                                    value={formData.assignedTo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, assignedTo: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Next Action */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-700">Next Action</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="actionDate">Action Date</Label>
                                <Input
                                    id="actionDate"
                                    type="date"
                                    value={formData.nextAction.actionDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nextAction: {
                                                ...formData.nextAction,
                                                actionDate: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="actionType">Action Type</Label>
                                <Select
                                    value={formData.nextAction.actionType}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            nextAction: {
                                                ...formData.nextAction,
                                                actionType: value,
                                            },
                                        })
                                    }
                                >
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
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Add any additional notes..."
                                    value={formData.nextAction.notes}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nextAction: {
                                                ...formData.nextAction,
                                                notes: e.target.value,
                                            },
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : lead ? "Update Lead" : "Create Lead"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LeadFormModal;
