import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DashboardMetricCard from "./components/DashboardMetricCard";
import LeadStatusChart from "./components/LeadStatusChart";
import LineChartComponent from "./components/LineChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import CRMSidebar from "./components/CRMSidebar";
import CRMHeader from "./components/CRMHeader";
import { useSidebar } from "@/hooks/useSidebar";
import { getApiUrl } from "@/utils/api";

const CRMDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [dateRange, setDateRange] = useState("30");
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [crmType, setCrmType] = useState("all");
    const [analytics, setAnalytics] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useSidebar();

    useEffect(() => {
        const crmUser = localStorage.getItem("crmUser");
        if (!crmUser) {
            navigate("/crm");
            return;
        }
        setUser(JSON.parse(crmUser));
    }, []);

    useEffect(() => {
        if (user) {
            fetchAnalytics();
        }
    }, [user, dateRange, crmType, selectedMonth, selectedYear]);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            let url = `/api/crm/analytics?dateRange=${dateRange}&crmType=${crmType}`;
            if (dateRange === 'month') {
                url += `&month=${selectedMonth}&year=${selectedYear}`;
            }
            const response = await fetch(getApiUrl(url));
            const data = await response.json();
            if (data.success) {
                setAnalytics(data.data);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch analytics data",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("crmUser");
        navigate("/crm");
    };

    const handleDownloadReport = async () => {
        if (!dashboardRef.current || !analytics) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Dashboard data not loaded yet",
            });
            return;
        }

        setIsDownloading(true);
        toast({
            title: "Generating PDF",
            description: "Please wait while we create your report...",
        });

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.setFontSize(20);
            pdf.setTextColor(40, 40, 40);
            pdf.text('CRM Dashboard Report', pageWidth / 2, 20, { align: 'center' });

            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            const dateRangeText = dateRange === 'all' ? 'All Time' : (dateRange === 'today' ? 'Today' : `Last ${dateRange} days`);
            const crmTypeText = crmType === 'all' ? 'All CRM Types' : crmType.toUpperCase();
            pdf.text(`Date Range: ${dateRangeText} | CRM Type: ${crmTypeText}`, pageWidth / 2, 28, { align: 'center' });
            pdf.text(`Generated: ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, 33, { align: 'center' });

            let yPos = 45;

            pdf.setFontSize(14);
            pdf.setTextColor(40, 40, 40);
            pdf.text('Key Metrics', 15, yPos);
            yPos += 8;

            pdf.setFontSize(10);
            pdf.text(`Total Revenue: ₹${analytics.totalRevenue?.toFixed(2) || '0.00'}`, 15, yPos);
            pdf.text(`Total Leads: ${analytics.totalLeads || 0}`, 75, yPos);
            yPos += 6;
            pdf.text(`Conversions: ${analytics.conversions || 0}`, 15, yPos);
            pdf.text(`Conversion Rate: ${analytics.conversionRate || 0}%`, 75, yPos);
            yPos += 12;

            const chartElements = dashboardRef.current.querySelectorAll('canvas');
            for (let i = 0; i < Math.min(chartElements.length, 3); i++) {
                const canvas = chartElements[i] as HTMLCanvasElement;
                if (canvas) {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pageWidth - 30;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    if (yPos + imgHeight > pageHeight - 20) {
                        pdf.addPage();
                        yPos = 20;
                    }

                    pdf.addImage(imgData, 'PNG', 15, yPos, imgWidth, Math.min(imgHeight, 80));
                    yPos += Math.min(imgHeight, 80) + 10;
                }
            }

            const statsElement = document.getElementById('crm-type-stats');
            if (statsElement) {
                const canvas = await html2canvas(statsElement);
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 30;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (yPos + imgHeight > pageHeight - 20) {
                    pdf.addPage();
                    yPos = 20;
                }

                pdf.addImage(imgData, 'PNG', 15, yPos, imgWidth, imgHeight);
            }

            const fileName = `dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);

            toast({
                title: "Success",
                description: "Dashboard report downloaded successfully!",
            });
        } catch (error) {
            console.error('PDF generation error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to generate PDF report",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const getStatusChartData = () => {
        if (!analytics?.statusDistribution) return [];
        return Object.entries(analytics.statusDistribution).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " "),
            value: value as number,
        }));
    };

    const getLeadsTrendData = () => {
        if (!analytics?.dailyTrends) return [];
        return analytics.dailyTrends.map((item: any) => ({
            date: item.date,
            value: item.leads,
        }));
    };

    const getConversionsTrendData = () => {
        if (!analytics?.dailyTrends) return [];
        return analytics.dailyTrends.map((item: any) => ({
            date: item.date,
            value: item.conversions,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {user && (
                <CRMSidebar
                    user={user}
                    onLogout={handleLogout}
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                />
            )}

            <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"}`}>
                <CRMHeader toggleSidebar={toggleSidebar} user={user} />

                <div className="p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">📅 Date Range</label>
                                    <Select value={dateRange} onValueChange={setDateRange}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="7">Last 7 Days</SelectItem>
                                            <SelectItem value="30">Last 30 Days</SelectItem>
                                            <SelectItem value="90">Last 90 Days</SelectItem>
                                            <SelectItem value="month">Specific Month</SelectItem>
                                            <SelectItem value="all">All Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {dateRange === 'month' && (
                                    <>
                                        <div>
                                            <label className="text-xs text-gray-500 block mb-1">📅 Month</label>
                                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: 12 }, (_, i) => (
                                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block mb-1">📅 Year</label>
                                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                                <SelectTrigger className="w-24">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[2024, 2025, 2026].map((year) => (
                                                        <SelectItem key={year} value={year.toString()}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">🎯 CRM Type</label>
                                    <Select value={crmType} onValueChange={setCrmType}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All CRMs</SelectItem>
                                            <SelectItem value="darshan">Darshan</SelectItem>
                                            <SelectItem value="astro">Astro</SelectItem>
                                            <SelectItem value="package">Package</SelectItem>
                                            <SelectItem value="inquiry">Inquiry</SelectItem>
                                            <SelectItem value="ops">OPS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={fetchAnalytics} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 mt-5">
                                    {isLoading ? "Loading..." : "Apply Filters"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                            📊 CRM Dashboard
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Showing data for {dateRange === 'today' ? 'today' : `last ${dateRange} days`} {crmType !== "all" ? `(${crmType.toUpperCase()} CRM)` : "(All CRMs)"}
                        </p>
                        <Button
                            onClick={handleDownloadReport}
                            disabled={isDownloading || !analytics}
                            className="bg-green-600 hover:bg-green-700 mt-3"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isDownloading ? "Generating PDF..." : "Download Dashboard Report"}
                        </Button>
                    </div>

                    <div ref={dashboardRef}>
                        {analytics && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <DashboardMetricCard
                                        title="Total Revenue"
                                        value={`₹${analytics.metrics.totalRevenue.toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}`}
                                        subtitle="Opp CRM"
                                        bgColor="bg-gradient-to-br from-green-500 to-green-600"
                                    />
                                    <DashboardMetricCard
                                        title="Total Leads"
                                        value={analytics.metrics.totalLeads}
                                        subtitle={`Avg: ${analytics.metrics.avgLeadsPerDay}/day`}
                                        bgColor="bg-gradient-to-br from-orange-400 to-orange-500"
                                    />
                                    <DashboardMetricCard
                                        title="Conversions"
                                        value={analytics.metrics.conversions}
                                        subtitle={`Avg: ${analytics.metrics.avgConversionsPerDay}/day`}
                                        bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
                                    />
                                    <DashboardMetricCard
                                        title="Conversion Rate"
                                        value={`${analytics.metrics.conversionRate}%`}
                                        subtitle={`${analytics.metrics.conversions} / ${analytics.metrics.totalLeads} leads`}
                                        bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
                                    />
                                </div>

                                {getStatusChartData().length > 0 && (
                                    <div className="mb-6">
                                        <LeadStatusChart data={getStatusChartData()} />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                    <LineChartComponent
                                        data={getLeadsTrendData()}
                                        title="📈 Daily Leads Trend"
                                        color="#10B981"
                                        dataKey="value"
                                        average={analytics.metrics.avgLeadsPerDay}
                                    />
                                    <BarChartComponent
                                        data={getConversionsTrendData()}
                                        title="🎯 Daily Conversions Trend"
                                        color="#6366F1"
                                        dataKey="value"
                                        average={analytics.metrics.avgConversionsPerDay}
                                    />
                                </div>

                                <div id="crm-type-stats" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
                                        📋 Lead Statistics by CRM Type
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-orange-800 mb-1">DARSHAN LEADS</div>
                                            <div className="text-3xl font-bold text-orange-900">{analytics.crmStats.darshan}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-purple-800 mb-1">ASTRO LEADS</div>
                                            <div className="text-3xl font-bold text-purple-900">{analytics.crmStats.astro}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-teal-800 mb-1">PACKAGE LEADS</div>
                                            <div className="text-3xl font-bold text-teal-900">{analytics.crmStats.package}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-sky-100 to-sky-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-sky-800 mb-1">INQUIRIES</div>
                                            <div className="text-3xl font-bold text-sky-900">{analytics.crmStats.inquiry}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-pink-800 mb-1">PUJA LEADS</div>
                                            <div className="text-3xl font-bold text-pink-900">{analytics.crmStats.puja}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-yellow-800 mb-1">PRASADAM LEADS</div>
                                            <div className="text-3xl font-bold text-yellow-900">{analytics.crmStats.prasadam}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-indigo-800 mb-1">CHADHAWA LEADS</div>
                                            <div className="text-3xl font-bold text-indigo-900">{analytics.crmStats.chadhava}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mb-6">
                                    <Button
                                        onClick={handleDownloadReport}
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg shadow-lg"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Dashboard Report (PDF)
                                    </Button>
                                </div>

                                <div className="flex justify-start">
                                    <Select defaultValue="">
                                        <SelectTrigger className="w-64">
                                            <SelectValue placeholder="Change Stage To..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="qualified">Qualified</SelectItem>
                                            <SelectItem value="converted">Converted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}

                        {!analytics && !isLoading && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                                <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMDashboard;
