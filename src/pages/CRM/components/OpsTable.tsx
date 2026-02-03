import { getApiUrl } from "@/utils/api";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface OpsTableProps {
    data: any[];
    onRefresh: () => void;
    onEdit: (item: any) => void;
    onView?: (item: any) => void;
}

const OpsTable = ({ data, onRefresh, onEdit, onView }: OpsTableProps) => {
    const { toast } = useToast();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(getApiUrl(`/api/crm/bookings/${id}`), { method: "DELETE" });
            const result = await response.json();
            if (result.success) {
                toast({ title: "Success", description: "Fulfilment deleted successfully" });
                onRefresh();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete" });
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: any = {
            pending: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-blue-100 text-blue-800",
            "in-progress": "bg-purple-100 text-purple-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const renderRating = (rating: number = 0) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        );
    };

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">No fulfilment records found</p>
                <p className="text-gray-400 text-sm mt-2">Click "Manual Add" to create a fulfilment record</p>
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
                                <TableHead className="font-semibold">S.NO</TableHead>
                                <TableHead className="font-semibold">LEAD INFO</TableHead>
                                <TableHead className="font-semibold">CREATED AT</TableHead>
                                <TableHead className="font-semibold">PAYMENT DATE</TableHead>
                                <TableHead className="font-semibold">RECEIVED (₹)</TableHead>
                                <TableHead className="font-semibold">SERVICE DETAILS</TableHead>
                                <TableHead className="font-semibold">HOTEL & TAXI</TableHead>
                                <TableHead className="font-semibold">EXTRA SERVICES</TableHead>
                                <TableHead className="font-semibold">PANDIT ASSIGNED</TableHead>
                                <TableHead className="font-semibold">STATUS</TableHead>
                                <TableHead className="font-semibold">PANDIT PAYMENT</TableHead>
                                <TableHead className="font-semibold">RATING</TableHead>
                                <TableHead className="font-semibold">ACTION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item: any, index: number) => {
                                return (
                                    <TableRow key={item._id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.userDetails?.name || "N/A"}</span>
                                                <span className="text-xs text-gray-500">{item.userDetails?.mobile || "N/A"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-500">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "-"}
                                        </TableCell>
                                        <TableCell>{item.bookingDetails?.date ? new Date(item.bookingDetails.date).toLocaleDateString("en-IN") : "-"}</TableCell>
                                        <TableCell className="font-semibold text-green-600">₹{item.bookingDetails?.amount || 0}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{item.serviceName || "N/A"}</span>
                                                <span className="text-xs text-gray-500 capitalize">{item.type || "-"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 text-xs">
                                                <div>🏨 {item.bookingDetails?.hotel || "No"}</div>
                                                <div>🚖 {item.bookingDetails?.taxi || "No"}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-xs text-gray-500 max-w-[150px] truncate">
                                                {item.bookingDetails?.extraServices || "-"}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm font-medium text-purple-700">
                                                {item.assignedTo || "Unassigned"}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                {(item.status || "pending").toUpperCase()}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">
                                            {item.bookingDetails?.panditPayment ? `₹${item.bookingDetails.panditPayment}` : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {renderRating(item.bookingDetails?.rating || 0)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                                                    <Pencil className="w-4 h-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => setDeletingId(item.leadId)}>
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete the fulfilment record.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default OpsTable;
