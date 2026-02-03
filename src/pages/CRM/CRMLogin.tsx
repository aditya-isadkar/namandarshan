import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { getApiUrl } from "@/utils/api";

const CRMLogin = () => {
    const [userId, setUserId] = useState("");
    const [agentName, setAgentName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(getApiUrl("/api/crm/auth/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    agentName,
                    password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store user data in localStorage
                localStorage.setItem("crmUser", JSON.stringify(data.user));

                toast({
                    title: "Login Successful",
                    description: `Welcome, ${data.user.agentName}!`,
                });

                navigate("/crm/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: data.message || "Invalid credentials",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred during login. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <div className="w-full max-w-md px-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Logo Placeholder */}
                    <div className="text-center mb-6">
                        <div className="inline-block px-6 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium mb-4">
                            Naman Logo
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
                        TITAN CRM
                    </h1>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="User ID (amardeep / atharv / team)"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                className="h-14 px-6 text-base border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                placeholder="Agent Name (For Team)"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                className="h-14 px-6 text-base border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-14 px-6 text-base border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {isLoading ? "ACCESSING..." : "ACCESS PORTAL"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CRMLogin;
