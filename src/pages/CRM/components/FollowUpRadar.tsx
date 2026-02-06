import { useState, useEffect } from "react";
import { Radar, AlertCircle, Phone, MessageSquare, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getApiUrl } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RadarItem {
    id: string;
    type: 'lead' | 'booking';
    name: string;
    service: string;
    dueDate: string;
    action: string;
    notes?: string;
    status: string;
    originalId?: string; // for navigation/api calls
}

const FollowUpRadar = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<RadarItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const [leadsResponse, bookingsResponse] = await Promise.all([
                fetch(getApiUrl('/api/crm/leads?hasNextAction=true&limit=50&sort=nextAction.dueDate')),
                fetch(getApiUrl('/api/crm/bookings?hasNextAction=true&limit=50&sort=nextAction.actionDate'))
            ]);

            const leadsData = await leadsResponse.json();
            const bookingsData = await bookingsResponse.json();

            console.log("Radar Debug - Leads:", leadsData);
            console.log("Radar Debug - Bookings:", bookingsData);

            const newItems: RadarItem[] = [];

            if (leadsData.success) {
                leadsData.data.forEach((lead: any) => {
                    newItems.push({
                        id: lead._id,
                        originalId: lead.leadId,
                        type: 'lead',
                        name: lead.leadInformation?.name || 'Unknown',
                        service: lead.templeAndDate?.serviceType || 'General',
                        dueDate: lead.nextAction?.dueDate,
                        action: lead.nextAction?.action || 'Follow Up',
                        notes: lead.nextAction?.notes,
                        status: lead.currentStage
                    });
                });
            }

            if (bookingsData.success) {
                bookingsData.data.forEach((booking: any) => {
                    if (booking.nextAction?.actionDate) {
                        newItems.push({
                            id: booking._id,
                            originalId: booking._id, // Bookings use _id
                            type: 'booking',
                            name: booking.userDetails?.name || 'Unknown',
                            service: booking.serviceName || booking.type || 'Booking',
                            dueDate: booking.nextAction?.actionDate,
                            action: booking.nextAction?.actionType || 'Follow Up',
                            notes: booking.nextAction?.notes,
                            status: booking.status
                        });
                    }
                });
            }

            // Sort by due date
            newItems.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            setItems(newItems);

        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update Radar'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteTask = async (item: RadarItem) => {
        try {
            const endpoint = item.type === 'lead'
                ? `/api/crm/leads/${item.originalId}`
                : `/api/crm/bookings/${item.id}`;

            const updateBody = item.type === 'lead'
                ? { nextAction: { action: null, dueDate: null, notes: null } }
                : { nextAction: { actionType: null, actionDate: null, notes: null } }; // Ensure we clear the right fields

            const response = await fetch(getApiUrl(endpoint), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateBody)
            });

            const data = await response.json();
            if (data.success) {
                toast({ title: "Task Completed", description: "Follow-up mark as done." });
                fetchTasks();
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: "Failed to complete task" });
        }
    };

    useEffect(() => {
        if (open) {
            fetchTasks();
        }
    }, [open]);

    // Format relative time
    const getRelativeTime = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / 36e5;

        if (diffInHours < 0) {
            // Future
            const days = Math.ceil(Math.abs(diffInHours) / 24);
            return `Due in ${days} days`;
        }

        if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
        return `${Math.floor(diffInHours / 24)} days ago`;
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-primary transition-colors"
                >
                    <Radar className="h-[1.2rem] w-[1.2rem]" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-pulse">
                            {items.length}
                        </span>
                    )}
                    <span className="sr-only">Open Follow-Up Radar</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader className="mb-6">
                    <SheetTitle className="flex items-center gap-2 text-2xl">
                        <Radar className="h-6 w-6 text-red-600" />
                        Task Radar
                    </SheetTitle>
                    <SheetDescription>
                        All leads and bookings with pending next actions
                    </SheetDescription>
                </SheetHeader>

                <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline" className="text-sm">
                        {items.length} Pending Tasks
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={fetchTasks} disabled={loading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                    {loading && items.length === 0 ? (
                        <div className="flex justify-center p-8 text-muted-foreground">Loading radar...</div>
                    ) : items.length === 0 ? (
                        <div className="text-center p-8 border-2 border-dashed rounded-lg">
                            <AlertCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                            <p className="font-medium">All caught up!</p>
                            <p className="text-sm text-muted-foreground">No pending tasks found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-card"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-lg">{item.name}</h4>
                                                <Badge variant="outline" className="text-[10px] uppercase">
                                                    {item.type}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {item.service?.toUpperCase()} • {item.status}
                                            </p>
                                        </div>
                                        {item.dueDate && (
                                            <Badge variant={new Date(item.dueDate) < new Date() ? 'destructive' : 'secondary'}>
                                                {getRelativeTime(item.dueDate)}
                                            </Badge>
                                        )}
                                    </div>

                                    {item.action && (
                                        <div className="bg-muted/50 p-2 rounded text-sm mb-3">
                                            <div className="flex gap-2 items-center font-semibold text-primary">
                                                <span>{item.action === 'call' ? '📞' : '📝'}</span>
                                                <span className="capitalize">{item.action}</span>
                                            </div>
                                            {item.notes && (
                                                <div className="text-xs text-muted-foreground mt-1 italic">
                                                    "{item.notes}"
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            className="flex-1"
                                            size="sm"
                                            onClick={() => {
                                                setOpen(false);
                                                if (item.type === 'lead') {
                                                    navigate(`/crm/leads?search=${item.originalId}`);
                                                } else {
                                                    // Navigate to OPS or Darshan based on service?
                                                    // For now default to Ops Dashboard search
                                                    navigate(`/ops/dashboard?search=${item.id}`);
                                                }
                                            }}
                                        >
                                            <ExternalLink className="h-3 w-3 mr-2" />
                                            Open {item.type === 'lead' ? 'Lead' : 'Booking'}
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleCompleteTask(item)}
                                        >
                                            <RefreshCw className="h-3 w-3 mr-2" />
                                            Complete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default FollowUpRadar;
