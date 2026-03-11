import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AdminShell } from "../components/layout/admin-shell";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck } from "lucide-react";

type ReviewItem = {
  message_id: string;
  user_id: string;
  type: "transaction_trigger" | "chat_intent" | "advisory";
  content: string;
  confidence: number;
  status: "pending" | "accepted" | "rejected";
  reviewed_by?: string;
  reviewed_at?: string;
};

const MOCK_ITEMS: ReviewItem[] = [
  {
    message_id: "REV-101",
    user_id: "Julie Huynh",
    type: "transaction_trigger",
    content: "Detected VIC stock purchase (1,000 shares). AI Advisory: 'Strong accumulation detected for VIC. Bullish signal 82% over 14 days.'",
    confidence: 0.92,
    status: "pending"
  },
  {
    message_id: "REV-102",
    user_id: "Hoàng Lê",
    type: "chat_intent",
    content: "User input: 'Danh mục của tôi có rủi ro không?'. Detected Intent: 'portfolio_risk_analysis'. Confidence: 0.88.",
    confidence: 0.88,
    status: "pending"
  },
  {
    message_id: "REV-103",
    user_id: "Julie Huynh",
    type: "advisory",
    content: "Product Recommendation: 'Rewards Credit Card'. Reasoning: High education spending (Course fee). Estimated cashback: 3.5%.",
    confidence: 0.76,
    status: "pending"
  },
  {
    message_id: "REV-104",
    user_id: "Phước Trần",
    type: "transaction_trigger",
    content: "Anomaly detected: Transfer to new recipient 'Unknown-002'. Transfer value: 50,000,000 VND. Risk score: Medium.",
    confidence: 0.65,
    status: "pending"
  }
];

export function NotificationsPage() {
  const [items, setItems] = React.useState<ReviewItem[]>(MOCK_ITEMS);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial load for polish
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (message_id: string, action: "accepted" | "rejected") => {
    setItems(prev => prev.map(item =>
      item.message_id === message_id
        ? {
          ...item,
          status: action,
          reviewed_by: "Admin Phước",
          reviewed_at: new Date().toLocaleTimeString()
        }
        : item
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle2 className="h-4 w-4 text-[#3AD6B0]" />;
      case "rejected": return <XCircle className="h-4 w-4 text-[#FF6B6B]" />;
      default: return <Clock className="h-4 w-4 text-[#A0A7B4]" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transaction_trigger": return "bg-blue-50 text-blue-600 border-blue-100";
      case "chat_intent": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }
  };

  return (
    <AdminShell greeting="Review Tasks">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Supervisor Review Pending</h2>
            <p className="text-sm text-[#A0A7B4]">Decision desk for AI recommendations and transaction alerts</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#EEF1F6] shadow-sm">
            <ShieldCheck className="h-5 w-5 text-[#3AD6B0]" />
            <span className="text-sm font-bold text-[#1C2433]">{items.filter(i => i.status === 'pending').length} Tasks Left</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="h-10 w-10 border-4 border-[#3AD6B0]/20 border-t-[#3AD6B0] rounded-full animate-spin" />
            <p className="text-sm text-[#A0A7B4]">Fetching operational queue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-[#EEF1F6]">
                <p className="text-[#A0A7B4]">All tasks have been reviewed.</p>
              </div>
            )}
            {items.map((item) => (
              <Card key={item.message_id} className={`border-[#EEF1F6] shadow-none transition-all ${item.status !== 'pending' ? 'opacity-70 grayscale-[0.5]' : 'hover:border-[#3AD6B0]/40'}`}>
                <CardHeader className="pb-3 border-b border-[#F7F9FF]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#F7F9FF] flex items-center justify-center font-bold text-xs">
                        {item.user_id.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111827]">{item.user_id}</div>
                        <div className="text-[10px] text-[#A0A7B4] uppercase tracking-wider">{item.message_id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`border-0 ${getTypeColor(item.type)}`}>
                        {item.type.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-xs text-[#A0A7B4]">Confidence:</span>
                        <span className={`text-xs font-bold ${item.confidence > 0.8 ? 'text-[#3AD6B0]' : item.confidence > 0.6 ? 'text-[#F5A524]' : 'text-[#FF6B6B]'}`}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="bg-[#F7F9FF]/50 rounded-xl p-4 border border-[#EEF1F6] mb-4">
                    <p className="text-sm leading-relaxed text-[#1C2433]">{item.content}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-xs font-semibold capitalize text-[#6B7383]">
                        {item.status === 'pending' ? 'Awaiting Decision' : `Decision: ${item.status}`}
                      </span>
                      {item.reviewed_at && (
                        <span className="text-[10px] text-[#A0A7B4]">at {item.reviewed_at}</span>
                      )}
                    </div>

                    {item.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-9 px-4 rounded-lg bg-[#3AD6B0] text-white hover:bg-[#33C9A6] shadow-sm transform transition hover:-translate-y-0.5"
                          onClick={() => handleAction(item.message_id, "accepted")}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 px-4 rounded-lg border-[#EEF1F6] text-[#FF6B6B] hover:bg-red-50 hover:border-red-100 shadow-sm"
                          onClick={() => handleAction(item.message_id, "rejected")}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="rounded-2xl bg-amber-50 p-4 border border-amber-100 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
          <p className="text-xs text-amber-700 leading-normal">
            <strong>Supervisor Notice:</strong> Rejecting a high-confidence AI result will trigger a retraining loop for the
            intent classifier. Please ensure you provide a reason (mandatory in production).
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
