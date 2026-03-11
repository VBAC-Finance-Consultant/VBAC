// Mock data for All Transactions
const MOCK_TRANSACTIONS = [
    {
        requester: "Nguyen Van An",
        date: "2026-03-10 09:15",
        type: "Transfer",
        status: "Completed",
        amount: 5000000,
        fee: 0,
    },
    {
        requester: "Tran Thi Bich",
        date: "2026-03-09 14:22",
        type: "Transfer",
        status: "Pending",
        amount: 1200000,
        fee: 0,
    },
    {
        requester: "Le Minh Cuong",
        date: "2026-03-08 17:45",
        type: "Transfer",
        status: "Rejected",
        amount: 800000,
        fee: 0,
    },
];
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowLeftRight,
    CheckCircle2,
    ChevronDown,
    Search,
    User,
    UserCircle2,
    Building2,
    Zap,
    Clock,
} from "lucide-react";
import { SparkleShell } from "../components/layout/sparkle-shell";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { cn } from "../components/ui/utils";
import {
    StepIndicator,
    SuccessScreen,
    DetailList,
    SecurityBadge,
    AmountInput,
    fmtVND,
} from "../components/transfer";

// ── Types ────────────────────────────────────────────────────────────────────

type Step = "list" | "form" | "confirm" | "success";

