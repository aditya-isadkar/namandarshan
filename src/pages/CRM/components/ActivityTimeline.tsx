import { CheckCircle2, Clock, FileText, UserCheck } from "lucide-react";

interface Activity {
    timestamp: Date | string;
    action: string;
    previousStatus?: string;
    newStatus?: string;
    changedBy?: string;
    changedByName?: string;
    description?: string;
}

interface ActivityTimelineProps {
    activities: Activity[];
}

const getActionIcon = (action: string) => {
    switch (action) {
        case 'status_change':
            return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
        case 'invoice_generated':
            return <FileText className="w-4 h-4 text-green-500" />;
        case 'lead_created':
            return <UserCheck className="w-4 h-4 text-purple-500" />;
        default:
            return <Clock className="w-4 h-4 text-gray-500" />;
    }
};

const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
    if (!activities || activities.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No activity recorded yet</p>
            </div>
        );
    }

    // Sort activities by timestamp (newest first)
    const sortedActivities = [...activities].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <div className="max-h-96 overflow-y-auto">
            <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
                {sortedActivities.map((activity, index) => (
                    <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                            {getActionIcon(activity.action)}
                        </div>

                        {/* Activity content */}
                        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        {activity.description ||
                                            (activity.action === 'status_change' && activity.previousStatus && activity.newStatus
                                                ? `Status changed from "${activity.previousStatus}" to "${activity.newStatus}"`
                                                : activity.action.replace('_', ' '))}
                                    </p>
                                    {activity.changedByName && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            by {activity.changedByName}
                                        </p>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                    {formatTimestamp(activity.timestamp)}
                                </span>
                            </div>

                            {activity.action === 'status_change' && (
                                <div className="flex gap-2 text-sm mt-2">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                                        {activity.previousStatus}
                                    </span>
                                    <span className="text-gray-400">→</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                        {activity.newStatus}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;
