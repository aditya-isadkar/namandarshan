import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartComponentProps {
    data: { date: string; value: number }[];
    title: string;
    color: string;
    dataKey: string;
    average: number;
}

const LineChartComponent = ({ data, title, color, average }: LineChartComponentProps) => {
    const formattedData = data.map((item) => ({
        x: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        y: item.value,
    }));

    const chartData = {
        labels: formattedData.map((d) => d.x),
        datasets: [
            {
                label: "Leads",
                data: formattedData.map((d) => d.y),
                borderColor: color,
                backgroundColor: color + "20",
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { font: { size: 10 } },
            },
            x: {
                ticks: {
                    font: { size: 9 },
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="mb-4">
                <span className="text-sm text-gray-600">
                    Avg: <span className="font-semibold">{average.toFixed(1)}/day</span>
                </span>
            </div>
            <div style={{ height: "250px" }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default LineChartComponent;
