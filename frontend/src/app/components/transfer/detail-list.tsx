import { cn } from "../ui/utils";

interface DetailRowProps {
    label: string;
    value: string;
    /** Extra classes for the value span */
    valueClassName?: string;
}

/**
 * A single key-value row for summary/receipt cards.
 *
 * Example:
 *   <DetailRow label="From" value="Checking Account" />
 *   <DetailRow label="Status" value="Completed" valueClassName="text-[#3AD6B0]" />
 */
export function DetailRow({ label, value, valueClassName }: DetailRowProps) {
    return (
        <div className="flex justify-between gap-3">
            <span className="text-[#A0A7B4] shrink-0">{label}</span>
            <span className={cn("font-medium text-right text-[#1C2433]", valueClassName)}>{value}</span>
        </div>
    );
}

interface DetailListProps {
    /** Array of [label, value, optionalValueClassName] tuples */
    rows: [string, string, string?][];
    className?: string;
}

/**
 * Renders a full list of DetailRow inside a styled container.
 *
 * Example:
 *   <DetailList
 *     rows={[
 *       ["Transaction ID", "TXN123456"],
 *       ["Status", "Completed", "text-[#3AD6B0]"],
 *     ]}
 *   />
 */
export function DetailList({ rows, className }: DetailListProps) {
    return (
        <div className={cn("space-y-2 text-sm", className)}>
            {rows.map(([label, value, vc]) => (
                <DetailRow key={label} label={label} value={value} valueClassName={vc} />
            ))}
        </div>
    );
}
