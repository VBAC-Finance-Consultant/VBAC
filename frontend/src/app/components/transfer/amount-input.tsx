import { fmtVND } from "./fmt-vnd";

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    /** Quick-select preset amounts in VND */
    presets?: number[];
    /** Focus ring color (default: #4C6FFF) */
    accentColor?: string;
}

/**
 * Large VND amount input with optional quick-select preset buttons.
 *
 * Example:
 *   <AmountInput
 *     value={amount}
 *     onChange={setAmount}
 *     presets={[500_000, 1_000_000, 2_000_000, 5_000_000]}
 *   />
 */
export function AmountInput({
    value,
    onChange,
    presets = [500_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000],
    accentColor = "#4C6FFF",
}: AmountInputProps) {
    return (
        <div>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#A0A7B4]">
                    ₫
                </span>
                <input
                    type="number"
                    min={0}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0"
                    className="h-14 w-full rounded-2xl border border-[#EEF1F6] bg-white pl-8 pr-4 text-2xl font-bold text-[#1C2433] placeholder:text-[#EEF1F6] outline-none"
                    style={{
                        // Dynamic focus ring via CSS custom prop fallback
                        boxShadow: undefined,
                    }}
                    onFocus={(e) =>
                        (e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`)
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                />
            </div>

            {presets.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {presets.map((q) => (
                        <button
                            key={q}
                            type="button"
                            onClick={() => onChange(String(q))}
                            className="rounded-full border border-[#EEF1F6] px-3 py-1 text-xs font-semibold text-[#6B7383] transition-colors"
                            style={{}}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = accentColor;
                                e.currentTarget.style.color = accentColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "";
                                e.currentTarget.style.color = "";
                            }}
                        >
                            {fmtVND(q)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
