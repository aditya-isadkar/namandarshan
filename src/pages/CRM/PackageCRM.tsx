import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import PackageTable from "./components/PackageTable";
import PackageFormModal from "./components/PackageFormModal";
import CRMSidebar from "./components/CRMSidebar";
import LeadDetailsModal from "./components/LeadDetailsModal";
import { useNavigate } from "react-router-dom";

const PackageCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [countdown, setCountdown] = useState(30);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [viewLead, setViewLead] = useState(null);

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

    const fetchPackages = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("type", "package");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);

            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();

            if (data.success) {
                setPackages(data.data);
            }
        } catch (error) {
            console.error("Error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch package bookings",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { if (user) fetchPackages(); }, [user]);

    useEffect(() => {
        if (!autoRefresh) return;
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    fetchPackages();
                    return refreshInterval;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [autoRefresh, refreshInterval]);

    const handleExportCSV = () => {
        const csvData = packages.map((pkg) => ({
            "Booking ID": pkg.leadId,
            Name: pkg.leadInformation?.name || "",
            Mobile: pkg.contactDetails?.mobile || "",
            Package: pkg.templeAndDate?.temple || pkg.templeAndDate?.serviceType || "",
            "Travel Date": pkg.templeAndDate?.preferredDate || "",
            Travelers: pkg.notes?.travelers || "1",
            Status: pkg.currentStage,
            "Assigned To": pkg.assignedTo || "",
        }));

        const headers = Object.keys(csvData[0] || {});
        const csv = [headers.join(","), ...csvData.map((r) => headers.map((h) => r[h]).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `package-bookings-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {user && <CRMSidebar user={user} onLogout={handleLogout} />}

            <div className="lg:pl-64">
                <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">🌄 Package CRM</h1>
                        <p className="text-green-100">Manage yatra package bookings</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name, mobile, package..."
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
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button onClick={fetchPackages} className="bg-green-600 hover:bg-green-700">
                                <Search className="w-4 h-4 mr-2" />
                                Filter
                            </Button>

                            <div className="flex gap-2">
                                <Button onClick={handleExportCSV} variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export CSV
                                </Button>
                                <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Booking
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
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
                            <Button onClick={fetchPackages} disabled={isLoading} variant="outline" size="sm">
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <PackageTable
                        packages={packages}
                        onRefresh={fetchPackages}
                        onView={(pkg) => {
                            setViewLead(pkg);
                            setIsDetailsOpen(true);
                        }}
                        onEdit={(pkg) => {
                            setSelectedPackage(pkg);
                            setIsFormOpen(true);
                        }}
                    />

                    {isFormOpen && (
                        <PackageFormModal
                            isOpen={isFormOpen}
                            onClose={() => {
                                setIsFormOpen(false);
                                setSelectedPackage(null);
                            }}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                setSelectedPackage(null);
                                fetchPackages();
                            }}
                            package={selectedPackage}
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
                                fetchPackages();
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

export default PackageCRM;
