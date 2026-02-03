interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    bgColor: string;
    textColor?: string;
}

const DashboardMetricCard = ({
    title,
    value,
    subtitle,
    bgColor,
    textColor = "text-white",
}: MetricCardProps) => {
    return (
        <div className={`${bgColor} ${textColor} rounded-lg shadow-lg p-6`}>
            <div className="text-xs font-medium opacity-90 uppercase mb-2">{title}</div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            {subtitle && <div className="text-xs opacity-75">{subtitle}</div>}
        </div>
    );
};

export default DashboardMetricCard;
