import { getApiUrl } from "@/utils/api";
import { useState, useEffect } from "react";
import { Menu, Search, Sun, Moon, Monitor, Laptop, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ISTClock } from "@/components/ISTClock";
import { useTheme } from "@/components/theme-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { DialogTitle } from "@/components/ui/dialog";
import FollowUpRadar from "./FollowUpRadar";

interface CRMHeaderProps {
    toggleSidebar?: () => void;
    user?: any;
}

const CRMHeader = ({ toggleSidebar, user }: CRMHeaderProps) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                // Using getApiUrl for correct backend endpoint
                const response = await fetch(getApiUrl(`/api/crm/search?q=${encodeURIComponent(query)}`));
                const data = await response.json();
                if (data.success) {
                    setResults(data.data);
                }
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (item: any) => {
        setOpen(false);
        if (item.data?.type) {
            // Navigate based on type
            if (item.data.type === 'lead') {
                navigate('/crm/leads');
                // In a real app we would open the modal or query param
            } else {
                // Booking type
                navigate(`/crm/${item.data.type || 'darshan'}?search=${item.id}`);
            }
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
            {/* Sidebar Toggle (Mobile/Tablet) */}
            <div className="flex items-center gap-2">
                {toggleSidebar && (
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                )}
            </div>

            {/* Omni-Search Trigger */}
            <div className="flex-1">
                <Button
                    variant="outline"
                    className="w-full max-w-md justify-start text-muted-foreground"
                    onClick={() => setOpen(true)}
                >
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search leads, bookings...</span>
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <ISTClock />

                {/* Theme Toggle */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" /> Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" /> Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("smart")}>
                            <Monitor className="mr-2 h-4 w-4" /> Smart (Auto)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <FollowUpRadar />

                {/* User Avatar / Name could go here */}
                {user && (
                    <div className="hidden md:flex items-center gap-2 text-sm font-medium">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {user.name?.[0] || "U"}
                        </div>
                    </div>
                )}
            </div>

            {/* Omni-Search Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
                <DialogTitle className="hidden">Visually Hidden Title</DialogTitle>
                <CommandInput
                    placeholder="Type to search..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {results.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {results.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => handleSelect(item)}
                                >
                                    {item.type === 'lead' ? (
                                        <User className="mr-2 h-4 w-4" />
                                    ) : (
                                        <Calendar className="mr-2 h-4 w-4" />
                                    )}
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                                    </div>
                                    <span className="ml-auto text-xs capitalize text-muted-foreground">
                                        {item.status}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>

        </header >
    );
};

export default CRMHeader;
