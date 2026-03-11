import { Shield } from "lucide-react";

interface SecurityBadgeProps {
    text?: string;
}

/**
 * Small "secured" notice shown at the bottom of payment flows.
 *
 * Example:
 *   <SecurityBadge />
 *   <SecurityBadge text="Buyer protection guaranteed" />
 */
export function SecurityBadge({ text = "256-bit encrypted & secure" }: SecurityBadgeProps) {
    return (
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#A0A7B4]">
            <Shield className="h-3 w-3" />
            {text}
        </div>
    );
}
