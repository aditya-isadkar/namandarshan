import { useState, useEffect } from "react";

export const useSidebar = (key: string = "sidebarOpen") => {
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window === 'undefined') return true;
        const saved = localStorage.getItem(key);
        return saved !== null ? saved === "true" : true;
    });

    const toggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        localStorage.setItem(key, String(isOpen));
    }, [isOpen, key]);

    return { isOpen, toggle, setIsOpen };
};
