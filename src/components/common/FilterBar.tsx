import React from 'react';
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
    onSearch: (query: string) => void;
    onStateChange: (state: string) => void;
    states: string[];
    className?: string;
    placeholder?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
    onSearch,
    onStateChange,
    states,
    className = "",
    placeholder = "Search..."
}) => {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-8 ${className}`}>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder={placeholder}
                        className="pl-10 bg-stone-50 border-stone-200"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="text-orange-500 h-4 w-4" />
                    <Select onValueChange={onStateChange}>
                        <SelectTrigger className="w-full md:w-[200px] bg-stone-50 border-stone-200">
                            <SelectValue placeholder="Filter by State" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All States</SelectItem>
                            {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
