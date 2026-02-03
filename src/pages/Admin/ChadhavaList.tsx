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

const ChadhavaList = () => {
    const [chadhavas, setChadhavas] = useState([]);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchChadhavas();
    }, []);

    const fetchChadhavas = async () => {
        try {
            const res = await fetch(getApiUrl("/api/chadhava"));
            const data = await res.json();
            setChadhavas(data);
        } catch (error) {
            console.error("Error fetching chadhava:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this chadhava?")) return;

        try {
            await fetch(getApiUrl(`/api/chadhava/${id}`), { method: "DELETE" });
            toast({ title: "Chadhava deleted" });
            fetchChadhavas();
        } catch (error) {
            toast({ title: "Error deleting chadhava", variant: "destructive" });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate("/admin")}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <div className="flex-1 flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-display">Manage Chadhava</h1>
                    <Link to="/admin/chadhava/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Add Chadhava
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
                            <TableHead>Tag</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chadhavas.map((chadhava: any) => (
                            <TableRow key={chadhava.id}>
                                <TableCell className="flex gap-4 items-center">
                                    <img
                                        src={chadhava.image}
                                        alt={chadhava.name}
                                        className="w-12 h-12 rounded object-cover bg-gray-100"
                                    />
                                    <div>
                                        <div className="font-bold">{chadhava.name}</div>
                                        <div className="text-sm text-muted-foreground w-64 truncate">{chadhava.description}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{chadhava.templeName}</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold">
                                        {chadhava.tag}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/chadhava/edit/${chadhava.id}`}>
                                            <Button variant="outline" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(chadhava.id)}
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

export default ChadhavaList;
