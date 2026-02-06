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

const PujaCRM = () => {
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

    // Keep selected lead in sync with fetched leads
    useEffect(() => {
        if (selectedLead) {
            const updated = leads.find((l: any) => l._id === selectedLead._id || l.leadId === selectedLead.leadId);
            if (updated) setSelectedLead(updated);
        }
        if (viewLead) {
            const updated = leads.find((l: any) => l._id === viewLead._id || l.leadId === viewLead.leadId);
            if (updated) setViewLead(updated);
        }
    }, [leads]);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("type", "puja");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (assignedToFilter) params.append("assignedTo", assignedToFilter);
            if (dateRange?.from) params.append("dateFrom", dateRange.from.toISOString());
            if (dateRange?.to) params.append("dateTo", dateRange.to.toISOString());
            if (sortConfig) {
                params.append("sort", `${sortConfig.direction === "desc" ? "-" : ""}${sortConfig.key}`);
            }

            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();
            if (data.success) setLeads(data.data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch puja bookings" });
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
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            "follow-up": "bg-purple-100 text-purple-800",
            converted: "bg-green-100 text-green-800",
            lost: "bg-red-100 text-red-800"
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
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">🔔 Puja CRM</h1>
                        <p className="text-amber-100">Manage puja services and bookings</p>
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
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="follow-up">Follow-up</SelectItem>
                                    <SelectItem value="converted">Converted</SelectItem>
                                    <SelectItem value="lost">Lost</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Assigned To..."
                                value={assignedToFilter}
                                onChange={(e) => setAssignedToFilter(e.target.value)}
                                className="bg-white"
                            />
                            <DateRangeFilter date={dateRange} setDate={setDateRange} className="bg-white" />
                            <Button onClick={fetchLeads} disabled={isLoading} className="bg-amber-600 hover:bg-amber-700">
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                {isLoading ? "Loading..." : "Search"}
                            </Button>
                            <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Puja
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => handleSort("leadId")} className="cursor-pointer hover:bg-gray-100">ID{renderSortIcon("leadId")}</TableHead>
                                    <TableHead onClick={() => handleSort("createdAt")} className="cursor-pointer hover:bg-gray-100">CREATED AT{renderSortIcon("createdAt")}</TableHead>
                                    <TableHead onClick={() => handleSort("userDetails.name")} className="cursor-pointer hover:bg-gray-100">Name{renderSortIcon("userDetails.name")}</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead onClick={() => handleSort("serviceName")} className="cursor-pointer hover:bg-gray-100">Temple{renderSortIcon("serviceName")}</TableHead>
                                    <TableHead onClick={() => handleSort("bookingDetails.darshanType")} className="cursor-pointer hover:bg-gray-100">Puja Type{renderSortIcon("bookingDetails.darshanType")}</TableHead>
                                    <TableHead onClick={() => handleSort("bookingDetails.date")} className="cursor-pointer hover:bg-gray-100">Date{renderSortIcon("bookingDetails.date")}</TableHead>
                                    <TableHead onClick={() => handleSort("bookingDetails.amount")} className="cursor-pointer hover:bg-gray-100">Amount{renderSortIcon("bookingDetails.amount")}</TableHead>
                                    <TableHead onClick={() => handleSort("nextAction.actionDate")} className="cursor-pointer hover:bg-gray-100">Next Action{renderSortIcon("nextAction.actionDate")}</TableHead>
                                    <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-100">Status{renderSortIcon("status")}</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                                            No puja bookings found. Click "Add Puja" to create one.
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
                                            <TableCell>{lead.serviceName || "N/A"}</TableCell>
                                            <TableCell>{lead.bookingDetails?.darshanType || lead.type || "General Puja"}</TableCell>
                                            <TableCell>{lead.bookingDetails?.date ? new Date(lead.bookingDetails.date).toLocaleDateString('en-IN') : (lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : "N/A")}</TableCell>
                                            <TableCell className="font-semibold">₹{lead.bookingDetails?.amount || 0}</TableCell>
                                            <TableCell>
                                                {lead.nextAction?.actionDate ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium text-blue-600">{new Date(lead.nextAction.actionDate).toLocaleDateString('en-IN')}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{lead.nextAction.actionType?.replace('-', ' ')}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </TableCell>
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
                            serviceType="puja"
                            title="Puja Booking"
                            serviceOptions={["Satyanarayan Puja", "Ganesh Puja", "Lakshmi Puja", "Durga Puja", "Saraswati Puja", "Hanuman Puja", "Shiva Puja", "Special Occasion Puja"]}
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

export default PujaCRM;
