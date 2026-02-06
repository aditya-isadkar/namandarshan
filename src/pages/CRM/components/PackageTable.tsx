import { getApiUrl } from "@/utils/api";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PackageTableProps {
    packages: any[];
    onRefresh: () => void;
    onEdit: (pkg: any) => void;
    onView?: (pkg: any) => void;
    sortConfig?: { key: string; direction: "asc" | "desc" } | null;
    onSort?: (key: string) => void;
    pagination?: { total: number; page: number; limit: number; pages: number };
}

const PackageTable = ({ packages, onRefresh, onEdit, onView, sortConfig, onSort, pagination }: PackageTableProps) => {
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

    const handleDelete = async (leadId: string) => {
        try {
            const response = await fetch(getApiUrl(`/api/crm/leads/${leadId}`), { method: "DELETE" });
            const data = await response.json();
            if (data.success) {
                toast({ title: "Success", description: "Package booking deleted" });
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
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-green-100 text-green-800",
            completed: "bg-gray-100 text-gray-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const renderSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    const handleSort = (key: string) => {
        if (onSort) onSort(key);
    };

    if (packages.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">No package bookings found</p>
                <p className="text-gray-400 text-sm mt-2">Click "Add Booking" to create a package booking</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">S.NO</TableHead>
                            <TableHead onClick={() => handleSort("createdAt")} className="cursor-pointer hover:bg-gray-100">CREATED AT{renderSortIcon("createdAt")}</TableHead>
                            <TableHead onClick={() => handleSort("userDetails.name")} className="cursor-pointer hover:bg-gray-100">LEAD NAME{renderSortIcon("userDetails.name")}</TableHead>
                            <TableHead>MOBILE</TableHead>
                            <TableHead onClick={() => handleSort("serviceName")} className="cursor-pointer hover:bg-gray-100">PACKAGE{renderSortIcon("serviceName")}</TableHead>
                            <TableHead onClick={() => handleSort("bookingDetails.date")} className="cursor-pointer hover:bg-gray-100">TRAVEL DATE{renderSortIcon("bookingDetails.date")}</TableHead>
                            <TableHead onClick={() => handleSort("bookingDetails.numberOfPeople")} className="cursor-pointer hover:bg-gray-100">TRAVELERS{renderSortIcon("bookingDetails.numberOfPeople")}</TableHead>
                            <TableHead onClick={() => handleSort("nextAction.actionDate")} className="cursor-pointer hover:bg-gray-100">NEXT ACTION{renderSortIcon("nextAction.actionDate")}</TableHead>
                            <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-100">STATUS{renderSortIcon("status")}</TableHead>
                            <TableHead onClick={() => handleSort("assignedTo")} className="cursor-pointer hover:bg-gray-100">ASSIGNED TO{renderSortIcon("assignedTo")}</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packages.map((pkg: any, index: number) => (
                            <TableRow key={pkg.leadId} className="hover:bg-gray-50">
                                <TableCell className="font-medium">{getSerialNo(index)}</TableCell>
                                <TableCell className="text-xs text-gray-500">
                                    {pkg.createdAt ? new Date(pkg.createdAt).toLocaleString("en-IN") : "-"}
                                </TableCell>
                                <TableCell>{pkg.userDetails?.name || "-"}</TableCell>
                                <TableCell>📱 {pkg.userDetails?.mobile || pkg.userDetails?.whatsapp || "-"}</TableCell>
                                <TableCell className="font-medium">{pkg.serviceName || "-"}</TableCell>
                                <TableCell>{pkg.bookingDetails?.date ? new Date(pkg.bookingDetails.date).toLocaleDateString("en-IN") : (pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString("en-IN") : "-")}</TableCell>
                                <TableCell>{pkg.bookingDetails?.numberOfPeople || "1"} pax</TableCell>
                                <TableCell>
                                    {pkg.nextAction?.actionDate ? (
                                        <div className="text-sm">
                                            <div className={`font-medium ${(() => {
                                                const actionDate = new Date(pkg.nextAction.actionDate!);
                                                const today = new Date();
                                                const diffTime = actionDate.getTime() - today.getTime();
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                return diffDays < 3 ? "text-red-600" : "text-blue-600";
                                            })()
                                                }`}>
                                                {new Date(pkg.nextAction.actionDate).toLocaleDateString("en-IN")}
                                            </div>
                                            <div className="text-xs text-gray-500 capitalize">
                                                {pkg.nextAction.actionType?.replace('-', ' ')}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {pkg.status === 'maybe later' && pkg.maybeLaterDate ? (
                                        <div className={`px-2 py-1 rounded-md text-xs font-medium text-center inline-flex flex-col items-center bg-pink-100 text-pink-800`}>
                                            <span className="uppercase leading-tight">{pkg.status}</span>
                                            <span className="text-[10px] mt-0.5 border-t border-pink-200 pt-0.5 w-full">
                                                {new Date(pkg.maybeLaterDate).toLocaleDateString("en-IN")}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                                            {(pkg.status || 'pending').toUpperCase()}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>Unassigned</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => onEdit(pkg)}>
                                            <Pencil className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => setDeletingId(pkg.leadId)}>
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete the package booking.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default PackageTable;
