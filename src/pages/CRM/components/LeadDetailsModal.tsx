import { getApiUrl } from "@/utils/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileText, Calendar, User, Phone, Mail, MapPin } from "lucide-react";
import ActivityTimeline from "./ActivityTimeline";
import InvoiceGeneratorModal from "./InvoiceGeneratorModal";

interface LeadDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: any;
    onUpdate: () => void;
}

const STATUS_OPTIONS = [
    'new lead',
    'contacted',
    'not reachable',
    'interested',
    'follow-up schedule',
    'proposal shared',
    'negotiation',
    'converted/won',
    'not interested',
    'lost',
    'duplicate/invalid',
    'maybe later'
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'new lead': 'bg-blue-100 text-blue-800',
        'contacted': 'bg-yellow-100 text-yellow-800',
        'not reachable': 'bg-gray-100 text-gray-800',
        'interested': 'bg-green-100 text-green-800',
        'follow-up schedule': 'bg-purple-100 text-purple-800',
        'proposal shared': 'bg-indigo-100 text-indigo-800',
        'negotiation': 'bg-orange-100 text-orange-800',
        'converted/won': 'bg-emerald-100 text-emerald-800',
        'not interested': 'bg-red-100 text-red-800',
        'lost': 'bg-red-200 text-red-900',
        'duplicate/invalid': 'bg-gray-200 text-gray-900',
        'maybe later': 'bg-pink-100 text-pink-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const LeadDetailsModal = ({ isOpen, onClose, lead, onUpdate }: LeadDetailsModalProps) => {
    const { toast } = useToast();
    const [selectedStatus, setSelectedStatus] = useState(lead?.status || lead?.currentStage || 'pending');
    const [isUpdating, setIsUpdating] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [maybeLaterDate, setMaybeLaterDate] = useState(lead?.maybeLaterDate ? new Date(lead.maybeLaterDate).toISOString().split('T')[0] : "");

    const handleStatusUpdate = async () => {
        const currentStatus = lead.status || lead.currentStage;
        if (selectedStatus === currentStatus && selectedStatus !== 'maybe later') {
            toast({ variant: "default", title: "No change", description: "Status is already set to this value" });
            return;
        }

        if (selectedStatus === 'maybe later' && !maybeLaterDate) {
            toast({ variant: "destructive", title: "Date Required", description: "Please select a date for Maybe Later status" });
            return;
        }


        setIsUpdating(true);
        try {
            // Get user info for activity logging
            const user = JSON.parse(localStorage.getItem('crmUser') || '{}');

            // Determine if it's a booking (has _id) or old lead (leadId)
            const id = lead._id || lead.leadId;
            const endpoint = lead._id ? `/api/crm/bookings/${id}` : `/api/crm/leads/${id}`;
            const method = 'PUT';

            // For bookings, we update 'status'. For leads, 'currentStage'.
            const body = lead._id
                ? {
                    status: selectedStatus,
                    updatedBy: user.userId,
                    updatedByName: user.agentName || user.userId,
                    maybeLaterDate: selectedStatus === 'maybe later' ? maybeLaterDate : undefined
                }
                : {
                    currentStage: selectedStatus,
                    _userId: user.userId,
                    _userName: user.agentName || user.userId,
                    maybeLaterDate: selectedStatus === 'maybe later' ? maybeLaterDate : undefined
                };

            const response = await fetch(getApiUrl(endpoint), {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.userId // Add auth header
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.success) {
                toast({
                    title: "Status Updated",
                    description: `Status changed to ${selectedStatus}`
                });
                onUpdate();
                onClose();
            } else {
                toast({ variant: "destructive", title: "Update failed", description: data.message });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
        } finally {
            setIsUpdating(false);
        }
    };

    if (!lead) return null;

    // Helper to get safe values
    const getName = () => lead.userDetails?.name || lead.customerDetails?.name || lead.leadInformation?.name || 'N/A';
    const getMobile = () => lead.userDetails?.mobile || lead.customerDetails?.mobile || lead.contactDetails?.mobile || 'N/A';
    const getEmail = () => lead.userDetails?.email || lead.customerDetails?.email || lead.leadInformation?.email || 'N/A';
    const getWhatsapp = () => lead.userDetails?.whatsapp || lead.contactDetails?.whatsapp || 'N/A';

    const getTemple = () => lead.serviceName || lead.serviceDetails?.temple || lead.templeAndDate?.temple || 'N/A';
    const getServiceType = () => lead.type || lead.serviceType || lead.templeAndDate?.serviceType || 'N/A';
    const getDate = () => {
        const d = lead.bookingDetails?.date || lead.serviceDetails?.serviceDate || lead.templeAndDate?.preferredDate;
        return d ? new Date(d).toLocaleDateString('en-IN') : 'N/A';
    };
    const getSpecificService = () => lead.bookingDetails?.darshanType || lead.bookingDetails?.message || lead.serviceDetails?.specificService || 'N/A';
    const getAmount = () => lead.bookingDetails?.amount || lead.pricing?.finalAmount || lead.pricing?.total || 0;

    const status = lead.status || lead.currentStage || 'pending';

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Lead/Booking Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* ID and Status */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">ID</p>
                                <p className="text-lg font-mono font-semibold">{lead._id ? lead._id.substring(0, 8) + '...' : lead.leadId}</p>
                            </div>
                            <Badge className={`text-sm px-3 py-1 ${getStatusColor(status)}`}>
                                {(status).toUpperCase()}
                            </Badge>
                        </div>

                        <Separator />

                        {/* Customer Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{getName()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Phone className="w-3 h-3" /> Mobile
                                    </p>
                                    <p className="font-medium">{getMobile()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> Email
                                    </p>
                                    <p className="font-medium">{getEmail()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">WhatsApp</p>
                                    <p className="font-medium">{getWhatsapp()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Service Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-500">Temple/Service</p>
                                    <p className="font-medium">{getTemple()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Service Type</p>
                                    <p className="font-medium capitalize">{getServiceType()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Preferred Date
                                    </p>
                                    <p className="font-medium">{getDate()}</p>
                                </div>
                                {lead.maybeLaterDate && status === 'maybe later' && (
                                    <div>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-pink-500" /> Follow-up Date
                                        </p>
                                        <p className="font-medium text-pink-700">
                                            {new Date(lead.maybeLaterDate).toLocaleDateString('en-IN')}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-500">Specific Details</p>
                                    <p className="font-medium">{getSpecificService()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600">Total Amount</p>
                                    <p className="text-2xl font-bold text-green-600">₹{getAmount()}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Status Management */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Update Status</h3>
                            <div className="flex gap-3">
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    onClick={handleStatusUpdate}
                                    disabled={isUpdating || selectedStatus === status}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Status'}
                                </Button>
                            </div>
                        </div>
                        {selectedStatus === 'maybe later' && (
                            <div className="mt-3">
                                <label className="text-sm font-medium mb-1 block">Follow-up Date</label>
                                <input
                                    type="date"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={maybeLaterDate}
                                    onChange={(e) => setMaybeLaterDate(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Activity Timeline */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Activity Timeline</h3>
                        <ActivityTimeline activities={lead.activityLog || []} />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end">
                        <Button
                            onClick={() => setShowInvoiceModal(true)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Invoice
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog >

            {showInvoiceModal && (
                <InvoiceGeneratorModal
                    isOpen={showInvoiceModal}
                    onClose={() => setShowInvoiceModal(false)}
                    lead={lead}
                    onSuccess={() => {
                        setShowInvoiceModal(false);
                        onUpdate();
                    }}
                />
            )
            }
        </>
    );
};

export default LeadDetailsModal;
