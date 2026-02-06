import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from "@/utils/api";
import CRMHeader from "./components/CRMHeader";

const BlastMail = () => {
    const { toast } = useToast();
    const [isSending, setIsSending] = useState(false);
    const [stats, setStats] = useState({ total: 0, withEmail: 0 });
    const [testEmail, setTestEmail] = useState("");
    const [isTestSending, setIsTestSending] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        recipientType: "all",
        serviceType: "all",
        stage: "all",
        message: "",
    });

    // Fetch counts when filters change
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await fetch(getApiUrl('/api/crm/campaigns/count'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.success) {
                    setStats({ total: data.total, withEmail: data.withEmail });
                }
            } catch (error) {
                console.error("Failed to fetch counts:", error);
            }
        };

        // Debounce to prevent too many calls
        const timer = setTimeout(fetchCounts, 500);
        return () => clearTimeout(timer);
    }, [formData.recipientType, formData.serviceType, formData.stage]);

    const handleSendTest = async () => {
        if (!testEmail || !formData.subject || !formData.message) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please provide a test email, subject, and message.",
            });
            return;
        }

        setIsTestSending(true);
        try {
            const response = await fetch(getApiUrl('/api/crm/campaigns/test'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: testEmail,
                    subject: formData.subject,
                    message: formData.message
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Server Error: ${response.status} ${response.statusText}`);
            }

            if (data.success) {
                toast({ title: "Test Email Sent", description: `Sent to ${testEmail}` });
            } else {
                throw new Error(data.message || "Unknown server error");
            }
        } catch (error: any) {
            console.error("Test Email functionality error:", error);
            toast({
                variant: "destructive",
                title: "Error Sending Test",
                description: error.message || "Failed to send test email (Check console)",
            });
        } finally {
            setIsTestSending(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch(getApiUrl('/api/crm/campaigns/send'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Campaign Sent!",
                    description: `Successfully processed ${data.stats.sent} emails.`,
                });

                setFormData({
                    subject: "",
                    recipientType: "all",
                    serviceType: "all",
                    stage: "all",
                    message: "",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error Sending Campaign",
                description: error.message || "Failed to send email campaign",
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <CRMHeader />
            <div className="p-6">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-6 rounded-lg mb-6 shadow-md">
                    <div className="flex items-center gap-4">
                        <Link to="/crm/dashboard">
                            <Button variant="ghost" className="text-white hover:bg-indigo-700">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">📧 Blast Mail</h1>
                            <p className="text-indigo-100">Send email campaigns to customers</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Campaign Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-6">Create Email Campaign</h2>

                            <form onSubmit={handleSend} className="space-y-6">
                                {/* Subject */}
                                <div>
                                    <Label htmlFor="subject">Email Subject *</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Enter email subject..."
                                        required
                                    />
                                </div>

                                {/* Recipient Selection */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm">Recipient Selection</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Recipient Type</Label>
                                            <Select value={formData.recipientType} onValueChange={(val) => setFormData({ ...formData, recipientType: val })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Customers</SelectItem>
                                                    <SelectItem value="serviceType">By Service Type</SelectItem>
                                                    <SelectItem value="stage">By Stage</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {formData.recipientType === "serviceType" && (
                                            <div>
                                                <Label>Service Type</Label>
                                                <Select value={formData.serviceType} onValueChange={(val) => setFormData({ ...formData, serviceType: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Services</SelectItem>
                                                        <SelectItem value="darshan">Darshan</SelectItem>
                                                        <SelectItem value="astro">Astrology</SelectItem>
                                                        <SelectItem value="package">Package Leads</SelectItem>
                                                        <SelectItem value="inquiry">Inquiries</SelectItem>
                                                        <SelectItem value="puja">Puja</SelectItem>
                                                        <SelectItem value="prasadam">Prasadam</SelectItem>
                                                        <SelectItem value="chadhava">Chadhawa</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        {formData.recipientType === "stage" && (
                                            <div>
                                                <Label>Lead Stage</Label>
                                                <Select value={formData.stage} onValueChange={(val) => setFormData({ ...formData, stage: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Stages</SelectItem>
                                                        <SelectItem value="new">New / Pending</SelectItem>
                                                        <SelectItem value="converted">Confirmed / Completed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Email Message */}
                                <div>
                                    <Label htmlFor="message">Email Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Enter your email message..."
                                        rows={12}
                                        required
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Support for HTML formatting coming soon</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button type="button" variant="outline" className="flex-1">
                                        Save as Draft
                                    </Button>
                                    <Button type="submit" disabled={isSending || stats.withEmail === 0} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                                        {isSending ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Campaign ({stats.withEmail} recipients)
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>


                    {/* Right Column */}
                    <div className="space-y-6">

                        {/* Test Email Section */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                            <h3 className="font-semibold mb-4 text-gray-800">🧪 Send Test Email</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label>Test Recipient</Label>
                                    <Input
                                        placeholder="Enter your email..."
                                        value={testEmail}
                                        onChange={(e) => setTestEmail(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Sends the current subject & message to this address.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleSendTest}
                                    disabled={isTestSending || !testEmail || !formData.message}
                                    variant="outline"
                                    className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                                >
                                    {isTestSending ? "Sending Test..." : "Send Test Email"}
                                </Button>
                            </div>
                        </div>

                        {/* Recipient Preview */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-6 h-6 text-indigo-600" />
                                    <h3 className="font-semibold">Recipient Preview</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Found:</span>
                                        <span className="font-semibold">{stats.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">With Email:</span>
                                        <span className="font-semibold">{stats.withEmail}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Will Receive:</span>
                                        <span className="font-semibold text-indigo-600">{stats.withEmail}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">
                                    Counts are calculated live from the database based on your filters.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Mail className="w-6 h-6 text-indigo-600" />
                                    <h3 className="font-semibold">Campaign History</h3>
                                </div>
                                <p className="text-sm text-gray-500">No campaigns sent yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BlastMail;
