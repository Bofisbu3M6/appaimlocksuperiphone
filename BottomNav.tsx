import type { TabType } from "@/App";

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAdmin?: boolean;
}

const allTabs: { id: TabType; label: string; icon: string; adminOnly?: boolean }[] = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "features", label: "Features", icon: "✦" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "vip", label: "VIP", icon: "♛" },
  { id: "aimlab", label: "AIM LAB", icon: "⊕" },
  { id: "admin", label: "Admin", icon: "🛡️", adminOnly: true },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export default function BottomNav({ activeTab, setActiveTab, isAdmin = false }: BottomNavProps) {
  const tabs = allTabs.filter(t => !t.adminOnly || isAdmin);

  return (
    <nav className="nav-bar fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAdminTab = tab.id === "admin";
          const activeColor = isAdminTab ? "#ff00aa" : "#00ffff";

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-all min-w-0"
              style={{ color: isActive ? activeColor : "#555" }}
            >
              <span
                className="text-base leading-none"
                style={isActive ? { filter: `drop-shadow(0 0 6px ${activeColor})`, color: activeColor } : {}}
              >
                {tab.icon}
              </span>
              <span
                className="text-[9px] leading-none font-semibold tracking-tight"
                style={{ color: isActive ? activeColor : "#555" }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="w-4 h-0.5 rounded-full mt-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
