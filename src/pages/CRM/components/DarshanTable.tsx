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

interface DarshanBooking {
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
}

interface DarshanTableProps {
    bookings: DarshanBooking[];
    onRefresh: () => void;
    onEdit: (booking: DarshanBooking) => void;
    onView?: (booking: DarshanBooking) => void;
    user?: any; // Add user prop for RBAC
}

const DarshanTable = ({ bookings, onRefresh, onEdit, onView, user }: DarshanTableProps) => {
    const { toast } = useToast();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(getApiUrl(`/api/crm/bookings/${id}`), {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: "Darshan booking deleted successfully",
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
            setDeletingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-green-100 text-green-800",
            completed: "bg-gray-100 text-gray-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-IN");
    };

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">No darshan bookings found</p>
                <p className="text-gray-400 text-sm mt-2">
                    Click "Add Booking" to create your first darshan booking
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
                                <TableHead className="font-semibold">BOOKING ID</TableHead>
                                <TableHead className="font-semibold">CREATED AT</TableHead>
                                <TableHead className="font-semibold">DEVOTEE NAME</TableHead>
                                <TableHead className="font-semibold">MOBILE</TableHead>
                                <TableHead className="font-semibold">TEMPLE</TableHead>
                                <TableHead className="font-semibold">DARSHAN TYPE</TableHead>
                                <TableHead className="font-semibold">DATE</TableHead>
                                <TableHead className="font-semibold">NEXT ACTION</TableHead>
                                <TableHead className="font-semibold">STATUS</TableHead>
                                <TableHead className="font-semibold">ASSIGNED TO</TableHead>
                                <TableHead className="font-semibold">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        {booking._id.substring(0, 8)}...
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500">
                                        {booking.createdAt ? new Date(booking.createdAt).toLocaleString("en-IN") : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{booking.userDetails?.name || "-"}</div>
                                            <div className="text-sm text-gray-500">{booking.userDetails?.email || ""}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">📱 {booking.userDetails?.whatsapp || booking.userDetails?.mobile || "-"}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-sm">
                                            {booking.serviceName || "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">
                                            {booking.type || "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {formatDate(booking.bookingDetails?.date || booking.createdAt)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {booking.nextAction?.actionDate ? (
                                            <div className="text-sm">
                                                <div className="font-medium text-blue-600">
                                                    {formatDate(booking.nextAction.actionDate)}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize">
                                                    {booking.nextAction.actionType?.replace('-', ' ')}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">
                                            Unassigned
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {onView && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onView(booking)}
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-purple-600" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(booking)}>
                                                <Pencil className="w-4 h-4 text-blue-500" />
                                            </Button>

                                            {/* Delete Button - Master Admin Only */}
                                            {user?.role === 'master_admin' && (
                                                <Button variant="ghost" size="icon" onClick={() => setDeletingId(booking._id)}>
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!deletingId}
                onOpenChange={(open) => !open && setDeletingId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the darshan booking.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletingId && handleDelete(deletingId)}
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

export default DarshanTable;
