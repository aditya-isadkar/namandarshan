import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Plus, Search } from "lucide-react";
import LeadFormModal from "./components/LeadFormModal";
import CRMSidebar from "./components/CRMSidebar";
import CRMHeader from "./components/CRMHeader";
import LeadDetailsModal from "./components/LeadDetailsModal";

import { useSidebar } from "@/hooks/useSidebar";

import { DateRangeFilter } from "./components/DateRangeFilter";
import { DateRange } from "react-day-picker";

const PrasadamCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [viewLead, setViewLead] = useState(null);
    const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useSidebar();

    // Auto-refresh state
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [countdown, setCountdown] = useState(30);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({ key: "createdAt", direction: "desc" });
    const [assignedToFilter, setAssignedToFilter] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    useEffect(() => {
        const crmUser = localStorage.getItem("crmUser");
        if (!crmUser) {
            navigate("/crm");
            return;
        }
        setUser(JSON.parse(crmUser));
    }, []);

    useEffect(() => {
        if (user) fetchLeads();
    }, [user, sortConfig]);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("type", "prasadam");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (assignedToFilter) params.append("assignedTo", assignedToFilter);
            if (dateRange?.from) params.append("dateFrom", dateRange.from.toISOString());
            if (dateRange?.to) params.append("dateTo", dateRange.to.toISOString());
            if (sortConfig) {
                params.append("sort", `${sortConfig.direction === "desc" ? "-" : ""}${sortConfig.key}`);
            }

            const response = await fetch(getApiUrl(`/api/orders?${params}`), {
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": user.userId || user.id || user._id
                }
            });
            const data = await response.json();

            if (data.success) {
                setLeads(data.data);
            } else {
                console.error("Fetch failed:", data);
                // Fallback to empty if success is false but no error thrown
                setLeads([]);
            }
        } catch (error) {
            console.error("Error fetching leads:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch prasadam orders" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("crmUser");
        navigate("/crm");
    };

    const getStatusColor = (status: string) => {
        const colors: any = {
            pending: "bg-blue-100 text-blue-800",
            confirmed: "bg-yellow-100 text-yellow-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800"
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const handleSort = (key: string) => {
        setSortConfig((current) => {
            if (current?.key === key) {
                return { key, direction: current.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "desc" };
        });
    };

    const renderSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {user && (
                <CRMSidebar
                    user={user}
                    onLogout={handleLogout}
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                />
            )}

            <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"}`}>
                <CRMHeader toggleSidebar={toggleSidebar} user={user} />
                <div className="bg-gradient-to-r from-lime-600 to-lime-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">🍜 Prasadam CRM</h1>
                        <p className="text-lime-100">Manage prasadam orders and deliveries</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search by name, mobile, temple..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Assigned To..."
                                value={assignedToFilter}
                                onChange={(e) => setAssignedToFilter(e.target.value)}
                                className="bg-white"
                            />
                            <DateRangeFilter date={dateRange} setDate={setDateRange} className="bg-white" />
                            <Button onClick={fetchLeads} disabled={isLoading} className="bg-lime-600 hover:bg-lime-700">
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                {isLoading ? "Loading..." : "Search"}
                            </Button>
                            <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Prasadam
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => handleSort("_id")} className="cursor-pointer hover:bg-gray-100">ID{renderSortIcon("_id")}</TableHead>
                                    <TableHead onClick={() => handleSort("createdAt")} className="cursor-pointer hover:bg-gray-100">CREATED AT{renderSortIcon("createdAt")}</TableHead>
                                    <TableHead onClick={() => handleSort("userDetails.name")} className="cursor-pointer hover:bg-gray-100">Name{renderSortIcon("userDetails.name")}</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead onClick={() => handleSort("prasadamTitle")} className="cursor-pointer hover:bg-gray-100">Prasadam{renderSortIcon("prasadamTitle")}</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead onClick={() => handleSort("totalAmount")} className="cursor-pointer hover:bg-gray-100">Amount{renderSortIcon("totalAmount")}</TableHead>
                                    <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-100">Status{renderSortIcon("status")}</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                                            No prasadam orders found. Click "Add Prasadam" to create one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map((lead: any) => (
                                        <TableRow key={lead._id}>
                                            <TableCell className="font-mono text-sm">{lead._id?.substring(0, 8)}...</TableCell>
                                            <TableCell className="text-xs text-gray-500">
                                                {lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-IN") : "-"}
                                            </TableCell>
                                            <TableCell className="font-medium">{lead.userDetails?.name || "N/A"}</TableCell>
                                            <TableCell>{lead.userDetails?.mobile || lead.userDetails?.whatsapp || "N/A"}</TableCell>
                                            <TableCell>{lead.prasadamTitle || "N/A"}</TableCell>
                                            <TableCell>{lead.quantity || "1"}</TableCell>
                                            <TableCell className="font-semibold">₹{lead.totalAmount || 0}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                    {(lead.status || 'pending').toUpperCase()}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setViewLead(lead);
                                                            setIsDetailsOpen(true);
                                                        }}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-purple-600 hover:text-purple-700"
                                                    >
                                                        👁️ View
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedLead(lead);
                                                            setIsFormOpen(true);
                                                        }}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {isFormOpen && (
                        <LeadFormModal
                            isOpen={isFormOpen}
                            onClose={() => {
                                setIsFormOpen(false);
                                setSelectedLead(null);
                            }}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                setSelectedLead(null);
                                fetchLeads();
                            }}
                            lead={selectedLead}
                            serviceType="prasadam"
                            title="Prasadam Order"
                            serviceOptions={["Tirupati Laddu", "Temple Modak", "Panchamrit", "Kheer Prasad", "Mixed Prasadam", "Festival Special", "Custom Prasadam"]}
                        />
                    )}

                    {/* Lead Details Modal */}
                    {isDetailsOpen && viewLead && (
                        <LeadDetailsModal
                            isOpen={isDetailsOpen}
                            onClose={() => {
                                setIsDetailsOpen(false);
                                setViewLead(null);
                            }}
                            lead={viewLead}
                            onUpdate={() => {
                                fetchLeads();
                                setIsDetailsOpen(false);
                                setViewLead(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrasadamCRM;
