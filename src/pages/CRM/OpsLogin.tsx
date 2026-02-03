import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const OpsLogin = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Hardcoded generic credentials for Ops as requested
        // Username: admin, Password: password123
        // This simulates a separate "Ops User" auth
        try {
            if (userId === "admin" && password === "password123") {
                // Mock success
                const opsUser = {
                    userId: "ops_admin",
                    role: "admin",
                    name: "Ops Admin"
                };
                localStorage.setItem("opsUser", JSON.stringify(opsUser));

                toast({
                    title: "Login Successful",
                    description: "Welcome to Ops CRM!",
                });
                navigate("/ops/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: "Invalid credentials",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred during login.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
            <div className="w-full max-w-md px-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-6">
                        <div className="inline-block px-6 py-2 bg-blue-100 rounded-lg text-blue-800 text-sm font-medium mb-4">
                            Fulfilment Portal
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
                        OPS CRM
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                className="h-14 px-6 text-base border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-14 px-6 text-base border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {isLoading ? "LOGGING IN..." : "LOGIN"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OpsLogin;
