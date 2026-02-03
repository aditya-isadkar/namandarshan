import { getApiUrl } from "@/utils/api";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LeadFormModal from "./LeadFormModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Booking {
    _id: string;
    type: string;
    serviceName: string;
    serviceId?: string;
    userDetails: {
        name: string;
        email?: string;
        mobile?: string;
        whatsapp?: string;
    };
    bookingDetails: any;
    status: string;
    createdAt: string;
}

interface CRMDataTableProps {
    leads: Booking[];
    onRefresh: () => void;
}

const CRMDataTable = ({ leads, onRefresh }: CRMDataTableProps) => {
    const { toast } = useToast();
    const [editingLead, setEditingLead] = useState<Booking | null>(null);
    const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(getApiUrl(`/api/crm/bookings/${id}`), {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: "Booking deleted successfully",
                });
                onRefresh();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to delete booking",
                });
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete booking",
            });
        } finally {
            setDeletingLeadId(null);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-IN");
    };

    const getStageColor = (stage: string) => {
        const colors: { [key: string]: string } = {
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            qualified: "bg-purple-100 text-purple-800",
            proposal_sent: "bg-indigo-100 text-indigo-800",
            negotiation: "bg-orange-100 text-orange-800",
            converted: "bg-green-100 text-green-800",
            lost: "bg-red-100 text-red-800",
        };
        return colors[stage] || "bg-gray-100 text-gray-800";
    };

    if (leads.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">No leads found</p>
                <p className="text-gray-400 text-sm mt-2">
                    Click "Manual Add" to create your first lead
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="w-[40px]">
                                    <input type="checkbox" className="cursor-pointer" />
                                </TableHead>
                                <TableHead className="font-semibold">LEAD INFORMATION</TableHead>
                                <TableHead className="font-semibold">CREATED AT</TableHead>
                                <TableHead className="font-semibold">CONTACT DETAILS</TableHead>
                                <TableHead className="font-semibold">TEMPLE & DATE</TableHead>
                                <TableHead className="font-semibold">CURRENT STAGE</TableHead>
                                <TableHead className="font-semibold">ASSIGNED TO</TableHead>
                                <TableHead className="font-semibold">NEXT ACTION</TableHead>
                                <TableHead className="font-semibold">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead._id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <input type="checkbox" className="cursor-pointer" />
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {lead.userDetails?.name || "-"}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {lead.userDetails?.email || "-"}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                ID: {lead._id.substring(0, 8)}...
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-xs text-gray-500">
                                            {lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-IN") : "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="text-sm">📱 {lead.userDetails?.mobile || "-"}</div>
                                            {lead.userDetails?.whatsapp && (
                                                <div className="text-sm text-green-600">
                                                    💬 {lead.userDetails.whatsapp}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium text-sm">
                                                {lead.serviceName || "-"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(lead.bookingDetails?.date || lead.createdAt)}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {lead.type || "-"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(
                                                lead.status
                                            )}`}
                                        >
                                            {(lead.status || 'pending').toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">
                                            Unassigned
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="text-sm font-medium">
                                                -
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingLead(lead)}
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeletingLeadId(lead._id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingLead && (
                <LeadFormModal
                    isOpen={!!editingLead}
                    onClose={() => setEditingLead(null)}
                    onSuccess={() => {
                        setEditingLead(null);
                        onRefresh();
                    }}
                    lead={editingLead}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!deletingLeadId}
                onOpenChange={(open) => !open && setDeletingLeadId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the lead.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletingLeadId && handleDelete(deletingLeadId)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default CRMDataTable;
