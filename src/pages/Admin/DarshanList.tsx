import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";
import { Plus, Pencil, Trash2, Search, Eye, ArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const DarshanList = () => {
    const [darshans, setDarshans] = useState([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchDarshans();
    }, []);

    const fetchDarshans = async () => {
        try {
            const res = await fetch(getApiUrl("/api/darshan"));
            const data = await res.json();
            setDarshans(data);
        } catch (error) {
            console.error("Error fetching darshan data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        try {
            const res = await fetch(getApiUrl(`/api/darshan/${id}`), { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");

            toast({ title: "Darshan entry deleted" });
            fetchDarshans(); // Refresh list
        } catch (error) {
            toast({ title: "Error deleting entry", variant: "destructive" });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                <Link to="/admin">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-orange-600">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-display">Manage Darshan Page</h1>
                <Link to="/admin/darshan/new">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="w-4 h-4 mr-2" /> Add Darshan
                    </Button>
                </Link>
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
                        {darshans.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                    No entries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            darshans.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex gap-4 items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded object-cover bg-gray-100 border border-gray-200"
                                        />
                                        <div>
                                            <div className="font-bold text-gray-900">{item.name}</div>
                                            <div className="text-sm text-muted-foreground w-64 truncate">{item.description}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/darshan/edit/${item.id}`}>
                                                <Button variant="outline" size="icon">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            {/* Delete might not be fully supported in backend yet but good to have UI */}
                                            {/* Actually I didn't implement DELETE in darshan.js yet! I should probably check that. */}
                                            {/* Wait, the user didn't explicitly ask for delete, but "update data". I'll keep it but it might fail if backend route missing. */}
                                            {/* Checking darshan.js content from previous steps... I only implemented GET /, GET /:id. I missed POST, PUT, DELETE for darshan.js! */}
                                            {/* I need to update darshan.js to support full CRUD. Adding that task to next step. */}
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
};

export default DarshanList;
