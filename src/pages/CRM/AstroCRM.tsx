import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Download, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LeadFormModal from "./components/LeadFormModal";
import CRMSidebar from "./components/CRMSidebar";
import LeadDetailsModal from "./components/LeadDetailsModal";
import { useNavigate } from "react-router-dom";

const AstroCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [consultations, setConsultations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [countdown, setCountdown] = useState(30);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

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

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("type", "astro");
            if (searchTerm) params.append("search", searchTerm);
            if (statusFilter !== "all") params.append("status", statusFilter);
            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();
            if (data.success) {
                setConsultations(data.data);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to fetch leads",
                });
            }
        } catch (error) {
            console.error("Error fetching leads:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch leads" });
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

    return (
        <div className="min-h-screen bg-gray-50">
            {user && <CRMSidebar user={user} onLogout={handleLogout} />}

            <div className="lg:pl-64">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">⭐ Astro CRM</h1>
                        <p className="text-purple-100">Manage astrology consultations</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={fetchData} className="bg-purple-600 hover:bg-purple-700"><Search className="w-4 h-4 mr-2" />Filter</Button>
                            <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700"><Plus className="w-4 h-4 mr-2" />Add Consultation</Button>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={autoRefresh} onChange={(e) => { setAutoRefresh(e.target.checked); if (e.target.checked) setCountdown(refreshInterval); }} className="w-4 h-4" />
                                    <span className="text-sm font-medium">Auto-refresh</span>
                                </label>
                                <Select value={refreshInterval.toString()} onValueChange={(val) => { setRefreshInterval(parseInt(val)); setCountdown(parseInt(val)); }} disabled={!autoRefresh}>
                                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                                    <SelectContent><SelectItem value="15">15s</SelectItem><SelectItem value="30">30s</SelectItem><SelectItem value="60">60s</SelectItem></SelectContent>
                                </Select>
                                {autoRefresh && <span className="text-sm text-gray-600">Next refresh in {countdown}s</span>}
                            </div>
                            <Button onClick={fetchData} disabled={isLoading} variant="outline" size="sm">
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />Refresh
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {consultations.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-500 text-lg">No consultations found</p>
                                <p className="text-gray-400 text-sm mt-2">Click "Add Consultation" to create one</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead>ID</TableHead>
                                        <TableHead>CREATED AT</TableHead>
                                        <TableHead>CLIENT NAME</TableHead>
                                        <TableHead>MOBILE</TableHead>
                                        <TableHead>CONSULTATION TYPE</TableHead>
                                        <TableHead>SCHEDULED DATE</TableHead>
                                        <TableHead>NEXT ACTION</TableHead>
                                        <TableHead>STATUS</TableHead>
                                        <TableHead>CONSULTANT</TableHead>
                                        <TableHead>ACTIONS</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {consultations.map((item: any) => (
                                        <TableRow key={item._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedItem(item); setIsFormOpen(true); }}>
                                            <TableCell className="font-medium">{item._id?.substring(0, 8)}...</TableCell>
                                            <TableCell className="text-xs text-gray-500">
                                                {item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "-"}
                                            </TableCell>
                                            <TableCell>{item.userDetails?.name || "-"}</TableCell>
                                            <TableCell>📱 {item.userDetails?.whatsapp || item.userDetails?.mobile || "-"}</TableCell>
                                            <TableCell>{item.serviceName || "Astro Consultation"}</TableCell>
                                            <TableCell>{item.bookingDetails?.date ? new Date(item.bookingDetails.date).toLocaleDateString("en-IN") : (item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "-")}</TableCell>
                                            <TableCell>
                                                {item.nextAction?.actionDate ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium text-blue-600">{new Date(item.nextAction.actionDate).toLocaleDateString("en-IN")}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{item.nextAction.actionType?.replace('-', ' ')}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-800' : item.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {(item.status || 'pending').toUpperCase()}
                                                </span>
                                            </TableCell>
                                            <TableCell>Unassigned</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedLead(item);
                                                        setIsDetailsOpen(true);
                                                    }}
                                                    className="text-purple-600 hover:text-purple-700"
                                                >
                                                    👁️ View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    {isFormOpen && (
                        <LeadFormModal
                            isOpen={isFormOpen}
                            onClose={() => { setIsFormOpen(false); setSelectedItem(null); }}
                            onSuccess={() => { setIsFormOpen(false); setSelectedItem(null); fetchData(); }}
                            lead={selectedItem}
                            serviceType="astro"
                            title="Astrology Consultation"
                            serviceOptions={["Horoscope Reading", "Kundli Matching", "Muhurat Selection", "Vastu Consultation", "Gemstone Recommendation"]}
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
                                fetchData();
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

export default AstroCRM;
