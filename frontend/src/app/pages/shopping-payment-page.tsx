import React from "react";
import { SparkleShell } from "../components/layout/sparkle-shell";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Info, ShieldCheck, ShoppingCart } from "lucide-react";
import { Input } from "../components/ui/input";
import { SuccessScreen, fmtVND } from "../components/transfer";

export function ShoppingPaymentPage() {
    const [merchant, setMerchant] = React.useState("Shopee VN");
    const [orderId, setOrderId] = React.useState("ORD-5839201");
    const [amount, setAmount] = React.useState("850000");
    const [step, setStep] = React.useState<"form" | "success">("form");

    const handleConfirm = () => {
        setStep("success");
    };

    const handleReset = () => {
        setStep("form");
        setAmount("");
        setOrderId("");
        setMerchant("");
    };

    const amountNum = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

    return (
        <SparkleShell greeting="Shopping Payment">
            {step === "form" && (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] xl:gap-12 mt-8">
                    <div className="space-y-6 min-w-0">
                        <Card className="border-[#EEF1F6] shadow-none">
                            <CardHeader className="pb-3 border-b border-[#EEF1F6]">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF5F5] text-[#FF6B6B]">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold tracking-tight text-[#111827]">Payment Details</div>
                                        <div className="text-sm text-[#A0A7B4]">Enter your shopping invoice info</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C2433]">Merchant Name</label>
                                        <Input
                                            value={merchant}
                                            onChange={(e) => setMerchant(e.target.value)}
                                            className="h-12 rounded-xl border-[#EEF1F6] pl-4 text-lg focus:ring-[#FF6B6B]/20"
                                            placeholder="e.g. Lazada, Shopee..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C2433]">Order or Invoice ID</label>
                                        <Input
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            className="h-12 rounded-xl border-[#EEF1F6] pl-4 text-lg focus:ring-[#FF6B6B]/20"
                                            placeholder="Invoice ID"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C2433]">Payment Amount (VND)</label>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="h-12 rounded-xl border-[#EEF1F6] pl-4 text-lg font-bold focus:ring-[#FF6B6B]/20"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#EEF1F6] border-dashed shadow-none bg-[#F7F9FF]/30">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex gap-4">
                                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-sm border border-[#EEF1F6]">
                                        <Info className="h-5 w-5 text-[#FF6B6B]" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#1C2433]">Buyer Protection</div>
                                        <div className="mt-1 text-sm text-[#6B7383] leading-relaxed">
                                            Your payment is protected for 30 days. If your order doesn't match the description or doesn't arrive as promised, you can claim a full refund.
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6 min-w-0">
                        <Card className="border-[#EEF1F6] shadow-none bg-white">
                            <CardHeader className="pb-3 border-b border-[#EEF1F6]">
                                <div className="text-lg font-bold tracking-tight text-[#111827]">Payment Summary</div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm text-[#6B7383]">
                                        <span>Order Amount</span>
                                        <span className="font-semibold text-[#1C2433]">{fmtVND(amountNum)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-[#6B7383]">
                                        <span>Platform Fee</span>
                                        <span className="font-semibold text-[#1C2433]">0 VND</span>
                                    </div>
                                    <div className="h-px bg-[#EEF1F6]" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-[#111827]">Total</span>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-[#FF6B6B]">{fmtVND(amountNum)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <Button
                                        onClick={handleConfirm}
                                        className="h-14 w-full rounded-2xl bg-[#FF6B6B] text-lg font-bold text-white shadow-xl hover:bg-[#E55A5A] transition-all"
                                    >
                                        Pay Now
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 text-xs text-[#A0A7B4]">
                                        <ShieldCheck className="h-3.5 w-3.5 text-[#3AD6B0]" />
                                        Secure Payment Gateway
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {step === "success" && (
                <div className="mt-8">
                    <SuccessScreen
                        title="Payment Successful!"
                        subtitle={
                            <>
                                {fmtVND(amountNum)} has been paid to <strong>{merchant}</strong>
                            </>
                        }
                        icon={ShoppingCart}
                        gradientFrom="#FF6B6B"
                        gradientTo="#E55A5A"
                        ringColor="#FF6B6B"
                        receiptRows={[
                            ["Invoice ID", orderId || "N/A"],
                            ["Date & Time", new Date().toLocaleString("vi-VN")],
                            ["Amount", fmtVND(amountNum)],
                            ["Merchant", merchant],
                            ["Status", "Completed", "text-[#3AD6B0]"],
                        ]}
                        resetLabel="New Payment"
                        onReset={handleReset}
                        extraButton={
                            <Button
                                className="flex-1 h-12 rounded-2xl bg-[#FF6B6B] text-white hover:bg-[#E55A5A]"
                                onClick={() => window.print()}
                            >
                                Track Order
                            </Button>
                        }
                    />
                </div>
            )}
        </SparkleShell>
    );
}
