import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-aarti.jpg";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = loginAdmin(email, password);
        if (success) {
            navigate("/admin");
        } else {
            alert("Invalid admin credentials. Please check your email and password.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <SEO title="Admin Login" />
            <div className="absolute inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
            </div>

            <main className="flex-grow container mx-auto px-4 flex items-center justify-center relative z-10 h-screen">
                <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border-white/20">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-display font-bold text-slate-800">Admin Portal</CardTitle>
                        <CardDescription className="text-base">
                            Restricted Access Only
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Admin Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-lg py-6">
                                Login to Console
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center text-sm text-muted-foreground pb-6">
                        Authorized Personnel Only
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
};

export default AdminLogin;
