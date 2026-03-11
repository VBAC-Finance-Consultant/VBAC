import React from "react";
import { SparkleShell } from "../components/layout/sparkle-shell";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TrendingUp, BarChart2, ShieldCheck, Info } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function StockTransferPage() {
    const [ticker, setTicker] = React.useState("VIC");
    const [shares, setShares] = React.useState("100");
    const price = 45500;
    const total = Number(shares || 0) * price;

    return (
        <SparkleShell greeting="Stock Order">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] xl:gap-12">
                <div className="space-y-6 min-w-0">
                    <Card className="border-[#EEF1F6] shadow-none">
                        <CardHeader className="pb-3 border-b border-[#EEF1F6]">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F3FFFB] text-[#3AD6B0]">
                                    <BarChart2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold tracking-tight text-[#111827]">Order Details</div>
                                    <div className="text-sm text-[#A0A7B4]">Choose your investment preference</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C2433]">Ticker Symbol</label>
                                        <div className="relative">
                                            <Input
                                                value={ticker}
                                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                                className="h-12 rounded-xl border-[#EEF1F6] pl-4 text-lg font-bold uppercase focus:ring-[#3AD6B0]/20"
                                            />
                                            <Badge className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-[#F3FFFB] text-[#3AD6B0]">
                                                NYSE
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C2433]">Shares</label>
                                        <Input
                                            type="number"
                                            value={shares}
                                            onChange={(e) => setShares(e.target.value)}
                                            className="h-12 rounded-xl border-[#EEF1F6] pl-4 text-lg font-bold focus:ring-[#3AD6B0]/20"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="h-12 flex-1 rounded-xl border-[#EEF1F6] font-semibold text-[#1C2433] shadow-none hover:bg-[#F3FFFB]">
                                        Market
                                    </Button>
                                    <Button className="h-12 flex-1 rounded-xl bg-[#3AD6B0] font-semibold text-white shadow-none hover:bg-[#33C9A6]">
                                        Limit
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#EEF1F6] border-dashed shadow-none bg-[#F7F9FF]/30">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex gap-4">
                                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-sm border border-[#EEF1F6]">
                                    <Info className="h-5 w-5 text-[#3AD6B0]" />
                                </div>
                                <div>
                                    <div className="font-bold text-[#1C2433]">AI Price Prediction</div>
                                    <div className="mt-1 text-sm text-[#6B7383] leading-relaxed">
                                        Based on market sentiment and recent financial reports, VIC shows a <span className="font-bold text-[#3AD6B0]">82% Bullish</span> signal over the next 14 days.
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 min-w-0">
                    <Card className="border-[#EEF1F6] shadow-none bg-white">
                        <CardHeader className="pb-3 border-b border-[#EEF1F6]">
                            <div className="text-lg font-bold tracking-tight text-[#111827]">Execution Summary</div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-[#6B7383]">
                                    <span>Est. Price</span>
                                    <span className="font-semibold text-[#1C2433]">{price.toLocaleString()} VND</span>
                                </div>
                                <div className="flex justify-between text-sm text-[#6B7383]">
                                    <span>Order Quantity</span>
                                    <span className="font-semibold text-[#1C2433]">{shares || 0} shares</span>
                                </div>
                                <div className="flex justify-between text-sm text-[#6B7383]">
                                    <span>Brokerage Fees</span>
                                    <span className="font-semibold text-[#1C2433]">0 VND</span>
                                </div>
                                <div className="h-px bg-[#EEF1F6]" />
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-[#111827]">Total Amount</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[#3AD6B0]">{total.toLocaleString()} VND</div>
                                        <div className="text-[10px] text-[#A0A7B4] uppercase tracking-tighter">Settlement T+2</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <Button className="h-14 w-full rounded-2xl bg-[#111827] text-lg font-bold text-white shadow-xl hover:bg-black transition-all">
                                    Confirm Buy Order
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-xs text-[#A0A7B4]">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#3AD6B0]" />
                                    Secured by VBAC Smart Engine
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="rounded-2xl bg-[#111827] p-6 text-white text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-4 text-[#3AD6B0]" />
                        <div className="font-bold text-lg mb-1">Stock Advisory</div>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                            Our AI analyzes millions of data points to give you the best entry points.
                        </p>
                        <Button className="h-10 w-full rounded-xl bg-white/10 border border-white/20 text-sm font-bold hover:bg-white/20">
                            Get Deep Analysis
                        </Button>
                    </div>
                </div>
            </div>
        </SparkleShell>
    );
}
