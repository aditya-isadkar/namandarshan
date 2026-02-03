import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Download, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from "@/utils/api";
import DarshanTable from "./components/DarshanTable";
import DarshanFormModal from "./components/DarshanFormModal";
import CRMSidebar from "./components/CRMSidebar";
import LeadDetailsModal from "./components/LeadDetailsModal";

const DarshanCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [darshanBookings, setDarshanBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    // Auto-refresh state
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        const crmUser = localStorage.getItem("crmUser");
        if (!crmUser) {
            navigate("/crm");
            return;
        }
        setUser(JSON.parse(crmUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("crmUser");
        navigate("/crm");
    };

    const fetchDarshanBookings = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("type", "darshan");
            params.append("page", page.toString());
            params.append("limit", "50");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);

            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();

            if (data.success) {
                setDarshanBookings(data.data);
                setTotalPages(data.pagination?.pages || 1);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to fetch darshan bookings",
                });
            }
        } catch (error) {
            console.error("Error fetching darshan bookings:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch darshan bookings",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchDarshanBookings();
    }, [user, page, statusFilter, searchTerm]); // Refetch on pagination/filter changes

    // Auto-refresh logic
    useEffect(() => {
        if (!autoRefresh) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    fetchDarshanBookings();
                    return refreshInterval;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [autoRefresh, refreshInterval]);

    const handleFilter = () => {
        fetchDarshanBookings();
    };

    const handleExportCSV = async () => {
        try {
            const params = new URLSearchParams();
            params.append("type", "darshan");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);

            const response = await fetch(getApiUrl(`/api/crm/bookings/export?${params}`), {
                headers: {
                    'x-user-id': user?._id || ''
                }
            });

            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `darshan-bookings-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Export error:', error);
            toast({
                variant: "destructive",
                title: "Export Failed",
                description: "Could not download CSV file"
            });
        }
    };

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setIsFormOpen(true);
    };

    const handleCreateNew = () => {
        setSelectedBooking(null);
        setIsFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            {user && <CRMSidebar user={user} onLogout={handleLogout} />}

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">🙏 Darshan CRM</h1>
                        <p className="text-orange-100">Manage darshan bookings and temple visits</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name, mobile, temple..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Filter Button */}
                            <Button onClick={handleFilter} className="bg-orange-600 hover:bg-orange-700">
                                <Search className="w-4 h-4 mr-2" />
                                Filter
                            </Button>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {/* Export Button - Master Admin Only */}
                                {user?.role === 'master_admin' && (
                                    <Button variant="outline" onClick={handleExportCSV}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Export CSV
                                    </Button>
                                )}

                                {/* Add Button - Admin & Master Admin Only */}
                                {user?.role !== 'team' && (
                                    <Button onClick={() => setIsFormOpen(true)} className="bg-orange-600 hover:bg-orange-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Manual
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Auto-refresh Controls */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={autoRefresh}
                                        onChange={(e) => {
                                            setAutoRefresh(e.target.checked);
                                            if (e.target.checked) setCountdown(refreshInterval);
                                        }}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm font-medium">Auto-refresh</span>
                                </label>

                                <Select
                                    value={refreshInterval.toString()}
                                    onValueChange={(val) => {
                                        const newInterval = parseInt(val);
                                        setRefreshInterval(newInterval);
                                        setCountdown(newInterval);
                                    }}
                                    disabled={!autoRefresh}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="15">15s</SelectItem>
                                        <SelectItem value="30">30s</SelectItem>
                                        <SelectItem value="60">60s</SelectItem>
                                        <SelectItem value="120">120s</SelectItem>
                                    </SelectContent>
                                </Select>

                                {autoRefresh && (
                                    <span className="text-sm text-gray-600">
                                        Next refresh in {countdown}s
                                    </span>
                                )}
                            </div>

                            <Button
                                onClick={fetchDarshanBookings}
                                disabled={isLoading}
                                variant="outline"
                                size="sm"
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                Refresh Now
                            </Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-lg shadow">
                        <DarshanTable
                            bookings={darshanBookings}
                            onRefresh={fetchDarshanBookings}
                            onEdit={handleEdit}
                            onView={(booking) => {
                                setSelectedLead(booking);
                                setIsDetailsOpen(true);
                            }}
                            user={user} // Pass user for RBAC
                        />

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between px-4 py-3 border-t">
                            <div className="text-sm text-gray-500">
                                Page {page} of {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isLoading}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || isLoading}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Modal */}
                    {isFormOpen && (
                        <DarshanFormModal
                            isOpen={isFormOpen}
                            onClose={() => {
                                setIsFormOpen(false);
                                setSelectedBooking(null);
                            }}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                setSelectedBooking(null);
                                fetchDarshanBookings();
                            }}
                            booking={selectedBooking}
                        />
                    )}

                    {/* Lead Details Modal */}
                    {isDetailsOpen && selectedLead && (
                        <LeadDetailsModal
                            isOpen={isDetailsOpen}
                            onClose={() => {
                                setIsDetailsOpen(false);
                                setSelectedLead(null);
                            }}
                            lead={selectedLead}
                            onUpdate={() => {
                                fetchDarshanBookings();
                                setIsDetailsOpen(false);
                                setSelectedLead(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DarshanCRM;
