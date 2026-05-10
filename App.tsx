import { useState, useEffect } from "react";
import HomePage from "@/pages/HomePage";
import FeaturesPage from "@/pages/FeaturesPage";
import StatsPage from "@/pages/StatsPage";
import VipPage from "@/pages/VipPage";
import AimLabPage from "@/pages/AimLabPage";
import AdminPage from "@/pages/AdminPage";
import SettingsPage from "@/pages/SettingsPage";
import KeyScreen from "@/pages/KeyScreen";
import BottomNav from "@/components/BottomNav";
import VipBanner from "@/components/VipBanner";
import { loadSession, clearSession, type KeyInfo } from "@/lib/keys";

export type TabType = "home" | "features" | "stats" | "vip" | "aimlab" | "admin" | "settings";

export default function App() {
  const [session, setSession] = useState<{ key: string; info: KeyInfo } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setSession(saved);
      if (saved.info.type === "admin") setToast("Chào mừng ADMIN! Toàn quyền truy cập.");
      else if (saved.info.type === "vip") setToast(`VIP kích hoạt thành công! ${saved.info.label}`);
      else setToast(`Key hợp lệ! ${saved.info.label}`);
    }
  }, []);

  const handleUnlock = (key: string, info: KeyInfo) => {
    setSession({ key, info });
    if (info.type === "admin") setToast("Chào mừng ADMIN! Toàn quyền truy cập.");
    else if (info.type === "vip") setToast(`VIP kích hoạt thành công! ${info.label}`);
    else setToast(`Key hợp lệ! ${info.label}`);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setActiveTab("home");
    setToast(null);
  };

  if (!session) {
    return <KeyScreen onUnlock={handleUnlock} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home": return <HomePage setToast={setToast} keyInfo={session.info} />;
      case "features": return <FeaturesPage setToast={setToast} />;
      case "stats": return <StatsPage setToast={setToast} />;
      case "vip": return <VipPage keyInfo={session.info} />;
      case "aimlab": return <AimLabPage setToast={setToast} keyInfo={session.info} />;
      case "admin": return session.info.type === "admin" ? <AdminPage onLogout={handleLogout} /> : <HomePage setToast={setToast} keyInfo={session.info} />;
      case "settings": return <SettingsPage keyInfo={session.info} onLogout={handleLogout} />;
      default: return <HomePage setToast={setToast} keyInfo={session.info} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative" style={{ background: "linear-gradient(180deg, #080d1c 0%, #050a14 100%)" }}>
      <VipBanner keyInfo={session.info} />
      <div className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </div>
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 toast-bar flex items-center gap-2 text-sm">
          <span>{session.info.type === "admin" ? "🛡️" : session.info.type === "vip" ? "👑" : "✅"}</span>
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-auto text-white/40 hover:text-white text-xs">✕</button>
        </div>
      )}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={session.info.type === "admin"} />
    </div>
  );
}
