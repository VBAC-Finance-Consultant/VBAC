import React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeftRight } from "lucide-react";
import { DetailList } from "./detail-list";

interface SuccessScreenProps {
    /** Title text shown under the icon, e.g. "Transfer Successful!" */
    title: string;
    /** Subtitle / description line */
    subtitle: React.ReactNode;
    /** Icon to show inside the pulsing circle */
    icon: LucideIcon;
    /** Gradient start color for the icon circle background */
    gradientFrom: string;
    /** Gradient end color for the icon circle background */
    gradientTo: string;
    /** Pulse ring color (CSS color, e.g. "#3AD6B0") */
    ringColor: string;
    /** Receipt rows: [label, value, optionalValueClassName] */
    receiptRows: [string, string, string?][];
    /** Label for the "start again" button */
    resetLabel?: string;
    /** Callback for the "start again" button */
    onReset: () => void;
    /** Optional extra button(s) rendered to the right of reset */
    extraButton?: React.ReactNode;
}

/**
 * Full-page success confirmation screen used at the end of every payment wizard.
 *
 * Renders:
 *  - animated pulsing icon
 *  - title + subtitle
 *  - receipt detail card
 *  - action buttons
 *
 * Example:
 *   <SuccessScreen
 *     title="Transfer Successful!"
 *     subtitle={<>Sent to <strong>Nguyen Van An</strong></>}
 *     icon={CheckCircle2}
 *     gradientFrom="#3AD6B0"
 *     gradientTo="#4C6FFF"
 *     ringColor="#3AD6B0"
 *     receiptRows={[["Amount", "₫1,000,000"], ["Status", "Completed", "text-[#3AD6B0]"]]}
 *     onReset={handleReset}
 *     extraButton={<Button onClick={() => window.print()}>Download Receipt</Button>}
 *   />
 */
export function SuccessScreen({
    title,
    subtitle,
    icon: Icon,
    gradientFrom,
    gradientTo,
    ringColor,
    receiptRows,
    resetLabel = "New Transfer",
    onReset,
    extraButton,
}: SuccessScreenProps) {
    return (
        <div className="mx-auto max-w-md text-center space-y-6">
            {/* Animated icon */}
            <div className="relative mx-auto h-28 w-28">
                <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: ringColor + "26" }}
                />
                <div
                    className="relative flex h-full w-full items-center justify-center rounded-full"
                    style={{
                        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    }}
                >
                    <Icon className="h-14 w-14 text-white" />
                </div>
            </div>

            {/* Title + subtitle */}
            <div>
                <div className="text-2xl font-black text-[#111827]">{title}</div>
                <div className="mt-1 text-sm text-[#6B7383]">{subtitle}</div>
            </div>

            {/* Receipt card */}
            <Card className="border-[#EEF1F6] shadow-none text-left">
                <CardContent className="pt-4">
                    <DetailList rows={receiptRows} />
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-2xl border-[#EEF1F6] text-[#6B7383]"
                    onClick={onReset}
                >
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    {resetLabel}
                </Button>
                {extraButton}
            </div>
        </div>
    );
}
