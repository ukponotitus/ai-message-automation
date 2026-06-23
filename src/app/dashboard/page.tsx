import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardHome";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { DashboardInbox } from "./components/DashboardInbox";
import { Channels } from "./components/Channels";
import { Automations } from "./components/Automations";
import { Broadcasts } from "./components/Broadcasts";
import { Contacts } from "./components/Contacts";
import { Analytics } from "./components/Analytics";
import { Settings } from "./components/Settings";
import { ConnectionGuide } from "./components/ConnectionGuide";

export function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="inbox" element={<DashboardInbox />} />
        <Route path="channels" element={<Channels />} />
        <Route path="automations" element={<Automations />} />
        <Route path="broadcasts" element={<Broadcasts />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="connection-guide" element={<ConnectionGuide />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
