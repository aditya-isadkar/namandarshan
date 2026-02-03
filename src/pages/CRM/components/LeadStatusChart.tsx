import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LeadStatusChartProps {
    data: { name: string; value: number }[];
}

const COLORS = {
    "not-interested": "#EF4444",
    lost: "#F97316",
    converted: "#10B981",
    contacted: "#8B5CF6",
    "not-reached": "#EC4899",
    qualified: "#14B8A6",
    "proposal-sent": "#F59E0B",
    "invoice-generated": "#06B6D4",
    "invoice-invalid": "#DC2626",
    interested: "#3B82F6",
    new: "#6366F1",
    negotiation: "#8B5CF6",
    pending: "#FCD34D",
    confirmed: "#34D399",
    "in-progress": "#A78BFA",
    completed: "#10B981",
    cancelled: "#EF4444",
};

const LeadStatusChart = ({ data }: LeadStatusChartProps) => {
    const chartData = {
        labels: data.map((item) => item.name),
        datasets: [
            {
                data: data.map((item) => item.value),
                backgroundColor: data.map(
                    (item) => COLORS[item.name.toLowerCase().replace(/\s+/g, "-")] || "#9CA3AF"
                ),
                borderWidth: 2,
                borderColor: "#fff",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "right" as const,
                labels: {
                    boxWidth: 12,
                    padding: 10,
                    font: { size: 11 },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.parsed}`;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📊 Lead Status Distribution
            </h3>
            <div style={{ height: "300px" }}>
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default LeadStatusChart;
