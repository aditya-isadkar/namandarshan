import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";

interface OpsSidebarProps {
    user: any;
    onLogout: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

const OpsSidebar = ({ user, onLogout, isOpen, onToggle }: OpsSidebarProps) => {
    const location = useLocation();


    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 ease-in-out z-40 ${isOpen ? "w-64" : "w-0"
                    } overflow-hidden`}
            >
                <div className="flex flex-col h-full pt-16 pb-4">
                    {/* Navigation Links */}
                    <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                        <Link
                            to="/ops/dashboard"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive("/ops/dashboard")
                                ? "bg-blue-600 text-white font-medium"
                                : "hover:bg-gray-800 text-gray-300"
                                }`}
                        >
                            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">DASHBOARD</span>
                        </Link>
                    </nav>

                    {/* User Info & Actions */}
                    <div className="px-2 pt-4 border-t border-gray-800 space-y-2">
                        <div className="px-3 py-2 bg-gray-800 rounded-md">
                            <div className="text-xs text-gray-400">User</div>
                            <div className="text-sm font-semibold truncate">
                                {user?.name || "Ops User"}
                            </div>
                        </div>

                        <Button
                            onClick={onLogout}
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
                            size="sm"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onToggle}
                />
            )}
        </>
    );
};

export default OpsSidebar;
