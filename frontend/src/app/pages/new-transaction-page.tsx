import React from "react";
import { useNavigate } from "react-router-dom";
import { SparkleShell } from "../components/layout/sparkle-shell";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeftRight, ShoppingCart, TrendingUp } from "lucide-react";

export function NewTransactionPage() {
    const navigate = useNavigate();

    const options = [
        {
            title: "Transfer to Account",
            description: "Chuyển tiền từ A tới B",
            icon: ArrowLeftRight,
            path: "/transfer?action=new",
        },
        {
            title: "Shopping Payment",
            description: "Thanh toán mua sắm",
            icon: ShoppingCart,
            path: "/shopping-payment",
        },
        {
            title: "Stock Order",
            description: "Mua mã cổ phiếu",
            icon: TrendingUp,
            path: "/stock-order",
        },
    ];

    return (
        <SparkleShell greeting="New Transaction">
            <div className="mx-auto max-w-4xl mt-12 mb-8 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-[#111827]">What would you like to do today?</h2>
                    <p className="mt-2 text-sm text-[#A0A7B4]">Choose a transaction type to proceed</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {options.map((opt) => (
                        <button
                            key={opt.title}
                            onClick={() => navigate(opt.path)}
                            className="w-full text-left"
                        >
                            <Card className="border-[#EEF1F6] shadow-none hover:shadow-[0_12px_40px_rgba(25,55,99,0.06)] transition-all duration-300 hover:border-[#3AD6B0]/50 group h-full bg-white">
                                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                                    <div
                                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F7F9FF] text-[#6B7383] group-hover:scale-110 group-hover:bg-[#3AD6B0] group-hover:text-white transition-all duration-300"
                                    >
                                        <opt.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-[#1C2433] mb-2 group-hover:text-[#111827] transition-colors">
                                            {opt.title}
                                        </div>
                                        <div className="text-sm text-[#A0A7B4] leading-relaxed">
                                            {opt.description}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>
        </SparkleShell>
    );
}
