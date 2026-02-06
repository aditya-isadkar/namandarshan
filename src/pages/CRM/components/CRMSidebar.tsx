import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, Users, Mail, Home, Moon, Package, MessageSquare, Settings, LogOut, Shield } from "lucide-react";

interface CRMSidebarProps {
    user: any;
    onLogout: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

const CRMSidebar = ({ user, onLogout, isOpen, onToggle }: CRMSidebarProps) => {
    const location = useLocation();


    const navLinks = [
        { path: "/crm/dashboard", icon: LayoutDashboard, label: "DASHBOARD", emoji: "📊" },
        { path: "/crm/team-stats", icon: Users, label: "TEAM STATS", emoji: "👥" },
        { path: "/crm/blast-mail", icon: Mail, label: "BLAST MAIL", emoji: "📧" },
        { path: "/crm/darshan", icon: Home, label: "DARSHAN", emoji: "" },
        { path: "/crm/astro", icon: Moon, label: "ASTRO", emoji: "" },
        { path: "/crm/package", icon: Package, label: "PACKAGE", emoji: "" },
        { path: "/crm/chadhawa", icon: Package, label: "CHADHAWA", emoji: "🕉️" },
        { path: "/crm/puja", icon: Package, label: "PUJA", emoji: "🔔" },
        { path: "/crm/prasadam", icon: Package, label: "PRASADAM", emoji: "🍜" },
        { path: "/crm/inquiry", icon: MessageSquare, label: "INQUIRY", emoji: "" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-40 ${isOpen ? "w-64" : "w-0"
                    } overflow-hidden`}
            >
                <div className="flex flex-col h-full pt-16 pb-4">
                    {/* Navigation Links */}
                    <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${active
                                        ? "bg-yellow-600 text-white font-medium"
                                        : "hover:bg-gray-700 text-gray-300"
                                        }`}
                                >
                                    {link.emoji && <span className="text-lg">{link.emoji}</span>}
                                    {!link.emoji && <Icon className="w-5 h-5 flex-shrink-0" />}
                                    <span className="text-sm whitespace-nowrap">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info & Actions */}
                    <div className="px-2 pt-4 border-t border-gray-700 space-y-2">
                        <div className="px-3 py-2 bg-gray-800 rounded-md">
                            <div className="text-xs text-gray-400">Agent</div>
                            <div className="text-sm font-semibold truncate">
                                {user?.agentName || user?.userId}
                            </div>
                            {user?.role === "master_admin" && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-purple-600 text-xs rounded">
                                    MASTER_ADMIN
                                </span>
                            )}
                        </div>

                        {user?.role === "master_admin" && (
                            <Link
                                to="/crm/admin"
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                <Shield className="w-4 h-4" />
                                <span className="text-sm">Admin Panel</span>
                            </Link>
                        )}

                        <Button
                            onClick={onLogout}
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700"
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

export default CRMSidebar;
