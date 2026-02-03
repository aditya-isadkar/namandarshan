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

const InquiryCRM = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
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
            params.append("type", "yatra");
            if (searchTerm) params.append("search", searchTerm);
            if (searchTerm) params.append("search", searchTerm);
            if (categoryFilter !== "all") params.append("category", categoryFilter);

            const response = await fetch(getApiUrl(`/api/crm/bookings?${params}`));
            const data = await response.json();
            if (data.success) setInquiries(data.data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch inquiries" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { if (user) fetchData(); }, [user]);

    const getPriorityColor = (priority: string) => {
        const colors: any = { low: "bg-gray-100 text-gray-800", medium: "bg-blue-100 text-blue-800", high: "bg-orange-100 text-orange-800", urgent: "bg-red-100 text-red-800" };
        return colors[priority] || colors.medium;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {user && <CRMSidebar user={user} onLogout={handleLogout} />}

            <div className="lg:pl-64">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-6">
                    <div>
                        <h1 className="text-3xl font-bold">💬 Inquiry CRM</h1>
                        <p className="text-teal-100">Manage general inquiries and questions</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="pricing">Pricing</SelectItem>
                                    <SelectItem value="availability">Availability</SelectItem>
                                    <SelectItem value="support">Support</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={fetchData} className="bg-teal-600 hover:bg-teal-700"><Search className="w-4 h-4 mr-2" />Filter</Button>
                            <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700"><Plus className="w-4 h-4 mr-2" />Add Inquiry</Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {inquiries.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-500 text-lg">No inquiries found</p>
                                <p className="text-gray-400 text-sm mt-2">Click "Add Inquiry" to create one</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead>ID</TableHead>
                                        <TableHead>NAME</TableHead>
                                        <TableHead>MOBILE</TableHead>
                                        <TableHead>CATEGORY</TableHead>
                                        <TableHead>PRIORITY</TableHead>
                                        <TableHead>STATUS</TableHead>
                                        <TableHead>ASSIGNED TO</TableHead>
                                        <TableHead>CREATED</TableHead>
                                        <TableHead>ACTIONS</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inquiries.map((item: any) => (
                                        <TableRow key={item.leadId} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedItem(item); setIsFormOpen(true); }}>
                                            <TableCell className="font-medium">{item.leadId}</TableCell>
                                            <TableCell>{item.leadInformation?.name || "-"}</TableCell>
                                            <TableCell>📱 {item.contactDetails?.mobile || "-"}</TableCell>
                                            <TableCell>{item.templeAndDate?.serviceType || "General"}</TableCell>
                                            <TableCell>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.notes?.priority || "medium")}`}>
                                                    {(item.notes?.priority || "medium").toUpperCase()}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {(item.currentStage || "pending").toUpperCase()}
                                                </span>
                                            </TableCell>
                                            <TableCell>{item.assignedTo || "Unassigned"}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{new Date(item.createdAt || Date.now()).toLocaleString("en-IN")}</TableCell>
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
                            serviceType="inquiry"
                            title="General Inquiry"
                            serviceOptions={["General Question", "Pricing Inquiry", "Availability Check", "Technical Support", "Booking Assistance"]}
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

export default InquiryCRM;
