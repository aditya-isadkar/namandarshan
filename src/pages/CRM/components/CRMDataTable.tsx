import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pencil,
    Trash2,
    Eye,
    CheckSquare,
    X,
    UserPlus,
    Archive
} from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    nextAction?: {
        actionDate?: string;
        actionType?: string;
        notes?: string;
    };
    status: string;
    createdAt: string;
    leadInformation?: any;
    maybeLaterDate?: string;
}

interface CRMDataTableProps {
    leads: Booking[];
    onRefresh: () => void;
    sortConfig?: { key: string; direction: "asc" | "desc" } | null;
    onSort?: (key: string) => void;
}

const CRMDataTable = ({ leads, onRefresh, sortConfig, onSort }: CRMDataTableProps) => {
    const { toast } = useToast();
    const [editingLead, setEditingLead] = useState<Booking | null>(null);
    const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [bulkAction, setBulkAction] = useState<'reassign' | 'status' | null>(null);
    const [bulkValue, setBulkValue] = useState("");

    // Keep editingLead in sync with leads prop
    useEffect(() => {
        if (editingLead) {
            const updated = leads.find(l => l._id === editingLead._id);
            if (updated) setEditingLead(updated);
        }
    }, [leads]);

    const toggleSelectAll = () => {
        if (selectedIds.length === leads.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(leads.map(l => l._id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkAction = async () => {
        if (!bulkAction || !bulkValue) return;

        try {
            const updates: any = {};
            if (bulkAction === 'reassign') updates.assignedTo = bulkValue;
            if (bulkAction === 'status') updates.status = bulkValue;

            const response = await fetch(getApiUrl('/api/crm/leads/bulk-update'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadIds: selectedIds, updates })
            });

            const data = await response.json();
            if (data.success) {
                toast({ title: "Bulk Update Successful", description: `Updated ${data.modifiedCount} leads` });
                setSelectedIds([]);
                setBulkAction(null);
                setBulkValue("");
                onRefresh();
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Bulk update failed' });
        }
    };

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

    const renderSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    const handleSort = (key: string) => {
        if (onSort) onSort(key);
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
            <div className="bg-white dark:bg-card rounded-lg shadow p-12 text-center transition-colors">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No leads found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Click "Manual Add" to create your first lead
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white dark:bg-card rounded-lg shadow overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900">
                                <TableHead className="w-[40px]">
                                    <Checkbox
                                        checked={selectedIds.length === leads.length && leads.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead onClick={() => handleSort("leadInformation.name")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">LEAD INFORMATION{renderSortIcon("leadInformation.name")}</TableHead>
                                <TableHead onClick={() => handleSort("createdAt")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">CREATED AT{renderSortIcon("createdAt")}</TableHead>
                                <TableHead className="font-semibold">CONTACT DETAILS</TableHead>
                                <TableHead onClick={() => handleSort("bookingDetails.date")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">TEMPLE & DATE{renderSortIcon("bookingDetails.date")}</TableHead>
                                <TableHead onClick={() => handleSort("status")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">CURRENT STAGE{renderSortIcon("status")}</TableHead>
                                <TableHead className="font-semibold">ASSIGNED TO</TableHead>
                                <TableHead onClick={() => handleSort("nextAction.actionDate")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">NEXT ACTION{renderSortIcon("nextAction.actionDate")}</TableHead>
                                <TableHead className="font-semibold">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(lead._id)}
                                            onCheckedChange={() => toggleSelect(lead._id)}
                                        />
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
                                        {lead.status === 'maybe later' && lead.maybeLaterDate ? (
                                            <div className={`px-2 py-1 rounded-md text-xs font-medium text-center inline-flex flex-col items-center ${getStageColor(lead.status)}`}>
                                                <span className="uppercase leading-tight">{lead.status}</span>
                                                <span className="text-[10px] mt-0.5 border-t border-pink-200 pt-0.5 w-full">
                                                    {new Date(lead.maybeLaterDate).toLocaleDateString("en-IN")}
                                                </span>
                                            </div>
                                        ) : (
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(
                                                    lead.status
                                                )}`}
                                            >
                                                {(lead.status || 'pending').toUpperCase()}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">
                                            Unassigned
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {lead.nextAction?.actionDate ? (
                                            <div className="text-sm">
                                                <div className={`font-medium ${(() => {
                                                    const actionDate = new Date(lead.nextAction.actionDate!);
                                                    const today = new Date();
                                                    const diffTime = actionDate.getTime() - today.getTime();
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    return diffDays < 3 ? "text-red-600" : "text-blue-600";
                                                })()
                                                    }`}>
                                                    {formatDate(lead.nextAction.actionDate)}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize">
                                                    {lead.nextAction.actionType?.replace('-', ' ') || '-'}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm font-medium">
                                                -
                                            </div>
                                        )}
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


            {/* Bulk Action Bar */}
            {
                selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-5">
                        <span className="font-semibold whitespace-nowrap">{selectedIds.length} Selected</span>
                        <div className="h-4 w-px bg-gray-700"></div>

                        <div className="flex items-center gap-2">
                            <Select value={bulkAction || ""} onValueChange={(v: any) => setBulkAction(v)}>
                                <SelectTrigger className="w-32 bg-gray-800 border-none text-white h-8">
                                    <SelectValue placeholder="Action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reassign">Reassign</SelectItem>
                                    <SelectItem value="status">Change Status</SelectItem>
                                </SelectContent>
                            </Select>

                            {bulkAction === 'reassign' && (
                                <Select value={bulkValue} onValueChange={setBulkValue}>
                                    <SelectTrigger className="w-40 bg-gray-800 border-none text-white h-8">
                                        <SelectValue placeholder="Select Agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                        {/* Add agents dynamically if available, for now static */}
                                        <SelectItem value="agent1">Agent 1</SelectItem>
                                        <SelectItem value="agent2">Agent 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}

                            {bulkAction === 'status' && (
                                <Select value={bulkValue} onValueChange={setBulkValue}>
                                    <SelectTrigger className="w-40 bg-gray-800 border-none text-white h-8">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="interested">Interested</SelectItem>
                                        <SelectItem value="converted">Converted</SelectItem>
                                        <SelectItem value="lost">Lost</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}

                            <Button
                                size="sm"
                                className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={!bulkAction || !bulkValue}
                                onClick={handleBulkAction}
                            >
                                Apply
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-gray-400 hover:text-white"
                                onClick={() => setSelectedIds([])}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )
            }

            {/* Edit Modal */}
            {
                editingLead && (
                    <LeadFormModal
                        isOpen={!!editingLead}
                        onClose={() => setEditingLead(null)}
                        onSuccess={() => {
                            setEditingLead(null);
                            onRefresh();
                        }}
                        lead={editingLead}
                    />
                )
            }

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
