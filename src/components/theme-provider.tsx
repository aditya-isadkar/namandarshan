import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Theme = "dark" | "light" | "smart";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "smart",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "smart",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    const location = useLocation();

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        // Check if current path starts with /crm or /ops (or is a sub-route)
        // Adjust the condition as per your "CRM & OPS" requirements
        const isCrmOrOps = location.pathname.startsWith("/crm") || location.pathname.startsWith("/ops");

        if (!isCrmOrOps) {
            // Main Site: ALWAYS Light Mode
            root.classList.add("light");
            return; // Stop here, ignore 'theme' state
        }

        // If CRM/Ops, respect the 'theme' state
        if (theme === "smart") {
            const checkTime = () => {
                const hour = new Date().getHours();
                // Dark mode from 7 PM (19:00) to 8 AM (08:00)
                const isDarkTime = hour >= 19 || hour < 8;

                root.classList.remove("light", "dark");
                root.classList.add(isDarkTime ? "dark" : "light");
            };

            checkTime(); // Initial check
            const interval = setInterval(checkTime, 60000); // Check every minute
            return () => clearInterval(interval);
        } else {
            root.classList.add(theme);
        }
    }, [theme, location.pathname]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
}
