import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Pencil, RefreshCw, ArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { getApiUrl } from "@/utils/api";

const AdminPanel = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        userId: "",
        agentName: "",
        password: "",
        role: "agent",
        isActive: true,
    });

    useEffect(() => {
        // Check if user is master admin
        const crmUser = localStorage.getItem("crmUser");
        if (!crmUser) {
            navigate("/crm");
            return;
        }

        const user = JSON.parse(crmUser);
        if (user.role !== "master_admin") {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "You don't have permission to access this page",
            });
            navigate("/crm/dashboard");
            return;
        }

        fetchUsers();
    }, []);

    const getUserId = () => {
        const crmUser = localStorage.getItem("crmUser");
        if (!crmUser) return "";
        const user = JSON.parse(crmUser);
        return user.userId;
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const userId = getUserId();
            const response = await fetch(getApiUrl("/api/crm/users"), {
                headers: {
                    "x-user-id": userId,
                },
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to fetch users",
                });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch users",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateCredentials = async () => {
        try {
            const userId = getUserId();
            const response = await fetch(getApiUrl("/api/crm/users/generate-credentials"), {
                method: "POST",
                headers: {
                    "x-user-id": userId,
                },
            });
            const data = await response.json();

            if (data.success) {
                setFormData({
                    ...formData,
                    userId: data.credentials.userId,
                    password: data.credentials.password,
                });
                toast({
                    title: "Credentials Generated",
                    description: "User ID and password have been generated",
                });
            }
        } catch (error) {
            console.error("Error generating credentials:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to generate credentials",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = editingUser
                ? `/api/crm/users/${editingUser.userId}`
                : "/api/crm/users";
            const method = editingUser ? "PUT" : "POST";
            const currentUserId = getUserId();

            const response = await fetch(getApiUrl(url), {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": currentUserId,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: editingUser ? "User updated successfully" : "User created successfully",
                });
                setIsModalOpen(false);
                setEditingUser(null);
                setFormData({
                    userId: "",
                    agentName: "",
                    password: "",
                    role: "agent",
                    isActive: true,
                });
                fetchUsers();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to save user",
                });
            }
        } catch (error) {
            console.error("Error saving user:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save user",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            userId: user.userId,
            agentName: user.agentName,
            password: "", // Don't pre-fill password
            role: user.role,
            isActive: user.isActive,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const currentUserId = getUserId();
            const response = await fetch(getApiUrl(`/api/crm/users/${userId}`), {
                method: "DELETE",
                headers: {
                    "x-user-id": currentUserId,
                },
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: "User deleted successfully",
                });
                fetchUsers();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to delete user",
                });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete user",
            });
        }
    };

    const getRoleBadgeColor = (role: string) => {
        const colors: { [key: string]: string } = {
            master_admin: "bg-purple-600 text-white",
            admin: "bg-blue-600 text-white",
            agent: "bg-green-600 text-white",
            team: "bg-gray-600 text-white",
        };
        return colors[role] || "bg-gray-600 text-white";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/crm/dashboard">
                            <Button variant="ghost" className="text-white hover:bg-purple-700">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Admin Panel</h1>
                            <p className="text-purple-200">Manage CRM Users & Agents</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">CRM Users</h2>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={fetchUsers}
                                variant="outline"
                                size="sm"
                                disabled={isLoading}
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingUser(null);
                                    setFormData({
                                        userId: "",
                                        agentName: "",
                                        password: "",
                                        role: "agent",
                                        isActive: true,
                                    });
                                    setIsModalOpen(true);
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New User
                            </Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">User ID</TableHead>
                                <TableHead className="font-semibold">Agent Name</TableHead>
                                <TableHead className="font-semibold">Role</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Last Login</TableHead>
                                <TableHead className="font-semibold">Created At</TableHead>
                                <TableHead className="font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: any) => (
                                <TableRow key={user.userId}>
                                    <TableCell className="font-medium">{user.userId}</TableCell>
                                    <TableCell>{user.agentName}</TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                            {user.role.replace("_", " ").toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN") : "-"}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString("en-IN")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(user.userId)}
                                                disabled={user.role === "master_admin"}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {users.length === 0 && !isLoading && (
                        <div className="text-center py-12 text-gray-500">
                            No users found. Click "Add New User" to create one.
                        </div>
                    )}
                </div>
            </div>

            {/* User Form Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="userId">User ID *</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="userId"
                                    value={formData.userId}
                                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                    required
                                    disabled={!!editingUser}
                                />
                                {!editingUser && (
                                    <Button type="button" onClick={handleGenerateCredentials} variant="outline">
                                        Generate
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="agentName">Agent Name *</Label>
                            <Input
                                id="agentName"
                                value={formData.agentName}
                                onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="text"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editingUser}
                                placeholder={editingUser ? "Leave blank to keep current password" : ""}
                            />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="agent">Agent</SelectItem>
                                    <SelectItem value="team">Team</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="master_admin">Master Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="isActive" className="cursor-pointer">Active Account</Label>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : editingUser ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminPanel;
