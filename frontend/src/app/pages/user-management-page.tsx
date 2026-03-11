import React from "react";
import { AdminShell } from "../components/layout/admin-shell";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";

const MOCK_USERS = [
    { id: "0001", name: "Julie Huynh", email: "juliehuynh@gmail.com", status: "Active", risk: "Low", lastActive: "2 mins ago" },
    { id: "0002", name: "Phước Trần", email: "phuoctran@vbac.com", status: "Active", risk: "Medium", lastActive: "1 hour ago" },
    { id: "0003", name: "Mai Anh Nguyễn", email: "maianh@vbac.com", status: "Pending", risk: "Low", lastActive: "Yesterday" },
    { id: "0004", name: "Hoàng Lê", email: "hoangle@gmail.com", status: "Suspended", risk: "High", lastActive: "3 days ago" },
];

export function UserManagementPage() {
    return (
        <AdminShell greeting="User Management">
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A0A7B4]" />
                        <input
                            placeholder="Search users..."
                            className="h-10 w-full rounded-xl border border-[#EEF1F6] bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#3AD6B0]/20"
                        />
                    </div>
                    <Button className="h-10 rounded-xl bg-[#3AD6B0] text-white hover:bg-[#33C9A6]">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New User
                    </Button>
                </div>

                <Card className="border-[#EEF1F6] shadow-none">
                    <CardHeader className="pb-2">
                        <div className="text-lg font-bold tracking-tight text-[#111827]">All Users</div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="text-[#A0A7B4]">User</TableHead>
                                    <TableHead className="text-[#A0A7B4]">Status</TableHead>
                                    <TableHead className="text-[#A0A7B4]">Risk Level</TableHead>
                                    <TableHead className="text-[#A0A7B4]">Last Active</TableHead>
                                    <TableHead className="text-right text-[#A0A7B4]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_USERS.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-[#F7F9FF]/60">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#EEF1F6] to-[#E2E8F0]" />
                                                <div>
                                                    <div className="text-sm font-semibold text-[#1C2433]">{user.name}</div>
                                                    <div className="text-xs text-[#A0A7B4]">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "border-0",
                                                user.status === "Active" ? "bg-[#F3FFFB] text-[#3AD6B0]" :
                                                    user.status === "Pending" ? "bg-[#FFF8E8] text-[#F5A524]" : "bg-[#FFF5F5] text-[#FF6B6B]"
                                            )}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    user.risk === "Low" ? "bg-[#3AD6B0]" : user.risk === "Medium" ? "bg-[#F5A524]" : "bg-[#FF6B6B]"
                                                )} />
                                                <span className="text-sm text-[#6B7383]">{user.risk}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-[#A0A7B4]">{user.lastActive}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A0A7B4]">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