type Contact = {
    id: string;
    name: string;
    bank: string;
    accountNo: string;
    color: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const MY_ACCOUNTS = [
    { id: "acc-1", label: "Checking Account", number: "6582 **** **** 2197", balance: 24_380.5 },
    { id: "acc-2", label: "Savings Account", number: "7741 **** **** 8831", balance: 98_200.0 },
];

const RECENT_CONTACTS: Contact[] = [
    { id: "c1", name: "Nguyen Van An", bank: "Vietcombank", accountNo: "1020 4567 8901 2", color: "#4C6FFF" },
    { id: "c2", name: "Tran Thi Bich", bank: "Techcombank", accountNo: "1900 1234 5678 9", color: "#FF6B6B" },
    { id: "c3", name: "Le Minh Cuong", bank: "BIDV", accountNo: "3120 9875 6543 1", color: "#3AD6B0" },
    { id: "c4", name: "Pham Thi Dung", bank: "VPBank", accountNo: "7810 2345 6789 0", color: "#A855F7" },
];

const BANKS = ["Vietcombank", "Techcombank", "BIDV", "VPBank", "Agribank", "MB Bank", "ACB", "SHB"];

const TRANSFER_SPEEDS = [
    { id: "instant", label: "Instant", fee: 0, duration: "< 1 min", icon: Zap },
    { id: "standard", label: "Standard", fee: 0, duration: "1–2 hrs", icon: Clock },
    { id: "bulk", label: "Scheduled", fee: 0, duration: "Next day", icon: Clock },
];

const STEPS = [
    { key: "form", label: "Fill Details" },
    { key: "confirm", label: "Confirm" },
    { key: "success", label: "Done" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ContactCard({
    contact,
    selected,
    onSelect,
}: {
    contact: Contact;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 w-full text-center cursor-pointer",
                selected
                    ? "border-[#4C6FFF] bg-[#F5F7FF] shadow-[0_0_0_2px_rgba(76,111,255,0.2)]"
                    : "border-[#EEF1F6] bg-white hover:border-[#4C6FFF]/40 hover:bg-[#F7F9FF]",
            )}
        >
            <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: contact.color + "22" }}
            >
                <UserCircle2 className="h-6 w-6" style={{ color: contact.color }} />
            </div>
            <div className="text-sm font-semibold text-[#1C2433] leading-tight">{contact.name}</div>
            <div className="text-xs text-[#A0A7B4]">{contact.bank}</div>
            {selected && (
                <div className="mt-1 rounded-full bg-[#4C6FFF] px-2 py-0.5 text-[10px] font-bold text-white">
                    Selected
                </div>
            )}
        </button>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

import { useSearchParams } from "react-router-dom";

export function TransferPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialStep = searchParams.get("action") === "new" ? "form" : "list";
    const [step, setStep] = React.useState<Step>(initialStep);

    // Form state
    const [fromAccId, setFromAccId] = React.useState(MY_ACCOUNTS[0].id);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
    const [recipientBank, setRecipientBank] = React.useState("");
    const [recipientAccNo, setRecipientAccNo] = React.useState("");
    const [recipientName, setRecipientName] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [note, setNote] = React.useState("");
    const [speed, setSpeed] = React.useState("instant");
    const [contactSearch, setContactSearch] = React.useState("");
    const [error, setError] = React.useState("");

    const fromAccount = MY_ACCOUNTS.find((a) => a.id === fromAccId)!;
    const selectedSpeed = TRANSFER_SPEEDS.find((s) => s.id === speed)!;
    const amountNum = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

    const filteredContacts = RECENT_CONTACTS.filter(
        (c) =>
            c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
            c.bank.toLowerCase().includes(contactSearch.toLowerCase()),
    );

    const handleSelectContact = (c: Contact) => {
        setSelectedContact(c);
        setRecipientBank(c.bank);
        setRecipientAccNo(c.accountNo);
        setRecipientName(c.name);
    };

    const handleConfirm = () => {
        if (!recipientAccNo || !recipientName || !recipientBank) {
            setError("Please fill in recipient information.");
            return;
        }
        if (amountNum <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        setError("");
        setStep("confirm");
    };

    const handleReset = () => {
        setStep("form");
        setAmount("");
        setNote("");
        setSelectedContact(null);
        setRecipientBank("");
        setRecipientAccNo("");
        setRecipientName("");
        setError("");
    };

    // State for search
    const [search, setSearch] = React.useState("");
    const filteredTransactions = MOCK_TRANSACTIONS.filter(
      (tx) =>
        tx.requester.toLowerCase().includes(search.toLowerCase()) ||
        tx.date.includes(search) ||
        tx.type.toLowerCase().includes(search.toLowerCase()) ||
        tx.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SparkleShell greeting="Transfer Money">
            {/* All Transactions Section */}
            {step === "list" && (
                <div className="mx-auto w-full max-w-[1200px] mt-8 mb-8">
                    <Card className="border-[#EEF1F6] shadow-none">
                        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="text-xl font-bold text-[#111827]">All Transactions</div>
                                <div className="text-xs text-[#A0A7B4]">Monitor and manage all payments</div>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                <Button onClick={() => navigate('/new-transaction')} className="rounded-xl bg-[#3AD6B0] text-white font-semibold h-8 px-4">New Transaction +</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 mb-4">
                                <Button variant="outline" className="rounded-xl h-8 px-3 text-xs font-semibold">All ({filteredTransactions.length})</Button>
                                <Button variant="outline" className="rounded-xl h-8 px-3 text-xs font-semibold text-[#A0A7B4]">Pending</Button>
                                <Button variant="outline" className="rounded-xl h-8 px-3 text-xs font-semibold text-[#A0A7B4]">Completed</Button>
                                <div className="ml-auto flex gap-2">
                                    <input
                                        className="rounded-xl border border-[#EEF1F6] px-2 h-8 text-xs outline-none focus:border-[#4C6FFF]"
                                        placeholder="Search"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline" className="rounded-xl h-8 px-3 text-xs font-semibold">Filter</Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-[#A0A7B4] border-b border-[#EEF1F6]">
                                            <th className="py-3 px-2 text-left font-medium">Requester</th>
                                            <th className="py-3 px-2 text-left font-medium">Date & Time</th>
                                            <th className="py-3 px-2 text-left font-medium">Type</th>
                                            <th className="py-3 px-2 text-left font-medium">Status</th>
                                            <th className="py-3 px-2 text-right font-medium">Amount</th>
                                            <th className="py-3 px-2 text-right font-medium">Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((tx, idx) => (
                                            <tr key={idx} className="border-b border-[#EEF1F6] hover:bg-[#F7F9FF]/60 transition-colors">
                                                <td className="py-3 px-2 font-medium text-[#1C2433]">{tx.requester}</td>
                                                <td className="py-3 px-2 text-[#6B7383]">{tx.date}</td>
                                                <td className="py-3 px-2 text-[#6B7383]">{tx.type}</td>
                                                <td className="py-3 px-2">
                                                    <span className={
                                                        tx.status === "Completed"
                                                            ? "text-[#3AD6B0] font-semibold bg-[#F3FFFB] px-2 py-1 rounded-full text-xs"
                                                            : tx.status === "Pending"
                                                            ? "text-[#FFB84D] font-semibold bg-[#FFF8E8] px-2 py-1 rounded-full text-xs"
                                                            : "text-[#FF6B6B] font-semibold bg-[#FFF5F5] px-2 py-1 rounded-full text-xs"
                                                    }>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-right font-medium text-[#1C2433]">{fmtVND(tx.amount)}</td>
                                                <td className="py-3 px-2 text-right text-[#6B7383]">{tx.fee === 0 ? "Free" : fmtVND(tx.fee)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            {/* ── STEP 1: Form ── */}
            {step === "form" && (
                <div className="mx-auto max-w-2xl space-y-6">
                    <Card className="border-[#EEF1F6] shadow-none">
                        <CardHeader className="pb-3 border-b border-[#EEF1F6]">
                            <div className="text-xl font-bold tracking-tight text-[#111827]">Transfer Details</div>
                            <div className="text-sm text-[#A0A7B4]">Enter recipient and amount to transfer</div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-[#1C2433]">From Account</label>
                                <div className="p-4 rounded-2xl border border-[#EEF1F6] bg-[#F7F9FF] flex justify-between items-center cursor-pointer hover:border-[#4C6FFF]/50 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-[#1C2433]">{fromAccount.label}</div>
                                        <div className="text-xs text-[#A0A7B4] mt-1">{fromAccount.number}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-[#3AD6B0]">{fmtVND(fromAccount.balance)}</div>
                                        <div className="text-xs text-[#A0A7B4] mt-1">Available</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[#1C2433]">To Recipient</label>
                                    <button className="text-xs font-bold text-[#4C6FFF] hover:underline">Recent Contacts</button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-[#6B7383]">Bank Name</label>
                                        <input className="w-full h-12 rounded-xl border border-[#EEF1F6] px-4 text-sm focus:ring-2 focus:ring-[#4C6FFF]/20 outline-none transition-all" value={recipientBank} onChange={e => setRecipientBank(e.target.value)} placeholder="e.g. Vietcombank" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-[#6B7383]">Account No.</label>
                                        <input className="w-full h-12 rounded-xl border border-[#EEF1F6] px-4 text-sm focus:ring-2 focus:ring-[#4C6FFF]/20 outline-none transition-all" value={recipientAccNo} onChange={e => setRecipientAccNo(e.target.value)} placeholder="1020 4567 8901" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-[#6B7383]">Recipient Name</label>
                                    <input className="w-full h-12 rounded-xl border border-[#EEF1F6] px-4 text-sm focus:ring-2 focus:ring-[#4C6FFF]/20 outline-none transition-all" value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g. NGUYEN VAN A" />
                                </div>
                                
                                {error && <div className="text-[#FF6B6B] text-sm font-medium mt-2">{error}</div>}
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-[#1C2433]">Amount (VND)</label>
                                <input type="number" className="w-full h-16 rounded-2xl border border-[#EEF1F6] px-4 text-2xl font-bold text-center focus:ring-2 focus:ring-[#4C6FFF]/20 outline-none transition-all" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-[#1C2433]">Note (Optional)</label>
                                <input className="w-full h-12 rounded-xl border border-[#EEF1F6] px-4 text-sm focus:ring-2 focus:ring-[#4C6FFF]/20 outline-none transition-all" value={note} onChange={e => setNote(e.target.value)} placeholder="Transfer reason..." />
                            </div>

                            <Button onClick={handleConfirm} className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#4C6FFF] to-[#6D8CFF] text-lg font-bold text-white shadow-lg shadow-[#4C6FFF]/20 hover:shadow-[#4C6FFF]/40 transition-all hover:-translate-y-0.5 mt-4">
                                Continue
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* ── STEP 2: Confirm ── */}
            {step === "confirm" && (
                <div className="mx-auto max-w-lg space-y-6">
                    <Card className="border-[#EEF1F6] shadow-none overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-[#4C6FFF] to-[#3AD6B0]" />
                        <CardContent className="pt-6 space-y-5">
                            {/* Big amount */}
                            <div className="text-center">
                                <div className="text-4xl font-black text-[#1C2433]">{fmtVND(amountNum)}</div>
                                <div className="mt-1 text-sm text-[#A0A7B4]">Transfer Amount</div>
                            </div>

                            {/* From → To */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 rounded-2xl border border-[#EEF1F6] p-4 text-center">
                                    <div className="text-xs text-[#A0A7B4] mb-1">From</div>
                                    <div className="text-sm font-bold text-[#1C2433]">{fromAccount.label}</div>
                                    <div className="text-xs text-[#A0A7B4] mt-1">{fromAccount.number}</div>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FF] shrink-0">
                                    <ArrowRight className="h-5 w-5 text-[#4C6FFF]" />
                                </div>
                                <div className="flex-1 rounded-2xl border border-[#EEF1F6] p-4 text-center">
                                    <div className="text-xs text-[#A0A7B4] mb-1">To</div>
                                    <div className="text-sm font-bold text-[#1C2433]">{recipientName}</div>
                                    <div className="text-xs text-[#A0A7B4] mt-1">{recipientBank}</div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="rounded-2xl bg-[#F7F9FF] p-4">
                                <DetailList
                                    rows={[
                                        ["Account No.", recipientAccNo],
                                        ["Transfer Speed", `${selectedSpeed.label} · ${selectedSpeed.duration}`],
                                        ["Fee", "Free"],
                                        ["Note", note || "—"],
                                    ]}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12 rounded-2xl border-[#EEF1F6] text-[#6B7383]"
                                    onClick={() => setStep("form")}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#4C6FFF] to-[#6D8CFF] text-white font-semibold hover:opacity-90"
                                    onClick={() => setStep("success")}
                                >
                                    Confirm Transfer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === "success" && (
                <SuccessScreen
                    title="Transfer Successful!"
                    subtitle={
                        <>
                            {fmtVND(amountNum)} has been sent to <strong>{recipientName}</strong>
                        </>
                    }
                    icon={CheckCircle2}
                    gradientFrom="#3AD6B0"
                    gradientTo="#4C6FFF"
                    ringColor="#3AD6B0"
                    receiptRows={[
                        ["Transaction ID", "TXN" + Math.floor(Math.random() * 1_000_000)],
                        ["Date & Time", new Date().toLocaleString("vi-VN")],
                        ["Amount", fmtVND(amountNum)],
                        ["Recipient", recipientName],
                        ["Bank", recipientBank],
                        ["Status", "Completed", "text-[#3AD6B0]"],
                    ]}
                    resetLabel="New Transfer"
                    onReset={handleReset}
                    extraButton={
                        <Button
                            className="flex-1 h-12 rounded-2xl bg-[#3AD6B0] text-white hover:bg-[#33C9A6]"
                            onClick={() => window.print()}
                        >
                            Download Receipt
                        </Button>
                    }
                />
            )}
        </SparkleShell>
    );
}
