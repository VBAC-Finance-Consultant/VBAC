import React from "react";
import { AdminShell } from "../components/layout/admin-shell";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Users, ShieldAlert, BarChart2 } from "lucide-react";

export function AdminDashboardPage() {
    const stats = [
        { label: "Active Users", value: "1,284", icon: <Users className="h-5 w-5 text-blue-500" /> },
        { label: "Pending Reviews", value: "12", icon: <ShieldAlert className="h-5 w-5 text-amber-500" /> },
        { label: "System Health", value: "99.9%", icon: <BarChart2 className="h-5 w-5 text-emerald-500" /> },
    ];

    return (
        <AdminShell greeting="Admin Overview">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {stats.map((s) => (
                        <Card key={s.label} className="border-[#EEF1F6] shadow-none">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="text-sm text-[#A0A7B4]">{s.label}</div>
                                    <div className="text-2xl font-bold text-[#111827]">{s.value}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-[#EEF1F6] shadow-none">
                    <CardHeader>
                        <div className="text-lg font-bold">Recent System Activity</div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-[#A0A7B4] border border-dashed rounded-xl">
                            System Logs and AI Performance Metrics go here.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}
