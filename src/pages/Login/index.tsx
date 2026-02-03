import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImage from "@/assets/hero-aarti.jpg"; // Using an existing asset for background

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { loginUser, signupUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = loginUser(email, password);
        if (success) {
            navigate("/my-trips");
        } else {
            alert("Invalid credentials. Please check your email and password.");
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        const success = signupUser(email, password, name);
        if (success) {
            navigate("/my-trips");
        } else {
            alert("Account creation failed. User may already exist.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <SEO title="Login" />
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>
            <Header />

            {/* Adjusted top padding to pt-40 to avoid header overlap */}
            <main className="flex-grow pt-40 container mx-auto px-4 flex items-center justify-center relative z-10 my-12">
                <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border-white/20">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-display font-bold text-primary">Namandarshan</CardTitle>
                        <CardDescription className="text-base">
                            Your gateway to divine journeys
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="devotee@example.com"
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
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                                        Sign In
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="devotee@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+91 93119 73199" className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            className="bg-white"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                                        Create Account
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-center text-sm text-muted-foreground pb-6">
                        By continuing, you agree to our Terms of Service
                    </CardFooter>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
