import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function ISTClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span>IST {formatTime(time)}</span>
        </div>
    );
}
