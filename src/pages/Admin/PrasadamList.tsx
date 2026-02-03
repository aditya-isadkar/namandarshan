import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const PrasadamList = () => {
    const [prasadams, setPrasadams] = useState([]);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPrasadams();
    }, []);

    const fetchPrasadams = async () => {
        try {
            const res = await fetch(getApiUrl("/api/prasadams"));
            const data = await res.json();
            setPrasadams(data);
        } catch (error) {
            console.error("Error fetching prasadams:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this prasadam?")) return;

        try {
            await fetch(getApiUrl(`/api/prasadams/${id}`), { method: "DELETE" });
            toast({ title: "Prasadam deleted" });
            fetchPrasadams();
        } catch (error) {
            toast({ title: "Error deleting prasadam", variant: "destructive" });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate("/admin")}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <div className="flex-1 flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-display">Manage Prasadam</h1>
                    <Link to="/admin/prasadam/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Add Prasadam
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Details</TableHead>
                            <TableHead>Temple</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prasadams.map((prasadam: any) => (
                            <TableRow key={prasadam.id}>
                                <TableCell className="flex gap-4 items-center">
                                    <img
                                        src={prasadam.image}
                                        alt={prasadam.title}
                                        className="w-12 h-12 rounded object-cover bg-gray-100"
                                    />
                                    <div>
                                        <div className="font-bold">{prasadam.title}</div>
                                        <div className="text-sm text-muted-foreground w-64 truncate">{prasadam.description}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{prasadam.templeName}</TableCell>
                                <TableCell>{prasadam.location}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/prasadam/edit/${prasadam.id}`}>
                                            <Button variant="outline" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(prasadam.id)}
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
        </div>
    );
};

export default PrasadamList;
