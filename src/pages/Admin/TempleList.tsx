import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const TempleList = () => {
    const [temples, setTemples] = useState([]);
    const { toast } = useToast();
    const { logoutAdmin } = useAuth();

    useEffect(() => {
        fetchTemples();
    }, []);

    const fetchTemples = async () => {
        try {
            const res = await fetch(getApiUrl("/api/temples"));
            const data = await res.json();
            setTemples(data);
        } catch (error) {
            console.error("Error fetching temples:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this temple?")) return;

        try {
            await fetch(getApiUrl(`/api/temples/${id}`), { method: "DELETE" });
            toast({ title: "Temple deleted" });
            fetchTemples();
        } catch (error) {
            toast({ title: "Error deleting temple", variant: "destructive" });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-display">Manage Temples</h1>
                <div className="flex gap-2">
                    {/* Seed button removed */}
                    <Link to="/admin/darshan">
                        <Button variant="outline">
                            Manage Darshan
                        </Button>
                    </Link>
                    <Link to="/admin/prasadam">
                        <Button variant="outline">
                            Manage Prasadam
                        </Button>
                    </Link>
                    <Link to="/admin/chadhava">
                        <Button variant="outline">
                            Manage Chadhava
                        </Button>
                    </Link>
                    <Link to="/admin/temples/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Add Temple
                        </Button>
                    </Link>
                    <Button variant="destructive" onClick={() => { logoutAdmin(); window.location.href = '/admin/login'; }}>
                        Logout
                    </Button>
                </div>
            </div >

            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Details</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {temples.map((temple: any) => (
                            <TableRow key={temple.id}>
                                <TableCell className="flex gap-4 items-center">
                                    <img
                                        src={temple.image}
                                        alt={temple.name}
                                        className="w-12 h-12 rounded object-cover bg-gray-100"
                                    />
                                    <div>
                                        <div className="font-bold">{temple.name}</div>
                                        <div className="text-sm text-muted-foreground w-64 truncate">{temple.description}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{temple.location}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/temples/edit/${temple.id}`}>
                                            <Button variant="outline" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(temple.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
};

export default TempleList;
