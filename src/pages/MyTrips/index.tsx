import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Star, ShoppingBag, LogOut, Flower, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "@/utils/api";

const MyTrips = () => {
    const { user, logoutUser, isUserAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) return; // Wait for auth check to complete

        if (!isUserAuthenticated) {
            navigate("/login");
            return;
        }

        if (user?.email) {
            // Use encodeURIComponent to handle special characters in email
            fetch(getApiUrl(`/api/bookings/user/${encodeURIComponent(user.email)}`))
                .then(res => res.json())
                .then(data => {
                    setBookings(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch bookings:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isUserAuthenticated, user, navigate, isLoading]);

    const getIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'darshan': return MapPin;
            case 'puja': return Star;
            case 'prasadam': return ShoppingBag;
            case 'chadhava': return Flower;
            case 'package':
            case 'yatra': return Calendar;
            default: return Star;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Date pending";
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!isUserAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <SEO title="My Trips" />
            <Header />
            <main className="flex-grow pt-28 container mx-auto px-4 pb-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-primary">My Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user?.name || "Devotee"}!</p>
                    </div>
                    <Button variant="outline" onClick={() => { logoutUser(); navigate("/"); }} className="gap-2 text-destructive hover:text-destructive">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                            <Calendar className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bookings.length}</div>
                            <p className="text-xs text-muted-foreground">Lifetime</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Darshans / Pujas</CardTitle>
                            <MapPin className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.filter(b => ['darshan', 'puja'].includes(b.type?.toLowerCase())).length}
                            </div>
                            <p className="text-xs text-muted-foreground">Spiritual Activities</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Offerings</CardTitle>
                            <ShoppingBag className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.filter(b => ['prasadam', 'chadhava'].includes(b.type?.toLowerCase())).length}
                            </div>
                            <p className="text-xs text-muted-foreground">Prasadam & Chadhava</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-6">Recent Activities</h2>

                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : bookings.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.map((booking) => {
                                const Icon = getIcon(booking.type);
                                return (
                                    <div key={booking._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{booking.serviceName || booking.title || booking.type}</h3>
                                                <p className="text-sm text-muted-foreground capitalize">
                                                    {booking.type} • {formatDate(booking.createdAt || booking.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${booking.status === "confirmed" || booking.status === "completed" ? "bg-green-100 text-green-800" :
                                                booking.status === "pending" || booking.status === "new lead" ? "bg-amber-100 text-amber-800" :
                                                    "bg-slate-100 text-slate-800"
                                                }`}>
                                                {booking.status === "new lead" ? "Pending" : booking.status || "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No bookings found yet.</p>
                            <Button
                                variant="link"
                                className="mt-2 text-primary"
                                onClick={() => navigate('/temples')}
                            >
                                Explore Temples
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyTrips;
