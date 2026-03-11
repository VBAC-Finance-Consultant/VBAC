import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../ui/utils";

interface StepConfig {
    label: string;
    /** Unique string key for this step */
    key: string;
}

interface StepIndicatorProps {
    steps: StepConfig[];
    /** Key of the currently active step */
    currentStep: string;
    /** Accent color for the active step circle (default: #4C6FFF) */
    activeColor?: string;
    /** Accent color for labels/text of the active step (default: same as activeColor) */
    activeLabelColor?: string;
}

/**
 * Generic multi-step progress indicator.
 * Renders numbered circles connected by lines, with done/active/inactive states.
 *
 * Usage (TransferPage example):
 *   <StepIndicator
 *     steps={[{ key: "form", label: "Fill Details" }, { key: "confirm", label: "Confirm" }, { key: "done", label: "Done" }]}
 *     currentStep={step}
 *     activeColor="#4C6FFF"
 *   />
 */
export function StepIndicator({
    steps,
    currentStep,
    activeColor = "#4C6FFF",
    activeLabelColor,
}: StepIndicatorProps) {
    const effectiveLabelColor = activeLabelColor ?? activeColor;
    const currentIndex = steps.findIndex((s) => s.key === currentStep);

    return (
        <div className="mb-8 flex items-center gap-2">
            {steps.map((step, i) => {
                const isDone = i < currentIndex;
                const isActive = i === currentIndex;

                return (
                    <React.Fragment key={step.key}>
                        <div className="flex items-center gap-2">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                                    isDone
                                        ? "bg-[#3AD6B0] text-white"
                                        : isActive
                                            ? "text-white"
                                            : "bg-[#EEF1F6] text-[#A0A7B4]",
                                )}
                                style={
                                    isActive
                                        ? {
                                            backgroundColor: activeColor,
                                            boxShadow: `0 0 0 4px ${activeColor}26`,
                                        }
                                        : undefined
                                }
                            >
                                {isDone ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                            </div>
                            <span
                                className="hidden sm:block text-xs font-semibold whitespace-nowrap"
                                style={{
                                    color: isDone
                                        ? "#3AD6B0"
                                        : isActive
                                            ? effectiveLabelColor
                                            : "#A0A7B4",
                                }}
                            >
                                {step.label}
                            </span>
                        </div>

                        {i < steps.length - 1 && (
                            <div
                                className="h-px flex-1 transition-colors duration-500"
                                style={{ backgroundColor: isDone ? "#3AD6B0" : "#EEF1F6" }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
