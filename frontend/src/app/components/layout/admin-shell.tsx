import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Bell,
    Grid2X2,
    HelpCircle,
    LogOut,
    Settings,
    Shield,
    Users,
    ShieldAlert,
    BarChart,
} from "lucide-react";

import { cn } from "../ui/utils";
import { Switch } from "../ui/switch";

type NavItem = {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
};

const ADMIN_NAV_ITEMS: NavItem[] = [
    { label: "Admin Dashboard", path: "/admin", icon: Grid2X2 },
    { label: "User Management", path: "/user-management", icon: Users },
    { label: "Review Tasks", path: "/notifications", icon: ShieldAlert },
    { label: "System Metrics", path: "/metrics", icon: BarChart },
];

const PREF_ITEMS: NavItem[] = [{ label: "Security", path: "/security", icon: Shield }];

function AdminLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="text-lg font-bold tracking-tight text-[#111827]">
                VBAC ADMIN
            </div>
        </div>
    );
}

function SidebarNavButton({ item, active }: { item: NavItem; active: boolean }) {
    const navigate = useNavigate();
    const Icon = item.icon;
    return (
        <button
            type="button"
            onClick={() => navigate(item.path)}
            className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                active ? "bg-[#F3F4F6]" : "hover:bg-[#F9FAFB]",
            )}
        >
            {/* active bar */}
            <span
                className={cn(
                    "absolute left-2 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full transition-opacity",
                    active ? "bg-[#111827] opacity-100" : "opacity-0",
                )}
            />
            <Icon
                className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-[#111827]" : "text-[#A0A7B4] group-hover:text-[#6B7383]",
                )}
            />
            <span
                className={cn(
                    "text-[14px] font-medium transition-colors",
                    active ? "text-[#111827]" : "text-[#A0A7B4] group-hover:text-[#6B7383]",
                )}
            >
                {item.label}
            </span>
        </button>
    );
}

export function AdminShell({
    greeting,
    children,
}: {
    greeting: React.ReactNode;
    children: React.ReactNode;
}) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-6 md:p-10">
            <div className="mx-auto w-full max-w-screen-2xl overflow-hidden rounded-[28px] bg-white shadow-[0_22px_70px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <aside className="hidden lg:flex min-h-[calc(100vh-80px)] flex-col border-r border-[#EEF1F6] bg-white">
                        <div className="px-6 py-6">
                            <AdminLogo />
                        </div>

                        <div className="px-3">
                            <div className="space-y-1">
                                {ADMIN_NAV_ITEMS.map((item) => (
                                    <SidebarNavButton
                                        key={item.path}
                                        item={item}
                                        active={location.pathname === item.path}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 px-4 text-[15px] font-semibold text-[#1C2433]">
                                Control Panel
                            </div>

                            <div className="mt-3 space-y-1">
                                {PREF_ITEMS.map((item) => (
                                    <SidebarNavButton
                                        key={item.path}
                                        item={item}
                                        active={location.pathname === item.path}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto border-t border-[#EEF1F6] px-3 py-4">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[#6B7383] hover:bg-[#F9FAFB] transition-colors"
                            >
                                <LogOut className="h-5 w-5 rotate-180" />
                                <span className="text-[14px] font-medium">Exit to User Site</span>
                            </button>

                            <div className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 border border-[#EEF1F6] bg-white text-[#1C2433]">
                                <div className="h-9 w-9 overflow-hidden rounded-full bg-[#EEF1F6]" />
                                <div className="min-w-0">
                                    <div className="truncate text-[13px] font-semibold text-[#1C2433]">Admin Phước</div>
                                    <div className="truncate text-[11px] text-[#6B7383]">phuoctran@vbac.com</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main */}
                    <main className="min-h-[calc(100vh-80px)] bg-white">
                        <header className="border-b border-[#EEF1F6] px-6 py-6 md:px-10">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="text-[28px] font-bold tracking-tight text-[#111827]">
                                    {greeting}
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-[#E5E7EB]" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-[#6B7383]">3 Admins Online</span>
                                </div>
                            </div>
                        </header>

                        <div className="px-6 py-6 md:px-10 md:py-8">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
