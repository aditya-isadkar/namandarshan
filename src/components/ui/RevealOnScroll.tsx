import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    delay?: number;
}

const RevealOnScroll = ({
    children,
    className,
    threshold = 0.1,
    delay = 0
}: RevealOnScrollProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Small delay to ensure not pre-rendering state prevents animation
                    setTimeout(() => setIsVisible(true), 50);
                    observer.disconnect();
                }
            },
            {
                threshold: threshold,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={cn(
                "duration-1000 ease-out",
                isVisible
                    ? "animate-in fade-in slide-in-from-bottom-[50px] opacity-100"
                    : "opacity-0",
                className
            )}
            style={{
                animationDuration: '1000ms',
                animationDelay: `${delay}ms`,
                // Ensure opacity stays 0 before animation start if using delay
                opacity: isVisible ? 1 : 0
            }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
