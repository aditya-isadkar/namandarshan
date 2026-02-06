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
    maybeLaterDate?: string;
}

interface DarshanTableProps {
    bookings: DarshanBooking[];
    onRefresh: () => void;
    onEdit: (booking: DarshanBooking) => void;
    onView?: (booking: DarshanBooking) => void;
    user?: any; // Add user prop for RBAC
    sortConfig?: { key: string; direction: "asc" | "desc" } | null;
    onSort?: (key: string) => void;
    pagination?: { total: number; page: number; limit: number; pages: number };
}

const DarshanTable = ({ bookings, onRefresh, onEdit, onView, user, sortConfig, onSort, pagination }: DarshanTableProps) => {
    const { toast } = useToast();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const getSerialNo = (index: number) => {
        if (!pagination) return index + 1;
        const { total, page, limit } = pagination;
        if (sortConfig?.key === "createdAt" && sortConfig.direction === "desc") {
            return total - ((page - 1) * limit) - index;
        }
        return ((page - 1) * limit) + index + 1;
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

    const renderSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    const handleSort = (key: string) => {
        if (onSort) onSort(key);
    };

    if (bookings.length === 0) {
        return (
            <div className="bg-white dark:bg-card rounded-lg shadow p-12 text-center transition-colors">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No darshan bookings found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Click "Add Manual" to create your first darshan booking
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
                                <TableHead className="font-semibold">S.NO</TableHead>
                                <TableHead onClick={() => handleSort("createdAt")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">CREATED AT{renderSortIcon("createdAt")}</TableHead>
                                <TableHead className="font-semibold">DEVOTEE NAME</TableHead>
                                <TableHead className="font-semibold">MOBILE</TableHead>
                                <TableHead className="font-semibold">TEMPLE</TableHead>
                                <TableHead onClick={() => handleSort("type")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">DARSHAN TYPE{renderSortIcon("type")}</TableHead>
                                <TableHead onClick={() => handleSort("bookingDetails.date")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">DATE{renderSortIcon("bookingDetails.date")}</TableHead>
                                <TableHead onClick={() => handleSort("nextAction.actionDate")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">NEXT ACTION{renderSortIcon("nextAction.actionDate")}</TableHead>
                                <TableHead onClick={() => handleSort("status")} className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">STATUS{renderSortIcon("status")}</TableHead>
                                <TableHead className="font-semibold">ASSIGNED TO</TableHead>
                                <TableHead className="font-semibold">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking, index) => (
                                <TableRow key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                    <TableCell className="font-medium">
                                        {getSerialNo(index)}
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
                                                <div className={`font-medium ${(() => {
                                                    const actionDate = new Date(booking.nextAction.actionDate!);
                                                    const today = new Date();
                                                    const diffTime = actionDate.getTime() - today.getTime();
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    return diffDays < 3 ? "text-red-600" : "text-blue-600";
                                                })()
                                                    }`}>
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
                                        {booking.status === 'maybe later' && booking.maybeLaterDate ? (
                                            <div className={`px-2 py-1 rounded-md text-xs font-medium text-center inline-flex flex-col items-center bg-pink-100 text-pink-800`}>
                                                <span className="uppercase leading-tight">{booking.status}</span>
                                                <span className="text-[10px] mt-0.5 border-t border-pink-200 pt-0.5 w-full">
                                                    {new Date(booking.maybeLaterDate).toLocaleDateString("en-IN")}
                                                </span>
                                            </div>
                                        ) : (
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status.toUpperCase()}
                                            </span>
                                        )}
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
