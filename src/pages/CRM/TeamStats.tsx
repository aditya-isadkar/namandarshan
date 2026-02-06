import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, DollarSign, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import CRMHeader from "./components/CRMHeader";

const TeamStats = () => {
    const { toast } = useToast();
    const [timePeriod, setTimePeriod] = useState("month");
    const [stats, setStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/crm/leads`));
            const data = await response.json();

            if (data.success) {
                // Aggregate stats by assignedTo
                const agentStats: any = {};
                data.data.forEach((lead: any) => {
                    const agent = lead.assignedTo || "Unassigned";
                    if (!agentStats[agent]) {
                        agentStats[agent] = { name: agent, totalLeads: 0, converted: 0, revenue: 0, avgResponseTime: "-" };
                    }
                    agentStats[agent].totalLeads++;
                    if (lead.currentStage === "converted" || lead.currentStage === "completed" || lead.currentStage === "confirmed") {
                        agentStats[agent].converted++;
                    }
                });

                setStats(Object.values(agentStats));
            }
        } catch (error) {
            console.error("Error:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch team stats" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [timePeriod]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <CRMHeader />

            <div className="p-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-lg mb-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/crm/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-blue-700">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold">📊 Team Statistics</h1>
                                <p className="text-blue-100">Performance metrics and analytics</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Period Selector */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Time Period</h3>
                        <Select value={timePeriod} onValueChange={setTimePeriod}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="quarter">This Quarter</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Agent Performance Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {stats.map((agent, idx) => {
                        const conversionRate = agent.totalLeads > 0 ? ((agent.converted / agent.totalLeads) * 100).toFixed(1) : "0";

                        return (
                            <div key={idx} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                                        <p className="text-sm text-gray-500">Sales Agent</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {parseFloat(conversionRate) >= 50 && (
                                            <Award className="w-6 h-6 text-yellow-500" />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-600">Total Leads</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{agent.totalLeads}</p>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-green-600" />
                                            <span className="text-sm font-medium text-gray-600">Converted</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{agent.converted}</p>
                                    </div>

                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className="w-5 h-5 text-purple-600" />
                                            <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
                                    </div>

                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5 text-orange-600" />
                                            <span className="text-sm font-medium text-gray-600">Avg Response</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{agent.avgResponseTime}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {stats.length === 0 && !isLoading && (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-500 text-lg">No team stats available</p>
                        <p className="text-gray-400 text-sm mt-2">Start assigning leads to agents to see performance metrics</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamStats;
