import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page";
import { ChatPage } from "./pages/chat-page";
import { PlaceholderPage } from "./pages/placeholder-page";
import { NotificationsPage } from "./pages/notifications-page";
// import { TransferPage } from "./pages/transfer-page"; // Duplicate import removed
import { TransferPage } from "./pages/transfer-page";
import { UserManagementPage } from "./pages/user-management-page";
import { StockTransferPage } from "./pages/stock-transfer-page";
import { AdminDashboardPage } from "./pages/admin-dashboard-page";
import { NewTransactionPage } from "./pages/new-transaction-page";
import { ShoppingPaymentPage } from "./pages/shopping-payment-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/new-transaction" element={<NewTransactionPage />} />
        <Route path="/shopping-payment" element={<ShoppingPaymentPage />} />
        <Route path="/stock-order" element={<StockTransferPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route
          path="/card-activities"
          element={<PlaceholderPage title="Card Activities" description="Coming soon." />}
        />
        <Route
          path="/wallet"
          element={<PlaceholderPage title="My Wallet" description="Coming soon." />}
        />
        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />
        <Route
          path="/privacy"
          element={<PlaceholderPage title="Privacy" description="Coming soon." />}
        />
        <Route
          path="/support"
          element={<PlaceholderPage title="Support" description="Coming soon." />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
