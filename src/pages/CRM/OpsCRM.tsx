import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Plus, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import OpsTable from "./components/OpsTable";
import OpsFormModal from "./components/OpsFormModal";
import CSVImportModal from "./components/CSVImportModal";
import OpsSidebar from "./components/OpsSidebar";
import LeadDetailsModal from "./components/LeadDetailsModal";
import { useNavigate } from "react-router-dom";

const OpsCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [fulfillments, setFulfillments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [countdown, setCountdown] = useState(30);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [viewLead, setViewLead] = useState(null);

    useEffect(() => {
        const opsUser = localStorage.getItem("opsUser");
        if (!opsUser) {
            navigate("/ops/login");
            return;
        }
        setUser(JSON.parse(opsUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("opsUser");
        navigate("/ops/login");
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            // OPS shows all converted/won bookings regardless of type
            if (statusFilter !== "all") {
                params.append("status", statusFilter);
            } else {
                // Default to showing converted/won and completed statuses for ops
                params.append("status", "converted/won");
            }
            if (searchTerm) params.append("search", searchTerm);

            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();
            if (data.success) setFulfillments(data.data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch fulfilment data" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { if (user) fetchData(); }, [user]);

    useEffect(() => {
        if (!autoRefresh) return;
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    fetchData();
                    return refreshInterval;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [autoRefresh, refreshInterval]);

    const handleFilter = () => {
        fetchData();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {user && <OpsSidebar user={user} onLogout={handleLogout} />}

            <div className="lg:pl-64">
                {/* Header */}
                <div className="bg-white border-b p-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">⚙ Ops / Fulfilment CRM</h1>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <Input
                                    placeholder="Search ID, Email, Pandit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-md"
                                />
                            </div>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="converted/won">Converted/Won</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Search Button */}
                            <Button onClick={handleFilter} className="bg-orange-500 hover:bg-orange-600">
                                Search
                            </Button>

                            {/* Import CSV */}
                            <Button onClick={() => setIsImportOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                                <Upload className="w-4 h-4 mr-2" />
                                Import CSV
                            </Button>

                            {/* Manual Add */}
                            <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Manual Add
                            </Button>
                        </div>

                        {/* Auto-refresh Controls */}
                        <div className="flex items-center justify-between border-t pt-4 mt-4">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
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
                                        setRefreshInterval(parseInt(val));
                                        setCountdown(parseInt(val));
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
                                {autoRefresh && <span className="text-sm text-gray-600">Next refresh in {countdown}s</span>}
                            </div>
                            <Button onClick={fetchData} disabled={isLoading} variant="outline" size="sm">
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <OpsTable
                        data={fulfillments}
                        onRefresh={fetchData}
                        onView={(item) => {
                            setViewLead(item);
                            setIsDetailsOpen(true);
                        }}
                        onEdit={(item) => {
                            setSelectedItem(item);
                            setIsFormOpen(true);
                        }}
                    />

                    {/* Form Modal */}
                    {isFormOpen && (
                        <OpsFormModal
                            isOpen={isFormOpen}
                            onClose={() => {
                                setIsFormOpen(false);
                                setSelectedItem(null);
                            }}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                setSelectedItem(null);
                                fetchData();
                            }}
                            item={selectedItem}
                        />
                    )}

                    {/* CSV Import Modal */}
                    {isImportOpen && (
                        <CSVImportModal
                            isOpen={isImportOpen}
                            onClose={() => setIsImportOpen(false)}
                            onSuccess={() => {
                                setIsImportOpen(false);
                                fetchData();
                            }}
                            serviceType="ops"
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
                                fetchData();
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

export default OpsCRM;
