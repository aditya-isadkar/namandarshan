import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
    data: { date: string; value: number }[];
    type: "line" | "bar";
    title: string;
    color: string;
    dataKey: string;
    average: number;
}

const TrendsChart = ({ data, type, title, color, dataKey, average }: TrendsChartProps) => {
    // Format data with shortened dates
    const formattedData = data.map((item) => ({
        ...item,
        shortDate: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
    }));

    const chartCommon = {
        dataKey: "shortDate",
        tick: { fontSize: 10 },
        angle: -45,
        textAnchor: "end" as const,
        height: 70,
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">{title}</h3>
            <div className="mb-4">
                <span className="text-sm text-gray-600">
                    Avg: <span className="font-semibold">{average.toFixed(1)}/day</span>
                </span>
            </div>
            <div style={{ width: "100%", height: 250 }}>
                {type === "line" && (
                    <ResponsiveContainer>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis {...chartCommon} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                {type === "bar" && (
                    <ResponsiveContainer>
                        <BarChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis {...chartCommon} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default TrendsChart;
